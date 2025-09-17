import React from 'react';
import {
    IconButton
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';

const V5Photo = (props) => {
    const {
    } = props;

    return (
        <div style={{
            height: 45, borderRadius: '5px', border: '1px solid #919191',
            backgroundColor: "#eaeaea",
        }}>
            <div style={{ padding: "12px", display: "flex" , backgroundColor:'blueviolet'  }}>
                <span style={{ color: "#666666", fontWeight: "400", fontSize: "0.75rem" }}>Photo</span>
                <div style={{ margin: "0 auto" }}>
                    <IconButton
                        style={{ marginRight: "10px", padding: "0" }}
                        disabled>
                        <PhotoCamera />
                    </IconButton>
                    <IconButton
                        style={{ padding: "0" }}
                        disabled>
                        <ImageRoundedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default V5Photo;