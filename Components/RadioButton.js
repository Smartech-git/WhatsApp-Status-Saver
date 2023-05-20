import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'

export default function RadioButton(props) {
    const [state, dispatch] = useStateValue()

  return (
    <View style={{
        backgroundColor: state.themeHue.primary_dark,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: state.themeHue.secondary_sub,
        width: props.size,
        height: props.size,
        padding: 2
        }}>
      <View style={{
        borderRadius: 50,
        backgroundColor: props.color,
        flex: 1
      }}>

      </View>
    </View>
  )
}
