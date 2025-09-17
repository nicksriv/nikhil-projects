import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, MenuItem, Icon } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import MultiSelectSearch from 'app/components/Multiselect/MultiSelectSearch'
import { setVendorDetailFilter } from 'app/redux/VendorManagement/VendorManagementSlice'

const useStyles = makeStyles((theme) => ({
    filterWrap: {
        width: '432px',
        // minHeight: '500px',
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
    adornedEnd: {
        paddingRight: '0',
    },
}))

function FilterPopup({ chipInfo, close, initialValue }) {
    const classes = useStyles()
    const validationSchema = Yup.object({})
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {},
    })

    useEffect(() => {
        dispatch({ type: 'getStatesDataAction' })
    }, [])
    useEffect(() => {
        dispatch({ type: 'getSkillsListAction' })
    }, [])

    return (
        <Grid className={classes.filterWrap}>
            <Grid
                className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}
            >
                <p className="text-black text-16">Filter</p>
                <CloseIcon
                    className="text-black cursor-pointer"
                    onClick={close}
                />
            </Grid>
            <Form formik={formik} close={close} />
        </Grid>
    )
}

const Form = ({ formik, close }) => {
    const {
        values: { vendorName, vendorRefNo, status, state, skills, from, to },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = formik

    const classes = useStyles()
    const { states } = useSelector((state) => state.clients)
    const { skillsList } = useSelector((state) => state.jobManagement)
    const dispatch = useDispatch()
    const change = (name, e) => {
        e.persist()
        handleChange(e)
        setFieldTouched(name, true, false)
    }
    const onSkillsChange = (name, e, value = []) => {
        setFieldValue('skills', value)
    }
    const applyFilter = () => {
        const payload = JSON.parse(JSON.stringify(formik.values))
        payload['skills'] = payload['skills']
            ? payload['skills'].map((d) => d.name).join()
            : null
        dispatch({ type: setVendorDetailFilter.type, payload: formik.values })
        close()
    }

    const resetForm = () => {
        formik.resetForm({
            vendorName: '',
            vendorRefNo: '',
            status: '',
            from: null,
            to: null,
        })
        dispatch({
            type: setVendorDetailFilter.type,
            payload: {
                vendorName: '',
                vendorRefNo: '',
                status: '',
                from: null,
                to: null,
            },
        })
    }
    const vendorStatus = [
        {
            id: 0,
            name: 'INACTIVE',
        },
        {
            id: 1,
            name: 'ACTIVE',
        },
    ]

    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                {/* <ThemeProvider theme={custom}> */}
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="vendorName"
                            name="vendorName"
                            helperText={
                                touched.vendorName ? errors.vendorName : ''
                            }
                            error={
                                touched.vendorName && Boolean(errors.vendorName)
                            }
                            label="Vendor Name"
                            type="text"
                            value={vendorName}
                            onChange={change.bind(null, 'vendorName')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="vendorRefNo"
                            name="vendorRefNo"
                            helperText={
                                touched.vendorRefNo ? errors.vendorRefNo : ''
                            }
                            error={
                                touched.vendorRefNo &&
                                Boolean(errors.vendorRefNo)
                            }
                            label="Vendor Refno"
                            type="text"
                            value={vendorRefNo}
                            onChange={change.bind(null, 'vendorRefNo')}
                            fullWidth
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
                            onChange={(e) =>
                                setFieldValue('state', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {states &&
                                states.map((state) => (
                                    <MenuItem
                                        name="state"
                                        key={state.id}
                                        value={state.name}
                                    >
                                        {state.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="status"
                            select
                            name="status"
                            label="Vendor Status"
                            type="text"
                            variant="outlined"
                            value={status}
                            onChange={(e) =>
                                setFieldValue('status', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {vendorStatus &&
                                vendorStatus.map((vs) => (
                                    <MenuItem
                                        name="jobStatus"
                                        key={vs.id}
                                        value={vs.name}
                                    >
                                        {vs.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                        container
                        justify="space-between"
                        className="mt-5 mb-10"
                    >
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date1"
                            label="created from"
                            format="dd MMM yyyy"
                            name="from"
                            maxDate={Date.now()}
                            value={from}
                            disableFuture={true}
                            onChange={(e) => {
                                setFieldValue('from', e)
                                setFieldTouched('from', true)
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'From',
                            }}
                            InputProps={{
                                endAdornment: <Icon>date_range</Icon>,
                                classes: {
                                    adornedEnd: classes.adornedEnd,
                                },
                            }}
                            keyboardIcon={<Icon>date_range</Icon>}
                            className={classes.inputField}
                        />
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            id="mui-pickers-date2"
                            format="dd MMM yyyy"
                            label="created to"
                            value={to}
                            name="to"
                            minDate={from}
                            disableFuture={true}
                            onChange={(e) => {
                                setFieldValue('to', e)
                                setFieldTouched('to', true)
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'To',
                            }}
                            keyboardIcon={<Icon>date_range</Icon>}
                            className={classes.inputField}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <Grid className="mt-8 pb-2 flex justify-end">
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
    )
}

export default FilterPopup
