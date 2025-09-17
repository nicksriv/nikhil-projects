import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Switch, FormLabel, RadioGroup, FormControlLabel, Menuitem, Select, Radio, TextField, InputLabel, Button, Checkbox, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: '100%',
  },
  validationSelect: {
    //margin: theme.spacing(1),
    minWidth: '50%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checked: {
    border: "1px solid #2C3E93",
    color: "#2C3E93",
    height: "30px",
    padding: " 0 0 0 0.5rem",
    marginLeft: "0.1rem",
    marginRight: "0.35rem",
    borderRadius: "4px",
  },
  unchecked: {
    border: "1px solid #00000099",
    height: "30px",
    padding: " 0 0 0 0.5rem",
    marginLeft: "0.1rem",
    marginRight: "0.35rem",
    borderRadius: "4px",
  },
  subHeading: {
    opacity: "0.6",
    fontSize: "16px",
    fontWeight: "normal",
    display: "inline"
  },
  button: {
    height: "28px",
    // outline: "none !important",
    // textTransform: "capitalize",
  }
}));

export default function LongTextOptions(props) {
  const classes = useStyles();
  const [minValError, setMinValueError] = useState(false);
  const [maxValError, setMaxValueError] = useState(false);
  const customOptions = props.element.customOptions;
  const limitTypeOptions = customOptions.limitTypeOptions?.split(',');
  const editorModeOptions = customOptions.editorModeOptions?.split(',');
  const validationOptions = customOptions.validationOptions?.split(',');
  const isDisabled = props.element.customOptions.isFieldDisabled;
  if(customOptions.isLimitEntry){
    customOptions.min = customOptions.min;
    customOptions.max = customOptions.max;
  } else{
    customOptions.min = "";
    customOptions.max = "";
  }
  return (

    <>
      <Grid item xs={12} className='my-3'>
        {!isDisabled && <FormControl component="fieldset">
          <h5 className={classes.subHeading}>Editor Mode</h5>
          <RadioGroup
            row aria-label="material"
            name="material"
            value={customOptions.editorMode}
            onChange={(e) => props.editElementCustomOptionsProp('editorMode', 'value', e)} >
            {
              editorModeOptions?.map((option, index) => {
                return <FormControlLabel style={{marginRight:'8px', marginBottom:'0.8rem'}} justifyContent="space-between" key={option + index} className={customOptions.editorMode === option ? classes.checked : classes.unchecked} value={option} control={
                  // <Grid container >
                  //   <Grid item>
                  <Radio size='small' color="primary" icon={<CircleUnchecked className="checkboxSize"/>} checkedIcon={<CircleCheckedFilled className="checkboxSize"/>} />
                  //   </Grid>
                  // </Grid>
                } label={option.split("_").join(" ")} labelPlacement='start' />
              })
            }
          </RadioGroup>
        </FormControl>}
      </Grid>
      {
        customOptions.editorMode?.toLowerCase() === 'plain_text' &&
        (
          <Grid item xs={12}>
            {!isDisabled && <FormControl fullWidth variant="outlined" className={`${classes.validationSelect} mt-2`}>
              <InputLabel id="defaultSelect">Validation</InputLabel>
              <Select
                id="demo-customized-select-outlined"
                fullWidth
                label="Validation"
                // input={<BootstrapInput />}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }}
                value={customOptions.validationType}
                onChange={(e) => props.setValidationType(e.target.value)}
              >
                {validationOptions.map((type, index) => {
                  return <MenuItem value={type} key={type + "_option_" + index}>{type}</MenuItem>;
                })}
              </Select>
            </FormControl>}
          </Grid>
        )
      }

      {customOptions.editorMode?.toLowerCase() !== 'rich_text' &&
        <>
          <Grid item className='my-3'>
          {!isDisabled && <FormControl component="fieldset" className="mt-2">
              <Grid container justifyContent="flex-start" alignItems="center" >
                <Grid item className="mr-2">
                  <h6 className={classes.subHeading}>Entry Limit:</h6>
                </Grid>
                <FormControlLabel
                  className={`p-0 m-0`}
                  size="small"
                  control={
                    <>
                      <Button
                        variant="outlined"
                        className={classes.button}
                        style={{ outline: "none", textTransform: "capitalize" }}
                        color={customOptions.isLimitEntry ? "default" : "primary"}
                        size="small"
                        onClick={(e) => props.editElementCustomOptionsProp('isLimitEntry', false, e)}
                        name="no"
                        className='ml-2 mr-2'
                      >
                        <span>No</span>
                        <Checkbox
                          size="small"
                          className="p-0 ml-1"
                          color="primary"
                          name="no"
                          icon={<CircleUnchecked className="checkboxSize"/>}
                          checked={customOptions.isLimitEntry ? false : true}
                          checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                        />
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        style={{ outline: "none", textTransform: "capitalize" }}
                        color={customOptions.isLimitEntry ? "primary" : "default"}
                        onClick={(e) => props.editElementCustomOptionsProp('isLimitEntry', true, e)}
                        name="yes"
                        className='ml-2 mr-2'
                      >
                        <span>Yes</span>
                        <Checkbox
                          size="small"
                          className="p-0 ml-1"
                          color="primary"
                          name="yes"
                          icon={<CircleUnchecked className="checkboxSize"/>}
                          checked={customOptions.isLimitEntry ? true : false}
                          checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                        />
                      </Button>

                    </>} />
            </Grid></FormControl>}
          </Grid>
          {
            customOptions.isLimitEntry ?
              <>
              {!isDisabled && <Grid container justifyContent='space-between' className='my-2'>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="pr-3"
                      type="number"
                      variant="outlined"
                      fullWidth
                      label="Min Limit"
                      error={minValError}
                      inputProps={{ min: 0, max: customOptions.max }}
                      onKeyPress={(data) => {
                        if (data.charCode === 45) {
                          data.preventDefault();
                        }
                      }}
                      defaultValue={customOptions.min}
                      onChange={(e) => {
                        if (e.target.value > customOptions.max) {
                          setMinValueError(true);
                          setMaxValueError(false);
                        } else {
                          setMinValueError(false);
                          setMaxValueError(false);
                        }
                        props.setNumberLimit('min', e.target.value);
                      }
                      }
                    // helperText="Minimum"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <TextField
                      className="pl-1"
                      type="number"
                      variant="outlined"
                      label="Max Limit"
                      fullWidth
                      // style={{marginLeft:"10px"}}
                      inputProps={{ min: 1 }}
                      error={maxValError}
                      onKeyPress={(data) => {
                        if (data.charCode === 45) {
                          data.preventDefault();
                        }
                      }}
                      defaultValue={customOptions.max}
                      onChange={(e) => {
                        if (e.target.value < customOptions.min) {
                          setMaxValueError(true);
                        } else {
                          setMaxValueError(false);
                          setMinValueError(false);
                        }
                        props.setNumberLimit('max', e.target.value);
                      }
                      }
                    // helperText="Maximum"
                    />
                  </Grid>
              </Grid>}
              {!isDisabled && <Grid item xs={12} sm={12} className='my-2'>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="defaultSelect">Type</InputLabel>
                    <Select
                      id="demo-customized-select-outlined"
                      fullWidth
                      value={customOptions.limitType}
                      //input={<BootstrapInput />}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        getContentAnchorEl: null
                      }}
                      label="Type"
                      onChange={(e) => props.editElementCustomOptionsProp('limitType', 'value', e)} >
                      {
                        limitTypeOptions && limitTypeOptions.map((limitOption, index) => {
                          return <MenuItem key={limitOption + index} value={limitOption}>{limitOption}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
              </Grid>}

              </>
              :
              <Grid item xs={12} sm={9} ></Grid>
          }

        </>
      }
    </>
  )
}