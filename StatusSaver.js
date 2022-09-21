import { View, StatusBar, SafeAreaView} from 'react-native'
import React, { useCallback, useState, useEffect}  from 'react'
import Home from './Home';
import * as SplashScreen from 'expo-splash-screen';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import * as NavigationBar from 'expo-navigation-bar';
import * as MediaLibrary from 'expo-media-library';
import PermissionScreen from './PermissionScreen';
import {useFonts} from 'expo-font';
import { getObjectSettings, initialSettings, setObjectSettings, clearObjectSettings } from './APIs';

export default function StatusSaver() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, dispatch] = useStateValue();

  const [fontLoaded] = useFonts({
    'Lobster-Regular': require('./assets/Fonts/Lobster-Regular.ttf')
  })

  useEffect(() => {
    async function prepare() {
      
      try {
        let value = await getObjectSettings();
        if( value === null) {
          setObjectSettings(initialSettings);
        } else {
            let settings = await getObjectSettings();
            console.log(settings)
            let action = {
                type : actionTypes.setTheme,
                theme: settings.theme
            }
            dispatch(action);
        }

        let status = await MediaLibrary.getPermissionsAsync();
        if(status.granted === true){
           let action = {
            type : actionTypes.setPermissionState,
            permissionState: true
          }
          dispatch(action)
        }
       
      } catch (e) { 
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      StatusBar.setBackgroundColor(state.themeHue.primary);
      StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'dark-content' : 'light-content');

      NavigationBar.setBackgroundColorAsync(state.themeHue.primary)
      NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "dark" : "light")

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: state.themeHue.primary,
        flex: 1,
    }}>
      {
        state.permissionState === false ? (
          <PermissionScreen/>
        ) : (
          <Home font = "Lobster-Regular"/>
        )
      }  
    </SafeAreaView>
  )
}