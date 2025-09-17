import React from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    MenuItem
} from '@material-ui/core';
import PropTypes from "prop-types";
import { V5GlobalFormFooter } from '../../../../components';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles, //createTheme, ThemeProvider 
} from '@material-ui/core/styles';
import { convertDate } from 'app/views/utilities/DateFormat';

// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// });

const useStyles = makeStyles((theme) => ({
    root: {

        // '& > *': {
        //     marginTop: theme.spacing(2),
        // },
        // '& .MuiGrid-spacing-xs-5': {
        //     justifyContent: "center"
        // },
        // '& .Mui-selected': {
        //     backgroundColor: '#2A4EBD',
        //     color: '#fff !important',
        // }        
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },
        // "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl":{
        //     color:'pink',
        // },

        "& .MuiFormLabel-root.Mui-focused": {
            color: "#2C3E93"
        },
    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    disabledInputLabel: {
        "& .MuiFormLabel-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: "#9f9f9e"
        }
    },
    iconColor: {
        color: "#636365"
    },
}));
function BasicDetails(props) {
    const {
        formValues,
        states,
        cities,
        pageMode,
        pageSource,
        genders,
        handleInputChange,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        handleCanceBtn,
        styleObj,
        errorState,
        handleDate,
    } = props;
    const classes = useStyles();

    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}
            <form>
                    <div className={"w-full mt-2"}>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full'>
                        <Grid item>
                            <h5>Basic details</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.firstName}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState && errorState.firstName && errorState.firstName.error}
                                helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="middleName"
                                name="middleName"
                                label="Middle Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.middleName !== "" ? formValues.middleName : "N/A"}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState && errorState.middleName && errorState.middleName.error}
                                helperText={errorState && errorState.middleName && errorState.middleName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.lastName}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState && errorState.lastName && errorState.lastName.error}
                                helperText={errorState && errorState.lastName && errorState.lastName.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    inputVariant="outlined"
                                    id="dob"
                                    name="dob"
                                    label="Date of Birth"
                                    maxDate={Date.now()}
                                    required
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    InputProps={{ readOnly: true }}
                                    value={formValues && formValues.dob && convertDate(formValues.dob)}
                                    onChange={(e) => handleDate(e, 'dob', pageSource.BASIC)}
                                    format="dd MMM yyyy"
                                    className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                            `${classes.disabledInput} ${classes.disabledInputLabel}`
                                            : `${classes.root}`}`}

                                    disabled={pageMode === "view" ? true : false}
                                    error={errorState && errorState.dob && errorState.dob.error}
                                    helperText={errorState && errorState.dob && errorState.dob.errorMsg}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="contactNumber"
                                name="contactNumber"
                                label="Mobile Number"
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                variant="outlined"
                                value={formValues && formValues.contactNumber}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.contactNumber
                                    && errorState.userBasicDetails.contactNumber.error? true :!formValues?.contactNumber.match(/^[1-9][0-9]*$/gm) && formValues?.contactNumber.length > 0 ? true : false}
                                helperText={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.contactNumber
                                    && errorState.userBasicDetails.contactNumber.error
                                    && errorState.userBasicDetails.contactNumber.errorMsg? errorState.userBasicDetails.contactNumber.errorMsg : !formValues?.contactNumber.match(/^[1-9][0-9]*$/gm) && formValues?.contactNumber.length > 0 ? `Please enter valid mobile number` : null}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="personalEmail"
                                name="personalEmail"
                                label="Personal Email"
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                variant="outlined"
                                value={formValues && formValues.personalEmail}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.personalEmail
                                    && errorState.userBasicDetails.personalEmail.error}
                                helperText={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.personalEmail
                                    && errorState.userBasicDetails.personalEmail.error
                                    && errorState.userBasicDetails.personalEmail.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="gender"
                                select
                                name="gender"
                                label="Gender"
                                type="text"
                                required
                                InputLabelProps={{
                                 classes: {
                                 asterisk: 'text-error'
                                   }
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }
                                }}
                                variant="outlined"
                                value={formValues && formValues.gender}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState && errorState.gender && errorState.gender.error}
                                helperText={errorState && errorState.gender && errorState.gender.errorMsg}
                            >
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem> */}
                                {
                                    genders && genders.map((g) =>
                                        <MenuItem key={g.id} value={g.name}>
                                            {g.name}
                                        </MenuItem>
                                    )
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="pan"
                                name="pan"
                                label="PAN Number"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.pan}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.pan
                                    && errorState.userBasicDetails.pan.error }
                                helperText={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.pan
                                    && errorState.userBasicDetails.pan.error
                                    && errorState.userBasicDetails.pan.errorMsg 
                                    
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="aadharNumber"
                                name="aadharNumber"
                                label="Aadhar Number"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.aadharNumber}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.aadharNumber
                                    && errorState.userBasicDetails.aadharNumber.error}
                                helperText={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.aadharNumber
                                    && errorState.userBasicDetails.aadharNumber.error
                                    && errorState.userBasicDetails.aadharNumber.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                type="text"
                                variant="outlined"
                                value={formValues.address}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                disabled
                                id="country"
                                name="country"
                                label="Country"
                                type="text"
                                variant="outlined"
                                value={formValues.country ? formValues.country : "India"}
                                onChange={handleInputChange}
                                className={styleObj.textFieldWidth}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="state"
                                select
                                name="state"
                                label="State"
                                type="text"
                                variant="outlined"
                                value={formValues.state}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                { 
                                states && states.map((x,index)=>{
                        return(
                        <MenuItem value={x.name}>{x.name}</MenuItem>
                        )
                    }) 
                    }
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="city"
                                select
                                name="city"
                                label="City"
                                type="text"
                                variant="outlined"
                                value={formValues.city}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                { 
                                cities && cities.map((x,index)=>{
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
                                name="area"
                                label="Area"
                                type="text"
                                variant="outlined"
                                value={formValues.area}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="pinCode"
                                name="pinCode"
                                label="PIN"
                                type="text"
                                variant="outlined"
                                value={formValues.pinCode}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.pinCode
                                    && errorState.userBasicDetails.pinCode.error}
                                helperText={errorState
                                    && errorState.userBasicDetails
                                    && errorState.userBasicDetails.pinCode
                                    && errorState.userBasicDetails.pinCode.error
                                    && errorState.userBasicDetails.pinCode.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <V5GlobalFormFooter
                        isSubmit={false}
                        pageMode={pageMode}
                        backArrowDisabled={backArrowDisabled}
                        nextArrowDisabled={nextArrowDisabled}
                        cancelBtnDisabled={cancelBtnDisabled}
                        saveAndContinueBtnDisabled={saveAndContinueBtnDisabled}
                        handleNextArrow={handleNextArrow}
                        handleBackArrow={handleBackArrow}
                        handleSaveAndContinue={(e) => handleSaveAndContinue(e, pageSource.BASIC)}
                        handleCanceBtn={handleCanceBtn}
                    />
                </div>
            </form>
            {/* </ThemeProvider> */}
        </div>
    );
}

BasicDetails.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func
}

BasicDetails.defaultProps = {

};

export default BasicDetails;