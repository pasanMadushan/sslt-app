import React from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    videoPickerIcon: {
        position:'absolute',
        bottom: '5.5%',
        left:'5%',
        alignSelf: 'flex-start'
    },
});

const VideoPicker = (props) => {
    return (
        <View style={styles.videoPickerIcon}>
            <Ionicons name="md-images-outline" size={30} color="white" onPress={props.pickImage} />
        </View>
    )
}

export default VideoPicker;