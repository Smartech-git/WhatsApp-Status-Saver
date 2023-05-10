import { View, Pressable, StyleSheet, Image, PixelRatio} from 'react-native'
import React, {useState} from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'

export default function HandleSave({savedTagValue}) {
    const [pressed, setPressed] = useState(false)
    const scaleValue = useSharedValue(0.5)

    const saveButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{
            scale: scaleValue.value
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
    <Pressable onPressIn={handleSave} >
        <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#FFFFFF'}]}>
        {
        pressed ? <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/SaveIcon_light.png')} />
        }    
        </View>
    </Pressable>
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
    }
})