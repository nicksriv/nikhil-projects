import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'

const AddressDetail = ({ formValues, handleInputChange }) => {
    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <h5>Address Details</h5>
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
                                className="w-full"
                                label="Location"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'location',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.city}
                                name="city"
                                className="w-full"
                                label="City"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'city',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.state}
                                name="state"
                                className="w-full"
                                label="State"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'state',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                multiline
                                maxRows={4}
                                value={formValues.country}
                                name="country"
                                className="w-full"
                                label="Country"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'country',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.pinCode}
                                name="state"
                                className="w-full"
                                label="Pincode"
                                type="number"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'pinCode',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.lat}
                                name="lat"
                                className="w-full"
                                label="Lat"
                                type="number"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
                                        'lat',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                value={formValues.lng}
                                name="lng"
                                className="w-full"
                                label="Lng"
                                type="number"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'addressDetails',
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

export default AddressDetail
