import { View, Text, TouchableOpacity, Animated, Easing, Image, StyleSheet, StatusBar} from 'react-native'
import React, {useRef, useEffect} from 'react'
import * as MediaLibrary from 'expo-media-library';
import * as NavigationBar from 'expo-navigation-bar';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

export default function PermissionScreen() {

  const [state, dispatch] = useStateValue()

  let animate = useRef(new Animated.Value(0)). current

  useEffect(() => {
     Animated.timing(animate,
    {
      toValue: 1,
      duration: 300,
      delay: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(3))
    }
  ).start()
  }, [])
 
  const handlePermissionRequest = async () => {
    const status = await MediaLibrary.requestPermissionsAsync();
    console.log(status);
    if(status.granted){
      let action = {
       type : actionTypes.setPermissionState,
       permissionState: true
      }
     dispatch(action)
    }
  }

  return (
    <View style={{alignItems: 'center', backgroundColor: state.themeHue.primary, flex: 1}}>
      <View style={{ alignItems: 'center', marginTop: 140}}>
        <View style ={{...Styles.FolderGif, backgroundColor: state.themeHue.primary_dark}}>
            <Image style= {{ width: 100, height: 100 }} source={require('./assets/GIFs/Folder.gif')}/>
        </View>

        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: state.theme === 'LIGHT' ? '#000' : '#fff'}}>Permission Request</Text>
          <Text style={{...Styles.Info, color: state.theme === 'LIGHT' ? 'rgba(0,0,0,0.7)' : 'rgba(225,225,225,0.9)'}}> 
            <Text style={{color: '#00D426'}}>Status Saver</Text> needs access to your device storage. This is required for normal app operations and best performance.
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handlePermissionRequest} activeOpacity={0.7} style={{ position: 'relative', marginTop: 100,}}>
        <Animated.View style={{...Styles.button, opacity: animate,
          transform: [{translateY: animate.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0]
          })}]
        }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>Allow</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  button : {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#00D426'
  },

  FolderGif : {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: 140,
    borderRadius: 100
  },

  Info: {
    width: 300, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: '600',
    marginTop: 20,
    lineHeight: 22,
  }
});