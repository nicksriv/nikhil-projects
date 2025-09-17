import React, { useEffect, useState } from 'react';
import {
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    //Switch,
    TextField,
    FormLabel,
    Checkbox,
    Button,
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { V5GlobalFormFooter, Multiselect } from 'app/components';
import Email from '@material-ui/icons/Email';
import { useSelector } from 'react-redux';

//import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#2C3E93",
        }
    },
    formContainer: {
        width: '75vw',
        paddingBottom: '5rem',
    },
    emailIcon: {
        color: '#636365',
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
            color: "#9f9f9e",
            marginLeft: '-12px'
        }
    },
    actvBtn: {
        backgroundColor: "#E5F2F0",
        color: "#2C3E93",
        border: "1px solid #2C3E93",
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    inctvBtn: {
        backgroundColor: "#EBD9DC",
        border: "1px solid #B10021",
        padding: "0 1rem",
        margin: "0 0.5rem",
        color: "#B10021"
    },
    button: {
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    checkbox: {
        "&$checked": {
            color: "#2C3E93"
        },
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    customBox: {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 4.9,
        maxWidth: '300px',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            width: 'none',
            display: 'none'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
}))
// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// });

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

function EmploymentDetails(props) {
    const {
        formValues,
        pageMode,
        pageSource,
        handleEmploymentInputChange,
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
    const { clientRoles, clientEmployees, userEmploymentDetails } = useSelector((state) => state.users);
    const [reportingManagerRole, setReportingManagerRole] = useState([]);
    const [refferalDetailsRole, setRefferalDetailsRole] = useState([]);
    useEffect(() => {

        if (userEmploymentDetails) {

            const { reportingManager } = userEmploymentDetails;
            const { referral } = userEmploymentDetails;
            if (reportingManager !== null || (Object.keys(reportingManager).length !== 0 && reportingManager.constructor === Object)) {

                if (reportingManager.roles && reportingManager.roles.length === 0) {
                    setReportingManagerRole([])
                }
                if (reportingManager.roles) {
                    setReportingManagerRole(reportingManager.roles);

                }
            }

            if (referral !== null || (Object.keys(referral).length !== 0 && referral.constructor === Object)) {
                if (referral.roles && referral.roles.length === 0) {
                    setRefferalDetailsRole([])
                }
                if (referral.roles) {
                    setRefferalDetailsRole(referral.roles);
                }

            }

        }
    }, [userEmploymentDetails]);
    // const handleDelete = (e, value) => {
    //     e.stopPropagation();
    //     let data = [...formValues.roles];
    //     let newData = data.filter(v => v !== value);
    //     let roles = {
    //         name: "roles",
    //         value: "newData"
    //     }
    //     handleEmploymentInputChange({ target: roles });
    // }

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        let roles = {
            name: "roles",
            value: typeof value === 'string' ? value.split(',') : value
        }
        handleEmploymentInputChange({ target: roles });
    }

    const handleDeleteRole = () => {

    }
    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}
            <form>
                <div className={"w-full mt-5"}>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full'>
                        <Grid item>
                            <h5>Employment details</h5>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Multiselect
                                label="Select Roles"
                                roles={clientRoles}
                                roleName={formValues.roles}
                                handleRoleChange={handleRoleChange}
                                handleDelete={handleDeleteRole}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="typeOfEmployment"
                                name="typeOfEmployment"
                                label="Type of Employment"
                                select
                                variant="outlined"
                                value={formValues && formValues.typeOfEmployment}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleEmploymentInputChange}
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
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
                            >
                                < MenuItem value="Full Time" >
                                    Full Time
                                </MenuItem>
                                < MenuItem value="Part Time" >
                                    Part Time
                                </MenuItem>
                                < MenuItem value="Contract" >
                                    Contract
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="employeeId"
                                name="employeeId"
                                label="Emp ID"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.employeeId}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleEmploymentInputChange}
                                error={errorState
                                    && errorState.userEmploymentDetails
                                    && errorState.userEmploymentDetails.employeeId
                                    && errorState.userEmploymentDetails.employeeId.error}
                                helperText={errorState
                                    && errorState.userEmploymentDetails
                                    && errorState.userEmploymentDetails.employeeId
                                    && errorState.userEmploymentDetails.employeeId.error
                                    && errorState.userEmploymentDetails.employeeId.errorMsg}                               
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    inputVariant="outlined"
                                    id="joiningDate"
                                    name="joiningDate"
                                    label="Date of Joining"
                                    required
                                    maxDate={Date.now()}
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error',
                                        },
                                    }}
                                    value={formValues && formValues.joiningDate}
                                    onChange={(e) => handleDate(e, 'joiningDate', pageSource.EMPLOYMENT)}
                                    format="dd MMM yyyy"
                                    className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                            `${classes.disabledInput} ${classes.disabledInputLabel}`
                                            : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                    error={errorState && errorState.joiningDate && errorState.joiningDate.error}
                                    helperText={errorState && errorState.joiningDate && errorState.joiningDate.errorMsg}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                className={`${styleObj.textFieldWidth}                            
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleEmploymentInputChange}
                                variant="outlined"
                                value={formValues && formValues.email}
                                error={errorState
                                    && errorState.userEmploymentDetails
                                    && errorState.userEmploymentDetails.email
                                    && errorState.userEmploymentDetails.email.error}
                                helperText={errorState
                                    && errorState.userEmploymentDetails
                                    && errorState.userEmploymentDetails.email
                                    && errorState.userEmploymentDetails.email.error
                                    && errorState.userEmploymentDetails.email.errorMsg}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" className="pl-16">
                                            <Email
                                                className={
                                                    classes.emailIcon
                                                }
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            {
                                pageMode !== "view" ?
                                    (
                                        <>
                                            <FormControlLabel
                                                value="status"
                                                name="status"
                                                label="Status:"
                                                labelPlacement="start"
                                                size="small"
                                                control={
                                                    <>
                                                        <Button variant="outlined" size="small"
                                                            onClick={(e) => handleEmploymentInputChange(e, "", "INACTIVE")}
                                                            name="status"
                                                            className={formValues.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                                        >
                                                            INACTIVE
                                                            <Checkbox
                                                                value="INACTIVE"
                                                                name="status"
                                                                icon={<CircleUnchecked />}
                                                                checked={formValues.status === "INACTIVE" ? true : false}
                                                                checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                            />
                                                        </Button>

                                                        <Button variant="outlined" size="small"
                                                            onClick={(e) => handleEmploymentInputChange(e, "", "ACTIVE")}
                                                            name="status"
                                                            className={formValues.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                                        >
                                                            ACTIVE
                                                            <Checkbox
                                                                color='primary'
                                                                name="status"
                                                                value="ACTIVE"
                                                                icon={<CircleUnchecked />}
                                                                checked={formValues.status === "ACTIVE" ? true : false}
                                                                checkedIcon={<CircleCheckedFilled />}
                                                            />
                                                        </Button>
                                                    </>
                                                }

                                            />
                                        </>
                                        // <FormControlLabel
                                        //     value="status"
                                        //     name="status"
                                        //     control={<Switch color="primary"
                                        //         checked={formValues.status && formValues.status.toUpperCase() === "ACTIVE" ? true : false}
                                        //         onChange={handleEmploymentInputChange} />}
                                        //     label="Status:"
                                        //     className={`${classes.switchLabel} mt-1`}
                                        //     labelPlacement="start"
                                        // />
                                    )
                                    :
                                    (
                                        <FormLabel className="text-16" component="legend">
                                            Status:
                                            {formValues.status.toUpperCase() === "ACTIVE" ? <Button variant="outlined" size="small"
                                                className={`${formValues.status && formValues.status.toUpperCase() === "ACTIVE" ? classes.actvBtn : ''} mr-3 ml-3 ${classes.button}`}
                                            >ACTIVE
                                                <Checkbox color="primary" icon={<CircleUnchecked />}
                                                    checked={formValues.status && formValues.status.toUpperCase() === "ACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </Button> : <Button variant="outlined" size="small"
                                                className={`${formValues.status && formValues.status.toUpperCase() === "INACTIVE" ? classes.inctvBtn : ''} mr-3 ml-3 ${classes.button}`}
                                            >INACTIVE
                                                <Checkbox color='success' icon={<CircleUnchecked />}
                                                    checked={formValues.status && formValues.status.toUpperCase() === "INACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                />
                                            </Button>}
                                        </FormLabel>
                                    )
                            }
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full mt-8'>
                        <Grid item>
                            <h5>Reporting Manager</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="id"
                                name="id"
                                label="Emp ID"
                                select
                                variant="outlined"
                                value={formValues.reportingManager && formValues.reportingManager.id}
                                onChange={(e) => handleEmploymentInputChange(e, "reportingManager")}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {clientEmployees.map((emp) => {
                                    if (emp.employeeId !== userEmploymentDetails.employeeId && emp.status === "ACTIVE" && emp.employeeId !== null && emp.employeeId !== undefined) {
                                    return (
                                     < MenuItem value={emp.userId} key={emp.userId} >
                                        {emp.employeeId}
                                    </MenuItem>
                                     ) }
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="name"
                                name="name"
                                label="Employee's Name"
                                type="text"
                                variant="outlined"
                                InputLabelProps={{ shrink: formValues.reportingManager.name ? true : false }} 
                                value={formValues.reportingManager && formValues.reportingManager.name}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>

                            <Multiselect
                                label="Employee's Role"
                                roles={[]}
                                roleName={reportingManagerRole.map((role) => role.name)}
                                handleRoleChange={handleRoleChange}
                                handleDelete={handleDeleteRole}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full mt-8'>
                        <Grid item>
                            <h5>Referral Details</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="id"
                                name="id"
                                label="Emp ID"
                                select
                                variant="outlined"
                                value={formValues.referral && formValues.referral.id}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                onChange={(e) => handleEmploymentInputChange(e, "referral")}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {clientEmployees.map((emp) => {
                                    if (emp.employeeId !== userEmploymentDetails.employeeId && emp.status === "ACTIVE" && emp.employeeId !== null && emp.employeeId !== undefined) {
                                    return(
                                    < MenuItem value={emp.userId} key={emp.userId} >
                                        {emp.employeeId}
                                    </MenuItem>
                                     )}
                        
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="name"
                                name="name"
                                label="Employee's Name"
                                type="text"
                                variant="outlined"
                                InputLabelProps={{ shrink: formValues.referral.name ? true : false }}  
                                value={formValues.referral && formValues.referral.name}
                                className={`${styleObj.textFieldWidth} 
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Multiselect
                                label="Employee's Role"
                                roles={[]}
                                roleName={refferalDetailsRole.map((role) => role.name)}
                                handleRoleChange={handleRoleChange}
                                handleDelete={handleDeleteRole}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>


                    {/* <div className="p-6"> */}
                    <V5GlobalFormFooter
                        isSubmit={false}
                        pageMode={pageMode}
                        backArrowDisabled={backArrowDisabled}
                        nextArrowDisabled={nextArrowDisabled}
                        cancelBtnDisabled={cancelBtnDisabled}
                        saveAndContinueBtnDisabled={saveAndContinueBtnDisabled}
                        handleNextArrow={handleNextArrow}
                        handleBackArrow={handleBackArrow}
                        handleSaveAndContinue={(e) => handleSaveAndContinue(e, pageSource.EMPLOYMENT)}
                        handleCanceBtn={handleCanceBtn}
                    />
                    {/* </div> */}
                </div>
            </form>
            {/* </ThemeProvider> */}
        </div >
    )
}

export default EmploymentDetails
