import React from 'react';
import ComponentHeader from '../form-elements/component-header';
import { FormLabel, TextField, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ComponentLabel from './material-element-label';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: props.result ? props.result.value : this.props.data.customOptions.defaultDate,
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            }
        }
    }

    handleDateChange = (date) => {
        const status = {
            selectedDate: date,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.value = status.selectedDate;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    };
    render() {
        let inputProps = {}
        const propsData = this.props.data;
        let fieldVariant = "outlined";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }

        let inputWidth = "100%";
        if (this.props.data.inputFieldSize == 'large') {
            inputWidth = "100%";
        } else if (this.props.data.inputFieldSize == 'medium') {
            inputWidth = "50%";
        } else if (this.props.data.inputFieldSize == 'small') {
            inputWidth = "25%";
        }
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const disabled = this.props.data.customOptions.readOnly || false;
        console.log("this.props.data.customOptions",this.props.data.customOptions)
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    {/* <ComponentLabel {...this.props} /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container >
                            <KeyboardDatePicker
                                variant="inline"
                                inputVariant={fieldVariant}
                                label={this.props.data.label}
                                format={this.props.data.customOptions.dateFormat}
                                id="date-picker-inline"
                                onChange={this.handleDateChange}
                                value={this.props.data.customOptions.defaultDateOptions === "none" ? this.state.selectedDate : this.props.data.customOptions.defaultDate}
                                autoOk={true}
                                style={{ width: inputWidth }}
                                disablePast={this.props.data.customOptions.disablePastDates}
                                size='medium'
                                placeholder={this.props.data.customOptions.dateFormat != undefined ? this.props.data.customOptions.dateFormat.toUpperCase() : "MM/dd/yyyy"}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                required={this.props.data.customOptions.required}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                disabled={ this.props.read_only ? true : this.props.data.customOptions.defaultDateOptions === "none" ? false : true}
                                keyboardIcon={
                                    this.props.read_only ? <img style={{opacity:0.5}} src="/assets/images/icons/Icon_DatePicker.svg"/>
                                                         :<img src="/assets/images/icons/Icon_DatePicker.svg"/>
                                                                }
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    }
}
export default DatePicker;