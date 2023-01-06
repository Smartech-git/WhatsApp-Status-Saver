import { View, Text, Image, StyleSheet, Pressable, Dimensions, PixelRatio, ImageBackground} from 'react-native'
import React, { useState, useEffect} from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useStateValue } from '../StateProvider'
import { setShouldTabHideRef } from './BottomNavTabBar'

const win = Dimensions.get('window').width/2 -9.5

export default function ImageThumbnail({imageSrc, ratio, index}) {
  const [state, dispatch] = useStateValue()
  const [pressed, setPressed] = useState(false)
  const scaleValue = useSharedValue(0.5)
  const savedTagValue = useSharedValue(8)
  const navigation = useNavigation();


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

  const handleOnPress = () => {
    navigation.navigate('ImageView', {index : index});
    setShouldTabHideRef('true');
  }

  return (
      <Pressable onPress={handleOnPress} style={{
        width: win,
        height: win*ratio <= 150 ? 150 : win*ratio,
        borderColor: state.themeHue.primary_dark, 
        ...Styles.ThumbnailStyle,
        marginLeft: index % 2 == 0 ? 0 : 4,
        marginRight: index % 2 == 0 ? 4 : 0
        }}
        >
        <ImageBackground source={{uri: imageSrc}} blurRadius={15} resizeMode ='cover' style={{width: '100%', height: '100%'}}>
          <Image style={{flex: 1, 
            
          }} source={{uri: imageSrc}} resizeMode={win*ratio <= 150 ? 'contain': 'cover'}/>
        
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
        
          <Pressable onPressIn={handleSave} >
            <View style={[Styles.button, {backgroundColor: pressed ? '#00D426' : '#FFFFFF'}]}>
              {
              pressed ? <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}, saveButtonAnimatedStyle]} source={require('../assets/Icons/SavedIcon.png')} />
                      : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/SaveIcon.png')} />
              }    
            </View>
          </Pressable>
        </ImageBackground>
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
  },
  SavedTag : {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  ThumbnailStyle: {
    marginVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  }
})