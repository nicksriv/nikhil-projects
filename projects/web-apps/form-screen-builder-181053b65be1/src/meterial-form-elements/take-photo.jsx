import React, { useRef, useCallback } from 'react';
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from './material-element-label';
import { TextField,Grid, Checkbox, FormControlLabel, Button, RadioGroup, FormControl, FormLabel, Radio, TextareaAutosize, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CustomModal from './photoCaptureUpload';

export default class TakePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPhotoUpload: '',
            isPhotoAvail: '',
            feet: '',
            inches: '',
            azimuthAngle:'',
            mediaList: props.media ? props.media : [],
            optionId: '',
            newImages: [],
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


    setImageSrc = async (clickSource, imageFileObj, imageType) => {
        const previousImages = this.state.newImages.splice(0,this.state.newImages.length-1);
         // fetch s3uri from aws
         let uri = imageFileObj.imageSrc;
        if (this.props.imageUploadCallback != null) {
            const awsS3uri = await this.props.imageUploadCallback(imageFileObj);
            uri = awsS3uri;
        }
        const newImages = {
            imageUrl: uri,
            feet: this.state.feet,
            inches: this.state.inches,
            azimuthAngle: this.state.azimuthAngle,
            // meter: meter,
            // centimeter: centimeter
        }
        previousImages.push(newImages);

        switch (imageType) {
            case 'UPLOAD_IMAGE':
                this.setState({newImages: previousImages, feet: '', inches: ''}, () => {
                    this.sendDataToProps();
                });       
                break;

            case 'CAPTURE_IMAGE':
                this.setState({newImages: previousImages}, () => {
                    this.sendDataToProps();
                });
                break;
            default:
                break;
        }
         
    }

    saveAdditionalOptions = (property, e) => {
        if (property == 'feet') {
            this.state.feet = e.target.value;
        } else if (property == 'inches') {
            this.state.inches = e.target.value;
        } else if (property == 'azimuthAngle') {
            this.state.azimuthAngle = e.target.value;
        }
    }

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

    handleImageUpload = () => {
        const data = this.props.imageUploadCallback("Sample image url");
    }

    onClickImagePreview = (index) => {
        if(this.props.hasOwnProperty('photoPreview') && this.props.photoPreview){
            this.props.photoPreview('PHOTOS', this.state.mediaList, index);
        }
    }


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
                    <Grid container spacing={1} className="material-element-container">
                        <Grid item xs={12} sm={4} className="vertical-middle">
                            <Typography component="span">Photo</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CustomModal read_only={this.props.read_only} saveAdditionalOptions = {this.saveAdditionalOptions} customOptions={this.props.data.customOptions} saveUploadImageSrc={(modalSource, src) => this.setImageSrc(modalSource, src, 'UPLOAD_IMAGE')} saveImageSrc={(modalSource, src) => this.setImageSrc(modalSource, src, 'CAPTURE_IMAGE')} />
                        </Grid>
                        {/* {
                            (this.state.isPhotoAvail !== '' || this.state.isPhotoUpload !== '') &&
                            <Grid item xs={12}>
                                {this.state.isPhotoAvail !== '' &&
                                    <img src={this.state.isPhotoAvail} height="100" style={{ marginRight: '20px' }} className="image-upload-preview" />}
                                {this.state.isPhotoUpload !== '' &&
                                    <img src={this.state.isPhotoUpload} height="100" className="image-upload-preview" />
                                }
                            </Grid>
                        } */}
                        {
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
                        }
                        {
                            this.props.data.customOptions["isRadioGroup"] &&
                            <Grid item xs={12} sm={9}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    name="single-choice"
                                    value={this.state.value}
                                    aria-label="Question Text"
                                    onChange={(e) => this.handleChange(e)}
                                    row={this.props.data.customOptions.isSpreadToColumn}
                                >
                                    {
                                        options.map(option => {
                                            return <FormControlLabel
                                                key={option.key}
                                                label={option.label}
                                                value={option.value}
                                                control={<Radio color='primary' />}
                                            />
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                            </Grid>
                        }
                        {
                            this.props.data.customOptions["isCommentsAvail"] &&
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    fullWidth
                                    rows={4}
                                    variant="outlined"
                                    id={this.props.id}
                                    placeholder="Comments"
                                    value={this.state.comments}
                                    onChange={(e) => this.handleCommentsChange(e)}
                                    name={this.props.data.fieldName}
                                />
                            </Grid>
                        }
                        {
                            this.props.data.customOptions["isNotApplicable"] &&
                            <Grid item xs={12} sm={9}>
                                <FormControlLabel
                                    control={<Checkbox name="notApplicable" color="primary" />}
                                    label="Not Applicable"
                                />
                            </Grid>
                        }
                    </Grid>

                </div>
            </div>
        );
    }
}
