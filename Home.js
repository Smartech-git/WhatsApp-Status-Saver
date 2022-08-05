import { View, Text, SafeAreaView, StatusBar} from 'react-native'
import React from 'react'
import Header from './Components/Header'

export default function Home() {
  return (
    <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight,     
    }}>
        <View style={{
        }}>
            <Header/>
            <Text>Home</Text>
        </View>
    </SafeAreaView>
  )
}