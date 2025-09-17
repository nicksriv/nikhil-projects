import { Grid, TextField } from '@material-ui/core'
import React from 'react'

const SpocDetails = ({ formValues, handleInputChange, bankMaster }) => {

    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <h5>SPOC Details</h5>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                value={formValues.name}
                                name="name"
                                className="w-full"
                                label="Name"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'spocDetails',
                                        'name',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                value={formValues.email}
                                name="email"
                                className="w-full"
                                label="Email"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'spocDetails',
                                        'email',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                value={formValues.mobile}
                                name="mobile"
                                type="number"
                                className="w-full"
                                label="Mobile"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'spocDetails',
                                        'mobile',
                                        e.target.value
                                    )
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                value={formValues.designation}
                                name="designation"
                                className="w-full"
                                label="Designation"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'spocDetails',
                                        'designation',
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

export default SpocDetails
