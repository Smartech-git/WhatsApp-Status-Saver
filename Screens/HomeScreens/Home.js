import { View, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import { createStackNavigator } from '@react-navigation/stack';
import BaseScreens from './BaseScreens';
import Image_view from './Image_view';
import Video_view from './Video_view';
import ContentViewHeader from '../../Components/ContentViewHeader';

const Stack = createStackNavigator()

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
    <View style={{
      flex: 1,
      backgroundColor: state.themeHue.primary
    }}>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false,
        }} name="Base" component={BaseScreens} />
        <Stack.Screen 
          options={{
            header: ({ navigation}) => {
              return (
               <ContentViewHeader screenType = "Images" navigation={navigation}/>
              )
            },
            
          }}
        name="ImageView" component={Image_view} />
        <Stack.Screen name="VideoView" component={Video_view}/>
      </Stack.Navigator>
    </View>
  )
}