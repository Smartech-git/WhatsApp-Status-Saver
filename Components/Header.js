import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Pressable} from 'react-native'
import { useStateValue } from '../StateProvider'
import { Shadow } from 'react-native-shadow-2'
import { actionTypes } from '../Reducer'
import React, {useRef, useEffect} from 'react'

export default function Header(props) {
  const [state, dispatch] = useStateValue();

  let swipe = new Animated.Value(state.theme === 'LIGHT' ? 0 : 35)

  const handlePressEvent = (e) => {
    Animated.timing(swipe,
      {
        toValue: state.theme === 'LIGHT' ? 35 : 0,
        duration: 170,
        useNativeDriver: true
      }
    ).start(() => {
      const action = {
        type: actionTypes.setTheme,
        theme: state.theme === 'LIGHT' ? 'DARK' : 'LIGHT'
        }
      dispatch(action);
    });
  }
 
  return (
    <View style={styles.Header}>
      <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: state.themeHue.primary_dark, padding: 6, borderRadius: 50}}>
          <Image style={{ width: 28, height: 28}} source={require('../assets/Images/Status.png')} />
        </View>
        <Text style={{fontFamily: props.fontFamily, color: state.themeHue.secondary, fontSize: 23,
          marginTop: 6,
          marginLeft: 5
        }}>Status Saver</Text>
      </View>

      <View style={{...styles.themeButton, 
        backgroundColor: state.themeHue.primary_dark, 
        borderColor: state.themeHue.secondary_sub,
      }}>
        <Pressable onPress={handlePressEvent}>
          <Animated.View style={{position: 'relative', transform: [{ translateX: swipe}]}}>
            <View >
                <Shadow startColor={'#00000020'} offset={[0, 1]} distance={4}>
                <View style={styles.themeButton_thumb}/>
              </Shadow>
            </View>
          </Animated.View>
        </Pressable>
            
       

        {/* <Image style={{ 
          width: 22, height: 22,
          position: 'absolute',
          right: 7, zIndex: 1
          }}  source={require('../assets/Images/EmojiPack/Sun_Behind_Small_Cloud.png')}/> */}
        
      </View>
       
    </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeButton: {
    width: 70,
    height: 34, 
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6
  },
  themeButton_thumb:{
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: '#00D426',
    borderColor: '#ffffff',
    borderWidth: 2,
    zIndex: 2
  }
})