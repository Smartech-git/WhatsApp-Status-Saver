import { View, Text, StyleSheet,Image, PixelRatio, Pressable} from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'
import { useNavigation } from '@react-navigation/native'

export default function ContentViewHeader({screenType, special}) {
    const [state, dispatch] = useStateValue();
    const navigation = useNavigation();

    const handleGoback = () =>{
        navigation.goBack();
    }
    
    return (
        <View style={{...styles.Header,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Pressable hitSlop={10} android_ripple={{color: state.themeHue.primary_dark, radius: 28, borderless: true }} onPress={handleGoback} style={{ ...styles.BackButton,
                    backgroundColor: special ? undefined : state.themeHue.primary_dark,
                }}>
                    {
                        special ? (
                            <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../assets/Icons/BackIcon.png')} />
                        ) : (
                            state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../assets/Icons/BackIcon_light.png')} />
                                                :  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../assets/Icons/BackIcon.png')} />
                        )
                    }
                   
                
                </Pressable>
                <Text style={{fontSize: 18, fontWeight: '600', color:special ? '#FFF' : state.theme === 'LIGHT' ? '#000' : '#FFF'}}>Back</Text> 
            </View>
            
            <View style={{
                borderRadius: 50,
                paddingHorizontal: 18,
                height: 38 ,
                justifyContent: 'center',
                backgroundColor: special ? '#FFF' : state.theme ===  'LIGHT'? '#000':'#FFF',
            }}>
                <View>
                   <Text style={{fontSize: 16, fontWeight: '600', color: special ? '#000' : state.theme === 'LIGHT' ? '#fff' : '#000'}}>{screenType}</Text>  
                </View>    
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    Header: {
        width: "100%",
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    BackButton: {
        width: 38,
        height: 38,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    }
})