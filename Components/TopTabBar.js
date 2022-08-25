import { View, TouchableOpacity, Animated, Text, StyleSheet} from 'react-native'


export default function TopTabBar({ state, descriptors, navigation, position }) {
    return (
      <View style={{ 
        flexDirection: 'row',
        paddingHorizontal: 64,
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
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
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
              style={{}}
            >
              <Animated.Text style={{ opacity }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                   {label}
                </Text>
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
const styles = StyleSheet.create({

})