import React from 'react';
import { Typography } from '@material-ui/core';

export default function MaterialElementLabel(props) {
    return (
        <div className="material-element-label" style={{marginTop:"-12px"}}>
            <Typography component="span">
                {props.data.label} {props.data.customOptions.required && (<span className='text-error'> *</span>)}
            </Typography>
        </div>
    )
}