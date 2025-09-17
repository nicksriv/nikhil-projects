import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import history from 'helper/history.js'
import { V5GlobalHeaderActionList, V5GlobalStepper } from 'app/components'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import BasicDetails from './components/VendorOnboard/BasicDetails'
import AddressDetail from './components/VendorOnboard/AddressDetail'
import BankDetails from './components/VendorOnboard/BankDetails'
import SpocDetails from './components/VendorOnboard/SpocDetails'
import { addVendorService } from 'app/redux/VendorManagement/VendorManagementService'
import { approveVendorRegistrationService } from 'app/redux/VendorRegistration/VendorRegistrationService'
import V5GlobalFormFooter from './components/V5GlobalFormFooter'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'

function getSteps() {
    return ['Basic Details', 'Address Details', 'Bank Details', 'Spoc Details']
}
const basicDetailsInitialState = {
    vendorName: '',
    workHighlights: '',
    companyIncorporatedAt: '',
    skills: [],
}
const addressDetailsInitialState = {
    location: '',
    city: '',
    state: ' ',
    country: '',
    pinCode: '',
    lat: '',
    lng: '',
}

const bankDetailsInitialState = {
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
}
const spocDetailsInitialState = {
    name: '',
    email: '',
    mobile: '',
    designation: '',
}
const AddVendor = () => {
    const useStyles = makeStyles((theme) => ({
        stickyHeader: {
            position: 'sticky',
            top: '0rem',
            backgroundColor: '#f5f5f5',
            zIndex: '100',
            paddingTop: '1rem',
        },
    }))
    const classes = useStyles()
    const steps = getSteps()
    const dispatch = useDispatch()
    const { activeStep, bankMaster } = useSelector(
        (state) => state.vendorManagement
    )
    const { vendorRegistrationActionData } = useSelector(
        (state) => state.vendorRegistration
    )
    const { skillsList } = useSelector((state) => state.jobManagement)
    const [pageMode, setPageMode] = useState('')
    const [backArrowDisabled, setBackArrowDisabled] = useState(true)
    const [nextArrowDisabled, setNextArrowDisabled] = useState(false)
    const [basicDetails, setBasicDetails] = useState(basicDetailsInitialState)
    const [addressDetails, setAddressDetails] = useState(
        addressDetailsInitialState
    )
    const [bankDetails, setBankDetails] = useState(bankDetailsInitialState)
    const [spocDetails, setSpocDetails] = useState(spocDetailsInitialState)
    const { vendorBasicDetails } = useSelector((state) => {
        return state.vendorRegistration
    })
    const vendorApprove = localStorage.getItem('vendorApprove');

    useEffect(() => {
        if (!vendorApprove) {
            dispatch({
                type: 'setVendorBasicDetailsAction', payload: {
                    vendorName: '',
                    email: '',
                    mobile: ''
                }
            })
        }
        else {
            setSpocDetails({
                name: vendorBasicDetails.vendorName,
                email: vendorBasicDetails.email,
                mobile: vendorBasicDetails.mobile
            });
        }

    }, [])
    const handleBack = (e) => {
        history.push('/vendor-management')
    }
    const handleNextArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep + 1 },
        })
    }
    //....HANDLE BACK ARROW FOOTER OF THE PAGES
    const handleBackArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep - 1 },
        })
    }
    const handleInputChange = (key, name, value) => {
        if (key === 'basicDetails') {
            setBasicDetails({
                ...basicDetails,
                [name]: value,
            })
        }
        if (key === 'addressDetails') {
            setAddressDetails({
                ...addressDetails,
                [name]: value,
            })
        }
        if (key === 'bankDetails') {
            setBankDetails({
                ...bankDetails,
                [name]: value,
            })
        }
        if (key === 'spocDetails') {
            setSpocDetails({
                ...spocDetails,
                [name]: value,
            })
        }
    }
    const generatePayload = () => {
        return {
            vendorName: basicDetails.vendorName,
            companyIncorporatedAt: basicDetails.companyIncorporatedAt,
            workHighlights: basicDetails.workHighlights,
            address: {
                location: addressDetails.location,
                city: addressDetails.city,
                state: addressDetails.state,
                country: addressDetails.country,
                pinCode: addressDetails.pinCode,
            },
            locationGps: {
                lat: addressDetails.lat,
                lng: addressDetails.lng,
            },
            spocDetail: {
                name: spocDetails.name,
                email: spocDetails.email,
                mobile: spocDetails.mobile,
                designation: spocDetails.designation,
            },
            skills: basicDetails.skills,
            bankDetail: {
                bankName: bankDetails.bankName,
                accountHolderName: bankDetails.accountHolderName,
                accountNumber: bankDetails.accountNumber,
                ifscCode: bankDetails.ifscCode,
                branch: bankDetails.branch,
            },
        }
    }

    const validateAddVendorActionState = () => {
        let invalidFieldCount = 0
        const payload = generatePayload()
        const stringFields = [
            'vendorName',
            'workHighlights',
            'companyIncorporatedAt',
        ]
        const arrayFields = ['skills']
        const objectFiled = [
            'address',
            'locationGps',
            'bankDetail',
            'spocDetail',
        ]

        Object.keys(payload).forEach((field) => {
            //checking for mandatory keys(feilds)
            if (stringFields.includes(field) || arrayFields.includes(field)) {
                //checking the length for string and array
                if (!payload[field].length) {
                    invalidFieldCount++
                }
            }
            //checking in objects
            if (objectFiled.includes(field)) {
                const keys = Object.keys(payload[field])
                const isValid = keys.filter((x) => {
                    if (Array.isArray(payload[field][x])) {
                        if (!payload[field][x].length) {
                            invalidFieldCount++
                        }
                        return null
                    }
                    return !payload[field][x]
                })
                const length = isValid.length
                invalidFieldCount = invalidFieldCount + length
            }
        })

        return invalidFieldCount !== 0
    }
    const handleAddVendor = async () => {
        const vendorRequestApprove = localStorage.getItem('vendorApprove');
        if (vendorRequestApprove) {

            try {
                const res = await approveVendorRegistrationService(payload, vendorRegistrationActionData)
                if (!res.error) {
                    localStorage.removeItem('vendorApprove');
                    handleResetForm()
                    history.push('/vendor-registration');
                    dispatch(SNACKBAR_SUCCESS("Vendor Approved Successfully"));

                }
            } catch (error) {
                localStorage.removeItem('vendorApprove');
                dispatch(SNACKBAR_ERROR(error.message))

            }

        }

        else {
            try {
                const res = await addVendorService(payload)
                if (!res.error) {
                    dispatch(SNACKBAR_SUCCESS(res.message))
                    handleResetForm()
                    handleBack()
                }
            } catch (error) {
                dispatch(SNACKBAR_ERROR(error.message))
            }
        }
    }
    const handleResetForm = () => {
        setBasicDetails(basicDetailsInitialState)
        setAddressDetails(addressDetailsInitialState)
        setBankDetails(bankDetailsInitialState)
        setSpocDetails(spocDetailsInitialState)
    }
    const footerActions = [
        {
            label: 'DISCARD',
            variant: 'outlined',
            disabled: false,
            onClick: handleBack,
            style: {
                border: '1px solid #2C3E93',
                color: '#2C3E93 ',
                marginRight: 10,
            },
        },
        {
            label: 'ADD VENDOR',
            variant: 'outlined',
            disabled: validateAddVendorActionState(),
            onClick: handleAddVendor,
            style: {
                fontSize: '13px',
                border: '1px solid #2C3E93',
                backgroundColor: '#2C3E93',
                color: '#ffffff',
            },
        },
    ]

    useEffect(() => {
        dispatch({ type: 'getSkillsListAction' })
    }, [])

    useEffect(() => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: 0 },
        })
    }, [])
    useEffect(() => {
        if (activeStep === 0) {
            setBackArrowDisabled(true)
            setNextArrowDisabled(false)
        } else if (activeStep === 1) {
            setBackArrowDisabled(false)
            setNextArrowDisabled(false)
        } else if (activeStep === 2) {
            setBackArrowDisabled(false)
            setNextArrowDisabled(false)
        } else if (activeStep === 3) {
            setBackArrowDisabled(false)
            setNextArrowDisabled(true)
        } else {
            setBackArrowDisabled(false)
        }
    }, [activeStep])
    const payload = generatePayload()

    return (
        <>
            <Grid id="sectionId">
                <div className="analytics m-sm-30">
                    <div className={classes.stickyHeader}>
                        <V5GlobalHeaderActionList backIcon title="Add Vendor" />
                        <Grid item className="m-center" xs={12} sm={12} md={8}>
                            <V5GlobalStepper
                                steps={steps}
                                activeStep={activeStep}
                                alternativeLabel={true}
                                pageMode={pageMode}
                            />
                        </Grid>
                        <BackgroundCard>
                            <Grid item>
                                {activeStep === 0 && (
                                    <BasicDetails
                                        formValues={basicDetails}
                                        skillsList={skillsList}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
                                {activeStep === 1 && (
                                    <AddressDetail
                                        formValues={addressDetails}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
                                {activeStep === 2 && (
                                    <BankDetails
                                        formValues={bankDetails}
                                        handleInputChange={handleInputChange}
                                        bankMaster={bankMaster}
                                    />
                                )}
                                {activeStep === 3 && (
                                    <SpocDetails
                                        formValues={spocDetails}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={12}
                                    className="mt-4"
                                >
                                    <V5GlobalFormFooter
                                        isSubmit={false}
                                        pageMode={pageMode}
                                        backArrowDisabled={backArrowDisabled}
                                        nextArrowDisabled={nextArrowDisabled}
                                        cancelBtnDisabled={false}
                                        saveAndContinueBtnDisabled={false}
                                        handleNextArrow={handleNextArrow}
                                        handleBackArrow={handleBackArrow}
                                        handleCanceBtn={() => history.goBack()}
                                        footerActions={footerActions}
                                        customFooter
                                    />
                                </Grid>
                            </Grid>
                        </BackgroundCard>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default AddVendor
