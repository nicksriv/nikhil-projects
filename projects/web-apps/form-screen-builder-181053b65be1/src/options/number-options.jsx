import React from 'react';
import { TextField, Grid, Switch, Typography, Checkbox, Button } from '@material-ui/core';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    subHeading: {
        opacity: "0.6",
        fontSize: "16px",
        fontWeight: "normal",
        float: 'left'
    },
    button: {
        height: "28px",
        outline: "none",
        textTransform: "capitalize"
    }
}));
export default function NumberInputOptions(props) {
    const classes = useStyles();
    const customOptions = props.element.customOptions;

    const isDisabled = props.element.customOptions.isFieldDisabled;
    const isNumberLimit = props.element.customOptions.hasOwnProperty("isNumberLimit") ? props.element.customOptions.isNumberLimit : false;
    if (isDisabled) {
        customOptions.isNumberLimit = false;
    }
    if (customOptions.isNumberLimit) {
        customOptions.min = customOptions.min;
        customOptions.max = customOptions.max;
    } else {
        customOptions.min = "";
        customOptions.max = "";
    }

    // const min = props.element.customOptions.hasOwnProperty('min') ? props.element.customOptions.min : 0;
    // const max = props.element.customOptions.hasOwnProperty('max') ? props.element.customOptions.max : 1;


    return (

        <Grid container direction={"row"} xs={12} className="mt-2 mb-2" >
            <Grid item xs={12}>
                <Grid container justifyContent="flex-start" className='mt-3' >
                    <Grid item>
                        {!isDisabled && <h6 className={`${classes.subHeading}`}>Number Options Limit Range: </h6>}</Grid>
                    <Grid item>
                        <>
                            {!isDisabled && <Button
                                variant="outlined"
                                // style={{outline:"none"}}
                                size="small"
                                onClick={(e) => props.setNumberLimit('isNumberLimit', false)}
                                name="no"
                                className={`${classes.button} ml-2 mr-2`}
                            >
                                <span>No</span>
                                <Checkbox
                                    size="small"
                                    className="p-0 ml-1"
                                    color="primary"
                                    name="no"
                                    icon={<CircleUnchecked className="checkboxSize" />}
                                    checked={!isNumberLimit}
                                    checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                />
                            </Button>}
                            {!isDisabled && <Button
                                variant="outlined"
                                //style={{outline:"none"}}
                                size="small"
                                onClick={(e) => props.setNumberLimit('isNumberLimit', true)}
                                name="yes"
                                className={`${classes.button} ml-2 mr-2`}
                            >
                                <span>Yes</span>
                                <Checkbox
                                    size="small"
                                    className="p-0 ml-1"
                                    color="primary"
                                    name="yes"
                                    icon={<CircleUnchecked className="checkboxSize" />}
                                    checked={isNumberLimit}
                                    checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                />
                            </Button>}

                        </>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                {
                    isNumberLimit &&
                    <Grid item xs={12} sm={6}>
                            {!isDisabled && <TextField
                                variant="outlined"
                                type="number"
                                label="Min Limit"
                                defaultValue={customOptions.min}
                                onChange={(e) => props.setNumberLimit('min', e.target.value)}
                                // helperText="Minimum"
                                className="mr-2 mt-3"
                                error={props.element.customOptions.min >= props.element.customOptions.max}
                        />}
                    </Grid>
                }
                {isNumberLimit &&
                    <Grid item xs={12} sm={6}>
                        {!isDisabled && <TextField
                            variant="outlined"
                            type="number"
                            label="Max Limit"
                            defaultValue={customOptions.max}
                            onChange={(e) => props.setNumberLimit('max', e.target.value)}
                            // helperText="Maximum"
                            className="ml-2 mt-3"
                            error={props.element.customOptions.max <= props.element.customOptions.min}
                        />}

                    </Grid>
                }
            </Grid>
        </Grid>
    )
}