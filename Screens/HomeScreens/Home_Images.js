import { View, RefreshControl} from 'react-native'
import React, {useState, useCallback, useEffect}from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr, getViewedStatusImages, viewedStatusImagesStats} from '../../Utilities/ViewedStatusManager';
import ImageThumbnail from '../../Components/ImageThumbnail';
import ListHeader from '../../Components/ListHeader';
import ListFooter from '../../Components/ListFooter';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { panGestureConditional, handleVerticalScroll, handleScrollEndDrag} from '../../Utilities/GestureHandler';
import { MasonryFlashList } from '@shopify/flash-list';
import { actionTypes } from '../../Reducer';
import Loading from '../../Components/Loading';
import { withIO } from 'react-native-intersection-observer'


const IOMasonryFlashList = withIO(MasonryFlashList);

export default function Home_Images({route, navigation}) {
  const [state, dispatch] = useStateValue();
  const [contentOffsetTop, setContentOffsetTop] = useState(0)
  const [contentOffsetBottom, setContentOffsetBottom] = useState(0)
  const startPosition = useSharedValue(0)
  const [refreshing, setRefreshing] = useState(false)
  let {totalViewedImages, dataSize} = viewedStatusImagesStats
  const [extraData,setExtraData] = useState()

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    const refresh = async () => {  
      try {
        await getViewedStatusImages(state.validFilePath)
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
    <View style={{ overflow: 'hidden',
       marginHorizontal: 6.4,
       borderTopLeftRadius: 17,
       borderTopRightRadius: 17,
       backgroundColor: state.themeHue.primary,
    }}>
     
      <View style={{opacity: state.loadingStateImages ? 1 : 0, position: 'absolute', width: '100%'}}>
        <Loading/>
      </View>
      <View  style={{opacity: state.loadingStateImages ? 0 : 1}}>
        <GestureDetector  gesture={panGestureEvent}>
          <Animated.View style={[{width:'100%', height: "100%"}, animatedStyle]}>
            <IOMasonryFlashList
              data={viewedImagesArr}
              renderItem={({item, index})=> <ImageThumbnail key={item.filename} filename={item.filename} modificationTime={item.modificationTime} ratio={item.ratio} index ={index} imageSrc={item.URL}/>}
              extraData={viewedImagesArr.length}
              keyExtractor={(item) => item.filename}
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
              ListHeaderComponent={<ListHeader totalViewedContent={totalViewedImages} dataSize={dataSize} text='Total viewed images/data size' />}
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