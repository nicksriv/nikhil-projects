import React, { useEffect } from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import PropTypes from "prop-types";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Email from '@material-ui/icons/Email';
// import { startOfYesterday } from 'date-fns';
// import { ConfirmationDialog } from 'app/components';

const useStyles = makeStyles((theme) => ({
    root: { 
        "& .MuiInputBase-input": {
            color: "black",
          },
        "& .MuiInputLabel-root .Mui-disabled": {
            color: "#00000099",
            fontWeight: "400"
        },

        "& .MuiFormLabel-root.Mui-focused": {
            color: "#2C3E93"
        },
        "& .MuiInputBase-input": {
            color:'black !important'
        }

    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "black !important",
            fontWeight:300
        }
    },
    // disabledInputLabel: {
    //     "& .MuiFormLabel-root.Mui-disabled": {
    //         color: "#000000BC"
    //     }
    // },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: "#9f9f9e"
        }
    },
    iconColor: {
        color: "#636365"
    },
    disableCursor: {
        '&:hover': {
            cursor: 'notAllowed'
        }, 
    },
    disabled : {
        cursor: 'not-allowed',
        pointerEvents: 'all',
        fontSize:"16px",
        lineHeight: "24px",
        letterSpacing: "0.15px",
        fontWeight:"normal",
        color:"#202020"

    },
    customTooltip: {
        position: 'absolute',
        left: '30px',
        top: '65px',
        zIndex: '500',
        width: '240px',
        padding: '0px 10px',
        wordBreak: 'break-word'
    },
    text:{
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0.15px",
      paddingLeft:"2px"
    },
   
}));
function UserDetails(props) {
    const {
        pageMode,
        handleCancel,
        profileImage, 
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {userProfileDetails, states, cities } = useSelector((state) => state.profile);
    const { userProfileImageId } = useSelector((state) => state.auth);
    const [formData, setFormData] = React.useState({});
    const [hoveredField, setHoveredField] = React.useState("phone");
    const [showDeletePopup, setShowDeletePopup] = React.useState(false);

    const formik = useFormik({
        initialValues: formData,
        enableReinitialize: true,
        onSubmit: async (values) => {
            dispatch({
                type: "updateUserProfileDetailsAction",
                payload : values
            });
            let formData = new FormData();
            formData.append('file', profileImage);
            if (profileImage) {
                dispatch({
                    type: 'updateUserProfileLogoAction',
                    file: formData
                });
            }
            handleCancel();
            history.push('dashboard/default');
        }
    });
    
    useEffect(() => {
        dispatch({
            type: "getUserProfileDetailsAction" 
        });
        dispatch({
            type: "getStatesCitiesMasterAction" 
        });
        dispatch({
            type: "getUserProfileLogoAction",
            payload: userProfileImageId
        });
        dispatch({
            type: "getStatesDataAction"
        });
    }, []);

    useEffect(()=>{
        setFormData({...userProfileDetails});
        formik.setValues({...userProfileDetails});
        Object.keys(userProfileDetails).forEach((v)=>{ formik.setFieldTouched(v, true) });
        dispatch({
            type: 'getCitiesByStateDataAction',
            payload: formik.values.state
        })
    },[userProfileDetails]);

    const handleStateChange = (state) => {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: state
        });
        formik.setFieldValue("state", state);
    }
    useEffect(()=> {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: formik.values.state
        });
    }, [formik.values.state]);

    const handleClose = () => {
        dispatch({
            type: "getUserProfileDetailsAction" 
        });
        handleCancel();
        setShowDeletePopup(false);
    }
    const typeOfUser = localStorage.getItem('typeOfUser');
    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}
            <form onSubmit={formik.handleSubmit} >
                    <div className={"w-full mt-2"}>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full px-5'>
                        <Grid item>
                            <h5 className={classes.text}>Basic details</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5"  className='min-h-120 w-full px-5'>
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{position:'relative'}} >
                            <TextField
                                id="fullName"
                                name="fullName"
                                label="Full Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                disabled
                                style={{ position : 'relative',fontWeight:"bold",color:"black"}}
                               
                                value={ formik.values.fullName ? formik.values.fullName : `${formik.values.firstName} ${formik.values.lastName}`}
                                onChange={formik.handleChange}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    }

                                }}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled ,
                                      
                                    }
                                }}
                                onMouseEnter={e => {setHoveredField("fullname")}}
                                onMouseLeave={e => {setHoveredField("")}}
                            />
                            { pageMode === 'edit' && hoveredField === 'fullName' &&
                                <CustomTooltip/>
                            }                     
                        </Grid>
                    </Grid> 
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full px-5'>
                        <Grid item xs={12} sm={12} md={6} lg={4} style={{position:'relative'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    inputVariant="outlined"
                                    id="dob"
                                    name="dob"
                                    label="Date of Birth"
                                    //  maxDate={Date.now()}
                                    fullWidth
                                    value={formik.values.dob}
                                    autoOk
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    format="dd MMM yyyy"
                                    InputProps={{
                                        readOnly: true,
                                        classes: { 
                                            disabled: classes.disabled 
                                        }
                                    }}
                                    disabled
                                    onMouseEnter={e => {setHoveredField("dob")}}
                                    onMouseLeave={e => {setHoveredField("")}}
                                    />
                            </MuiPickersUtilsProvider>
                            { pageMode === 'edit' && hoveredField === 'dob' &&
                                <CustomTooltip/>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Mobile Number"
                                fullWidth
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                className={classes.disabledInput}
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    }, 
                                   
                                }}
                                inputProps={{ maxLength: 10 }}
                                variant="outlined"
                                disabled={pageMode === 'view' ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                type="text"
                                value={formik.values.email}
                                className={classes.disabledInput}
                                onChange={formik.handleChange}
                                disabled={pageMode === 'view' ? true : false}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full px-5'>
                        <Grid item xs={12} sm={12} md={6} lg={4} style={{position:'relative'}}>
                            <TextField
                                id="gender"
                                select
                                name="gender"
                                label="Gender"
                                fullWidth
                                type="text"
                                defaultValue={formik.values.gender? formik.values.gender: ''}
                                value={formik.values.gender? formik.values.gender: ''}
                                onChange={formik.handleChange}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null,
                                        classes: { 
                                            disabled: classes.disabled 
                                        }
                                    }
                                }}
                                variant="outlined"
                                disabled
                                onMouseEnter={e => {setHoveredField("gender")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                >
                               <MenuItem selected value={formik.values.gender}>
                                    {formik.values.gender}
                                </MenuItem>
                                <MenuItem value="None" key="None">
                                    None
                                </MenuItem>
                            </TextField>
                            { pageMode === 'edit' && hoveredField === 'gender' &&
                                <CustomTooltip/>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} style={{position:'relative'}}>
                            <TextField
                                id="pan"
                                name="pan"
                                fullWidth
                                label="PAN Number"
                                type="text"
                                variant="outlined"
                                disabled
                                value={formik.values.pan}
                                onChange={formik.handleChange}
                                onMouseEnter={e => {setHoveredField("pan")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                                />
                                { pageMode === 'edit' && hoveredField === 'pan' &&
                                    <CustomTooltip/>
                                }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} style={{position:'relative'}}>
                            <TextField
                                id="aadhar"
                                name="aadhar"
                                label="Aadhar Number"
                                disabled
                                value={formik.values.aadhar}
                                onChange={formik.handleChange}
            
                                fullWidth
                                type="text"
                                variant="outlined"
                                onMouseEnter={e => {setHoveredField("aadhar")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                            />
                            { pageMode === 'edit' && hoveredField === 'aadhar' &&
                                <CustomTooltip/>
                            }
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full px-5'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                value={formik.values.address}
                                disabled={pageMode === 'view' ? true : false}
                                className={classes.disabledInput}
                                fullWidth
                                type="text"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                disabled
                                id="country"
                                name="country"
                                label="Country"
                                // defaultValue="India"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                fullWidth
                                type="text"
                                variant="outlined"
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled ,
                                      
                                    }
                                }}
                               
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                 id="state"
                                 select
                                 name="state"
                                 fullWidth
                                 defaultValue={formik.values.state? formik.values.state: ''}
                                 value={formik.values.state? formik.values.state: ''}
                                 onChange={(e)=>handleStateChange(e.target.value)}
                                 className={classes.disabledInput}
                                 disabled={pageMode === 'view' ? true : false}
                                 label="State"
                                 type="text"
                                 variant="outlined"
                                 >   
                                 <MenuItem value="">
                                     <em>None</em>
                                 </MenuItem>
                                 { 
                                 states.map((x,index)=>{
                                     return(
                                     <MenuItem value={x.name}>{x.name}</MenuItem>
                                     )
                                 }) 
                                 }
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full px-5'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="city"
                                select
                                name='city'
                                label="City"
                                value={formik.values.city? formik.values.city: ''}
                                className={classes.disabledInput}
                                disabled={ pageMode === "view" ? true : false}
                                onChange={formik.handleChange}
                                fullWidth
                                variant="outlined"
                            >  
                               { 
                                cities.map((x,index)=>{
                                    return(
                                    <MenuItem value={x.name} >{x.name}</MenuItem>
                                    )
                                    }) 
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="area"
                                label="Area"
                                fullWidth
                                value={formik.values && formik.values.area}
                                className={classes.disabledInput}
                                onChange={formik.handleChange}
                                type="text"
                                name="area"
                                variant="outlined"
                                disabled={pageMode === 'view' ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="pincode"
                                name="pincode"
                                label="PIN"
                                fullWidth
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                disabled={pageMode === 'view' ? true : false}
                                className={classes.disabledInput}
                                type="text"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    {pageMode === 'edit' &&
                    <Grid container justifyContent="flex-end" className='p-5' style={{position:'sticky'}}>
                        <Grid item className='m-1'>
                        <Button type="button" onClick={()=>setShowDeletePopup(true)} variant='outlined' color='primary' >CANCEL</Button>
                        </Grid>
                        <Grid item className='m-1'>
                            <Button type="submit" disabled={formik.values.phone.length < 10 } variant="outlined" color="primary" >SAVE</Button>
                        </Grid>
                    </Grid>
                    }
                    <Dialog
                        open={showDeletePopup}
                        onClose={()=>setShowDeletePopup(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          Saved data will be lost. Are you sure want to delete?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Yes</Button>
                          <Button onClick={()=>setShowDeletePopup(false)} autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                </div>
            </form>
            {/* </ThemeProvider> */}
        </div>
    );
}

function CustomTooltip() {
    const classes = useStyles();
    return(
        <Card className={`${classes.customTooltip} text-left`}>
                <p>To update this, please contact your 
                    <span style={{margin:0, color:'#2C3E93', fontSize: '14px'}}> ADMIN@V5GLOBAL.IN</span>
                </p>
        </Card>
    )
}
UserDetails.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func
}

UserDetails.defaultProps = {

};

export default UserDetails;