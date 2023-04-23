import { View, FlatList, ScrollView, Dimensions, StatusBar} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import {viewedVideosArr } from '../../Utilities/ViewedStatusManager';
import VideoComponent from '../../Components/VideoComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewFooter from '../../Components/ContentViewFooter';
import { InView, withIO } from 'react-native-intersection-observer'

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
                      renderItem={({item, index})=> <VideoComponent index ={index} special={index == contentIndex ? true: undefined} VidoeSrc={item.URL} imagePosition={
                          index === 0 ? "firstImg"
                                      : index === viewedVideosArr.length -1 ? "lastImg"
                                      : "default"
                              }/>}
                      extraData={[viewedVideosArr.length]}
                      keyExtractor={(item) => item.URL}
                  />
              )
          }
          
          {/* {
              render === false && ( 
                   <View style={{opacity: 1, zIndex: 2, height: '100%', width: '100%', position: 'absolute'}}>
                      <VideoComponent special={true} imageSrc={viewedVideosArr[contentIndex].URL} key={contentIndex} imagePosition={
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