import { View, Text, SafeAreaView, StatusBar} from 'react-native'
import React from 'react'
import Header from './Components/Header'
import { useStateValue } from './StateProvider';

export default function Home(props) {
  const [state, dispatch] = useStateValue();

  return (
    <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: state.themeHue.primary,
        flex: 1,
        paddingHorizontal: 15
    }}>
        <View style={{
        }}>
            <Header fontFamily={props.fontFamily}/>
            <Text>Home</Text>
        </View>
        <StatusBar barStyle={ state.theme === 'LIGHT'? 'dark-content' : 'light-content'} backgroundColor={state.themeHue.primary}/>
    </SafeAreaView>
  )
}