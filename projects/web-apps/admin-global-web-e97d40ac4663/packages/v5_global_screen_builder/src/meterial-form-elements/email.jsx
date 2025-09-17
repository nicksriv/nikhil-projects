import React from 'react';
import { useFormik } from 'formik';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import { Button, TextField, Grid, Card, CardContent, Typography } from '@material-ui/core';
import * as Yup from 'yup';

let initialValues = {};
let validationSchema = null;

function Email(props) {
  
    initialValues[props.data.fieldName] = props.result ? props.result.value : '';
    let schema = {};
    schema[props.data.fieldName] = Yup.string().email('Invalid email format');
    if (props.data.customOptions.required) schema[props.data.fieldName] = schema[props.data.fieldName].required('Please fill out mandatory field');

    validationSchema = Yup.object(schema)

    const formik = useFormik({
        initialValues,
        validationSchema
    })

    const inputProps = {
        type: "email"
    }

    let fieldVariant = "";
    if (props.globalStyles) {
        fieldVariant = (!props.globalStyles.formDefault && props.data.hasOwnProperty("fieldVariant")) ? props.data.fieldVariant : props.globalStyles.globalFieldVariant;
    } else {
        if (props.data.fieldVariant) fieldVariant = props.data.fieldVariant;
    }

    let inputWidth = "100%";
    if (props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
    } else if (props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
    } else if (props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
    }



    const formPreview = props.hasOwnProperty('isFormPreview') ? props.isFormPreview : false;
    const fieldName = props.data.fieldName;
    const disabled = props.read_only || false;
    return (
        <div className="SortableItem rfb-item">
            <ComponentHeader {...props} />
            <div className="form-group">
                {/* <ComponentLabel {...props} /> */}
                <TextField
                    style={{ width: inputWidth }}
                    size="small"
                    id={props.id}
                    variant={fieldVariant}
                    label={props.data.label}
                    required={props.data.customOptions.required}
                    inputProps={inputProps}
                    name={fieldName}
                    error={formik.touched[fieldName] && formik.errors[fieldName]}
                    helperText={(formik.touched[fieldName] && formik.errors[fieldName]) ? formik.errors[fieldName] : ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[fieldName]}
                    disabled={disabled}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            asterisk: 'text-error'
                        }
                    }}
                    placeholder={props.data.label}
                />
            </div>
        </div>
    )
}

export default Email;