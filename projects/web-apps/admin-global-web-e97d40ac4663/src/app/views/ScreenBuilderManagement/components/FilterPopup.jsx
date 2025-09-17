import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, MenuItem, FormControl, Select, InputLabel, Icon } from '@material-ui/core'
import { FormikProvider } from 'formik'
import * as Yup from 'yup'
import CloseIcon from '@material-ui/icons/Close'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { setModuleFilterDetails } from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice'

const useStyles = makeStyles((theme) => ({
    filterWrap: {
        width: '432px',
        minHeight: '328px',
        top: '0',
        background:
            'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        // background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: '0px 3px 24px #0000003D',
        borderRadius: '2px',
        opacity: 1,
        zIndex: 99999,
    },
    inputField: {
        width: '190px',
    },
    popOverHeader: {
        height: '50px',
    },
    select: {
        position: 'absolute',
        left: '12px',
        top: '-8px',
    },
    adornedEnd: {
        paddingRight: "0"
    }
}))

function FilterPopup({ chipInfo, close }) {
    const classes = useStyles();
    const { moduleFilterDetails } = useSelector((state) => state.screenBuilder);
    const validationSchema = Yup.object({});
    const dispatch = useDispatch();
    const [ moduleFilterDetailsCopy, setModuleFilterDetailsCopy ] = useState(moduleFilterDetails);
    //const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: moduleFilterDetailsCopy,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
    })

    useEffect(() => {
        setModuleFilterDetailsCopy({...moduleFilterDetails});
    }, [moduleFilterDetails]);

    useEffect(()=> {
        formik.setValues(moduleFilterDetailsCopy)
    }, [moduleFilterDetailsCopy]);
    
    // const applyFilter = () => {
    //     dispatch({ type: setModuleFilterDetails.type, payload: formik.values })
    //     close()
    // }

    const closePopup = () => {
        close();
    }
    return (
        <Grid className={classes.filterWrap}>
            <Grid
                className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}>
                <p className="text-16">Filter</p>
                <CloseIcon
                    className="cursor-pointer"
                    onClick={close}
                />
            </Grid>
            <Form formik={formik} close={close} setModuleFilterDetailsCopy={setModuleFilterDetailsCopy}/>
        </Grid>
    )
}

const Form = ({ formik, close, setModuleFilterDetailsCopy }) => {
    const {
        values: { moduleName,
            //parentModuleName,
            //rolesMapped,
            status,
            from,
            to 
        },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = formik;
    const classes = useStyles();
    const { statuses } = useSelector((state) => state.screenBuilder);
    const dispatch = useDispatch();

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    }

    const applyFilter = () => {
        dispatch({ type: setModuleFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        let initialData = {
            moduleName: '',
            //parentModuleName: '',
            //rolesMapped: '',
            status: '',
            from: null,
            to: null
        }
        formik.resetForm(initialData);

        setModuleFilterDetailsCopy(initialData);
    }

    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="moduleName"
                            name="moduleName"
                            helperText={
                                touched.moduleName ? errors.moduleName : ''
                            }
                            error={
                                touched.moduleName && Boolean(errors.moduleName)
                            }
                            label="Module Name"
                            value={moduleName}
                            onChange={change.bind(null, 'moduleName')}
                            className={`${classes.inputField} `}
                        />
                    </Grid>
                    {/* <Grid item>
                        <TextField
                            variant="outlined"
                            id="parentModuleName"
                            name="parentModuleName"
                            select
                            helperText={
                                touched.parentModuleName
                                    ? errors.parentModuleName
                                    : ''
                            }
                            error={
                                touched.parentModuleName &&
                                Boolean(errors.parentModuleName)
                            }
                            label="Sub Module Name"
                            value={parentModuleName}
                            onChange={change.bind(null, 'parentModuleName')}
                            className={classes.inputField}
                        >
                            <MenuItem></MenuItem>
                        </TextField>
                    </Grid> */}
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel className={classes.select} >Status</InputLabel>
                            <Select
                                id="status"
                                select
                                name="status"
                                label="Status"
                                type="text"
                                variant="outlined"
                                value={status}
                                fullWidth
                                className={classes.inputField}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                                onChange={(e) =>
                                    setFieldValue('status', e.target.value)
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {statuses &&
                                    statuses.map((state) => (
                                        <MenuItem
                                            name="status"
                                            key={state}
                                            value={state}
                                        >
                                            {state}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* <Grid container justify="space-between" className="mt-5 mb-10">
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel className={classes.select} >Status</InputLabel>
                            <Select
                                id="status"
                                select
                                name="status"
                                label="Status"
                                type="text"
                                variant="outlined"
                                value={status}
                                fullWidth
                                className={classes.inputField}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                                onChange={(e) =>
                                    setFieldValue('status', e.target.value)
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {statuses &&
                                    statuses.map((state) => (
                                        <MenuItem
                                            name="status"
                                            key={state}
                                            value={state}
                                        >
                                            {state}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid> */}
                <Grid container justify="space-between" className="mt-5 mb-10">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container justify="space-between">
                            {/* <ThemeProvider theme={custom}> */}
                            <KeyboardDatePicker
                                variant="inline"
                                autoOk
                                inputVariant="outlined"
                                id="mui-pickers-date1"
                                label="Created Date From"
                                format="dd MMM yyyy"
                                name="from"
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
                                PopoverProps={{
                                    anchorOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    }
                                }}
                                keyboardIcon={<Icon >date_range</Icon>}
                                className={classes.inputField}
                            />
                            <KeyboardDatePicker
                                variant="inline"
                                autoOk
                                inputVariant="outlined"
                                id="mui-pickers-date2"
                                format="dd MMM yyyy"
                                label="Created Date To"
                                value={to}
                                disableFuture={true}
                                name="to"
                                onChange={(e) => { setFieldValue("to", e); setFieldTouched("to", true) }}
                                KeyboardButtonProps={{
                                    'aria-label': 'To',
                                }}
                                keyboardIcon={<Icon>date_range</Icon>}
                                className={classes.inputField}
                                minDate={from}
                            />
                            {/* </ThemeProvider> */}

                        </Grid>
                    </MuiPickersUtilsProvider>
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
                        disabled={!formik.isValid}
                        className="w-100 ml-5 bg-primary text-black"
                        onClick={applyFilter}
                    >
                        APPLY
                    </Button>
                </Grid>
            </form>
        </FormikProvider>
    )
}

export default FilterPopup;
