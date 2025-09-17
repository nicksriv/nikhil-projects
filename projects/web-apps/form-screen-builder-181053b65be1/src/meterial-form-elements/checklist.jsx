import React from 'react';
import { useFormik } from 'formik';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Grid, Checkbox } from '@material-ui/core';



class CheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkListOptions: props.result ? props.result.checkListOptions : props.data.checkListOptions,
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false,
                checkListOptions: props.data.checkListOptions,
            }
        }
    }

    handleChange = (data, event) => {
        const { fieldResult } = this.state;
        fieldResult.error = false;
        fieldResult.checkListOptions.map((option) => {
            if (option.key == data.key) {
                option.isChecked = event.target.checked;
            }
        });
        // this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    render() {
        const combinedList = [];
        let splittedIndex = [];
        /** Get Field Result */
        const optionList = this.props.data.checkListOptions;
        if (this.state.checkListOptions.length > 0) {
            optionList.map((data) => {
                this.state.checkListOptions.map((resultOption) => {
                    if (data.key == resultOption.key) {
                        data.isChecked = resultOption.isChecked;
                    }
                });
            });
        }

        for (let i = 0; i < optionList.length; i++) {
            splittedIndex.push(optionList[i]);
            if (splittedIndex.length == this.props.data.customOptions.columns || i == (optionList.length - 1)) {
                combinedList.push(splittedIndex);
                splittedIndex = [];
            }
        }
        const isRequired = this.props.data.customOptions.required;
        const disabled = this.props.read_only || false;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <FormControl required={isRequired} component="fieldset">
                    <ComponentLabel {...this.props} />

                        {
                            combinedList.map((data) => {
                                return (
                                    <Grid item xs={12}>
                                        {
                                            data.map((option) => {
                                                return <FormControlLabel className="pr-4"
                                                    control={<Checkbox disabled={disabled} onChange={(event) => this.handleChange(option, event)} name={option.value} color="primary" />}
                                                    label={option.label}
                                                />;
                                            })
                                        }
                                    </Grid>
                                )
                            })

                        }

                    </FormControl>
                </div>
            </div>
        );
    }
}
export default CheckList;