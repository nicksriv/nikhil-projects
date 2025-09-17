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
import { setCandidateFilterDetails } from 'app/redux/JobManagement/JobManagementSlice'

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

function CandidateFilterPopup({ chipInfo, close }) {
    const classes = useStyles()
    const { candidateFilterDetails } = useSelector(
        (state) => state.jobManagement
    )
    const validationSchema = Yup.object({})

    const formik = useFormik({
        initialValues: candidateFilterDetails,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {},
    })

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
        values: { jobStatus, amountStatus, candidateName, userType, from, to },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = formik

    const classes = useStyles()
    const dispatch = useDispatch()
    const change = (name, e) => {
        e.persist()
        handleChange(e)
        setFieldTouched(name, true, false)
    }

    const applyFilter = () => {
        dispatch({
            type: setCandidateFilterDetails.type,
            payload: formik.values,
        })
        close()
    }

    const resetForm = () => {
        formik.resetForm({
            jobStatus: '',
            amountStatus: '',
            candidateName: '',
            userType: '',
            from: null,
            to: null,
        })
        dispatch({
            type: setCandidateFilterDetails.type,
            payload: {
                jobStatus: '',
                amountStatus: '',
                candidateName: '',
                userType: '',
                from: null,
                to: null,
            },
        })
    }
    const userTypeDropdownOptions = [
        {
            id: 0,
            name: 'FREELANCER',
        },
        {
            id: 1,
            name: 'VENDOR',
        },
    ]
    const jobStatusDropDownOptions = [
        {
            id: 0,
            name: 'NEW',
        },
        {
            id: 1,
            name: 'INPROGRESS',
        },
        {
            id: 3,
            name: 'COMPLETED',
        },
        {
            id: 4,
            name: 'CANCELLED',
        },
    ]
    const amountPaidDropDownOptions = [
        {
            id: 0,
            name: 'PAID',
        },
        {
            id: 0,
            name: 'PENDING',
        },
    ]
    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="candidateName"
                            name="candidateName"
                            helperText={
                                touched.candidateName
                                    ? errors.candidateName
                                    : ''
                            }
                            error={
                                touched.candidateName &&
                                Boolean(errors.candidateName)
                            }
                            label="Candidate Name"
                            type="text"
                            value={candidateName}
                            onChange={change.bind(null, 'candidateName')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="userType"
                            select
                            name="userType"
                            label="User Type"
                            type="text"
                            variant="outlined"
                            value={userType}
                            onChange={(e) =>
                                setFieldValue('userType', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {userTypeDropdownOptions &&
                                userTypeDropdownOptions.map((userType) => (
                                    <MenuItem
                                        name="userType"
                                        key={userType.id}
                                        value={userType.name}
                                    >
                                        {userType.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            id="jobStatus"
                            select
                            name="jobStatus"
                            label="Job Status"
                            type="text"
                            variant="outlined"
                            value={jobStatus}
                            onChange={(e) =>
                                setFieldValue('jobStatus', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {jobStatusDropDownOptions &&
                                jobStatusDropDownOptions.map((jobStatus) => (
                                    <MenuItem
                                        name="jobStatus"
                                        key={jobStatus.id}
                                        value={jobStatus.name}
                                    >
                                        {jobStatus.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="amountStatus"
                            select
                            name="amountStatus"
                            label="Amount Status"
                            type="text"
                            variant="outlined"
                            value={amountStatus}
                            onChange={(e) =>
                                setFieldValue('amountStatus', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {amountPaidDropDownOptions &&
                                amountPaidDropDownOptions.map(
                                    (amountStatus) => (
                                        <MenuItem
                                            name="amountStatus"
                                            key={amountStatus.id}
                                            value={amountStatus.name}
                                        >
                                            {amountStatus.name}
                                        </MenuItem>
                                    )
                                )}
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
                            label="Applied from"
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
                            label="Applied to"
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
            </form>
        </FormikProvider>
    )
}

export default CandidateFilterPopup
