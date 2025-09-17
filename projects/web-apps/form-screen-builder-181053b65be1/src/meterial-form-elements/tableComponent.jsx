import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField,Button, ButtonGroup, Grid } from '@material-ui/core';
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from './material-element-label';
import { green } from '@material-ui/core/colors';
import store from '../stores/store';
import MenuItem from '@material-ui/core/MenuItem';

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
      background: '#dee2e6'
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
    const result = props.rowResult != undefined ? props.rowResult.filter((data) => data.headerId == props.columnIndex) : '';
    const resultVal = result != undefined && result.length > 0 ? result[0].value : ''
    let data = '';
    if (props.type == "text") {
        data = <TextField
            size="small"
            value={resultVal}
            required={props.required}
            onChange={(event) => props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event)}
            variant={props.fieldVariant} />
    } else if (props.type == "number") {
        data = <TextField
            size="small"
            type="number"
            required={props.required}
            value={resultVal}
             onChange={(event) => props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event)}
            variant={props.fieldVariant} />
    } else if (props.type == "dropdown") {
        data = <TextField
            size="small"
            label="Please select"
            variant={props.fieldVariant}
            style={{ width: 200 }}
            select
            value={resultVal}
            required={props.required}
             onChange={(event) => props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event)}

        >
            {props.options != undefined && props.options.map((option) => {
                const this_key = `preview_${option.key}`;
                return <MenuItem value={option.value} key={this_key}>{option.label}</MenuItem>;
            })}
        </TextField>

    }
    return data;
}

rows.map((row, index) => (
    <TableRow key={row}>
        <TableCell component="th" scope="row" align="left"><TextInputCells id={row+''+index} /></TableCell>
    </TableRow>
))

const MyTable = props => {
    const classes = useStyles();
    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.tableHeaderRow}>
                        {props.tableHeaders.map((header, index) => (
                            <TableCell align="left" key={index}><b>{header.label + (header.required ? " *" : "")}</b></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* <GetRows rows={props.rows} /> */}
                    {
                        props.rows.map((row, rowIndex) => {
                            const rows = props.tableRowResult != undefined ? props.tableRowResult.filter((data) => data.rowId == row.rowId) : "";
                            const rowVal = rows != undefined && rows.length > 0 ? rows[0].result : ''
                            return (
                                <TableRow key={row.rowId}>
                                    {props.tableHeaders.map((header, cellIndex) => (
                                        <TableCell key={row + cellIndex} component="th" scope="row" align="left">
                                            <Grid style={{ width: '250px' }}>
                                                <TextInputCells handleChangeVal={props.handleChangeVal} columnIndex={cellIndex} rowIndex={rowIndex} rowResult={rowVal} options={header.options} type={header.type} required={header.required} fieldVariant={props.fieldVariant} id={row + '' + rowIndex} />
                                            </Grid>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

class Input_Table extends React.Component {
    constructor(props) {
        super(props);

        const { onLoad, onPost } = props;
        store.setExternalHandler(onLoad, onPost);

        this.state = {
            data: [props.data],
            headerList: [
                {label: 'Header Item 1', headerId: "header1", required: false, type: 'text',headerId: "0"}
            ],
            rows: [
                {
                    rowId: 0,
                }
            ],
            tableRowResult: props.result ? props.result.tableRowResult : [],
            fieldResult: {
                questionId: props.data.id,
                value: '',
                error: false,
                tableRowResult: []
            }
        }
    }

    addRow() {
        console.log("Add Row");
        let data = this.state.data;
        let rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;

        rows.push({rowId: rows.length});
        data[0].rows = rows;
        let totalList = this.props.totalItems;
        store.dispatch('updateOrder', totalList);
    }

    deleteRow() {
        console.log("Delete Row");
        let data = this.state.data;
        let rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;

        rows.pop();
        data[0].rows = rows;
        let totalList = this.props.totalItems;
        store.dispatch('updateOrder', totalList);
    }

    handleChangeVal = (rowVal, columnIndex, rowIndex, event) => {
        const { status } = this.state;
        this.state.tableRowResult.map((data) => {
            if (data.rowId == rowIndex) {
                if (data.result != undefined) {
                    const rowData = data.result.filter((rowResult) => rowResult.headerId == columnIndex)
                    if (rowData != undefined && rowData.length > 0) {
                        rowData[0].value = event.target.value;
                    } else {
                        const val = {
                            headerId: columnIndex,
                            value: event.target.value
                        };
                        data.result.push(val);
                    }
                } else {
                    const val = {
                        headerId: columnIndex,
                        value: event.target.value
                    };
                    data.result = [];
                    data.result.push(val);
                }
            }
        });
        const { fieldResult } = this.state;
        fieldResult.tableRowResult = this.state.tableRowResult;
        fieldResult.error = false;
        this.setState(status);
        this.props.collectFieldResults(fieldResult);
    }

    render() {
        let propsData = this.props.data;
        let headerList = propsData.hasOwnProperty('headerList') ? propsData.headerList : this.state.headerList;
        let rows = propsData.hasOwnProperty('rows') ? propsData.rows : this.state.rows;

        /** Result Data */
        this.state.tableRowResult = propsData.result ? propsData.result.tableRowResult : rows;

        let fieldVariant = "";
        if (this.props.globalStyles) {
            fieldVariant = (!this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant")) ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
        } else {
            if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
        }
        const CHARACTER_LIMIT = (propsData.isCharLimit && propsData.charLimit > 0) ? propsData.charLimit : 0;
        const formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;

        return (
            <div className="SortableItem rfb-item">
                <ComponentHeader {...this.props} />
                <div className="form-group">
                <ComponentLabel {...this.props} />
                    <>
                        <MyTable handleChangeVal={this.handleChangeVal} tableHeaders={headerList} rows={rows} tableRowResult={this.state.tableRowResult} fieldVariant={fieldVariant} />
                        <Button onClick={this.addRow.bind(this)} color="primary">Add Row</Button>
                        <Button onClick={this.deleteRow.bind(this)} color="secondary">Delete Row</Button>
                    </>
                </div>
            </div>
        );
    }
}

export default Input_Table;