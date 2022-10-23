import { View, Text, Image, StyleSheet, Animated, Pressable, Easing, StatusBar, PixelRatio} from 'react-native'
import { useStateValue } from '../StateProvider'
import { Shadow } from 'react-native-shadow-2'
import { actionTypes } from '../Reducer'
import * as NavigationBar from 'expo-navigation-bar';
import { mergeToObjectSettings, settingsType } from '../APIs'
import React, {useEffect} from 'react'
import EmojiProfile from './EmojiProfile';

const themeEmojis = {
  light : require('../assets/Images/EmojiPack/Sun_Behind_Small_Cloud.png'),
  dark : require('../assets/Images/EmojiPack/Crescent_Moon.png')
}

export default function Header(props) {
  const [state, dispatch] = useStateValue();

  let swipe = new Animated.Value(state.theme === 'LIGHT' ? 0 : 35)

  const handlePressEvent = (e) => {
    Animated.timing(swipe,
      {
        toValue: state.theme === 'LIGHT' ? 35 : 0,
        duration: 170,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(3))
      }
    ).start(() => {
      const action = {
        type: actionTypes.setTheme,
        theme: state.theme === 'LIGHT' ? 'DARK' : 'LIGHT'
        }
      dispatch(action);
        StatusBar.setBackgroundColor(state.theme === 'LIGHT' ? '#0D1F29' : '#ffffff');
        StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'light-content' : 'dark-content');

        NavigationBar.setBackgroundColorAsync(state.theme === 'LIGHT' ? '#0D1F29' : '#FFFFFF')
        NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "light" : "dark")
        mergeToObjectSettings(state.theme === 'LIGHT' ? settingsType.setThemeDark : settingsType.setThemeLight)
    });
  }
 
  return (
    <View style={styles.Header}>
      <View style={{flexDirection: 'row'}}>
        <EmojiProfile/> 
        <Text style={{fontFamily: state.fontFamily, color: state.themeHue.secondary, fontSize: 24,
          marginTop: 4,
          marginLeft: 5
        }}>Status Saver</Text>
      </View>

      <Pressable onPress={handlePressEvent}  style={{...styles.themeButton, 
        backgroundColor: state.themeHue.primary_dark, 
        borderColor: state.themeHue.secondary_sub,
      }}>
        <View style={{zIndex: 1}}>
          <Animated.View style={{position: 'relative', transform: [{ translateX: swipe}]}}>
          
            <Shadow startColor={ state.theme === 'LIGHT' ? '#00000020' : '#e1e1e120'} offset={[0, 1]} distance={4}>
              <View style={styles.themeButton_thumb}/>
            </Shadow>
            
          </Animated.View>
        </View>
        { state.theme === 'LIGHT' ?
          <Animated.View style={{position: 'absolute',
            opacity: swipe.interpolate({
              inputRange: [0,1],
              outputRange: state.theme === 'LIGHT'? [1, 0] : [0, 1]
            })
          }}>
            <EmojiThemeIcon size = {12} position={39} path = {themeEmojis.light}/> 
          </Animated.View>
          :
          <Animated.View style={{position: 'absolute',
            opacity: swipe.interpolate({
              inputRange: [0,1],
              outputRange: state.theme === 'DARK'? [0, 1] : [1, 0]
            })
          }}>
            <EmojiThemeIcon size = {10} position={7} path = {themeEmojis.dark}/>
          </Animated.View>
          
        }
      </Pressable>
       
    </View>
  )
}

function EmojiThemeIcon(props) {
  return (
    <Image style={{ 
      width: PixelRatio.getPixelSizeForLayoutSize(props.size), height: PixelRatio.getPixelSizeForLayoutSize(props.size),
      left: props.position,
      }}  
    source={props.path}/>
  )
}

const styles = StyleSheet.create({
  Header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  themeButton: {
    width: 70,
    height: 34, 
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6
  },
  themeButton_thumb:{
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: '#00D426',
    borderColor: '#ffffff',
    borderWidth: 2,
    zIndex: 2
  }
})