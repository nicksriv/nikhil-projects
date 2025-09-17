import React from 'react';
import ComponentLabel from './material-element-label';
import ComponentHeader from '../form-elements/component-header';
import { TextField, Grid } from '@material-ui/core';

export default class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: props.result ? props.result.value : '',
            phoneError: false,
            areaCode: props.result ? props.result.areaCode : '',
            // areaCodeError: false,
            cCode: props.result ? props.result.countryCode : '',
            cCodeError: false,
            errorText: 'Please Enter Valid Details',
            fieldResult: {
                questionId: props.data.id,
                value: '',
                areaCode: '',
                countryCode: '',
                error: false
            }
        }
    }

    phoneChange = event => {
        let numberPattern = /^(\s*|\d+)$/;
        let value = event.target.value.replaceAll("-", "");

        if (value.match(numberPattern)) {
            if (this.props.data.customOptions.isMasked) {
                if (value.length > 10)
                    return;

                if (value.length > 3) {
                    value = value.slice(0, 3) + "-" + value.slice(3);
                }
                if (value.length > 7) {
                    value = value.slice(0, 7) + "-" + value.slice(7);
                }
                this.setState({ phone: value, phoneError: false }, () => this.validate());
            } else {
                if (value.length > 10)
                    return;

                if (value.length > 3) {
                    value = value.slice(0, 3) + "-" + value.slice(3);
                }
                if (value.length > 7) {
                    value = value.slice(0, 7) + "-" + value.slice(7);
                }
                this.setState({ phone: value, phoneError: false }, () => this.validate());
            }
        } else {
            return;
        }
    }

    countryCodeChange = event => {
        let value = event.target.value.replace('+', '');

        let numberPattern = /^(\s*|\d+)$/;
        if (value.match(numberPattern) && value.length <= 2)
            this.setState({ cCode: '+' + value, cCodeError: false });
    }

    // areaCodeChange = event => {
    //     let value = event.target.value;

    //     let numberPattern = /^(\s*|\d+)$/;
    //     if (value.match(numberPattern) && value.length <= 3) {
    //         this.setState({ areaCode: value, areaCodeError: false });
    //     }
    // }

    validate() {
        const customOptions = this.props.data.customOptions;
        if (!customOptions.required)
            return;

        let { phone, phoneError, areaCode, areaCodeError, cCode, cCodeError } = this.state;

        cCodeError = (  cCode == '' || cCode.length < 3  ) ? true : false;
        // areaCodeError = (areaCode == '' && !customOptions.isMasked) ? true : false;
        phoneError = (phone == '' || phone.length < 12 ) ? true : false;

        if (phoneError || areaCodeError || cCodeError)
            this.setState({
                phoneError: phoneError,
                cCodeError: cCodeError,
                // areaCodeError: areaCodeError
            });
    }

    render() {
        const phone = this.state.phone;
        // const areaCode = this.state.areaCode;
        const cCode = this.state.cCode;

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
                    {/* <ComponentLabel {...this.props} /> */}
                    <Grid container direction={"row"} spacing={1}>
                        {propsData.customOptions.countryCode &&
                            <Grid item sm={propsData.customOptions.countryCode && !this.props.isFromMastersScreen ?  4 : 5}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id={this.props.id}
                                    variant={fieldVariant}
                                    label="Country Code"
                                    placeholder="e.g: +1"
                                    value={cCode}
                                    onBlur={this.validate.bind(this)}
                                    error={this.state.cCodeError}
                                    required={propsData.customOptions.required}
                                    disabled={disabled}
                                    name={this.props.data.fieldName}
                                    onChange={this.countryCodeChange.bind(this)}
                                    //helperText={this.state.cCodeError ? this.state.errorText : "\'+1\'"}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                />
                            </Grid>
                        }
                        {/* {!propsData.customOptions.isMasked &&
                            <Grid item sm={propsData.customOptions.countryCode && !propsData.customOptions.isMasked ? 3 : 4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id={this.props.id}
                                    variant={fieldVariant}
                                    label="Area Code"
                                    placeholder='e.g: 000'
                                    value={areaCode}
                                    onBlur={this.validate.bind(this)}
                                    error={this.state.areaCodeError}
                                    required={propsData.customOptions.required}
                                    name={this.props.data.fieldName}
                                    onChange={this.areaCodeChange.bind(this)}
                                    //helperText={this.state.areaCodeError ? this.state.errorText : "\'000\'"}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                />
                            </Grid>
                        } */}
                        <Grid item sm={propsData.customOptions.countryCode ? 8 : 12 }>
                            <TextField
                                fullWidth
                                size="small"
                                id={this.props.id}
                                variant={fieldVariant}
                                required={propsData.customOptions.required}
                                name={this.props.data.fieldName}
                                value={phone}
                                label="Phone"
                                placeholder='e.g: 000-000-0000'
                                disabled={disabled}
                                onBlur={this.validate.bind(this)}
                                error={this.state.phoneError}
                                onChange={this.phoneChange.bind(this)}
                                helperText={ this.state.phoneError  ? <p>Minimum phone limit is 10 digits</p> : null}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
