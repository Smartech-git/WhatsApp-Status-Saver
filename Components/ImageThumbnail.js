import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ImageThumbnail({imageSrc}) {
    return (
        <View style={{width: 160, height: 180, margin: 5,
        }}>
          <Image style={{width: '100%', 
            height: '100%',
            borderRadius: 15,
            borderColor: '#617986',
            borderWidth: 1
        }}  source={(imageSrc)}/>
        </View>
      )
}