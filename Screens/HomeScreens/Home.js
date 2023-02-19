import { View } from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import { createStackNavigator } from '@react-navigation/stack';
import BaseScreens from './BaseScreens';
import Image_view from './Image_view';
import Video_view from './Video_view';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
            header: ({route}) => {
              return(
                <ContentViewHeader screenType="images"/>
              )
            }
          }}
         />
        <Stack.Screen name="VideoView" component={Video_view}/>
      </Stack.Navigator>
    </View>
  )
}