import { Button, Dialog, DialogActions, DialogTitle, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    solidBtn: {
        backgroundColor: "#2A4FBC",
        color: "white",
        height: "2rem"
    },
    solidBtnDisabled: {
        backgroundColor: "#E0E1E1 !important",
        color: "gray !important",
        height: "2rem"
    },
    outlinedBtn: {
        height: "2rem",
        marginLeft: "10px",
        color:"#fff"
    }
}));

function V5GlobalFooterButtons({
    outlinedButtonText,
    solidButtonText,
    selectedClientId,
    handleDrawerToggle,
    panelOpen,
    selectedClientLogoId,
    isDisabled,
    saveData,
    handleCancel,
    hasLeftSideBtn,
    LeftButtonText,
    handleLeftBtnClick,
    reset,
    resetValue,
    handleClose,
    handleCloseButton
}) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);


    useEffect(() => {
        setOpen(panelOpen);
    }, [panelOpen]);
    return (
        <>
        <Grid className='flex justify-between'>
            {hasLeftSideBtn ?
            <Grid className={classes.outlinedBtn}>
                <Button variant="outlined" className={` border-primary color-primary ${classes.outlinedBtn}`} 
                //onClick={handleLeftBtnClick}
                onClick={resetValue}
                >{LeftButtonText}</Button>
            </Grid>
            :<Grid></Grid>
            }
            <div className="float-right mr-5">
            <Button
                style={{ fontColor: "#fff" }}
                variant="outlined"
                onClick={handleCancel}
                className={`mr-3 border-primary color-primary ${classes.outlinedBtn}`}
            >
                {outlinedButtonText}
            </Button>
            <Button
                variant="contained"
                onClick={saveData}
                className={`${classes.solidBtn} ${
                isDisabled && classes.solidBtnDisabled
                } bg-primary  font-medium`}
                disabled={isDisabled}
                color="success"
            >
                {solidButtonText}
            </Button>
                    </div>
        </Grid>
        <Dialog open={reset} onClose={handleClose}>
            <DialogTitle style={{fontWeight:'normal'}}>Are you sure you want to undo the changes?</DialogTitle>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseButton}>No</Button>
                <Button variant="contained" color='primary'onClick={handleLeftBtnClick}>Yes</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default V5GlobalFooterButtons;
