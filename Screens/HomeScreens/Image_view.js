import { View, FlatList, StatusBar, Dimensions} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import ContentViewOptionsImage from '../../Components/ContentViewOptionsImage';
import { InView, withIO } from 'react-native-intersection-observer'
import { setDisplayNavRef, setShouldTabHideRef } from '../../Utilities/GestureHandler';
import * as NavigationBar from 'expo-navigation-bar';

const IOPagerView = withIO(FlatList);
const win = Dimensions.get('window').width

export default function Image_view({route}) {
    let contentIndex = route.params.index
   const [render, setRender] = useState(true);
   const [state, dispatch] =  useStateValue();

   useEffect(() =>{
    return(()=>{
        setDisplayNavRef(true)
    })
  }, [])
  
    return (
        <View style={{
            flex: 1,
            backgroundColor: state.themeHue.primary,
            marginTop: StatusBar.currentHeight
        }}>
            <ContentViewHeader special={false} screenType="Images"/>
            <View style={{ flex: 1}} >
                <IOPagerView
                    overScrollMode='never'
                    horizontal = {true}
                    initialScrollIndex = {contentIndex}
                    pagingEnabled = {true}
                    estimatedItemSize={win}
                    decelerationRate = 'fast'
                    persistentScrollbar = {false}
                    showsHorizontalScrollIndicator = {false}
                    getItemLayout={(data, index) => (
                        {length: win, offset: win * index, index}
                        )}
                    data={viewedImagesArr}
                    renderItem={({item, index})=> <ImageComponent index ={index} special={index == contentIndex ? true: undefined} imageSrc={item.URL} imagePosition={
                        index === 0 ? "firstImg"
                                    : index === viewedImagesArr.length -1 ? "lastImg"
                                    : "default"
                            }/>}
                    extraData={[viewedImagesArr.length]}
                    keyExtractor={(item) => item.URL}
                />  
            </View>
            <View style={{ width: '100%', marginVertical: 30}}>
                <ContentViewOptionsImage/>
            </View>
        </View>
    )
}