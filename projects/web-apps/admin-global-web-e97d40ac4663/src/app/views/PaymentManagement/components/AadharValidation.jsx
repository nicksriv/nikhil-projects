import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const AadharValidation = ({ initialState, onSendOTP, onVerifyOTP ,adhaarOtpResponseData}) => {
    const [formData, setFormData] = useState(initialState)
    const [otpSent, setOtpSent] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)
    const [aadharData, setAadharData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [verificationComplete, setVerificationComplete] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    const handleSendOTP = () => {
        onSendOTP(formData.uid, formData.uniqueId)
        setOtpSent(true)
        setOtpVerified(false)
        setAadharData(null)
    }

    const handleVerifyOTP = () => {
        setLoading(true)
        onVerifyOTP(formData.otp)
        setTimeout(() => {
            setLoading(false)
            setOtpVerified(true)
            setVerificationComplete(true)
            setAadharData({
                aadhaar_linked: true,
                address: {
                    city: 'Sample City',
                    country: 'Sample Country',
                },
                category: 'person',
                client_id: 'sample_client_id',
                dob: '1990-01-01',
                dob_check: true,
                dob_verified: true,
                email: 'sample@email.com',
                fathers_name: 'Sample Father',
                full_name: 'Sample User',
                full_name_split: ['Sample', 'User'],
                gender: 'M',
                input_dob: null,
                less_info: false,
                masked_aadhaar: 'XXXX-XXXX-XXXX',
                pan_number: 'SAMPLEPAN123',
                phone_number: '1234567890',
            })
        }, 2000)
    }

    useEffect(() => {
        if (verificationComplete) {
            setTimeout(() => {
                setVerificationComplete(false)
            }, 3000)
        }
    }, [verificationComplete])

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    border: '4px solid white',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            label="UID"
                            fullWidth
                            value={formData.uid}
                            onChange={(e) =>
                                handleInputChange('uid', e.target.value)
                            }
                            style={{
                                borderRadius: 8,
                                border: '2px solid white',
                                marginBottom: '12px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Unique ID"
                            fullWidth
                            value={formData.uniqueId}
                            onChange={(e) =>
                                handleInputChange('uniqueId', e.target.value)
                            }
                            style={{
                                borderRadius: 8,
                                border: '2px solid white',
                                marginBottom: '12px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: otpSent ? 'green' : '#0463D1',
                                height: '56px',
                                width: '230px',
                                color: 'white',
                            }}
                            variant="contained"
                            onClick={handleSendOTP}
                        >
                            {otpSent ? 'OTP Sent' : 'Send OTP'}
                        </Button>
                    </Grid>
                </Grid>
                {otpSent && (
                    <Grid container spacing={2}>
                        <Grid item xs={4} mt={3}>
                            <TextField
                                label="OTP"
                                fullWidth
                                value={formData.otp}
                                onChange={(e) =>
                                    handleInputChange('otp', e.target.value)
                                }
                                style={{
                                    borderRadius: 8,
                                    border: '2px solid white',
                                    marginBottom: '12px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} mt={3}>
                            <Button
                                sx={{
                                    borderRadius: '8px',
                                    backgroundColor: otpVerified
                                        ? 'green'
                                        : '#0463D1',
                                    height: '56px',
                                    width: '230px',
                                    color: 'white',
                                }}
                                variant="contained"
                                onClick={handleVerifyOTP}
                            >
                                {loading
                                    ? 'Verifying...'
                                    : otpVerified
                                    ? 'Verified'
                                    : 'Verify OTP'}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>

            {loading && <Typography variant="h6">Loading...</Typography>}

            {otpVerified && aadharData && !verificationComplete && (
                   <Box
                   sx={{
                       backgroundColor: 'white',
                       padding: '40px',
                       borderRadius: '12px',
                       border: '4px solid white',
                       marginTop: '30px',
                   }}
               >
                   {adhaarOtpResponseData && (
                       <>
                           <Typography>
                               Name: {adhaarOtpResponseData.model.name}
                           </Typography>
                           <Typography>
                               gender: {adhaarOtpResponseData.model.gender}
                           </Typography>
                           <Typography>
                               dob: {adhaarOtpResponseData.model.dob}
                           </Typography>
                           <Typography>
                               link: {adhaarOtpResponseData.model.link}
                           </Typography>
                          
                       </>
                   )}
               </Box>
                // <Box
                //     sx={{
                //         marginTop: '60px',
                //         backgroundColor: 'white',
                //         padding: '40px',
                //         borderRadius: '12px',
                //         border: '4px solid white',
                //     }}
                // >
                //     <Typography variant="h5">Aadhar Data</Typography>
                //     <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                //         {Object.keys(aadharData).map((key) => (
                //             <Grid key={key} item xs={4}>
                //                 <Box
                //                     sx={{
                //                         display: 'flex',
                //                         flexDirection: 'row',
                //                     }}
                //                 >
                //                     <Typography variant="subtitle1">
                //                         {key}:
                //                     </Typography>
                //                     <Typography variant="body1">
                //                         {JSON.stringify(
                //                             aadharData[key],
                //                             null,
                //                             2
                //                         )}
                //                     </Typography>
                //                 </Box>
                //             </Grid>
                //         ))}
                //     </Grid>
                // </Box>
            )}
        </>
    )
}

AadharValidation.propTypes = {
    initialState: PropTypes.object.isRequired,
    onSendOTP: PropTypes.func.isRequired,
    onVerifyOTP: PropTypes.func.isRequired,
}

export default AadharValidation
