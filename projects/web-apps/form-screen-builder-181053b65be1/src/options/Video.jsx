import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({

}));

export default function Video(props) {
    const classes = useStyles();
    const [fileName, setFileName] = useState("");

    useEffect(()=>{
        setFileName(props.fileName);
    },[]);

    const handleChange =(e)=> {
        setFileName(e.target.files[0].name);
        props.handleVideoChange(e);
    }
    const handleDelete =()=> {
        setFileName("");
        props.handleDeleteVideo();
    }
    return(
        <>
        <Grid container justifyContent="space-between" className="mt-4 p-3" style={{ marginBottom: '1rem', border:'1px solid grey', borderRadius:'5px', backgroundColor:'gray' }} >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <h6 className={classes.attachmentText} style={{color:'black'}} >Default Video </h6>
                </Grid>
            <Grid item>
                <Button  component="label">
                    <img for="selectedFile" src="/assets/images/icons/Gallery.svg" alt="video"/>
                    <input 
                        type="file" hidden
                        name="selectedFile"
                        onChange={handleChange}
                        id="imageUpload" 
                        accept="video/mp4,video/x-m4v,video/*"
                        >
                    </input>
                </Button>
            </Grid>
        </Grid>

        { fileName && 
        <Grid container justifyContent="space-between">
            <Grid item>
                <a target="__blank" href={props.element.customOptions.url} style={{textAlign:'center'}}>{fileName}</a>
            </Grid>
            <Grid item>
                <Button style={{textAlign:'center'}} onClick={handleDelete}><DeleteIcon/></Button>
            </Grid>
        </Grid>} 
    </Grid>
    </>
)}