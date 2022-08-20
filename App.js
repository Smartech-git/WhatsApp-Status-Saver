import React, { useCallback} from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { StatusBar } from 'expo-status-bar';
import { StateProvider } from './StateProvider';
import reducer, { initialState} from './Reducer';
import Home from './Home';

SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
 
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
       <View onLayout={onLayoutRootView} style={{
        flex: 1,
      }}>
        <Home fontFamily= 'Lobster_400Regular'/>
        {/* <StatusBar style='dark' backgroundColor='#fff'/> */}
      </View>
    </StateProvider>  
  );
}
