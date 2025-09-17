import React from 'react';
import FormBuilder, { Registry } from './index';
import * as variables from './variables';
// Add our stylesheets for the demo.
//require('../scss/application.scss');

//const url = 'http://localhost:1337/api/v1/screen/formdata';
const saveUrl = '/api/formdata';
var items = [
    'Photo', 'Short_Text', 'Email', 'Number', 'Phone', 'Single_Choice', 'Dropdown','Mapping_Dropdown','Check_List', 'Date_Picker', 'Header', 'Long_Text', 'Signature', 'Section_Header', 'Location_Coordinates', 'Tab_Break', 'Configurable_List', 'Button_Radios', 'Input_Table', 'Photo_PREPOST', 'Page_Break', 'Two_Column_Row', 'Three_Column_Row', 'Four_Column_Row','Attachment'
];
const toolboxOrigin = "right"; // left | right
export default class V5FormBuilder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormBuilder.ReactFormBuilder
                data={this.props.data}
                variables={variables}
                url={this.props.url}
                toolboxOrigin={toolboxOrigin}
                saveUrl={saveUrl}
                toolbarItems={items}
                isAligned={true}
                formBuilderHeaderComponent={this.props.formBuilderHeaderComponent}
                pageMode={this.props.pageMode}
                screenTitle={this.props.screenTitle}
                handleFormElementCheck={this.props.handleFormElementCheck}
                uploadFile={this.props.uploadFile}
                fileId={this.props.fileId}
            />
        );
    }
}

// const V5FormBuilder = (props) => {
//     const {

//     } = props;
//     const url = '/api/formdata';
//     const saveUrl = '/api/formdata';
//     var items = [
//         'Photo', 'Short_Text', 'Email', 'Number', 'Phone', 'Single_Choice', 'Dropdown', 'Check_List', 'Date_Picker', 'Header', 'Long_Text', 'Signature', 'Section_Header', 'Location_Coordinates', 'Tab_Break', 'Configurable_List', 'Button_Radios', 'Input_Table', 'Photo_PREPOST', 'Page_Break', 'Two_Column_Row', 'Three_Column_Row', 'Four_Column_Row'
//     ];
//     const toolboxOrigin = "right"; // left | right

//     return (
//         <FormBuilder.ReactFormBuilder
//             variables={variables}
//             url={url}
//             toolboxOrigin={toolboxOrigin}
//             saveUrl={saveUrl}
//             toolbarItems={items}
//         />
//     )
// }

// export default V5FormBuilder;