import { View, Text, Image, Dimensions, ImageBackground} from 'react-native'
import React from 'react'
import { panGestureConditional } from '../Utilities/GestureHandler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'

const win = Dimensions.get('window').width-20

export default function ImageComponent({imageSrc, imagePosition}) {

  const startPosition = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {translateX: startPosition.value}
          ]
        }
      })
    
    
    const panGestureEvent = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetX(
    panGestureConditional('horizontal', '', '', imagePosition)
    )
    .onUpdate((e)=>{
    startPosition.value =  e.translationX* 0.5
    })
    .onEnd(() =>{
    startPosition.value = withSpring(0, {mass: 1})
    })

  return (
    <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[{width:'100%', height: "100%"}, animatedStyle]}>
          <View style={{
              width: win,
              marginHorizontal: 10,
              borderRadius: 10,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center' ,
              overflow: 'hidden'
          }}>
            <ImageBackground source={{uri: imageSrc}} blurRadius={500} resizeMode= 'cover' style={{ height: '100%', width: '100%',
          }}>
              <Image style={{flex: 1}} source={{uri: imageSrc}} resizeMode={'contain'} />
              {/* <FastImage
                  style={{ flex: 1}}
                  source={{
                      uri: imageSrc,
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
              /> */}
            </ImageBackground>
          </View>
        </Animated.View>
    </GestureDetector>
  )
}