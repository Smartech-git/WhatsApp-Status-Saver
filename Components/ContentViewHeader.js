import { View, Text, StyleSheet,Image, PixelRatio, TouchableOpacity} from 'react-native'
import React from 'react'
import { useStateValue } from '../StateProvider'
import { useNavigation } from '@react-navigation/native'

export default function ContentViewHeader({screenType}) {
    const [state, dispatch] = useStateValue();
    const navigation = useNavigation();

    const handleGoback = () =>{
        navigation.goBack();
    }
    return (
        <View style={{...styles.Header,
            backgroundColor: state.themeHue.primary,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleGoback} style={{ ...styles.BackButton,
                    backgroundColor: state.themeHue.primary_dark,
                }}>
                    {state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/BackIcon_light.png')} />
                                             :  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/BackIcon.png')} />

                    }
                   
                
                </TouchableOpacity>
                <Text style={{fontSize: 17, fontWeight: '600', color: state.theme === 'LIGHT' ? '#000' : '#FFF'}}>Back</Text> 
            </View>
            
            <View style={{
                borderRadius: 50,
                paddingHorizontal: 18,
                height: 36,
                justifyContent: 'center',
                backgroundColor:  state.theme === 'LIGHT'? '#000':'#FFF',
            }}>
                <View>
                   <Text style={{fontSize: 16, fontWeight: '600', color: state.theme === 'LIGHT' ? '#fff' : '#000'}}>{screenType}</Text>  
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
        width: 34,
        height: 34,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    }
})