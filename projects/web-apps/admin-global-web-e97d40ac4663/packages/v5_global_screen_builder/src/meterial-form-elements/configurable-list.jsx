import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { FormControlLabel,RadioGroup, Radio,Checkbox, FormLabel,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, ButtonGroup, Grid } from '@material-ui/core';
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from './material-element-label';
import { green } from '@material-ui/core/colors';
import store from '../stores/store';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import { Delete } from '@material-ui/icons';
import Email from './email';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 450,
    },
    input: {
        minWidth: 10,
        width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
    tableHeaderRow: {
        background: '#0000001F'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const TextInputCells = props => {
    const classes = useStyles();
    const [selectedDate, setDate] = useState(null);
    const [selectedTime, setTime] = useState(null);

    const setSelectedDate = (date) => {
        setDate(date);
      };
    const setSelectedTime = (time) => {
        setTime(time);
    };
    let data = '';
    console.log(props.data.required)
    if (props.data.type == "Short Text Field") {
        data = <TextField
            size="small"
            disabled={props.customOptions.editRow ? false : true}
            required={props.data.required}
            variant={props.fieldVariant}
            helperText={props.data.required ? "This Field Is Required" : ""}
            placeholder={props.data.placeholder} />
    } else if (props.data.type == "Long Text Field") {
        data = <TextField
            size="small"
            multiline
            disabled={props.customOptions.editRow ? false : true}
            rows={3}
            required={props.data.required}
           variant={props.fieldVariant} 
            placeholder={props.data.placeholder}/>
    } else if (props.data.type == "Numbers") {
        data = <TextField
            size="small"
            type="number"
            disabled={props.customOptions.editRow ? false : true}
            required={props.data.required}
           variant={props.fieldVariant}
            placeholder={props.data.placeholder} />
    } else if (props.data.type == "Dropdown") {
        data = <TextField
            size="small"
            disabled={props.customOptions.editRow ? false : true}
            variant={props.fieldVariant}
            style={{ width: 200 }}
            select
            label={props.data.label}
            required={props.data.required}
            placeholder={props.data.placeholder}

        >
            {props.data != undefined && props.data.options != undefined && props.data.options.map((option) => {
                const this_key = `preview_${option.key}`;
                return <MenuItem value={option.value} key={this_key}>{option.label}</MenuItem>;
            })}
        </TextField>

    } else if (props.data.type == "checkbox") {
        data = props.data.options != undefined && props.data.options.map((option) => {
            return <FormControlLabel
                disabled={props.customOptions.editRow ? false : true}
                control={<Checkbox checked={props.data.options[option.value]} name={option.value} color="primary" />}
                label={option.label}
            />;
        });
    } else if (props.data.type == "Button Radio") {
        data = <RadioGroup
        row aria-label="material"
            name="single-choice"
            required={props.data.required}
        >
            {
                props.data.options != undefined && props.data.options.map(option => {
                    return <FormControlLabel
                        key={option.key}
                        label={option.label}
                        value={option.value}
                        control={<Radio color='primary' />}
                    />
                })
            }
        </RadioGroup>
    } else if (props.data.type == "Date Picker") {
        let dateFormat = "MM/dd/yyyy";
        if (props.data.dateFormat != undefined) {
            let dateFormat1 = 'MM/dd/yyyy';
            let dateFormat2 = 'dd/MM/yyyy';
            let dateFormat3 = 'yyyy/MM/dd';
            let dateFormat4 = 'yyyy/dd/MM';
            if (props.data.dateFormat.toLowerCase() == "mm/dd/yyyy") {
                dateFormat = dateFormat1;
            } else if (props.data.dateFormat.toLowerCase() == "dd/mm/yyyy") {
                dateFormat = dateFormat2;
            } else if (props.data.dateFormat.toLowerCase() == "yyyy/mm/dd") {
                dateFormat = dateFormat3;
            } else if (props.data.dateFormat.toLowerCase() == "yyyy/dd/mm") {
                dateFormat = dateFormat4;
            }
        }

        data = <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant={props.fieldVariant}
                    format={dateFormat}
                    value={selectedDate}
                    onChange={setSelectedDate}
                    margin="normal"
                    id="date-picker-inline"
                    autoOk={true}
                    size='medium'
                    placeholder={dateFormat.toUpperCase()}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    } else if(props.data.type == "Time") {
        data = <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
            <KeyboardTimePicker
                    disabled={props.customOptions.editRow ? false : true}
            margin="normal"
            id="time-picker"
            variant="inline"
            value={selectedTime}
            onChange={setSelectedTime}
            inputVariant={props.fieldVariant}
            label="Time picker"
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
            />
        </Grid>
    </MuiPickersUtilsProvider>
    } else if (props.data.type == "static") {
        data = <FormLabel>{props.data.staticText}</FormLabel>
    } else if (props.data.type = "Email") {
        data = <TextField
            size="small"
            variant={props.fieldVariant}
            required={props.data.required}
            disabled={props.customOptions.editRow ? false : true}
            type="email"
        /> 
    }
    return data;

}

rows.map((row, index) => (
    <TableRow key={row}>
        <TableCell component="th" scope="row" align="left"><TextInputCells id={row + '' + index} /></TableCell>
    </TableRow>
))

const MyTable = props => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.tableHeaderRow}>
                        {props.tableHeaders.map((header, index) => (
                            <TableCell align="left" style={{padding: "12px"}} key={index}><b>{header.label + (header.required ? " *" : "")}</b></TableCell>
                        ))}
                        <TableCell align="right" style={{padding: "12px"}}><b>{props.customOptions.headerActionLabel}</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* <GetRows rows={props.rows} /> */}
                    {
                        props.rows.map((row, rowIndex) => (
                            <TableRow key={row.rowId}>
                                {props.tableHeaders.map((header, cellIndex) => (
                                    <TableCell key={row + cellIndex} component="th" scope="row" align="left">
                                        <Grid style={{width: '250px'}}>
                                            <TextInputCells customOptions={props.customOptions} data={header} options={header.options} type={header.type} required={header.required} fieldVariant={props.fieldVariant} id={row + '' + rowIndex} />
                                        </Grid>
                                    </TableCell>
                                ))}
                                <TableCell key={row + props.tableHeaders.length + 1} component="th" scope="row" align="right">
                                    {props.customOptions.deleteRow ? <Delete value={rowIndex} onClick={props.deleteRow} style={{ cursor: "pointer" }} /> : null}  
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

class ConfigurableList extends React.Component {
    constructor(props) {
        super(props);
        const { onLoad, onPost } = props;
        store.setExternalHandler(onLoad, onPost);
        this.state = {
            data: [props.data],
            headerList: [

            ],
            rows: [
                //{ rowId: 0 }
            ]            
        }
        this.deleteRow = this.deleteRow.bind(this);

    }

    addRow() {
        console.log("Add Row");
        let data = this.state.data;
        let rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;
      
        // if (data[0].customOptions.maximalRows == rows.length) {
        //     return;
        // }
        rows.push({ rowId: rows.length });
        data[0].rows = rows;
        const totalList = this.props.totalItems;
        store.dispatch('updateOrder', totalList);
    }
    deleteRow(rowIndex) {
        const index = rowIndex.currentTarget.value
        console.log("Delete Row");
        let data = this.state.data;
        let rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;
        rows.splice(index, 1);
        // rows.pop();
        data[0].rows = rows;
        const totalList = this.props.totalItems;
        store.dispatch('updateOrder', totalList);
    }

    render() {
        let propsData = this.props.data;
        let headerList = propsData.hasOwnProperty('headerList') ? propsData.headerList : this.state.headerList;
        let rows = propsData.hasOwnProperty('rows') ? propsData.rows : this.state.rows;

        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant")) ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
        }
        const CHARACTER_LIMIT = (propsData.isCharLimit && propsData.charLimit > 0) ? propsData.charLimit : 0;
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
        const maximalRows = this.props.data.customOptions.maximalRows

        return (
            <div className="SortableItem rfb-item">
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <ComponentLabel {...this.props} />
                    <>
                        <MyTable deleteRow={this.deleteRow} customOptions={propsData.customOptions} tableHeaders={propsData.customOptions.headerList} rows={rows} fieldVariant={fieldVariant} />
                        {(rows.length < parseInt(maximalRows) || maximalRows == "0") && 
                            <Button onClick={this.addRow.bind(this)} style={{ color: "#2C3E93" }}>{propsData.customOptions.labelAdd}</Button>
                        }
                        {/* <Button onClick={this.deleteRow.bind(this)} color="secondary">{propsData.customOptions.labelRemove}</Button> */}
                    </>
                </div>
            </div>
        );
    }
}

export default ConfigurableList;