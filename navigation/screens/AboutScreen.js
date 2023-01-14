import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function AboutScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text>
                VERSION 1.0
            </Text>
            <View style={{height:20}}></View>

            <Image source={require('../../assets/logo.png')} style={styles.img} />
            
            <View style={{height:20}}></View>
            <Text style = {styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum faucibus elit sit amet vehicula. 
            Aenean vel tristique enim. Etiam in tellus tellus. Nullam laoreet lacinia laoreet. Nam porta ac 
            felis sit amet consequat. Pellentesque fermentum turpis quis lobortis porttitor. Integer orci orci, 
            hendrerit sit amet arcu at, volutpat dapibus enim. Vestibulum gravida sapien et pharetra vestibulum. 
            Pellentesque aliquet volutpat eleifend. Cras rhoncus accumsan metus, a mollis mi pellentesque id. Nam sit 
            amet eros quis purus facilisis gravida molestie eu ligula. Cras tempus metus ac pharetra bibendum. Morbi 
            non tincidunt tellus.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       padding : 45
    },
    bodyText:{
        textAlign:'center'
    },
    img:{
        height:75,
        width:75
    }
   })
   