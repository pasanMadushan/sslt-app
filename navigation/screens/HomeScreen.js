import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <ImageBackground source={require('../../assets/background.jpeg')} style={styles.background}>
            <View style={styles.container}>
                <Text style= {styles.titleText} >
                    Hello!
                </Text>
                <View style={{height:20}}></View>
                <Text style = {styles.bodyText}>
                    Welcome to SSL Translator. We are here to make your sign language communication easy.
                    Translate Sinhala sign at your finger tip. Click here!
                </Text>
                <View style={{height:20}}></View>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Translate')}
                >
                    <Text style={styles.buttonText}>Translate</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       padding : 45,
    },
    bodyText:{
        textAlign:'center',
        color: '#000080',
        fontSize: 16,
        fontWeight:'500'
    },
    titleText:{
        fontWeight:'bold',
        fontSize:25,
        color: '#000080',

    },
    button: {
        backgroundColor: "#1B2C56",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})