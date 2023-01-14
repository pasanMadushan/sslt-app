import React from 'react';
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
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
    },
});

const RecordingBtn = (props) => {
    return (
        <View
            style={{
                borderWidth: 2,
                borderRadius: 25,
                borderColor: `${props.recording ? 'white' : 'red'}`,
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={props.recording ? styles.endRecordingButton : styles.startRecordingButton }
            />
        </View>
    )
}

export default RecordingBtn;