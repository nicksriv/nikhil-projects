import React, { useState } from 'react'

import { TextField, Chip } from '@material-ui/core';
import {
  makeStyles,
  // ThemeProvider, createTheme 
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  componentWrapper: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #c4c4c4",
    borderRadius: 4,
    padding: 10,
    marginBottom: 2
  },
  chipWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'flex-start'
  },
  chipStyle: {
    backgroundColor: "#fff",
    border: '1px solid #ccc',
    margin:2,
    maxWidth:'100%',
  },
  helperText:{
    color:'red'
}

}));

const MultipleDates = (props) => {
  const classes = useStyles();
  const { chipsData, value, onChange, onKeyPress, placeholder,onChipDelete,helperText,disabled} = props;
  return (
    <div className={classes.componentWrapper}>
      <div
        className={classes.chipWrapper}>
        {
          chipsData.map((value, index) => {
            return (
              <React.Fragment key={`chips_${index}`}>
                <Chip
                  disabled={disabled}
                  className={classes.chipStyle}
                  key={value}
                  label={value}
                  onDelete={() => { onChipDelete(value) }} />
              </React.Fragment>
            )
          })
        }
      </div>
      <TextField
        disabled={disabled}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        InputProps={{ disableUnderline: true }}
        helperText={helperText}
        FormHelperTextProps={{
          className:classes.helperText
        }}
      />
    </div>
  )
}

export default MultipleDates