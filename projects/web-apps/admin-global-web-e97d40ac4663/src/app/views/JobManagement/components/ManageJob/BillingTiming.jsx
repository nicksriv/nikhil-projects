import React from 'react'
import { Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Multiselect from 'app/components/Multiselect/MultiSelectDate'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiInputLabel-root': {
            color: '#00000099',
            fontWeight: '400',
        },

        '& .MuiFormLabel-root.Mui-focused': {
            color: '#2C3E93',
        },
    },
    disabledInput: {
        '& .MuiInputBase-root.Mui-disabled': {
            color: '#000000BC',
        },
    },
    disabledInputLabel: {
        '& .MuiFormLabel-root.Mui-disabled': {
            color: '#000000BC',
        },
    },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: '#9f9f9e',
        },
    },
    iconColor: {
        color: '#636365',
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

const BillingTiming = (props) => {
    const classes = useStyles()
    const { styleObj, weekDays, formValues, handleInputChange } = props
    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <Grid
                        container
                        direction="row"
                        spacing="3"
                        className="pb-4 w-full"
                    >
                        <Grid item>
                            <h5>Billing Details</h5>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.number}
                                name="rate"
                                className={`${styleObj.textFieldWidth} ${classes.input}`}
                                label="Rate"
                                type="number"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'number',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                label="Billing Type"
                                select
                                variant="outlined"
                                value={formValues && formValues.type}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'type',
                                        e.target.value
                                    )
                                }
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                        getContentAnchorEl: null,
                                    },
                                }}
                            >
                                <MenuItem value="FIXED">Fixed</MenuItem>
                                <MenuItem value="HOUR">Hour</MenuItem>
                                <MenuItem value="DAY">Day</MenuItem>
                                <MenuItem value="WEEK">Week</MenuItem>
                                <MenuItem value="MONTH">Month</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="3"
                        className="pb-4 w-full mt-8"
                    >
                        <Grid item>
                            <h5>Timing Details</h5>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                name="hourRequired"
                                id="hourRequired"
                                label="Total hours require"
                                variant="outlined"
                                type='number'
                                className={`${styleObj.textFieldWidth} ${classes.input}`}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            hrs
                                        </InputAdornment>
                                    ),
                                }}
                                value={formValues.hourRequired}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'hourRequired',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="hourRequiredPer"
                                name="hourRequiredPer"
                                label="Hour Require Per"
                                select
                                variant="outlined"
                                className={styleObj.textFieldWidth}
                                value={formValues.hourRequiredPer}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'hourRequiredPer',
                                        e.target.value
                                    )
                                }
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                        getContentAnchorEl: null,
                                    },
                                }}
                            >
                                <MenuItem value="DAY">Day</MenuItem>
                                <MenuItem value="WEEK">Week</MenuItem>
                                <MenuItem value="MONTH">Month</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                name="durationOfWork"
                                id="durationOfWork"
                                label="Duraton of work"
                                variant="outlined"
                                type='number'
                                className={styleObj.textFieldWidth}
                                value={formValues.durationOfWork}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'durationOfWork',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="durationOfWorkType"
                                name="durationOfWorkType"
                                label="Duration of work type"
                                select
                                variant="outlined"
                                className={styleObj.textFieldWidth}
                                value={
                                    formValues && formValues.durationOfWorkType
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'durationOfWorkType',
                                        e.target.value
                                    )
                                }
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                        getContentAnchorEl: null,
                                    },
                                }}
                            >
                                <MenuItem value="DAY">Day</MenuItem>
                                <MenuItem value="MONTH">Month</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                variant="outlined"
                                id="time"
                                label="Shift start time"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300,
                                }}
                                className={styleObj.textFieldWidth}
                                defaultValue={
                                    formValues && formValues.shiftStartTime
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'shiftStartTime',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                variant="outlined"
                                id="time"
                                label="Shift end time"
                                type="time"
                                defaultValue={
                                    formValues && formValues.shiftEndTime
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300,
                                }}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'shiftEndTime',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Multiselect
                                label="Job Days"
                                roles={weekDays}
                                roleName={formValues.jobDays ?? []}
                                handleRoleChange={(e) =>
                                    handleInputChange(
                                        'jobBillingTiming',
                                        'jobDays',
                                        e.target.value
                                    )
                                }
                                className={styleObj.textFieldWidth}
                            />
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    )
}

export default BillingTiming
