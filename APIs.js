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
  }

export const setObjectSettings = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(settingsType.name, jsonValue)
    } catch(e) {
        // save error
    }
}

export const mergeToObjectSettings = async (obj) => {
  try {

    await AsyncStorage.mergeItem(settingsType.name, JSON.stringify(obj))
    const settings = await AsyncStorage.getItem(settingsType.name)
  } catch(e) {
    
  } finally {
  }
}

export const clearObjectSettings = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
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