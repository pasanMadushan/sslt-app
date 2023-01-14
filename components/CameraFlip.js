import React from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    cameraFlipIcon: {
        position:'absolute',
        bottom: '5.5%',
        right:'5%',
        alignSelf: 'flex-end'
    }
});

const CameraFlip = (props) => {
    return (
        <View style={styles.cameraFlipIcon}>
            <Ionicons name="md-camera-reverse-outline" size={30} color="white" onPress={props.toggleCameraType} />
        </View>
    )
}

export default CameraFlip;