import { View } from 'react-native'
import React, { useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import BaseScreens from './BaseScreens';
import Image_view from './Image_view';
import Video_view from './Video_view';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
    <View style={{
      flex: 1,
      backgroundColor: state.themeHue.primary
    }}>
      <Stack.Navigator
        screenOptions={{
        }}
      >
        <Stack.Screen name="Base" component={BaseScreens}
          options={{
            headerShown: false
          }}
         />
        <Stack.Screen name="ImageView" component={Image_view}
          options={{
            headerShown: false
          }}
         />
        <Stack.Screen name="VideoView" component={Video_view}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </View>
  )
}