/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from '../UUID';
import { TextField, Grid, FormControl, FormGroup, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import DateFnsUtils from '@date-io/date-fns';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2C3E93"
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontSize: '0.875rem',
            }
        }
    }
});


export default class DatePickerOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
            customDatePicker: false
        };
    }

    changeDateFormat = e => {
        const this_element = this.state.element;
        this_element.customOptions.dateFormat = e.target.value;
        this.props.updateElement.call(this.props.preview, this_element);
    };


    changeDefaultDate = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        if (value == 'none') {
            this_element.customOptions.defaultDate = null;
            this.setState({ customDatePicker: false });
        } else if (value == 'current') {
            this_element.customOptions.defaultDate = new Date();
            this.setState({ customDatePicker: false });
        } else if (value == 'custom') {
            this_element.customOptions.defaultDate = new Date();
            this.setState({ customDatePicker: true });
        }
        this_element.customOptions.defaultDateOptions = e.target.value;
        this.setState({ element: this_element, dirty: true, });
    };

    customDateChange = e => {
        const this_element = this.state.element;
        this_element.customOptions.defaultDate = e;
        this.setState({ element: this_element, dirty: true, });
    }

    setDisablePastDates = e => {
        const this_element = this.state.element;
        this_element.customOptions.disablePastDates = e.target.value;
        this.setState({ element: this_element, dirty: true, });
    };

    changeFormatSeparator = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        const dateFormat = this_element.customOptions.dateFormat;
        let splittedDateFormat = [];
        if (dateFormat.includes('-')) {
            splittedDateFormat = dateFormat.split('-');
        } else if (dateFormat.includes('/')) {
            splittedDateFormat = dateFormat.split('/');
        } else if (dateFormat.includes('.')) {
            splittedDateFormat = dateFormat.split('.');
        }
        if (value == 'hyphen') {
            this_element.customOptions.dateFormat = splittedDateFormat.join('-');
            this_element.customOptions.formatSeparator = value;
        } else if (value == 'slash') {
            this_element.customOptions.dateFormat = splittedDateFormat.join('/');
            this_element.customOptions.formatSeparator = value;
        } else if (value == 'dot') {
            this_element.customOptions.dateFormat = splittedDateFormat.join('.');
            this_element.customOptions.formatSeparator = value;
        }
        // this.setState({ element: this_element, dirty: true, });
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

    render() {
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }

        if (this.props.element.customOptions.defaultDateOptions == 'custom') {
            this.state.customDatePicker = true;
        }

        let dateFormat1 = 'MM-dd-yyyy';
        let dateFormat2 = 'dd-MM-yyyy';
        let dateFormat3 = 'yyyy-MM-dd';
        if (this.props.element.customOptions.formatSeparator == 'hyphen') {
            dateFormat1 = 'MM-dd-yyyy';
            dateFormat2 = 'dd-MM-yyyy';
            dateFormat3 = 'yyyy-MM-dd';
        } else if (this.props.element.customOptions.formatSeparator == 'slash') {
            dateFormat1 = 'MM/dd/yyyy';
            dateFormat2 = 'dd/MM/yyyy';
            dateFormat3 = 'yyyy/MM/dd';
        } else if (this.props.element.customOptions.formatSeparator == 'dot') {
            dateFormat1 = 'MM.dd.yyyy';
            dateFormat2 = 'dd.MM.yyyy';
            dateFormat3 = 'yyyy.MM.dd';
        }
        const { classes } = this.props;
        return (
            <>
                <Grid item xs={12} className="element-options-border-grid padding-top-10 padding-bottom-10">
                    <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormControl component="fieldset">
                            <Grid container justifyContent="flex-start" >
                                <Grid item className="mr-2">
                                    <h6 className={classes.text}>Date Format:</h6>
                                </Grid>
                                <Grid item>
                                    <RadioGroup row aria-label="material" name="material" value={this.props.element.customOptions.dateFormat} onChange={this.changeDateFormat}>
                                        <FormControlLabel style={{ marginTop: "15px", marginBottom: "15px", marginRight: '10px' }} value={dateFormat1} className={this.props.element.customOptions.dateFormat === dateFormat1 ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="MM-DD-YYYY" labelPlacement='start' />
                                        <FormControlLabel style={{ marginTop: "15px", marginBottom: "15px", marginRight: '10px' }} value={dateFormat2} className={this.props.element.customOptions.dateFormat === dateFormat2 ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="DD-MM-YYYY" labelPlacement='start' />
                                        <FormControlLabel style={{ marginTop: "15px", marginBottom: "15px", marginRight: '10px' }} value={dateFormat3} className={this.props.element.customOptions.dateFormat === dateFormat3 ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="YYYY-MM-DD" labelPlacement='start' />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {/* <ThemeProvider theme={theme}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Date Format</FormLabel>
                                <RadioGroup row aria-label="material" value={this.props.element.customOptions.dateFormat} name="material" onChange={this.changeDateFormat} >
                                    <FormControlLabel
                                        value={dateFormat1}
                                        className={this.props.element.customOptions.dateFormat === dateFormat1 ? classes.checked : classes.unchecked}
                                        control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />}
                                        label="MM-DD-YYYY"
                                        labelPlacement='start' />
                                    <FormControlLabel
                                        value={dateFormat2}
                                        className={this.props.element.customOptions.dateFormat === dateFormat2 ? classes.checked : classes.unchecked}
                                        control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />}
                                        label="DD-MM-YYYY"
                                        labelPlacement='start' />
                                    <FormControlLabel
                                        value={dateFormat3}
                                        className={this.props.element.customOptions.dateFormat === dateFormat3 ? classes.checked : classes.unchecked}
                                        control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />}
                                        label="YYYY-MM-DD"
                                        labelPlacement='start' />
                                </RadioGroup>
                            </FormControl>
                        </ThemeProvider> */}
                    </Grid>
                    <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormControl component="fieldset">
                            <Grid container justifyContent="flex-start" >
                                <Grid item className="mr-2">
                                    <h6 className={classes.text}>Default Date:</h6>
                                </Grid>
                                <Grid item>
                                    <RadioGroup row aria-label="material" name="material" value={this.props.element.customOptions.defaultDateOptions} onChange={this.changeDefaultDate} onBlur={this.updateOption.bind(this)}>
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: "15px", }} value={"none"} className={this.props.element.customOptions.defaultDateOptions === "none" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="None" labelPlacement='start' />
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: "15px", }} value={"current"} className={this.props.element.customOptions.defaultDateOptions === "current" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="Current" labelPlacement='start' />
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: "15px", }} value={"custom"} className={this.props.element.customOptions.defaultDateOptions === "custom" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="Custom" labelPlacement='start' />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {/* <ThemeProvider theme={theme}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Default Date</FormLabel>
                                <RadioGroup row aria-label="material" value={this.props.element.customOptions.defaultDateOptions} name="material" onChange={this.changeDefaultDate} onBlur={this.updateOption.bind(this)} >
                                    <FormControlLabel value="none" control={<Radio color="primary" />} label="None" />
                                    <FormControlLabel value="current" control={<Radio color="primary" />} label="Current" />
                                    <FormControlLabel value="custom" control={<Radio color="primary" />} label="Custom" />
                                </RadioGroup>
                            </FormControl>
                        </ThemeProvider> */}
                        {this.state.customDatePicker &&
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={12} className="mt-2" >
                                    <KeyboardDatePicker
                                        autoOk={true}
                                        variant="inline"
                                        fullWidth
                                        inputVariant="outlined"
                                        label="Custom Date"
                                        format={this.props.element.customOptions.dateFormat}
                                        InputAdornmentProps={{ position: "start" }}
                                        value={this.props.element.customOptions.defaultDate}
                                        onChange={this.customDateChange}
                                    className="mt-3"
                                    placeholderText={this.props.element.customOptions.dateFormat != undefined ? this.props.element.customOptions.dateFormat.toUpperCase() : "MM-DD-YYYY"}
                                    minDate={this.props.element.customOptions.disablePastDates == 'yes' ? new Date() : ''}
                                    />
                            </Grid>
                            </MuiPickersUtilsProvider>

                        }
                    </Grid>

                    <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormControl component="fieldset">
                            <Grid container justifyContent="flex-start" >
                                <Grid item className="mr-2">
                                    <h6 className={classes.text}>Separator:</h6>
                                </Grid>
                                <Grid item>
                                    <RadioGroup row aria-label="material" name="material" value={this.props.element.customOptions.formatSeparator} onChange={this.changeFormatSeparator}>
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: '15px' }} value={"hyphen"} className={this.props.element.customOptions.formatSeparator === "hyphen" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="Hyphen(-)" labelPlacement='start' />
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: '15px' }} value={"slash"} className={this.props.element.customOptions.formatSeparator === "slash" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="Slash(/)" labelPlacement='start' />
                                        <FormControlLabel style={{ marginRight: '10px', marginBottom: '15px' }} value={"dot"} className={this.props.element.customOptions.formatSeparator === "dot" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} label="Dot(.)" labelPlacement='start' />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {/* <ThemeProvider theme={theme}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Separator</FormLabel>
                                <RadioGroup row aria-label="material" value={this.props.element.customOptions.formatSeparator} name="material" onChange={this.changeFormatSeparator} >
                                    <FormControlLabel value="hyphen" control={<Radio color="primary" />} label="Hyphen(-)" />
                                    <FormControlLabel value="slash" control={<Radio color="primary" />} label="Slash(/)" />
                                    <FormControlLabel value="dot" control={<Radio color="primary" />} label="Dot(.)" />
                                </RadioGroup>
                            </FormControl>
                        </ThemeProvider> */}
                    </Grid>
                    {/* <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormGroup>
                            <label className="control-label" htmlFor="defaultSelect">Disable Past Dates</label>
                            <select id="defaultSelect" value={this.props.element.customOptions.disablePastDates} onBlur={this.updateOption.bind(this)} onChange={(event) => this.setDisablePastDates(event)} className="form-control" >
                                <option value='yes' key='yes'>Yes</option>
                                <option value='no' key='no'>No</option>
                            </select>
                        </FormGroup>
                    </Grid> */}
                </Grid>
            </>
        );
    }
}
