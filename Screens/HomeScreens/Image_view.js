import { View,  Dimensions} from 'react-native'
import React, {useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { viewedImagesArr } from '../../Utilities/ViewedStatusManager';
import ImageComponent from '../../Components/ImageComponent';
import PagerView from 'react-native-pager-view';

const width = Dimensions.get('window').width-20
const offset = Dimensions.get('window').width;

export default function Image_view({route}) {
    const [state, dispatch] = useStateValue();

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{marginVertical: 20, flex: 1}} >
                <PagerView style={{flex: 1}} 
                    initialPage={route.params.index}
                    offscreenPageLimit ={3}
                    overScrollMode='never'
                >
                    {
                        viewedImagesArr.map((item, index) => {
                            return (
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
            </View>
            <View style={{height: 100, width: '100%'}}>

            </View>
        </View>
    )
}