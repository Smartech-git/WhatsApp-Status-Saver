import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'
import { themeHueDark, themeHueLight } from '../Reducer'

export default function ListHeader(props) {
  const [state, dispatch] = useStateValue()
  
  return (
    <View style={[Styles.ListHeader, {
        backgroundColor: state.themeHue.primary_veryDark
    }]}>
        <View style={[Styles.Stats]}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <View style={[Styles.Icon, {backgroundColor: state.theme === 'LIGHT' ? themeHueLight.primary : state.themeHue.primary_dark}]}>
                    {
                        state.theme === 'LIGHT' ? <Image style={{width: 14, height: 14}} source={require('../assets/Icons/StatsIcon_light.png')}/>
                                                : <Image style={{width: 14, height: 14}} source={require('../assets/Icons/StatsIcon.png')}/>
                    }   
                </View>
                <Text style={{
                    color: state.theme === 'LIGHT'? '#000' : "#FFF",
                    fontSize: 14, 
                    marginLeft: 5,
                    opacity: 1
                }}>{props.text} </Text>
            </View>

            <View style ={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: state.theme === 'LIGHT' ? themeHueLight.primary : state.themeHue.primary_dark,
                borderRadius: 50
            }}>
                <Text style={{fontSize:13, fontWeight: '600', color: state.theme === 'LIGHT'? '#000' : '#FFF'}}>{props.totalViewedContent}/
                    {props.dataSize}
                </Text>
            </View>
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    ListHeader: {
        paddingVertical: 4,
        alignItems: 'center',
        paddingHorizontal: 4,
        borderRadius: 16,
        marginBottom: 6,
        marginTop: 10
    },

    Stats: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    Icon :{
        width: 26, 
        height: 26, 
        alignItems: 'center' ,
        justifyContent: 'center',
        borderRadius: 50
    }
})