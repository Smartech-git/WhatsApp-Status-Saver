export const themeHueLight = {
    primary: '#FAFAFA',
    primary_dark: '#E9ECEF',
    primary_veryDark: '#F2F2F2',
    borderColor: '#D9D9D9',
    secondary: '#00D426'
}

export const themeHueDark = {
    primary: '#111B21',
    primary_dark: '#1A3848',
    primary_veryDark: '#0A1014',
    borderColor: '#0A1014',
    secondary: '#00D426'
}

export let initialState = {
    theme: 'LIGHT',
    themeHue: themeHueLight,
    permissionState: false,
    fontFamily : 'Lobster-Regular',
    loadingStateImages: true,
    loadingStateVideos: true,
    loadingStateVideosReel: true,
    validFilePath: '',
    autoSave: false,
    themeModeCustom: true,
    deviceColorScheme: undefined
 }
 
 export const actionTypes = {
    setMutipleStates: 'SETMULTIPLESTATES',
    setTheme: "SETTHEME",
    setPermissionState: 'SETPERMISSIONSTATE',
    setLoadingStateImages: "SETLOADING_IMAGES",
    setLoadingStateVideos: "SETLOADING_VIDEOS",
    setValidFilePath: 'SETVALIDFILEPATH',
    setAutoSave: 'SETAUTOSAVE',
    setThemeModeCustom : 'SETTHEMEMODECUSTOM',
    setDeviceColorScheme:  'SETDEVICECOLORSCHEME',
    setLoadingStateVideosReels: 'SETLOADINGSTATEVIDEOSREELS'
 }
 
 const reducer = (state, action) => {
     switch (action.type) {
        case actionTypes.setMutipleStates:
            return {
            ...state,
            ...action.multipleStates
            }
            // ....
         case actionTypes.setTheme:
            return {
            ...state,
            theme: action.theme,
            themeHue: action.theme === 'LIGHT' ? themeHueLight : themeHueDark
            }
        case actionTypes.setPermissionState:
            return {
                ...state,
                permissionState: action.permissionState
            }
        case actionTypes.setLoadingStateImages:
            return {
                ...state,
                loadingStateImages: action.loadingStateImages
            }
        case actionTypes.setLoadingStateVideos:
            return {
                ...state,
                loadingStateVideos: action.loadingStateVideos
            }
        case actionTypes.setValidFilePath:
            return {
                ...state,
                validFilePath: action.validFilePath
            }
        case actionTypes.setAutoSave:
            return {
                ...state,
                autoSave : action.autoSave
            }
        case actionTypes.setThemeModeCustom:
            return {
                ...state,
                themeModeCustom : action.themeModeCustom
            }
        case actionTypes.setLoadingStateVideosReels:
            return {
                ...state,
                loadingStateVideosReel : action.loadingStateVideosReel
            }
         default: 
            return state;
     }
 };
 
 export default reducer;