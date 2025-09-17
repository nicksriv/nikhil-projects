import React from 'react';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import SignaturePad from 'react-signature-canvas';
import { Button, Grid, FormHelperText } from '@material-ui/core';
export default class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
      error: false,
      errorColor: "red",
      positiveColor: "#CECECE"
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: '' });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
      if (this.props.data.customOptions.required)
        this.setState({ error: true });
    }
  }

  render() {
    const { defaultValue } = this.state;
    let canClear = !!defaultValue;
    const props = {};
    props.type = 'hidden';
    props.name = this.props.data.fieldName;

    if (this.props.mutable) {
      props.defaultValue = defaultValue;
      props.ref = this.inputField;
    }
    const pad_props = {};
    // umd requires canvasProps={{ width: 400, height: 150 }}
    if (this.props.mutable) {
      pad_props.defaultValue = defaultValue;
      pad_props.ref = this.canvas;
      canClear = !this.props.read_only;
    }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }
    const isRequired = this.props.data.customOptions.required;

    return (
      <div className='SortableItem rfb-item'>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <Grid container direction={"column"} spacing={1}>
            <Grid item>
              {
                this.props.read_only === true && !!sourceDataURL ?
                  (<img src={sourceDataURL} />)
                  :
                  (
                    <>
                      <div style={{
                        height: 100, borderRadius: '5px', border: '1px solid #919191',
                        backgroundColor: "#eaeaea",
                      }}>
                        {
                          !this.props.isFromPreview && (
                            <div style={{ padding: "37px", display: "flex" }}>
                              <span style={{ color: "#666666", fontWeight: "400", fontSize: "1rem" }}>Signature Pad</span>
                              <i class="fas fa-edit" style={{ margin: "0 auto", color: "#919191" }}></i>
                            </div>
                          )
                        }
                        {
                          this.props.read_only === true ? <img src={sourceDataURL} /> :
                        <SignaturePad 
                          {...pad_props}
                          penColor='black'
                          canvasProps={{ width: 315, height: 88, className: 'sigCanvas' }} style={{padding:'3px'}} />

                        }
                      </div>
                    </>
                  )
              }
            </Grid>
            <Grid item>
              {canClear && (
                <Button size="small" variant="contained" onClick={this.clear}>Clear</Button>)}
            </Grid>
          </Grid>
          <input {...props} />
        </div>
      </div>
    );
  }
}

