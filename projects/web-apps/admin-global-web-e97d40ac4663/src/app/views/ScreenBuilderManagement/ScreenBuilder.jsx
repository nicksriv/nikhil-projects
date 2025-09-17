import React, { 
    //Fragment, useState
 } from 'react';
// import { useDispatch,  } from 'react-redux';
//import { Grid, Button } from '@material-ui/core';
//import { makeStyles,ThemeProvider, createTheme }from '@material-ui/core/styles';
import FormBuilder from './components/FormBuilder';
//import { V5FormBuilderDemoBar } from 'v5gl-form-builder';
//import FormHeadingPopup from './components/FormHeadingPopup';
// import { setInitialState } from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice';

// //..ADD THEME
// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// });
//..ADD STYLES
//const useStyles = makeStyles((theme, custom) => ({}))

const ScreenBuilder = () => {
  //  const classes = useStyles()
    // const dispatch = useDispatch()

    // const {

    // } = useSelector((state) => state.screenbuilder);

    //....LOCAL STATES

    //....LOCAL VARIABLE

    //..HANDLERS
    // const handleBack = (e) => {
    //     history.push('/screen-builder');
    // }
    // useEffect(() => {
    //     dispatch({ type: setInitialState.type });

    // }, [dispatch]);
    return (
        // <Fragment>
            // <ThemeProvider theme={custom} >
                <FormBuilder/>
            // </ThemeProvider>
        // </Fragment>
    )
}

export default ScreenBuilder;