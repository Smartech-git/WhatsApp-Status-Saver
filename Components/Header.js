import { View, Text } from 'react-native'
import React from 'react'
import StatusLogo from '../assets/SVGs/StatusLogo.svg'

export default function Header() {
  return (
    <View style={{
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center'

    }}>
        <Text>Header!</Text>
    </View>
  )
}