import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';


const FILE_PATH = {
    WhatsApp1: "file:///storage/emulated/0/WhatsApp/Media/.Statuses/",
     WhatsApp2: "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/",
}

export const VideosArray = [
    {
        image : require('../Test/Images/image2.jpg')
    },
    {
        image : require('../Test/Images/image3.jpg')
    },
    {
        image : require('../Test/Images/image4.jpg')
    },
    {
        image: require('../Test/Images/image5.jpg')
    },
    {
        image : require('../Test/Images/image6.jpg')
    },
    {
        image : require('../Test/Images/image7.png')
    },
    {
        image : require('../Test/Images/image8.jpg')
    },
    {
        image : require('../Test/Images/image1.png')
    },
    {
        image : require('../Test/Images/image2.jpg')
    },
    {
        image : require('../Test/Images/image3.jpg')
    },
   
];

export let viewedImagesArr = []


export let viewedStatusImagesStats = {
    totalViewedImages : 0,
    dataSize: "0"
}

const Dir  = FileSystem.documentDirectory;


export const getViewedStatusImages = async () => { 
    
    let filePathExist = false;
    let validFilePath;
    let repeatCount = 0;

    while(filePathExist === false && repeatCount < Object.keys(FILE_PATH).length){
        const info  = await FileSystem.getInfoAsync(Object.values(FILE_PATH)[repeatCount]);
        if(info.exists === true){
            validFilePath = Object.values(FILE_PATH)[repeatCount]
        }
        filePathExist = info.exists;
        repeatCount ++;
    }

    const album = await FileSystem.readDirectoryAsync(validFilePath);

    for(let item of album) {
        let metaData =  await FileSystem.getInfoAsync(validFilePath + item)

        if(metaData.uri.endsWith('jpg')){

            if(checkForDuplicates(validFilePath + item) === undefined){
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
            }
        } else {

        }
    }
    getViewedStatusImagesStats();

}

const getViewedStatusImagesStats = () => {

    const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let totalViewedImages = viewedImagesArr.length;

    const totalDataSize_byte = viewedImagesArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.DataSize,
        0,
      );
    let dataSize;
   
    let l = 0, n = (parseInt(totalDataSize_byte, 10)/1024) || 0;

    while(n >= 500  && ++l){
        n = n/1024;
    }
  
    dataSize = n.toFixed(n < 10 && l > 0 ? 1 : 0) + units[l];

    viewedStatusImagesStats = {
        totalViewedImages : totalViewedImages,
        dataSize: dataSize
    }

}

const checkForDuplicates = (item) => {

    for(let x of viewedImagesArr) {
        if(item === x.URL){
            return true
        }
    } 
}