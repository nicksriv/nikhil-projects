/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from '../UUID';
import { FormGroup, Grid, TextField, FormLabel, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontSize: '0.875rem',
            }
        }
    }
});

export default class InputTableOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
        };
    }

    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }

    addHeaderLabel(position, e) {
        const this_element = this.state.element;
        const headerList = this_element.headerList;

        headerList[position].label = e.target.value;
        this_element.headerList = headerList;

        this.setState({
            element: this_element,
            dirty: true,
        });
    }

    addHeaderFieldType(position, e) {
        const this_element = this.state.element;
        const headerList = this_element.headerList;

        headerList[position].type = e.target.value;
        this_element.headerList = headerList;

        this.setState({
            element: this_element,
            dirty: true,
        });
    }

    addHeader(position, e) {
        const this_element = this.state.element;
        const headerList = this_element.headerList;

        headerList.splice(position + 1, 0, { headerId: headerList.length.toString(), label: "Header Item", required: false, type: 'text', options: [] });
        this_element.headerList = headerList;

        this.setState({
            element: this_element,
            dirty: true,
        });
    }

    columnRequired(elemProperty, position, e) {
        const this_element = this.state.element;
        const headerList = this_element.headerList;

        headerList[position].required = !headerList[position].required;
        this_element.headerList = headerList;

        this.setState({
            element: this_element,
            disty: true
        });
    }

    removeHeader(position, e) {
        if (position == 0)
            return;
        const this_element = this.state.element;
        const headerList = this_element.headerList;

        headerList.splice(position, 1);
        this_element.headerList = headerList;

        this.setState({
            element: this_element,
            dirty: true
        });
    }

    setRows(elemProperty, e) {
        const this_element = this.state.element;
        let rows = this_element.rows;
        if (e.target.value > rows.length) {
            const count = e.target.value - rows.length;
            rows.splice(rows.length, count, { rowId: rows.length });
        } else if (e.target.value < rows.length) {
            let count = rows.length - e.target.value;
            rows.splice(e.target.value, count);
        }

        this_element[elemProperty] = rows;

        this.setState({
            element: this_element,
            dirty: true,
        });
    }

    checkListTextAreaHandleChange = (position,e) => {
        const text = e.target.value;
        const optionsData = text.split('\n');
        const this_element = this.state.element;
        const headerList = this_element.headerList;
        headerList[position].options = [];
        headerList[position].optionsText = text;
        for (let i = 0; i < optionsData.length; i++) {
            headerList[position].options.push({ value: optionsData[i], label: optionsData[i], key: ID.uuid() });
        }
        this_element.headerList = headerList;
        this.setState({ element: this_element , dirty: true, });
        // this.props.updateElement.call(this.props.preview, this_element);
    };

    render() {
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }
        let headerList = (this.state.element.hasOwnProperty('headerList')) ? this.state.element.headerList : [{ headerId: 0, label: "Header Item", type: "text", options: [] }];
        const rowCount = (this.state.element.hasOwnProperty('rows')) ? this.state.element.rows.length : 1;
        let rows = [{ rowId: 0 }];
        if (this.props.element.hasOwnProperty('headerList')) {
            headerList = this.props.element.headerList;
            rows = this.props.element.rows;
        }

        return (
            <>
                <Grid container spacing={2} className="padding-top-10">
                    <Grid container spacing={2}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={2} className="element-options-border-grid">
                            <label htmlFor="is-row-count">Rows Count:</label>
                        </Grid>
                        <Grid item xs={12} sm={10} className="element-options-border-grid padding-bottom-10">
                            <TextField
                                type="number"
                                label="Size"
                                defaultValue={rowCount}
                                onChange={this.setRows.bind(this, "rows")}
                                InputProps={{ inputProps: { min: 1 } }} />
                        </Grid>
                        <Grid item xs={12} className="padding-top-10">
                            <FormLabel component="legend">Table Header Lables:</FormLabel>
                        </Grid>
                        {
                            headerList.map((header, index) => (
                                <React.Fragment key={header.headerId}>
                                    <Grid>

                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <FormControlLabel
                                            control={<Checkbox checked={header.required} onChange={this.columnRequired.bind(this, 'required', index)} name={"is-column-required" + index} color="primary" />}
                                            label="Required"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} className=" padding-top-10 padding-bottom-10">
                                        <FormGroup>
                                            <select value={header.type} id="defaultSelect" onChange={(event) => this.addHeaderFieldType(index, event)} className="form-control" >
                                                <option value='text' key='red'>Text</option>
                                                <option value='number' key='blue'>Number</option>
                                                <option value='dropdown' key='black'>Dropdown</option>
                                            </select>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            value={header.label}
                                            defaultValue={header.label}
                                            placeholder="Add Header"
                                            onChange={this.addHeaderLabel.bind(this, index)} />
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <IconButton aria-label="add">
                                            <AddIcon onClick={this.addHeader.bind(this, index)} />
                                        </IconButton>
                                    </Grid>

                                    <Grid item xs={12} sm={1}>
                                        {(index > 0) &&
                                            <IconButton aria-label="remove">
                                                <RemoveIcon onClick={this.removeHeader.bind(this, index)} />
                                            </IconButton>
                                        }
                                    </Grid>

                                    {
                                        header.type == "dropdown" &&
                                        <>
                                            <Grid item xs={12} sm={10}>
                                                <Grid item xs={12}>
                                                    <FormLabel component="legend">Dropdown Options for {header.label}</FormLabel>
                                                </Grid>
                                                <TextField
                                                    size="small"
                                                    multiline
                                                    fullWidth
                                                    rows={3}
                                                    variant='outlined'
                                                    value={header.optionsText != undefined ? header.optionsText : ''} onChange={(event) => this.checkListTextAreaHandleChange(index, event)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>

                                            </Grid>
                                        </>
                                    }

                                </React.Fragment>
                            ))
                        }
                    </Grid>

                </Grid>
            </>
        );
    }
}
