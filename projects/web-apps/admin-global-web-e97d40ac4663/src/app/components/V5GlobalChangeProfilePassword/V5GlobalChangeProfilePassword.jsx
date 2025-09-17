import React, { useEffect } from 'react'
import {
    Button,
    Modal,
    TextField,
    FormControl,
    Grid,
    Paper,
    IconButton,
    Typography,
    InputAdornment,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
    makeStyles,
    ThemeProvider,
    createTheme,
} from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const custom = createTheme({
    palette: {
        primary: {
            main: '#2C3E93',
        },
    },
})

const useStyles = makeStyles(({ ...theme }, custom) => ({
    root: {
        '& .Mui-focused': {
            borderColor: 'purple',
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: 'purple',
        },

        '& .MuiInputLabel-outlined.Mui-focused': {
            color: 'purple',
        },
    },
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '25rem',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing(3),
    },
    helperText: {
        marginRight: "0px",
    },
    disabledBtn: {
        backgroundColor: 'lightgray',
        border: '1px solid gray',
    },
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    iconButton:{
        padding:'0px',
    }
}))
function V5GlobalChangeProfilePassword({
    open,
    Close
}) {
    const classes = useStyles()
    const [newPassword, setNewPassword] = React.useState('')
    const [showPasswordOld, setShowPasswordOld] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [currentPassword, setCurrentPassword] = React.useState('')
    const dispatch = useDispatch();
    const { changePasswordSuccess } = useSelector( state => state.users);

    const handleClose = () => {
        Close(!open)
        setNewPassword('')
    }
    const handleChangePassword = (event) => {
        setNewPassword(event.target.value)
    }

    const handleCurrentPassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)
    const handleClickShowPasswordOld = () => setShowPasswordOld(!showPasswordOld)
    const handleMouseDownPasswordOld = () => setShowPasswordOld(!showPasswordOld)
    
    const handleSubmit = () => {
        dispatch({
            type: "changeUserProfilePasswordAction",
            payload: { 
                currentPassword: currentPassword,
                newPassword: newPassword 
            } 
        });
        // handleClosePopup(changePasswordSuccess);
    }

    const handleClosePopup = (status) => {
        if (status) {
            setNewPassword('');
            setCurrentPassword('');
            Close(!open);
        }
    }

    useEffect(()=> {
        handleClosePopup(changePasswordSuccess);
    }, [changePasswordSuccess]);

    return (
        <div className={classes.root}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modalBackground}
            >
                <ThemeProvider theme={custom}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid
                            container
                            justifyContent="flex-start"
                            className="mb-3"
                        >
                            <Grid item>
                                <Typography variant="h6" align="left">
                                    Change Password
                                </Typography>
                            </Grid>
                        </Grid>
                        <>
                            <FormControl fullWidth className="mb-3">
                                <TextField
                                    variant="outlined"
                                    label="Current Password"
                                    name="Current Password"
                                    type={showPasswordOld ? 'text' : 'password'}
                                    onChange={handleCurrentPassword}
                                    placeholder='Enter current password'
                                    // error={ currentPassword.length > 0 && currentPassword !== password ? true: false }
                                    // helperText = { currentPassword.length > 0 && currentPassword !== password ? "Incorrect password" : null }
                                    FormHelperTextProps={{
                                        className: classes.helperText,
                                    }}
                                    className="mb-4 mt-3"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    className={classes.iconButton}
                                                    onClick={
                                                        handleClickShowPasswordOld
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPasswordOld
                                                    }
                                                >
                                                    {showPasswordOld ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    label="New Password"
                                    name="New Password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChangePassword}
                                    className={`mb-5 mt-5 ${classes.root}`}
                                    placeholder='Enter new password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    className={classes.iconButton}
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={newPassword.length > 0 && currentPassword === newPassword ? true : false}
                                    helperText={
                                        newPassword.length > 0 &&
                                        currentPassword === newPassword
                                            ? 'New password should not be same as current password.'
                                            : null
                                    }
                                    FormHelperTextProps={{
                                        className: classes.helperText,
                                    }}
                                />
                            </FormControl>
                            <Grid container justifyContent="flex-end">
                                <Grid item className="mr-2">
                                    <Button
                                        variant="outlined"
                                        className="color-primary border-primary"
                                        onClick={handleClose}
                                    >
                                        CANCEL
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        className={
                                            !newPassword || currentPassword === newPassword 
                                                ? classes.disabledBtn
                                                : 'bg-primary text-black'
                                        }
                                        disabled={
                                            ((newPassword ? false : true) ||
                                            (newPassword.length > 0 ? false : true)) ||
                                            (currentPassword === newPassword ? true : false)
                                        }
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        SAVE PASSWORD
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    </Paper>
                </ThemeProvider>
            </Modal>
        </div>
    )
}

export default V5GlobalChangeProfilePassword