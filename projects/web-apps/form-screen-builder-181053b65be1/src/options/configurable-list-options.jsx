/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from '../UUID';
import {
    Typography, Grid, TextField, FormLabel, Button, Checkbox, FormControlLabel, MenuItem,
    Tooltip
} from '@material-ui/core';
import TextAreaAutosize from 'react-textarea-autosize';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { Add, Remove } from '@material-ui/icons';
import { ITEMS_LIST } from '../material-elements-config';
import store from '../stores/store';

function isDefaultItem(item) {
    const keys = Object.keys(item);
    return keys.filter(x => x !== 'element' && x !== 'key').length === 0;
}

function buildItems(items, defaultItems) {
    if (!items) {
        return defaultItems;
    }
    return items.map(x => {
        let found;
        if (isDefaultItem(x)) {
            found = defaultItems.find(y => (x.element || x.key) === (y.element || y.key));
        }
        return found || x;
    });
}

export default class ConfigurableOptions extends React.Component {
    constructor(props) {
        super(props);
        const items = buildItems(this.getItemsConfig(props.items), this._defaultItems());
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
            items,
            count: [0],
            headerList: {}
        };

    }

    _defaultItems() {
        return [
            {
                key: 'Header',
                name: 'Header Text',
                icon: 'fas fa-heading',
                static: true,
                content: 'Placeholder Text...',
            },
            {
                key: 'Label',
                name: 'Label',
                static: true,
                icon: 'fas fa-font',
                content: 'Placeholder Text...',
            },
            {
                key: 'Paragraph',
                name: 'Paragraph',
                static: true,
                icon: 'fas fa-paragraph',
                content: 'Placeholder Text...',
            },
            {
                key: 'LineBreak',
                name: 'Line Break',
                static: true,
                icon: 'fas fa-arrows-alt-h',
            },
            {
                key: 'Dropdown',
                canHaveAnswer: true,
                name: 'Dropdown',
                icon: 'far fa-caret-square-down',
                label: 'Placeholder Label',
                fieldName: 'dropdown_',
                options: [],
            },
            {
                key: 'Tags',
                canHaveAnswer: true,
                name: 'Tags',
                icon: 'fas fa-tags',
                label: 'Placeholder Label',
                fieldName: 'tags_',
                options: [],
            },
            {
                key: 'Checkboxes',
                canHaveAnswer: true,
                name: 'Checkboxes',
                icon: 'far fa-check-square',
                label: 'Placeholder Label',
                fieldName: 'checkboxes_',
                options: [],
            },
            {
                key: 'RadioButtons',
                canHaveAnswer: true,
                name: 'Multiple Choice',
                icon: 'far fa-dot-circle',
                label: 'Placeholder Label',
                fieldName: 'radiobuttons_',
                options: [],
            },
            {
                key: 'TextInput',
                canHaveAnswer: true,
                name: 'Text Input',
                label: 'Placeholder Label',
                icon: 'fas fa-font',
                fieldName: 'text_input_',
            },
            {
                key: 'NumberInput',
                canHaveAnswer: true,
                name: 'Number Input',
                label: 'Placeholder Label',
                icon: 'fas fa-plus',
                fieldName: 'number_input_',
            },
            {
                key: 'TextArea',
                canHaveAnswer: true,
                name: 'Multi-line Input',
                label: 'Placeholder Label',
                icon: 'fas fa-text-height',
                fieldName: 'text_area_',
            },
            {
                key: 'Image',
                name: 'Image',
                label: '',
                icon: 'far fa-image',
                fieldName: 'image_',
                src: '',
            },
            {
                key: 'Rating',
                canHaveAnswer: true,
                name: 'Rating',
                label: 'Placeholder Label',
                icon: 'fas fa-star',
                fieldName: 'rating_',
            },
            {
                key: 'DatePicker',
                canDefaultToday: true,
                canReadOnly: true,
                dateFormat: 'MM/dd/yyyy',
                timeFormat: 'hh:mm aa',
                showTimeSelect: false,
                showTimeSelectOnly: false,
                name: 'Date',
                icon: 'far fa-calendar-alt',
                label: 'Placeholder Label',
                fieldName: 'date_picker_',
            },
            {
                key: 'Signature',
                canReadOnly: true,
                name: 'Signature',
                icon: 'fas fa-pen-square',
                label: 'Signature',
                fieldName: 'signature_',
            },
            {
                key: 'HyperLink',
                name: 'Web site',
                icon: 'fas fa-link',
                static: true,
                content: 'Placeholder Web site link ...',
                href: 'http://www.example.com',
            },
            {
                key: 'Download',
                name: 'File Attachment',
                icon: 'fas fa-file',
                static: true,
                content: 'Placeholder file name ...',
                fieldName: 'download_',
                file_path: '',
                _href: '',
            },
            {
                key: 'Range',
                name: 'Range',
                icon: 'fas fa-sliders-h',
                label: 'Placeholder Label',
                fieldName: 'range_',
                step: 1,
                default_value: 3,
                min_value: 1,
                max_value: 5,
                min_label: 'Easy',
                max_label: 'Difficult',
            },
            {
                key: 'Camera',
                name: 'Camera',
                icon: 'fas fa-camera',
                label: 'Placeholder Label',
                fieldName: 'camera_',
            },
            {
                key: "Button",
                canHaveAnswer: true,
                name: "Button",
                icon: "fas fa-digital-tachograph",
                label: "Placeholder Label",
                fieldName: "button",
                options: [],
            },
        ];
    }

    getItemsConfig(items) {
        if (!items)
            return null;

        let items_list = [];
        items.map(item => {
            if (ITEMS_LIST[item])
                items_list.push(ITEMS_LIST[item])
        })

        return items_list;
    }

    checkListTextAreaHandleChange = e => {
        const this_element = this.state.element;
        const text = e.target.value;
        const optionsData = text.split('\n');
        this_element.customOptions.optionsText = text;
        this_element.checkListOptions = [];
        const headerList = [];
        for (let i = 0; i < optionsData.length; i++) {
            const data = optionsData[i];
            const splittedData = data.split(':');
            const headerValue = {
                label: splittedData[0],
                headerId: i.toString(),
                required: false,
            };
            if (splittedData[1] != undefined && splittedData[1].trim() == "text") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.placeholder = splittedData[2]
                }
            } else if (splittedData[1] != undefined && splittedData[1].trim() == "number") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.placeholder = splittedData[2]
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "textarea") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.placeholder = splittedData[2]
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "dropdown") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    const options = splittedData[2].split(',');
                    headerValue.options = [];
                    for (let j = 0; j < options.length; j++) {
                        headerValue.options.push({ value: options[j], label: options[j], key: ID.uuid() });
                    }
                }
                if (splittedData[3] != undefined) {
                    headerValue.placeholder = splittedData[2]
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "radio") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    const options = splittedData[2].split(',');
                    headerValue.options = [];
                    for (let j = 0; j < options.length; j++) {
                        headerValue.options.push({ value: options[j], label: options[j], key: ID.uuid() });
                    }
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "checkbox") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    const options = splittedData[2].split(',');
                    headerValue.options = [];
                    for (let j = 0; j < options.length; j++) {
                        headerValue.options.push({ value: options[j], label: options[j], key: ID.uuid() });
                    }
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "date") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.dateFormat = splittedData[2].trim();
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "time") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.placeholder = splittedData[2]
                }

            } else if (splittedData[1] != undefined && splittedData[1].trim() == "static") {
                headerValue.type = splittedData[1].trim();
                if (splittedData[2] != undefined) {
                    headerValue.staticText = splittedData[2]
                }
            }
            headerList.push(headerValue);
        }
        this_element.headerList = headerList;
        this.setState({ element: this_element, dirty: true, });
        // this.props.updateElement.call(this.props.preview, this_element);
    };

    maximalRows = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.maximalRows = value;
        this.setState({ element: this_element, dirty: true, });
    }

    minimalRows = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.minimalRows = value;
        if (this_element.customOptions.minimalRows > 1) {
            const previousData = this_element.rows;
            this_element.rows = [];
            for (let i = 0; i < this_element.customOptions.minimalRows; i++) {
                previousData.rowId = i;
                this_element.rows.push(previousData);
            }
        }
        this.setState({ element: this_element, dirty: true, });
    }

    addLabelChange = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.labelAdd = value;
        this.setState({ element: this_element, dirty: true, });
    }

    removeLabelChange = e => {
        const this_element = this.state.element;
        const value = e.target.value;
        this_element.customOptions.labelRemove = value;
        this.setState({ element: this_element, dirty: true, });
    }

    tableRowActions = (elemProp) => {
        const this_element = this.state.element;
        if (!this_element.customOptions[elemProp]) {
            this_element.customOptions[elemProp] = true;
        } else {
            this_element.customOptions[elemProp] = false;
            // this_element.customOptions.headerList.map((h, i) => {
            //     this_element.customOptions.headerList[i]["required"] = false;
            // });
        }
        this.setState({ element: this_element, dirty: true, });
    }

    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }
    removeTableHeader(el) {
        let count = [...this.state.count]; // make a separate copy of the array
        let index = count.indexOf(el)
        if (index !== -1) {
            count.splice(index, 1);
            this.setState({ count: count });
        }
    }
    render() {
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }
        const btnStyle = {
            color: "#50BEB6",
            border: "1px solid #50BEB6",
            backgroundColor: "#F0FBF9"
        }
        const gridContainer = {

        }
        return (
            <>
                <Grid container spacing={2} className="padding-top-10">
                    <Grid item xs={12}>
                        <FormLabel component="legend">Rows Count:</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            variant="outlined"
                            style={{ width: "100%" }}
                            placeholder='Size'
                            value={this.props.element.customOptions.maximalRows}
                            onChange={this.maximalRows}
                        />
                    </Grid>
                    <Grid item xs={12} className="mt-3">
                        <FormLabel component="legend">Table Row Actions:</FormLabel>
                    </Grid>
                    <Grid container className="ml-2">
                        <Grid xs={4}>
                            <Tooltip title="If Edit is deselected, user will not be allowed to enter any data">
                                <Button variant='contained' onClick={() => this.tableRowActions("editRow")} className={`${this.props.element.customOptions.editRow ? "tableButtonEnabled" : "tableButtonDisabled"}`}>Edit</Button>
                            </Tooltip>
                        </Grid>
                        <Grid xs={4}>
                            <Button variant='contained' onClick={() => this.tableRowActions("viewRow")} className={`${this.props.element.customOptions.viewRow ? "tableButtonEnabled" : "tableButtonDisabled"}`}>View</Button>
                        </Grid>
                        <Grid xs={4}>
                            <Button variant='contained' onClick={() => this.tableRowActions("deleteRow")} className={`${this.props.element.customOptions.deleteRow ? "tableButtonEnabled" : "tableButtonDisabled"}`}>Delete</Button>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormLabel component="legend">Fields Configuration</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            multiline
                            fullWidth
                            helperText="Columns definitions in separate lines. Each line should contain column name and type (separated by colon), some types also use values definition after another colon. "
                            rows={3}
                            variant='outlined'
                            value={this.props.element.customOptions.optionsText} onChange={this.checkListTextAreaHandleChange} />
                    </Grid> */}

                    {/* <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormLabel component="legend">Minimal rows number</FormLabel>
                        <TextField
                            size="small"
                            fullWidth
                            type="number"
                            onKeyPress={(data) => {
                                if (data.charCode === 45) {
                                  data.preventDefault();
                                }
                              }}
                            value={this.props.element.customOptions.minimalRows}
                            onChange={this.minimalRows}
                            helperText="Number of rows to be added by default."
                            variant='outlined' />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10">
                        <FormLabel component="legend">Maximal rows number</FormLabel>

                        <TextField
                            size="small"
                            fullWidth
                            type="number"
                            onKeyPress={(data) => {
                                if (data.charCode === 45) {
                                  data.preventDefault();
                                }
                              }}
                            value={this.props.element.customOptions.maximalRows}
                            onChange={this.maximalRows}
                            helperText="Max number of rows allowed (zero stands for unlimited number). Can't be smaller than minimal rows number."
                            variant='outlined' />
                    </Grid> */}
                    <Grid item xs={12} sm={12} className=" padding-top-10 padding-bottom-10 mt-4">
                        <FormLabel component="legend">Table Header Labels:</FormLabel>
                        <Grid style={{ border: '1px solid lightgrey', padding: "1rem", backgroundColor: "rgba(0, 0, 0, 0.020)" }}>
                            {this.props.element.customOptions.headerList.map((el, index) => {

                                return <Grid item xs={12} className='mt-3' >
                                    <div justifyContent="space-around" alignItems="center" style={{ marginBottom: "2rem" }}>

                                        <span className='mr-3' style={{ fontWeight: 500, opacity: "0.7" }}>Mandatory Field: </span>
                                        <FormControlLabel
                                            // this_required={this_required}
                                            name="is_required"
                                            style={{ position: "relative", top: "3px" }}
                                            control={
                                                <>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        name="No"
                                                        className="mr-3"
                                                        onClick={(e) => this.props.handleTableOptions("required", index, false)}
                                                    // color={this_required ? "default" : "primary"}
                                                    //style={{ outline: "none", textTransform: "capitalize" }}
                                                    // className={`ml-4 mr-2 ${classes.btnStyle}`}

                                                    >
                                                        <span>No</span>
                                                        <Checkbox
                                                            className="p-0 ml-1"
                                                            color="primary"
                                                            name="No"
                                                            icon={<CircleUnchecked className="checkboxSize" />}
                                                            checked={!el.required}
                                                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        //style={{ outline: "none" }}
                                                        name="Yes"
                                                        // color={this_required ? "primary" : "default"}
                                                        name="is_required"
                                                        onClick={(e) => this.props.handleTableOptions("required", index, true)}
                                                    //className='ml-2 mr-2'
                                                    // className={`ml-2 mr-2 ${classes.btnStyle}`}

                                                    >
                                                        <span>Yes</span>
                                                        <Checkbox
                                                            className="p-0 ml-1"
                                                            color="primary"
                                                            // name="YES"
                                                            name="is_required"
                                                            icon={<CircleUnchecked className="checkboxSize" />}
                                                            checked={el.required}
                                                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                                        />
                                                    </Button>
                                                </>
                                            }
                                        />
                                    </div>
                                    <TextField
                                        variant="outlined"
                                        select
                                        style={{ width: "100%" }}
                                        value={el.type}
                                        onChange={(e) => this.props.handleTableOptions("type", index, e)}
                                    >
                                        {this.state.items.map((item) => {
                                            return <MenuItem value={item.label} key={item.key}>
                                                {item.label}
                                            </MenuItem>
                                        })}

                                    </TextField>
                                    <Grid style={{ display: "flex", alignItems: "center" }}>
                                        <TextField type="text" variant="outlined" value={el.label} className="mt-3" style={{ width: "90%" }} onChange={(e) => this.props.handleTableOptions("label", index, e)} />
                                        <Add className='ml-4' style={{ cursor: "pointer" }} onClick={(e) => this.props.addTableOptions(index, e)} />
                                        {index !== 0 ? <Remove className='ml-4' style={{ cursor: "pointer" }} onClick={() => this.props.removeTableOptions(index)} /> : null}
                                    </Grid>
                                </Grid>
                            })}

                        </Grid>



                    </Grid>



                </Grid>
            </>
        );
    }
}
