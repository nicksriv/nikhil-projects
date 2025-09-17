import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import MultiSelectSearch from 'app/components/Multiselect/MultiSelectSearch'

const BasicDetails = ({ formValues, handleInputChange, skillsList }) => {
    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <h5>Basic Details</h5>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                required
                                multiline
                                maxRows={4}
                                value={formValues.vendorName}
                                name="vendorName"
                                className="w-full"
                                label="Vendor Name"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'basicDetails',
                                        'vendorName',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                required
                                id="datetime-local"
                                format="yyyy/MM/dd"
                                value={formValues.companyIncorporatedAt}
                                name="companyIncorporatedAt"
                                className="w-full"
                                label="Company Incorporated At"
                                type="date"
                                variant="outlined"
                                inputProps={{
                                    min: '1947-01-1',
                                    max: '2022-12-31',
                                    placeholder: 'YYYY.MM.DD',
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) =>
                                    handleInputChange(
                                        'basicDetails',
                                        'companyIncorporatedAt',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <TextField
                                multiline
                                maxRows={4}
                                value={formValues.workHighlights}
                                name="workHighlights"
                                className="w-full"
                                label="Work Highlights"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'basicDetails',
                                        'workHighlights',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <h5>Technologies</h5>
                            <MultiSelectSearch
                                value={formValues.skills ?? []}
                                label={'Technologies'}
                                placeholder={'Search Technologies'}
                                listArray={skillsList}
                                onChange={(e, value) =>
                                    handleInputChange(
                                        'basicDetails',
                                        'skills',
                                        value
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

export default BasicDetails
