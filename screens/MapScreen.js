import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from "tailwind-react-native-classnames"
import Maps from "../components/Maps"
import MapView from 'react-native-maps'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import DeliveryOptionsCard from '../components/DeliveryOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
const MapScreen = () => {
    const dispatch = useDispatch();
    const Stack = createStackNavigator();
    const navigation = useNavigation();
    const handleMenuButton = () => {
        dispatch(setOrigin(null));
        dispatch(setDestination(null))
        navigation.navigate('HomeScreen')
      };
   
  return (
    <View>
        <TouchableOpacity 
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        onPress = {() => {handleMenuButton(); }}
        >
        <Icon name="menu"/> 
        </TouchableOpacity>
      <View style={tw`h-1/2`}>
         <Maps/> 
         </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
            <Stack.Screen
                name= "NavigateCard"
                component= {NavigateCard}
                options= {{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name= "DeliveryOptionsCard"
                component= {DeliveryOptionsCard}
                options= {{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})