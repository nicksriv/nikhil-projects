import React from 'react';
import PropTypes from "prop-types";
import {
    Grid, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { JsonToExcel } from '../JsonToExcel/JsonToExcel';

const useStyles = makeStyles((theme) => ({
    root: {
        h1: {
            fontWeight: 'normal'
        },
        // '&.MuiButtonBase-root.MuiButton-outlinedPrimary': {
        //     border: '2px solid rgba(25, 118, 210, 0.5)'
        // },
        '&.MuiButtonBase-root .MuiButton-label': {
            fontWeight: 'bold'
        }
    },
    paper: {
        width: '100%',
        height: 'auto',
        opacity: 1,
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '1.5rem',
        flex: 1,
        marginTop: '2rem',
    },
    fileDownloadIcon: {
        width: '66px',
        height: '60px',
        color: '#9f9f9e',
    },
}));

const V5GlobalUploadComplete = (props) => {
    const {
        failedRecordsCount,
        headerText,
        usersErrorLog
    } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={`${classes.paper}`}
        >
            <Grid item className="pt-24 pb-4">
                <img className={classes.fileDownloadIcon}
                    src={`/assets/images/icons/Completed_Icons.svg`}
                    alt={"completed"} />
            </Grid>
            <Grid item>
                <h1 className="font-normal">{headerText}</h1>
            </Grid>
            {failedRecordsCount === 0 ? <Grid item className={`pb-8`}>
                <h4 className="font-normal text-light-gray pb-2">File uploaded successfully.</h4>
            </Grid> : <>
            <Grid item className={`pb-8`}>
                <h4 className="font-normal text-light-gray pb-2">{`File uploaded successfully. 
                    Found `}<span className={`text-error`}>{`${failedRecordsCount || 0} errors.`}</span></h4>
            </Grid>
            <Grid item>
                <JsonToExcel
                    componentToPassDown={
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.root}
                        >
                            {'DOWNLOAD LOG REPORT'}
                        </Button>
                    }
                    errosDetails={usersErrorLog}
                />
            </Grid>
            </>}
        </Grid>
    );
}

V5GlobalUploadComplete.propTypes = {
    headerText: PropTypes.string.isRequired,
    failedRecordsCount: PropTypes.string.isRequired,
};

V5GlobalUploadComplete.defaultProps = {
    headerText: "Completed"
};

export default V5GlobalUploadComplete;