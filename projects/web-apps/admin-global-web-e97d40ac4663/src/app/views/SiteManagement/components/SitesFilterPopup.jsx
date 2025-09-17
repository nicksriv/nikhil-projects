import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, MenuItem, Icon } from '@material-ui/core';
import { FormikProvider } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setSiteFilterDetails } from 'app/redux/SiteManagement/siteManagementSlice';
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

function SitesFilterPopup({ chipInfo, close }) {
    const classes = useStyles();
    const { siteFilterDetails } = useSelector((state) => state.sites);
    const validationSchema = Yup.object({})
    const formik = useFormik({
        initialValues: siteFilterDetails,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
        }
    });

    useEffect(()=>{
        // dispatch({ type: 'getStatesCitiesMasterAction' });
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

const Form = ({ formik, close }) => {
    const {
        values: { 
            siteId,
            name,
            type,
            state,
            city,
            status,
            from,
            to
        },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue
        } = formik;
    const classes = useStyles();
    const { states, statuses, cities, types } = useSelector((state) => state.sites);
    const dispatch = useDispatch();

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const applyFilter = () => {
        dispatch({ type: setSiteFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        formik.resetForm(
            { 
                siteId : "",
                name: "",
                type: "",
                state:"",
                city:"",
                status: "",
                from: null,
                to: null
            }
        );
        dispatch({
            type: setSiteFilterDetails.type, payload: {
                siteId: "",
                name: "",
                type: "",
                state: "",
                city: "",
                status: "",
                from: null,
                to: null
            }
        });
    }
    const handleStateChange = (e) => {
        const { value } = e.target;
        setFieldValue("state", value);
        dispatch({ type: "setFilterCitiesAction", payload: { value } })
    }
    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                {/* <ThemeProvider theme={custom}> */}
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="siteId"
                            name="siteId"
                            helperText={touched.siteId ? errors.siteId : ""}
                            error={touched.siteId && Boolean(errors.siteId)}
                            label="Site ID"
                            value={siteId}
                            onChange={change.bind(null, "siteId")}
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="siteName"
                            name="name"
                            label="Site Name"
                            type="text"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setFieldValue("name", e.target.value)}
                            className={classes.inputField}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="space-between" className="mt-5 mb-8">
                    <Grid item>
                        <TextField
                            id="siteType"
                            select
                            name="type"
                            label="Site Type"
                            type="text"
                            variant="outlined"
                            value={type}
                            onChange={(e) => setFieldValue("type", e.target.value)}
                            className={classes.inputField}
                        >
                            {
                                types && types.map((type) =>
                                    <MenuItem name="type" value={type}>
                                        {type}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="state"
                            select
                            name="state"
                            label="State"
                            type="text"
                            variant="outlined"
                            value={state}
                            onChange={(e) => handleStateChange(e)}
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                states && states.map((state) =>
                                    <MenuItem name="state" key={state.id} value={state.state}>
                                        {state.state}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mt-5 mb-8">
                    <Grid item>
                        <TextField
                            id="city"
                            select
                            name="city"
                            label="City"
                            type="text"
                            variant="outlined"
                            value={city}
                            onChange={(e)=>setFieldValue("city", e.target.value)}
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cities.map((item) => <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>)}
                        </TextField>
                    </Grid>
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
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container justify="space-between" className="mt-5 mb-8">
                        <KeyboardDatePicker
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date1"
                            label="Created date from"
                            format="dd MMM yyyy"
                            name="from"
                            disableFuture={true}
                            maxDate={Date.now()}
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
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date2"
                            format="dd MMM yyyy"
                            label="Created date to"
                            value={to}
                            name="to"
                            disableFuture={true}
                            minDate={from}
                            onChange={(e) => { setFieldValue("to", e); setFieldTouched("to", true) }}
                            KeyboardButtonProps={{
                                'aria-label': 'To',
                            }}
                            keyboardIcon={<Icon>date_range</Icon>}
                            className={classes.inputField}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
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

export default SitesFilterPopup;
