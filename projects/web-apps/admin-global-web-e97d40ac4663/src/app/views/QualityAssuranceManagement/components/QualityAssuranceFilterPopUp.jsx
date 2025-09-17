import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, MenuItem, Icon } from '@material-ui/core'
import { FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { setQualityAssuranceFilterDetails } from 'app/redux/QualityAssuranceManagement/QualityAssuranceManagementSlice'

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

function QualityAssuranceFilterPopUp({ chipInfo, close }) {
    const classes = useStyles()
    const { qualityAssuranceFilterDetails } = useSelector((state) => state.qualityAssuranceManagement)
    const validationSchema = Yup.object({})
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: qualityAssuranceFilterDetails,
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
            firstName,
            lastName,
            email,
            mobile,
            qualityControllerStatus,
            qualityAssuranceRefNo
        },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = formik

    const classes = useStyles()
    //const { states } = useSelector((state) => state.clients)
    const dispatch = useDispatch()
    const change = (name, e) => {
        e.persist()
        handleChange(e)
        setFieldTouched(name, true, false)
    }
    const applyFilter = () => {
        dispatch({ type: setQualityAssuranceFilterDetails.type, payload: formik.values })
        close()
    }
    const resetForm = () => {
        formik.resetForm({
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            qualityControllerStatus: '',
            qualityAssuranceRefNo: ''
        })
        dispatch({
            type: setQualityAssuranceFilterDetails.type,
            payload: {
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                qualityControllerStatus: '',
                qualityAssuranceRefNo: ''
            },
        })
    }
    const qualityAssuranceStatusDropDown = [
        {
            id: 0,
            name: 'ACTIVE',
        },
        {
            id: 1,
            name: 'INACTIVE',
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
                            id="firstName"
                            name="firstName"
                            helperText={touched.firstName ? errors.firstName : ''}
                            error={touched.firstName && Boolean(errors.firstName)}
                            label="First Name"
                            type="text"
                            value={firstName}
                            onChange={change.bind(null, 'firstName')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="lastName"
                            name="lastName"
                            helperText={touched.lastName ? errors.lastName : ''}
                            error={touched.lastName && Boolean(errors.lastName)}
                            label="Last Name"
                            type="text"
                            value={lastName}
                            onChange={change.bind(null, 'lastName')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>

                </Grid>
                <Grid container justify="space-between" className="mb-10 mt-5">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="qualityAssuranceRefNo"
                            name="qualityAssuranceRefNo"
                            helperText={touched.qualityAssuranceRefNo ? errors.qualityAssuranceRefNo : ''}
                            error={touched.qualityAssuranceRefNo && Boolean(errors.qualityAssuranceRefNo)}
                            label="QA Ref No"
                            type="text"
                            value={qualityAssuranceRefNo}
                            onChange={change.bind(null, 'qualityAssuranceRefNo')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="qualityControllerStatus"
                            select
                            name="qualityControllerStatus"
                            label="QA Status"
                            type="text"
                            variant="outlined"
                            value={qualityControllerStatus}
                            onChange={(e) =>
                                setFieldValue('qualityControllerStatus', e.target.value)
                            }
                            className={classes.inputField}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>
                            {qualityAssuranceStatusDropDown &&
                                qualityAssuranceStatusDropDown.map((status) => (
                                    <MenuItem
                                        name="qualityControllerStatus"
                                        key={status.id}
                                        value={status.name}
                                    >
                                        {status.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" className="mt-5 mb-10">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="email"
                            name="email"
                            helperText={touched.email ? errors.email : ''}
                            error={touched.email && Boolean(errors.email)}
                            label="Email"
                            type="text"
                            value={email}
                            onChange={change.bind(null, 'email')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="mobile"
                            name="mobile"
                            helperText={touched.mobile ? errors.mobile : ''}
                            error={touched.mobile && Boolean(errors.mobile)}
                            label="Mobile"
                            type="text"
                            value={mobile}
                            onChange={change.bind(null, 'mobile')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                </Grid>
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

export default QualityAssuranceFilterPopUp
