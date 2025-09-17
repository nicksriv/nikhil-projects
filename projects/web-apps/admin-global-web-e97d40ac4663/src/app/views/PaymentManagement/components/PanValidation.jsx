import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const PanValidation = ({ initialState, onVerify, panResponseData }) => {
    const [formData, setFormData] = useState(initialState)
    const [showData, setShowData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [panError, setPanError] = useState(null)
    const [requiredError, setRequiredError] = useState(null)

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
        // Clear errors when user starts typing
        setRequiredError(null)
        setPanError(null)
    }

    const handleVerify = () => {
        // Check if PAN ID is filled
        if (!formData.panId.trim()) {
            setRequiredError('PAN ID is required')
            return
        }

        // Reset errors
        setRequiredError(null)
        setPanError(null)

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setShowData(true)
            setIsVerified(true)
        }, 1000)

        onVerify(formData.panId)
    }

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
                            label="PAN ID"
                            fullWidth
                            value={formData.panId}
                            onChange={(e) =>
                                handleInputChange('panId', e.target.value)
                            }
                            error={requiredError ? true : false}
                            helperText={requiredError}
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
                                backgroundColor: isVerified
                                    ? 'green'
                                    : '#0463D1',
                                color: 'white',
                                height: '56px',
                                width: '230px',
                            }}
                            variant="contained"
                            onClick={handleVerify}
                        >
                            {isVerified ? 'VERIFIED' : 'VERIFY'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {loading && <Typography variant="h6">Loading...</Typography>}
            {showData && (
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '12px',
                        border: '4px solid white',
                        marginTop: '60px',
                    }}
                >
                    {panResponseData && panResponseData.response !== null ? (
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            {Object.keys(panResponseData.response).map(
                                (key) => (
                                    <Grid key={key} item xs={4}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography variant="subtitle1">
                                                {key}:
                                            </Typography>
                                            <Typography variant="body1">
                                                {JSON.stringify(
                                                    panResponseData.response[
                                                        key
                                                    ],
                                                    null,
                                                    2
                                                )}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    ) : (
                        <Typography variant="body1">
                            {panResponseData.message}
                        </Typography>
                    )}
                </Box>
            )}
        </>
    )
}

PanValidation.propTypes = {
    initialState: PropTypes.object.isRequired,
    onVerify: PropTypes.func.isRequired,
    panResponseData: PropTypes.object,
}

export default PanValidation
