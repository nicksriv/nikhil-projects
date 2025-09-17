import { createSlice } from '@reduxjs/toolkit';
var initialState = {

    primaryColors: [{
        name: "RED",
        value: "#B00020"
    }, {
        name: "BLUE",
        value: "#2C3E93"
        },
        {
        name: "GREY",
        value: "#808080"
    }, {
        name: "SEA GREEN",
        value: "#50BEB6"
    }],
    menuColors: [{
        name: "PEACH",
        BtnColorValue: "#F9AD5E",
        themeValue: "#F4EBE1"

    }, {
        name: "LIGHT BLUE",
        BtnColorValue: "#20DECC",
        themeValue: "#20DECC"

    }, {
        name: "WHITE",
        BtnColorValue: "grey",
        themeValue: "#fff"

    }, {
        name: "DARK GREY",
        BtnColorValue: "grey",
        themeValue: "#808080"

    },],
    textStyles: [{
        name: "SF PRO",
        value: "#50BEB6",
        fontValue: "SF Pro Display"
    }, {
        name: "ROBOTO",
        value: "#50BEB6",
        fontValue: "Roboto"
    }, {
        name: "MONTSERRAT",
        value: "#50BEB6",
        fontValue: "Montserrat"
    }, {
        name: "POPPINS",
        value: "#50BEB6",
        fontValue: "Poppins"
    }, {
        name: "HELVETICA NEUE",
            value: "#50BEB6",
            fontValue: "Helvetica Neue"
        }],
    selectedPrimaryColor: "",
    selectedMenuColor: "",
    selectedFontStyle: ""
}

const themeInfoSlice = createSlice({
    name: 'themeInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            const { primaryColor, menuColor, font } = action.payload;
            state.selectedPrimaryColor = primaryColor;
            state.selectedMenuColor = menuColor;
            state.selectedFontStyle = font;
        },
        setScreenPrimaryColor(state, action) {
            const { payload } = (action.payload);
            state.selectedPrimaryColor = payload;
        },
        setScreenMenuColor(state, action) {
            const { payload } = (action.payload);
            state.selectedMenuColor = payload;
        },
        setScreenFontStyle(state, action) {
            const { payload } = (action.payload);
            state.selectedFontStyle = payload;
        },
        setDefaultStyles(state, action) {
            const { primaryColor, menuColor, font } = action.payload;
            state.selectedPrimaryColor = primaryColor;
            state.selectedMenuColor = menuColor;
            state.selectedFontStyle = font;
        }
    },
});

export default themeInfoSlice.reducer;

// Actions
export const {
    setInitialState,
    setScreenPrimaryColor,
    setScreenMenuColor,
    setScreenFontStyle,
    setDefaultStyles
} = themeInfoSlice.actions;
