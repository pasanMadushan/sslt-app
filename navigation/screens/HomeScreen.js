import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text>
                This is Home Screen
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
   