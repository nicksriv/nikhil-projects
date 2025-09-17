import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton, TextField, FormLabel, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import VideocamIcon from '@material-ui/icons/Videocam';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DeleteOutlinedIcon from '@material-ui/icons/HighlightOff';
// import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';

// import WebcamStreamCapture from "./WebcamStreamCapture";

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
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    box: {
        display:"flex",
        flexDirection:"row",
    },
    linkStyle:{
        alignSelf: 'center',
        textAlign: 'center',
        color:'#2C3E93',
        textDecorationLine: 'underline',
    },
    cancelIcon: {
        opacity: 0,
        '&:hover': {
            opacity: 1,
        }
    }
}));

function VideoCaptureUploadModal(props) {
    const [open, setOpen] = useState(false);
    // const [helpTextOpen, setHelPTextOpen] = useState(false);
    const [videoUpload, setVideoUpload] = useState(false);
    const [videoCaptured, setVideoCaptured] = useState("");
    const [displayVideo, setDisplayVideo] = useState(false);
    const [recod , setRecod] = useState(true);
    const [modalStyle] = useState(getModalStyle);
    const modalSource = props.modalSource;
    const customOptions = props.customOptions;
    const isModalOpen = (isOpen) => {
        setOpen(isOpen);
    }
    const handleDeleteVidio = () => {
        console.log( customOptions )
        setRecod(false);
         customOptions.recordedVideo = "";
        
    }
    const CustomModal = () => {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    {/* <WebcamStreamCapture isModalOpen={isModalOpen} isVideoUpload={videoUpload} customOptions={customOptions} saveUploadVideoSrc={(src) => { handleClose(); props.saveUploadVideoSrc(modalSource, src) }} saveVideoSrc={(src) => { handleClose(); props.saveVideoSrc(modalSource, src) }} /> */}
                </div>
            </Modal>
        );
    };

    const handleOpen = (videoUpload) => {
        setOpen(true);
        if (videoUpload) {
            setVideoUpload(true);
        } else {
            setVideoUpload(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    

    const classes = useStyles();
    return (
        <>
            <div className={classes.box} style={{justifyContent:"flex-start"}}>
            {customOptions.isVideoAvail &&
                <IconButton
                    aria-label='Desktop View'
                    onClick={() => { handleOpen(false); setRecod(true); }}
                    disabled={props.isDisable || props.read_only}>
                    <VideocamIcon fontSize="large" />
                </IconButton>
            }
            {customOptions.isVideoUpload &&
                <IconButton
                    aria-label='Desktop View'
                    onClick={() => { handleOpen(true); setRecod(true);}}
                    disabled={props.isDisable || props.read_only}>
                    <VideoLibraryIcon />
                </IconButton>
            }

            
            <CustomModal />
            {

        !props.isFromMastersScreen &&

        customOptions.isVideoLink && <a href={customOptions.videoLink} target="_blank" className={classes.linkStyle} >Video Link</a>

        }
        </div>
        { props.isFromMastersScreen &&
        (
        <div>
        {customOptions.isVideoLink && <a style={{ alignSelf: 'center', textAlign: "centre" , paddingLeft:'1rem' }}>Video Link</a>}
        </div>

        )
        }
        {/* {customOptions.isVideoLink && <a style={{alignSelf:'center', textAlign:'center'}} href={customOptions.videoLink}  >Your Video Link</a>} */}
        

        { 
        customOptions.recordedVideo && recod &&
        <>  
           
            <DeleteOutlinedIcon  fontSize="small" style={{marginLeft:'90%'}} onClick={handleDeleteVidio}/>

             
            <video  style={{ width:"100%", justifyContent:'stretch', height: 85, padding:5, border:'1px solid black' }} src={customOptions.recordedVideo} controls />
        </>       
    }   

    
        </>
         );
}

export default VideoCaptureUploadModal;
