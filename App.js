import React, { useCallback, useState, useEffect} from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { StateProvider } from './StateProvider';
import reducer, { initialState, themeHueDark, themeHueLight} from './Reducer';
import { getObjectSettings, initialSettings, setObjectSettings, clearObjectSettings} from './APIs';
import Home from './Home';

// NavigationBar.setBackgroundColorAsync("#e1e1e101"); 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
      Lobster_400Regular,
    });

  useEffect(() => {
    async function prepare() {
      try {
        let value = await getObjectSettings();
        if( value === null) {
          setObjectSettings(initialSettings);
        } else {
          console.log('we good')
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
    if (fontsLoaded && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
       <View onLayout={onLayoutRootView} style={{
        flex: 1,
      }}>
        <Home fontFamily = 'Lobster_400Regular'/>
        {/* <StatusBar style='dark' backgroundColor='#fff'/> */}
      </View>
    </StateProvider>  
  );
}
