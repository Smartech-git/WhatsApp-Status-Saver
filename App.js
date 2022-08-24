import React from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StateProvider } from './StateProvider';
import reducer, { initialState} from './Reducer';
import StatusSaver from './StatusSaver'

// NavigationBar.setBackgroundColorAsync("#e1e1e101"); 
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
       <View style={{
        flex: 1,
      }}>
        <StatusSaver/>
        {/* <StatusBar style='dark' backgroundColor='#fff'/> */}
      </View>
    </StateProvider>  
  );
}
