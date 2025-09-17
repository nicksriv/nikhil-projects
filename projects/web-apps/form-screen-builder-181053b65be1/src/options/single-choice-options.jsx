/**
  * <DynamicOptionList />
  */

 import React from 'react';
 import ID from '../UUID';
 import { IconButton, Typography, Grid, TextField, FormLabel, Tooltip,InputAdornment } from '@material-ui/core';
 import InfoIcon from "@material-ui/icons/Info";
 import AddIcon from "@material-ui/icons/Add";
 import RemoveIcon from "@material-ui/icons/Remove";
 import { withStyles } from '@material-ui/core/styles';

const styles= theme =>({
    icon:{
        "&:hover": {
            color:"#2C3E93"
        }
    },
    tooltip:{
        fontFamily:"SF Pro",
        fontSize:"12px"
    },
})
  class SingleChoiceOptions extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       element: this.props.element,
       data: this.props.data,
       dirty: false,
     };
   }
 
   _setValue(label) {
     return label.replace(/[^A-Z0-9]+/ig, ' ').toLowerCase();
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
     this_element.singleChoiceOptions.splice(index + 1, 0, { value: 'New Option', label: 'New Option', key: ID.uuid() });
     this.props.updateElement.call(this.props.preview, this_element);
   }
 
   removeOption(index) {
     const this_element = this.state.element;
     this_element.singleChoiceOptions.splice(index, 1);
     this.props.updateElement.call(this.props.preview, this_element);
   }

   buttonColumnChange = e => {
    const this_element = this.state.element;
    const value = e.target.value;
    this_element.customOptions.columns = parseInt(value);
    this.setState({ element: this_element, dirty: true, });
}

render() {
  if (this.state.dirty) {
    this.state.element.dirty = true;
  }
  const helperText="This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns."
    const { classes } = this.props;
     return (
        <>
            <Grid container >
                <Grid item xs={12} className='my-4'>
                  {/* <FormLabel component="legend">Field Layout</FormLabel> */}
                  <TextField
                    //size="small"
                    fullWidth
                    type="number"
                    label="Field Layout"
                    value={this.props.element.customOptions.columns}
                    onChange={this.buttonColumnChange}
                    InputProps={{
                      inputProps: { min: 0 , max: 2},
                      endAdornment: (
                        <Tooltip placement="top-start" title={<p className={classes.tooltip}>{helperText}</p>}>
                        <InputAdornment>
                            <IconButton style={{padding:"0"}}>
                                <InfoIcon className={classes.icon} />
                            </IconButton>
                        </InputAdornment>
                        </Tooltip>
                     )
                    }}
                    //helperText="This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns."
                    variant='outlined' />
                </Grid>
                <Grid item xs={12}>
                    <h6 style={{opacity:'0.6', fontWeight:'normal'}}>Options:</h6>
                </Grid>
                {
                    this.props.element.singleChoiceOptions.map((option, index) => {
                    const this_key = `edit_${option.key}`;
                    const val = (option.value !== this._setValue(option.label)) ? option.value : '';
                    return (
                        <React.Fragment key={this_key}>
                            <Grid item xs={12} sm={9} className='my-2'>
                                <TextField
                                  fullWidth
                                  //size="small"
                                  variant="outlined"
                                  value={option.label}
                                  InputProps={{type: 'text'}}
                                  placeholder="Option text"
                                  onBlur={this.updateOption.bind(this)}
                                  onChange={this.editOption.bind(this, index)} />
                            </Grid>
                            { false &&
                                <Grid item xs={12} sm={1} className='my-2'>
                                    <input className="form-control" type="text" name={`value_${index}`} value={val} onChange={this.editValue.bind(this, index)} />
                                </Grid> 
                            }
        
                            {option.value!="other" &&
                                <Grid item xs={12} sm={1} className='my-2'>
                                    <IconButton aria-label="add">
                                    <AddIcon onClick={this.addOption.bind(this, index)} />
                                    </IconButton>
                                </Grid>
                            }
                            {option.value!="other" && index > 0 && 
                                <Grid item xs={6} sm={1} className='my-2'>
                                    <IconButton aria-label="remove">
                                        <RemoveIcon onClick={this.removeOption.bind(this, index)} />  
                                    </IconButton>
                                </Grid>
                            }
                        </React.Fragment>
                        
                    );
                    })
                }
            </Grid>
        </>
     );
   }
 }
 export default withStyles(styles, { withTheme: true })(SingleChoiceOptions)