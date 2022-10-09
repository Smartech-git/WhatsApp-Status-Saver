import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useStateValue } from '../StateProvider';

export default function BottomNavTabBar({ state, descriptors, navigation }) {
  const [State, dipatch] = useStateValue()

  return (
    <View style={{
      backgroundColor: State.themeHue.primary,
      alignItems: 'center'
    }}>
      <View style={{
        alignItems: 'center',
        width: '102%',
        backgroundColor: State.themeHue.primary_dark,
        borderColor: State.themeHue.secondary_sub,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 8
      }}>
        <View style={{
            width: 300,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
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
      </View>
    </View>
  );
}