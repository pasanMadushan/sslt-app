import React,{useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function TranslateScreen({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [translatedText, setTranslatedText] = useState('test');
    const [recording, setRecording] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [video, setVideo] = useState();
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
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={async () => {
                    if (!recording && !cameraRef) {
                        setRecording(true);
                        let options = {
                            quality: "1080p",
                            maxDuration: 60,
                            mute : true
                        }
                        cameraRef.current.recordAsync(options).then((recordedVideo)=>{
                            setVideo(recordedVideo);
                            setRecording(true);
                        });
                        // console.log("video", video);
                    } else {
                        setRecording(false);
                        cameraRef.stopRecording();
                    }
                }}
>
        <View
            style={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: "red",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
        <View
        style={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: "red",
            height: 40,
            width: 40,
            backgroundColor: "red",
        }}
        ></View>
    </View>
    </TouchableOpacity>
            </View>
          </Camera>
        </View>

        <View style={styles.bottomView}>
            <Button 
            onPress = {() => {alert('pressed')}} 
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
    height: '100%',
  },
  cameraView: {
    height: '70%'
  },
  
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
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
  }
});
   