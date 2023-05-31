import { View, Text, Dimensions, StatusBar, StyleSheet, Image, PixelRatio, Pressable} from 'react-native'
import React, {useState, useRef, useEffect, useImperativeHandle} from 'react'
import { ResizeMode, Video } from 'expo-av';
import { InView } from 'react-native-intersection-observer';
import ContentViewOptionsVideo from './ContentViewOptionsVideo';
import { handlTimeStamp } from '../Utilities/TimeStamp';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Progress from './Progress';
import { actionTypes } from '../Reducer';
import { useStateValue } from '../StateProvider';

const winH = Dimensions.get('window').height + StatusBar.currentHeight
const winW = Dimensions.get("window"). width
const resizeCondtion = 0.90 * winH

export const VideoComponent = React.forwardRef(({index, videoSrc, height, width, modificationTime, contentIndex, visible}, ref) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [state, dispatch] = useStateValue()
    const [inView, setInView] = useState()
    const [render, setRender] = useState(false)
    const [shouldHideCtrls, setShouldHideCtrls] = useState(true)
    const isFocused = useIsFocused()
    const scaleValue = useSharedValue(1)
    const fade = useSharedValue(1)
    
    useImperativeHandle(ref, () => ({
            play,
            stop,
            unload,
        })
    )
    useEffect(() => {
        if(visible && status.isLoaded && (contentIndex === index)){
            play()
        } else(
            stop()
        )
    }, [status.isLoaded])

    useEffect(() =>{
        if(!state.loadingStateVideosReel){
            return
        }
        if(status.isLoaded){
            let action = {
                type : actionTypes.setLoadingStateVideosReels,
                loadingStateVideosReel: false
              }
              dispatch(action);
        }
    }, [status.isLoaded])

    useEffect(() => {
        let ID = setTimeout(() => {
                setRender(true)
        }, 500);
        return(() => {
           clearTimeout(ID)
            unload()
        })
    }, [])

    
    useEffect(() => {
        let ID
        ID = setTimeout(() => {
            !shouldHideCtrls && setShouldHideCtrls(true)
        }, 2000)

        return(() => {
            clearTimeout(ID)
        })
    }, [shouldHideCtrls])

    const buttonStyle = useAnimatedStyle(()=> {
        return {
            transform: [{
                scale: scaleValue.value
            }]
        }
    })
    const fadeStyle = useAnimatedStyle(()=> {
        return {
            opacity : fade.value
        }
    })

    const handlePressIn = () =>{
        if(status.isPlaying){
            pause()
        }else {
            play()
        }
        scaleValue.value =  withTiming(0.8, {
            duration: 800,
            easing: Easing.elastic(3)
        })

    }

    const handlePressOut = () => {
        scaleValue.value =  withTiming(1, {
            duration: 800,
            easing: Easing.elastic(3)
          }, 
            handleControlDisplay()
          )  
    }

    const handleControlDisplay = () =>{
       setShouldHideCtrls(prev => !prev)
    }

    const play = async() => {
        if(video.current == null){
            return
        }
        const status = await video.current.getStatusAsync()
        if(status?.isPlaying){
            return
        }
        try{
             await video.current.playAsync()
        }catch(e){
            console.log(e)
        }
    }

    const pause = async() => {
        if(video.current == null){
            return
        }

        const status = await video.current.getStatusAsync()
        if(!status?.isPlaying){
            return
        }
        try{
            await video.current.pauseAsync()
        }catch(e){
            console.log(e)
        }
    }

    const stop = async() => {
        if(video.current == null){
            return
        }

        const status = await video.current.getStatusAsync()
        if(!status?.isPlaying){
            return
        }
        try{
            await video.current.stopAsync()
        }catch(e){
            console.log(e)
        }
    }

     const unload = async() => {
        if(video.current == null){
            return
        }
        try{
            await video.current.unloadAsync()
        }catch(e){
            console.log(e)
        }
    }

    const handleInView = (inView) => {
        setInView(inView)
      }


  return (
    <Pressable style={{height: winH, width: '100%'}} onPress={handleControlDisplay}>
        <InView triggerOnce={true} style={Styles.Content}  onChange={(inView) => handleInView(inView)}>
           {
            (inView) && (
                <Video
                    ref={video}
                    style={{
                            width: winW,
                            flex: 1,
                            height: height >= resizeCondtion ? winH : winW*(height/width),
                    }}
                    source={{
                    uri: videoSrc,
                    }}
                    useNativeControls = {false}
                    resizeMode={height >= resizeCondtion ? ResizeMode.COVER : ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    shouldPlay= {false}
                    progressUpdateIntervalMillis={500}
                />
                )
            }
            <View style={Styles.BottomContents}>
                    <View style={Styles.TimeStamp}>
                        <Image style={{width: PixelRatio.getPixelSizeForLayoutSize(8), height: PixelRatio.getPixelSizeForLayoutSize(8)}} source={require('../assets/Icons/viewedIcon.png')} />
                        <Text style={{color: '#FFF', marginLeft: 6, fontWeight: '600'}}>{handlTimeStamp(modificationTime)}</Text>
                    </View>
                    <Progress shouldHideCtrls={shouldHideCtrls} position={status.positionMillis} duration={status.durationMillis}/>
                    <View style={Styles.AdsContent}>

                    </View>
            </View>
            
             { !shouldHideCtrls && (
                <Animated.View style={[Styles.PlayButtonContainer,fadeStyle]}>
                    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
                        {
                            status.isPlaying ? (
                                <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(35), height: PixelRatio.getPixelSizeForLayoutSize(35)}, buttonStyle]} source={require('../assets/Icons/PauseButtonIcon.png')} />
                            ) : (
                                <Animated.Image style={[{width: PixelRatio.getPixelSizeForLayoutSize(35), height: PixelRatio.getPixelSizeForLayoutSize(35)}, buttonStyle]} source={require('../assets/Icons/PlayButtonIcon.png')} />
                            )
                        }

                    </Pressable>
                </Animated.View>
            )}
           
            <LinearGradient colors={['transparent', '#00000080', '#000000']} style={{
                width: '100%',
                height: "50%",
                position: 'absolute',
                bottom: 0,
                zIndex: 1
            }}>

            </LinearGradient>
        </InView>
        <ContentViewOptionsVideo/>
    </Pressable>
  )
})

const Styles = StyleSheet.create({
    Content: {
        width: '100%',
        backgroundColor: '#111111',
        height: winH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlayButtonContainer: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor:'#00000060',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: winH
    },
    TimeStamp: {
        height: 30,
        borderRadius: 50,
        backgroundColor: '#FFFFFF20',
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 10,
        marginBottom: 5
    },
    BottomContents: {
        position: 'absolute',
        bottom:'2%',
        zIndex: 3,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingHorizontal: 15    
    },

    AdsContent: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFFFFF20',
        borderRadius: 12,
        marginTop: 5
    },
    
})