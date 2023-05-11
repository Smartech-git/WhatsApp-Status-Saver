import { View, FlatList, Dimensions, StatusBar, ScrollView} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import {viewedVideosArr } from '../../Utilities/ViewedStatusManager';
import {VideoComponent} from '../../Components/VideoComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { LinearGradient } from 'expo-linear-gradient'
import { withIO } from 'react-native-intersection-observer'
import { FlashList } from '@shopify/flash-list';


const IOPagerView = withIO(FlashList);
const winH = Dimensions.get('window').height + StatusBar.currentHeight


export default function Video_view({route}) {
  const [visible, setIsVisible] = useState(false)
  const [sliderVisible, setSliderVisible] = useState(true)
  let contentIndex = route.params.index
  
  const visibilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
  })
  const mediaRefs = useRef([])

  const handleOnviewableItemsChanged = useRef(({changed}) => {
    changed.forEach(element => {
      const cell = mediaRefs.current[element.key]
      if(cell){
        if(element.isViewable){
          cell.play()
          setIsVisible(true)
        }else{
          cell.stop()
          setIsVisible(false)
        }
      }
    });
    
  })


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000'
  }}>
      <LinearGradient
       colors={['#00000050', 'transparent']}
       style={{
        position: 'absolute',
        zIndex: 3,
        marginTop: StatusBar.currentHeight,
        width: '100%'
      }}>
        <ContentViewHeader special={true} screenType="Videos"/>
      </LinearGradient>
      <View style={{ flex: 1}} >
        <IOPagerView
          overScrollMode='never'
          horizontal = {false}
          initialScrollIndex = {contentIndex}
          pagingEnabled = {true}
          estimatedItemSize={winH}
          decelerationRate = 'normal'
          persistentScrollbar = {false}
          showsHorizontalScrollIndicator = {false}
          getItemLayout={(data, index) => (
              {length: winH, offset: winH * index, index}
            )}
          data={viewedVideosArr}
          renderItem={({item, index})=> <VideoComponent visible={visible} ref={videoRefs => (mediaRefs.current[index] = videoRefs)} modificationTime={item.modificationTime} height={item.height} width={item.width} contentIndex={contentIndex} index ={index} videoSrc={item.videoURL} />}
          extraData={[viewedVideosArr.length]}
          viewabilityConfig={visibilityConfig.current}
          onViewableItemsChanged ={handleOnviewableItemsChanged.current}
          // removeClippedSubviews={true} 
        />      
      </View>
    </View>
  )
}