import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'
import { viewedStatusImagesStats } from '../Utilities/ViewedStatusManager'

export default function ListHeader() {
  const [state, dispatch] = useStateValue()

  let {TotalViewedImages, DataSize} = viewedStatusImagesStats
  
  return (
    <View style={{
        flex: 1, 
        marginHorizontal: 6,
        paddingVertical: 5,
    }}>
        <View style={[Styles.Stats]}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <View style={[Styles.Icon, {backgroundColor: state.themeHue.primary_dark}]}>
                    {
                        state.theme === 'LIGHT' ? <Image style={{width: 14, height: 14}} source={require('../assets/Icons/StatsIcon_light.png')}/>
                                                : <Image style={{width: 14, height: 14}} source={require('../assets/Icons/StatsIcon.png')}/>
                    }   
                </View>
                <Text style={{
                    color: state.theme === 'LIGHT'? '#000' : "#FFF",
                    fontSize: 13, 
                    fontWeight: '500',
                    marginLeft: 5
                }}>Total viewed images/data size </Text>
            </View>

            <View style ={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                backgroundColor: state.themeHue.primary_dark,
                borderRadius: 50
            }}>
                <Text style={{fontSize:14, fontWeight: '600', color: state.theme === 'LIGHT'? '#000' : "#FFF"}}>{TotalViewedImages}/
                    <Text style={{color: '#6525EC', letterSpacing: 1}}>{DataSize}MB</Text>
                </Text>
            </View>

        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    Stats: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    Icon :{
        width: 26, 
        height: 26, 
        alignItems: 'center' ,
        justifyContent: 'center',
        borderRadius: 50
    }
})