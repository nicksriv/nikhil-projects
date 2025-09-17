import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton, TextField, FormLabel } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
// import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        display: 'flex',
        flexDirection: 'column',
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none"
    },
    box: {
        display:"flex",
        flexDirection:"row"
    }
}));

function PhotoCaptureUploadModal(props) {
    const [open, setOpen] = useState(false);
    const [helpTextOpen, setHelPTextOpen] = useState(false);
    const [imageUpload, setImageUpload] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const modalSource = props.modalSource;
    const customOptions = props.customOptions;

    const CustomModal = () => {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <ImageCaptureUpload saveAdditionalOptions={(property, e) => props.saveAdditionalOptions(property, e)} isPhotoUpload={imageUpload} customOptions={customOptions} saveUploadImageSrc={(src) => { handleClose(); props.saveUploadImageSrc(modalSource, src)}} saveImageSrc={(src) => { handleClose(); props.saveImageSrc(modalSource, src) }} />
                </div>
            </Modal>
        );
    };

    const HeplTextModal = () => {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={helpTextOpen}
                onClose={handleHelpTextClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="material-element-label" style={{ textAlign: 'center', padding: '20px' }}>
                        <Typography component="span">
                            Help Text
                        </Typography>
                    </div>
                    <Grid item xs={12} sm={12}>
                        <FormLabel>{customOptions.helpText}</FormLabel>
                    </Grid>

                </div>
            </Modal>
        );
    };

    const handleOpen = (imageUpload) => {
        setOpen(true);
        if (imageUpload) {
            setImageUpload(true);
        } else {
            setImageUpload(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleHelpTextOpen = () => {
        setHelPTextOpen(true);
    };

    const handleHelpTextClose = () => {
        setHelPTextOpen(false);
    };

    const classes = useStyles();
    return (
        <div className={classes.box}>
            {customOptions.isPhotoAvail &&
                <IconButton
                    aria-label='Desktop View'
                    onClick={() => { handleOpen(false); }}
                    disabled={props.isDisable || props.read_only}>
                    <PhotoCamera />
                </IconButton>
            }
            {customOptions.isPhotoUpload &&
                <IconButton
                    aria-label='Desktop View'
                    onClick={() => { handleOpen(true); }}
                    disabled={props.isDisable || props.read_only}>
                    <ImageRoundedIcon />
                </IconButton>
            }
            {customOptions.isShowHelp &&
                <>
                    <IconButton
                        aria-label='Desktop View'
                        onClick={() => { handleHelpTextOpen(); }}
                        disabled={props.isDisable || props.read_only}>
                        <HelpRoundedIcon />
                    </IconButton>
                    <HeplTextModal />
                </>
            }
            {
                customOptions.sampleS3Uri != '' &&
                <img src={customOptions.sampleS3Uri} width="30" height="30" className="image-upload-preview"/>
            }
            <CustomModal />
        </div>
    );
}

export default PhotoCaptureUploadModal;


const ImageCaptureUpload = (props) => {
    const webcamRef = React.useRef(null);
    const [imgFileObj, setImgObj] = React.useState(null);
    const [sizeError,setSizeError]= React.useState(true);
    const customOptions = props.customOptions;
    const isPhotoUpload = props.isPhotoUpload;
    let feetVal = '';
    let inchesVal = '';
    let azimuthAngleVal = '';
    const [error, SetError] = useState(false);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        let file = {};
        file.name = 'photo_capture_' + (Math.floor(Math.random() * 1000000));
        file.type = imageSrc.substring(imageSrc.indexOf('data:')+5, imageSrc.indexOf(';'));
        file.size = imageSrc.length - (imageSrc.substr(0, imageSrc.indexOf('base64,')+7)).length;
        file.imageSrc = imageSrc;
        if(file.size > 10000000){
            setSizeError(false);
        }else {
            setImgObj(file);
        }
    }, [webcamRef, setImgObj]);

    const deleteImage = () => {
        setImgObj(null);
    }
    const saveImage = () => {
        if (customOptions.tapedrop && feetVal == '' && inchesVal == '') {
            SetError(true);
            return;
        }
        if (customOptions.isDistToBuilding && feetVal == '' && inchesVal == '') {
            SetError(true);
            return;
        }
        if (customOptions.isTargetAzimuthAngle && azimuthAngleVal == '') {
            SetError(true);
            return;
        }
        if (isPhotoUpload) {
            props.saveUploadImageSrc(imgFileObj);
        } else {
            props.saveImageSrc(imgFileObj);
        }
    }

    const handleAdditionalOptions = (property, e) => {
        if (property == 'feet') {
            feetVal = e.target.value;
        } else if (property == 'inches') {
            inchesVal = e.target.value;
        } else if (property == 'azimuthAngle') {
            azimuthAngleVal = e.target.value;
        }
        props.saveAdditionalOptions(property, e);
    }

    const handleImageUpload = (clickSource, e) => {
        const self = this;
        const target = e.target;
        let file; let reader;

        if (target != undefined && target.files && target.files.length) {
            file = target.files[0];
            reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const imageSrc = reader.result;
                file.imageSrc = imageSrc;
                if(file.size > 10000000){
                    setSizeError(false);
                }else {
                    setImgObj(file);
                }
            };
        }
    }
    const errorStyle = {
        color:"#f44336",
        fontSize:"0.75rem",
        fontWeight:"400",
        lineHeight:"1.66",
        letterSpacing:"0.03333em",
        fontFamily:"Roboto"
    }
    return (
        <>
            {imgFileObj ?
                <img height="350" width="400" style={{ alignSelf: 'center'}}
                    src={imgFileObj.imageSrc}
                />
                :
                <>
                    {
                        isPhotoUpload ?
                            <>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    component='label'
                                    disableElevation
                                    style={{ color: '#FFFFFF' }}
                                // className={classname}
                                >
                                    {"Choose Image to Upload"}
                                    <input
                                        type='file'
                                        accept={'image/*'}
                                        hidden
                                        onChange={(e) => handleImageUpload("isPhotoUpload", e)}
                                    />
                                </Button>
                                <span style={errorStyle} hidden={sizeError} >Max size should be less than 10mb.</span>
                            </> :
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                style={{ width: '400px' }}
                            />
                    }
                </>

            }
            {
                imgFileObj ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            {
                                customOptions.tapedrop &&
                                <>
                                    <br></br>
                                    <FormLabel>Tape Drop</FormLabel>
                                    <Grid>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="outlined-basic"
                                            label="Feet"
                                            style={{paddingRight: '10px'}}
                                            error={error}
                                            onChange={(e) => handleAdditionalOptions('feet',e)}
                                            inputProps={{ type: 'number', padding: 10 }} />
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="outlined-basic"
                                            label="Inches"
                                            error={error}
                                            onChange={(e) => handleAdditionalOptions('inches', e)}
                                            inputProps={{ type: 'number', padding: 10 }} />
                                    </Grid>
                                </>

                            }
                            {
                                customOptions["isDistToBuilding"] &&
                                <>
                                    <br></br>
                                    <FormLabel>Distance to Building</FormLabel>
                                    <Grid>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="outlined-basic"
                                            label="Feet"
                                            error={error}
                                            style={{paddingRight: '10px'}}
                                            onChange={(e) => handleAdditionalOptions('feet', e)}
                                            inputProps={{ type: 'number', padding: 10 }} />
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="outlined-basic"
                                            label="Inches"
                                            error={error}
                                            onChange={(e) => handleAdditionalOptions('inches', e)}
                                            inputProps={{ type: 'number', padding: 10 }} />
                                    </Grid>
                                </>

                            }
                            {
                                customOptions["isTargetAzimuthAngle"] &&
                                <>
                                    <br></br>
                                    <FormLabel>Target Azimuth Angle</FormLabel>
                                    <Grid>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="outlined-basic"
                                            label="Target Azimuth Angle"
                                            type="number"
                                            error={error}
                                            onChange={(e) => handleAdditionalOptions('azimuthAngle', e)}
                                            inputProps={{ type: 'text', padding: 10 }} />

                                    </Grid>
                                </>

                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={deleteImage}
                                style={{ marginTop: '10px' }}
                            >
                                {!isPhotoUpload ? `Recapture` : `CANCEL/REUPLOAD`}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={saveImage}
                                style={{ marginTop: '10px' }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <>
                        {
                            !isPhotoUpload &&
                            <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={capture}
                                style={{ marginTop: '10px' }}>
                                Capture photo
                            </Button>
                            <span style={errorStyle} hidden={sizeError} >Max size should be less than 10mb.</span>
                            </>
                        }
                    </>

            }
        </>
    );
};