/**
  * <HeaderBar />
  */

import React from 'react';
import {
  Checkbox, FormControlLabel, Grid
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default class HeaderBar extends React.Component {
  render() {
    const headerLabel = {
      margin: "0.6rem 0",
      color: "#fff",
      backgroundColor: "#6c757d",
      display: "inline-block",
      padding: "0.25em 0.4em",
      fontSize: "75%",
      fontEeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: "0.25rem"

    }
    return (
      // <div className="toolbar-header">
      <Grid container justifyContent="space-between" alignItems="center" className="toolbar-header" >
        <Grid item>
          {/* <FormControlLabel
            control={<Checkbox
              id={this.props.data && this.props.data.id}
              name={this.props.data && this.props.data.id}
              size="small"
              color="primary"
              style={{
                transform: "scale(0.9)",
                visibility: "hidden"
              }}
              checked={(this.props.toolbarItemCheck
                && this.props.data
                && Array.isArray(this.props.toolbarItemCheck)
                && this.props.toolbarItemCheck.findIndex(x => x.id === this.props.data.id) !== -1) ? true : false}
              onChange={(e) => this.props.handleTemplateElemChange(e, this.props.data)} />}
          /> */}
          <span  style={headerLabel }>{this.props.data.type}</span>
        </Grid>
        <Grid item>
          <div className="toolbar-header-buttons ">
            {this.props.data.element !== 'LineBreak' && this.props.data.element !== 'Page_Break' &&
              <div className="btn is-isolated text-muted" style={{ marginRight:"-15px"}}>
                {/* <i className="is-isolated fas fa-edit"></i> */}
                <EditIcon fontSize="small" style={{fontSize:"1.1rem"}} onClick={this.props.editModeOn?.bind(this.props.parent, this.props.data)} />
              </div>
            }
            <div className="btn is-isolated text-muted" >
              <DeleteIcon fontSize="small" style={{ fontSize: "1.1rem", marginRight: "-15px" }} onClick={this.props.onDestroy?.bind(this, this.props.data)} />
              </div>
          </div>
        </Grid>
      </Grid>
      // </div>
    );
  }
}
