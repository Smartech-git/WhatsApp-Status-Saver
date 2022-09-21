import AsyncStorage from '@react-native-async-storage/async-storage';

export const settingsType = {
  name: 'Settings',
  setThemeLight : { theme: 'LIGHT' },
  setThemeDark : { theme : 'DARK' }
}

export const initialSettings  = {
  name:'Status Saver',
  theme: 'LIGHT'
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
    const currentUser = await AsyncStorage.getItem(settingsType.name)

    console.log(currentUser)
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