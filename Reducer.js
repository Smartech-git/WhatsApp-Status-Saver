export const themeHueLight = {
    primary: '#FFFFFF',
    primary_dark: '#E9ECEF',
    primary_veryDark: '#E9ECEF95',
    secondary: '#1A3848',
    secondary_sub: '#D9D9D9',
}

export const themeHueDark = {
    primary: '#111B21',
    primary_dark: '#1A3848',
    primary_veryDark: '#0A1014',
    secondary: '#F3F5F7',
    secondary_sub: '#000000'
}

export let initialState = {
    theme: 'LIGHT',
    themeHue: themeHueLight,
    permissionState: false,
    fontFamily : 'Lobster-Regular',
    loadingState: true
 }
 
 export const actionTypes = {
    setTheme: "SETTHEME",
    setPermissionState: 'SETPERMISSIONSTATE',
    setLoadingState: "SETLOADING"
 }
 
 const reducer = (state, action) => {
     switch (action.type) {
         case actionTypes.setTheme:
            return {
            ...state,
            theme: action.theme,
            themeHue: action.theme === 'LIGHT' ? themeHueLight : themeHueDark
            };
        case actionTypes.setPermissionState:
            return {
                ...state,
                permissionState: action.permissionState
            }
        case actionTypes.setLoadingState:
            return {
                ...state,
                loadingState: action.loadingState
            }
         default: 
             return state;
     }
 };
 
 export default reducer;