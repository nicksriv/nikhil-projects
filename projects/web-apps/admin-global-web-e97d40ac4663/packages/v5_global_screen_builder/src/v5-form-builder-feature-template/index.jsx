import React from 'react';
import PropTypes from "prop-types";
import V5ButtonRadio from './button-radio';
import V5Checklist from './checklist';
import V5DatePicker from './datePicker';
import V5Dropdown from './dropdown';
import V5InputTable from './input-table';
import V5Input from './input';
import V5LocationMap from './location-map';
import V5Phone from './phone';
import V5SectionHeader from './section-header';
import V5Signature from './signature';
import V5SingleChoice from './single-choice';
import V5Button from './button';
import V5Photo from './photo';
import V5Tiles from './tiles';
import V5BarcodeScanner from './barcode-scanner';
function V5FormElement(props) {
    const {
        elementType,
    } = props;
    return (
        <>
            {(() => {
                switch (elementType) {
                    case 'Short_Text':
                    case 'Long_Text':
                    case 'Email':
                        return (
                            <V5Input
                                customStyle={{}}
                                placeholderText={""}
                                type={"text"}
                            />
                        );
                    case 'Number':
                        return (
                            <V5Input
                                customStyle={{}}
                                placeholderText={""}
                                type={"number"}
                            />
                        );
                    case 'Dropdown':
                        return (
                            <V5Dropdown />
                        );
                    case 'Single_Choice':
                        return (
                            <V5SingleChoice />
                        );
                    case 'Button_Radios':
                        return (
                            <V5ButtonRadio />
                        );
                    case 'Location_Coordinates':
                        return (
                            <V5LocationMap />
                        );
                    case 'Check_List':
                        return (
                            <V5Checklist />
                        );
                    case 'Configurable_List':
                        return (
                            <V5InputTable />
                        );
                    case 'Signature':
                        return (
                            <V5Signature />
                        );
                    case 'Section_Header':
                        return (
                            <V5SectionHeader />
                        );
                    case 'Date_Picker':
                        return (
                            <V5DatePicker />
                        );
                    case 'Phone':
                        return (
                            <V5Phone />
                        );
                    case 'Button':
                        return (
                            <V5Button />
                        );
                    case 'Photo':
                        return (
                            <V5Photo />
                        );
                    case 'Tiles':
                        return (
                            <V5Tiles />
                        );
                    case 'Barcode_Scanner':
                        return (
                            <V5BarcodeScanner />
                        );
                    default:
                        return null;
                }
            })()}
        </>

    )
}

V5FormElement.propTypes = {
    elementType: PropTypes.string.isRequired,
}

V5FormElement.defaultProps = {

};

export default V5FormElement;
