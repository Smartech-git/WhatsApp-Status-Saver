import { View, TouchableOpacity, Animated, Text, Easing} from 'react-native'
import react, {useRef} from 'react';
import { useStateValue } from '../StateProvider';


export default function TopTabBar({ state, descriptors, navigation, position }) {
  const [status, dispatch] = useStateValue();

  let animate = useRef(new Animated.Value(0)).current;
  
  Animated.timing(animate,
    {
      toValue: 1,
      duration: 300,
      delay: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(3))
    }
  ).start()

  return (
    <View style={{ 
      flexDirection: 'row',
      paddingHorizontal: 50,
      justifyContent: 'space-between'
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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.8)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              position: 'relative',
              transform: [{translateX: animate.interpolate({
                inputRange: [0, 1],
                outputRange: index === 0 ? [-20, 0] : [20, 0] 
              })}],
            }}
          >
            <Animated.View style={{
              opacity: animate
            }}>
              <Animated.View style={{ opacity,
                backgroundColor: isFocused ? '#00D426' : status.themeHue.primary_dark,
                borderRadius: 50,
                paddingHorizontal: 18,
                paddingVertical: 6
                }}>
                <View style={{
                }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: isFocused ? '#fff' : '#00D426'}}>
                    {label}
                  </Text>
                </View>
                
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
