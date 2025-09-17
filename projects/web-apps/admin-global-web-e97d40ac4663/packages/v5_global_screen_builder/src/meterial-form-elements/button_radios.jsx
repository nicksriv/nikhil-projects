import React from 'react';
import ComponentHeader from '../form-elements/component-header';
import { FormLabel, TextField, Grid } from '@material-ui/core';
import ComponentLabel from './material-element-label';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

class ButtonRadios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.result ? props.result.value : '',
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            }
        }
        this.handleOnChangeValue = this.handleOnChangeValue.bind(this);
    }

    handleOnChangeValue = (data) => {
        const status = {
            selectedValue: data.currentTarget.value,
            error: false
        };
        const { fieldResult } = this.state;
        fieldResult.value = status.selectedValue;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    };

    render() {

        const combinedList = [];
        let splittedIndex = [];
        for (let i = 0; i < this.props.data.buttonRadioOptions.length; i++) {
            splittedIndex.push(this.props.data.buttonRadioOptions[i]);
            if (splittedIndex.length == this.props.data.customOptions.columns || i == (this.props.data.buttonRadioOptions.length - 1)) {
                combinedList.push(splittedIndex);
                splittedIndex = [];
            }
        }

        let themeColor = 'inherit';
        if (this.props.data.customOptions.buttonThemeColor == "blue") {
            themeColor = 'blue';
        } else if (this.props.data.customOptions.buttonThemeColor == "red") {
            themeColor = 'red';
        } else if (this.props.data.customOptions.buttonThemeColor == "black") {
            themeColor = 'black';
        }

        const spacing = this.props.data.customOptions.spacing * 10;

        let inputProps = {}

        const propsData = this.props.data;
        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const disabled = this.props.read_only || false;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <ComponentLabel {...this.props} />

                    {combinedList.map((data) => {

                        return (<Grid item spacing={4} style={{ paddingTop: spacing + 'px' }}>
                            <ButtonGroup size="large" aria-label="outlined button group" disabled={disabled}>
                                {data.map((option) => {
                                    const this_key = `preview_${option.key}`;
                                    return (
                                        <Tooltip title={option.hoverText}>
                                            <Button style={{ color: this.state.selectedValue == option.key ? themeColor : 'grey', width: '150px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', height: '38px', border: '1px solid #d5d5d5', boxShadow:'0 2px 2px rgb(0 0 0 / 10%)', boxSizing: 'border-box',textAlign:"center"}}  onClick={this.handleOnChangeValue} selectedValue={this.state.selectedValue == option.key} value={option.key} key={this_key} >
                                                <span style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0 3px',textTransform: "capitalize"}}>
                                                    {option.label}

                                                </span>
                                            </Button>
                                        </Tooltip>
                                    );
                                })}
                            </ButtonGroup>
                        </Grid>);
                    })}
                </div>
            </div>
        );
    }
}
export default ButtonRadios;
