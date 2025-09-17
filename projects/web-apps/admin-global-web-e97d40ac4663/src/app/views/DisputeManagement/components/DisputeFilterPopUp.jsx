import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, MenuItem, Icon } from '@material-ui/core'
import { FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { setDisputeFilterDetails } from 'app/redux/DisputeManagement/DisputeManagementSlice'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
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

function DisputeFilterPopUp({ chipInfo, close  }) {
    
    const classes = useStyles()
    const { disputeFilterDetails } = useSelector((state) => state.disputeManagement)
    const validationSchema = Yup.object({})
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: disputeFilterDetails,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
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
        values: {
            disputeRefNo,
            clientId,
            userType,
            disputeStatus,
            from,
            to
        },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = formik
    const [activeClients, setActiveClients] = useState([]);
    const { activeClientsList } = useSelector((state) => state.clients);
    useEffect(() => {
        if (activeClientsList && activeClientsList.length) {
            let listOfActiveClients = activeClientsList.filter((client) => {
                return client.status.toLowerCase() === "active"
            });
             setActiveClients(listOfActiveClients);
       }
    },[])
    const classes = useStyles()
    const { states } = useSelector((state) => state.clients)
    const dispatch = useDispatch()
    const change = (name, e) => {
        e.persist()
        handleChange(e)
        setFieldTouched(name, true, false)
    }

    const applyFilter = () => {
        dispatch({ type: setDisputeFilterDetails.type, payload: formik.values })
        close()
    }

    const resetForm = () => {
        formik.resetForm({
            disputeRefNo: '',
            clientId:'',
            userType:'',
            disputeStatus: '',
            from: null,
            to: null,
        })
        dispatch({
            type: setDisputeFilterDetails.type,
            payload: {
                disputeRefNo: '',
                clientId:'',
                userType,
                disputeStatus: '',
                from: null,
                to: null,
            },
        })
    }

    const disputeStatusDropDown = [
        {
            id: 0,
            name: 'NEW',
        },
        {
            id: 1,
            name: 'INREVIEW',
        },
        {
            id: 1,
            name: 'CLOSED',
        },
    ]

    const userTypeDropDown = [
        {
            id: 0,
            name: 'FREELANCER',
        },
        {
            id: 1,
            name: 'VENDOR',
        }
    ]
    return (
        <FormikProvider value={formik}>
            <form className="px-4">
                {/* <ThemeProvider theme={custom}> */}
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="disputeRefNo"
                            name="disputeRefNo"
                            helperText={touched.disputeRefNo ? errors.disputeRefNo : ''}
                            error={touched.disputeRefNo && Boolean(errors.disputeRefNo)}
                            label="Dispute Ref No"
                            type="text"
                            value={disputeRefNo}
                            onChange={change.bind(null, 'disputeRefNo')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="clientName"
                            select
                            name="clientId"
                            label="Client Name"
                            type="text"
                            variant="outlined"
                            value={clientId}
                            onChange={(e) =>
                                setFieldValue('clientId', e.target.value)
                            }
                            className={classes.inputField}
                        >
                             {activeClients &&
                                activeClients.map((client) => (
                                    <MenuItem
                                        name="client"
                                        key={client.id}
                                        value={client.id}
                                    >
                                        {client.clientName}
                                    </MenuItem>
                                ))}


                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            id="disputeStatus"
                            select
                            name="disputeStatus"
                            label="DisputeStatus"
                            type="text"
                            variant="outlined"
                            value={disputeStatus}
                            onChange={(e) =>
                                setFieldValue('disputeStatus', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>
                            {disputeStatusDropDown &&
                                disputeStatusDropDown.map((status) => (
                                    <MenuItem
                                        name="status"
                                        key={status.id}
                                        value={status.name}
                                    >
                                        {status.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="userType"
                            select
                            name="userType"
                            label="UserType"
                            type="text"
                            variant="outlined"
                            value={userType}
                            onChange={(e) =>
                                setFieldValue('userType', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>
                            {userTypeDropDown &&
                                userTypeDropDown.map((user) => (
                                    <MenuItem
                                        name="user"
                                        key={user.id}
                                        value={user.name}
                                    >
                                        {user.name}
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
                            label="Raised from"
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
                            label="Raised to"
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

export default DisputeFilterPopUp
