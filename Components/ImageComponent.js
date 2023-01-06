import { View, Text, Image, Dimensions, ImageBackground} from 'react-native'
import React from 'react'

const win = Dimensions.get('window').width-20

export default function ImageComponent({imageSrc}) {
  return (
    <View style={{
        width: win,
        height: '100%',
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    }}>
      <ImageBackground source={{uri: imageSrc}} blurRadius={500} resizeMode ='cover' style={{ height: '100%'}}>
        <Image style={{width: '100%', flex: 1}} source={{uri: imageSrc}} resizeMode={'contain'} />
      </ImageBackground>
    </View>
  )
}