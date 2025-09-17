/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from '../UUID';
import { Typography, Grid, TextField, FormLabel, Tooltip, InputAdornment, IconButton } from '@material-ui/core';
import TextAreaAutosize from 'react-textarea-autosize';
import InfoIcon from "@material-ui/icons/Info";
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

class CheckListOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
        };
    }

    checkListTextAreaHandleChange = e => {
        const text = e.target.value;
        const optionsData = text.split('\n');
        const this_element = this.state.element;
        this_element.customOptions.optionsText = text;
        let otherOptionText = '';
        if (this_element.customOptions.isOtherOption) {
            otherOptionText = this_element.checkListOptions[this_element.checkListOptions.length - 1];
        }
        this_element.checkListOptions = [];
        for (let i = 0; i < optionsData.length; i++) {
            this_element.checkListOptions.push({ value: optionsData[i], label: optionsData[i], key: ID.uuid() });
        }
        if (this_element.customOptions.isOtherOption) {
            this_element.checkListOptions.push({ value: otherOptionText.value, label: otherOptionText.label, key: ID.uuid() });
        }
        this.setState({ element: this_element , dirty: true, });
        // this.props.updateElement.call(this.props.preview, this_element);
    };

    buttonColumnChange = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.columns = parseInt(value);
        this.setState({ element: this_element, dirty: true, });
    }

    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }

    render() {
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }
        const helpertext="This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns."
        const { classes } = this.props;
        return (
            <>
                <Grid container className="mt-3" >
                    <Grid item xs={12} className="my-2"> 
                        <TextField
                         variant="outlined"
                        label="Options"
                        fullWidth
                       // id="questionDescription1" 
                        multiline
                        //rows={2}
                        onBlur={this.updateOption.bind(this)} 
                        value={this.props.element.customOptions.optionsText} 
                        onChange={this.checkListTextAreaHandleChange} 
                        />
                        <ul className='ml-4 p-1' style={{opacity:"0.8" }}>
                            <li>Enter the list of the dropdown options</li>
                            <li>Seperate each options by new line</li>
                        </ul>
                    </Grid>
                    
                    <Grid item xs={12} className="mt-2">
                        {/* <FormLabel component="legend">Field Layout</FormLabel> */}
                        <TextField
                            fullWidth
                            type="number"
                            label="Field Layout"
                            value={this.props.element.customOptions.columns}
                            onChange={this.buttonColumnChange}
                            variant='outlined' 
                            inputProps={{ min: 0 }}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip placement="top-start" title={<p className={classes.tooltip}>{helpertext}</p>}>
                                        <InputAdornment>
                                            <IconButton style={{padding:"0"}}>
                                                <InfoIcon className={classes.icon} />
                                            </IconButton>
                                        </InputAdornment>
                                    </Tooltip>
                                )
                            }}
                        />
                    </Grid>

                </Grid>
            </>
        );
    }
}
export default withStyles(styles, { withTheme: true })(CheckListOptions)