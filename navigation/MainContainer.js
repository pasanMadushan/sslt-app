import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


//screens
import HomeScreen from './screens/HomeScreen';
import TranslateScreen from './screens/TranslateScreen';
import AboutScreen from './screens/AboutScreen';

//Screen names
const homeName = 'Home';
const translateName  = 'Translate';
const aboutName = 'About';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions = {({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: "#1B2C56",
                    tabBarStyle: [
                      {
                        display: "flex"
                      },
                      null
                    ],
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn  = route.name;

                        if(rn === homeName){
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn===translateName){
                            iconName = focused ? 'language' : 'language-outline'
                        } else if (rn === aboutName){
                            iconName = focused ? 'information-circle' : 'information-circle-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                >
                
                <Tab.Screen name={homeName} component= { HomeScreen } options={ {title : "Home" , headerTitleAlign:'center' } }/>
                <Tab.Screen name={translateName} component= { TranslateScreen } options={{ headerTitleAlign:'center' }} />
                <Tab.Screen name={aboutName} component= { AboutScreen } options={{ headerTitleAlign:'center' }} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}