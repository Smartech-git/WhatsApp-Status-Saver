import { View, Text, Image, StyleSheet, Pressable, Dimensions, PixelRatio, ImageBackground} from 'react-native'
import React, { useState, useEffect} from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useStateValue } from '../StateProvider'
import { setShouldTabHideRef } from './BottomNavTabBar'
import FastImage from 'react-native-fast-image'
import {InView } from 'react-native-intersection-observer'


export default function ImageThumbnail({imageSrc, ratio, index, modificationTime}) {
  const [state, dispatch] = useStateValue()
  const [pressed, setPressed] = useState(false)
  const [inView, setInView] = useState()
  const scaleValue = useSharedValue(0.5)
  const savedTagValue = useSharedValue(8)
  const navigation = useNavigation();

  const win = Dimensions.get('window').width/2 -10.2

  const handleInView = (inView) => {
    setInView(inView)
  }
  
  const saveButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: scaleValue.value
      }]
    }
  })

  const savedTagAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: savedTagValue.value
      }]
    }
  })

  const handleSave = () => {
    setPressed(true)
    savedTagValue.value = withSpring(0)
    scaleValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.elastic(3)
    })
  } 

  const handleOnPress = () => {
    navigation.navigate('ImageView', {index : index});
    setShouldTabHideRef('true');
  }

  const handleTime = () => {
    const currentTime = new Date();
    let timeDiff = Math.round(currentTime.getTime()/1000) - modificationTime;
    
  
    const hr = Math.floor(timeDiff/3600);
    const min = Math.floor(timeDiff%3600/60)

    if(!hr && !min){
      return 0 + 'm ago'
    } else {
      if(min === 0){
        return hr + 'h ago'
      } else if(hr === 0) {
        return  min + 'm ago'  
      } else {
        return hr + 'h ' + min + 'm ago'
      }
    }
   
  }

  return (
    <InView triggerOnce={true} onChange={(inView) => handleInView(inView)}>
      <Pressable onPress={handleOnPress} style={{
          backgroundColor: state.themeHue.primary_dark,
          width: win,
          height: win*ratio <= 150 ? 150 : win*ratio,
          ...Styles.ThumbnailStyle,
          marginLeft: index % 2 === 0 ? 0 : 3,
          marginRight: index % 2 === 0 ? 3 : 0,
        }}
      >
        {
          win*ratio <= 150 ? (
            <View style={{
              borderColor: state.themeHue.primary_dark,
              borderRadius: 16,
              borderWidth: 2,
              overflow: 'hidden',
            }}>
            <ImageBackground source={{uri: imageSrc}} blurRadius={15} resizeMode ='cover' style={{width: '100%', height: '100%',
            }}>
                <Image style={{flex: 1,
                }} source={{uri: inView ? imageSrc : undefined}} resizeMode= 'contain'/>
              
                {
                  pressed && (
                    <Animated.View style={[Styles.SavedTag, savedTagAnimatedStyle ]}>
                      <Text style={{
                        fontSize: 13,
                        fontWeight: '900',
                      }}>Saved</Text>
                    </Animated.View>
                  )
                }
              
                <Pressable onPressIn={handleSave} >
                  <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#FFFFFF'}]}>
                    {
                    pressed ? <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                            : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/SaveIcon_light.png')}/>
                    }    
                  </View>
                </Pressable>
            </ImageBackground>
            </View>
          ) : (
              <View style={{ width: '100%', height: '100%'}}>
                <Image style={{flex: 1, 
                  borderColor: state.themeHue.primary_dark,
                  borderRadius: 16,
                  borderWidth: 2,
                  overflow: 'hidden'
                }} source={{uri: inView ? imageSrc : undefined}} resizeMode= 'cover'/>
              
                {
                  pressed && (
                    <Animated.View style={[Styles.SavedTag, savedTagAnimatedStyle ]}>
                      <Text style={{
                        fontSize: 13,
                        fontWeight: '900',
                      }}>Saved</Text>
                    </Animated.View>
                  )
                }
              
                <Pressable onPressIn={handleSave} >
                  <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#FFFFFF'}]}>
                    {
                    pressed ? <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                            : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/SaveIcon_light.png')} />
                    }    
                  </View>
                </Pressable>
              </View>
          )
        }
       
      </Pressable>
      <View style={{alignItems: "baseline",
        marginBottom: 10,
        marginTop: 2
    }}>
        <View style={{
          backgroundColor: state.theme === 'DARK' ? "#FFFFFF10" : state.themeHue.primary_dark,
          paddingHorizontal: 10,
          paddingVertical: 5,
          position: 'relative',
          borderRadius: 50,
        }}>
          <Text style={{
            color: state.theme === 'LIGHT' ? '#000' : '#fff',
            fontSize: 12,
            fontWeight: '600'
          }}>{handleTime()}</Text>
        </View>
      </View>
    </InView>
    )
}

const Styles = StyleSheet.create({
  button : {
    width: 34,
    height: 34,
    position: 'absolute',
    borderRadius: 50,
    right: 10,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SavedTag : {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  ThumbnailStyle: {
    marginVertical: 4,
    borderRadius: 16,
    overflow: 'hidden'
  }
})