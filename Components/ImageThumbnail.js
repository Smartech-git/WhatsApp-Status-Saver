import { View, Text, Image, StyleSheet, Pressable, Dimensions, PixelRatio, ImageBackground} from 'react-native'
import React, { useState, useEffect} from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useStateValue } from '../StateProvider'

const win = Dimensions.get('window').width/2 -8

export default function ImageThumbnail({imageSrc, ratio}) {
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
      <View  style={{width: win,
        margin: 4,
        aspectRatio: 1/1.3, 
        borderRadius: 16,
        borderColor: state.themeHue.primary_dark,
        borderWidth: 2,
        overflow: 'hidden',
        minHeight: 150
      }}>
        <ImageBackground source={{uri: imageSrc}} blurRadius={15} resizeMode ='cover' style={{flex:1}}>
          <Image style={{flex: 1, 
            flexDirection: 'row',
            
          }} source={{uri: imageSrc}} resizeMode= 'contain'/>
        
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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
  }
})