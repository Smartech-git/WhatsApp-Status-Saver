import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

export const FILE_PATH = [
   "file:///storage/emulated/0/WhatsApp/Media/.Statuses/",
   "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/",
]
  
export let viewedImagesArr = []
export let viewedVideosArr = []


let imageAlbum = [];
let videoAlbum = [];

export let viewedStatusImagesStats = {
    totalViewedImages : 0,
    dataSize: "0"
}

export let viewedStatusVideosStats = {
    totalViewedVideos : 0,
    dataSize: "0"
}



export const getViewedStatusVideos = async (validFilePath) => {
    let videoContentArr = [] 
    let optimizedAlbum = []
 
    let  newAlbum =  (await FileSystem.readDirectoryAsync(validFilePath)).filter(item => item.endsWith('mp4'));
    if(videoAlbum.length === 0){
        videoAlbum = newAlbum;
        optimizedAlbum = newAlbum
    }else {
       let result =  newAlbum.filter((item) => {
            if(videoAlbum.includes(item) === false){
                return item
            }
        })
        optimizedAlbum = result;
        videoAlbum.unshift(...result)
    }

    await Promise.all(optimizedAlbum.map(async (item) => {

        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)

            let h, w;

            let thumbnailProps = await VideoThumbnails.getThumbnailAsync(validFilePath + item, {time: 500, quality: 1})

            h = thumbnailProps.height;
            w = thumbnailProps.width;

            videoContentArr.unshift( 
                {
                    URL: thumbnailProps.uri,
                    videoURL: validFilePath + item,
                    modificationTime : metaData.modificationTime,
                    DataSize : metaData.size,
                    height: h,
                    width: w,
                    ratio: (h/w).toFixed(2)
                }
            )
    }))

    videoContentArr.sort((a, b) => b.modificationTime - a.modificationTime);
    viewedVideosArr.unshift(...videoContentArr)
    getViewedStatusStats(viewedVideosArr, "Videos");

}




export const getViewedStatusImages = async (validFilePath) => { 

   let imageContentArr = []
   let optimizedAlbum = []
   let  newAlbum =  (await FileSystem.readDirectoryAsync(validFilePath)).filter(item => item.endsWith('jpg'));

    if(imageAlbum.length === 0){
        imageAlbum = newAlbum;
        optimizedAlbum = newAlbum
    }else {
       let result =  newAlbum.filter((item) => {
            if(imageAlbum.includes(item) === false){
                return item
            }
        })
        optimizedAlbum = result;
        imageAlbum.unshift(...result)
    }

    await Promise.all(optimizedAlbum.map(async (item) => {

        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)

            let h, w;

            await Image.getSize(
                validFilePath + item,
                (width, height) =>{
                    w  = width;
                    h = height;
                }
            )

            imageContentArr.unshift( 
                {
                    URL: validFilePath + item,
                    modificationTime : metaData.modificationTime,
                    DataSize : metaData.size,
                    height: h,
                    width: w,
                    ratio: (h/w).toFixed(2)
                }
            )
    }))

    imageContentArr.sort((a, b) => b.modificationTime - a.modificationTime);
    viewedImagesArr.unshift(...imageContentArr)
    getViewedStatusStats(viewedImagesArr, "images")
} 


const getViewedStatusStats = (contentArr, statsObj) => {

    const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let totalViewedcontent = contentArr.length;

    const totalDataSize_byte = contentArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.DataSize,
        0,
      );
    let dataSize;
   
    let l = 0, n = (parseInt(totalDataSize_byte, 10)/1024) || 0;

    while(n >= 500  && ++l){
        n = n/1024;
    }
  
    dataSize = n.toFixed(n < 10 && l > 0 ? 1 : 0) + units[l];

    if(statsObj === "images"){
         viewedStatusImagesStats = {
            totalViewedImages : totalViewedcontent,
            dataSize: dataSize
            }

    }else {
        viewedStatusVideosStats = {
            totalViewedVideos : totalViewedcontent,
            dataSize: dataSize
            } 
    }

   
}
