import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import V5GlobalCssVars from './V5GlobalCssVars';
//import useSettings from 'app/hooks/useSettings';

// import cssVars from "css-vars-ponyfill";

const V5GlobalTheme = ({ children }) => {
   // const { settings } = useSettings()
   // let activeTheme = { ...settings.themes[settings.activeTheme] }
    //..ADD THEME
    const custom = createTheme({
        palette: {
            primary: {
                main: "#2C3E93"
            }
        },
        typography: {
            fontFamily: [
                'SF Pro Display',
                'sans-serif',
            ].join(','),
        }
    });
    // cssVars();
    // activeTheme.direction = settings.direction;
    return (
        <ThemeProvider theme={custom}>
            <CssBaseline />
            <V5GlobalCssVars> {children} </V5GlobalCssVars>
        </ThemeProvider>
    )
}

export default V5GlobalTheme
