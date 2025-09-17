import React from 'react';
import {
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';

const V5SingleChoice = (props) => {
    const {
    } = props;

    return (
        <>
            <RadioGroup
                name="demo-name"
                row
            >
                <FormControlLabel
                    disabled
                    control={<Radio size="small" />}
                    label="Option 1"
                />
                <FormControlLabel
                    disabled
                    control={<Radio size="small" />}
                    label="Option 2"
                />
                <FormControlLabel
                    disabled
                    control={<Radio size="small" />}
                    label="Option 3"
                />
            </RadioGroup>
        </>
    );
}

export default V5SingleChoice;