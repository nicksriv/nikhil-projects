import React from 'react';
import PropTypes from "prop-types";
import {
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import FileDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        h1: {
            fontWeight: 'normal'
        }
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        border: '2px dashed #CDCCCD;',
        opacity: 1,
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '1.5rem',
        flex: 1,
        marginTop: '2rem',
    },
    fileDownloadIcon: {
        width: '32px',
        height: '32px',
        color: '#9f9f9e',
    },
    labelWrap: {
        display: "flex",
        flexDirection: "row",
    }
}));

const V5GlobalMultipleDownloadTemplate = (props) => {
    const {
        headerText,
        headerDescription,
        handleDownloadTemplate
    } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={`${classes.paper} cursor-pointer`}
        >
            <Grid item className="pt-4">
                <img className={classes.fileDownloadIcon}
                    src={`/assets/images/icons/Download_icon.svg`}
                    alt={"download"} />
            </Grid>
            <Grid item>
                <h1 className="font-normal">{headerText}</h1>
            </Grid>
            <Grid item className={classes.labelWrap}>
                {
                    headerDescription.map((i, index) => {
                        return (
                            <h4
                                className="font-normal text-light-gray pb-2 pr-3"
                                onClick={() => handleDownloadTemplate(i.type)} key={`label_${index}`}>{i.label}</h4>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
}

V5GlobalMultipleDownloadTemplate.propTypes = {
    headerText: PropTypes.string.isRequired,
    headerDescription: PropTypes.string.isRequired,
    handleDownloadTemplate: PropTypes.func.isRequired
};

V5GlobalMultipleDownloadTemplate.defaultProps = {
    headerText: "Download template"
};

export default V5GlobalMultipleDownloadTemplate;