import React, { useState, useEffect } from 'react';
import {
    Card,
    Grid,
    Button,
    FormControl,
    CircularProgress,
    Paper, InputAdornment, IconButton, TextField, OutlinedInput, InputLabel
} from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import history from 'helper/history.js';
import useAuth from 'app/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(({ palette, ...theme }) => ({


    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 400,
        borderRadius: 3,
        zIndex: 1,
        position: "absolute",
        right: "23%",
        top: "10%",
        height: "35rem",
        padding: "4rem",
        boxShadow: "0px 0px 15px 10px rgba(0,0,0,0.1)"
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    loginImage: {
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100vh"
    },
    logo: {
        width: "100px",
        height: "auto",
    },
    hr: {
        opacity: 0.2
    },
    footerText: {
        color: '#2C3E93'
    },
    paperContainer: {
        backgroundImage: `url('/assest/images/login.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
}))

const JwtLogin = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });
    // const [userInfo, setUserInfo] = useState({
    //     email: 'jason@ui-lib.com',
    //     password: 'dummyPass',
    // })
    // const [message, setMessage] = useState('')
    // const { login } = useAuth()

    const classes = useStyles()


    const handleFormSubmit = () => {
        setLoading(true);
        dispatch({
            type: "setAuthenticationAction",
            payload: {
                clientId: values.username,
                password: values.password
            }
        });
        setLoading(false);
    }

    useEffect(()=> {
        if (isAuthenticated)
        history.push('/dashboard');
    }, [isAuthenticated]);

    const handleChange = (prop) => (event) => {
        const { value } = event.target;
        setValues({ ...values, [prop]: value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Paper>
            <img className={classes.loginImage} src="/assets/images/login.jpg" alt="logo" />
            <Grid container justifyContent="flex-end">
                <Card elevation={0} className={`${classes.card} p-6`}  >
                    <Grid container>
                        <Grid item xs={12}>
                            <div className="p-3">
                                <img
                                    src="/assets/images/V5Globallogo.png" alt="Logo" className={`${classes.logo}`}
                                />
                                <h2 className='mt-10 h1'>Sign In</h2>
                            </div>

                        </Grid>
                        <Grid item xs={12}>
                            <div className="p-2 relative">
                                <ValidatorForm onSubmit={handleFormSubmit}>
                                    <TextField
                                        id="outlined-password-input"
                                        label="Username"
                                        name="username"
                                        onChange={handleChange('username')}
                                        type="text"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        className="w-full"
                                    />
                                    <FormControl className="w-full mt-10" sx={{ m: 1 }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput

                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    <Grid className="mt-15 mb-10">
                                        <Button fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={loading || !values.username || !values.password}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </Grid>
                                    <Grid className={`${classes.hr} mt-5`} >
                                        <hr />
                                    </Grid>
                                    <Grid className='mt-3 mb-5 flex justify-center items-center'>
                                        <small style={{ opacity: "0.4", fontSize: "0.8rem" }}>For Troubleshoot,</small>
                                        <small className={`${classes.footerText} px-2`}>CONTACT ADMIN</small>
                                    </Grid>


                                </ValidatorForm>

                            </div>


                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        </Paper>
    )
}

export default JwtLogin
