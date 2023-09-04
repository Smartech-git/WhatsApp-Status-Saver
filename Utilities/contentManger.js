import * as MediaLibrary from 'expo-media-library';
import { viewedStatusImagesStats, viewedStatusVideosStats } from './ViewedStatusManager';


const maxAssetLength = viewedStatusImagesStats.totalViewedImages + viewedStatusVideosStats.totalViewedVideos
const folder = 'Virpar'

export const saveContent = async (content) => {
    try {
        const asset = await MediaLibrary.createAssetAsync(content);
        const album = await MediaLibrary.getAlbumAsync(folder);
        if (album == null) {
          await MediaLibrary.createAlbumAsync(folder, asset, false);
          console.log("sucessfully saved")
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          console.log("sucessfully saved")
        }
      } catch (e) {
        console.log(e)
      }
}

export const checkSavedContent = async (content) => {
    
    const album = await MediaLibrary.getAlbumAsync(folder);
    const { assets } = await MediaLibrary.getAssetsAsync({album: album, mediaType: ['photo', 'video'], sortBy: "modificationTime", first: maxAssetLength})
    let fileNames = assets.map(item => item.filename)
    return fileNames.includes(content)
    
}