import React, { useState } from 'react';
import ComponentHeader from '../form-elements/component-header';
import { IconButton, Grid, Typography, TextField, Button } from '@material-ui/core';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import CustomModal from './modal';
import ComponentLabel from './material-element-label';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const IS_PREAVAIL = "isPreAvail";
const IS_POSTAVAIL = "isPostAvail";
const IS_PHOTOAVAIL = "isPhotoAvail";
const IS_360AVAIL = "is360Avail";
const IS_BARCODEAVAIL = "isBarcodeAvail";

const IS_PREPHOTOUPLOAD = "isPrePhotoUpload";
const IS_POSTPHOTOUPLOAD = "isPostPhotoUpload";
const IS_PHOTOUPLOAD = "isPhotoUpload";
const IS_360PHOTOUPLOAD = "is360PhotoUpload";

export default class BarcodeScanner extends React.Component {
    constructor(props){
        super(props);
        this.state={
            commentText: '',
            isPreAvail: '',
            isPostAvail: '',
            isPhotoAvail: '',
            is360Avail: '',
            isBarcodeAvail: '',

            isPrePhotoUpload: '',
            isPostPhotoUpload: '',
            isPhotoUpload: '',
            is360PhotoUpload: '',

            isCommentsEditMode: false
        }
    }

    enableCamera(optionName){
        console.log(optionName);
    }

    textChange = event => {
        const value = event.target.value;
        const state = this.state;

        if(this.props.data.customOptions.isCommentsAvail){
            state.isCommentsEditMode = true;
        }
        state.commentText = value;

        this.setState(state);            
    }

    handleImageUpload = (clickSource, e) => {
        const self = this;
        const target = e.target;
        let file; let reader;

        if (target.files && target.files.length) {
            file = target.files[0];
            reader = new FileReader();
            reader.readAsDataURL(file);
      
            reader.onloadend = () => {
                this.saveUploadImageSrc(clickSource, reader.result);
            };
        }
    }

    saveUploadImageSrc = (clickSource, imageSrc) => {
        console.log(clickSource);
        switch(clickSource){
            case IS_PREPHOTOUPLOAD:
                let {isPrePhotoUpload} = this.state;
                isPrePhotoUpload = imageSrc;
                this.setState({isPrePhotoUpload: isPrePhotoUpload});
            return;
            case IS_POSTPHOTOUPLOAD:
                let {isPostPhotoUpload} = this.state;
                isPostPhotoUpload = imageSrc;
                this.setState({isPostPhotoUpload: isPostPhotoUpload});
            return;
            case IS_PHOTOUPLOAD:
                let {isPhotoUpload} = this.state;
                isPhotoUpload = imageSrc;
                this.setState({isPhotoUpload: isPhotoUpload});
            return;
            case IS_360PHOTOUPLOAD:
                let {is360PhotoUpload} = this.state;
                is360PhotoUpload = imageSrc;
                this.setState({is360PhotoUpload: is360PhotoUpload});
            return;
        }
    }

    saveCaptureImageSrc = (modalSource, imageSrc) => {
        console.log(modalSource);
        switch(modalSource){
            case IS_PREAVAIL:
                let {isPreAvail} = this.state;
                isPreAvail = imageSrc;
                this.setState({isPreAvail: isPreAvail});
            return;
            case IS_POSTAVAIL:
                let {isPostAvail} = this.state;
                isPostAvail = imageSrc;
                this.setState({isPostAvail: isPostAvail});
            return;
            case IS_PHOTOAVAIL:
                let {isPhotoAvail} = this.state;
                isPhotoAvail = imageSrc;
                this.setState({isPhotoAvail: isPhotoAvail});
            return;
            case IS_360AVAIL:
                let {is360Avail} = this.state;
                is360Avail = imageSrc;
                this.setState({is360Avail: is360Avail});
            return;
            case IS_BARCODEAVAIL:
                let {isBarcodeAvail} = this.state;
                isBarcodeAvail = imageSrc;
                this.setState({isBarcodeAvail: isBarcodeAvail});
            return;
        }
    }
    render(){
        const customOptions = this.props.data.customOptions;
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className='form-group '>
                    <ComponentLabel {...this.props} />
                    <Grid container spacing={1} justifyContent="space-between" style={{marginTop:"1rem"}}>
                        {/* BARCODE */}
                        <Grid item xs={12} sm={4} className="ml-2 py-3 pl-2" style={{border:"1px solid #cecece", borderRadius:"5px",alignSelf:'center'}}>
                            <Typography component="span">Barcode</Typography>
                        </Grid>
                        <Grid item xs={12} sm={7} style={{display:"flex"}} justifyContent='center'>
                            <CustomModal 
                                modalSource={IS_BARCODEAVAIL} 
                                isDisable={!customOptions.isBarcodeAvail}
                                customOptions={customOptions} 
                                read_only={this.props.read_only}
                                saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                        </Grid>
                        {
                            (this.state.isBarcodeAvail!=='') && 
                            <Grid item xs={12}>
                                {this.state.isBarcodeAvail!=='' &&
                                <Typography component="h6">Barcode Data: {this.state.isBarcodeAvail}</Typography>
                                }
                            </Grid>
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}


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
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none"
    },
    SaveCommentsBtn: {
        marginTop: '10px',
        width: 'fit-content',
        alignSelf: 'center'
    },

}));
export function CommentsModal(props){
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={true}
        >
            <div style={modalStyle} className={classes.paper}>
                <TextField    
                    size="small" 
                    variant='outlined' 
                    label="Comments"
                    name="isCommentsAvail" 
                    value={props.value}
                    onChange={(e) => props.textChange(e)}
                /> 
                <Button
                    color='primary'
                    variant="contained"
                    className={classes.SaveCommentsBtn}
                    onClick={()=>props.setCommentsEdit()} 
                    >
                    Save
                </Button>
            </div>
        </Modal>
    )
}