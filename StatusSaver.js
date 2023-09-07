import { View, StatusBar, SafeAreaView, Appearance, PermissionsAndroid} from 'react-native'
import React, { useCallback, useState, useEffect}  from 'react'
import Home from './Screens/HomeScreens/Home'
import Gallary from './Screens/Gallary';
import Settings from './Screens/Settings'
import ScreenHeaders from './Components/ScreenHeaders';
import BottomNavTabBar from './Components/BottomNavTabBar'
import * as SplashScreen from 'expo-splash-screen';
import { actionTypes, themeHueDark, themeHueLight } from './Reducer';
import { useStateValue } from './StateProvider';
import * as NavigationBar from 'expo-navigation-bar';
import * as MediaLibrary from 'expo-media-library';
import PermissionScreen from './PermissionScreen';
import * as Font from 'expo-font';
import { getObjectSettings, initialSettings, setObjectSettings, clearObjectSettings} from './APIs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements'
import { NavigationContainer} from '@react-navigation/native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as FileSystem from 'expo-file-system';
import { FILE_PATH } from './Utilities/ViewedStatusManager';
import LocalNotification from './Components/LocalNotification';


const BottomTab = createBottomTabNavigator()
const colorScheme = Appearance.getColorScheme().toUpperCase();

const LightTheme = {
  dark: false,
  colors: {
    primary: '#FAFAFA',
    background: '#FAFAFA',
    card: '#F3F5F7',
    text: '#000000',
    border: '#FFFFFF',
    notification: '#00D426',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: '#111B21',
    background: '#111B21',
    card: '#1A3848',
    text: '#FFFFFF',
    border: '#111B21',
    notification: '#00D426',
  },
};

export default function StatusSaver() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, dispatch] = useStateValue();

  activateKeepAwake()

  useEffect(() => {
    //console.log(state)
  }, [state])

  const getObjectSettingsRef = async () => {
    let value = await getObjectSettings();
    if( value === null) {
      setObjectSettings(initialSettings);

    } else {
        let settings = await getObjectSettings();

        let themeMode
        if(settings.themeModeCustom === false){ themeMode = colorScheme} 
        else { themeMode = settings.theme }
        
        let multipleAction = {
          type: actionTypes.setMutipleStates,
          multipleStates: {
            theme: themeMode,
            autoSave: settings.autoSave,
            themeModeCustom: settings.themeModeCustom,
            themeHue: themeMode === 'LIGHT' ? themeHueLight : themeHueDark,
            deviceColorScheme: colorScheme
          }
        }

        dispatch(multipleAction)
    }
  }

  const getPermissionsAsync = async () => {
    
    let status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if(status === true){
       let permissionAction = {
        type : actionTypes.setPermissionState,
        permissionState: true
      }

      let filePath;
      await Promise.all(FILE_PATH.map(async (item) => {
        const info  = await FileSystem.getInfoAsync(item);
          if(info.exists === true){
              filePath = item
          }
      }))
    
      let validFilePathAction = {
        type : actionTypes.setValidFilePath,
        validFilePath: filePath
      }

      dispatch(permissionAction)
      dispatch(validFilePathAction)
    }
  }

  useEffect(() => {
    async function prepare() {
      
      try {
        await Promise.all([
          Font.loadAsync({'Lobster-Regular': require('./assets/Fonts/Lobster-Regular.ttf')}),
          getObjectSettingsRef(),
          getPermissionsAsync(),
        ])
      } catch (e) { 
        console.warn(e);
      } finally {
        setAppIsReady(true);
        deactivateKeepAwake()
      }
    }

    prepare();
  }, []);

  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
  
      StatusBar.setBackgroundColor(state.themeHue.primary);
      StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'dark-content' : 'light-content');
      StatusBar.setTranslucent(true)

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
        flex: 1,
        backgroundColor: state.themeHue.primary
    }}>
      <LocalNotification/>
      {
        state.permissionState === false ? (
          <PermissionScreen/> 
        ) : (
          <NavigationContainer 
           theme={state.theme === 'LIGHT' ? LightTheme : DarkTheme}>
            <BottomTab.Navigator
              sceneContainerStyle = {{
                backgroundColor: state.themeHue.primary,
                borderBottomWidth: 0
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
                  title: 'Home',
                }}
              />
              <BottomTab.Screen name = "Gallary"
              component={Gallary}
              />
              <BottomTab.Screen name = "Settings" component={Settings}/>
            </BottomTab.Navigator>
          </NavigationContainer>
        )
      }
    </SafeAreaView>
  )
}