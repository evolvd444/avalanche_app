import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React, {useState} from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [

  {
    id: "IceTruck109",
    title: "Small Business",
    multiplier: 10,
    image: require('../assets/128px_ice_cubes_smallBusiness.png'),
    price: '$555'
  },
  {
  id: "IceTruck199",
  title: "Medium Business",
  multiplier: 20,
  image: require('../assets/igloo_128px_medBusiness.png'),
  price: '$1981',
},
{
  id: "IceTruck1099",
  title: "Commercial",
  multiplier: 60,
  image: require('../assets/128px_glacier.png'),
  price: '$4897'
},
];

// If we have a Surge Charge, price goes up
const SURGE_CHARGE_RATE = 2.5;

const DeliveryOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);


  return (
    <SafeAreaView style={tw`bg-white flex-grow justify-between`}>
      <View >

      <TouchableOpacity 
      onPress={() => navigation.navigate("NavigateCard")}
      style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
        <Icon name="chevron-left" type="fontawesome" style= {tw`rounded-full `}/>
      </TouchableOpacity>
      <Text style={tw`text-center py-5 text-xl font-semibold `}> Ice Needed? - {travelTimeInformation?.distance?.text} </Text>
      </View>
      <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, title, multiplier, price, image}, item}) => (
        <TouchableOpacity 
        onPress={()=> setSelected(item)}
        style={tw`flex-row justify-between items-center px-5 ${ id === selected?.id && "bg-gray-200"}`}>

          <Image
            style={{
              width: 90,
              height: 90,
              resizeMode: "contain",
            }}
            source = {image}
          />
          <View style = {tw`-ml-6 items-center`}>
            <Text style={tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
          </View>
          <Text style={tw`text-xl`}> {new Intl.NumberFormat("en-us", {
            style: 'currency',
            currency: "USD",
          }).format(
            (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
          )} 
          </Text>
        </TouchableOpacity>
      )}
      />
      <View style ={tw`mt-auto border-t border-blue-400`}>
        <TouchableOpacity
        disabled={!selected}
        style={tw`bg-blue-200 py-3 m-3 ${!selected && "bg-blue-300 border-t"}`}>
          <Text style={tw`text-center text-black text-xl`}> Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default DeliveryOptionsCard

const styles = StyleSheet.create({})