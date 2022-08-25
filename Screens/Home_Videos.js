import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'

export default function Home_Videos() {
  const [state, dispatch] = useStateValue();

  return (
    <ScrollView style = {{
        flex: 1,
    }}>
      <Text>Videos</Text>
    </ScrollView>
  )
}