import React, { useRef, useCallback } from 'react';
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from './material-element-label';
import { TextField,Grid, Checkbox, FormControlLabel, Button, RadioGroup, FormControl, FormLabel, Radio, TextareaAutosize, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CustomModal from './videoCaptureUpload';

export default class TakeVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVideoUpload: '',
            isVideoAvail: '',
            feet: '',
            inches: '',
            azimuthAngle:'',
            mediaList: props.media ? props.media : [],
            optionId: '',
            newVideos: [],
            value: props.result ? props.result.value : '',
            comments: props.result ? props.result.comments : '',
            fieldResult: {
                questionId: props.data.id,
                value: '',
                comments: '',
                error: false
            }
        };
    }

    sendDataToProps() {
        const state = this.state;
        const fieldMedia = [];
        const fieldResult = {
            mediaCount: 0,
            value: null,
            questionId: this.props.data.id,
        };

        if (this.state.newImages.length > 0) {
            this.state.newImages.map((item) => {
                const photoUploadObj = {
                    questionId: this.props.data.id,
                    s3uri: item.imageUrl,
                    act_dist_to_bldg_ft: null,
                    act_dist_to_bldg_inch: null,
                    actualAzimuthAngle: null,
                    actualValue: null,
                    angleMeasureName: null,
                    angleUnit: null,
                    comments: null,
                    dist_to_bldg: null,
                    dist_to_bldg_avail: null,
                    expectedValue: null,
                    feet: item.feet,
                    inches: item.inches,
                    meter: null,
                    mime: null,
                    targetAzimuthAngle: item.azimuthAngle,
                    testMeasurement: null,
                    testMeasurementAlternate: null,
                    testMeasurementUnit: null,
                    testMeasurementUnitAlternate: null,
                    uri: null,
                    validationIsAccepted: null
                };
                fieldMedia.push(photoUploadObj);
                fieldResult.mediaCount++;
            });
        }

        this.props.collectFieldMedia(fieldMedia);
        this.props.collectFieldResults(fieldResult);

    }


    setVideoSrc = async (clickSource, imageFileObj, imageType) => {
        const previousVideos = this.state.newVideos;
         // fetch s3uri from aws
         let uri = imageFileObj.imageSrc;
        if (this.props.imageUploadCallback != null) {
            const awsS3uri = await this.props.videoUploadCallback(imageFileObj);
            uri = awsS3uri;
        }
        const newVideos = {
            imageUrl: uri,
            feet: this.state.feet,
            inches: this.state.inches,
            azimuthAngle: this.state.azimuthAngle,
            // meter: meter,
            // centimeter: centimeter
        }
        previousVideos.push(newVideos);

        switch (videoType) {
            case 'UPLOAD_VIDEO':
                this.setState({newVideos: previousVideos, feet: '', inches: ''}, () => {
                    this.sendDataToProps();
                });       
                break;

            case 'CAPTURE_Video':
                this.setState({newVideos: previousVideos}, () => {
                    this.sendDataToProps();
                });
                break;
            default:
                break;
        }
         
    }

    // saveAdditionalOptions = (property, e) => {
    //     if (property == 'feet') {
    //         this.state.feet = e.target.value;
    //     } else if (property == 'inches') {
    //         this.state.inches = e.target.value;
    //     } else if (property == 'azimuthAngle') {
    //         this.state.azimuthAngle = e.target.value;
    //     }
    // }

    handleChange = e => {
        const status = {
            value: e.currentTarget.value,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.value = status.value;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    handleCommentsChange = e => {
        const status = {
            comments: e.currentTarget.value,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.comments = status.comments;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    handleVideoUpload = () => {
        const data = this.props.videoUploadCallback("Sample video url");
    }

    onClickVideoPreview = (index) => {
        if(this.props.hasOwnProperty('videoPreview') && this.props.videoPreview){
            this.props.videoPreview('VIDEOS', this.state.mediaList, index);
        }
    }

    // handleDeleteVideo = () => {
    //     customOptions.recordedVideo = ""; 
    // }

    render() {
        const options = this.props.data.singleChoiceOptions;
        const videoConstraints = {
            facingMode: this.props.data.customOptions.cameraFacingOptions == 'front' ? 'user' : 'environment'
        };

        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <ComponentLabel {...this.props} />
                    <Grid container spacing={ 1 } className="material-element-container">
                        <Grid item xs={12} sm={ 4 } className="vertical-middle">
                            <Typography component="span">Video</Typography>
                        </Grid>
                        <Grid item xs={12} sm={ 8 }>
                            <CustomModal 
                            isFromMastersScreen={this.props.isFromMastersScreen}
                            read_only={this.props.read_only} 
                            // handleDeleteVedio={this.handleDeleteVedio}
                            // saveAdditionalOptions = {this.saveAdditionalOptions}
                             customOptions={this.props.data.customOptions} 
                             saveUploadVideoSrc={(modalSource, src) => this.setVideoSrc(modalSource, src, 'UPLOAD_VIDEO')} 
                             saveVideoSrc={(modalSource, src) => this.setVideoSrc(modalSource, src, 'CAPTURE_VIDEO')} />
                        </Grid>
                        {/* {
                            (this.state.newImages.length > 0) && this.state.newImages.map((item) => {
                                return (
                                    <div style={{border: "0px solid grey", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <img src={item.imageUrl} height="100" style={{ marginBottom: '5px' }} className="image-upload-preview" />
                                        {(this.props.data.customOptions.tapedrop) &&
                                            <span>{item.feet + " ft, " + item.inches + " in"}</span>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            (this.state.mediaList.length > 0) && 
                            this.state.mediaList.map((mediaItem, mediaIndex) => {
                                return (
                                    <div style={{border: "0px solid grey", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <img 
                                            src={mediaItem.s3uri} 
                                            height="100" 
                                            style={{ marginBottom: '5px', cursor: 'pointer' }} className="image-upload-preview"
                                            onClick={() => this.onClickImagePreview(mediaIndex)} />
                                        {(this.props.data.customOptions.tapedrop) &&
                                            <span>{mediaItem.feet + " ft, " + mediaItem.inch + " in"}</span>
                                        }
                                    </div>
                                )
                            })
                        } */}
                    </Grid>

                </div>
            </div>
        );
    }
}
