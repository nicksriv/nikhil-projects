import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { SNACKBAR_CLEAR } from 'app/redux/slices/snackbar';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    // snackBar: {
    //     marginLeft: "10px"
    // }
}))

// success
const SuccessSnackbar = () => {
    const dispatch = useDispatch();
    const classes  = useStyles();
    const { successSnackbarMessage, successSnackbarOpen } = useSelector(
        (state) => state.SnackbarReducer
    );
    
    function handleClose() {
        dispatch({ type: SNACKBAR_CLEAR.type });
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={successSnackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            aria-describedby='client-snackbar'
            className={classes.snackBar}
                >
            <SnackbarContent
                // style={{
                //     backgroundColor: '#00AB55',
                // }}
                message={
                <span
                    id='client-snackbar'
                    style={{ verticalAlign: 'middle', display: 'inline-flex' }}
                >
                    <span>
                        <CheckCircleOutlineIcon />
                    </span>
                    <span style={{ marginLeft: 15 }}>{successSnackbarMessage}</span>
                </span>
                }
                action={[
                    <IconButton
                        key='close'
                        aria-label='close'
                        color='inherit'
                        onClick={handleClose}
                        className='pb-5'
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

//Error

const  ErrorSnackbar = () => {
    const dispatch = useDispatch();
    const classes  = useStyles();
    const { errorSnackbarMessage, errorSnackbarOpen } = useSelector(
        (state) => state.SnackbarReducer
    );
    
    function handleClose() {
        dispatch({ type: SNACKBAR_CLEAR.type });
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={errorSnackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            aria-describedby='client-snackbar'
            className={classes.snackBar}
            >
            <SnackbarContent
                style={{
                backgroundColor: '#D3302F'
                }}
                message={
                <span
                    id='client-snackbar'
                    style={{ verticalAlign: 'middle', display: 'inline-flex' }}
                >
                    <span>
                        <WarningIcon color="#FFFFFF"/>
                    </span>
                    <span style={{ marginLeft: 15 }}>{errorSnackbarMessage}</span>
                </span>
                }
                action={[
                    <IconButton
                        key='close'
                        aria-label='close'
                        color='inherit'
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}


export  {SuccessSnackbar, ErrorSnackbar};