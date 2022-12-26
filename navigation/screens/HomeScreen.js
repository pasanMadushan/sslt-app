import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';


export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text style= {styles.titleText} >
                Hello!
            </Text>
            <View style={{height:20}}></View>
            <Text style = {styles.bodyText}>
                Welcome to SSL Tranlator. We are here to make your sign language communication easy.
                Translate Sinhala sign at your finger tup. Click here!
            </Text>
            <View style={{height:20}}></View>
            <Button
                title="Translate"
                color = "#1B2C56"
                onPress={() => navigation.navigate('Translate')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       padding : 45,
    },
    bodyText:{
        textAlign:'center'
    },
    titleText:{
        fontWeight:'bold',
        fontSize:25
    }
   })
   