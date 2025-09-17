import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,  
} from '@material-ui/pickers';
import {
    Grid   
} from '@material-ui/core';

const V5DatePicker = (props) => {
    const {
    } = props;

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container >
                    <KeyboardDatePicker
                        variant="inline"
                        inputVariant="outlined"
                        id="date-picker-inline"
                        size='small'
                        format="MM-dd-yyyy"
                        disabled
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </>
    );
}

export default V5DatePicker;