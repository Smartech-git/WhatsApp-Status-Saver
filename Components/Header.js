import { View, Text, Image, StyleSheet,  PixelRatio} from 'react-native'
import { useStateValue } from '../StateProvider'
import React from 'react'
import EmojiProfile from './EmojiProfile';

export default function Header(props) {
  const [state, dispatch] = useStateValue();
  
  return (
    <View>
      <View style={styles.Header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.AppLogo, {backgroundColor: state.themeHue.primary_dark}]}>
          <Image style={{
                width: PixelRatio.getPixelSizeForLayoutSize(13),
                height: PixelRatio.getPixelSizeForLayoutSize(13),
            }} source={require('../assets/Images/Logo.png')}/>
          </View>
          <Text style={{ color:  state.theme === 'LIGHT' ? '#000' : '#FFF', fontSize: 23,
            marginTop: 4,
            marginLeft: 5,
            fontWeight: '700',
            letterSpacing: -0.5
          }}>Status Saver</Text>
        </View>

        <EmojiProfile/> 
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10
  },
  AppLogo:{
    width: 34,
    height: 34,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  }
})