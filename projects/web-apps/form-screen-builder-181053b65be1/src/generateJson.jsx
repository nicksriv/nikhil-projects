import React from 'react';
import { Button } from '@material-ui/core';

const generateJson = (props) => {
    let root = generateBasicStructureObj();
    const elements = props.data.data;

    let pageId = 1;
    let sectionId = 0;
    let isSection = false;
    // let pages = new Array();
    // let pageCount = 0;
    // let currentPage = generatePageObj(pageCount);
    // let currentSection = null;
    // let sectionCount = 0;

    let list = new Array();

    for (let index = 0; index < elements.length; index++) {
        switch(elements[index].element){
        //     case 'MaterialText':
        //         let textElement = elements[index];//generateMaterialTextObj(index, elements[index]);
        //         textElement.sequence = index;
        //         if(currentSection != null){
        //             currentSection.elements.push(textElement);
        //         }else{
        //             currentPage.elements.push(textElement);
        //         }
        //         break;
        //     case 'Signature': 
        //         let signElement = elements[index];
        //         signElement.sequence = index;
        //         if(currentSection != null){
        //             currentSection.elements.push(signElement);
        //         }else{
        //             currentPage.elements.push(signElement);
        //         }
        //         break;
        //     case 'MaterialPhone':
        //         let phoneElement = elements[index];//generateMaterialPhoneObj(index, elements[index]);
        //         phoneElement.sequence = index;
        //         if(currentSection != null){
        //             currentSection.elements.push(phoneElement);
        //         }else{
        //             currentPage.elements.push(phoneElement);
        //         }
        //         break;
        //     case 'MaterialNumber':
        //         let numberElement = elements[index];//generateMaterialNumberObj(index, elements[index]);
        //         numberElement.sequence = index;
        //         if(currentSection != null){
        //             currentSection.elements.push(numberElement);
        //         }else{
        //             currentPage.elements.push(numberElement);
        //         }
        //         break;
            case 'Page_Break':
                pageId++;
                // let pageBreak = elements[index];
                // pageBreak.sequence = index;
                // if(currentSection != null){
                //     currentSection.elements.push(pageBreak);
                //     currentPage.sections.push(currentSection);
                //     currentSection = null;
                //     sectionCount++;
                // }else{
                //     currentPage.elements.push(pageBreak);
                // }
                // pages.push(currentPage);
                // pageCount++;
                // // create new page
                // currentPage = generatePageObj(pageCount);
            //     break;
            // case 'SectionBreak':
            //     isSection = false;
                break;
            case 'Section_Header':
                sectionId++;
                isSection = true;
                // if(currentSection != null){
                //     currentPage.sections.push(currentSection);
                //     sectionCount++;
                // }
                // currentSection = elements[index];//generateSectionHeaderObj(sectionCount, elements[index]);
                // currentSection.elements = new Array();
                // currentSection.sequence = index;
                break;
        //     case 'MaterialTable':
        //         let tableElement = elements[index];//generateInputTableObj(index, elements[index]);
        //         if(currentSection != null){
        //             currentSection.elements.push(tableElement);
        //         }else{
        //             currentPage.elements.push(tableElement);
        //         }
        //         break;
        //     case 'Two_Column_Row':
        //     case 'Three_Column_Row':
        //     case 'Four_Column_Row':
        //         let multiColumnRow = elements[index];
        //         multiColumnRow.sequence = index;
                
        //         if(currentSection != null){
        //             currentSection.elements.push(multiColumnRow);
        //         }else{
        //             currentPage.elements.push(multiColumnRow);
        //         }
        //         break;
            default:
                break;
        }

        let defaultElement = elements[index];
        defaultElement.pageId = pageId.toString();
        defaultElement.sectionId = isSection ? sectionId.toString() : '0';
        defaultElement.sequence = index;
        list.push(defaultElement);

        if(elements[index].element.hasOwnProperty("globalStyles"))
            root.styles = elements[index].element.globalStyles;
    }

    root.list = list;

    try{
        console.log(JSON.stringify(root));
        localStorage.setItem('FORM_JSON', JSON.stringify(root));
        props.getJSON(root);
        // store.dispatch('updateOrder', []);
        props.closePreview();
    }catch(e){
        alert("Error generating the JSON");
    }
}

const generateMaterialTextObj = (sequence, field) => {
    // return {};
    let object = new Object();
    
    object.sequence = sequence;
    object.id = field.id;
    object.name = field.fieldName;
    object.label = field.label;
    object.fieldVariant = field.fieldVariant;
    object.title = field.text;
    object.element = field.element;

    let options = new Object();
    options.required = field.required;
    options.isCharLimit = field.hasOwnProperty("isCharLimit") ? field.isCharLimit : false;
    if(options.isCharLimit)
        options.charLimit = field.charLimit;
    object.options = options;

    return object;
}
const generateMaterialPhoneObj = (sequence, field) => {
    // return {};
    let object = new Object();

    object.sequence = sequence;
    object.id = field.id;
    object.name = field.fieldName;
    object.label = field.label;
    object.fieldVariant = field.fieldVariant;
    object.title = field.text;
    object.element = field.element;


    let options = new Object();
    options.required = field.required;
    options.isMasked = field.hasOwnProperty("mask") ? field.mask : false;
    object.options = options;

    return object;
}
const generateMaterialNumberObj = (sequence, field) => {
    // return {};
    let object = new Object();

    object.sequence = sequence;
    object.id = field.id;
    object.name = field.fieldName;
    object.label = field.label;
    object.fieldVariant = field.fieldVariant;
    object.title = field.text;
    object.element = field.element;

    let options = new Object();
    options.required = field.required;
    object.options = options;

    return object;
}
const generateSectionHeaderObj = (sequence, field) => {
    // return {};
    let object = new Object();

    object.sequence = sequence;
    object.id = field.id;
    object.name = field.fieldName;
    object.label = field.label;
    object.fieldVariant = field.fieldVariant;
    object.title = field.text;
    object.element = field.element;
    object.elements = new Array();

    return object;
}

const generateInputTableObj = (sequence, field) => {
    // return {};

    let object = new Object();

    object.sequence = sequence;
    object.id = field.id;
    object.name = field.fieldName;
    object.label = field.label;
    object.fieldVariant = field.fieldVariant;
    object.title = field.text;
    object.element = field.element;
    object.headerList = field.headerList;
    object.rows = field.rows;


    let options = new Object();
    options.required = field.required;
    object.options = options;

    return object;
}

const generateBasicStructureObj = () => {
    let json = new Object();
    json["description"] = "";
    json["styles"] = null;

    return json;
}

const generatePageObj = sequence => {
    let page = new Object();
    page.sequence = sequence;
    page.elements = new Array();
    page.sections = new Array();

    return page;
}

export default function GenerateJson(props) {
    return (
        <Button
            color="primary"
            variant="contained"
            style={props.btnClass}
            onClick={()=>generateJson(props)}>
            {props.data.generateBtnLabel}
        </Button>
    )
}