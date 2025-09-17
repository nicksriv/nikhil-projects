import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import BasicTable from './BasicTable';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        fontSize: '2rem !important',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSvgIcon-root': {
            fontSize: '2rem',
        },
    },
    popUpHeading: {
        color: '#2C3E93 !important',
        marginTop: '0.2rem',
        fontWeight: 600,
        fontSize: '1rem',
    },
    popUpTitle: {
        color: '#00000099',
        margin: '0 auto',
        width: '320px',
        fontSize: '0.9rem',
        fontWeight: '400',
    },
    button: {
        margin: '0 auto',
        marginBottom: '15px'
    },
    popUpPosition: {
        display: 'grid',
        placeItems: 'center',
        marginTop: '20%',
    },
    imageContainer: {
        color: '#2C3E93 !important',
        display: 'grid',
        placeItems: 'center',
        margin: '1rem auto',
        marginBottom: '0',
        paddingBottom: '0',
        fontSize: '6rem',
    },
}))

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon className="h1" />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)

function PopUp(props) {
    const {
        popupHeading,
        popupType,
        popupTitle,
        popupButtonText,
        tableData,
        handleEmail
    } = props;

    useEffect(() => {
        handleClickOpen()
    }, [])

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.popUpPosition}>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                style={{ width: '500px', margin: '0 auto' }}
            >
                <DialogTitle
                    className={classes.imageContainer}
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    <div className={classes.imageContainer}>
                        {popupType === 'success' ? (
                            <CheckCircleOutlineIcon
                                className={classes.imageContainer}
                            />
                        ) : null}
                        <Typography className={classes.popUpHeading}>
                            {popupHeading}
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Typography className={`${classes.popUpTitle}`}>
                        {popupTitle}
                    </Typography>

                    <BasicTable
                        tableData={tableData}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={`${classes.button} bg-primary text-white`}
                        variant="contained"
                        color="primary"
                        onClick={handleEmail}
                    >
                        {popupButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopUp;
