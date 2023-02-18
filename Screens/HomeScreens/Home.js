import { View } from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import { createStackNavigator } from '@react-navigation/stack';
import BaseScreens from './BaseScreens';
import Image_view from './Image_view';
import Video_view from './Video_view';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
    <View style={{
      flex: 1,
      backgroundColor: state.themeHue.primary
    }}>
      <Tab.Navigator 
        tabBar ={props => <View></View>}
        screenOptions={{
          animationEnabled: false,
          swipeEnabled: false
        }}
      >
        <Tab.Screen options={{
          headerShown: false,
        }} name="Base" component={BaseScreens} />
        <Tab.Screen 
          options={{
            header: ({ navigation}) => {
              return (
               <ContentViewHeader screenType = "Images" navigation={navigation}/>
              )
            }
            
          }}
          name="ImageView" component={Image_view} 
        />
        <Tab.Screen name="VideoView" component={Video_view}/>
      </Tab.Navigator>
    </View>
  )
}