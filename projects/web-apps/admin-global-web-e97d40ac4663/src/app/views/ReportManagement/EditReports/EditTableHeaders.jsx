import React from 'react'
import { Button, Grid } from '@material-ui/core'

import Multiselect from 'app/components/Multiselect/MultiSelectDate'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'

const EditTableHeaders = (props) => {
    const {
        allColumns,
        selectedSavedColumns,
        handleTableHeadersChange,
        deleteSavedColumn,
        submitTableHeaders,
    } = props

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            className="flex items-center pt-2"
            width
        >
            <BackgroundCard
                title={'Report Table Headers'}
                titleStyle={{ fontSize: '18px' }}
                containerStyle={{ width: '100%' }}
            >
                <Grid item lg={6}>
                    <Multiselect
                        roles={allColumns}
                        label="Select table headers"
                        roleName={selectedSavedColumns}
                        handleRoleChange={handleTableHeadersChange}
                        handleDelete={deleteSavedColumn}
                    />
                </Grid>

                <Grid container display="flex" justifyContent="flex-end">
                    <Button
                        style={{
                            width: '281px',
                            marginLeft: '9px',
                            marginTop: '25px',
                        }}
                        variant="contained"
                        color="primary"
                        onClick={submitTableHeaders}
                    >
                        Submit
                    </Button>
                </Grid>
            </BackgroundCard>
        </Grid>
    )
}

export default EditTableHeaders
