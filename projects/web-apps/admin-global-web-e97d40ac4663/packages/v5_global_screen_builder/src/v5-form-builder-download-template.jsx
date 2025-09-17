import React from 'react';
import PropTypes from "prop-types";
import {
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import FileDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        border: '1px dashed #CDCCCD;',
        opacity: 1,
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '1.5rem',
        flex: 1,
        marginTop: '2rem',
        cursor: "pointer"
    },
    fileDownloadIcon: {
        width: '19px',
        height: '20px',
        color: '#9f9f9e',
    },
}));

function V5FormBuilderDownloadTemplate({
    headerText,
    handleDownloadTemplate,
    headerDescription

}) {
    const classes = useStyles();
    console.log(handleDownloadTemplate)
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={`${classes.paper} cursor-pointer`}
            onClick={handleDownloadTemplate}
        >
            <Grid item className="pt-4">
                <h5 className="font-normal text-light-gray"
                    style={{ fontSize: "0.85rem" }}>{headerText}</h5>
            </Grid>
            <Grid item>
                <h5 className="font-medium pb-2 color-primary"
                    style={{
                        fontSize: "0.85rem",
                        textDecoration: "underline",
                        textUnderlinePosition: "from-font"
                    }}>{headerDescription}</h5>
            </Grid>
        </Grid>
    )
}

export default V5FormBuilderDownloadTemplate