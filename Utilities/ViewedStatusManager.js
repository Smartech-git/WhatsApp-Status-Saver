import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'react-native';


const FILE_PATH = {
    WhatsApp : "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/",
    WhatsApp4B : ""
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
    //await FileSystem.makeDirectoryAsync(Dir + "helloworld/file", {intermediates: true})

    const album = await FileSystem.readDirectoryAsync(FILE_PATH.WhatsApp);
    
    for(let item of album) {
        let metaData = await FileSystem.getInfoAsync(FILE_PATH.WhatsApp + item)

        if(metaData.uri.endsWith('jpg')){

            if(checkForDuplicates(FILE_PATH.WhatsApp + item) === undefined){
                let h, w;

                await Image.getSize(
                    FILE_PATH.WhatsApp + item,
                    (width, height) =>{
                        w  = width;
                        h = height;
                    }
                )
                viewedImagesArr.push(
                    {
                        URL: FILE_PATH.WhatsApp + item,
                        modificationTime : metaData.modificationTime,
                        DataSize : metaData.size,
                        height: h,
                        width: w,
                        ratio: (h/w).toFixed(2)
                    }
                )
            }
        } else {

        }
    }

    viewedImagesArr.sort((a, b) => b.modificationTime - a.modificationTime);

    getViewedStatusImagesStats()
    
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