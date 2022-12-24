import { View, Text } from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'

export default function Image_view() {
    const [state, dispatch] = useStateValue();

    return (
        <View style={{ flex: 1, 
       backgroundColor: state.themeHue.primary
        }}>
        
        </View>
    )
}