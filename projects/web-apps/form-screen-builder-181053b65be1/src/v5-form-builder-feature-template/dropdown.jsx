import React from 'react';
import {
    Select
} from '@material-ui/core';

const V5Dropdown = (props) => {
    const {
    } = props;

    return (
        <>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                size="small"
                variant="outlined"
                disabled
            >
            </Select>
        </>
    );
}

export default V5Dropdown;