import { View, Text, Image, Dimensions, ImageBackground} from 'react-native'
import React from 'react'

const win = Dimensions.get('window').width-20

export default function ImageComponent({imageSrc}) {

  return (
    <View style={{
        width: win,
        marginHorizontal: 10,
        borderRadius: 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center' ,
        overflow: 'hidden'
    }}>
      <ImageBackground source={{uri: imageSrc}} blurRadius={500} resizeMode= 'cover' style={{ height: '100%', width: '100%',
    }}>
        <Image style={{flex: 1}} source={{uri: imageSrc}} resizeMode={'contain'} />
      </ImageBackground>
    </View>
  )
}