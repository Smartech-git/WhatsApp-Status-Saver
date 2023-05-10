import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, Image } from 'react-native'
import React from 'react';
import { useStateValue } from '../StateProvider';

export default function ContentViewOptionsImage() {
  const [state, dispatch] = useStateValue()

  return (
    <View style={Styles.Footer}>
            <View style={{
                alignItems: 'center'
            }}>
                <TouchableOpacity activeOpacity={0.6} style={{ ...Styles.Botton,
                    backgroundColor: state.themeHue.primary_dark,
                }}>
                    {state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../assets/Icons/SaveIcon_light.png')} />
                                             :  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../assets/Icons/SaveIcon.png')} />

                    }
                   
                </TouchableOpacity>
                <Text style={{fontSize: 14, fontWeight: '900', color: state.theme === 'LIGHT' ? '#000' : '#FFF'}}>Save</Text> 
            </View>

            <View style={{
                alignItems: 'center'
            }}>
                <TouchableOpacity activeOpacity={0.6} style={{ ...Styles.Botton,
                    backgroundColor: state.themeHue.primary_dark,
                }}>
                    {state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../assets/Icons/ShareIcon_light.png')} />
                                             :  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../assets/Icons/ShareIcon.png')} />

                    }
                   
                </TouchableOpacity>
                <Text style={{fontSize: 14, fontWeight: '900', color: state.theme === 'LIGHT' ? '#000' : '#FFF'}}>Share</Text> 
            </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    Footer: {
        width: '100%',
        paddingHorizontal: 70,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    Botton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})