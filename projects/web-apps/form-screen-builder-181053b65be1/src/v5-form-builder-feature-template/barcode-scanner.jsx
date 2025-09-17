import React from 'react';
import {
    IconButton
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';

const V5BarcodeScanner = (props) => {
    const {
    } = props;

    return (
        <div style={{ display: "flex" }}>
            <div style={{
                width: 100,
                height: 45, borderRadius: '5px', border: '1px solid #919191',
            }}>
                <div style={{ padding: "12px", display: "flex" }}>
                    <span style={{ color: "#666666", fontWeight: "400", fontSize: "0.75rem" }}>Barcode</span>
                </div>
            </div>
            <div>
                <IconButton
                    style={{ marginLeft: "27px" }}
                    disabled>
                    <PhotoCamera />
                </IconButton>
            </div>
        </div>
    );
}

export default V5BarcodeScanner;