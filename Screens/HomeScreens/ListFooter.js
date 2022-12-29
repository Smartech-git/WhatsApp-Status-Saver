import { View, Text } from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'

export default function ListFooter() {
  const [state, dispatch] = useStateValue()

  return (
    <View style={{ width: '100%', height: 50, backgroundColor: state.themeHue.primary}}>
      
    </View>
  )
}