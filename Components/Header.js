import { View, Text, Image, StyleSheet,  PixelRatio} from 'react-native'
import { useStateValue } from '../StateProvider'
import React from 'react'
import EmojiProfile from './EmojiProfile';

export default function Header(props) {
  const [state, dispatch] = useStateValue();
  
  return (
    <View style={{backgroundColor: state.themeHue.primary}}>
      <View style={styles.Header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{
                width: PixelRatio.getPixelSizeForLayoutSize(15),
                height: PixelRatio.getPixelSizeForLayoutSize(15),
            }} source={require('../assets/Images/Logo.png')}/>
          <Text style={{ color:  state.theme === 'LIGHT' ? '#000' : '#FFF', fontSize: 24,
            marginTop: 2,
            marginLeft: 8,
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
  }
})