/**
  * <DynamicOptionList />
  */

 import React from 'react';
 import ID from '../UUID';
 import { Typography, Grid, TextField, FormLabel } from '@material-ui/core';
 
 export default class TabsOptions extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             element: this.props.element,
             data: this.props.data,
             dirty: false,
         };
     }
 
     tabsTextAreaHandleChange = e => {
         const text = e.target.value;
         const optionsData = text.split('\n');
         const this_element = this.state.element;
         this_element.customOptions.optionsText = text;
         this_element.tabsOptions = [];
         for (let i = 0; i < optionsData.length; i++) {
             this_element.tabsOptions.push({ value: optionsData[i], label: optionsData[i], key: ID.uuid() });
         }
         this.setState({ element: this_element, dirty: true, });
         // this.props.updateElement.call(this.props.preview, this_element);
     };

    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }

     render() {
         if (this.state.dirty) {
             this.state.element.dirty = true;
         }
         return (
             <>
                 <Grid item xs={12} spacing={2} className="element-options-border-grid padding-top-10 padding-bottom-10">
                     <Grid item xs={12} className=" padding-top-10 padding-bottom-10">
                         <FormLabel component="legend">Options</FormLabel>
                         <TextField
                             size="small"
                             multiline
                             fullWidth
                             rows={3}
                             variant='outlined'
                             onBlur={this.updateOption.bind(this)}
                             helperText='Enter the list of the tab titles. Separate each options by new line'
                             value={this.props.element.customOptions.optionsText} onChange={this.tabsTextAreaHandleChange} />
                     </Grid>
                 </Grid>
             </>
         );
     }
 }
 