import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    timer: {
        position: 'absolute',
        top:'5%',
        alignSelf: 'center'
    },
});

const Timer = (props) => {
    return (
        <View style={styles.timer}>
            <Text
                style={{
                    color: 'white',
                    backgroundColor:`${props.recording ? 'red' : 'transparent'}`,
                    fontSize:'20', paddingHorizontal:5}}
            >
                {`00:00:${props.timer < 10 ? '0' : ''}${props.timer}`}
            </Text>
        </View>
    )
}

export default Timer;