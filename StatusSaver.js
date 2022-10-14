import { View, StatusBar, SafeAreaView} from 'react-native'
import React, { useCallback, useState, useEffect}  from 'react'
import Home from './Screens/HomeScreens/Home'
import Gallary from './Screens/Gallary';
import Settings from './Screens/Settings'
import ScreenHeaders from './Components/ScreenHeaders';
import BottomNavTabBar from './Components/BottomNavTabBar'
import * as SplashScreen from 'expo-splash-screen';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import * as NavigationBar from 'expo-navigation-bar';
import * as MediaLibrary from 'expo-media-library';
import PermissionScreen from './PermissionScreen';
import * as Font from 'expo-font';
import { getObjectSettings, initialSettings, setObjectSettings, clearObjectSettings } from './APIs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements'
import { getViewedStatusImages } from './Utilities/GetViewedStatus';


const BottomTab = createBottomTabNavigator()

export default function StatusSaver() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, dispatch] = useStateValue();

  const getObjectSettingsRef = async () => {
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
    }
  }

  const getPermissionsAsync = async () => {
    
    let status = await MediaLibrary.getPermissionsAsync();

    if(status.granted === true){
       let action = {
        type : actionTypes.setPermissionState,
        permissionState: true
      }
      dispatch(action)
    }
  }

  useEffect(() => {
    async function prepare() {
      
      try {
        await Promise.all([
          Font.loadAsync({'Lobster-Regular': require('./assets/Fonts/Lobster-Regular.ttf')}),
          getObjectSettingsRef(),
          getPermissionsAsync(),
          getViewedStatusImages()
        ])
       
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
        flex: 1,
    }}>
      {
        state.permissionState === false ? (
          <PermissionScreen/>
        ) : (
          <BottomTab.Navigator
            sceneContainerStyle = {{
              backgroundColor: state.themeHue.primary,
            }}
            tabBar={props => <BottomNavTabBar {...props}/>}
            screenOptions = {{
              header: ({ navigation, route, options }) => {
                const title = getHeaderTitle(options, route.name);
                return <ScreenHeaders title={title}/>;
              },
            
            }}
          >
            <BottomTab.Screen name = "Home" 
              component={Home}
              options= {{
                headerShown: false,
                title: 'Status',
              }}
            />
            <BottomTab.Screen name = "Gallary"
             component={Gallary}
            />
            <BottomTab.Screen name = "Settings" component={Settings}/>
          </BottomTab.Navigator>
        )
      }  
    </SafeAreaView>
  )
}