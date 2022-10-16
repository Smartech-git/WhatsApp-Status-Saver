import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useStateValue } from '../StateProvider';

export let setShouldTabHideRef;  // imported in Utilities/GestureHandler.js

export default function BottomNavTabBar({ state, descriptors, navigation }) {
  const [State, dipatch] = useStateValue()
  const [shouldTabHide, setShouldTabHide] = useState('')
  const translation = useSharedValue(0)
  const opacity = useSharedValue(0)
  const display = useSharedValue('flex')


 const shouldTabHide_Animation = (trans, opac) => {
  
  if(opac === 1){display.value= 'flex'}

    translation.value = withSpring(trans, {mass: 0.8})
      opacity.value = withTiming(opac , {
        duration: 300,
      }, () => {
        if(opac === 0){
          display.value = 'none'
        }
      })
  }

  useEffect(() => {
    setShouldTabHideRef = setShouldTabHide
    translation.value = withDelay(900, withSpring(-30, {mass: 0.8}))
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
      },
      animatedStyle
    ]}>
        <View style={{
            height: 70,
            width: 260,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: State.themeHue.primary_dark,
            borderColor: State.themeHue.secondary_sub,
            borderWidth: 1,
            borderRadius: 50
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
                  backgroundColor: State.themeHue.primary,
                  borderRadius: 10,
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {label === "Status" && (isFocused ? <Image style={{width: 26, height: 26}} source={require('../assets/Icons/StatusIconActive.png')}/>
                  : <Image style={{width: 26, height: 26}} source={require('../assets/Icons/StatusIconInactive.png')} />)}

                  {label === "Gallary" && ( isFocused ? <Image style={{width: 26, height: 26}} source={require('../assets/Icons/GallaryIconActive.png')}/>
                  :<Image style={{width: 26, height: 26}} source={require('../assets/Icons/GallaryIconInactive.png')}/>)}

                  {label === "Settings" && ( isFocused ? <Image style={{width: 30, height:30}} source={require('../assets/Icons/SettingsIconActive.png')}/>
                  :<Image style={{width: 30, height: 30}} source={require('../assets/Icons/SettingsIconInactive.png')}/>)}
                </View>  

                <Text style={{ color: isFocused ? (State.theme === 'LIGHT' ? '#000': '#fff') : '#617986', fontSize: 12, marginTop: 4, fontWeight: '900'}}>
                  {label}
                </Text>
                
              </TouchableOpacity> 
            );
          })}
        </View>
      </Animated.View>
  );
}