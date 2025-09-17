import React from 'react';
import { Switch, FormControlLabel, FormGroup, Button, Checkbox, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
    subHeading:{
        opacity:"0.6",
        fontSize:"16px",
        display:"inline",
        fontWeight:"normal"
    },
    button:{
        height:"28px",
        // outline:"none",
        // textTransform:"capatalize"
    }
}));

export default function PhoneOptions(props){
    const classes = useStyles();
    return(
        <Grid container spacing={1}>
            <Grid item className='mb-2 mt-4'>
            <h6 className={classes.subHeading} >Country Code: </h6>
            <FormControlLabel
                className={`p-0 m-0`}
                size="small"
                control={
                <>
                    <Button 
                          variant="outlined"
                          className={classes.button} 
                          style={{outline:"none", textTransform:"capitalize"}}
                          size="small"
                          onClick={(e)=> props.editElementCustomOptionsProp('countryCode', false, e)}
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
                            checked={props.c_code ? false : true}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                          <Button 
                          variant="outlined"
                          className={classes.button} 
                          style={{outline:"none", textTransform:"capitalize"}}
                          size="small"
                          onClick={(e)=> props.editElementCustomOptionsProp('countryCode', true , e)}
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
                            checked={props.c_code ? true : false}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                </>
                }
            />
            </Grid>
            {/* <Grid item className='my-2'>
            <h6 className={classes.subHeading} >Input Mask: </h6>
            <FormControlLabel
                className={`p-0 m-0`}
                size="small"
                control={
                <>
                    <Button 
                          variant="outlined"
                          className={classes.button} 
                          style={{outline:"none",textTransform:"capitalize"}}
                          size="small"
                          onClick={(e)=> props.editElementCustomOptionsProp('isMasked', false , e)} 
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
                            checked={props.this_mask ? false : true}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                          <Button 
                          variant="outlined"
                          className={classes.button} 
                          style={{outline:"none",textTransform:"capitalize"}}
                          size="small"
                          onClick={(e)=> props.editElementCustomOptionsProp('isMasked', true , e)} 
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
                            checked={props.this_mask ? true : false}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                </>
            }
            />
            </Grid> */}
        </Grid>
    )
}
