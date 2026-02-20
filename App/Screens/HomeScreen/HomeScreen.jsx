import { View, Text } from 'react-native'
import React from 'react'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
]);

import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'
import { ScrollView } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView>
      {/* Header  */}
      <Header/>
      <View style={{padding:20}}>
        {/* Slider  */}
        <Slider/>
        {/* Categories  */}
        <Categories/>
        {/* Business List  */}
        <BusinessList/>
      </View>
    
    </ScrollView>
  )
}