import {Pressable, Image, PixelRatio} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useStateValue } from '../StateProvider'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDecay, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { getObjectSettings, settingsType, mergeToObjectSettings} from '../APIs'

const EmojiArr = [
    { emoji : require('../assets/Images/EmojiPack/Emoji1.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji2.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji3.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji4.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji5.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji6.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji7.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji8.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji9.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji10.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji11.png') },
    { emoji : require('../assets/Images/EmojiPack/Emoji12.png') },
]

export default function EmojiProfile() {

    const [state, dispatch] = useStateValue()
    const [emojiIdx, setEmojiIdx] = useState(0)
    const scaleValue = useSharedValue(0.5)

    useEffect(() => {
        const prepare = async () => {
            const settings = await getObjectSettings()
            setEmojiIdx(settings.emojiId)
            scaleValue.value = withDelay(400, withTiming(1, {
                duration: 800,
                easing: Easing.elastic(3)
            })) 
        }
        prepare()
    }, [])

    const emojiAnimatedStyle = useAnimatedStyle(()=> {
        return {
            transform: [{
                scale: scaleValue.value
            }]
        }
    })

    const handlePressEvent = () =>{
        setEmojiIdx((prev) => {
            let ct = prev + 1
            if(ct < EmojiArr.length){
                mergeToObjectSettings({[settingsType.emojiId]: ct })
                return ct
            }
            mergeToObjectSettings({[settingsType.emojiId]: 0 })
            return 0
        })
        scaleValue.value =  withTiming(0.7, {
            duration: 800,
            easing: Easing.elastic(3)
        })


    }

    const handleBounceEffect = () => {
        scaleValue.value =  withTiming(1, {
            duration: 800,
            easing: Easing.elastic(3)
          })
    }

  return (
    <Pressable onPressOut={handleBounceEffect} onPressIn={handlePressEvent} style={{
        backgroundColor: state.themeHue.primary_dark,
        width: 34,
        height: 34,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Animated.Image style={[
            {
                width: PixelRatio.getPixelSizeForLayoutSize(13),
                height: PixelRatio.getPixelSizeForLayoutSize(13)
            },
            emojiAnimatedStyle
        ]} source={EmojiArr[emojiIdx].emoji}/>
    </Pressable>
  )
}