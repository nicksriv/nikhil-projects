import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid } from '@material-ui/core'
import { FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { setVendorRegistrationDetailFilter } from 'app/redux/VendorRegistration/VendorRegistrationSlice'

const useStyles = makeStyles((theme) => ({
    filterWrap: {
        width: '432px',
        top: '0',
        background:
            'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
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

function VendorFilterPopup({ chipInfo, close, initialValue }) {
    const classes = useStyles()
    const validationSchema = Yup.object({})
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
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
        values: { vendorName,
            mobile,
            email },
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
        const payload = JSON.parse(formik.values)
        if (payload['skills']) {
            payload['skills'] = payload['skills'].map((d) => d.name).join()
        }
        else {
            payload['skills'] = null;
        }
        dispatch({ type: setVendorRegistrationDetailFilter.type, payload: formik.values })
        close()
    }

    const resetForm = () => {
        formik.resetForm({
            vendorName: '',
            mobile: '',
            email: '',
        })
        dispatch({
            type: setVendorRegistrationDetailFilter.type,
            payload: {
                vendorName: '',
                mobile: '',
                email: '',
            },
        })
    }

    return (
        <FormikProvider value={formik}>
            <form className="px-4">
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
                            id="email"
                            name="email"
                            helperText={
                                touched.email ? errors.email : ''
                            }
                            error={
                                touched.email &&
                                Boolean(errors.email)
                            }
                            label="Email"
                            type="text"
                            value={email}
                            onChange={change.bind(null, 'email')}
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>


                </Grid>


                <Grid container justify="space-between" className="mb-10 mt-5">

                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="mobile"
                            name="mobile"
                            helperText={
                                touched.mobile ? errors.mobile : ''
                            }
                            error={
                                touched.mobile &&
                                Boolean(errors.mobile)
                            }
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

            </form>
        </FormikProvider>
    )
}

export default VendorFilterPopup
