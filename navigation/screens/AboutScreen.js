import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default function AboutScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text>
                This is About Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center'
    }
   })
   