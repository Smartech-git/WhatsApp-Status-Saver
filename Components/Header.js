import { View, Text, Image, StyleSheet, Pressable, StatusBar, PixelRatio} from 'react-native'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer'
import * as NavigationBar from 'expo-navigation-bar';
import { mergeToObjectSettings, settingsType } from '../APIs'
import React, {useEffect, useState} from 'react'
import EmojiProfile from './EmojiProfile';
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { setShouldTabHideRef } from '../Utilities/GestureHandler';

const themeEmojis = {
  light : require('../assets/Images/EmojiPack/Sun_Behind_Small_Cloud.png'),
  dark : require('../assets/Images/EmojiPack/Crescent_Moon.png')
}

export default function Header(props) {
  const [state, dispatch] = useStateValue();
  const [showDropDownbox, setShowDropDownBox] = useState(false)
  const swipe = useSharedValue(state.theme === 'LIGHT' ? 0 : 37)
  const DropDownValue = useSharedValue({width: 200, height: 70, opacity: 0, translateY: 0});
  const navigation = useNavigation()
  
  const swipeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: swipe.value
      }]
    }
  })

  const dropDownAnimatedStyle = useAnimatedStyle(() => {
    const animatedHeight = withSpring(DropDownValue.value.height, {mass: 0.5,})
    const animatedWidth = withSpring(DropDownValue.value.width, {mass: 0.5})
    const animatedOpacity = withSpring(DropDownValue.value.opacity, {mass: 0.5})
    return {
      height: animatedHeight,
      width: animatedWidth,
      opacity: animatedOpacity,
      // transform: [{
      //   translateY: animatedTranslateY
      // }]
    }
  })

  const EmojiAnimatedStylesLight = useAnimatedStyle(() => {
    const opacity = interpolate(swipe.value, [0, 1], state.theme === 'LIGHT' ? [1, 0] : [0, 1], {
      extrapolateLeft: Extrapolation.IDENTITY,
      extrapolateRight: Extrapolation.CLAMP
    } )

    return {
      opacity: opacity,
    };
  });
  const EmojiAnimatedStylesDark = useAnimatedStyle(() => {
    const opacity = interpolate(swipe.value, [0, 1], state.theme === 'DARK' ? [0, 1] : [1, 0], {
      extrapolateLeft: Extrapolation.IDENTITY,
      extrapolateRight: Extrapolation.CLAMP
    } )

    return {
      opacity: opacity,
    };
  });

  const handleHideDropBoxPressIn = () => {
    if(showDropDownbox){
       DropDownValue.value={width: 200, height: 70, opacity: 0, translateY: -10}
    } 
  }
  const handleHideDropBoxPressOut = () => {
    if(showDropDownbox){setShowDropDownBox(false)}
  }

  const hangdleNavigationToSettings = () => {
    navigation.navigate('Settings');
    handleHideDropBoxPressIn()
    setShouldTabHideRef("false")
  }
  const handlePressEvent = (e) => {
    if(state.themeModeCustom === false){
      setShowDropDownBox(true)
      DropDownValue.value={width: 250, height: 100, opacity: 1, translateY: 0}
      return
    }
    swipe.value = withTiming(state.theme === 'LIGHT' ? 37: 0, {
      duration: 170,
      easing: Easing.out(Easing.back(3))
    })

    const action = {
        type: actionTypes.setTheme,
        theme: state.theme === 'LIGHT' ? 'DARK' : 'LIGHT'
        }
      dispatch(action);
        StatusBar.setBackgroundColor(state.theme === 'LIGHT' ? '#111B21' : '#ffffff');
        StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'light-content' : 'dark-content');

        NavigationBar.setBackgroundColorAsync(state.theme === 'LIGHT' ? '#111B21' : '#FFFFFF')
        NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "light" : "dark")
        mergeToObjectSettings(state.theme === 'LIGHT' ? settingsType.setThemeDark : settingsType.setThemeLight)

  }
 
  return (
    <View>
      <View style={styles.Header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.AppLogo, {backgroundColor: state.themeHue.primary_dark}]}>
          <Image style={{
                width: PixelRatio.getPixelSizeForLayoutSize(13),
                height: PixelRatio.getPixelSizeForLayoutSize(13),
            }} source={require('../assets/Images/Logo.png')}/>
          </View>
          <Text style={{ color:  state.theme === 'LIGHT' ? '#000' : '#FFF', fontSize: 23,
            marginTop: 4,
            marginLeft: 5,
            fontWeight: '700',
            letterSpacing: -0.5
          }}>Status Saver</Text>
        </View>

        <EmojiProfile/> 
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10
  },
  AppLogo:{
    width: 34,
    height: 34,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  }
})