import React from 'react';
import {
    Grid, LinearProgress, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Dropzone from "react-dropzone";

const useStyles = makeStyles((theme) => ({
    root: {
        h1: {
            fontWeight: 'normal'
        },
        '&.MuiLinearProgress-bar': {
            height: '6px',
            borderRadius: '56px 0px 0px 56px'
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
    dropZoneHover: {
        '&:hover': {
            border: '2px dashed #2C3E93',
            color: '#2C3E93'
        },
    },
    dropZoneLblHover: {
        '&:hover': {
            border: 'none'
        },
    },
    dropZoneActive: {
        border: '2px dashed #2C3E93',
        color: '#2C3E93'
    },
    dropZoneLblActive: {
        border: 'none'
    },
    fileDownloadIcon: {
        width: '32px',
        height: '40px',
        color: '#9f9f9e',
    },
}));

const V5GlobalDnDFileControl = (props) => {
    const {
        file,
        setFile,
        isFileSelected,
        setIsFileSelected,
        isProgressComplete,
        setIsProgressComplete,
        handleNext
    } = props;
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setIsFileSelected(true);
        }
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setIsProgressComplete(true);
                    clearInterval(timer);
                    setProgress(0);
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);
        setIntervalId(timer);
    }
    const handleDropAccepted = () => {
        setIsProgressComplete(false);
    }
    const handleDelete = (e) => {
        e.stopPropagation();
        setFile(null);
        setIsProgressComplete(true);
        setIsFileSelected(false);
        clearInterval(intervalId);
        setProgress(0);
    }
    return (
        <Dropzone
            onDrop={handleDrop}
            onDropAccepted={handleDropAccepted}
            accept=".xls, .xlsx, .ods"
        //minSize={1024}
        //maxSize={3072000}
        >
            {({ getRootProps, getInputProps }) => (
                <>
                    <div {...getRootProps({ className: `${classes.paper} ${classes.dropZoneHover} ${isFileSelected ? classes.dropZoneActive : ''} cursor-pointer` })}>
                        <input {...getInputProps()} />
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item className="pt-24">
                                <img className={classes.fileDownloadIcon}
                                    src={`/assets/images/icons/Drag & Drop icons.svg`}
                                    alt={"dnd"} />
                            </Grid>
                            <Grid item>
                                <h1
                                    className={`font-normal 
                                    ${classes.dropZoneHover} 
                                    ${classes.dropZoneLblHover} 
                                    ${isFileSelected ? classes.dropZoneActive : ''} 
                                    ${isFileSelected ? classes.dropZoneLblActive : ''}`}>Drag and drop file here</h1>
                            </Grid>
                            <Grid item>
                                <h4
                                    className="font-normal text-light-gray pb-8">
                                    File supported: .xls, .xlsx, .ods
                                </h4>
                            </Grid>
                            <Grid item className={`pb-3`}>
                                {
                                    isFileSelected &&
                                    (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={1}
                                        >
                                            <Grid item className={`text-light-gray`}>
                                                <DescriptionOutlinedIcon />
                                            </Grid>
                                            <Grid item className={`font-bold`}>
                                                {file && file.name}
                                            </Grid>
                                            {
                                                !isProgressComplete &&
                                                (
                                                    <Grid item className={`text-light-gray`}>
                                                        <DeleteIcon onClick={(e) => handleDelete(e)} />
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Grid item className={`pb-20 w-400`} justifyContent="center">
                                {
                                    (isFileSelected && !isProgressComplete) &&
                                    (
                                        <LinearProgress variant="determinate" value={progress} />
                                    )
                                }
                            </Grid>
                        </Grid>
                    </div>
                    <div className={`text-right`}>
                        {!isProgressComplete ? (
                            <Button
                                variant="contained" disabled
                            >
                                {'NEXT'}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {'NEXT'}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </Dropzone>
    );
}

V5GlobalDnDFileControl.propTypes = {

};

V5GlobalDnDFileControl.defaultProps = {

};

export default V5GlobalDnDFileControl;