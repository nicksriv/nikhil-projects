import React, { useState } from 'react'
import ComponentHeader from '../form-elements/component-header'
import ComponentLabel from '../form-elements/component-label'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import {
    TimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AccessTimeSharp, AccessTimeTwoTone, Info } from '@material-ui/icons';



function Time(props) {    
    const [selectedDate, handleDateChange] = useState(null);
    let fieldVariant = "";
    if (props.globalStyles) {
        fieldVariant = (!props.globalStyles.formDefault && props.data.hasOwnProperty("fieldVariant")) ? props.data.fieldVariant : props.globalStyles.globalFieldVariant;
    } else {
        if (props.data.fieldVariant) fieldVariant = props.data.fieldVariant;
    }
    let inputWidth = "100%";
    if (props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
    } else if (props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
    } else if (props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
    }
    const propsData = props.data;
    console.log('time', props)
    return (
        <div className="SortableItem rfb-item">
            <ComponentHeader {...props} />
            <div className="form-group">
                {/* <ComponentLabel {...props} /> */}

                <Grid container >
                    < MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            label={propsData.label}
                            onChange={handleDateChange}
                            disablePast={true}
                            minTime={new Date(0, 0, 0, 8)}
                            maxTime={new Date(0, 0, 0, 18, 45)}
                            // labelFunc={() => propsData.customOptions.defaultTime === "none" ? 'HH:MM' : selectedDate}
                            value={propsData.customOptions.defaultTime === "none" ? selectedDate : propsData.customOptions.defaultTime === "custom" ? propsData.customOptions.cutomTime : propsData.customOptions.defaultTime === "current" ? new Date() : selectedDate}
                            placeholder="HH:MM"
                            required={propsData.customOptions.required}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }}
                            ampm={propsData.customOptions.checked ? true : false}
                            inputVariant="outlined"
                            style={{ width: inputWidth }}
                            disabled={props.read_only ? true : propsData.customOptions.defaultTime === "none" ? false : true }
                            // read_only={props.read_only}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        { props.read_only 
                                            ? <img style={{opacity:0.5}} src="/assets/images/icons/Icon_timer.svg"/>
                                            : <img src="/assets/images/icons/Icon_timer.svg"/>
                                        }
                                    </InputAdornment>
                                )
                            }}
                    />
                    </MuiPickersUtilsProvider>
                </Grid>
            </div>
        </div>
    )
}

export default Time
