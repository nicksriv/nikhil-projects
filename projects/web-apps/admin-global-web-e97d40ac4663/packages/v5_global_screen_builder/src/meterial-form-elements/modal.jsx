import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton, FormHelperText } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

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
  }
}));

function SimpleModal(props) {
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const modalSource = props.modalSource;
  console.log('bar', props.read_only);
  const CustomModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
            {modalSource === 'isBarcodeAvail' ? 
            <BarcodeScanner saveImageSrc={(src) => {handleClose(); props.saveImageSrc(modalSource, src)}} />
            :
            <WebcamCapture saveImageSrc={(src) => {handleClose(); props.saveImageSrc(modalSource, src)}} />
            }
        </div>
      </Modal>
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <>
        <IconButton
            aria-label='Desktop View' 
            onClick={()=>{handleOpen();}}
            disabled={props.read_only}>
            <CameraAltRoundedIcon />
        </IconButton>
        <CustomModal />
    </>
  );
}

export default SimpleModal;


export function BarcodeScanner(props) {
  const [barcode, setBarcode] = useState('');
  const deleteImage = () => {
    setBarcode('');
  }
  const saveImage = () => {
    props.saveImageSrc(barcode);
  }
  return (
    <>
    {
      barcode === '' ?
      <>
      <BarcodeScannerComponent
        width={400}
        height={300}
        onUpdate={(err, result) => {
          if (result) setBarcode(result.text)
        }}
      />
      <FormHelperText>Note: Scan the barcode with the camera</FormHelperText>
      </>
      :
      <>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{width: '400px', height: '300px', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Typography variant="h5" component="h5">{barcode}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button 
                fullWidth
                variant="contained" 
                color="primary" 
                onClick={deleteImage}
                style={{marginTop: '10px'}}>
                    Retake
            </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button 
                fullWidth
                variant="contained" 
                color="primary" 
                onClick={saveImage}
                style={{marginTop: '10px'}}>
                    Save
            </Button>
        </Grid>
      </Grid>
      </>
    }
    </>
  )
}

const WebcamCapture = (props) => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const deleteImage = () => {
        setImgSrc(null);
    }
    const saveImage = () => {
        props.saveImageSrc(imgSrc);
    }
  
    return (
      <>
        {imgSrc ? 
          <img
            src={imgSrc}
          />
          :
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{width: '400px'}}
            />
        }
        {
            imgSrc ?
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button 
                        fullWidth
                        variant="contained" 
                        color="primary" 
                        onClick={deleteImage}
                        style={{marginTop: '10px'}}>
                            Retake
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        fullWidth
                        variant="contained" 
                        color="primary" 
                        onClick={saveImage}
                        style={{marginTop: '10px'}}>
                            Save
                    </Button>
                </Grid>
            </Grid>
            :
            <Button 
                variant="contained" 
                color="primary" 
                onClick={capture}
                style={{marginTop: '10px'}}>
                    Capture photo
            </Button>
        }
        
        
      </>
    );
  };