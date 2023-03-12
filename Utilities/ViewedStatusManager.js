import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';

export const FILE_PATH = [
   "file:///storage/emulated/0/WhatsApp/Media/.Statuses/",
   "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/",
]
  
export let viewedImagesArr = []
export let viewedVideosArr = []
let album = [];


export let viewedStatusImagesStats = {
    totalViewedImages : 0,
    dataSize: "0"
}

export let viewedStatusVideosStats = {
    totalViewedVideos : 0,
    dataSize: "0"
}



export const getViewedStatusVideos = async (validFilePath) => {

    if(album.length === 0){
        album = await FileSystem.readDirectoryAsync(validFilePath);
    }
    console.log(validFilePath)

    for(let item of album) {
        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)

        if(metaData.uri.endsWith('mp4')){

            if(checkForDuplicates(validFilePath + item, viewedVideosArr) === undefined){
                
                viewedVideosArr.push( 
                    {
                        URL: validFilePath + item,
                        modificationTime : metaData.modificationTime,
                        DataSize : metaData.size,
                        // height: h,
                        // width: w,
                        // ratio: (h/w).toFixed(2)
                    }
                )
                viewedVideosArr.sort((a, b) => b.modificationTime - a.modificationTime);
                getViewedStatusImagesStats(viewedVideosArr, "Videos");
            }
        }
    }

}

export const getViewedStatusImages = async (validFilePath) => { 

   let imageContentArr = []
   let videoContentArr = []

   let  newAlbum = await FileSystem.readDirectoryAsync(validFilePath);
   let optimizedAlbum = []

    if(album.length === 0){
        album = newAlbum;
        optimizedAlbum = newAlbum
    }else {
       let result =  newAlbum.filter((item) => {
            if(album.includes(item) === false){
                return item
            }
        })
        optimizedAlbum = result;
        album.unshift(...result)
    }

    await Promise.all(optimizedAlbum.map(async (item) => {

        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)
    
        if(metaData.uri.endsWith('jpg')){

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
            
        } else if (metaData.uri.endsWith('mp4')){
            videoContentArr.push( 
                {
                    URL: validFilePath + item,
                    modificationTime : metaData.modificationTime,
                    DataSize : metaData.size,
                    // height: h,
                    // width: w,
                    // ratio: (h/w).toFixed(2)
                }
            )
        }
    }))

    imageContentArr.sort((a, b) => b.modificationTime - a.modificationTime);
    viewedVideosArr.sort((a, b) => b.modificationTime - a.modificationTime);

    viewedVideosArr.unshift(...videoContentArr)
    viewedImagesArr.unshift(...imageContentArr)

    getViewedStatusStats(viewedImagesArr, "images");
    getViewedStatusStats(viewedVideosArr, "Videos");

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
