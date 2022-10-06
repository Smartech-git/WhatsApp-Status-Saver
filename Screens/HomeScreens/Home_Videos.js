import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function Home_Videos() {
  const [state, dispatch] = useStateValue();

  const offsetY = useSharedValue(0);
  const c = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform : [
        {translateY: offsetY.value}
      ]
    }
  })

  const panGesture = Gesture.Pan()
  .onBegin(() => {
    console.log("began")
  })
  .onUpdate((e) => {
    offsetY.value =  e.translationY + c.value
    console.log(e.translationY)
  })

  return (
    <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <GestureDetector gesture={panGesture}>
         <Animated.View style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          borderRadius: 20,
          animatedStyle
        }}>
        </Animated.View>
      </GestureDetector>
     
    </View>
  )
}