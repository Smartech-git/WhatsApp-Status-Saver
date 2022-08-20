const themeHueLight = {
    primary: '#FFFFFF',
    primary_dark: '#F3F5F7',
    secondary: '#1A3848',
    secondary_sub: '#D9D9D9',
}

const themeHueDark = {
    primary: '#0D1F29',
    primary_dark: '#1A3848',
    secondary: '#F3F5F7',
    secondary_sub: '#000000'
}

export const initialState = {
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
                themeHue: state.theme === 'LIGHT' ? themeHueDark : themeHueLight
             };        
         default: 
             return state;
     }
 };
 
 export default reducer;