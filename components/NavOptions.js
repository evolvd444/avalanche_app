import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image  } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const data =[
    {
        id: "123",
        title: "Get Ice",
        image: require('../assets/truck_logo_128px.png'),
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Find Company",
        image: require('../assets/ice_routes.png'),
        screen: "CompaniesScreen", //all of this info will change
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
   
    useEffect(() => {
        if(origin === null) return;
    },[origin])

  return (
   <FlatList
   data= {data}
   keyExtractor={(item) => item.id}
   horizontal
   renderItem = {({item}) => (
    <TouchableOpacity 
    onPress={()=> 
        
        navigation.navigate(item.screen)} 
    style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 m-2 w-40`}
    disabled={!origin}
    >
    <View style = {tw`${!origin && "opacity-20"}`}>
        <Image
        styles = {styles.image}
        source={item.image} 
        />
        <Text style={tw`mt-2 text-lg font-semibold`}> {item.title}</Text>
        <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4` }name= 'arrowright' color= "white" type= "antdesign"/>
    </View>
    </TouchableOpacity>
   
   )}/>
  )
}

export default NavOptions

const styles = StyleSheet.create({
   
})