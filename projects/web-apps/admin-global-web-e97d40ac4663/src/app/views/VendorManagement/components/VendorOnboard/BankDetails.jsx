import { Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const BankDetails = ({ formValues, handleInputChange, bankMaster }) => {
    const useStyles = makeStyles((theme) => ({
      
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
    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <h5>Bank Details</h5>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                required
                                value={formValues.accountHolderName}
                                name="accountHolderName"
                                className="w-full"
                                inputProps={{
                                    style: { textTransform: 'uppercase' },
                                }}
                                label="Account Holder Name"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'bankDetails',
                                        'accountHolderName',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                required
                                value={formValues.accountNumber}
                                name="accountNumber"
                                className={`w-full ${classes.input}`}
                                label="Account Number"
                                type="number"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'bankDetails',
                                        'accountNumber',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                required
                                value={formValues.bankName}
                                select
                                name="bankName"
                                className="w-full"
                                label="Bank Name"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'bankDetails',
                                        'bankName',
                                        e.target.value
                                    )
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {bankMaster.map((bank) => {
                                    return (
                                        <MenuItem value={bank} key={bank}>
                                            {bank}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                required
                                value={formValues.ifscCode}
                                name="ifscCode"
                                className="w-full"
                                label="IFSC Code "
                                type="text"
                                variant="outlined"
                                inputProps={{
                                    style: { textTransform: 'uppercase' },
                                }}
                                onChange={(e) =>
                                    handleInputChange(
                                        'bankDetails',
                                        'ifscCode',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                required
                                value={formValues.branch}
                                name="branch"
                                className="w-full"
                                label="Branch Name"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'bankDetails',
                                        'branch',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    )
}

export default BankDetails
