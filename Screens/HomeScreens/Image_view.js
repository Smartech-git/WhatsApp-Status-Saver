import { View, Text, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import { FlashList } from '@shopify/flash-list';
import ImageComponent from '../../Components/ImageComponent';
import { handleHorinzontalScroll, panGestureConditional } from '../../Utilities/GestureHandler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const win = Dimensions.get('window').width-20

export default function Image_view() {
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
    startPosition.value = withSpring(0, {mass: 0.8})
    })

    return (
        <View style={{ 
            flex: 1
        }}>
            <View style={{marginVertical: 20, flex: 1}} >
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={animatedStyle}>
                        <FlashList
                            data={viewedImagesArr}
                            renderItem={({item})=> <ImageComponent imageSrc={item.URL}/>}
                            extraData={viewedImagesArr.length}
                            horizontal = {true}
                            estimatedItemSize={100}
                            decelerationRate = 'normal'
                            persistentScrollbar = {false}
                            overScrollMode = 'never'
                            showsHorizontalScrollIndicator = {false}
                            pagingEnabled = {true}
                            onScroll={(e) => handleHorinzontalScroll(e, contentOffsetRight, setContentOffsetLeft, setContentOffsetRight)}
                        />
                    </Animated.View>
                </GestureDetector>
            </View>
            <View style={{height: 100, width: '100%'}}>

            </View>
        </View>
    )
}