import { View, TouchableOpacity, Animated} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import Header from './Components/Header'
import TopTabBar from './Components/TopTabBar'
import { useStateValue } from './StateProvider'
import Home_Images from './Screens/Home_Images'
import Home_Videos from './Screens/Home_Videos'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
    <View style={{
      flex: 1
    }}>
        <Header fontFamily={props.fontFamily}/>
        <NavigationContainer>
           <Tab.Navigator
            tabBar ={props => <TopTabBar {...props} />}
            sceneContainerStyle = {{
              backgroundColor: state.themeHue.primary,
              paddingHorizontal: 15
            }}
            style={{marginTop: 20}}
           >
            <Tab.Screen 
             name="Images" component={Home_Images} />
            <Tab.Screen name="Videos" component={Home_Videos} />
          </Tab.Navigator>
        </NavigationContainer> 
    </View>
  )
}