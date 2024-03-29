import { View, FlatList, StatusBar, Dimensions, Text, StyleSheet, TouchableOpacity, PixelRatio, Image, Pressable} from 'react-native'
import React, {useEffect, useState, useRef,useCallback} from 'react'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import { useStateValue } from '../../StateProvider';
import ContentViewHeader from '../../Components/ContentViewHeader';
import { InView, withIO } from 'react-native-intersection-observer'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import { setDisplayNavRef} from '../../Utilities/GestureHandler';
import { checkSavedContent, saveContent } from '../../Utilities/contentManger';
import { actionTypes } from '../../Reducer';
import { notifyRef } from '../../Components/LocalNotification';

const IOPagerView = withIO(FlatList);
const win = Dimensions.get('window').width

export default function Image_view({route}) {
   let contentIndex = route.params.index
   const [render, setRender] = useState(true);
   const [state, dispatch] =  useStateValue();
   const [contentProps, setContentProps] = useState({saved: false, url: undefined})
  

   useEffect(() =>{
   
    return(()=>{
        setDisplayNavRef(true)
    })
  }, [])

  const onViewableItemsChanged = useRef(async ({changed}) =>{
    const filename = changed[0].key
    const contentSaved = await checkSavedContent(filename);
    setContentProps({saved: contentSaved, url: changed[0].item.URL })

  })

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: win
  })

  const handleSave = useCallback(() => {
    if(contentProps.saved){
        return
      }
    setContentProps((prev) => {
        return {
            ...prev,
            saved: true
        }
    })
    saveContent(contentProps.url) 
    notifyRef("Image saved to your gallary")
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
                    renderItem={({item, index})=> <ImageComponent key={item.filename} index ={index} special={index == contentIndex ? true: undefined} imageSrc={item.URL} imagePosition={
                        index === 0 ? "firstImg"
                                    : index === viewedImagesArr.length -1 ? "lastImg"
                                    : "default"
                            }/>}
                    extraData={[viewedImagesArr.length]}
                    keyExtractor={(item) => item.filename}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig.current}               
                />  
            </View>
            <View style={{ width: '100%', marginVertical: 30}}>
                <View style={Styles.Footer}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Pressable onPress={handleSave}  hitSlop={10} android_ripple={{color: state.themeHue.primary_dark, radius: 28, borderless: true }} style={{ ...Styles.Botton,
                            backgroundColor: contentProps.saved ? '#00D426' : state.themeHue.primary_dark,
                        }}>
                            { contentProps.saved ? <Animated.Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../../assets/Icons/SavedIcon.png')}/>
                                           : state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../../assets/Icons/SaveIcon_light.png')} />
                                           : <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(12), height: PixelRatio.getPixelSizeForLayoutSize(12)}} source={require('../../assets/Icons/SaveIcon.png')} />
                            }  
                        
                        </Pressable>
                        <Text style={{fontSize: 14, fontWeight: '900', color: state.theme === 'LIGHT' ? '#000' : '#FFF'}}>{contentProps.saved? 'Saved' : 'Save'}</Text> 
                    </View>

                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Pressable android_ripple={{color: state.themeHue.primary_dark, radius: 28, borderless: true }}  style={{ ...Styles.Botton,
                            backgroundColor: state.themeHue.primary_dark,
                        }}>
                            {state.theme === 'LIGHT' ?  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../../assets/Icons/ShareIcon_light.png')} />
                                                    :  <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(10), height: PixelRatio.getPixelSizeForLayoutSize(10)}} source={require('../../assets/Icons/ShareIcon.png')} />

                            }
                        
                        </Pressable>
                        <Text style={{fontSize: 14, fontWeight: '900', color: state.theme === 'LIGHT' ? '#000' : '#FFF'}}>Share</Text> 
                    </View>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Footer: {
        width: '100%',
        paddingHorizontal: 70,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    Botton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})