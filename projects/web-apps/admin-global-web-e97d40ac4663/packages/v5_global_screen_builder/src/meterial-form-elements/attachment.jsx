import React from "react";
import ComponentHeader from "../form-elements/component-header";
import { FormLabel, TextField, Grid, IconButton, Input, Typography } from "@material-ui/core";
import ComponentLabel from "./material-element-label";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

class Attachment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
    };
  }

  onChange = e => {
  
    switch (e.target.name) {
      case 'selectedFile':
      	if(e.target.files.length > 0) {
        
        	this.setState({ fileName: e.target.files[0].name });
        }
      break;
      default:
        this.setState({ [e.target.name]: e.target.value });
     }
  };

  render() {
    const propsData = this.props.data;
    const type = this.props.data.customOptions.Attachment;
    const propsWorkFlowData = this.props.workFlowData;
    const { fileName } = this.state;
    const disable = this.props.read_only === undefined  ? true : this.props.read_only ;
    let file = null;
    const rejectStyle = {
      fontSize: "0.5rem",
      color: "#B00020",
      border: "1px solid #B00020",
      fontWeight: "bold"
    };
    const approveStyle = {
      fontSize: "0.5rem",
    };
    const approveBtnSpacingStyle = {
      paddingTop: "3px"
    };

    file = fileName 
      ? ( <span>{fileName}</span>) 
      : ( <span></span> );

    return (
      <div className="SortableItem rfb-item"
        style={propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null}>
        <ComponentHeader {...this.props} />
        <ComponentLabel {...this.props} />
        <Grid container spacing={1} className="material-element-container" style={{padding:'20px 20px 10px 20px'}}>
        {/* label   */}
        <Grid container justifyContent="flex-start" >
        <Grid item xs={12} sm={6} md={6} style={{alignSelf:'center'}}>
        <Typography component="span">Attachment</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <Button disabled={disable} component="label">
       { disable ?  
       <img style={{opacity:'0.5'}} src="/assets/images/icons/attachment_black_24dp.svg" alt="attachment"/> :
       <img src="/assets/images/icons/attachment_black_24dp.svg" alt="attachment"/>
       }
        <input 
          type="file" hidden
          name="selectedFile"
          onChange={ (event) => this.onChange(event) }
           id="imageUpload" accept={type}>
           </input>
        </Button>
        </Grid></Grid>
        {/* {file} */}
        <h6 className="mt-1" style={{marginLeft:'10rem' , color:'#2C3E93'}}>{file}</h6>
        </Grid>
      </div>
    );
  }
}

export default Attachment;