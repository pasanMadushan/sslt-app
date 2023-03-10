import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import VideoPicker  from '../../components/VideoPicker';
import Timer from "../../components/Timer";
import CameraFlip from "../../components/CameraFlip";
import TranslateBtn from "../../components/buttons/TranslateBtn";
import RecordingBtn from "../../components/buttons/RecordingBtn";

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
    const [translatedText, setTranslatedText] = useState('red');
    const [recording, setRecording] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [video, setVideo] = useState();
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

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
    const shareVideo = () => {
        if (video) {
            shareAsync(video.uri);
        }
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
            console.log(result.assets[0].uri);
        }
    };

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>

            <View style={styles.cameraView}>
                <Camera style={styles.camera} type={type}
                        ref={ref => {
                            setCameraRef(ref) ;
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
                                        setVideo(recordedVideo);
                                        setRecording(false);
                                        // console.log(recordedVideo);
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
            </View>
            <TranslateBtn shareVideo={shareVideo} translatedText={translatedText}/>

        </View>
    );
}

   