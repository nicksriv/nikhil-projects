import React from 'react';
import {
    ButtonGroup,
    Button
} from '@material-ui/core';

const V5ButtonRadio = (props) => {
    const {
    } = props;

    return (
        <>
            <ButtonGroup size="small" aria-label="outlined button group" disabled>
                <Button style={{ width: '50px', height: '28px' }} >
                    <span style={{ fontSize: "0.5rem" }}>
                        Option1
                    </span>
                </Button>
                <Button style={{ width: '50px', height: '28px' }} >
                    <span style={{ fontSize: "0.5rem" }}>
                        Option2
                    </span>
                </Button>
                <Button style={{ width: '50px', height: '28px' }} >
                    <span style={{ fontSize: "0.5rem" }}>
                        Option3
                    </span>
                </Button>
            </ButtonGroup>
        </>
    );
}

export default V5ButtonRadio;