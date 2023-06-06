import { View, Text, StyleSheet, ScrollView, Image, PixelRatio, TouchableOpacity, Pressable, StatusBar, Appearance, useAnimatedValue } from 'react-native'
import React, {useState, useLayoutEffect, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import { actionTypes, themeHueDark, themeHueLight} from '../Reducer'
import RadioButton from '../Components/RadioButton'
import { mergeToObjectSettings } from '../APIs'
import * as NavigationBar from 'expo-navigation-bar';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming, interpolate, Extrapolation, withSpring, withSequence } from 'react-native-reanimated'


export default function Settings() {
  const [state, dispatch] = useStateValue()
  const swipe = useSharedValue(state.autoSave === false ? 0 : 23)
  const dropDown = useSharedValue({height: 2, opacity: 0})
  const checkMark = useSharedValue(0)


 useEffect(() => {
  console.log(state)
 }, [state])

 const autoSaveAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{
      translateX: swipe.value
    }]
  }
 })

 const dropDownAnimation = useAnimatedStyle(() => {
  const height = withSpring(dropDown.value.height, {mass: 0.2, damping: 20})
  const opacity = withSpring(dropDown.value.opacity, {mass: 0.2})
  return {
    height: height,
    opacity: opacity
  }
 })

 const customThemeCheckMarkAnimation = useAnimatedStyle(() => { 
  return {
    transform: [{
      scale: checkMark.value
    }]
  }
 })

 useEffect(() => {
    checkMark.value = withSequence(withTiming(0, {duration: 100}), withSpring(1))
 }, [state.theme])


  const handleAutoSave = () => {
    swipe.value = withTiming(state.autoSave === false ? 23: 0, {
      duration: 170,
      easing: Easing.in(Easing.ease)
   })

    const action = {
      type: actionTypes.setAutoSave,
      autoSave: !state.autoSave
      }
      dispatch(action);
      mergeToObjectSettings({autoSave: !state.autoSave})
  }

  const handleThemeMode_Custom = (prop) => {
    if(state.theme === prop){
      return
    }
    let multipleAction = {
      type: actionTypes.setMutipleStates,
      multipleStates: {
        theme: prop,
        themeModeCustom: true,
        themeHue: prop === 'LIGHT' ? themeHueLight : themeHueDark
      }
    }
    
    StatusBar.setBackgroundColor(state.theme === 'DARK' ? '#FFFFFF' : '#111B21');
    StatusBar.setBarStyle(state.theme === 'DARK' ? 'dark-content' : 'light-content');

    NavigationBar.setBackgroundColorAsync(state.theme === 'DARK' ? '#FFFFFF' : '#111B21')
    NavigationBar.setButtonStyleAsync(state.theme === 'DARK' ? "dark" : "light")

    dispatch(multipleAction)
    
    mergeToObjectSettings({themeModeCustom: true})
  }

  const handleDropDowntoSetTheme =  () => {
    dropDown.value = {height: dropDown.value.height === 2 ? 80 : 2, opacity:dropDown.value.opacity ===0? 1: 0} 
  }

  const handleThemeMode_useDeviceSettings = () => {
    if(!state.themeModeCustom){
      return
    }

    let multipleAction = {
      type: actionTypes.setMutipleStates,
      multipleStates: {
        theme: state.deviceColorScheme,
        themeModeCustom: false,
        themeHue: state.deviceColorScheme === 'LIGHT' ? themeHueLight : themeHueDark
      }
    }
    
    StatusBar.setBackgroundColor(state.deviceColorScheme === 'LIGHT' ? '#FFFFFF' : '#111B21');
    StatusBar.setBarStyle(state.deviceColorScheme === 'LIGHT' ? 'dark-content' : 'light-content');

    NavigationBar.setBackgroundColorAsync(state.deviceColorScheme === 'LIGHT' ? '#FFFFFF' : '#111B21')
    NavigationBar.setButtonStyleAsync(state.deviceColorScheme === 'LIGHT' ? "dark" : "light")

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

        <View style={{...Styles.autoSaveButton, 
          backgroundColor: state.themeHue.primary_dark,
          borderColor: state.themeHue.borderColor,
        }}>
          {/* <Pressable hitSlop={20} android_ripple={{color: 'red', radius: 15, borderless: true }}  onPress={handleAutoSave} > */}
            <Animated.View style={[{position: 'relative',zIndex: 2}, autoSaveAnimatedStyle]}>
                <Pressable hitSlop={20}  onPress={handleAutoSave} style={[Styles.autoSaveButton_thumb,{
                    backgroundColor: (state.autoSave === true) ? '#00D426'
                                    : state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF',
                   }]}/>
            </Animated.View>
          {/* </Pressable> */}
            <Animated.View style={[{position: 'absolute', left: 7,},
              useAnimatedStyle(() => {
                const opacity = interpolate(swipe.value,  [0,1],  [0, 1], {
                  extrapolateRight: Extrapolation.CLAMP,
                  extrapolateLeft: Extrapolation.CLAMP
                })
                return {
                  opacity: opacity
                }
               })
           ]}>
              <Text style={{fontSize: 10, fontWeight: '600',
               color: state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF',
               
              }}>ON</Text>
            </Animated.View>
          
          <Animated.View style={[{position: 'absolute', right: 6},
             useAnimatedStyle(() => {
              const opacity = interpolate(swipe.value,  [0,1], [1, 0], {
                extrapolateRight: Extrapolation.CLAMP,
                extrapolateLeft: Extrapolation.CLAMP
              })
              return {
                opacity: opacity
              }
             })
          ]}>
            <Text style={{fontSize: 10, fontWeight: '600',
             color: state.theme === 'LIGHT' ? '#1A3848' : '#E9ECEF'
             }}>OFF</Text>
          </Animated.View>
          
         
        </View>
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
            }}>Theme mode</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 32}}>
                <Text style={{
                  color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                  fontSize: 13,
                  fontWeight: '600',
                  marginRight: 10
                }}>use device settings</Text>
                <Pressable hitSlop={20} android_ripple={{color: state.themeHue.primary_dark, radius: 15, borderless: true }}  onPress={handleThemeMode_useDeviceSettings}>
                  <RadioButton color= { !state.themeModeCustom ? '#00D426': state.themeHue.primary_dark} size={18}/>
                </Pressable>  
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                    fontSize: 13,
                    fontWeight: '600',
                    marginRight: 10
                  }}>Custom</Text>
                  <Pressable hitSlop={20} onPressIn={handleDropDowntoSetTheme} android_ripple={{color: state.themeHue.primary_dark, radius: 15, borderless: true }}>
                    <Animated.View
                      style={[
                        useAnimatedStyle(() =>{
                          const rotate = interpolate(dropDown.value.height, [0,1], dropDown.value.height === 2 ? [180, 0] : [0, -180], {
                            extrapolateRight: Extrapolation.CLAMP,
                            extrapolateLeft: Extrapolation.CLAMP
                          })
                          return {
                           transform: [{
                            rotate: `${rotate}deg`
                           }]
                          }
                        })
                      ]}
                    >
                      {state.theme == 'LIGHT' ? (
                        <Image style={{
                          width: PixelRatio.getPixelSizeForLayoutSize(18), 
                          height: PixelRatio.getPixelSizeForLayoutSize(18),
        
                        }} source={require('../assets/Icons/DropDownIcon_light.png')}/>
                      ) : (
                        <Image style={{
                          width: PixelRatio.getPixelSizeForLayoutSize(18), 
                          height: PixelRatio.getPixelSizeForLayoutSize(18),
        
                        }} source={require('../assets/Icons/DropDownIcon.png')}/>
                      )}
                    </Animated.View>
                  </Pressable> 
              </View>
            </View>
            <Animated.View style={[{
              backgroundColor: `${state.themeHue.secondary}15`,
              ...Styles.themeCustomSelectDropdown
            }, dropDownAnimation]}>
              <Pressable onPress={() => handleThemeMode_Custom("LIGHT")} style={{flexDirection: 'row', alignItems: "baseline"}}>
                <Image style={{
                        width: PixelRatio.getPixelSizeForLayoutSize(24), 
                        height: PixelRatio.getPixelSizeForLayoutSize(24),
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: state.theme === "LIGHT" ? state.themeHue.secondary : undefined
                }} source={require('../assets/Images/ThemeLight.png')}/>
                {
                  state.theme === 'LIGHT' && (
                     <Animated.View style={[{
                      backgroundColor: state.themeHue.secondary,
                      borderRadius: 50,
                      padding: 2,
                      borderWidth: 2,
                      borderColor: state.themeHue.primary,
                      position: 'absolute',
                      left: 40,
                      top: -8,
                    }, customThemeCheckMarkAnimation]}>
                        <Image style={{
                              width: PixelRatio.getPixelSizeForLayoutSize(5), 
                              height: PixelRatio.getPixelSizeForLayoutSize(5),
                      }} source={require('../assets/Icons/SavedIcon.png')}/>
                    </Animated.View>
                  )
                }
                <Text style={{
                  color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 15
                }}>Light</Text>
              </Pressable>
              <Pressable onPress={() => handleThemeMode_Custom("DARK")} style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Image style={{
                        width: PixelRatio.getPixelSizeForLayoutSize(24), 
                        height: PixelRatio.getPixelSizeForLayoutSize(24),
                        borderRadius:6,
                        borderWidth: 2,
                        borderColor: state.theme === "DARK" ? state.themeHue.secondary : undefined
                }} source={require('../assets/Images/ThemeDark.png')}/>
                {
                  state.theme === 'DARK' && (
                     <Animated.View style={[{
                      backgroundColor: state.themeHue.secondary,
                      borderRadius: 50,
                      padding: 2,
                      borderWidth: 2,
                      borderColor: state.theme.primary,
                      position: 'absolute',
                      left: 40,
                      top: -8,
                    }, customThemeCheckMarkAnimation]}>
                        <Image style={{
                              width: PixelRatio.getPixelSizeForLayoutSize(5), 
                              height: PixelRatio.getPixelSizeForLayoutSize(5),
                      }} source={require('../assets/Icons/SavedIcon.png')}/>
                    </Animated.View>
                  )
                }
               
                <Text
                  style={{
                    color: state.theme === 'LIGHT' ? '#00000095' : '#FFFFFF95',
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 15,
                  }}
                >Dark</Text>
              </Pressable>  
            </Animated.View>
          </View>
      </View>


      {/* About -------------------------------------------------------------------------------------- */}
      <View style={Styles.aboutView}>
        <Text>About</Text>
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
    flexDirection: 'row',
    marginTop: 20,
  },
  autoSaveButton: {
    width: 50,
    height: 26, 
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  autoSaveButton_thumb:{
    width: 14,
    height: 14,
    borderRadius: 50,
  },

  themeCustomSelectDropdown: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden'
  },

  aboutView: {
    marginTop: 20
  }
  
})