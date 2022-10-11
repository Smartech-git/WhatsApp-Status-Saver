import { View, Text, FlatList, Image, ImageBackground} from 'react-native'
import React, {useState}from 'react'
import { useStateValue } from '../../StateProvider'
import { ImageArray } from '../../Utilities/GetViewedStatus';
import ImageThumbnail from '../../Components/ImageThumbnail';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { panGestureConditional, handleOnScroll} from '../../Utilities/GestureHandler';

export default function Home_Images() {
  const [state, dispatch] = useStateValue();
  const [contentOffsetTop, setContentOffsetTop] = useState(0)
  const [contentOffsetBottom, setContentOffsetBottom] = useState(0)

  const startPosition = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: startPosition.value}
      ]
    }
  })

  const panGestureEvent = Gesture.Pan()
    .activeOffsetY(
      panGestureConditional(contentOffsetTop ,contentOffsetBottom)
    )
    .onUpdate((e)=>{
      startPosition.value =  e.translationY * 0.2
    })
    .onEnd(() =>{
      startPosition.value = withSpring(0, {mass: 0.6})
    })

  const renderItem = ({item}) => ( 
    <ImageThumbnail imageSrc={item.image}/>
  )

  return (
    <View>
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[animatedStyle]}>
          <FlatList
            data={ImageArray}
            renderItem={renderItem}
            // keyExtractor = {(item, index)=> index}
            numColumns = '2'
            contentContainerStyle = {{
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
            decelerationRate = 'normal'
            persistentScrollbar = {false}
            overScrollMode = 'never'
            showsVerticalScrollIndicator = {false}
            onScroll={(e) => handleOnScroll(e, setContentOffsetTop, setContentOffsetBottom)}
            onMomentumScrollEnd={(e) => console.log(e.nativeEvent.contentOffset.y)}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}