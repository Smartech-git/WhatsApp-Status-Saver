import { View, ScrollView, RefreshControl, StatusBar} from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useStateValue } from '../../StateProvider'
import Animated, {useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';
import { panGestureConditional, handleVerticalScroll, handleScrollEndDrag} from '../../Utilities/GestureHandler';
import { MasonryFlashList, FlashList } from '@shopify/flash-list';
import Loading from '../../Components/Loading';
import ListHeader from '../../Components/ListHeader';
import ListFooter from '../../Components/ListFooter';
import VideoThumbnail from '../../Components/VideoThumbnail';
import { getViewedStatusVideos, viewedVideosArr, viewedStatusVideosStats } from '../../Utilities/ViewedStatusManager';
import { actionTypes } from '../../Reducer';
import { withIO } from 'react-native-intersection-observer'

const IOMasonryFlashList = withIO(MasonryFlashList);

export default function Home_Videos(props) {
  const [state, dispatch] = useStateValue();
  const [contentOffsetTop, setContentOffsetTop] = useState(0)
  const [contentOffsetBottom, setContentOffsetBottom] = useState(0)
  const startPosition = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)
  let {totalViewedVideos, dataSize} = viewedStatusVideosStats

  useEffect(() => {
    
  }, [props.route.name])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    const refresh = async () => {  
      try {
        await getViewedStatusVideos(state.validFilePath)
      } catch(e) {
        
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
    <View style = {{
      overflow: 'hidden',
      marginHorizontal: 6.4,
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
    }}>

      <View style={{opacity: state.loadingStateVideos ? 1: 0, position: 'absolute', width: '100%'}}>
        <Loading/>
      </View>
      <View  style={{opacity: state.loadingStateVideos ? 0 : 1}}>
          <GestureDetector  gesture={panGestureEvent}>
            <Animated.View style={[{width:'100%', height: "100%"}, animatedStyle]}>
              <IOMasonryFlashList
                data={viewedVideosArr}
                renderItem={({item, index})=> <VideoThumbnail key={item.filename} filename={item.filename} modificationTime={item.modificationTime} ratio={item.ratio} index ={index} imageSrc={item.URL}/>}
                extraData={[viewedVideosArr.length]}
                keyExtractor={(item) => item.filename}
                numColumns = {2}
                estimatedItemSize={50}
                contentContainerStyle = {{
                paddingBottom: 50,
                }}
                decelerationRate = 'normal'
                persistentScrollbar = {false}
                overScrollMode = 'never'
                showsVerticalScrollIndicator = {false}
                onScroll={(e) => handleVerticalScroll(e, contentOffsetBottom, setContentOffsetTop, setContentOffsetBottom)}
                onScrollEndDrag={(e) => handleScrollEndDrag(e)}
                ListHeaderComponent={<ListHeader totalViewedContent={totalViewedVideos} dataSize={dataSize}  text='Total viewed videos/data size' />}
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

    </View>
  )
}