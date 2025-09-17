import React from 'react';
import {
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

const V5Checklist = (props) => {
    const {
    } = props;

    return (
        <div style={{ display: "flex" }}>
            <FormControlLabel
                control={<Checkbox disabled
                    color="primary" />}
                label={'Option 1'}
            />
            <FormControlLabel
                control={<Checkbox disabled
                    color="primary" />}
                label={'Option 2'}
            />
        </div>
    );
}

export default V5Checklist;