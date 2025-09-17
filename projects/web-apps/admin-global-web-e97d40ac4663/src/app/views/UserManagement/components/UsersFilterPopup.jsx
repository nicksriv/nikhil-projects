import React, { useEffect } from 'react';
import { makeStyles, 
    //ThemeProvider, createTheme 
 } from '@material-ui/core/styles'
import { Button, TextField, Grid, MenuItem, Slider, OutlinedInput } from '@material-ui/core';
import { //Formik, 
    FormikProvider } from 'formik';
// import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';
import { setUserFilterDetails, setPageNumber } from 'app/redux/UserManagement/userManagementSlice';


// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// })

const useStyles = makeStyles((theme) => ({
    filterWrap: {
        width: "432px",
        height: "500px",
        top: "0",
       // background: "var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 3px 24px #0000003D",
        borderRadius: "2px",
        opacity: 1,
        zIndex: 99999
    },
    inputField: {
        width: "180px",
        margin: "0.2rem"
    },
    shortField: {
        width: "55px",
        height: "55px",
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    },
    slider: {
        width: "41%",
        margin: "15px"
    },
    filterHeader: {
        // position: "fixed",
        height: "60px",
    },
    filterBody: {
        minHeight: "340px",
        maxHeight: "340px",
        overflow: "auto"
    },
    filterFooter: {
        // position: "fixed",
        height: "50px",
    }
}))

function UsersFilterPopup({ chipInfo, close }) {
    const classes = useStyles();
    const { userFilterDetails } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: userFilterDetails,
        enableReinitialize: true,
        onSubmit: async (values) => {
        },
    });

    const applyFilter = () => {
        dispatch({ type: setPageNumber.type, payload: 0 });
        dispatch({ type: setUserFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        let initialData = {
            employeeName: "",
            employeeId: "",
            reportingManager: "",
            role: "",
            gender: "",
            status: "",
            contactNumber: null,
            mappedStore: null,
            from: null,
            to: null,
            ageFrom: 0,
            ageTo: 0
        }
        formik.resetForm(initialData);
        dispatch({ type: setUserFilterDetails.type, payload: initialData });
    }

    return (
        <Grid className={classes.filterWrap}>
            {/* <ThemeProvider theme={custom}> */}
            <Grid className={`flex justify-between items-center bg-primary px-4 py-1 ${classes.filterHeader}`}>
                    <p className="text-black font-medium text-16">Filter</p>
                    <CloseIcon className="text-black cursor-pointer" onClick={close} />
            </Grid>
            <Grid className={classes.filterBody}>
                <Form formik={formik} close={close} />
            </Grid>

            <Grid className={`mt-8 flex justify-end ${classes.filterFooter}`}>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    disabled={!formik.isValid}
                        className="w-100 h-40 color-primary border-primary"
                    onClick={resetForm}
                >
                    CLEAR
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    disabled={!formik.isValid}
                        className="w-100 h-40 mx-5 bg-primary text-black font-medium"
                    onClick={applyFilter}
                >
                    APPLY
                </Button>
            </Grid>
            {/* </ThemeProvider> */}
        </Grid>
    )
}

const Form = ({ formik, close }) => {
    const {
        values: {
            employeeName,
            employeeId,
            reportingManager,
            role,
            gender,
            status,
            contactNumber,
            mappedStore,
            ageFrom,
            ageTo,
            from,
            to
        },
        errors,
        touched,
        handleChange,
        //isValid,
        setFieldTouched,
        setFieldValue
    } = formik;
    const classes = useStyles();
    const { //states, 
        statuses, genders } = useSelector((state) => state.users);
    //const dispatch = useDispatch();
    const [value, setValue] = React.useState([0, 0]);

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleAgeChange = (event, newValue) => {
        setValue(newValue);
        setFieldValue("ageFrom", newValue[0]);
        setFieldValue("ageTo", newValue[1]);
    };

    useEffect(()=>{
        setValue([ageFrom, ageTo]);
    }, [ageFrom, ageTo]);

    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                <Grid container justify="space-between" className="mb-10 mt-5 ml-1 flex-nowrap">
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            variant="outlined"
                            id="employeeName"
                            name="employeeName"
                            helperText={touched.employeeName ? errors.employeeName : ""}
                            error={touched.employeeName && Boolean(errors.employeeName)}
                            label="Emp Name"
                            value={employeeName}
                            onChange={change.bind(null, "storeName")}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            variant="outlined"
                            id="employeeId"
                            name="employeeId"
                            helperText={touched.employeeId ? errors.employeeId : ""}
                            error={touched.employeeId && Boolean(errors.employeeId)}
                            label="Emp ID"
                            value={employeeId}
                            onChange={change.bind(null, "employeeId")}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="space-between" className="mb-10 mt-5 ml-1 flex-nowrap">
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            variant="outlined"
                            id="reportingManager"
                            name="reportingManager"
                            helperText={touched.reportingManager ? errors.reportingManager : ""}
                            error={touched.reportingManager && Boolean(errors.reportingManager)}
                            label="Reporting Manager"
                            value={reportingManager}
                            onChange={change.bind(null, "reportingManager")}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            id="role"
                            name="role"
                            label="Role"
                            type="text"
                            variant="outlined"
                            value={role}
                            onChange={(e) => setFieldValue("role", e.target.value)}
                        >
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                states && states.map((state) =>
                                    <MenuItem name="state" key={state.id} value={state.state}>
                                        {state.state}
                                    </MenuItem>
                                )
                            } */}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container justify="space-between" className="mb-10 mt-5 ml-1 flex-nowrap">
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            id="gender"
                            select
                            name="gender"
                            label="Gender"
                            type="text"
                            variant="outlined"
                            value={gender}
                            onChange={(e) => setFieldValue("gender", e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                genders && genders.map((gander) =>
                                    <MenuItem name="state" key={gander} value={gander}>
                                        {gander}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            id="status"
                            select
                            name="status"
                            label="Status"
                            type="text"
                            variant="outlined"
                            value={status}
                            fullWidth
                            onChange={(e) => setFieldValue("status", e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                statuses && statuses.map((status) =>
                                    <MenuItem name="status" key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mb-10 mt-5 ml-1 flex-nowrap">
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            id="contactNumber"
                            name="contactNumber"
                            label="Contact Number"
                            type="text"
                            variant="outlined"
                            value={contactNumber}
                            helperText={touched.contactNumber ? errors.contactNumber : ""}
                            error={touched.contactNumber && Boolean(errors.contactNumber)}
                            onChange={change.bind(null, "contactNumber")}
                        />

                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.inputField}
                            id="mappedStore"
                            name="mappedStore"
                            label="Mapped Store"
                            type="text"
                            variant="outlined"
                            value={mappedStore}
                            fullWidth
                            onChange={(e) => setFieldValue("mappedStore", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="center" className="mb-10 mt-5 ml-1 flex-nowrap">
                    <Grid container item sm={11} spacing={2} className="flex">
                            <p className="mr-5">Age:</p>
                            <OutlinedInput
                                id="ageFrom"
                                name="ageFrom"
                                type="number"
                                value={ageFrom}
                                onChange={(e) => setFieldValue("ageFrom", e.target.value)}
                                className={classes.shortField}
                            />
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={handleAgeChange}
                                valueLabelDisplay="auto"
                                className={classes.slider}
                            />
                            <OutlinedInput
                                id="ageTo"
                                name="ageTo"
                                type="number"
                                value={ageTo}
                                onChange={(e) => setFieldValue("ageTo", e.target.value)}
                                className={classes.shortField}
                            />
                    </Grid>
                </Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between" className="mb-2 mt-5 flex-nowrap">
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            className={classes.inputField}
                            inputVariant="outlined"
                            id="mui-pickers-date1"
                            label="From Date"
                            format="dd MMM yyyy"
                            name="from"
                            disableFuture={true}
                            maxDate={Date.now()}
                            value={from}
                            onChange={(e)=>{setFieldValue("from", e); setFieldTouched("from", true)}}
                            KeyboardButtonProps={{
                                'aria-label': 'From',
                            }}
                        />
                        <KeyboardDatePicker
                            autoOk
                            className={classes.inputField}
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date2"
                            format="dd MMM yyyy"
                            label="To Date"
                            disableFuture={true}
                            minDate={from}
                            value={to}
                            name="to"
                            onChange={(e)=>{setFieldValue("to", e); setFieldTouched("to", true)}}
                            KeyboardButtonProps={{
                                'aria-label': 'To',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </form>
        </FormikProvider>
    );
};

export default UsersFilterPopup;
