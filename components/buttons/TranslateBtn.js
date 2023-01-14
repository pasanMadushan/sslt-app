import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    bottomView: {
        height: '25%',
        marginTop: '5%'
    },
    translateButton: {
        marginTop: 100,
    },
    translatedText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
});

const TranslateBtn = (props) => {
    return (
        <View style={styles.bottomView}>
            <Button
                onPress = {props.shareVideo}
                title="Translate"
                style={styles.translateButton}
            />
            <Text  style = {styles.translatedText}>
                {props.translatedText}
            </Text>
        </View>
    )
}

export default TranslateBtn;