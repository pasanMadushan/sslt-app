import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import VideoPicker  from '../../components/VideoPicker';
import Timer from "../../components/Timer";
import CameraFlip from "../../components/CameraFlip";
import TranslateBtn from "../../components/buttons/TranslateBtn";
import RecordingBtn from "../../components/buttons/RecordingBtn";
import { storage } from '../../config';
import { ref, uploadBytesResumable } from "firebase/storage";
import { translations } from "../../data/Classes";
import { ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
    },
    camera: {
        // flex: 1,
        position: 'relative',
        height: '100%',
    },
    cameraView: {
        height: '70%'
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        // margin: 64,
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center'
    },
});

export default function TranslateScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [translatedText, setTranslatedText] = useState('');
    const [recording, setRecording] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [video, setVideo] = useState();
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isVideoPlayback, setIsVideoPlayback] = useState(false);


    if (!permission) {
        // Camera permissions are still loading
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        );
    }

    const submitVideo = async () => {

        if (!video) {
            Alert.alert("No video available", "Please select or record a video first");
            return;
        }

        setLoading(true);

        const storageRef = ref(storage, 'signVideo.mov');
        const response = await fetch(video.uri);
        const blob = await response.blob();

        const metadata = {
            contentType: 'video/quicktime', // Assuming the video is mp4 format
        };

        uploadBytesResumable(storageRef, blob, metadata).then((snapshot) => {
            console.log('Uploaded a blob or file!');

            prediction({"filename":"signVideo.mov"}).then((pred)=>{
                
                console.log("Pred-class: ", pred)

                setTranslatedText(translations[pred])

                setLoading(false);

                setIsVideoPlayback(false);

                // set the video state to null after the upload
                setVideo(null);
            });
    
        });
    };

    const prediction = async (data) => {
    let response = await fetch('https://sslt2.onrender.com/predict', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        let res = await response.json();

        return res.predicted_class;
      };      
        


    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setVideo(result.assets[0]);
            setIsVideoPlayback(true);
            console.log(result.assets[0].uri);
        }
    };

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraView}>
            {isVideoPlayback ? (
                <Video 
                    source={{ uri: video.uri }} 
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: "100%", height: "100%" }}
                />
                ) : (
                <Camera style={styles.camera} type={type}
                        ref={ref => {
                            setCameraRef(ref);
                        }}>
                    <VideoPicker pickImage={pickImage} />
                    <Timer recording={recording} timer={timer}/>
                    <CameraFlip toggleCameraType={toggleCameraType}/>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                            style={{ alignSelf: "center"}}
                            onPress={async () => {
                                if (!recording) {
                                    setRecording(true);
                                    let intervalId = setInterval(()=>{
                                        setTimer(prevTime => prevTime+1)
                                    },1000);
                                    setIntervalId(intervalId);
                                    let options = {
                                        quality: "1080p",
                                        maxDuration: 30,
                                        mute : true
                                    }
                                    cameraRef.recordAsync(options).then((recordedVideo)=>{
                                        setVideo({uri: recordedVideo.uri}); // Ensure the saved object structure is consistent
                                        setIsVideoPlayback(true);
                                        setRecording(false);
                                        clearInterval(intervalId);
                                        setTimer(0);
                                    });
                                } else {
                                    setRecording(false);
                                    cameraRef.stopRecording();
                                    clearInterval(intervalId);
                                    setTimer(0);
                                }
                            }}
                        >
                            <RecordingBtn recording={recording}/>
                        </TouchableOpacity>
                    </View>
                </Camera>
                )}
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                {loading ? 
                    <ActivityIndicator size="large" color="#0000ff" /> :
                    <TranslateBtn shareVideo={submitVideo} translatedText={translatedText}/>
                }
            </View>
        </View>
    );
}

   