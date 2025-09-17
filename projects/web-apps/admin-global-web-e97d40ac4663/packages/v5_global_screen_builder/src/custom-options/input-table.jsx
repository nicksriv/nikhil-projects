import React from 'react';
import { TextField, FormLabel, Grid, IconButton } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

export default InputTableOptions = props => {
    return (
        <>
            <div className="custom-control">
                <Grid container direction={"row"} spacing={5}>
                <Grid><label htmlFor="is-row-count">Rows Count:</label></Grid>
                <Grid>
                    <TextField
                    type="number"
                    label="Size" 
                    defaultValue={props.rowCount}
                    onChange={props.setRows(this, "rows")}
                    InputProps={{ inputProps: { min: 1 } }} />
                </Grid>
                </Grid>
            </div>
            <br /><br />
            <FormLabel component="legend">Table Header Lables:</FormLabel>
            {
                props.headerList.map((header, index) => (
                <Grid container direction={"row"} spacing={4} key={header.headerId}>
                    <Grid>
                    <div className="custom-control custom-checkbox">
                        <input id={"is-column-required"+index} className="custom-control-input" type="checkbox" checked={header.required} value={true} onChange={props.columnRequired(this, 'required', index)} />
                        <label className="custom-control-label" htmlFor={"is-column-required"+index}>
                            Required
                        </label>
                        </div>
                    </Grid>
                    <Grid >
                    <TextField
                        size="small"
                        variant="outlined"
                        value={header.label}
                        placeholder="Add Header"
                        onChange={props.addHeaderLabel(this, index)} />
                    </Grid>
                    <Grid>
                    <IconButton aria-label="add">
                        <AddIcon onClick={props.addHeader(this, index)} />
                    </IconButton>
                    {(index > 0) && 
                        <IconButton aria-label="add">
                        <RemoveIcon onClick={props.removeHeader(this, index)} />  
                        </IconButton>
                    }
                    </Grid>
                </Grid>
                ))
            }
        </>
    );
}