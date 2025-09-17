import React from 'react';
import { useFormik } from 'formik';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import { TextField } from '@material-ui/core';
import * as Yup from 'yup';

class Number extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.result ? props.result.value : '',
            helperText: '',
            error: false,
            min: props.data.customOptions.min,
            max: props.data.customOptions.max,
            isNumberLimit: props.data.customOptions.isNumberLimit,
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            },
            requiredMessage: ""
        }
    }
    numberChange = event => {
        if (!event.target.value && this.props.data.customOptions.required) {
            this.setState({ number: "", error: true, requiredMessage: "Please fill out mandatory field" })
            return;
        }
        this.setState({ requiredMessage: "" })
        const status = this.validate(event);
        const { fieldResult } = this.state;
        fieldResult.value = status.number;
        fieldResult.error = status.error;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    validate = (e) => {
        const number = e.target.value;
        if (!number && number == '') {
            if (this.props.data.customOptions.required) {
                return {
                    error: true,
                    helperText: `Please enter a value within range ${this.props.data.customOptions.min} and ${this.props.data.customOptions.max}`,
                    number: number
                };
            } else {
                return {
                    error: false,
                    helperText: '',
                    number: number
                };
            }
        } else {
            if (this.state.isNumberLimit != null && this.state.isNumberLimit && (parseInt(number) < this.state.min || parseInt(number) > this.state.max)) {
                return {
                    error: true,
                    helperText: `Please enter a value within range ${this.props.data.customOptions.min} and ${this.props.data.customOptions.max}`,
                    number: number
                };
            } else if (!/[0-9]/i.test(number)) {
                return {}
            }
        }
        return {
            error: false,
            helperText: '',
            number: number
        };
    }
    render() {
        let inputProps = {}
        if (this.props.data.customOptions.isNumberLimit) {
            inputProps.min = this.props.data.customOptions.min;
            inputProps.max = this.props.data.customOptions.max;
        }

        let inputWidth = "100%";
        if (this.props.data.inputFieldSize == 'large') {
            inputWidth = "100%";
        } else if (this.props.data.inputFieldSize == 'medium') {
            inputWidth = "50%";
        } else if (this.props.data.inputFieldSize == 'small') {
            inputWidth = "25%";
        }

        const propsData = this.props.data;
        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }

        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const helperText = (this.state.helperText == '' && this.props.data.customOptions.isNumberLimit) ? 'Choose a number between ' + this.props.data.customOptions.min + ' and ' + this.props.data.customOptions.max : this.state.helperText;
        const disabled = this.props.read_only || false;

        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    {/* <ComponentLabel {...this.props} /> */}
                    <TextField
                        style={{ width: inputWidth }}
                        size="small"
                        type="number"
                        error={this.state.error}
                        variant={fieldVariant}
                        id={this.props.id}
                        label={propsData.label}
                        required={propsData.customOptions.required}
                        name={this.props.data.fieldName}
                        value={this.state.number}
                        onChange={this.numberChange}
                        InputProps={{ inputProps: inputProps }}
                        helperText={this.state.requiredMessage && this.state.error && propsData.customOptions.required ? this.state.requiredMessage : helperText}
                        onBlur={this.numberChange}
                        disabled={disabled}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                asterisk: 'text-error'
                            }
                        }}
                        placeholder={"Number input"}
                    />
                </div>
            </div>
        );
    }
}
export default Number;