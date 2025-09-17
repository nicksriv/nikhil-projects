import React, { useState } from 'react'
import { Button, Grid, TextField, Chip } from '@material-ui/core'

const ModuleCard = (props) => {
    const { module } = props;
    return (
        <>
            <Grid item>

                <Chip
                    size="large"
                    label={module}
                    color="#FFFFFF"
                    variant="outlined"
                    className="m-1 p-4"
                />
            </Grid>
        </>
    )
}

export default ModuleCard
