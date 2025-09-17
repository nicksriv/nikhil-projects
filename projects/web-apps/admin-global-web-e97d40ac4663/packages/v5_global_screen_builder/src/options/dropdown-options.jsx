import React, { useEffect, useState } from 'react';
import {
    TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Grid, IconButton, Switch, Typography, Button, List, ListItem, Paper, Icon, Tooltip, Box,
    MenuItem, Select, InputLabel, FormGroup, InputAdornment, Card, CardContent, Slider, Input
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { styled, makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import V5GlobalDownloadTemplate from './V5GlobalDownloadTemplate';
import V5GlobalDnDFileControl from './V5GlobalDnDFileControl';
import { V5FormBuilderDownloadTemplate } from '..';
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({

}));

function DropdownOptions(props) {
    const {
        dropDownOptions,
        handleDropdownDataOptions,
        element,
        handledropDownOptions,
        classes,
        // handleDownload
    } = props;
    const localClasses = useStyles();
    const [file, setFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isProgressComplete, setIsProgressComplete] = useState(false);
    const [isdeleted, setisDeleted] = useState(false);
    //alert(JSON.stringify(element)

    function setDropDown(list) {
        let uploadedList = [];
            list.map((el, index) => {
                uploadedList.push({ value: el.label, label: el.label, key: el.__rowNum__ });
                props.element.customOptions.optionsText = props.element.customOptions.optionsText !== undefined ? props.element.customOptions.optionsText + "\n" + el?.label : el?.label;
                props.element.customOptions.uploadedOptions.push({ value: el.label, label: el.label, key: el.__rowNum__ });
            });
    }
    const setDropDownOptions = (fileName, uploaded) => {
        props.element.fileUploaded = fileName;
        props.element.uploaded = uploaded;
    }
    const deleteUploadedOptions = (isDeleted) => {
        // props.element.dropDownOptions = props.element.dropDownOptions.filter((el) => {
        //     props.element.customOptions.uploadedOptions.map((prop) => {
        //         el.value !== prop.value
        //     })
        // })
        setisDeleted(true);
        const Val = props.element.dropDownOptions.filter((elem) => !props.element.customOptions.uploadedOptions.find(({ key }) => elem.key === key));
        // let Val = props.element.dropDownOptions.filter((el) => {
        //     return props.element.customOptions.uploadedOptions.filter((prop) => {
        //         prop.value !== el.value
        //     })
        // })
        props.element.dropDownOptions = Val;
        props.element.customOptions.optionsText = "";
        props.element.dropDownOptions.map((el, i) => {
            if (i + 1 === props.element.dropDownOptions.length) {
                props.element.customOptions.optionsText += el.value;
            } else {
                props.element.customOptions.optionsText += el.value + "\n";
            }
        })
        handledropDownOptions(props.element.dropDownOptions, props.element.customOptions.optionsText, "", false);
       
    }
    const handleDownload = () => {
        let jsonToConvert = [];
        jsonToConvert.push({ label: "" })
        let excelSheet = XLSX.utils.json_to_sheet(jsonToConvert);
        let workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, excelSheet, 'MASTERDATA_TABLE');
        XLSX.writeFile(workBook, 'MASTERDATA_TABLE.XLS')
    }

    useEffect(() => {
        if (!isdeleted) {
            props.element.dropDownOptions = props.element.dropDownOptions.concat(props.element.customOptions.uploadedOptions);
            if (props.element.dropDownOptions.length > 0) {
                const uniqueDropDownOptions = [...new Map(props.element.dropDownOptions.map(item =>
                    [item["value"], item])).values()];
                props.element.dropDownOptions = uniqueDropDownOptions;
            }

        }
    }, [props.element.dropDownOptions, props.element.customOptions.uploadedOptions]);

    useEffect(() => {
        if (props.element.customOptions.uploadedOptions.length > 0) {
            props.element.customOptions.uploadedOptions.map((el) => {
                props.element.customOptions.optionsText = props.element.customOptions.optionsText !== undefined && props.element.customOptions.optionsText + "\n" + el.value;
            })
            let OptionsTextArray = props.element.customOptions.optionsText?.split(/\r?\n/);
            let uniqueOptionText = [...new Set(OptionsTextArray)];
            props.element.customOptions.optionsText = "";
            uniqueOptionText.map((el, i) => {
                if (i + 1 === uniqueOptionText.length) {
                    props.element.customOptions.optionsText += el;
                } else {
                    props.element.customOptions.optionsText += el + "\n";
                }
            })
            handledropDownOptions(props.element.dropDownOptions, props.element.customOptions.optionsText, file, true);
           
        }
    }, [props.element.customOptions.optionsText])

    return (
        <>
            <V5FormBuilderDownloadTemplate handleDownloadTemplate={handleDownload} headerText={"Click here to download template"} headerDescription={"MASTERDATA_TABLE.XLS"} />
            <V5GlobalDnDFileControl
                file={file}
                setDropDown={setDropDown}
                setFile={setFile}
                isFileSelected={isFileSelected}
                setIsFileSelected={setIsFileSelected}
                isProgressComplete={isProgressComplete}
                setIsProgressComplete={setIsProgressComplete}
                dropDownOptions={props.element.dropDownOptions}
                fileUploaded={props.element.fileUploaded}
                uploaded={props.element.uploaded}
                setDropDownOptions={setDropDownOptions}
                deleteUploadedOptions={deleteUploadedOptions}

            />
            {/* <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={`${classes.downloadContainer} cursor-pointer`}
            //onClick={handleDownloadTemplate}
            >
                <Grid item className="pt-5">
                    <img className={classes.fileDownloadIcon}
                        src={`/assets/images/icons/Drag & Drop icons.svg`}
                        alt={"dnd"} />
                </Grid>
                <Grid item className="pb-8">
                    <h5 className="font-normal"
                        style={{ color: "#000000BC" }}>Browse sheet</h5>
                </Grid>
            </Grid> */}
        </>
    )
}

export default DropdownOptions;
