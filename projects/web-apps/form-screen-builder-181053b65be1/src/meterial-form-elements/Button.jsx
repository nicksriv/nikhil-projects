import React from "react";
import ComponentHeader from "../form-elements/component-header";
import { FormLabel, TextField, Grid, Link } from "@material-ui/core";
import ComponentLabel from "./material-element-label";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

class Buttonn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const propsData = this.props.data;
    const propsWorkFlowData = this.props.workFlowData;
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
    //console.log('button', this.props.data)
    return (
      <div className="SortableItem rfb-item"
        style={propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null}>
        <ComponentHeader {...this.props} />
        {/* <ComponentLabel {...this.props} /> */}
        <div className="form-group" style={{ display: "flex", width: "100%" }} >
          <div style={{ alignSelf: "center", width: "100%" }}>
            {
              ((propsWorkFlowData && !propsWorkFlowData.isConsolidatedScreen) || propsWorkFlowData === undefined) ? (
                this.props.data.buttonType == "primary" ?
                  <Button variant="contained" fullWidth color='primary' size="medium">
                    {this.props.data.label}
                  </Button>
                  : this.props.data.buttonType == "secondary" ?
                    <Button variant="contained" fullWidth size="medium">
                      {this.props.data.label}
                    </Button>
                    : this.props.data.buttonType == "hyperlink" ?
                    <Link target='_blank' href={this.props.data.customOptions.Hyperlink} style={{textDecoration:"none"}}>
                      <Button fullWidth size="medium" color="primary" >{this.props.data.label}</Button>
                    </Link>
                      : null
              )
                : (
                  <>
                    <Button
                      //variant={`${this.props.data.label === "REJECT" ? 'outlined' : 'contained'}`}
                      variant={this.props.data && this.props.data.fieldVariant}
                      fullWidth
                      color='primary'
                      size="medium"
                      style={this.props.data.label === "REJECT" ? rejectStyle : approveStyle}>
                      {this.props.data.label}
                    </Button>
                  </>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Buttonn;