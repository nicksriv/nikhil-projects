import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        "& .MuiBackdrop-root":{
            backgroundColor:" rgba(0, 0, 0, 0.8);"
        }
    },
    yesButton:{
        color: "black",
        opacity: "0.6",
        fontWeight:"bold",
        '& :hover':{
            color:"#2C3E93",
            opacity: "1"
        }
    },
    box: {
        maxWidth: "20rem"
    },
    dialogueDesc: {
        fontSize: '15px',
        color: 'gray'
    }
}))
const ConfirmationDialog = ({
    open,
    onConfirmDialogClose,
    text,
    title = '',
    onYesClick,
    hasOnlyCloseAction
}) => {
    const classes = useStyles();
    return (
        <Dialog maxWidth="xs" open={open} onClose={onConfirmDialogClose}>
            <div className={`px-6 pt-3 mx-auto ${classes.box}`}>
                <h4 className="capitalize m-0 mb-2">{title}</h4>
                <p className={`text-left ${classes.dialogueDesc}`}>{text}</p> 
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    {
                        hasOnlyCloseAction ?
                            <Button
                                className="m-2 px-4"
                                variant="text"
                                color="primary"
                                onClick={onConfirmDialogClose}
                            >
                                Close
                            </Button>
                            :
                            <>
                                <Button
                                    className={` ${classes.yesButton}`}
                                    variant="text"
                                    onClick={onYesClick}
                                >
                                    Yes
                                </Button>
                                <Button
                                    className=" color-primary"
                                    variant="text"
                                    onClick={onConfirmDialogClose}
                                >
                                    No
                                </Button>
                            </>
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmationDialog
