import React from 'react';
import { FormControlLabel, Checkbox, Grid, Typography, RadioGroup, Radio } from '@material-ui/core';

export default function(props){
    const comments = (props.element.customOptions.isCommentsAvail) ? props.element.customOptions.isCommentsAvail : props.element.customOptions.isCommentPopAvail;
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">Camera Options</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPreAvail}
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPreAvail', 'checked')} 
                                name="is_preavail" 
                                color="primary" />}
                    label="Pre Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPostAvail}
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPostAvail', 'checked')} 
                                name="isPostAvail" 
                                color="primary" />}
                    label="Post Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPhotoAvail} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPhotoAvail', 'checked')} 
                                name="is_photo_avail" 
                                color="primary" />}
                    label="Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.is360Avail} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'is360Avail', 'checked')} 
                                name="is_360_avail" 
                                color="primary" />}
                    label="360 Photo"
                />
            </Grid>
            <Grid item xs={12} className="element-options-border-grid">
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isBarcodeAvail} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isBarcodeAvail', 'checked')} 
                                name="is_barcode_avail" 
                                color="primary" />}
                    label="Barcode Scanner"
                />
            </Grid>




            <Grid item xs={12}>
                <Typography variant="h6" component="h6">Photo Upload Options</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPrePhotoUpload}
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPrePhotoUpload', 'checked')} 
                                name="is_pre_photo_upload" 
                                color="primary" />}
                    label="Pre Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPostPhotoUpload} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPostPhotoUpload', 'checked')} 
                                name="is_post_photo_upload" 
                                color="primary" />}
                    label="Post Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6} className="element-options-border-grid">
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.isPhotoUpload} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'isPhotoUpload', 'checked')} 
                                name="is_photo_upload" 
                                color="primary" />}
                    label="Photo"
                />
            </Grid>
            <Grid item xs={12} sm={6} className="element-options-border-grid">
                <FormControlLabel
                    control={<Checkbox 
                                checked={props.element.customOptions.is360PhotoUpload} 
                                onChange={props.editElementCustomOptionsProp.bind(this, 'is360PhotoUpload', 'checked')} 
                                name="is_360_photo_upload" 
                                color="primary" />}
                    label="360 Photo"
                />
            </Grid>




            <Grid item xs={12}>
                <Typography variant="h6" component="h6">Comments</Typography>
            </Grid>
            <Grid item xs={12} className="element-options-border-grid">
                <RadioGroup 
                    row aria-label="material" 
                    name="material" 
                    value={comments} 
                    row={false} 
                    onChange={(e) => props.editElementCustomOptionsProp(e.target.name, 'checked', e)}>
                    <FormControlLabel value={props.element.customOptions.isCommentsAvail} control={<Radio color="primary" />} name="isCommentsAvail" label="Text Box" />
                    <FormControlLabel value={props.element.customOptions.isCommentPopAvail} control={<Radio color="primary" />} name="isCommentPopAvail" label="Pop up" />
                </RadioGroup>
            </Grid>
        </>
    )
}