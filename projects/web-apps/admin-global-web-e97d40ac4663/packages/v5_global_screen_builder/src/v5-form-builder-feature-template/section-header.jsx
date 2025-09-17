import React from 'react';
import {
    Button
} from '@material-ui/core';

const V5SectionHeader = (props) => {
    const {
    } = props;

    return (
        <Button size="large"
            variant="contained"
            disabled
            style={{
                fontSize: "0.5rem",
                marginTop: "3px", color: "#ffffff",
                backgroundColor: "#000000",
                width: "100%"
            }}>
            Section Header
        </Button>
    );
}

export default V5SectionHeader;