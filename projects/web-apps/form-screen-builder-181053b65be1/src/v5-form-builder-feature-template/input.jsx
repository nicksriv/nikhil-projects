import React from 'react';
import {
    TextField,    
} from '@material-ui/core';

const V5Input = (props) => {
    const {
        customStyle,
        placeholderText,        
        type
    } = props;

    return (
        <>
            <TextField
                id="name-input"
                name="name"
                variant="outlined"
                size="small"
                type={type}
                style={customStyle}
                placeholder={placeholderText}
                disabled
            />
        </>
    );
}

export default V5Input;