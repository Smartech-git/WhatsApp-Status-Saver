import { View, Text, StyleSheet} from 'react-native'
import React, {useRef, useEffect, useState, useLayoutEffect, useCallback} from 'react'
import Slider from '@react-native-community/slider';
import Animated, {useSharedValue} from 'react-native-reanimated';

export default function Progress({position, duration}) {
    const vidTime = useRef("00:00")
    const value = useSharedValue(0)

    const millisToVidTime = useCallback((ms) => {
        if(!ms){
            return "00:00"
        }
        const totalSeconds = ms / 1000
        const seconds = String(Math.floor(totalSeconds % 60))
        const minutes = String(Math.floor(totalSeconds / 60))
        
        return minutes.padStart(1, '0') + ':' + seconds.padStart(2, '0')
    }, [])

  return (
    <Animated.View style={Styles.SliderContainer}>
        <View style={{ alignItems:'center', position: 'relative', right: -2}}>
            <Text style={Styles.SliderText}>{millisToVidTime(position)}</Text> 
        </View>
        
        <Slider
            style={{flex: 1, height: 30,}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#00D426"
            maximumTrackTintColor="#E9ECEF"
            thumbTintColor='#FFFFFF'
            value={
                duration
                ? position / duration
                : 0
            }
        />
        <View style={{ alignItems:'center', position: 'relative', left: -2}}>
            <Text style={Styles.SliderText}>{millisToVidTime(duration)}</Text> 
        </View>
        
    </Animated.View>
  )
}

const Styles = StyleSheet.create({
    SliderContainer: {
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'red',
        height: 2,
        overflow: 'hidden'
    },
    SliderText : {
        color: "#FFF",
        fontSize: 14,
    }
})