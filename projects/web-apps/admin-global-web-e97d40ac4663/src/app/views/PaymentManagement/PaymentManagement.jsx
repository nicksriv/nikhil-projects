import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import BankValidation from './components/BankValidation'
import PanValidation from './components/PanValidation'
import AadharValidation from './components/AadharValidation'
import Axios from 'axios'

const PaymentManagement = () => {
    const [value, setValue] = React.useState('1')

    const [requestIdCounter, setRequestIdCounter] = useState(70)
    const [bankResponseData, setBankResponseData] = useState(null)
    const [adhaarResponseData, setAdhaarResponseData] = useState(null)
    const [adhaarOtpResponseData, setAdhaarOtpResponseData] = useState(null)
    const initialAadharState = {
        uid: '',
        uniqueId: '',
        otp: '',
    }

    const handleSendOTP = async (uid, uniqueId) => {
        try {
            const response = await Axios.post(
                'https://apihub-api.trusthub.in/okyc-initiate-otp',
                { uid, uniqueId },
                {
                    headers: {
                        'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
                    },
                }
            )

            console.log(response.data)
            setAdhaarResponseData(response.data)
        } catch (error) {
            console.error('Error sending OTP:', error)
        }
    }

    const handleVerifyOTP = async (otp) => {
        try {
            const verifyOTPPayload = {
                transactionId: adhaarResponseData.model.transactionId,
                fwdp: adhaarResponseData.model.fwdp,
                codeVerifier: adhaarResponseData.model.codeVerifier,
                otp,
                shareCode: '1245',
                validateXml: true,
            }

            console.log('Verify OTP Payload:', verifyOTPPayload)

            const response = await Axios.post(
                'https://apihub-api.trusthub.in/okyc-submit-otp',
                verifyOTPPayload,
                {
                    headers: {
                        'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
                    },
                }
            )

            console.log(response.data)
            setAdhaarOtpResponseData(response.data)
        } catch (error) {
            console.error('Error verifying OTP:', error)
        }
    }

    const getInitialTransactionState = (type) => {
        return {
            entityId: 'cc5463fe-0124-45f9-a770-eee450164888',
            programId: '56',
            requestId: 'rt1',
            custName: 'Rohit thakur',
            custIfsc: type === 'IMPS' ? 'SBIN0011513' : undefined,
            custAcctNo: type === 'IMPS' ? '1234567890' : undefined,
            custVpa: type === 'UPI' ? 'vijay@upi' : undefined,
            custMobileNo: type === 'UPI' ? '9876543210' : undefined,
            trackingRefNo: 'CLINTON07',
            txnType: type,
            callbackUrl1: 'https://call.me/back1',
            callbackUrl2: type === 'UPI' ? 'https://call.me/back2' : undefined,
        }
    }

    const initialImgsState = getInitialTransactionState('IMPS')
    const initialUpiState = getInitialTransactionState('UPI')

    const [formData, setFormData] = useState(
        value === '1' ? initialImgsState : initialUpiState
    )

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setFormData((prevFormData) => getInitialTransactionState(newValue))
    }

    const handleGeneratePayload = async (formData, value) => {
        try {
            let payload

            if (value === '1') {
                // Bank Validation for IMPS
                payload = {
                    entityId: formData.entityId,
                    programId: formData.programId,
                    requestId: formData.requestId,
                    custName: formData.custName,
                    custVpa: formData.custVpa,
                    custMobileNo: formData.custMobileNo,
                    // custIfsc: formData.custIfsc,
                    // custAcctNo: formData.custAcctNo,
                    trackingRefNo: formData.trackingRefNo,
                    txnType: formData.txnType,
                    entityId: formData.entityId,
                    custIfsc: formData.custIfsc,
                    custAcctNo: formData.custAcctNo,
                    // callbackUrl1:formData.callbackUrl1,
                }
            } else if (value === '2') {
                // Bank Validation for UPI
                payload = {
                    entityId: formData.entityId,
                    custIfsc: formData.custIfsc,
                    custAcctNo: formData.custAcctNo,
                    programId: formData.programId,
                    requestId: formData.requestId,
                    custName: formData.custName,
                    custVpa: formData.custVpa,
                    custMobileNo: formData.custMobileNo,
                    trackingRefNo: formData.trackingRefNo,
                    txnType: formData.txnType,
                }
            }

            console.log('Payloadsetted:', payload) // Add this line to log the payload

            const response = await Axios.post(
                'https://apihub-api.trusthub.in/bank-validateacct',
                payload,
                {
                    headers: {
                        'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
                    },
                }
            )

            console.log(response.data)
            setBankResponseData(response.data)
        } catch (error) {
            console.error('Error making bank validation API call:', error)
        }
    }

    const [panResponseData, setPanResponseData] = useState(null)

    const initialPanState = {
        panId: '',
    }

    const handlePanVerify = async (panId) => {
        const sanitizedPanId = panId.replace(':', '')

        try {
            const response = await Axios.post(
                'https://apihub-api.trusthub.in/verify-pan',
                { panId: sanitizedPanId },
                {
                    headers: {
                        'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
                    },
                }
            )

            console.log(response.data)
            setPanResponseData(response.data) // Store the PAN response data in the state
        } catch (error) {
            console.error('Error making PAN validation API call:', error)
        }
    }

    // const initialAadharState = {
    //     uid: '',
    //     uniqueId: '',
    //     otp: '',
    // }

    // const handleSendOTP = async (uid, uniqueId) => {
    //     try {
    //         const response = await Axios.post(
    //             'https://apihub-api.trusthub.in/okyc-initiate-otp',
    //             { uid, uniqueId },
    //             {
    //                 headers: {
    //                     'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
    //                 },
    //             }
    //         )
    //         console.log(response.data)
    //     } catch (error) {
    //         console.error('Error sending OTP:', error)
    //     }
    // }

    // const handleVerifyOTP = async (otp) => {
    //     try {
    //         const response = await Axios.post(
    //             'https://apihub-api.trusthub.in/okyc-submit-otp',
    //             { otp }
    //         )

    //         console.log(response.data)
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error)
    //     }
    // }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            margin: '20px',
                        }}
                    >
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 400,
                                }}
                                label=" Bank Validation"
                                value="1"
                            />
                            <Tab
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 400,
                                }}
                                label="Pan Verification"
                                value="2"
                            />
                            <Tab
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 400,
                                }}
                                label="Aadhar Card"
                                value="3"
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <BankValidation
                            initialState={formData || initialImgsState}
                            paymentMethods={['UPI', 'IMPS']}
                            onGeneratePayload={(formData) =>
                                handleGeneratePayload(formData, value)
                            }
                            bankResponseData={bankResponseData}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        {' '}
                        <PanValidation
                            initialState={initialPanState}
                            onVerify={handlePanVerify}
                            panResponseData={panResponseData}
                        />
                    </TabPanel>
                    <TabPanel value="3">
                        {' '}
                        <AadharValidation
                            initialState={initialAadharState}
                            onSendOTP={handleSendOTP}
                            onVerifyOTP={handleVerifyOTP}
                            adhaarOtpResponseData={adhaarOtpResponseData}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default PaymentManagement
