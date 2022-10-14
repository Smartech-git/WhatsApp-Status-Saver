import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

export default function ImageThumbnail({imageSrc}) {
  const [pressed, setPressed] = useState(false)
  const scaleValue = useSharedValue(0.5);

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: scaleValue.value
      }]
    }
  })

  const handleSave = () => {
    setPressed(true)
    scaleValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.elastic(4)
    })
  }

  return (
      <View style={{width: 165, height: 190, margin: 5,
      }}>
        <Image style={{width: '100%', 
          height: '100%',
          borderRadius: 15,
          borderColor: '#617986',
          borderWidth: 1
      }}  source={{uri: imageSrc}}/>

      <TouchableOpacity onPress={handleSave}>
        <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#F3F5F7'}]}>
          {
           pressed ? <Animated.Image style={[{width: 23, height: 23}, AnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                   : <Image style={{width: 23, height: 23}} source={require('../assets/Icons/SaveIcon.png')} />
          }    
        </View>
      </TouchableOpacity>
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
  }
})