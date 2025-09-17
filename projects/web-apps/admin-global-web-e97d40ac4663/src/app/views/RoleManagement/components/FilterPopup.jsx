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
import { setRoleFilterDetails } from 'app/redux/RoleManagement/roleManagementSlice'

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
    },
    menuPaper: {
        maxHeight: "200px"
    }
}))

function FilterPopup({ chipInfo, close }) {
    const classes = useStyles();
    const { roleFilterDetails } = useSelector((state) => state.roles);
    const validationSchema = Yup.object({});
    const dispatch = useDispatch();
    const [moduleFilterDetailsCopy, setModuleFilterDetailsCopy] = useState(roleFilterDetails);
    //const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: moduleFilterDetailsCopy,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
    })

    useEffect(() => {
        setModuleFilterDetailsCopy({ ...roleFilterDetails });
    }, [roleFilterDetails]);

    useEffect(() => {
        formik.setValues(moduleFilterDetailsCopy)
    }, [moduleFilterDetailsCopy]);

    // const applyFilter = () => {
    //     dispatch({ type: setRoleFilterDetails.type, payload: formik.values })
    //     close()
    // }

    const closePopup = () => {
        close();
    }
    return (
        <Grid className={classes.filterWrap}>
            <Grid
                className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}>
                <p className="text-black text-16">Filter</p>
                <CloseIcon
                    className="text-black cursor-pointer"
                    onClick={closePopup}
                />
            </Grid>
            <Form formik={formik} close={close} setModuleFilterDetailsCopy={setModuleFilterDetailsCopy} />
        </Grid>
    )
}

const Form = ({ formik, close, setModuleFilterDetailsCopy }) => {
    const {
        values: {
            roleName,
            modules,
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
    const { statuses, modulesList } = useSelector((state) => state.roles);
    const dispatch = useDispatch();
    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    }

    const applyFilter = () => {
        dispatch({ type: setRoleFilterDetails.type, payload: formik.values });
        close();
    }

    const resetForm = () => {
        formik.resetForm(
            { roleName: '', status: '', from: null, to: null, modules: '' }
        );
        dispatch({ type: setRoleFilterDetails.type, payload: { roleName: '', status: '', from: null, to: null, modules: '' } });
    }

    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="roleName"
                            name="roleName"
                            helperText={
                                touched.roleName ? errors.roleName : ''
                            }
                            error={
                                touched.roleName && Boolean(errors.roleName)
                            }
                            label="Role Name"
                            value={roleName}
                            onChange={change.bind(null, 'roleName')}
                            className={`${classes.inputField} `}
                        />
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel className={classes.select} >Modules</InputLabel>
                            <Select
                                id="modules"
                                select
                                name="modules"
                                label="Modules"
                                type="text"
                                variant="outlined"
                                value={modules}
                                fullWidth
                                className={classes.inputField}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null,
                                    classes: { paper: classes.menuPaper }
                                }}
                                onChange={(e) =>
                                    setFieldValue('modules', e.target.value)
                                }
                            >
                                {modulesList.map((module) => {
                                    return <MenuItem value={module.name} key={module.id}>
                                        {module.name}
                                </MenuItem>
                                })}


                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mt-5 mb-10">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container justify="space-between">
                            {/* <ThemeProvider theme={custom}> */}
                            <KeyboardDatePicker
                                autoOk={true}
                                variant="inline"
                                inputVariant="outlined"
                                id="mui-pickers-date1"
                                label="Created Date From"
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
                                autoOk={true}
                                variant="inline"
                                inputVariant="outlined"
                                id="mui-pickers-date2"
                                format="dd MMM yyyy"
                                label="Created Date To"
                                value={to}
                                name="to"
                                onChange={(e) => { setFieldValue("to", e); setFieldTouched("to", true) }}
                                KeyboardButtonProps={{
                                    'aria-label': 'To',
                                }}
                                keyboardIcon={<Icon>date_range</Icon>}
                                className={classes.inputField}
                            />
                            {/* </ThemeProvider> */}

                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel className={classes.select} >Status</InputLabel>
                            <Select
                                id="status"
                                select
                                name="status"
                                label="status"
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

                <Grid className="mt-8 flex justify-end pb-5">
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
