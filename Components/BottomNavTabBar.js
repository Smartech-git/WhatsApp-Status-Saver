import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useStateValue } from '../StateProvider';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function BottomNavTabBar({ state, descriptors, navigation }) {
  const [State, dipatch] = useStateValue()

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
    .onUpdate((e) => {
      offsetY.value =  e.translationY + c.value
      console.log(e.translationY)
    })
  
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={{
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
        width: '100%',
        animatedStyle
      }}>
      
          <View style={{
              width: 270,
              height: 70,
              flexDirection: 'row',
              backgroundColor: State.themeHue.primary_dark,
              justifyContent: 'space-around',
              borderRadius: 50,
              borderColor: State.themeHue.secondary_sub,
            
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
                    {label === "Status" && (isFocused ? <Image style={{width: 26, height: 26}} source={require('../assets/Images/StatusIcon.png')}/>
                    : <Image style={{width: 26, height: 26}} source={require('../assets/Images/StatusIcon_light.png')} />)}

                    {label === "Gallary" && ( isFocused ? <Image style={{width: 26, height: 26}} source={require('../assets/Images/GallaryIcon.png')}/>
                    :<Image style={{width: 26, height: 26}} source={require('../assets/Images/GallaryIcon_light.png')}/>)}

                    {label === "Settings" && ( isFocused ? <Image style={{width: 30, height:30}} source={require('../assets/Images/SettingsIcon.png')}/>
                    :<Image style={{width: 30, height: 30}} source={require('../assets/Images/SettingsIcon_light.png')}/>)}
                  </View>  

                  <Text style={{ color: isFocused ? (State.theme === 'LIGHT' ? '#000': '#fff') : '#617986', fontSize: 12, marginTop: 4, fontWeight: '900'}}>
                    {label}
                  </Text>
                  
                </TouchableOpacity> 
              );
            })}
          </View>
        
      </Animated.View>
    </GestureDetector>
  );
}