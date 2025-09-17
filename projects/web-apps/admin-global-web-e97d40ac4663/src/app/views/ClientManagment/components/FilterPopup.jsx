import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, MenuItem, Icon } from '@material-ui/core';
//import { ThemeProvider,createTheme, createMuiTheme } from "@material-ui/core/styles";
import { FormikProvider } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';


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
        minHeight: "500px",
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
    const { clientFilterDetails } = useSelector((state) => state.clients);
    const validationSchema = Yup.object({})
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: clientFilterDetails,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
        }
    });

    useEffect(()=>{
        dispatch({ type: 'getStatesDataAction' });
    },[]);

    return (
        <Grid className={classes.filterWrap}>
            <Grid className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}>
                <p className="text-black text-16">Filter</p>
                <CloseIcon className="text-black cursor-pointer" onClick={close} />
            </Grid>
            <Form formik={formik} close={close}/>
        </Grid>
    )
}

const Form = ({formik, close}) => {
    const {
        values: { clientName, clientId,state , area,status, from, to },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue
        } = formik;
    const classes = useStyles();
    const { states, statuses,
        // clientFilterDetails
    } = useSelector((state) => state.clients);
    const dispatch = useDispatch();
    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const applyFilter = () => {
        dispatch({ type: setClientFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        formik.resetForm(
            { clientName: '', clientId: '',area:'' , state: '', status: '', from: null, to: null  }
        );
        dispatch({ type: setClientFilterDetails.type, payload: { clientName: '', clientId: '', area: '', state: '',status: '', from: null, to: null  } });
    }
    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                {/* <ThemeProvider theme={custom}> */}
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="clientName"
                            name="clientName"
                            helperText={touched.clientName ? errors.clientName : ""}
                            error={touched.clientName && Boolean(errors.clientName)}
                            label="Client Name"
                            type="text"
                            value={clientName}
                            onChange={change.bind(null, "clientName")}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="clientId"
                            name="clientId"
                            helperText={touched.clientId ? errors.clientId : ""}
                            error={touched.clientId && Boolean(errors.clientId)}
                            label="Client ID"
                            value={clientId}
                            onChange={change.bind(null, "clientId")}
                            className={classes.inputField}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="space-between" className="mt-5 mb-10">
                <Grid item>
                        <TextField
                            id="state"
                            select
                            name="state"
                            label="State"
                            type="text"
                            variant="outlined"
                            value={state}
                            onChange={(e)=>setFieldValue("state", e.target.value)}
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                states && states.map((state) =>
                                    <MenuItem name="state" key={state.id} value={state.name}>
                                        {state.name}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="area"
                            name="area"
                            helperText={touched.area ? errors.area : ""}
                            error={touched.area && Boolean(errors.area)}
                            label="Area"
                            type="text"
                            value={area}
                            onChange={change.bind(null, "area")}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    
                </Grid>

                

                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container justify="space-between" className="mt-5 mb-10">
                            {/* <ThemeProvider theme={custom}> */}
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date1"
                            label="Joining date from"
                            format="dd MMM yyyy"
                            name="from"
                            maxDate={Date.now()}
                            value={from}
                            disableFuture={true}
                            onChange={(e)=>{setFieldValue("from", e); setFieldTouched("from", true)}}
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
                            minDate={from}
                            disableFuture={true}
                            onChange={(e)=>{setFieldValue("to", e); setFieldTouched("to", true)}}
                            KeyboardButtonProps={{
                                'aria-label': 'To',
                            }}
                                    keyboardIcon={<Icon>date_range</Icon>}
                            className={classes.inputField}
                        />
                        {/* </ThemeProvider> */}

                    </Grid>
                </MuiPickersUtilsProvider>
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
                            onChange={(e)=>setFieldValue("status", e.target.value)}
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
                <Grid className="mt-8 flex justify-end">
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
                            className="w-100 ml-5 bg-primary text-black"
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
