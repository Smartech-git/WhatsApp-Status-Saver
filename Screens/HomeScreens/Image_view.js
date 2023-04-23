import { View, FlatList, StatusBar, Dimensions} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import ContentViewFooter from '../../Components/ContentViewFooter';
import { InView, withIO } from 'react-native-intersection-observer'

const IOPagerView = withIO(FlatList);
const win = Dimensions.get('window').width

export default function Image_view({route}) {
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
            backgroundColor: state.themeHue.primary,
            marginTop: StatusBar.currentHeight
        }}>
            <ContentViewHeader screenType="images"/>
            <View style={{ flex: 1}} >
                {
                    render && (
                        <IOPagerView
                            overScrollMode='never'
                            horizontal = {true}
                            initialScrollIndex = {contentIndex}
                            pagingEnabled = {true}
                            estimatedItemSize={win}
                            decelerationRate = 'normal'
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
                    )
                }
                
                {
                    render === false && ( 
                         <View style={{opacity: 1, zIndex: 2, height: '100%', width: '100%', position: 'absolute'}}>
                            <ImageComponent special={true} imageSrc={viewedImagesArr[contentIndex].URL} key={contentIndex} imagePosition={
                                contentIndex === 0 ? "firstImg"
                                            : contentIndex === viewedImagesArr.length -1 ? "lastImg"
                                            : "default"
                                }
                            />  
                        </View>
                     )
                }  
                 
            </View>
            <View style={{ width: '100%', marginVertical: 30}}>
                <ContentViewFooter/>
            </View>
        </View>
    )
}