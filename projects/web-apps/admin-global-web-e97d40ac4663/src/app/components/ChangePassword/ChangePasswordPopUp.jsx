import React from 'react'
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
import { useDispatch } from 'react-redux'
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
        // '& .Mui-focused': {

        //     border: '1px solid #2C3E93',
        // },
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
        // padding:0,
        // margin:0,
        position: 'absolute',
        right: '0.3rem',
        bottom: '0.2rem',
    },
    disabledBtn: {
        backgroundColor: 'lightgray',
        border: '1px solid gray',
    },
}))
function ChangePasswordPopUp({
    open,
    Close,
    clientId,
    userId,
    vendorId,
    qualityAssuranceId,
    data,
    onClose,
}) {
    const classes = useStyles()
    //const [newPassword,setNewPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false)
    const [confirmPassword, setConfirmPassword] = React.useState('')
    //const [oldPassword, setOldPassword] = React.useState('');
    const dispatch = useDispatch()
    //const password = data[0].Password;

    const handleClose = () => {
        Close(!open)
        setConfirmPassword('')
    }
    const handleChangePassword = (event) => {
        setConfirmPassword(event.target.value)
    }
    // const ConfirmPassword = (event) =>{
    //     setConfirmPassword(event.target.value);
    // }

    // const handleOldPassword = (event) =>{
    //     setOldPassword(event.target.value);
    // }
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)
    const handleSubmit = () => {
        Close(!open)
        onClose(!open)
        if (clientId) {
            dispatch({
                type: 'changeClientPasswordAction',
                payload: {
                    clientId: clientId,
                    newPassword: {
                        newPassword: confirmPassword,
                    },
                },
            })
        }
        if(qualityAssuranceId){
            dispatch({
                type: 'updateQualityAssurancePasswordAction',
                payload: {
                    qualityAssuranceId: qualityAssuranceId,
                    newPassword: {
                        newPassword: confirmPassword,
                    },
                },
            })
        }
        if (vendorId) {
            dispatch({
                type: 'updateVendorPasswordAction',
                payload: {
                    vendorId: vendorId,
                    newPassword: {
                        newPassword: confirmPassword,
                    },
                },
            })
        } else if (userId) {
            dispatch({
                type: 'changeUserPasswordAction',
                payload: { userId: userId, newPassword: confirmPassword },
            })
        }
        setConfirmPassword('')
        // setOldPassword("");
        // setConfirmPassword("");
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                            <FormControl fullWidth className="mb-3 p-1">
                                {/* <TextField  
                            variant="outlined"
                            label="Old Password" 
                            name="OldPassword" 
                            required 
                            onChange={handleOldPassword} 
                            error={ oldPassword.length > 0 && oldPassword !== password ? true: false }
                            helperText = { oldPassword.length > 0 && oldPassword !== password ? "Incorrect password" : null }
                            FormHelperTextProps={{className : classes.helperText}}
                            className="mb-5 mt-2"
                            /> */}
                                {/* </FormControl>
                            <FormControl fullWidth className="mb-3"  > */}
                                <TextField
                                    variant="outlined"
                                    label="New Password"
                                    name="New Password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChangePassword}
                                    className={`mb-5 mt-5 ${classes.root}`}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
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
                                    //  helperText={ newPassword.length > 0 && oldPassword === newPassword ? 'Please try different password!!' : null}
                                    //  FormHelperTextProps={{className : classes.helperText}}
                                />
                                {/* </FormControl>
                                <FormControl fullWidth className="mb-3"  > */}
                                {/* <TextField  variant="outlined" 
                                label="Confirm Password" 
                                name="Confirm Password" 
                                className="mb-5"
                                required onChange={ConfirmPassword}
                                error={confirmPassword.length > 0   && newPassword !== confirmPassword ? true : false }
                                helperText={ confirmPassword.length > 0 && newPassword !== confirmPassword ? "Enter correct password" : null }
                                FormHelperTextProps={{className : classes.helperText}}
                                /> */}
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
                                            !confirmPassword
                                                ? classes.disabledBtn
                                                : 'bg-primary text-black'
                                        }
                                        disabled={
                                            (confirmPassword ? false : true) ||
                                            (confirmPassword.length > 0
                                                ? false
                                                : true)
                                        }
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        SUBMIT
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

export default ChangePasswordPopUp
