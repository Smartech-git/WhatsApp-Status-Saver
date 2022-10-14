import * as FileSystem from 'expo-file-system';

const FILE_PATH = {
    WhatsApp : "file:///storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/",
    WhatsApp4B : ""
}

const regEx = /(jpg|png)$/g;

export const ImageArray = [
    // {
    //     image : require(FILE_PATH.WhatsApp + '12f431eb564a43d1b2bd5716440652c3.jpg')
    // },
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

export let viewedStatusImagesArr = []

export const getViewedStatusImages = async () => {

    const Dir  = FileSystem.documentDirectory;
    const album = await FileSystem.readDirectoryAsync(FILE_PATH.WhatsApp)
    const fileInfo = await FileSystem.getInfoAsync(FILE_PATH.WhatsApp)

    album.forEach(item => {
        if(item.endsWith('jpg')){
            viewedStatusImagesArr.push(
                {
                    URL: FILE_PATH.WhatsApp + item
                }
            )
        } else {
        }
    });
}