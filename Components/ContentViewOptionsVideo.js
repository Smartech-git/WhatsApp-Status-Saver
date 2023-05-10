import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image, Pressable } from 'react-native'
import React, {useState} from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useStateValue } from '../StateProvider';

export default function ContentViewOptionsVideo() {
  const [state, dispatch] = useStateValue()
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
    scaleValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.elastic(3)
    })
  } 

  return (
    <View style={Styles.Content}>
            <View style={{
                alignItems: 'center'
            }}>
                <Pressable onPress={handleSave} >
                  <View style={[Styles.Botton, {backgroundColor: pressed ? '#00D426' : '#FFFFFF00'}]}>
                    {
                    pressed ? <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(14), height: PixelRatio.getPixelSizeForLayoutSize(14 )}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                            : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(15), height: PixelRatio.getPixelSizeForLayoutSize(15)}} source={require('../assets/Icons/SaveIcon.png')}/>
                    }    
                  </View>
                </Pressable>
                <Text style={{fontSize: 14, fontWeight: '700', color:  '#FFF'}}>{pressed ? "Saved": "Save"}</Text> 
            </View>

            <View style={{
                alignItems: 'center'
            }}>

                <TouchableOpacity activeOpacity={0.6} style={{ ...Styles.Botton,
                    backgroundColor: undefined,
                }}>
                    <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../assets/Icons/ShareIcon.png')} />
                   
                </TouchableOpacity>
                <Text style={{fontSize: 14, fontWeight: '700', color: '#FFF'}}>Share</Text> 
            </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    Content: {
        height: 140,
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 3,
        bottom: "18%",
        right: 15,
        alignItems: 'center',
    },

    Botton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})