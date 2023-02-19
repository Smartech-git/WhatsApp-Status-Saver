import { View} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import PagerView from 'react-native-pager-view';
import { useStateValue } from '../../StateProvider';

export let PagerViewRef;
export let contentIndexRef;

export default function Image_view({route}) {
    let contentIndex = route.params.index
   const [render, setRender] = useState(false);
   const [state, dispatch] =  useStateValue();
   const PagerRef = useRef()

   useEffect(() => {
        let ID;
        ID = setTimeout(() => {
            setRender(true)
        }, 50)
   }, [route.params.index])
  
    return (
        <View style={{
            flex: 1,
            backgroundColor: state.themeHue.primary

        }}>
            <View style={{ flex: 1}} >
                {
                    render && (
                        <PagerView ref={PagerRef} style={{flex: 1, opacity: 1}} 
                            initialPage={contentIndex}
                            offscreenPageLimit ={3}
                            overScrollMode='never'
                        >
                            
                            {
                                viewedImagesArr.map((item, index) => {
                                    
                                    return(
                                        <ImageComponent imageSrc={item.URL} key={index} imagePosition={
                                            index === 0 ? "firstImg"
                                                        : index === viewedImagesArr.length -1 ? "lastImg"
                                                        : "default"
                                            }
                                        />    
                                    )
                                })
                            }
                        </PagerView>  
                    )
                }
                
                {
                    render === false && (
                         <View style={{opacity: 1, zIndex: 2, height: '100%', width: '100%', position: 'absolute'}}>
                            <ImageComponent imageSrc={viewedImagesArr[contentIndex].URL} key={contentIndex} imagePosition={
                                contentIndex === 0 ? "firstImg"
                                            : contentIndex === viewedImagesArr.length -1 ? "lastImg"
                                            : "default"
                                }
                            />  
                        </View>
                    )
                }  
                 
            </View>
            <View style={{height: 100, width: '100%'}}>

            </View>
        </View>
    )
}