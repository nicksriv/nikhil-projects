import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import history from 'helper/history.js'
import { V5GlobalHeaderActionList, V5GlobalStepper } from 'app/components'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
// import { addVendorService } from 'app/redux/VendorManagement/VendorManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import { addQualityAssuranceService } from 'app/redux/QualityAssuranceManagement/QualityAssuranceManagementService'
import { validateEmail, validateName } from 'helper/utils.js'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { validate } from 'uuid'
function validateMobile(value) {
    let error = false;
    if ((value.length < 10 || value.length > 10)) {
        error = true;
    }
    return error;
}
function AddQualityAssurance() {
    const useStyles = makeStyles((theme) => ({
        stickyHeader: {
            position: 'sticky',
            top: '0rem',
            backgroundColor: '#f5f5f5',
            zIndex: '100',
            paddingTop: '1rem',
        },
        input: {
            '& input[type=number]': {
                '-moz-appearance': 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            }
          },
    }))
    const classes = useStyles()
    const [qualityAssuranceDetails, setQualityAssuanceDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: ""
    })
    const [errorState, setErrorState] = useState({
        firstName: {
            error: false,
        },
        middleName: {
            error: false,
        },
        lastName: {
            error: false,
        },
        mobile: {
            error: false,
        },
        email: {
            error: false,
        }

    });

    const dispatch = useDispatch()
    const { firstName, middleName, lastName, email, mobile } = qualityAssuranceDetails;
    const handleInputChange = (name, value) => {
        setQualityAssuanceDetails({
            ...qualityAssuranceDetails,
            [name]: value,
        });

    }
    const handleResetForm = () => {
        setQualityAssuanceDetails({
            firstName: "",
            middleName: "",
            lastName: "",
            mobile: "",
            email: ""
        })
        setErrorState({
            firstName: {
                error: false,
            },
            middleName: {
                error: false,
            },
            lastName: {
                error: false,
            },
            mobile: {
                error: false,
            },
            email: {
                error: false,
            }
        });


    }

    const handleQualityAssuranceErrors = () => {

        if (qualityAssuranceDetails.firstName !== "" || qualityAssuranceDetails.middleName !== "" || qualityAssuranceDetails.lastName !== "" || qualityAssuranceDetails.mobile !== "" || qualityAssuranceDetails.email !== "") {

            const mobileError = validateMobile(qualityAssuranceDetails.mobile);

            const emailError = validateEmail(qualityAssuranceDetails.email);

            const firstNameError = validateName(qualityAssuranceDetails.firstName);

            const middleNameError = validateName(qualityAssuranceDetails.middleName);

            const lastNameError = validateName(qualityAssuranceDetails.lastName);

            if (mobileError || emailError || firstNameError || middleNameError || lastNameError) {


                setErrorState({ ...errorState, mobile: { error: mobileError }, email: { error: emailError }, firstName: { error: firstNameError }, middleName: { error: middleNameError }, lastName: { error: lastNameError } });
                return true;
            }
            else {
                return false;
            }
        }
        else if (qualityAssuranceDetails.mobile === "" || qualityAssuranceDetails.email === "" || qualityAssuranceDetails.firstName === "" || qualityAssuranceDetails.middleName === "" || qualityAssuranceDetails.lastName === "") {

            const mobileError = validateMobile(qualityAssuranceDetails.mobile);

            const emailError = validateEmail(qualityAssuranceDetails.email);

            const firstNameError = validateName(qualityAssuranceDetails.firstName);

            const middleNameError = validateName(qualityAssuranceDetails.middleName);

            const lastNameError = validateName(qualityAssuranceDetails.lastName)
            if (mobileError || emailError || firstNameError || middleNameError || lastNameError) {
                setErrorState({ ...errorState, mobile: { error: mobileError }, email: { error: emailError }, firstName: { error: firstNameError }, middleName: { error: middleNameError }, lastName: { error: lastNameError } });
                return true;
            }
            else {
                return false;
            }

        }
        return false;
    }


    const handleBack = () => {
        history.goBack();
    }


    const handleAddQualityAssurance = async () => {
        if (handleQualityAssuranceErrors()) {
            dispatch(SNACKBAR_ERROR("Form Has Errors"))
        }
        else {
            console.log("has not error");
            const payload = qualityAssuranceDetails;
            console.log("oay", payload)
            try {
                const res = await addQualityAssuranceService(payload)
                if (!res.error) {
                    dispatch(SNACKBAR_SUCCESS(res.message))
                    handleResetForm()
                    handleBack()
                }
            }
            catch (error) {
                dispatch(SNACKBAR_ERROR(error.message))
            }
            finally {
                setErrorState({
                    firstName: {
                        error: false,
                    },
                    middleName: {
                        error: false,
                    },
                    lastName: {
                        error: false,
                    },
                    mobile: {
                        error: false,
                    },
                    email: {
                        error: false,
                    }
                });
            }
        }

    }
    return (
        <>
            <div style={{ padding: "0rem 3rem" }}>
                <BackgroundCard>
                    <form>
                        <div className={'w-full mt-2'}>
                            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "1rem" }}>
                                <Tooltip title="Go back">
                                    <ArrowBackIcon
                                        onClick={handleBack}
                                        className="cursor-pointer text-light-gray"
                                    />
                                </Tooltip>
                                <h5 className='ml-5 mt-1'>Add QA Details</h5>
                            </div>
                            <Grid
                                container
                                direction="row"
                                spacing="5"
                                className="min-h-120 w-full"
                            >
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        required
                                        value={firstName}
                                        name="firstName"
                                        className="w-full"
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        helperText={errorState.firstName.error ? 'First name must be at least 2 characters' : ''}
                                        error={errorState.firstName.error}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'firstName',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        required
                                        value={middleName}
                                        name="middleName"
                                        className="w-full"
                                        label="Middle Name"
                                        type="text"
                                        variant="outlined"
                                        helperText={errorState.middleName.error ? 'MiddleName must be at least 2 characters' : ''}
                                        error={errorState.middleName.error}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'middleName',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>


                                    <TextField
                                        required
                                        value={lastName}
                                        name="lastName"
                                        className="w-full"
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        helperText={errorState.lastName.error ? "LastName must be at least 2 characters" : ''}
                                        error={errorState.lastName.error}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'lastName',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                spacing="5"
                                className="min-h-120 w-full"
                            >
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        required
                                        value={mobile}
                                        name="mobile"
                                        className={`w-full ${classes.input}`}
                                        label="Mobile"
                                        type="number"
                                        variant="outlined"
                                        helperText={errorState.mobile.error ? "Mobile number must be 10 digits" : ''}
                                        error={errorState.mobile.error}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'mobile',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        required
                                        value={email}
                                        name="email"
                                        className="w-full"
                                        label="Email"
                                        type="text"
                                        variant="outlined"
                                        helperText={errorState.email.error ? "Email must be valid" : ''}
                                        error={errorState.email.error}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>

                            </Grid>




                            <Grid
                                container
                                direction="row"
                                spacing="5"
                                className="min-h-120 w-full"
                            >
                                <Grid item xs={12} sm={4} md={3} lg={3}>
                                    <Button
                                        variant="outlined"
                                        className="color-primary"
                                        style={{
                                            maxHeight: '35px',
                                            minHeight: '35px',
                                            border: '1px solid #2C3E93',
                                            width: '100%'
                                        }}
                                        onClick={() => {
                                            // history.goBack();
                                            handleResetForm();
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} lg={3}>
                                    <Button
                                        variant="outlined"
                                        // className="color-primary"
                                        style={{
                                            maxHeight: '35px',
                                            minHeight: '35px',
                                            border: '1px solid #2C3E93',
                                            width: '100%',
                                            backgroundColor: '#2C3E93',
                                           
                                        }}
                                        onClick={() => handleAddQualityAssurance()}
                                    >
                                        Add QA
                                    </Button>
                                </Grid>

                            </Grid>

                        </div>
                    </form >
                </BackgroundCard>
            </div >
        </>
    )
}

export default AddQualityAssurance