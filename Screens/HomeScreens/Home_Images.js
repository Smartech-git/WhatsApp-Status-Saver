import { View, Text, RefreshControl} from 'react-native'
import React, {useState, useCallback, useEffect}from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr, getViewedStatusImages } from '../../Utilities/ViewedStatusManager';
import ImageThumbnail from '../../Components/ImageThumbnail';
import ListHeader from '../../Components/ListHeader';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { panGestureConditional, handleOnScroll, handleScrollEndDrag} from '../../Utilities/GestureHandler';
import { MasonryFlashList } from '@shopify/flash-list';
import MasonryList from '@react-native-seoul/masonry-list';


export default function Home_Images() {
  const [state, dispatch] = useStateValue();
  const [contentOffsetTop, setContentOffsetTop] = useState(0)
  const [contentOffsetBottom, setContentOffsetBottom] = useState(0)
  const startPosition = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() =>{
   getViewedStatusImages()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    const refresh = async () => {  
      try {
        await getViewedStatusImages()
      } catch(e) {
        console.log(e)
      } finally {
        setRefreshing(false)
      }
    }
    refresh()
  }, []);
  
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
    .onStart(() => {
    })
    .onUpdate((e)=>{
      startPosition.value =  e.translationY * 0.2
    })
    .onEnd(() =>{
      startPosition.value = withSpring(0, {mass: 0.8})
    })
   
  return (
    <View>   
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[{width:'100%', height: "100%", paddingHorizontal: 5}, animatedStyle]}>
          <MasonryFlashList
            data={viewedImagesArr}
            renderItem={({item})=> <ImageThumbnail ratio={item.ratio}  imageSrc={item.URL}/>}
            //keyExtractor = {(item)=> item.URL}
            extraData={viewedImagesArr.length}
            numColumns = {2}
            estimatedItemSize={10}
            contentContainerStyle = {{
              paddingBottom: 70,
            
            }}
            decelerationRate = 'normal'
            persistentScrollbar = {false}
            overScrollMode = 'never'
            showsVerticalScrollIndicator = {false}
            onScroll={(e) => handleOnScroll(e, contentOffsetBottom, setContentOffsetTop, setContentOffsetBottom)}
            onScrollEndDrag={(e) => handleScrollEndDrag(e)}
            ListHeaderComponent={<ListHeader/>}
            refreshControl = {
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#00D426"]}
                progressBackgroundColor = {'#fff'}
              />
            }
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}