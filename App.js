import React from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StateProvider } from './StateProvider';
import reducer, { initialState} from './Reducer';
import StatusSaver from './StatusSaver'
import * as NavigationBar from 'expo-navigation-bar';

NavigationBar.setBackgroundColorAsync('#00D426')
NavigationBar.setButtonStyleAsync("light")
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
       <View style={{
        flex: 1,
      }}>
        <StatusSaver/>
      </View>
    </StateProvider>  
  );
}
