/**
  * <DynamicOptionList />
  */

import React from 'react';
import { IconButton, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Grid, Typography, Checkbox, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ID from '../UUID';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

export default class TakeVideoOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
    };
  }

  _setValue(label) {
    return label.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  editOption(option_index, e) {
    const this_element = this.state.element;
    const val = (this_element.singleChoiceOptions[option_index].value !== this._setValue(this_element.singleChoiceOptions[option_index].label)) ? this_element.singleChoiceOptions[option_index].value : this._setValue(e.target.value);

    this_element.singleChoiceOptions[option_index].label = e.target.value;
    this_element.singleChoiceOptions[option_index].value = val;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  editValue(option_index, e) {
    const this_element = this.state.element;
    const val = (e.target.value === '') ? this._setValue(this_element.singleChoiceOptions[option_index].label) : e.target.value;
    this_element.singleChoiceOptions[option_index].value = val;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  // eslint-disable-next-line no-unused-vars
  editOptionCorrect(option_index, e) {
    const this_element = this.state.element;
    if (this_element.singleChoiceOptions[option_index].hasOwnProperty('correct')) {
      delete (this_element.singleChoiceOptions[option_index].correct);
    } else {
      this_element.singleChoiceOptions[option_index].correct = true;
    }
    this.setState({ element: this_element });
    this.props.updateElement.call(this.props.preview, this_element);
  }

  updateOption() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  addOption(index) {
    const this_element = this.state.element;
    this_element.singleChoiceOptions.splice(index + 1, 0, { value: 'new_option' + (index + 1), label: 'New Option', key: ID.uuid() });
    this.props.updateElement.call(this.props.preview, this_element);
  }

  removeOption(index) {
    const this_element = this.state.element;
    this_element.singleChoiceOptions.splice(index, 1);
    this.props.updateElement.call(this.props.preview, this_element);
  }
  render() {
    const options = [
      {
        name: "isVideoAvail",
        label: "Record & Upload"
      },
      {
        name: "isVideoUpload",
        label: "Browse & Upload"
      },
      {
        name: "isVideoLink",
        label: "Specific Link"
      }
    ];

    let photoOptions = true;
    if (this.props.element.customOptions.tapedrop) {
      photoOptions = this.props.element.customOptions.tapedrop;
    } if (this.props.element.customOptions.isDistToBuilding) {
      photoOptions = this.props.element.customOptions.isDistToBuilding;
    } if (this.props.element.customOptions.isTargetAzimuthAngle) {
      photoOptions = this.props.element.customOptions.isTargetAzimuthAngle;
    }
    const checked={
      border:"1px solid #2C3E93",
      padding: " 0 0 0 0rem",
      borderRadius:"4px",
      color:"#2C3E93",
      height:'30px',
      display: "flex",
      justifyContent: "center"
    }
    const checked1={
      border:"1px solid #2C3E93",
      padding: " 0 0 0 0rem",
      width:"10rem",
      borderRadius:"4px",
      color:"#2C3E93",
      height:'30px',
      display: "flex",
      justifyContent: "center"
    }
    const unchecked={
      border:"1px solid #00000099",
      padding: " 0 0 0 0rem",
      borderRadius:"4px",
      height:'30px',
      display: "flex",
      justifyContent: "center"
    }
    const unchecked1={
      border:"1px solid #00000099",
      padding: " 0 0 0 0rem",
      width:"10rem",
      borderRadius:"4px",
      height:'30px',
      display: "flex",
      justifyContent: "center"
    }
    const text={
      marginButtom:'1rem',
      opacity:0.6,
      fontSize:'16px',
    }
    return (
      <>
        {/* <Grid container spacing={2}>
            <Grid item xs={12}>
                <h6 style={text}> Maximum Size:</h6>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Size" 
               defaultValue={this.props.element.customOptions.maxSize}
               type="number" 
               variant="outlined" 
               fullWidth 
               onChange={(event)=>{console.log(event.target.value)}}
               />
            </Grid>
        </Grid> */}
        <Grid container spacing={2} className="padding-top-10 ml-1">
          <Grid item xs={12} className='mt-3'>
            <h6 style={text}>Video Option: </h6>
          </Grid>
          {
            options.map((option) => {
              return (
                <Grid item xs={12} sm={6} >
                  <FormControlLabel
                   style={this.props.element.customOptions[option.name]? checked1 : unchecked1}
                    label={option.label}
                    control={
                      <Checkbox style={{ display: "none" }} className="mr-1 ml-2" checked={this.props.element.customOptions[option.name]} 
                    onChange={(event) => this.props.setPhotoCustomOptions(option.name, event)} name={option.name} color="primary" />
                  }
                  />
                </Grid>
              );
            })
          }
        </Grid>
        <Grid className="mt-3">
          {this.props.element.customOptions.isVideoLink ? <TextField type="text" variant="outlined" onChange={(event) => this.props.changeCameraOptions("videoLink", event)} placeholder='Paste URL Link'
           helperText={this.props.element.customOptions.error ? `Please enter valid URL` : `` } 
           error={this.props.element.customOptions.error }
           defaultValue={this.props.element.customOptions.videoLink} fullWidth /> : null}
        </Grid>
        {/* <Grid container spacing={2} className="padding-top-10">
          {this.props.element.customOptions["isRadioGroup"] &&
            <>
              <Grid item xs={12}>
                <Typography variant="h6" component="h6">Options</Typography>
              </Grid>
              {
                this.props.element.singleChoiceOptions != undefined && this.props.element.singleChoiceOptions.map((option, index) => {
                  const this_key = `edit_${option.key}`;
                  const val = (option.value !== this._setValue(option.label)) ? option.value : '';
                  return (
                    <React.Fragment key={this_key}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          value={option.label}
                          InputProps={{ type: 'text' }}
                          placeholder="Option text"
                          onBlur={this.updateOption.bind(this)}
                          onChange={this.editOption.bind(this, index)} />
                      </Grid>
                      {false &&
                        <Grid item xs={12} sm={2}>
                          <input className="form-control" type="text" name={`value_${index}`} value={val} onChange={this.editValue.bind(this, index)} />
                        </Grid>
                      }

                      {option.value != "other" &&
                        <Grid item xs={12} sm={1}>
                          <IconButton aria-label="add">
                            <AddIcon onClick={this.addOption.bind(this, index)} />
                          </IconButton>
                        </Grid>
                      }
                      {option.value != "other" && index > 0 &&
                        <Grid item xs={6} sm={1}>
                          <IconButton aria-label="remove">
                            <RemoveIcon onClick={this.removeOption.bind(this, index)} />
                          </IconButton>
                        </Grid>
                      }
                    </React.Fragment>

                  );
                })
              }
            </>
          }
        </Grid> */}
      </>
    );
  }
}
