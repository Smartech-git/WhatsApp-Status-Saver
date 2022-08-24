import { View, Text, SafeAreaView, StatusBar} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import Header from './Components/Header'
import { useStateValue } from './StateProvider';
import { getObjectSettings } from './APIs';
import { actionTypes } from './Reducer';
import * as NavigationBar from 'expo-navigation-bar';

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  useLayoutEffect(() => {
    const prepare = async () => {
      try {
        let settings = await getObjectSettings();
        
        let action = {
          type : actionTypes.setTheme,
          theme: settings.theme
        }
        dispatch(action);
        
      } catch(e) {
        console.log('Error in updating')
      }
    }
    prepare()
  }, [])

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(state.themeHue.primary)
    NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "dark" : "light")
  }, [state.theme])

  return (
    <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: state.themeHue.primary,
        flex: 1,
        paddingHorizontal: 15
    }}>
        <View style={{
        }}>
            <Header fontFamily={props.fontFamily}/>
            <Text>Home</Text>
        </View>
        <StatusBar barStyle={ state.theme === 'LIGHT' ? 'dark-content' : 'light-content'} backgroundColor={state.themeHue.primary}/>
    </SafeAreaView>
  )
}