import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, PixelRatio} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from 'react-native-reanimated';
import { useStateValue } from '../StateProvider';
import { hangdleBottomHide} from '../Utilities/GestureHandler';

//export let setShouldTabHideRef;  // imported in Utilities/GestureHandler.js
                                 //imported in Components/ImageThumbnain.js

export default function BottomNavTabBar({ state, descriptors, navigation }) {
  const [State, dipatch] = useStateValue()
  const [shouldTabHide, setShouldTabHide] = useState('')
  const translation = useSharedValue(0)
  const opacity = useSharedValue(0)
  const display = useSharedValue('flex')

 const shouldTabHide_Animation = (trans, opac) => {
  
  if(opac === 1){display.value= 'flex'}

    translation.value = withSpring(trans, {mass: 1.5 })
      opacity.value = withTiming(opac , {
        duration: 200,
      }, () => {
        if(opac === 0){
          display.value = 'none'
        }
      })
  }

  useEffect(() => {
    // setShouldTabHideRef = setShouldTabHide
    hangdleBottomHide(setShouldTabHide)
    translation.value = withDelay(900, withSpring(-20, {mass: 0.8}))
    opacity.value = withDelay(900, withTiming(1, {
      duration: 300,
    }))
  }, [])

  useEffect(() => {
    if(shouldTabHide === 'true') {
     shouldTabHide_Animation(0, 0,)
    } else if( shouldTabHide === 'false') {
     shouldTabHide_Animation(-20, 1, )
    }   
  }, [shouldTabHide])


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translation.value
        }
      ],
      opacity: opacity.value,
      display: display.value
    }
  })

  return (
      <Animated.View style={[
        {
        position: 'absolute',
        bottom: 0,
        width:  '100%',
        alignItems: 'center',
        zIndex: 2
      },
      animatedStyle
    ]}>
        <View style={{
            height: 70,
            width: '75%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: State.themeHue.primary_dark,
            borderColor: State.themeHue.borderColor,
            borderWidth: 2,
            borderRadius: 50,
            paddingHorizontal: 10
        }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key = {index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60
                }}
              >
                <View style={{
                  borderRadius: 10,
                  width: 34,
                  height: 34,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {label === "Status" && (
                    <View>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(13), height: PixelRatio.getPixelSizeForLayoutSize(13), opacity: isFocused ? 1 : 0, position: 'absolute'}} source={require('../assets/Icons/StatusIconActive.png')}/>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(13), height: PixelRatio.getPixelSizeForLayoutSize(13),  opacity: isFocused ? 0 : 1}} source={require('../assets/Icons/StatusIconInactive.png')} />
                    </View>
                  )}

                  {label === "Gallary" && (
                    <View>
                       <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(14), height: PixelRatio.getPixelSizeForLayoutSize(14), opacity: isFocused ? 1 : 0, position: 'absolute'}} source={require('../assets/Icons/GallaryIconActive.png')}/>
                        <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(14), height: PixelRatio.getPixelSizeForLayoutSize(14), opacity: isFocused ? 0 : 1}} source={require('../assets/Icons/GallaryIconInactive.png')}/>
                    </View>
                 
                  )}

                  {label === "Settings" && (
                    <View>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(16), height:PixelRatio.getPixelSizeForLayoutSize(16), opacity: isFocused ? 1 : 0, position: 'absolute'}} source={require('../assets/Icons/SettingsIconActive.png')}/>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(16), height: PixelRatio.getPixelSizeForLayoutSize(16), opacity: isFocused ? 0 : 1,}} source={require('../assets/Icons/SettingsIconInactive.png')}/>
                    </View>
                    
                  )}
                </View>  

                <Text style={{ color: isFocused ? (State.theme === 'LIGHT' ? '#000': '#fff') : '#617986', fontSize: 12, marginTop: 4, fontWeight: '600'}}>
                  {label}
                </Text>
                
              </TouchableOpacity> 
            );
          })}
        </View>
      </Animated.View>
  );
}