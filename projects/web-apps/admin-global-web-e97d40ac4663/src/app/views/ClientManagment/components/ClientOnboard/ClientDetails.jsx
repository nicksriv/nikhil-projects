import React, { useEffect, useRef, useState } from 'react';
import {
    Grid, TextField, FormControlLabel, InputAdornment,
    MenuItem,
    FormLabel,
    Button,
    Checkbox,
    //Box,
    Tooltip,
    IconButton,
    Modal,
    Box,
} from '@material-ui/core';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import PropTypes from "prop-types";
import { V5GlobalFormFooter } from '../../../../components';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { makeStyles, 
  //  ThemeProvider, createTheme  
}from '@material-ui/core/styles';
import InfoIcon from "@material-ui/icons/Info";
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Delete } from '@material-ui/icons';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
//import { useEffect } from 'react';


// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// })
const useStyles = makeStyles((theme, custom) => ({
    root: {

        // '& > *': {
        //     marginTop: theme.spacing(2),
        // },
        // '& .MuiGrid-spacing-xs-5': {
        //     justifyContent: "center"
        // },
        // '& .Mui-selected': {
        //     backgroundColor: '#2A4EBD',
        //     color: '#fff !important',
        // }        
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },
        // "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl":{
        //     color:'pink',
        // },

        "& .MuiFormLabel-root.Mui-focused": {
            color: "#2C3E93"
        },
    },
    palette: {
        primary: {
            //main:"#2C3E93",
        }
    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    disabledInputLabel: {
        "& .MuiFormLabel-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: "#9f9f9e"
        }
    },
    actvBtn: {
        backgroundColor: "#E5F2F0",
        color: "#2C3E93",
        border: "1px solid #2C3E93",
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    inctvBtn: {
        backgroundColor: "#EBD9DC",
        border: "1px solid #B10021",
        padding: "0 1rem",
        margin: "0 0.5rem",
        color: "#B10021"
    },
    button: {
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    infoIcon: {
        fontSize: '1rem',
        '&:hover': {
            color: '#2C3E93'
        }
    },
    iconColor: {
        color: "#636365"
    },
    dropZone: {
        border: "1px dotted #777",
        borderRadius: '5px',
        height: '56px'
    },
    dropZoneError: {
        border: "1px dotted #F44336",
        borderRadius: '5px',
        height: '56px'
    },
    dropZoneInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        color: '#777',
        marginTop: '0.4rem',
    },
    helperText: {
        fontSize: "12px",
        fontWeight: "300"
    },
    warning: {
        fontSize: "10px",
        color: "#8E8F8E"
    },
    warningBackgroundImage: {
        fontSize: "10px",
        color: "#F44336"
    },
    solidBtn: {
        backgroundColor: "#2C3E93",
        color: "#202020",
        height: "2rem"
    },
    outlinedBtn: {
        height: "2rem",
        marginLeft: "10px",
        border: "1px solid #2C3E93",
        color: "#2C3E93"
    }
}));

function ClientDetails(props) {
    const {
        backgroundImageSrc,
        formValues,
        fileName,
        states,
        cities,
        pageMode,
        handleInputChange,
        handleStatusChange,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        handleCanceBtn,
        styleObj,
        errorState,
        handleDrop,
        deleteLogo,
        deletelogoImage,
        handleBackgroundImage,
        imageError,
        backImageName,
        deletebackgroundImage,
        deleteImage
       // file
    } = props;
    console.log(backImageName)
    const classes = useStyles();
    const helpertext = `Max file size should be 10 MB with dimension (HxW) 300x150 PX.`;
    const dispatch = useDispatch();
    const [cropper, setCropper] = useState();
    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        dispatch({
            type: "getStatesDataAction" 
        });
    }, []);

    useEffect(()=> {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: formValues.state
        });
    }, [formValues.state]);

    useEffect(() => {
        if (backgroundImageSrc) {
            setOpen(true);
        }
    }, [backgroundImageSrc]);

    const handleClose = () => {
        setOpen(false);
    }
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const cropImage = () => {
        if (typeof cropper !== "undefined") {
            let croppedImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');
            let file = dataURLtoFile(croppedImage, backImageName);
            let data = new FormData();
            data.append('file', file);
            dispatch({
                type: 'setClientBackgroundAction',
                file: data
            });
            setOpen(false);
        }
    }
    const closePopup = () => {
        setOpen(false);
        deleteImage();
    }
    const backgroundOpacityValues = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}
            <form>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Cropper
                            aspectRatio={9 / 16}
                            preview=".img-preview"
                            guides={false}
                            src={backgroundImageSrc}
                            minCropBoxWidth={900}
                            minCropBoxHeight={1600}
                            minCanvasHeight={0}
                            // autoCropArea={1}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            viewMode={1}
                            dragMode="move"
                            cropBoxMovable={true}
                        />
                        <div className='flex items-center mt-5'>
                            <Button variant="contained" className={`mr-3 ${classes.solidBtn}`} onClick={cropImage}>Crop</Button>
                            <Button variant="outlined" className={`${classes.outlinedBtn}`} onClick={closePopup}>Cancel</Button>
                        </div>
                    </Box>
                </Modal>
                <div className={"w-full mt-2"}>
                    <Grid container direction="row" spacing="3" className='pb-4 w-full'>
                        <Grid item>
                            <h5>Basic details</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='pb-4 w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            {/* <ThemeProvider theme={custom}> */}
                            <TextField
                                id="clientName"
                                name="clientName"
                                label="Client Name"
                                type="text"
                                variant="outlined"
                                color="primary"
                                value={formValues.clientName}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                        className: classes.input,
                                    }
                                }}
                                error={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.clientName
                                    && errorState.clientDetails.clientName.error}
                                helperText={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.clientName
                                    && errorState.clientDetails.clientName.error
                                    && errorState.clientDetails.clientName.errorMsg}
                            />
                            {/* </ThemeProvider> */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="headOfficeName"
                                name="headOfficeName"
                                label="Head Office Name"
                                type="text"
                                variant="outlined"
                                value={formValues.headOfficeName}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <div className={classes.dropZone}>
                                <Dropzone
                                    minSize={0}
                                    maxSize={10485760}
                                    accept="image/*"
                                    onDrop={handleDrop}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="container">
                                            <div
                                                {...getRootProps({
                                                    onDrop: event => event.stopPropagation()
                                                })}
                                            >
                                                <input id="uploadLogo"
                                                    name="uploadLogo"
                                                    label="Upload Logo"  {...getInputProps()} />
                                                <div className={classes.dropZoneInput}>
                                                    {fileName || formValues.clientLogoName && !deletelogoImage ? <span className='color-primary'>{formValues.clientLogoName ? formValues.clientLogoName : fileName}</span> : <span>Upload Logo</span>}

                                                    <IconButton className="ml-20">
                                                        {fileName || formValues.clientLogoName && !deletelogoImage ? <Delete onClick={deleteLogo} className={`${classes.infoIcon} ${classes.iconColor} `} /> : null}
                                                    </IconButton>
                                                    <Tooltip placement="top-start" title={<p className={classes.helperText}>{helpertext}</p>}>
                                                        <IconButton>
                                                            <InfoIcon className={`${classes.infoIcon} ${classes.iconColor}`} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <p className={classes.warning}>Recommended logo size is 300*150 pixels without background for better visibility.</p>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </Grid>
                        {/* {
                            pageMode !== "add" &&
                            (
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="clientId"
                                        name="clientId"
                                        label="Client ID"
                                        type="text"
                                        variant="outlined"
                                        value={formValues.clientId}
                                        className={styleObj.textFieldWidth}
                                        disabled
                                    />
                                </Grid>
                            )
                        } */}
                    </Grid>
                    <Grid container direction="row" spacing="5" className='pb-4  w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                type="text"
                                variant="outlined"
                                value={formValues.address}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                disabled
                                id="country"
                                name="country"
                                label="Country"
                                type="text"
                                variant="outlined"
                                value={formValues.country}
                                //disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={styleObj.textFieldWidth}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="state"
                                select
                                name="state"
                                label="State"
                                type="text"
                                variant="outlined"
                                value={formValues.state}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                { 
                                    states && states.map((x,index)=>{
                                        return(
                                    <MenuItem value={x.name}>{x.name}</MenuItem>
                                            )
                                        }) 
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='pb-4  w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="city"
                                select
                                name="city"
                                label="City"
                                type="text"
                                variant="outlined"
                                value={formValues.city? formValues.city : ''}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }
                                }}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                { 
                                cities && cities.map((x,index)=>{
                                    return(
                                    <MenuItem value={x.name} >{x.name}</MenuItem>
                                    )
                                    }) 
                                }
                            </TextField>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="area"
                                name="area"
                                label="Area"
                                type="text"
                                variant="outlined"
                                value={formValues.area}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="pinCode"
                                name="pinCode"
                                label="PIN"
                                type="text"
                                variant="outlined"
                                value={formValues.pinCode}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                error={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.pinCode
                                    && errorState.clientDetails.pinCode.error}
                                helperText={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.pinCode
                                    && errorState.clientDetails.pinCode.error
                                    && errorState.clientDetails.pinCode.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <div className={imageError ? classes.dropZoneError : classes.dropZone}>
                                <Dropzone
                                    // minSize={0}
                                    // maxSize={1024}
                                    accept="image/*"
                                    onDrop={handleBackgroundImage}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="container">
                                            <div
                                                {...getRootProps({
                                                    onDrop: event => event.stopPropagation()
                                                })}
                                            >
                                                <input id="uploadbackground"
                                                    name="uploadBackground"
                                                    label="Upload Background Image" {...getInputProps()} />
                                                <div className={classes.dropZoneInput}>
                                                    {backImageName || formValues.backgroundImageName && !deletebackgroundImage ? <span className='color-primary'> {backImageName ? backImageName : formValues.backgroundImageName}</span> : <span>Upload Background Image</span>}

                                                    <IconButton className="ml-20">
                                                        {backImageName || formValues.backgroundImageName && !deletebackgroundImage ? <Delete onClick={deleteImage} className={`${classes.infoIcon} ${classes.iconColor} `} /> : null}
                                                    </IconButton>
                                                    <Tooltip placement="top-start" title={<p className={classes.helperText}>Image should be of dimension 960 x 1600 px</p>}>
                                                        <IconButton>
                                                            <InfoIcon className={`${classes.infoIcon} ${classes.iconColor}`} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <p className={classes.warningBackgroundImage}>{imageError && "Image should be maximum of size 1 MB and of dimension 1280 x 1920 px "}</p>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label="Background Opacity"
                                select
                                value={formValues.opacity ? formValues.opacity : ''}
                                onChange={handleInputChange}
                                name="opacity"
                            >
                                {backgroundOpacityValues.map((opacity) => <MenuItem value={opacity}>{opacity}</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='pb-4  w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            {
                                pageMode !== "view" ?
                                    (
                                        <>
                                            <FormControlLabel
                                                value="status"
                                                name="status"
                                                label="Status:"
                                                labelPlacement="start"
                                                size="small"
                                                control={
                                                    <>
                                                        <Button variant="outlined" size="small"
                                                            onClick={(e) => handleStatusChange("INACTIVE")}
                                                            name="status"
                                                            className={formValues.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                                        >
                                                            INACTIVE
                                                            <Checkbox
                                                                name="INACTIVE"
                                                                icon={<CircleUnchecked />}
                                                                checked={formValues.status === "INACTIVE" ? true : false}
                                                                checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                            />
                                                        </Button>

                                                        <Button variant="outlined" size="small"
                                                            onClick={(e) => handleStatusChange("ACTIVE")}
                                                            name="status"
                                                            className={formValues.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                                        >
                                                            ACTIVE
                                                            <Checkbox color='primary' name="ACTIVE"
                                                                icon={<CircleUnchecked />}
                                                                checked={formValues.status === "ACTIVE" ? true : false}
                                                                checkedIcon={<CircleCheckedFilled />}
                                                            />
                                                        </Button>
                                                    </>
                                                }
                                            />
                                        </>
                                    )
                                    :
                                    (
                                        <FormLabel className="text-16" component="legend">
                                            Status:
                                            {formValues.status === "ACTIVE" && (<Button variant="outlined" size="small"
                                                className={`${classes.actvBtn} mr-3 ml-3 ${classes.button}`}
                                            >ACTIVE
                                                <Checkbox color='primary' icon={<CircleUnchecked />}
                                                    checked={true}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </Button>)}
                                            {formValues.status === "INACTIVE" && (<Button variant="outlined" size="small"
                                                className={`${classes.inctvBtn} mr-3 ml-3 ${classes.button}`}
                                            >INACTIVE
                                                <Checkbox color='success' icon={<CircleUnchecked />}
                                                    checked={true}
                                                    checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                />
                                            </Button>)}
                                        </FormLabel>
                                    )
                            }
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="3" className='pb-4  w-full mt-15'>
                        <Grid item>
                            <h5>Client Admin Details</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className='pb-4  w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.admin && formValues.admin.firstName}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="middleName"
                                name="middleName"
                                label="Middle Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.admin && formValues.admin.middleName !== "" ? formValues.admin.middleName : 'N/A' }
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={formValues && formValues.admin && formValues.admin.lastName}
                                disabled={pageMode === "view" ? true : false}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState && errorState.clientName && errorState.clientName.error}
                                helperText={errorState && errorState.clientName && errorState.clientName.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing="5" className="min-h-140  w-full">
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="mobileNumber"
                                name="mobile"
                                label="Mobile Number"
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                variant="outlined"
                                value={formValues && formValues.admin && formValues.admin.mobile}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.mobile
                                    && errorState.clientDetails.mobile.error? true : !formValues?.admin.mobile.match(/^[1-9][0-9]*$/gm) && formValues?.admin.mobile.length > 0 ? true : false}
                                helperText={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.mobile
                                    && errorState.clientDetails.mobile.error
                                    && errorState.clientDetails.mobile.errorMsg? errorState.clientDetails.mobile.errorMsg : !formValues?.admin.mobile.match(/^[1-9][0-9]*$/gm) && formValues?.admin.mobile.length > 0 ? `Please enter valid mobile number` : null}
                                errorStyle={{ position: 'absolute', bottom: '-0.9rem' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                }}
                                variant="outlined"
                                value={formValues && formValues.admin && formValues.admin.email}
                                onChange={handleInputChange}
                                className={`${styleObj.textFieldWidth} ${classes.root}
            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                required
                                disabled={pageMode === "view" ? true : false}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                error={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.email
                                    && errorState.clientDetails.email.error}
                                helperText={errorState
                                    && errorState.clientDetails
                                    && errorState.clientDetails.email
                                    && errorState.clientDetails.email.error
                                    && errorState.clientDetails.email.errorMsg}
                            />
                        </Grid>
                    </Grid>
                    <V5GlobalFormFooter
                        isSubmit={false}
                        pageMode={pageMode}
                        backArrowDisabled={backArrowDisabled}
                        nextArrowDisabled={nextArrowDisabled}
                        cancelBtnDisabled={cancelBtnDisabled}
                        saveAndContinueBtnDisabled={saveAndContinueBtnDisabled}
                        handleNextArrow={handleNextArrow}
                        handleBackArrow={handleBackArrow}
                        handleSaveAndContinue={(e) => handleSaveAndContinue(e, 'CLIENT')}
                        handleCanceBtn={handleCanceBtn}
                    />
                    {/* </div> */}
                </div>
            </form >
            {/* </ThemeProvider> */}
        </div >
    );
}

ClientDetails.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func
}

ClientDetails.defaultProps = {

};

export default ClientDetails;