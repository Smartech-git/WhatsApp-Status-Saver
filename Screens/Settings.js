import { View, Text, StyleSheet, ScrollView, Image, PixelRatio, TouchableOpacity, Animated, Pressable, Easing, StatusBar } from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import { useStateValue } from '../StateProvider'
import { actionTypes, themeHueDark, themeHueLight} from '../Reducer'
import RadioButton from '../Components/RadioButton'
import { mergeToObjectSettings } from '../APIs'
import {Appearance} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

const colorScheme = Appearance.getColorScheme();

export default function Settings() {
  const [state, dispatch] = useStateValue()
  const [autoSave, setAutoSave] = useState(undefined)
  const [themeMode, setThemeMode]= useState(undefined)
  let swipe = new Animated.Value(state.autoSave === false ? 0 : 23)


 
  const handleAutoSave = () => {
    Animated.timing(swipe,
      {
        toValue: state.autoSave === false ? 23 : 0,
        duration: 170,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(3))
      }
    )
    .start(() => {
        const action = {
        type: actionTypes.setAutoSave,
        autoSave: !state.autoSave
        }
        dispatch(action);
        mergeToObjectSettings({autoSave: !state.autoSave})

         //   StatusBar.setBackgroundColor(state.theme === 'LIGHT' ? '#111B21' : '#ffffff');
        //   StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'light-content' : 'dark-content');

        //   NavigationBar.setBackgroundColorAsync(state.theme === 'LIGHT' ? '#111B21' : '#FFFFFF')
        //   NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "light" : "dark")
        //   mergeToObjectSettings(state.theme === 'LIGHT' ? settingsType.setThemeDark : settingsType.setThemeLight)

      })    
  }

  const handleThemeMode_Custom = () => {
    if(state.themeModeCustom){
      return
    }
    const action = {
      type: actionTypes.setThemeModeCustom,
      themeModeCustom: true
      }
    dispatch(action);
    mergeToObjectSettings({themeModeCustom: true})
  }

  const handleThemeMode_useDeviceSettings = () => {
    if(!state.themeModeCustom){
      return
    }
    let multipleAction = {
      type: actionTypes.setMutipleStates,
      multipleStates: {
        theme: colorScheme.toUpperCase(),
        themeModeCustom: false,
        themeHue: state.theme === 'LIGHT' ? themeHueDark : themeHueLight
      }
    }
    
    StatusBar.setBackgroundColor(state.theme === 'LIGHT' ? '#111B21' : '#ffffff');
    StatusBar.setBarStyle(state.theme === 'LIGHT' ? 'light-content' : 'dark-content');

    NavigationBar.setBackgroundColorAsync(state.theme === 'LIGHT' ? '#111B21' : '#FFFFFF')
    NavigationBar.setButtonStyleAsync(state.theme === 'LIGHT' ? "light" : "dark")

    dispatch(multipleAction)
    mergeToObjectSettings({themeModeCustom: false})
  }

  return (
    <ScrollView style={{
        marginTop: 10
      }}
      decelerationRate = 'normal'
      persistentScrollbar = {false}
      overScrollMode = 'never'
      showsVerticalScrollIndicator = {false}
    >
      {/* Premium------------------------------------------------------------------------------------------------- */}
      <TouchableOpacity activeOpacity={0.8} style={[Styles.premiumView, {
        backgroundColor: state.themeHue.primary_dark
      }
      ]}>
        <View style={{marginTop: 2}}>
          <Image style={{
            width: PixelRatio.getPixelSizeForLayoutSize(26), 
            height: PixelRatio.getPixelSizeForLayoutSize(26),

          }} source={require('../assets/Images/PremiumLogo.png')}/>
        </View>
        <View style={{
          marginLeft: 15
        }}>
          <Text style={{
            color: state.theme === 'LIGHT' ? '#000' : '#FFF',
            fontWeight: '600',
            fontSize: 18,
          }}>Premium Version</Text>
          <Text style={{
            color: state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF',
            fontSize: 13,
            width: '80%'
          }}
          >Get rid of ads and have a smoother experience.</Text>
        </View>
      </TouchableOpacity>

      
      {/* Auto Save----------------------------------------------------------------------------------------- */}
      <View style={Styles.autoSaveView}>
        <View style={{flexDirection: 'row',width: 200}}>
          <View style={{
            backgroundColor: state.themeHue.primary_dark,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 2
          }}>
            {
              state.theme === 'LIGHT' ? (
                <Image style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(9), 
                  height: PixelRatio.getPixelSizeForLayoutSize(9),

                }} source={require('../assets/Icons/AutoSaveIcon_light.png')}/>)
              : (
                <Image style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(9), 
                  height: PixelRatio.getPixelSizeForLayoutSize(9),

                }} source={require('../assets/Icons/AutoSaveIcon.png')}/>
              )
            }    
          </View>
          <View style={{
            marginLeft: 10,
          }}>
            <Text style={{
              color: state.theme === 'LIGHT' ? '#000' : '#FFF',
              fontWeight: '600',
              fontSize: 16,
            }}>Auto save status</Text>
            <Text style={{
              color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
              fontSize: 13,
              fontWeight: '600'
            }}
            >Automatically save viewed status images and videos.</Text>
          </View>
        </View>

        <Pressable onPressIn={handleAutoSave}  style={{...Styles.themeButton, 
          backgroundColor: state.themeHue.primary_dark,
          borderColor: state.themeHue.secondary_sub,
        }}>
          <View style={{}}>
            <Animated.View style={{position: 'relative', transform: [{ translateX: swipe}]}}>
                <View style={[Styles.themeButton_thumb,{
                    backgroundColor: (state.autoSave === true) ? '#00D426'
                                    : state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF',
                   }]}/>
            </Animated.View>
          </View>
          { state.autoSave  ?
            <Animated.View style={{position: 'absolute',
              opacity:  swipe.interpolate({
                inputRange: [0,1],
                outputRange: state.autoSave ? [0, 1] : [1, 0]}),
              left: 7
            }}>
              <Text style={{fontSize: 10, fontWeight: '600',
               color: state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF'
              }}>ON</Text>
            </Animated.View>
          :
          <Animated.View style={{position: 'absolute',
          opacity: swipe.interpolate({
            inputRange: [0,1],
            outputRange: !state.autoSave ? [1, 0] : [0, 1]}),
            right: 6
          }}>
            <Text style={{fontSize: 10, fontWeight: '600', color: state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF'}}>OFF</Text>
          </Animated.View>
          
        } 
        </Pressable>
      </View>


      {/* Theme Select------------------------------------------------------------------------------- */}
      <View style={Styles.themeSelectView}>
          <View style={{
            backgroundColor: state.themeHue.primary_dark,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 2
          }}>
            {
              state.theme === 'LIGHT' ? (
                <Image style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(9), 
                  height: PixelRatio.getPixelSizeForLayoutSize(9),

                }} source={require('../assets/Icons/ThemeIcon_light.png')}/>)
              : (
                <Image style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(9), 
                  height: PixelRatio.getPixelSizeForLayoutSize(9),

                }} source={require('../assets/Icons/ThemeIcon.png')}/>
              )
            }    
          </View>

          <View style={{marginLeft: 15,
            flex: 1
          }}>
            <Text style={{
              color: state.theme === 'LIGHT' ? '#000' : '#FFF',
              fontWeight: '600',
              fontSize: 16,
            }}>Theme</Text>
            <View style={{
              flex: 1,
              height: 20,
              flexDirection: 'row',
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 32}}>
                <Text style={{
                  color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                  fontSize: 13,
                  fontWeight: '600',
                  marginRight: 10
                }}>use device settings</Text>
                <TouchableOpacity activeOpacity={0.4}  onPress={handleThemeMode_useDeviceSettings}>
                  <RadioButton color= { !state.themeModeCustom ? '#00D426': state.themeHue.primary_dark} size={18}/>
                </TouchableOpacity>  
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                    fontSize: 13,
                    fontWeight: '600',
                    marginRight: 10
                  }}>Custom</Text>
                  <TouchableOpacity activeOpacity={0.4}  onPress={handleThemeMode_Custom }>
                    <RadioButton color={state.themeModeCustom? '#00D426': state.themeHue.primary_dark} size={18} />
                  </TouchableOpacity> 
              </View>
            </View>
          </View>
      </View>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  premiumView: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    alignContent: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  autoSaveView: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  
  themeSelectView : {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 20,
  },
  themeButton: {
    width: 50,
    height: 26, 
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  themeButton_thumb:{
    width: 14,
    height: 14,
    borderRadius: 50,
  }
})