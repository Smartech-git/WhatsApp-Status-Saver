import { View, Text, StatusBar} from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'

export default function ScreenHeaders(props) {
  const [state] = useStateValue();

  return (
    <View style={{
        width: '100%',
        height: 50,
        marginTop: StatusBar.currentHeight,
        justifyContent:'center'
    }}>
        <View style={{
            height: 40,
            paddingHorizontal: 20,
            position: 'absolute',
            borderRadius: 50,
            marginLeft: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: state.theme === 'LIGHT'? '#000' : '#fff',
        }}>
            <Text
            style={{
                color: state.theme === 'LIGHT'? '#fff' : '#000',
                fontSize: 16,
                fontWeight: '700'
            }}
        >{props.title}</Text>
        </View>
        
    </View>
  )
}