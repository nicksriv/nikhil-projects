import React from 'react';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@material-ui/core';

export default class Single_Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.result ? props.result.value : '',
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            }
        }
    }

    handleChange = (event, data) => {
        const status = {
            value: data.key,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.value = status.value;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    };
    render() {
        const options = this.props.data.singleChoiceOptions;
        const isRequired = this.props.data.customOptions.required;

        const combinedList = [];
        let splittedIndex = [];
        for (let i = 0; i < this.props.data.singleChoiceOptions.length; i++) {
            splittedIndex.push(this.props.data.singleChoiceOptions[i]);
            if (splittedIndex.length == this.props.data.customOptions.columns || i == (this.props.data.singleChoiceOptions.length - 1)) {
                combinedList.push(splittedIndex);
                splittedIndex = [];
            }
        }

        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const disabled = this.props.read_only || false;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <FormControl component="fieldset">
                        <ComponentLabel {...this.props} />

                        {
                            combinedList.map((data) => {
                                return (
                                    <RadioGroup
                                        name="single-choice"
                                        required={isRequired}
                                        aria-label="Single Choice"
                                        row
                                    >
                                        {
                                            data.map(option => {
                                                return <FormControlLabel
                                                    style={{paddingRight:"3rem"}}
                                                    key={option.key}
                                                    label={option.label}
                                                    value={option.value}
                                                    control={<Radio size='medium' disabled={disabled} onChange={(e) => this.handleChange(e, option)} checked={this.state.value == option.key} color='primary' required={isRequired} />}
                                                />
                                            })
                                        }
                                    </RadioGroup>
                                )
                            })
                        }

                        {/* {isRequired && 
                            <FormHelperText>Required</FormHelperText>
                        } */}
                    </FormControl>
                </div>
            </div>
        );
    }
}