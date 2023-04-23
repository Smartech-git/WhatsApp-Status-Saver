import { View, Text, Dimensions, StatusBar } from 'react-native'
import React from 'react'

const win = Dimensions.get('window').height + StatusBar.currentHeight

export default function VideoComponent({index}) {
    
  return (
    <View style={{
        width: '100%',
        backgroundColor: 'red',
        height: win,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <Text>{`vidoeCompoenent ${index}`}</Text>
    </View>
  )
}