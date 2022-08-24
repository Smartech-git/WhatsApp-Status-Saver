export const themeHueLight = {
    primary: '#FFFFFF',
    primary_dark: '#F3F5F7',
    secondary: '#1A3848',
    secondary_sub: '#D9D9D9',
}

export const themeHueDark = {
    primary: '#0D1F29',
    primary_dark: '#1A3848',
    secondary: '#F3F5F7',
    secondary_sub: '#000000'
}

export let initialState = {
    theme: 'LIGHT',
    themeHue: themeHueLight
 }
 
 export const actionTypes = {
    setTheme: "SETTHEME"
 }
 
 const reducer = (state, action) => {
     switch (action.type) {
         case actionTypes.setTheme:
             return {
                ...state,
                theme: action.theme,
                themeHue: action.theme === 'LIGHT' ? themeHueLight : themeHueDark
             };        
         default: 
             return state;
     }
 };
 
 export default reducer;