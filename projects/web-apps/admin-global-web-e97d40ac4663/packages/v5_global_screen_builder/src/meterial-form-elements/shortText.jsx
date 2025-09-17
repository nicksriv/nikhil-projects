import React from 'react';
import ComponentHeader from '../form-elements/component-header';
import { Icon, IconButton, InputAdornment, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import ComponentLabel from './material-element-label';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const characterLimitHelperTheme = {
    marginRight: 11,
    textAlign: 'right'
}
class Short_Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shortText: props.result ? props.result.value : '',
            shortTextError: false,
            helperText: '',
            data: props.data || [],
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            },
            requiredMessage: ''
        }
    }

    onBlurEvent = (e) => {

        if (!e.target.value && this.props.data.customOptions.required) {
            this.setState({ requiredMessage: "Please fill out mandatory field" });
            this.setState({ shortTextError: true })
            return
        }
        const status = this.validate(e);
        const { fieldResult } = this.state;
        fieldResult.value = status.shortText;
        fieldResult.error = status.shortTextError;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    onChangeEvent = (e) => {
        console.log(e.target.value, e.target.value.length, this.props.data.customOptions.charLimit)
        // if (e.target.value.length > this.props.data.customOptions.charLimit) {
        //     return
        // }
        const status = this.validate(e);
        this.setState({ requiredMessage: "" });
        const { fieldResult } = this.state;
        fieldResult.value = status.shortText;
        fieldResult.error = status.shortTextError;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    validate = (e) => {
        const value = e.target.value;
        const customOptions = this.props.data.customOptions;
        if (this.props.data.isCharLimit && !customOptions.isMasked) {
            const valueArray = value.split('');
            if (valueArray.length > this.props.data.charLimit) {
                return { inputText: value, shortTextError: true };
            }
        }

        if (value !== '' && !customOptions.isMasked) {
            switch (customOptions.validation) {
                case 'Alphabetic':
                    const alphabeticRegex = /^[A-Za-z ]+$/;
                    if (!value.match(alphabeticRegex)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                case 'AlphaNumeric':
                    const alphaNumericRegex = /^[0-9a-zA-Z]+$/;
                    if (!value.match(alphaNumericRegex)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                case 'Currency':
                    const currencyRegex = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;
                    if (!value.match(currencyRegex)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                // case 'Cyrillic':
                //     const cyrillicRegex = /[\wа-я]+/ig;
                //     if (!value.match(cyrillicRegex)) {
                //         return { shortText: value, shortTextError: true };
                //     }
                //     break;
                case 'Email':
                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                    if (!emailRegex.test(value)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                case 'Numeric':
                    const numericRegex = /^\d+$/;
                    if (!value.match(numericRegex)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                case 'URL':
                    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                    if (!value.match(urlRegex)) {
                        return { shortText: value, shortTextError: true };
                    }
                    break;
                default:
                    break;
            }
        }

        return { shortText: value, shortTextError: false };
    }
    validationMessage(type) {
        switch (type) {
            case 'Alphabetic': return "Please enter alphabets only";

                break;
            case 'AlphaNumeric': return "Please enter alphanumeric characters only";

                break;
            case 'Currency': return "Please enter valid currency";

                break;
            // case 'Cyrillic': 

            //     break;
            case 'Email': return "Please enter a valid Email";

                break;
            case 'Numeric': return "Please enter only numeric values";

                break;
            case 'URL': return "Invalid URL. Please enter a Valid URL"

                break;
            default:
                break;
        }

    }

    render() {
        const propsData = this.props.data;
        let inputProps = {}
        const shortText = this.state.shortText;
        const CHARACTER_LIMIT = (propsData.isCharLimit && propsData.charLimit > 0) ? propsData.charLimit : 0;

        let inputWidth = "100%";
        if (this.props.data.inputFieldSize == 'large') {
            inputWidth = "100%";
        } else if (this.props.data.inputFieldSize == 'medium') {
            inputWidth = "50%";
        } else if (this.props.data.inputFieldSize == 'small') {
            inputWidth = "25%";
        }
        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }

        var formatChars = {
            '#': '[0-9]',
            '@': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        };

        const validation = " (Validation: " + propsData.customOptions.validation + ")";
        const disabled = this.props.read_only;
        const selectedIcon=propsData.customOptions.selectedIcons;
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    {/* <ComponentLabel {...this.props} /> */}
                    <InputMask
                        mask={propsData.customOptions.maskedValue}
                        value={shortText}
                        onChange={this.onChangeEvent}
                        onBlur={this.onBlurEvent}
                        formatChars={formatChars}
                        disabled={disabled}
                    >
                        {() =>
                            <TextField
                                size="small"
                                style={{ width: inputWidth }}
                                id={this.props.id}
                                variant={fieldVariant}
                                label={propsData.label}
                                required={propsData.customOptions.required}
                                name='phone'
                                value={shortText}
                                disabled={disabled}
                                onBlur={this.onBlurEvent}
                                error={this.state.shortTextError || propsData.customOptions.charLimit !== "" && shortText.length > propsData.customOptions.charLimit && true}
                                onChange={this.onChangeEvent}
                                // helperText={validation}
                                inputProps={{
                                    type: 'text',
                                    // maxlength: 250
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        asterisk: 'text-error'
                                    }
                                }}
                                placeholder={propsData.label}
                                // helperText={`${shortText.length} / 250`}
                                helperText={
                                    <div  style={{display:"flex",justifyContent:"space-between" }}>

                                        <p style={{margin:"0", textAlign:'left'}}>{this.state.requiredMessage &&
                                         this.state.shortTextError && propsData.customOptions.required  ?
                                          this.state.requiredMessage : this.state.shortTextError 
                                          ? this.validationMessage(propsData.customOptions.validation) 
                                          : validation}</p>
                                        { 
                                       propsData.customOptions.charLimit > 0 && shortText.length > propsData.customOptions.charLimit && (propsData.customOptions.validation === "Alphabetic" || propsData.customOptions.validation === "AlphaNumeric" || propsData.customOptions.validation === "Numeric")? 
                                        <p style={{ margin: "0" , textAlign:'left' }}>{`Max character limit is ${propsData.customOptions.charLimit}`}</p>
                                        : 
                                         propsData.customOptions.validation === "Alphabetic" || propsData.customOptions.validation === "AlphaNumeric" || propsData.customOptions.validation === "Numeric"? 
                                        <p style={{ margin: "0" }}>{`${shortText.length} / ${propsData.customOptions.charLimit !== "" 
                                        && propsData.customOptions.charLimit}`}</p>
                                        : null
                                        }
                                    </div>
                                }
                                FormHelperTextProps={{
                                    style: characterLimitHelperTheme
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton style={{padding:"0"}}>
                                                <Icon>{selectedIcon}</Icon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        }
                    </InputMask>
                </div>
            </div>
        );
    }
}
export default Short_Text;