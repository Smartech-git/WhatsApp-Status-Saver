import { View, FlatList, ScrollView, Dimensions, StatusBar, ScrollViewComponent} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import {viewedVideosArr } from '../../Utilities/ViewedStatusManager';
import VideoComponent from '../../Components/VideoComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { LinearGradient } from 'expo-linear-gradient'
import { InView, withIO, IOScrollView } from 'react-native-intersection-observer'
import { useIsFocused } from '@react-navigation/native';
import ContentViewOptionsVideo from '../../Components/ContentViewOptionsVideo.js';

const IOPagerView = withIO(FlatList);
const winH = Dimensions.get('window').height + StatusBar.currentHeight


export default function Video_view({route}) {
  let contentIndex = route.params.index
  const [render, setRender] = useState(true);
  const [state, dispatch] =  useStateValue();

  useEffect(() => {
       let ID;
       ID = setTimeout(() => {
           setRender(true)
       }, 50)
  }, [route.params.index])

  return (
    <View style={{
      flex: 1,
  }}>
      <LinearGradient
         colors={['#00000070', 'transparent']}
       style={{
        position: 'absolute',
        zIndex: 3,
        marginTop: StatusBar.currentHeight,
        width: '100%'
      }}>
        <ContentViewHeader special={true} screenType="Videos"/>
      </LinearGradient>
      <View style={{ flex: 1}} >
          {
              render && (
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
                      renderItem={({item, index})=> <VideoComponent height={item.height} width={item.width} index ={index} special={index == contentIndex ? true: undefined} videoSrc={item.videoURL} imagePosition={
                          index === 0 ? "firstImg"
                                      : index === viewedVideosArr.length -1 ? "lastImg"
                                      : "default"
                              }/>}
                      extraData={[viewedVideosArr.length]}
                      keyExtractor={(item) => item.URL}
                  />
                  // <IOPagerView
                  //     overScrollMode='never'
                  //     horizontal = {false}
                  //     //initialScrollIndex = {contentIndex}
                  //     pagingEnabled = {true}
                  //     decelerationRate = 'normal'
                  //     persistentScrollbar = {false}
                  //     showsHorizontalScrollIndicator = {false}
                  // >
                  //   {
                  //     viewedVideosArr.map((item, index) => {
                  //       return(
                  //         <VideoComponent key={index} index={index} special={index == contentIndex ? true: undefined} videoSrc={item.videoURL} imagePosition={
                  //                   index === 0 ? "firstImg"
                  //                               : index === viewedVideosArr.length -1 ? "lastImg"
                  //                               : "default"
                  //                       }/>
                  //       )
                  //     })
                  //   }
                  // </IOPagerView>
              )
          }
          
          {/* { 
            render === false && (
                  <View style={{opacity: 1, zIndex: 2, height: '100%', width: '100%', position: 'absolute'}}>
                    <VideoComponent special={true} videoSrc={viewedVideosArr[contentIndex].videoURL} key={contentIndex} videoPosition={
                        contentIndex === 0 ? "firstImg"
                                    : contentIndex === viewedVideosArr.length -1 ? "lastImg"
                                    : "default"
                        }
                    />  
                </View>
              )
          }   */}
        
      </View>
    </View>
  )
}