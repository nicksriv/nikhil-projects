import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({

}));

export default function Attachment(props) {
    const classes = useStyles();
    const [fileName, setFileName] = useState("");

    useEffect(()=>{
        setFileName(props.fileName);
    },[]);

    const handleChange =(e)=> {
        setFileName(e.target.files[0].name);
        props.handleFile(e);
    }
    const handleDelete =()=> {
        setFileName("");
        props.element.customOptions.isFieldDisabled = false;
        props.handleDelete();
    }
    
    return(
        <>
              <Grid container justifyContent="space-between" className="mt-4 p-3" style={{ marginBottom: '1rem', border:'1px solid grey', borderRadius:'5px', backgroundColor:'gray' }} >
              <Grid container justifyContent="space-between">
              <Grid item>
              <h6 className={classes.attachmentText} style={{color:'black'}} >Default file </h6>
              </Grid>
              <Grid item>
              <Button  component="label">
              <img src="/assets/images/icons/attachment_black_24dp.svg" alt="attachment"/>
              <input 
      type="file" hidden
      name="selectedFile"
      onChange={handleChange}
       id="imageUpload" 
       accept={".pdf,.xls,.doc"}
       >
       </input>
    </Button>
              </Grid>
              </Grid>
              
              { fileName && 
              <Grid container justifyContent="space-between">
                <Grid item>
                <h6 style={{textAlign:'center'}}>{fileName}</h6>
                </Grid>
                <Grid item>
                  <Button style={{textAlign:'center'}} onClick={handleDelete}><DeleteIcon/></Button>
                  </Grid>
              </Grid>} 
              </Grid>
            
        </>
    )
}