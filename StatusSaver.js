import { View, StatusBar, SafeAreaView } from 'react-native'
import React, { useCallback, useState, useEffect}  from 'react'
import Home from './Home';
import * as SplashScreen from 'expo-splash-screen';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { getObjectSettings, initialSettings, setObjectSettings, clearObjectSettings} from './APIs';


export default function StatusSaver() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [state, dispatch] = useStateValue();

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
            let settings = await getObjectSettings();
            let action = {
                type : actionTypes.setTheme,
                theme: settings.theme
            }
            dispatch(action);

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
        StatusBar.setBackgroundColor(state.themeHue.primary);
        StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'dark-content' : 'light-content');

        NavigationBar.setBackgroundColorAsync(state.themeHue.primary)
        NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "dark" : "light")
        await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: state.themeHue.primary,
        flex: 1,
    }}>
       <Home fontFamily = 'Lobster_400Regular'/>
       {/* <StatusBar barStyle={ state.theme === 'LIGHT' ? 'dark-content' : 'light-content'} backgroundColor={state.themeHue.primary}/> */}
    </SafeAreaView>
  )
}