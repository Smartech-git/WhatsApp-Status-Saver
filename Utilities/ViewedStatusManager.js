import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';
import { getObjectSettings } from '../APIs';

export let viewedImagesArr = []
export let viewedVideosArr = []

export let viewedStatusImagesStats = {
    totalViewedImages : 0,
    dataSize: "0"
}

export let viewedStatusVideosStats = {
    totalViewedVideos : 0,
    dataSize: "0"
}

let album = [];
let validFilePath = false


export const getViewedStatusVideos = async () => {

    if(validFilePath === false){
        let settings = await getObjectSettings()
        validFilePath = settings.validFilePath
    }


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

export const getViewedStatusImages = async () => { 
    if(validFilePath === false){
        let settings = await getObjectSettings()
        validFilePath = settings.validFilePath
    }

    if(album.length === 0){
        album = await FileSystem.readDirectoryAsync(validFilePath);
    }

    let x = 0;

    for(let item of album) {

        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)
    
        if(metaData.uri.endsWith('jpg')){

            if(checkForDuplicates(validFilePath + item, viewedImagesArr) === undefined){
                let h, w;

                await Image.getSize(
                    validFilePath + item,
                    (width, height) =>{
                        w  = width;
                        h = height;
                    }
                )

                viewedImagesArr.push( 
                    {
                        URL: validFilePath + item,
                        modificationTime : metaData.modificationTime,
                        DataSize : metaData.size,
                        height: h,
                        width: w,
                        ratio: (h/w).toFixed(2)
                    }
                )
                viewedImagesArr.sort((a, b) => b.modificationTime - a.modificationTime);
                getViewedStatusImagesStats(viewedImagesArr, "images");
            }
        }
    }

}

const getViewedStatusImagesStats = (contentArr, statsObj) => {

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

const checkForDuplicates = (item, contentArr) => {

    for(let x of contentArr) {
        if(item === x.URL){
            return true
        }
    } 
}