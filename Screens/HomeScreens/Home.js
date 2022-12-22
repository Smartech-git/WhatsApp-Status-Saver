import { View, TouchableOpacity, Animated} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import TopTabBar from '../../Components/TopTabBar'
import { useStateValue } from '../../StateProvider'
import Header from '../../Components/Header'
import Home_Images from './Home_Images'
import Home_Videos from './Home_Videos'
import {getViewedStatusImages } from '../../Utilities/ViewedStatusManager';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
      <View style={{
        flex: 1,
      }}>
        <Header/>
        <Tab.Navigator
          tabBar ={props => <TopTabBar {...props} />}
          sceneContainerStyle = {{
            backgroundColor: state.themeHue.primary,
          }}
          screenOptions={{
          
          }}
          style={{marginTop: 10}}
        >
          <Tab.Screen name="Images" component={Home_Images} />
          <Tab.Screen name="Videos" component={Home_Videos} />
        </Tab.Navigator> 
      </View>
  )
}