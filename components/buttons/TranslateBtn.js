import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
    bottomView: {
        height: '25%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1B2C56',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
    },
});

const TranslateBtn = (props) => {
    return (
        <View style={styles.bottomView}>
            <TouchableOpacity style={styles.button} onPress={props.shareVideo}>
                <Text style={styles.buttonText}>Translate</Text>
            </TouchableOpacity>
            <Text style = {styles.buttonText}>
                {props.translatedText}
            </Text>
        </View>
    )
}

export default TranslateBtn;
