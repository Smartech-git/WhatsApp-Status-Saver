import { View,  Dimensions} from 'react-native'
import React, {useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import { handleHorinzontalScroll, panGestureConditional } from '../../Utilities/GestureHandler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view';

const width = Dimensions.get('window').width-20
const offset = Dimensions.get('window').width;

export default function Image_view({route}) {
    const [contentOffsetLeft, setContentOffsetLeft] = useState(0)
    const [contentOffsetRight, setContentOffsetRight] = useState(0)
    const [state, dispatch] = useStateValue();
    const startPosition = useSharedValue(0);
    

    const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {translateX: startPosition.value}
          ]
        }
      })
    
    
    const panGestureEvent = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetX(
    panGestureConditional('horizontal', contentOffsetLeft ,contentOffsetRight)
    )
    .onStart(() => {
    })
    .onUpdate((e)=>{
    startPosition.value =  e.translationX* 0.5
    })
    .onEnd(() =>{
    startPosition.value = withSpring(0, {mass: 1})
    })

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{marginVertical: 20, flex: 1}} >
                <PagerView style={{flex: 1}} 
                    initialPage={route.params.index}
                    offscreenPageLimit ={3}
                    overScrollMode='never'
                >
                    {
                        viewedImagesArr.map((item, index) => {
                            return (
                                <ImageComponent imageSrc={item.URL} key={index} /> 
                            )
                        
                        })
                    }
                </PagerView>
            </View>
            <View style={{height: 100, width: '100%'}}>

            </View>
        </View>
    )
}