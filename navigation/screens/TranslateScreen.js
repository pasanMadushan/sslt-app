import React,{useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import { SyntheticPlatformEmitter } from 'expo-modules-core';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

export default function TranslateScreen({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [translatedText, setTranslatedText] = useState('test');
    const [recording, setRecording] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [video, setVideo] = useState();
    const [timer,setTimer] = useState(0);
    const [intervalId,setIntervalId] = useState(null);
    
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }
    const shareVideo = () => {
        shareAsync(video.uri);
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
        
        if (!result.canceled) {
            setVideo(result.assets[0]);
            console.log(result.assets[0].uri);
        }
      };
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
      return (
        <View style={styles.container}>

        <View style={styles.cameraView}>
          <Camera style={styles.camera} type={type} 
            ref={ref => {
            setCameraRef(ref) ;
            }}>
            <View style={{position:'absolute', bottom: '5.5%',left:'5%', alignSelf: 'flex-start'}}>
                <Ionicons name="md-images-outline" size={30} color="white" onPress={pickImage} />
            </View>
            <View style={{position: 'absolute', top:'5%', alignSelf: 'center'}}>
                <Text 
                style={{color: 'white', backgroundColor:`${recording ? 'red' : 'transparent'}`, fontSize:'20', paddingHorizontal:5}}
                >
                    {`00:00:${timer < 10 ? '0' : ''}${timer}`}
                    </Text>
            </View>
            <View style={{position:'absolute', bottom: '5.5%',right:'5%', alignSelf: 'flex-end'}}>
                <Ionicons name="md-camera-reverse-outline" size={30} color="white" onPress={toggleCameraType} />
            </View>
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
                            // alert(recordedVideo);
                            console.log(recordedVideo);
                            clearInterval(intervalId);
                            setTimer(0);
                            // console.log(recordedVideo.duration);
                            // shareAsync(video.uri);
                        });
                        // console.log("video", video);
                    } else {
                        setRecording(false);
                        cameraRef.stopRecording();
                        clearInterval(intervalId);
                        setTimer(0);
                        // alert('pressed stop');
                    }
                }}
>
        <View
            style={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: `${recording ? 'white' : 'red'}`,
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
        <View
        style={recording ? styles.endRecordingButton : styles.startRecordingButton }
        ></View>
    </View>
    </TouchableOpacity>
            </View>
          </Camera>
        </View>

        <View style={styles.bottomView}>
            <Button 
            onPress = {shareVideo} 
            title="Translate" 
            style={styles.translateButton}
            />
            <Text  style = {styles.translatedText}>
                {translatedText}
            </Text>
        </View>

        </View>
      );
}

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
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  bottomView: {
    height: '25%',
    marginTop: '5%'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  translateButton:{
    marginTop: 100,
  },
  translatedText:{
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:20,
    marginTop: 20,
  },
  startRecordingButton: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "red",
    height: 40,
    width: 40,
    backgroundColor: "red",
  },
  endRecordingButton: {
    borderWidth: 2,
    borderRadius: 0,
    borderColor: "red",
    height: 20,
    width: 20,
    backgroundColor: "red"
  }
});
   