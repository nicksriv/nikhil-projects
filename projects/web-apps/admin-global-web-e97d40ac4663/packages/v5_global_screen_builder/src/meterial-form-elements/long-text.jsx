import React, { useState } from 'react';
import MUIRichTextEditor from 'mui-rte'
import ComponentHeader from '../form-elements/component-header';
import Modal from "@material-ui/core/Modal";
import { TextField, IconButton, Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { makeStyles } from "@material-ui/core/styles";
import AspectRatioRoundedIcon from '@material-ui/icons/AspectRatioRounded';
import ComponentLabel from './material-element-label';
import {
    ContentState, EditorState, convertFromHTML, convertToRaw
} from 'draft-js';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default class Long_Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: props.result ? props.result.value : '',
            isFullScreen: false,
            error: false,
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false
            },
            requiredMessage: ''
        }
    }

    textChange = event => {
        let value = event.target.value;
        if (!value&& this.props.data.customOptions.required) {
            this.setState({
                inputText: "",
                error: true,
                requiredMessage: "Please fill out mandatory field"
            })
            return
        }
        if (this.props.data.isCharLimit)
            if (value.length > this.props.data.charLimit)
                return;

        this.setState({ requiredMessage: "" })
        const status = this.validate(event);
        const { fieldResult } = this.state;
        fieldResult.value = status.inputText;
        fieldResult.error = status.error;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    fullScreen = () => {
        const { isFullScreen } = this.state;
        this.setState({
            isFullScreen: !isFullScreen
        })
    }

    validate = (e) => {
        const value = e.target.value;
        const customOptions = this.props.data.customOptions;

        if (customOptions.required && value === '') {
            return { inputText: value, error: true };
        }

        if (customOptions.limitType.toLowerCase() === 'characters' && customOptions.isLimitEntry){
            if(value.length < customOptions.min || value.length > customOptions.max ){
                return {inputText : value, error: true};
            }
        }
        if (customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' ){
            if( (value.split(' ').length -1 ) < customOptions.min || (value.split(' ').length -1 ) >= customOptions.max){
                return { inputText: value , error : true};
            }
        }

        // if ( customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && value.split(' ').length  < customOptions.min || value.split(' ').length  > customOptions.max) {
        //         return { inputText: value, error: true };
        //     }
        // if ( customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && value.length < customOptions.min || value.length > customOptions.max ){
        //         return { inputText: value, error:true};
        // } 
    


        if (value !== '') {
            switch (customOptions.validationType) {
                case 'Alphabetic':
                    const alphabeticRegex = /^[A-Za-z ]+$/;
                    if (!value.match(alphabeticRegex)) {
                        return { inputText: value, error: true };
                    }
                    break;
                case 'AlphaNumeric':
                    const alphaNumericRegex = /^[0-9a-zA-Z ]+$/;
                    if (!value.match(alphaNumericRegex)) {
                        return { inputText: value, error: true };
                    }
                    break;
                // case 'Currency':
                //     const currencyRegex = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;
                //     if (!value.match(currencyRegex)) {
                //         return { inputText: value, error: true };
                //     }
                //     break;
                // case 'Cyrillic':
                //     const cyrillicRegex = /[\wа-я]+/ig;
                //     if (!value.match(cyrillicRegex)) {
                //         return { inputText: value, error: true };
                //     }
                //     break;
                // case 'Email':
                //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                //     if (!emailRegex.test(value)) {
                //         return { inputText: value, error: true };
                //     }
                //     break;
                // case 'Numeric':
                //     const numericRegex = /^\d+$/;
                //     if (!value.match(numericRegex)) {
                //         return { inputText: value, error: true };
                //     }
                //     break;
                // case 'URL':
                //     const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                //     if (!value.match(urlRegex)) {
                //         return { inputText: value, error: true };
                //     }
                //     break;
                default:
                    break;
            }
        }

        return { inputText: value, error: false }
    }
    validationMessage(type) {
        switch (type) {
            case 'Alphabetic': return "Please enter alphabets only";

                break;
            case 'AlphaNumeric': return "Please enter alphanumeric characters only";

                break;
            // case 'Currency': return "Enter value in the currency format xx.xx";

            //     break;
            // case 'Cyrillic':

            //     break;
            // case 'Email': return "Please enter a valid Email";

            //     break;
            // case 'Numeric': return "Please enter only numeric values";

            //     break;
            // case 'URL': return "Invalid URL. Please enter a Valid URL"

            //     break;
            default:
                break;
        }

    }

    render() {
        let fieldVariant = "";
        const propsData = this.props.data;
        const customOptions = this.props.data.customOptions;
        console.log(customOptions)
        const inputProps = {};
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }
        const validation = " (Validation: " + customOptions.validationType + ")";
        let inputWidth = "100%";
        // if (this.props.data.inputFieldSize == 'large') {
        //     inputWidth = "100%";
        // } else if (this.props.data.inputFieldSize == 'medium') {
        //     inputWidth = "50%";
        // } else if (this.props.data.inputFieldSize == 'small') {
        //     inputWidth = "25%";
        // }
        const disabled = this.props.read_only || false;
        return (
            <div className="SortableItem rfb-item">
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    {/* <ComponentLabel {...this.props} /> */}
                    {
                        customOptions.editorMode.toLowerCase() === 'plain_text' &&
                        <TextField
                            size="small"
                            style={{ width: inputWidth }}
                            rows={1}
                            multiline
                            variant="outlined"
                            id={this.props.id}
                            onBlur={this.textChange}
                            variant={fieldVariant}
                            label={propsData.label}
                            inputProps={inputProps}
                            placeholder={propsData.label}
                            error={this.state.error}
                            value={this.state.inputText}
                            name={this.props.data.fieldName}
                            onChange={this.textChange}
                            required={propsData.customOptions.required}
                            disabled={disabled}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }}
                            helperText={
                                this.state.error 
                                && this.state.requiredMessage 
                                && propsData.customOptions.required 
                                ? this.state.requiredMessage 
                                : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters'
                                && this.state.inputText.length < customOptions.min ?  `Minimun ${customOptions.limitType} limit is ${customOptions.min}` 
                                : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters'
                                && this.state.inputText.length > customOptions.max ?  `Maximum ${customOptions.limitType} limit is ${customOptions.max}`  
                                : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words'
                                && (this.state.inputText.split(' ').length -1 ) < customOptions.min ?  `Minimun ${customOptions.limitType} limit is ${customOptions.min}` 
                                : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words'
                                && (this.state.inputText.split(' ').length -1 ) >= customOptions.max ?  `Maximum ${customOptions.limitType} limit is ${customOptions.max}`  
                                : this.state.error
                                ?  this.validationMessage(customOptions.validationType) 
                                :  validation
                            }
                        // rowsMax={4}
                        />
                    }


                    {
                        customOptions.editorMode.toLowerCase() === 'rich_text' &&
                        <>
                            {/* <ComponentLabel {...this.props} /> */}
                            <EditorConvertToHTML required={propsData.customOptions.required} />
                        </>
                    }

                    {
                        customOptions.editorMode.toLowerCase() === 'full_screen' && (
                            !this.state.isFullScreen ?
                            <div style={{position: 'relative'}}>
                                <IconButton style={{position: 'absolute',right: '0',zIndex: '10'}}
                                    onClick={this.fullScreen}>
                                    <AspectRatioRoundedIcon />
                                </IconButton>
                                <TextField
                                    fullWidth
                                    rows={4}
                                    multiline
                                    variant="outlined"
                                    id={this.props.id}
                                    variant={fieldVariant} 
                                    onBlur={this.textChange}
                                    label={propsData.label}
                                    inputProps={inputProps}
                                    value={this.state.inputText}
                                    error={this.state.error}
                                    name={this.props.data.fieldName} 
                                    onChange={this.textChange}
                                    placeholder="(Full Screen) Type here.."
                                    required={propsData.customOptions.required}
                                        helperText={this.state.error ? this.validationMessage(customOptions.validationType) : validation}
                                />
                            </div>
                            : 
                            <CustomModal
                                {...this.props}
                                fieldVariant={fieldVariant}
                                propsData={propsData}
                                customOptions={customOptions}
                                value={this.state.inputText}
                                error={this.state.error}
                                onBlur={this.textChange.bind(this)}
                                onChange={this.textChange.bind(this)}
                                fullScreen={() => this.fullScreen.bind(this)} />
                        )
                    }
                </div>
            </div>
        );
    }
}



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        display: 'flex',
        flexDirection: 'column',
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: '90%',
        height: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none"
    },
    closeButton: {
        padding: '5px',
        width: 'fit-content',
        marginTop: '20px',
        alignSelf: 'center'
    }
}));


export function CustomModal(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const validation = " (Validation: " + props.customOptions.validationType + ")";
    return (
        <>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                disableBackdropClick
                disableEscapeKeyDown={true}
            >
                <div style={modalStyle} className={classes.paper}>
                    <TextField
                        fullWidth
                        rows={15}
                        multiline
                        id={props.id}
                        variant="outlined"
                        value={props.value}
                        error={props.error}
                        name={props.data.fieldName}
                        variant={props.fieldVariant}
                        label={props.propsData.label}
                        inputProps={props.inputProps}
                        onBlur={(e) => props.onBlur(e)}
                        placeholder="(Full Screen) Type here.."
                        onChange={(e) => props.onChange(e)}
                        required={props.propsData.customOptions.required}
                        helperText={props.customOptions.isLimitEntry ? "Enter " + props.customOptions.limitType + " between " + props.customOptions.min + " and " + props.customOptions.max + validation : "" + validation}
                        rowsMax={22}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.fullScreen()}
                        className={classes.closeButton}>
                        Close
                    </Button>
                </div>
            </Modal>
        </>
    );
}


const toolbar = {
    options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
    inline: {
        inDropdown: false,
        className: undefined,
        options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
    },
};

export class EditorConvertToHTML extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    convertFromHTML(content) {
        const newContent = convertFromHTML(content);
        if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
            // to prevent crash when no contents in editor
            return EditorState.createEmpty();
        }
        const contentState = ContentState.createFromBlockArray(newContent);
        return EditorState.createWithContent(contentState);
    }


    onEditorStateChange(index, property, editorContent) {
        const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
            .replace(/(?:\r\n|\r|\n)/g, ' ');

        this.setState({
            content: html
        });
    }
    render() {
        const editorState = this.convertFromHTML(this.state.content);
        return (
            <div>
                <Editor
                    toolbar={toolbar}
                    placeholder="Type here.."
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    defaultEditorState={editorState}
                    onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')}
                    stripPastedStyles={true}
                />
            </div>
        );
    }
}





// NOT USING THE MUI EDITOR
const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 20,
                width: "80%"
            },
            editor: {
                borderBottom: "1px solid gray"
            }
        }
    }
})

const MyBlock = (props) => {
    return (
        <div style={{
            padding: 10,
            backgroundColor: "#ebebeb"
        }}>
            My Block content is:
            {props.children}
        </div>
    )
}

export function MUIEditor() {
    return (
        <div style={{ paddingTop: '0px', paddingBottom: '50px', paddingLeft: '10px', border: '1px solid #cecece', borderRadius: '5px' }}>
            <MuiThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor
                    controls={["my-callback"]}
                    customControls={[
                        {
                            name: "my-callback",
                            icon: <DoneIcon />,
                            type: "callback",
                            onClick: (editorState, name, anchor) => {
                                // console.log(`Clicked ${name} control`)
                                return EditorState.createEmpty()
                            }
                        }
                    ]}
                />
            </MuiThemeProvider>
        </div>
    )
}
