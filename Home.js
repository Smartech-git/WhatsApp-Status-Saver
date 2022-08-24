import { View, Text} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import Header from './Components/Header'
import { useStateValue } from './StateProvider';

export default function Home(props) {

  return (
    <View style={{
    }}>
        <Header fontFamily={props.fontFamily}/>
        <Text>Home</Text>
    </View>
  )
}