import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { Camera } from 'expo-camera';


export default function TranslateScreen({navigation}){

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [record, setRecord] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    useEffect(()=>{
       (async ()=>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
       })(); 
    },[]);

    const takeVideo = async () =>{
        if(camera){
            const data = await camera.recordAsync({
                maxDuration:10
            })
            setRecord(data.uri);
            console.log(data.uri);
        }
    }

    const stopVideo = async ()=>{
        camera.stopRecording();
    }

    if(hasCameraPermission === null ){
        return <View />;
    }

    if(hasCameraPermission === false ){
        return (<View style={styles.container}>
            <Text>No Camera Access</Text>
            </View>);
    }

    return(
        <View style={styles.container}>
           
                <Camera
                    ref = { ref => setCamera(ref) }
                    style = {styles.fixedRatio}
                    type = {type}
                    
                />
          

            <Button title='Take Video' onPress={()=>takeVideo()}/>
            <Button title='Stop Video' onPress={()=>stopVideo()}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center'
    },
    cameraContainer:{

    }
   })
   