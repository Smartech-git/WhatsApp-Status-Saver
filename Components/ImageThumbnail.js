import { View, Text, Image, StyleSheet, Pressable, ImageBackground, PixelRatio} from 'react-native'
import React, { useState, useEffect} from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useStateValue } from '../StateProvider'

export default function ImageThumbnail({imageSrc}) {
  const [state, dispatch] = useStateValue()
  const [pressed, setPressed] = useState(false)
  const scaleValue = useSharedValue(0.5);
  const savedTagValue = useSharedValue(8)

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

  return (
      <View  style={{aspectRatio: 1/1.3, width: '47.6%', margin: '1.2%',
        borderRadius: 16,
        borderColor: state.themeHue.primary_dark,
        borderWidth: 2,
        overflow: 'hidden'
      }}>
        <ImageBackground source={{uri: imageSrc}} blurRadius={15} resizeMode ='cover' style={{width: '100%', height: '100%'}}>
          <Image style={{width: undefined, 
            height: undefined,
            flex: 1,
          }} source={{uri: imageSrc}} resizeMode='contain'/>

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
                      : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/SaveIcon.png')} />
              }    
            </View>
          </Pressable>
        </ImageBackground>
      </View>
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
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
  }
})