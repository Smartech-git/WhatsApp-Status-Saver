import { View, StatusBar} from 'react-native'
import React, {useEffect} from 'react'
import TopTabBar from '../../Components/TopTabBar'
import { useStateValue } from '../../StateProvider'
import Header from '../../Components/Header'
import Home_Images from './Home_Images'
import Home_Videos from './Home_Videos'
import * as NavigationBar from 'expo-navigation-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getViewedStatusImages, getViewedStatusVideos} from '../../Utilities/ViewedStatusManager'
import { actionTypes } from '../../Reducer'
import { useNavigationState } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function BaseScreens(props) {
    const [state, dispatch] = useStateValue();

    const routeState = useNavigationState((state) => state.routes[1]?.name)


    useEffect(() => {
      const fullScreen = async () => {
        if(routeState === 'VideoView'){
          StatusBar.setBackgroundColor("#00000080");
          StatusBar.setBarStyle('light-content');

          NavigationBar.setButtonStyleAsync("light")
          NavigationBar.setBackgroundColorAsync("#000000")
          // NavigationBar.setBehaviorAsync('overlay-swipe')
          //NavigationBar.setVisibilityAsync("hidden");
        } else {
          StatusBar.setBackgroundColor(state.themeHue.primary);
          StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'dark-content' : 'light-content');
      
          NavigationBar.setBackgroundColorAsync(state.themeHue.primary)
          NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "dark" : "light")
        }
      }
      
      fullScreen()

      return(() => {
        StatusBar.setBackgroundColor(state.themeHue.primary);
        StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'dark-content' : 'light-content');

        NavigationBar.setBackgroundColorAsync(state.themeHue.primary)
        NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "dark" : "light")
        //NavigationBar.setVisibilityAsync("visible");
      })
    }, [routeState])

    const getImages = async () => {

      try {
        await getViewedStatusImages(state.validFilePath)
      } catch(e) {
       
      } finally {
        let action = {
          type : actionTypes.setLoadingStateImages,
          loadingStateImages: false
        }
        dispatch(action);
      } 

    }

    const getVideos = async () => {
      try {
        await getViewedStatusVideos(state.validFilePath)
      } catch(e) {
      } finally {
        let action = {
          type : actionTypes.setLoadingStateVideos,
          loadingStateVideos: false
        }
        dispatch(action);
      } 

    }

    useEffect(() => {
      async function prepare() {
      
        try {
          await Promise.all([
            getVideos()
          ])
        } catch (e) { 
          console.warn(e);
        } finally {
        }
      }
  
      prepare();

    }, [])

    useEffect(() => {
      async function prepare() {
      
        try {
          await Promise.all([
            getImages(),
          ])
        } catch (e) { 
          console.warn(e);
        } finally {
        }
      }
  
      prepare();

    }, [])
  
    return (
        <View style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: state.themeHue.primary
        }}>
          <Header/>
          <Tab.Navigator
            overScrollMode = 'never'
            tabBar ={props => <TopTabBar {...props} />}
            screenOptions={{
              animationEnabled: true,
              tabBarBounces: false 
            }}
          >
            <Tab.Screen name="Images" component={Home_Images} />
            <Tab.Screen name="Videos" component={Home_Videos} />
          </Tab.Navigator> 
        </View>
    )
  }