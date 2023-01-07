import { View, Text, RefreshControl} from 'react-native'
import React, {useState, useCallback, useEffect}from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr, getViewedStatusImages} from '../../Utilities/ViewedStatusManager';
import ImageThumbnail from '../../Components/ImageThumbnail';
import ListHeader from '../../Components/ListHeader';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { panGestureConditional, handleVerticalScroll, handleScrollEndDrag} from '../../Utilities/GestureHandler';
import { MasonryFlashList } from '@shopify/flash-list';
import ListFooter from './ListFooter';

export default function Home_Images() {
  const [state, dispatch] = useStateValue();
  const [ready, setReady] = useState(false);
  const [contentOffsetTop, setContentOffsetTop] = useState(0)
  const [contentOffsetBottom, setContentOffsetBottom] = useState(0)
  const startPosition = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)

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
      panGestureConditional( 'vertical', contentOffsetTop ,contentOffsetBottom)
    )
    .onStart(() => {
    })
    .onUpdate((e)=>{
      startPosition.value =  e.translationY * 0.5
    })
    .onEnd(() =>{
      startPosition.value = withSpring(0, {mass: 1})
    })
   
  return (
    <View style={{  overflow: 'hidden',
       marginHorizontal: 6,
       borderRadius: 16
    }}>
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[{width:'100%', height: "100%",}, animatedStyle]}>
          <MasonryFlashList
            data={viewedImagesArr}
            renderItem={({item, index})=> <ImageThumbnail ratio={item.ratio} index ={index} imageSrc={item.URL}/>}
            extraData={[viewedImagesArr.length, ready]}
            numColumns = {2}
            estimatedItemSize={100}
            contentContainerStyle = {{
              paddingBottom: 50,
            }}
            decelerationRate = 'normal'
            persistentScrollbar = {false}
            overScrollMode = 'never'
            showsVerticalScrollIndicator = {false}
            onScroll={(e) => handleVerticalScroll(e, contentOffsetBottom, setContentOffsetTop, setContentOffsetBottom)}
            onScrollEndDrag={(e) => handleScrollEndDrag(e)}
            ListHeaderComponent={<ListHeader/>}
            ListFooterComponent = {<ListFooter/>}
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