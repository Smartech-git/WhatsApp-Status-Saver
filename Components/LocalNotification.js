import { View, Text, Image, PixelRatio } from 'react-native'
import React, {useState} from 'react'
import { useStateValue } from '../StateProvider'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming, withDelay} from 'react-native-reanimated'

export let notifyRef;

export default function LocalNotification() {
  const [state, dispatch] = useStateValue()
  const [nofityProps, setNotifyProps] = useState({text: ' '})
  const translate = useSharedValue(-50)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: translate.value
      }]
    }
  })

  notifyRef = (info) => {
    setNotifyProps((prev) => {
      return {
        ...prev,
        text: info
      }
    })

    translate.value = withDelay(500, withTiming(50, {
      duration: 500,
      easing: Easing.elastic(1)
    }, (finished) => {
      if(finished){
        translate.value = withDelay(2000, withTiming(-50, {
          duration: 500,
          easing: Easing.elastic(1) 
        }))
      }
    }))

  }

  return (
    <Animated.View style={[{ width:'100%', height: 80, position: 'absolute', zIndex: 10,
        display: 'flex',
        alignItems: 'center'
     }, animatedStyle]}>
          <View style={{backgroundColor: state.themeHue.primary_dark, width: '90%', height: '100%', borderRadius: 12,
                borderColor: state.themeHue.localNotificationBorder,
                borderWidth: 1, flexDirection: 'row', alignItems:'center', paddingHorizontal: 15, justifyContent: 'space-between'
           }}>
            <View style={{
              height: 45,
              width: 45,
              backgroundColor: state.themeHue.primary,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(24), height: PixelRatio.getPixelSizeForLayoutSize(24)}} source={require('../assets/Icons/SavedIcon2.png')}/>
            </View>
            <Text style={{
              width: '80%',
              color: state.theme =='LIGHT' ? '#000' :  '#FFF',
              fontSize: 16
            }}>{nofityProps.text}</Text>
          </View>
      </Animated.View>
  )
}