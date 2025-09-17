import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    MenuItem,
    TextField,
} from '@material-ui/core'
import { Multiselect, V5GlobalFormFooter } from '../../../../components'
import { makeStyles } from '@material-ui/core/styles'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'

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
}))

const JobSetting = (props) => {
    const classes = useStyles()
    const {
        styleObj,
        handleInputChange,
        formValues,
        isVisibilityValueEnable,
        countries=[],
    } = props
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
                            <h5>Project Details</h5>
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
                                id="jobType"
                                name="jobType"
                                label="Job Type"
                                select
                                variant="outlined"
                                value={formValues && formValues.jobType}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'jobType',
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
                                <MenuItem value="ONSITE">On-site</MenuItem>
                                <MenuItem value="REMOTE">Remote</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="projectType"
                                name="projectType"
                                label="Project Type"
                                select
                                variant="outlined"
                                value={formValues && formValues.projectType}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'projectType',
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
                                <MenuItem value="ONE_TIME">One-Time</MenuItem>
                                <MenuItem value="ONGOING">On-going</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="experienceLevel"
                                name="experienceLevel"
                                label="Experience"
                                select
                                variant="outlined"
                                value={formValues && formValues.experienceLevel}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'experienceLevel',
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
                                <MenuItem value="BEGINNER">Beginner</MenuItem>
                                <MenuItem value="INTERMEDIATE">
                                    Intermediate
                                </MenuItem>
                                <MenuItem value="EXPERT">Expert</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="3"
                        className="pb-4 w-full"
                    >
                        <Grid item>
                            <h5>Job visibility</h5>
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
                                id="visibilityType"
                                name="visibilityType"
                                label="Visibility Type"
                                select
                                variant="outlined"
                                value={formValues && formValues.visibilityType}
                                className={styleObj.textFieldWidth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'visibilityType',
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
                                <MenuItem value="WORLDWIDE">Worldwide</MenuItem>
                                <MenuItem value="COUNTRY">Country</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Multiselect
                                disabled={isVisibilityValueEnable}
                                label="Countries"
                                roles={countries}
                                roleName={formValues.visibilityValue ?? []}
                                handleRoleChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'visibilityValue',
                                        e.target.value
                                    )
                                }
                                className={styleObj.textFieldWidth}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Job visibile to
                                </FormLabel>

                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    formValues.isVisibleToFreelancer
                                                }
                                                color="primary"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'jobSetting',
                                                        'isVisibleToFreelancer',
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        }
                                        label="Freelancer"
                                        color="primary"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    formValues.isVisibleToVendor
                                                }
                                            />
                                        }
                                        label="Vendor"
                                        onChange={(e) =>
                                            handleInputChange(
                                                'jobSetting',
                                                'isVisibleToVendor',
                                                e.target.checked
                                            )
                                        }
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="3"
                        className="pb-4 w-full"
                    >
                        <Grid item>
                            <h5>Address Details</h5>
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
                                value={formValues.location}
                                name="location"
                                className={styleObj.textFieldWidth}
                                label="Location"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'location',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.city}
                                className={styleObj.textFieldWidth}
                                label="City"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'city',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.state}
                                className={styleObj.textFieldWidth}
                                label="State"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'state',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.country}
                                className={styleObj.textFieldWidth}
                                label="Country"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'country',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.pinCode}
                                name="pinCode"
                                className={styleObj.textFieldWidth}
                                label="Pincode"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'pinCode',
                                        e.target.value,
                                        e
                                    )
                                }
                                maxLength={6}
                                pattern="[0-9]{6}"
                                // title="Please enter a 6-digit number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.lat}
                                className={styleObj.textFieldWidth}
                                name="lat"
                                label="Lat"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'lat',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.lng}
                                className={styleObj.textFieldWidth}
                                name="lng"
                                label="Long"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSetting',
                                        'lng',
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

export default JobSetting
