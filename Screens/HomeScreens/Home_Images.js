import { View, Text, FlatList, Image, ImageBackground} from 'react-native'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import { ImageArray } from '../../Utilities/GetViewedStatus';

let src = '../../Test/Images/image1.png'
const MediaCompnent = ({mediaSrc}) => {

  return (
    <View style={{width: 160, height: 180, margin: 5,
    }}>
      <Image style={{width: '100%', height: '100%', borderRadius: 15
      
    }}  source={(mediaSrc)}/>
    </View>
  )
}
export default function Home_Images() {
  const [state, dispatch] = useStateValue();

  const renderItem = ({item}) => (
    <MediaCompnent mediaSrc={item.image}/>
  )
  return (
    <FlatList
      data={ImageArray}
      renderItem={renderItem}
      // keyExtractor = {(item, index)=> index}
      numColumns = '2'
      contentContainerStyle = {{
        alignItems: 'center',
        paddingVertical: 5
      }}
      decelerationRate = 'normal'
      persistentScrollbar = {false}
      overScrollMode = 'never'
    />
  )
}