import { View, Text, FlatList, Dimensions} from 'react-native'
import React, {useState}from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageThumbnail from '../../Components/ImageThumbnail';
import ListHeader from '../../Components/ListHeader';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { panGestureConditional, handleOnScroll, handleScrollEndDrag} from '../../Utilities/GestureHandler';

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
    .maxPointers(1)
    .activeOffsetY(
      panGestureConditional(contentOffsetTop ,contentOffsetBottom)
    )
    .onUpdate((e)=>{
      startPosition.value =  e.translationY * 0.2
    })
    .onEnd(() =>{
      startPosition.value = withSpring(0, {mass: 0.8})
    })

  const renderItem = ({item}) => ( 
    <ImageThumbnail  imageSrc={item.URL}/>
  )

  return (
    <View>
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[{flexDirection: 'row', width:'100%'},animatedStyle]}>
          <FlatList
            data={viewedImagesArr}
            renderItem={renderItem}
            // keyExtractor = {(item, index)=> index}
            numColumns = '2'
            contentContainerStyle = {{
              paddingTop: 5,
              paddingBottom: 70,
              paddingHorizontal: 2
            }}
            decelerationRate = 'normal'
            persistentScrollbar = {false}
            overScrollMode = 'never'
            showsVerticalScrollIndicator = {false}
            onScroll={(e) => handleOnScroll(e, setContentOffsetTop, setContentOffsetBottom)}
            onScrollEndDrag={(e) => handleScrollEndDrag(e)}
            ListHeaderComponent={<ListHeader/>}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}