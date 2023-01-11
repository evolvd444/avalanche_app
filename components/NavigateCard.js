import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';



const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView style= {tw`bg-white flex-1`}>
      <Text style = {tw`text-center py-5 text-xl`}>Hello, User!</Text>
      <View style ={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
            placeholder= "Where to?"
            styles = {toInputBoxStyles}
            returnKeyType={"search"}
            fetchDetails={true}
            clear
            query= {{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
            onPress={(data, details = null) => {
                dispatch(
                    setDestination({
                    location: details.geometry.location,
                    description: data.description,
                 })
                 
                );
               
                // console.log(data);
                // console.log(details)
                navigation.navigate("DeliveryOptionsCard");
            }}
            enableHighAccuracyLocation={true}
            currentLocation={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            
            />
        </View>
        <NavFavorites/>
      </View>
      <View style={tw` flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("DeliveryOptionsCard")}
        style={tw`flex flex-row justify-between bg-black w-28 px-4 py-3 rounded-full`}
        >
            <Icon name= "truck" type= "font-awesome" color= "white" size= {16}/>
            <Text style={tw`text-white text-center`}> Deliveries </Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity
        style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
            <Icon name= "fast-food-outline" type= "ionicon" color= "black" size= {16}/>
            <Text> New Option</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize:18,
    },
    textInputContainer: {
        paddingHorizontal: 20, 
        paddingBottom: 0,
    }
})