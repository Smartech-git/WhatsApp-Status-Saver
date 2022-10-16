import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
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
      <View style={{width: 168, height: 210, margin: 5,
      }}>
        
        <Image style={{width: '100%', 
          height: '100%',
          borderRadius: 15,
          borderColor: state.theme ==='LIGHT' ? '#F3F5F7' : '#1A3848',
          borderWidth: 1
        }}  source={{uri: imageSrc}}/>

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
        

        <TouchableOpacity onPress={handleSave}>
          <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#FFFFFF'}]}>
            {
            pressed ? <Animated.Image style={[{width: 23, height: 23}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                    : <Image style={{width: 20, height: 20}} source={require('../assets/Icons/SaveIcon.png')} />
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
  },
  SavedTag : {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 5,
  }
})