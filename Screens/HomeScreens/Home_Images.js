import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'

export default function Home_Images() {
  const [state, dispatch] =useStateValue();

  return (
    <ScrollView style = {{
      flex: 1,
    }}>
      <Text>Images</Text>
    </ScrollView>
  )
}