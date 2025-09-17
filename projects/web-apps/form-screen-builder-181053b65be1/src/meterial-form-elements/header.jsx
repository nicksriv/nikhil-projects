import React from 'react';
import { useFormik } from 'formik';
import ComponentLabel from '../form-elements/component-label';
import ComponentHeader from '../form-elements/component-header';
import { TextField } from '@material-ui/core';
import * as Yup from 'yup';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let textAlignment = "flex-start";
        if(this.props.data.textAlignment == 'left') {
            textAlignment = "flex-start";
        } else if(this.props.data.textAlignment == 'center') {
            textAlignment = "center";
        } else if(this.props.data.textAlignment == 'right') {
            textAlignment = "flex-end";
        }
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group" style={{display: 'flex', justifyContent: textAlignment}}>
                    {this.props.data.customOptions.imageFile &&
                        <div>
                            <img src={this.props.data.customOptions.imageFile} height="100" className="image-upload-preview" /><br />
                        </div>
                    }
                    <div style={{alignSelf: 'center', paddingLeft: '10px'}}>
                        <h3>{this.props.data.label}</h3>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;