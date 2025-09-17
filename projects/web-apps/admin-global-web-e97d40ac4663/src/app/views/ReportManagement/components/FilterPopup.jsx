import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, MenuItem } from '@material-ui/core';
import { FormikProvider } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setReportFilterDetails } from 'app/redux/ReportManagement/reportManagementSlice';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';


// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// })

const useStyles = makeStyles((theme) => ({

    filterWrap: {
        width: '432px',
        minHeight: '450px',
        top: "0",
        background: "var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box",
        // background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 3px 24px #0000003D",
        borderRadius: "2px",
        opacity: 1,
        zIndex: 99999
    },
    inputField: {
        width: "190px",
    },
    popOverHeader: {
        height: "50px"
    },
    adornedEnd: {
        paddingRight: "0"
    }
}))
// const materialTheme = createMuiTheme({
//     overrides: {
//         MuiPickersToolbar: {
//             toolbar: {
//                 backgroundColor: "#2C3E93",
//             },
//         },
//         MuiPickersCalendarHeader: {
//             switchHeader: {
//                 backgroundColor: "white",
//                 color: "#2C3E93",
//             },
//         },
//         MuiPickersDay: {
//             daySelected: {
//                 backgroundColor: "#2C3E93"
//             }
//         },

//     },
// });

function FilterPopup({ chipInfo, close }) {
    const classes = useStyles();
    //const { clientFilterDetails } = useSelector((state) => state.clients);
    const { reportFilterDetails } = useSelector((state)=> state.report);
    const validationSchema = Yup.object({})
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: reportFilterDetails,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
        }
    });

    useEffect(() => {
        dispatch({ type: 'getStatesCitiesMasterAction' });
    }, []);
    
    return (
        <Grid className={classes.filterWrap}>
            <Grid className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}>
                <p className="text-white text-16">Filter</p>
                <CloseIcon className="text-white cursor-pointer" onClick={close} />
            </Grid>
            <Form formik={formik} close={close} />
        </Grid>
    )
}
const Form = ({ formik, close }) => {
    const {
        values: { name, moduleId, status },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue
    } = formik;
    const classes = useStyles();
    const {  statuses, moduleList
        // clientFilterDetails
    } = useSelector((state) => state.report);
    const dispatch = useDispatch();

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const applyFilter = () => {
        dispatch({ type: setReportFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        console.log(moduleList)
        formik.resetForm(
            {  name: '', moduleId: '', status: '' }
        );
        dispatch({ type: setReportFilterDetails.type, payload: { name: '', moduleId: '', status: '' } });
    }
    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                {/* <ThemeProvider theme={custom}> */}
                <Grid container justify="space-between" className="mb-10 mt-5">
                <Grid item>
                        <TextField
                            variant="outlined"
                            id="name"
                            name="name"
                            helperText={touched.name ? errors.name : ""}
                            error={touched.name && Boolean(errors.name)}
                            label="Report Name"
                            type="text"
                            value={name}
                            onChange={change.bind(null, "name")}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>

                {/* <Grid item>
                        <TextField
                            variant="outlined"
                            id="moduleId"
                            name="moduleId"
                            helperText={touched.moduleId ? errors.moduleId : ""}
                            error={touched.moduleId && Boolean(errors.moduleId)}
                            label="Parent Module Name"
                            type="text"
                            value={moduleId}
                            onChange={change.bind(null, "moduleId")}
                            fullWidth
                            className={classes.inputField}
                        />
                </Grid> */}

                    <Grid item>
                        <TextField
                            id="moduleId"
                            select
                            name="moduleId"
                            label="Parent Module Name"
                            type="text"
                            variant="outlined"
                            value={moduleId}
                            onChange={(e) => 
                                 setFieldValue("moduleId", e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                moduleList && moduleList.map((state) =>
                                    <MenuItem name={state.name} key={state.id} value={state.id}>
                                        {state.name}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>

                </Grid>

                <Grid container justify="space-between" className="mt-5 mb-10">
                    <Grid item>
                        <TextField
                            id="status"
                            select
                            name="status"
                            label="Status"
                            type="text"
                            variant="outlined"
                            value={status}
                            fullWidth
                            className={classes.inputField}
                            onChange={(e) => setFieldValue("status", e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                statuses && statuses.map((state) =>
                                    <MenuItem name="status" key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                </Grid>


                {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container justify="space-between" className="mt-5 mb-10">
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date1"
                            label="Joining date from"
                            format="dd MMM yyyy"
                            name="from"
                            value={from}

                            onChange={(e) => { setFieldValue("from", e); setFieldTouched("from", true) }}
                            KeyboardButtonProps={{
                                'aria-label': 'From',
                            }}
                            InputProps={{
                                endAdornment:
                                    <Icon >date_range</Icon>,
                                classes: {
                                    adornedEnd: classes.adornedEnd
                                }
                            }}
                            keyboardIcon={<Icon >date_range</Icon>}

                            className={classes.inputField}
                        />
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date2"
                            format="dd MMM yyyy"
                            label="Joining date to"
                            value={to}
                            name="to"
                            onChange={(e) => { setFieldValue("to", e); setFieldTouched("to", true) }}
                            KeyboardButtonProps={{
                                'aria-label': 'To',
                            }}
                            keyboardIcon={<Icon>date_range</Icon>}
                            className={classes.inputField}
                        />

                    </Grid>
                </MuiPickersUtilsProvider> */}

                <Grid className="flex justify-end" style={{marginTop: '10rem'}}>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        disabled={!isValid}
                        className="w-100 color-primary border-primary"
                        onClick={resetForm}
                    >
                        CLEAR
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        disabled={!isValid}
                        className="w-100 ml-5 bg-primary text-white"
                        onClick={applyFilter}
                    >
                        APPLY
                    </Button>
                </Grid>
                {/* </ThemeProvider> */}
            </form>
        </FormikProvider>
    );
};

export default FilterPopup;
