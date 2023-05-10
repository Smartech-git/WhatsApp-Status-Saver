import { View, Text, Image, Dimensions, ImageBackground} from 'react-native'
import React, {useState} from 'react'
import { panGestureConditional } from '../Utilities/GestureHandler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { InView } from 'react-native-intersection-observer';
import { useStateValue } from '../StateProvider';

const win = Dimensions.get('window').width-20

export default function ImageComponent({imageSrc, imagePosition, special, index}) {

  const [inView, setInView] = useState()
  const [state, dispatch] = useStateValue()

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
    panGestureConditional('unit-Horizontal', '', '', imagePosition)
    )
    .onUpdate((e)=>{
    startPosition.value =  e.translationX* 0.5
    })
    .onEnd(() =>{
    startPosition.value = withSpring(0, {mass: 1})
    })

    const handleInView = (inView) => {
      setInView(inView)
    }

  return (
    <InView triggerOnce={false}  onChange={(inView) => handleInView(inView)}>
    <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[, animatedStyle]}>
          <View style={{
              width: win,
              marginHorizontal: 10,
              borderRadius: 10,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center' ,
              overflow: 'hidden',
              backgroundColor: state.themeHue.primary_light
          }}>
            <ImageBackground source={{uri: imageSrc}} blurRadius={500} resizeMode= 'cover' style={{ height: '100%', width: '100%',
          }}>
               <Image style={{flex: 1}} source={{uri: (inView || special || (index == index + 1 || index -1)) ? imageSrc : undefined}} resizeMode={'contain'} />
            </ImageBackground>
          </View>
        </Animated.View>
    </GestureDetector>
    </InView>
  )
}