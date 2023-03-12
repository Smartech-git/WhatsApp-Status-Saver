import AsyncStorage from '@react-native-async-storage/async-storage';

export const settingsType = {
  name: 'Status Saver',
  setThemeLight : { theme: 'LIGHT' },
  setThemeDark : { theme : 'DARK' },
  emojiId : "emojiId",
  validFilePath: "validFilePath"
}

export const initialSettings  = {
  name:'Status Saver',
  theme: 'LIGHT',
  emojiId: 0
}

export const getObjectSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(settingsType.name)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
    console.log('Done getting.')
  }

export const setObjectSettings = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(settingsType.name, jsonValue)
    } catch(e) {
        // save error
    }
    console.log('Done setting.')
}

export const mergeToObjectSettings = async (obj) => {
  try {

    await AsyncStorage.mergeItem(settingsType.name, JSON.stringify(obj))
    const settings = await AsyncStorage.getItem(settingsType.name)

    console.log(settings)
  } catch(e) {
    
  } finally {
    console.log('done merging')
  }
}

export const clearObjectSettings = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Clean up done')
}

export const getAllObjectKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }
  console.log(keys)
}