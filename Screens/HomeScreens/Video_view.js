import { View, Dimensions, StatusBar, StyleSheet, Image, Text} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import {viewedVideosArr } from '../../Utilities/ViewedStatusManager';
import {VideoComponent} from '../../Components/VideoComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { LinearGradient } from 'expo-linear-gradient'
import { withIO } from 'react-native-intersection-observer'
import { FlashList } from '@shopify/flash-list';
import { setDisplayNavRef } from '../../Utilities/GestureHandler';


const IOPagerView = withIO(FlashList);
const winH = Dimensions.get('window').height + StatusBar.currentHeight


export default function Video_view({route}) {
  const [visible, setIsVisible] = useState(false)
  const [sliderVisible, setSliderVisible] = useState(true)
  const [state, dispatch] = useStateValue()
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
  useEffect(() => {
    return(()=>{
      setDisplayNavRef(true)
    })
  }, [])


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000'
  }}>
      <LinearGradient
       colors={['#00000080', 'transparent']}
       style={{
        position: 'absolute',
        zIndex: 3,
        marginTop: StatusBar.currentHeight,
        width: '100%'
      }}>
        <ContentViewHeader special={true} screenType="Videos"/>
      </LinearGradient>
        <View style={{...styles.loadingView, opacity: state.loadingStateVideosReel ? 1: 0,}}>
          <View style={{
            width: 200,
            height: 200,
            backgroundColor: '#111B21',
            borderRadius: 20,
            justifyContent:'center',
            alignItems:'center',
          }}>
            <Image style= {{ width: 60, height: 60 }} source={require('../../assets/GIFs/Loading.gif')}/>
            <Text style={{color: '#FFF', fontSize: 16, textAlign: 'center', width: '80%', marginTop: 20}}>Making the layout best for you..</Text>
          </View>
        </View>
      <View style={{ flex: 1, opacity: state.loadingStateVideosReel ? 0: 1}} >
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

const styles =  StyleSheet.create({
  loadingView: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
}
})