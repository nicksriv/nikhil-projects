import React, { useState } from 'react';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText, TextField } from '@material-ui/core';

class Mapping_Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownValue: props.result ? props.result.value : props.data.customOptions.defaultOptions,
            data: props.data || [],
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            }
        }
    }

    onChangeEvent = (e) => {
        const status = {
            dropDownValue: e.target.value,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.value = status.dropDownValue;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    render() {
        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant")) ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
        }
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const fieldName = this.props.data.field_name;
        let inputWidth = "100%";
        if (this.props.data.inputFieldSize == 'large') {
            inputWidth = "100%";
        } else if (this.props.data.inputFieldSize == 'medium') {
            inputWidth = "50%";
        } else if (this.props.data.inputFieldSize == 'small') {
            inputWidth = "25%";
        }
        const disabled = this.props.read_only || false;
        const notRequired={
            display:'none'
        }
        const required={
            display:'inline'
        }
        console.log(this.props.data.dropDownOptions)
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    {/* <ComponentLabel {...this.props} /> */}
                    <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-outlined-label"><><span>{this.props.data.label}</span><span className={`text-error`} style={this.props.data.customOptions.required ? required : notRequired}>* </span></></InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            style={{ width: inputWidth }}
                            size="small"
                            id={this.props.id}
                            name={fieldName}
                            variant={fieldVariant}
                            label={this.props.data.label}
                            required={this.props.data.required}
                            onChange={(e) => this.onChangeEvent(e)}
                            value={this.state.dropDownValue}
                            disabled={disabled}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }}
                            MenuProps={{
                                anchorOrigin: {
                                  vertical: "bottom",
                                  horizontal: "left"
                                },
                                getContentAnchorEl: null,
                              }}
                        >
                            {
                                this.props.data.customOptions.showEmptyTextOption &&
                                <MenuItem value="data" >{this.props.data.customOptions.emptyOptionText}</MenuItem>

                            }
                            {this.props.data != undefined && this.props.data.dropDownOptions != undefined && this.props.data.dropDownOptions.map((option) => {
                                const this_key = `preview_${option.label}`;
                                return <MenuItem value={option.label} key={this_key}>{option.label}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }
}
export default Mapping_Dropdown;