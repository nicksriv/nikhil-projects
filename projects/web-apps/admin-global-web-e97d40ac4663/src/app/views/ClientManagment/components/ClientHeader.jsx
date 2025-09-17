import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Tooltip, Icon } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import history from 'helper/history.js';

function ClientHeader({ chipInfo }) {
    const addClient = () => {
        history.push(`/client/add`);
    }

    return (
        <div className="analytics mx-5 mt-6">
            <Grid container spacing={2} className="justify-between flex items-center">
                <Grid className="flex align-middle">
                    <Grid item className="pt-2">
                        <h3>Client Management</h3>
                    </Grid>
                </Grid>
                <Grid>
                    <Tooltip title="Add Client">
                        <IconButton aria-label="upload picture" component="span" onClick={addClient}>
                            <PersonAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Excel">
                        <IconButton aria-label="upload picture" component="span">
                            <SaveAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter">
                        <IconButton aria-label="upload picture" component="span">
                            <Icon>filter_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    )
}

export default ClientHeader;
