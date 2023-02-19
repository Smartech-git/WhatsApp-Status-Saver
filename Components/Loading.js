import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat} from 'react-native-reanimated'
import React, {useEffect} from 'react'
import { useStateValue } from '../StateProvider'


const win = Dimensions.get('window').width/2 -10

export default function Loading() {

  const [state, dispatch] = useStateValue();
  const animateValue1 = useSharedValue(100);
  const animateValue2 = useSharedValue(100);
  const animateValue3 = useSharedValue(100);
  const animateValue4 = useSharedValue(100);
  const animateValue5 = useSharedValue(100);

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      height: animateValue1.value
    }
  })
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      height: animateValue2.value
    }
  })
  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      height: animateValue3.value
    }
  })
  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      height: animateValue4.value
    }
  })
  const animatedStyle5 = useAnimatedStyle(() => {
    return {
      height: animateValue5.value
    }
  })

  useEffect(() => {
    let ID = setInterval(() => {
      animateValue1.value = withSpring(100 + Math.floor(Math.random()*200))
      animateValue2.value = withSpring(100 + Math.floor(Math.random()*100))
      animateValue3.value = withSpring(100 + Math.floor(Math.random()*250)) 
      animateValue4.value = withSpring(100 + Math.floor(Math.random()*150)) 
      animateValue5.value = withSpring(100 + Math.floor(Math.random()*190))   
    }, 1000)
    return(() => {
      clearInterval(ID)
    })
  }, [])

  return (
    <View style={{display: 'flex',
        height: '100%',
        width: "100%",
        //backgroundColor: state.themeHue.primary
    }}>
      <View style={{
        width: '100%',
        height: 30,
        backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890',
        borderRadius: 16,
        marginBottom: 6,
        marginTop: 10
      }}></View>
      <View style={{
         width: "100%",
         justifyContent: 'space-between',
         flexDirection: 'row',
      }}>
        <View style={{width: win, height: '100%'}}>
          <Animated.View style={[{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', borderRadius: 16, marginVertical: 3, marginRight: 3}, animatedStyle1 ]}></Animated.View>
          <Animated.View style={[{width: '100%',backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890' , borderRadius: 16, marginVertical: 3, marginRight: 3}, animatedStyle2 ]}></Animated.View>
          <Animated.View style={[{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', borderRadius: 16, marginVertical: 3, marginRight: 3}, animatedStyle4 ]}></Animated.View>
          <View style={{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', height: 100 + Math.floor(Math.random()*200), borderRadius: 16, marginVertical: 3, marginRight: 3}}></View>
          <View style={{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890' ,height: 100 + Math.floor(Math.random()*100), borderRadius: 16, marginVertical: 3, marginRight: 3}}></View>
        </View>

        <View style={{width: win, height: '100%', marginRight: 2}}>
          <Animated.View style={[{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', borderRadius: 16, marginVertical: 3, marginLeft: 3}, animatedStyle3 ]}></Animated.View>
          <Animated.View style={[{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', borderRadius: 16, marginVertical: 3, marginLeft: 3}, animatedStyle4 ]}></Animated.View>
          <Animated.View style={[{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', borderRadius: 16, marginVertical: 3, marginLeft: 3}, animatedStyle5 ]}></Animated.View>
          <View style={{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', height: 100 + Math.floor(Math.random()*300), borderRadius: 16, marginVertical: 3, marginLeft: 3}}></View>
          <View style={{width: '100%', backgroundColor: state.theme == 'LIGHT' ?'#E9ECEF90': '#1A384890', height: 100 + Math.floor(Math.random()*100), borderRadius: 16, marginVertical: 3, marginLeft: 3}}></View>
        </View>
      </View>
      
    </View>
  )
}


const Styles = StyleSheet.create({
  LoadView : {
    width: '100%',
  }
})