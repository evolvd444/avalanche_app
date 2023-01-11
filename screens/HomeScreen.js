import { StyleSheet, Text, View, SafeAreaView, Image, } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';
// aquamarine (`#7fffd4`)
// aliceblue (`#f0f8ff`)
// cyan (`#00ffff`)


const HomeScreen = () => {
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style= {tw `p-10 -mb-7 `}>
        <Image style = {{
            width: 120,
            height: 120,
            resizeMode: 'contain'
            
        }}
        
            source = {
                require('../assets/logo2_avalanche.png')}
                
                />
                
                <View style={tw`flex-row`}>

                <Text style= {tw`mt-2 text-4xl font-extrabold leading-9 `}> Avalanche </Text>
                <Text style= {tw`mt-0 leading-4 font-medium pt-4`}> Ice on Demand</Text>
                
                </View>
                


                <GooglePlacesAutocomplete 
            placeholder='Where From?'
            styles= {{
                container: {
                    flex:0,
                    backgroundColor: `#f0f8ff`,
                    backgroundOpacity: 0.1,
                    padding:3,
                    paddingLeft: 1.5,
                    paddingRight: 4,
                    paddingTop: 1.5,
                    paddingBottom: 0,
                    marginBottom: 5,
                    borderRadius:7,
                    border: 10,

                },

                textInput: {
                    fontSize:18,
                    opacity: 0.9
                }
            }}
            query= {{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
            onPress={(data, details = null) => {
                dispatch(
                    setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                 })
                );
                dispatch(setDestination(null));
                // console.log(data);
                // console.log(details)
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength = {2}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            />
      <NavOptions/>
      </View>
      <Text style={tw`flex-row text-center -mb-1 bg-blue-50 border-4 border-black border-solid font-medium text-lg `}> My Favorites </Text>
      <NavFavorites/>
      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})