import react, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, PixelRatio} from 'react-native';
import { useStateValue } from '../StateProvider';
import { hangdleBottomHide } from '../Utilities/GestureHandler';


export default function BottomNavTabBar({ state, descriptors, navigation }) {
  const [State, dipatch] = useStateValue()
  const [displayNav, setDisplayNav] = useState(true)

  useEffect(() => {
    hangdleBottomHide(setDisplayNav)
  }, [])

  return (
      <View style={
        {
          width:  '100%',
          alignItems: 'center',
          display: displayNav ? 'flex' : 'none'
       }
      }>
        <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: State.themeHue.primary,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderTopWidth: 1,
            borderColor: State.themeHue.primary_dark
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
                <View>
                  {label === "Home" && (
                    <View>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(13), height: PixelRatio.getPixelSizeForLayoutSize(13), opacity: isFocused ? 1 : 0, position: 'absolute'}} source={require('../assets/Icons/HomeActive.png')}/>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(13), height: PixelRatio.getPixelSizeForLayoutSize(13),  opacity: isFocused ? 0 : 1}} source={require('../assets/Icons/HomeInactive.png')} />
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
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(14), height:PixelRatio.getPixelSizeForLayoutSize(14), opacity: isFocused ? 1 : 0, position: 'absolute'}} source={require('../assets/Icons/SettingsIconActive.png')}/>
                      <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(14), height: PixelRatio.getPixelSizeForLayoutSize(14), opacity: isFocused ? 0 : 1,}} source={require('../assets/Icons/SettingsIconInactive.png')}/>
                    </View>
                    
                  )}
                </View>  

                <Text style={{ color: isFocused ? (State.theme === 'LIGHT' ? '#000': '#fff') : '#617986', fontSize: 12, marginTop: 2, fontWeight: '600'}}>
                  {label}
                </Text>
                
              </TouchableOpacity> 
            );
          })}
        </View>
      </View>
  );
}