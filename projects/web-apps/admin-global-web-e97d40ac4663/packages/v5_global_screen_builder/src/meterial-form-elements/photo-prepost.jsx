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

export default class Photo_PrePost extends React.Component {
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

    setCommentsModalFalse(){
        this.setState({isCommentsEditMode: false});
    }

    render(){
        const customOptions = this.props.data.customOptions;
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className='form-group '>
                    <ComponentLabel {...this.props} />
                    <Grid container spacing={1} className="material-element-container">    
                        {/* PRE PHOTO */}
                        <Grid item xs={12} sm={4} className="vertical-middle">
                            <Typography component="span">Pre Photo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal modalSource={IS_PREAVAIL} isDisable={!customOptions.isPreAvail} customOptions={customOptions} saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="is-pre-photo-upload"
                                multiple
                                type="file"
                                onChange={this.handleImageUpload.bind(this, IS_PREPHOTOUPLOAD)}
                            />
                            <label style={{pointerEvents: !customOptions.isPrePhotoUpload ? 'none' : 'visible'}} htmlFor="is-pre-photo-upload">
                                <IconButton 
                                    aria-label='Desktop View' 
                                    component="span"  
                                    disabled={!customOptions.isPrePhotoUpload }>
                                    <ImageRoundedIcon />
                                </IconButton>
                            </label>
                        </Grid>
                        {
                            (this.state.isPreAvail!=='' || this.state.isPrePhotoUpload!=='') && 
                            <Grid item xs={12}>
                                {this.state.isPreAvail!=='' &&
                                <img src={this.state.isPreAvail} height="100" style={{marginRight: '20px'}} className="image-upload-preview" />}
                                
                                {this.state.isPrePhotoUpload!=='' && 
                                <img src={this.state.isPrePhotoUpload} height="100" className="image-upload-preview" />}
                            </Grid>
                        }

                        {/* POST PHOTO */}
                        <Grid item xs={12} sm={4} className='vertical-middle'>
                            <Typography component="span">Post Photo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal modalSource={IS_POSTAVAIL} isDisable={!customOptions.isPostAvail} customOptions={customOptions} saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="is-post-photo-upload"
                                multiple
                                type="file"
                                onChange={this.handleImageUpload.bind(this, IS_POSTPHOTOUPLOAD)}
                            />
                            <label style={{pointerEvents: !customOptions.isPostPhotoUpload ? 'none' : 'visible'}} htmlFor="is-post-photo-upload">
                                <IconButton 
                                    aria-label='Desktop View' 
                                    component="span"  
                                    disabled={!customOptions.isPostPhotoUpload}>
                                    <ImageRoundedIcon />
                                </IconButton>
                            </label>
                        </Grid>
                        {
                            (this.state.isPostAvail!=='' || this.state.isPostPhotoUpload!=='') && 
                            <Grid item xs={12}>
                                {this.state.isPostAvail!=='' &&
                                <img src={this.state.isPostAvail} height="100" style={{marginRight: '20px'}} className="image-upload-preview" />}
                                
                                {this.state.isPostPhotoUpload!=='' && 
                                <img src={this.state.isPostPhotoUpload} height="100" className="image-upload-preview" />}
                            </Grid>
                        }

                        {/* PHOTO */}
                        <Grid item xs={12} sm={4} className='vertical-middle'>
                            <Typography component="span">Photo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal modalSource={IS_PHOTOAVAIL} isDisable={!customOptions.isPhotoAvail} customOptions={customOptions} saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="is-photo-upload"
                                multiple
                                type="file"
                                onChange={this.handleImageUpload.bind(this, IS_PHOTOUPLOAD)}
                            />
                            <label style={{pointerEvents: !customOptions.isPhotoUpload ? 'none' : 'visible'}} htmlFor="is-photo-upload">
                                <IconButton 
                                    aria-label='Desktop View' 
                                    component="span"  
                                    disabled={!customOptions.isPhotoUpload}>
                                    <ImageRoundedIcon />
                                </IconButton>
                            </label>
                        </Grid>
                        {
                            (this.state.isPhotoAvail!=='' || this.state.isPhotoUpload!=='') && 
                            <Grid item xs={12}>
                                {this.state.isPhotoAvail!=='' &&
                                <img src={this.state.isPhotoAvail} height="100" style={{marginRight: '20px'}} className="image-upload-preview" />}
                                
                                {this.state.isPhotoUpload!=='' && 
                                <img src={this.state.isPhotoUpload} height="100" className="image-upload-preview" />}
                            </Grid>
                        }

                        {/* 360 PHOTO */}
                        <Grid item xs={12} sm={4} className='vertical-middle'>
                            <Typography component="span">360 Photo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal modalSource={IS_360AVAIL} isDisable={!customOptions.is360Avail} customOptions={customOptions} saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="is-360-photo-upload"
                                multiple
                                type="file"
                                onChange={this.handleImageUpload.bind(this, IS_360PHOTOUPLOAD)}
                            />
                            <label style={{pointerEvents: !customOptions.is360PhotoUpload ? 'none' : 'visible'}} htmlFor="is-360-photo-upload">
                                <IconButton 
                                    aria-label='Desktop View' 
                                    component="span"  
                                    disabled={!customOptions.is360PhotoUpload}>
                                    <ImageRoundedIcon />
                                </IconButton>
                            </label>
                        </Grid>
                        {
                            (this.state.is360Avail!=='' || this.state.is360PhotoUpload!=='') && 
                            <Grid item xs={12}>
                                {this.state.is360Avail!=='' &&
                                <img src={this.state.is360Avail} height="100" style={{marginRight: '20px'}} className="image-upload-preview" />}
                                
                                {this.state.is360PhotoUpload!=='' && 
                                <img src={this.state.is360PhotoUpload} height="100" className="image-upload-preview" />}
                            </Grid>
                        }

                        {/* BARCODE */}
                        <Grid item xs={12} sm={4} className='vertical-middle'>
                            <Typography component="span">Barcode</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal modalSource={IS_BARCODEAVAIL} isDisable={!customOptions.isBarcodeAvail} customOptions={customOptions} saveImageSrc={(modalSource, src)=>this.saveCaptureImageSrc(modalSource, src)} />
                        </Grid>
                        {
                            (this.state.isBarcodeAvail!=='') && 
                            <Grid item xs={12}>
                                {this.state.isBarcodeAvail!=='' &&
                                <Typography component="h6">Barcode Data: {this.state.isBarcodeAvail}</Typography>
                                }
                            </Grid>
                        }

                        <Grid item xs={12} sm={12}></Grid>
                        
                        {/* COMMENTS */}
                        <Grid item xs={12}>
                            <>
                                <Typography variant="subtitle2" component="span">Comments: </Typography>
                                {!this.state.isCommentsEditMode && customOptions.isCommentPopAvail && 
                                    <IconButton
                                        onClick={()=>this.setState({isCommentsEditMode: true})}>
                                        <CreateRoundedIcon fontSize="small" />
                                    </IconButton>
                                }
                            </>
                        </Grid>
                        {
                            customOptions.isCommentsAvail ? 
                            <Grid item xs={12} sm={8}>    
                                <TextField    
                                    size="small" 
                                    variant='outlined' 
                                    name="isCommentsAvail" 
                                    value={this.state.commentText}
                                    // onEnter={()=>this.setState({isCommentsEditMode: false})}
                                    onChange={this.textChange.bind(this)}
                                />
                                { this.state.isCommentsEditMode && 
                                    <IconButton
                                        onClick={()=>this.setState({isCommentsEditMode: false})} >
                                        <CheckRoundedIcon style={{ color: '#2b9500' }}/>
                                    </IconButton>
                                }
                                {/* <Typography 
                                    component="span" 
                                    style={{fontStyle: 'italic'}}
                                    onClick={()=>this.setState({isCommentsEditMode: true})}>
                                    {(this.state.commentText==='') ? '-' : this.state.commentText}
                                </Typography> */}
                            </Grid>
                            :
                            <Grid item xs={12} sm={8}>
                                {this.state.isCommentsEditMode ? 
                                    <CommentsModal
                                        value={this.state.commentText}
                                        textChange={this.textChange.bind(this)}
                                        setCommentsEdit={this.setCommentsModalFalse.bind(this)} />
                                    :
                                    <Typography 
                                        component="span" 
                                        style={{fontStyle: 'italic'}}
                                        onClick={()=>this.setState({isCommentsEditMode: true})}>
                                        {(this.state.commentText==='') ? '-' : this.state.commentText}
                                    </Typography>
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
    }
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