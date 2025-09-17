import React from 'react';
import {
    ButtonGroup,
    Button
} from '@material-ui/core';

const V5Button = (props) => {
    const {
    } = props;

    return (
        <div>
            <Button variant="contained" size="medium" style={{ width: '50px', height: '28px' }} disabled>
                BUTTON
            </Button>
        </div>
    );
}

export default V5Button;