/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from '../UUID';
import { Typography, Grid, TextField, FormLabel, FormGroup, Select, InputLabel, FormControl, MenuItem, Tooltip, InputAdornment, IconButton, FormHelperText, createTheme } from '@material-ui/core';
import TextAreaAutosize from 'react-textarea-autosize';
import InfoIcon from "@material-ui/icons/Info";
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';

const styles= theme =>({
    icon:{
        "&:hover": {
            color:"#2C3E93"
        }
    },
    tooltip:{
        fontFamily:"SF Pro",
        fontSize:"12px"
    }
})

class ButtonRadiosOptions extends React.Component {
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
        this_element.buttonRadioOptions = [];
        for (let i = 0; i < optionsData.length; i++) {
            const splitOptions = optionsData[i].split('[');
            let hoverTextStr = '';
            if (splitOptions.length > 1) {
                hoverTextStr = splitOptions[1].slice(0, -1);
            }
            this_element.buttonRadioOptions.push({ value: splitOptions[0], label: splitOptions[0], key: ID.uuid(), hoverText: hoverTextStr });
        }
        this.setState({ element: this_element, dirty: true, });
        // this.props.updateElement.call(this.props.preview, this_element);
    };


    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }

    buttonColumnChange = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.columns = parseInt(value);
        this.setState({ element: this_element, dirty: true, });
    }

    buttonSpacingChange = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.spacing = parseInt(value);
        this.setState({ element: this_element, dirty: true, });
    }

    setButtonThemeColor = e => {
        const this_element = this.state.element;
        this_element.customOptions.buttonThemeColor = e.target.value;
        this.setState({ element: this_element, dirty: true, });
    }


    render() {
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }
        const helpertext1 = `This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns.`
        const helpertext2="This is the space between two rows of buttons in pixels"
        const { classes } = this.props;

        return (
            <>
                <Grid item xs={12}>
                    <Grid item xs={12} className="my-4">
                        {/* <FormLabel component="legend">Options</FormLabel> */}
                        <TextField
                            size="small"
                            multiline
                            fullWidth
                            label="Options"
                            rows={3}
                            variant='outlined'
                            onBlur={this.updateOption.bind(this)}
                            helperText='Enter the list of the radio buttons.   You can optionally include on hover text inside square brackets [on hover text] Separate each options by new line.'
                            value={this.props.element.customOptions.optionsText} onChange={this.checkListTextAreaHandleChange} />
                    </Grid>
                    <Grid item xs={12} className="my-4 padding-top-5">
                        {/* <FormLabel component="legend">Columns</FormLabel> */}
                        <TextField
                            //size="small"
                            fullWidth
                            type="number"
                            label="Columns"
                            value={this.props.element.customOptions.columns}
                            onChange={this.buttonColumnChange}
                            variant='outlined' 
                            InputProps={{
                                endAdornment: (
                                    <Tooltip placement="top-start" title={<p className={classes.tooltip}>{helpertext1}</p>}>
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
                    <Grid item xs={12} className="my-4 padding-top-5">
                        {/* <FormLabel component="legend">Spacing</FormLabel> */}
                        <TextField
                            //size="small"
                            fullWidth
                            type="number"
                            label="Spacing"
                            value={this.props.element.customOptions.spacing}
                            onChange={this.buttonSpacingChange}
                            variant='outlined' 
                            InputProps={{
                                endAdornment: (
                                    <Tooltip placement="top-start" title={<p className={classes.tooltip}>{helpertext2}</p>}>
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
                    <Grid item xs={12} sm={12} className="mt-4 padding-top-5">
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="defaultSelect">Theme Color</InputLabel>
                    <Select
                        labelId="defaultSelect"
                        id="defaultSelect"
                        value={this.props.element.customOptions.buttonThemeColor}
                        label="Theme Color"
                        onBlur={this.updateOption.bind(this)}
                        onChange={(event) => this.setButtonThemeColor(event)}
                        MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            getContentAnchorEl: null
                          }}
                        > 
                        <MenuItem value={"red"}>Red</MenuItem>
                        <MenuItem value={"blue"}>Blue</MenuItem>
                        <MenuItem value={"black"}>Black</MenuItem>
                    </Select>
                    <FormHelperText>The theme color of your selected buton. You can select from given options.</FormHelperText>
                </FormControl>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ButtonRadiosOptions)