import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import { Typography } from '@material-ui/core'

const BankValidation = ({
    initialState,
    paymentMethods,
    onGeneratePayload,
    bankResponseData,
}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        paymentMethods[0]
    )
    const [formData, setFormData] = useState({
        ...initialState,
        txnType: paymentMethods[0] === 'UPI' ? 'UPI' : 'IMPS',
    })

    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value
        setSelectedPaymentMethod(selectedMethod)

        // Set initial state based on the selected payment method
        setFormData((prevData) => ({
            ...initialState,
            txnType: selectedMethod === 'UPI' ? 'UPI' : 'IMPS',
        }))
    }

    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [field]: value,
            };

            // If the selected payment method is 'UPI', set IMPS-related fields to undefined
            if (selectedPaymentMethod === 'UPI') {
                updatedData.custIfsc = undefined;
                updatedData.custAcctNo = undefined;
            }
            // If the selected payment method is 'IMPS', set UPI-related fields to undefined
            else if (selectedPaymentMethod === 'IMPS') {
                updatedData.custVpa = undefined;
                updatedData.custMobileNo = undefined;
            }

            return updatedData;
        });
    };

    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);

    const handleGeneratePayload = () => {
        onGeneratePayload(formData)
    }

    const renderFields = () => {
        const fieldsToRender =
            selectedPaymentMethod === 'UPI'
                ? [
                      'programId',
                      'entityId',
                      'requestId',
                      'custName',
                      'custVpa',
                      'custMobileNo',
                      'trackingRefNo',
                      'txnType',
                      'callbackUrl1',
                      'callbackUrl2',
                  ]
                : [
                      'programId',
                      'entityId',
                      'requestId',
                      'custName',
                      'custIfsc',
                      'custAcctNo',
                      'trackingRefNo',
                      'txnType',
                      'callbackUrl1',
                  ]

        return fieldsToRender.map((field) => (
            <Grid key={field} item xs={4}>
                <TextField
                    label={field}
                    fullWidth
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    style={{
                        borderRadius: 8,
                        border: '2px solid white',
                    }}
                />
            </Grid>
        ))
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        Select Payment Method
                    </FormLabel>
                    <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={selectedPaymentMethod}
                        onChange={handlePaymentMethodChange}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '12px',
                        }}
                    >
                        {paymentMethods.map((method) => (
                            <FormControlLabel
                                key={method}
                                value={method}
                                control={<Radio />}
                                label={method}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Grid container spacing={4}>
                    {renderFields()}
                </Grid>

                <Button
                    sx={{
                        borderRadius: '8px',
                        marginTop: '24px',
                        backgroundColor: '#0463D1',
                        width: '230px',
                        height: '56px',
                    }}
                    variant="contained"
                    onClick={handleGeneratePayload}
                >
                    SUBMIT
                </Button>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    border: '4px solid white',
                    marginTop: '30px',
                }}
            >
                {bankResponseData && (
                    <>
                        <Typography>
                            Status: {bankResponseData.status}
                        </Typography>
                        <Typography>
                            Message: {bankResponseData.message}
                        </Typography>
                        <Typography>
                            Request ID: {bankResponseData.requestId}
                        </Typography>
                        <Typography>
                            Status Code: {bankResponseData.statusCode}
                        </Typography>
                    </>
                )}
            </Box>
        </>
    )
}

BankValidation.propTypes = {
    initialState: PropTypes.object.isRequired,
    paymentMethods: PropTypes.array.isRequired,
    onGeneratePayload: PropTypes.func.isRequired,
}

export default BankValidation
