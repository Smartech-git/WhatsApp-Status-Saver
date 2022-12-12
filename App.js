import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StateProvider } from './StateProvider';
import reducer, { initialState} from './Reducer';
import StatusSaver from './StatusSaver'
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
 
NavigationBar.setBackgroundColorAsync('#00D426')
NavigationBar.setButtonStyleAsync("light")
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <NavigationContainer>
      <StateProvider initialState={initialState} reducer={reducer}>
        <GestureHandlerRootView style={{
          flex: 1,
        }}>
          <StatusSaver/>
        </GestureHandlerRootView>
      </StateProvider> 
    </NavigationContainer>    
  );
}
