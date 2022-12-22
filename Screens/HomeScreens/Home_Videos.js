import { View, Text, ScrollView, Image} from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import Animated, {useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';

export default function Home_Videos() {
  const [state, dispatch] = useStateValue();

  return (
    <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
    </View>
  )
}