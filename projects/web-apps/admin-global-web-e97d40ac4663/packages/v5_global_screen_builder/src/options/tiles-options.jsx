import React, { useState } from 'react';
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

// const theme = createMuiTheme({
//     overrides: {
//         MuiFormControlLabel: {
//             label: {
//                 fontSize: '0.875rem',
//             }
//         }
//     }
// });
const characterLimitHelperTheme = createMuiTheme({
    overrides: {
        MuiFormHelperText: {
            root: {
                marginRight: 0,
                textAlign: 'right'
            }
        }
    }
});
const useStyles = makeStyles((theme) => ({
    tooltip:{
        fontFamily:"SF Pro",
        fontSize:"12px"
    },
    icon:{
        color:"#666666",
        "&:hover": {
            color:"#2C3E93"
        }
    },
    disabledMode: {
        backgroundColor: "#d4d4d4 !important",
    }
}))

const RulesEnum = {
    STATIC: "static",
    DYNAMIC: "dynamic",
    INTERLINKED: "interlinked"
}

function TilesOptions(props) {
    const {
        inputFieldSize,
        customOptions,
        handleTilesOptions,
        addTilesOptions,
        removeTilesOptions
    } = props;

    const InfoIconTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .MuiTooltip-tooltip`]: {
            maxWidth: 200,
            fontSize: '0.75rem',
            textAlign: 'left'
        },
    }));
    const [value, setValue] = React.useState(30);
    const handleSliderChange = (event, newValue, elemProperty, index) => {
        //setValue(newValue);
        handleTilesOptions(elemProperty, index, { target: { value: newValue } });
    };
    // const handleInputChange = (elemProperty, index, event) => {
    //     setValue(event.target.value === '' ? '' : Number(event.target.value));
    // };

    const handleBlur = (elemProperty, index) => {
        const value = customOptions.tileProperties[index].text;
        if (value < 0) {
            //setValue(0);
            handleTilesOptions(elemProperty, index, { target: { value: 0 } });
        } else if (value > 100) {
            //setValue(100);
            handleTilesOptions(elemProperty, index, { target: { value: 100 } });
        }
    };
    const handleOnKeyDown = (event) => {
        if (event.keyCode === 8 || event.keyCode === 46) {
        } else if (isNaN(Number(event.key))) {
            event.preventDefault();
        }
    }
    const classes = useStyles();
    return (
        <>
            {
                customOptions.tileProperties.map((option, index) => {
                    const this_key = `tiles_${option.key}`;
                    return (
                        <React.Fragment key={this_key}>
                            <Grid item xs={12} className='pt-2 pb-3' style={{ borderBottom: "1px solid #bebebe" }}>
                                <div style={{ backgroundColor: "#f0f0f0", padding: "15px" }}>
                                    <Grid item xs={12} className='pb-4 flex'>
                                        <TextField
                                            disabled
                                            size="small"
                                            variant="outlined"
                                            id="tilesId"
                                            label={"Tile's ID"}
                                            value={customOptions.tileProperties[index].ID}
                                            onChange={(e) => handleTilesOptions('title', index, e)}
                                        />
                                        <IconButton style={{padding:'6px'}} aria-label="add">
                                            <AddIcon
                                                //style={{ marginLeft: "10px" }}
                                                onClick={(e) => addTilesOptions(index, e)} />
                                            {index > 0 && <RemoveIcon
                                                //style={{ marginLeft: "10px" }}
                                                onClick={(e) => removeTilesOptions(index, e)} />}
                                        </IconButton>
                                        {/* {index > 0 &&
                                            <IconButton style={{padding:'6px'}} aria-label="remove">
                                                <RemoveIcon
                                                    //style={{ marginLeft: "10px" }}
                                                    onClick={(e) => removeTilesOptions(index, e)} />
                                            </IconButton>
                                        } */}
                                    </Grid>
                                    <Grid item xs={12} className='pb-4'>
                                        <ThemeProvider theme={characterLimitHelperTheme}>
                                            <TextField
                                                required
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                id="outlined-basic"
                                                label={"Title"}
                                                value={customOptions.tileProperties[index].title}
                                                FormHelperTextProps={{
                                                    className: { marginLeft: "75%" }
                                                }}
                                                inputProps={{
                                                    maxlength: customOptions.charecterLimit
                                                }}
                                                onChange={(e) => handleTilesOptions('title', index, e)}
                                                InputLabelProps={{
                                                    classes: {
                                                        asterisk: `text-error`,
                                                    }
                                                }}
                                                helperText={`${customOptions.tileProperties[index].title.length} / ${customOptions.charecterLimit}`}
                                            />
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item xs={12} className='pb-4'>
                                        <TextField
                                            fullWidth
                                            id="rule"
                                            select
                                            name="rule"
                                            label="Select Rule"
                                            type="text"
                                            variant="outlined"
                                            value={customOptions.tileProperties[index].rule}
                                            onChange={(e) => handleTilesOptions('rule', index, e)}
                                        >
                                            <MenuItem value={RulesEnum.STATIC}>Make it Static</MenuItem>
                                            {/* <MenuItem disabled value={RulesEnum.DYNAMIC}>Make it Dynamic</MenuItem> */}
                                            {index > 0 && customOptions.tileProperties.filter(e => e.textRule === "number").length > 0 && < MenuItem value={RulesEnum.INTERLINKED}>Interlinked tiles component</MenuItem>}
                                        </TextField>
                                    </Grid>
                                    {
                                        customOptions.tileProperties[index].rule === RulesEnum.STATIC &&
                                        (
                                            <Grid item xs={12} className='pb-4'>
                                                <TextField
                                                    fullWidth
                                                    id="textRule"
                                                    select
                                                    name="textRule"
                                                    label="Text Attribute"
                                                    type="text"
                                                    variant="outlined"
                                                    value={customOptions.tileProperties[index].textRule}
                                                    onChange={(e) => handleTilesOptions('textRule', index, e)}
                                                >
                                                    <MenuItem value="text">Short Text</MenuItem>
                                                    <MenuItem value="number">Number</MenuItem>
                                                </TextField>
                                            </Grid>
                                        )
                                    }
                                    {
                                        customOptions.tileProperties[index].rule === RulesEnum.STATIC
                                        && customOptions.tileProperties[index].textRule === "text" &&
                                        (
                                            <Grid item xs={12} className='pb-4'>
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    id="shortTextValue"
                                                    name="shortTextValue"
                                                    label="Text"
                                                    value={customOptions.tileProperties[index].text}
                                                    type={"text"}
                                                    fullWidth
                                                    onChange={(e) => handleTilesOptions('text', index, e)}
                                                />
                                            </Grid>
                                        )
                                    }
                                    {
                                        customOptions.tileProperties[index].rule === RulesEnum.STATIC
                                        && customOptions.tileProperties[index].textRule === "number" &&
                                        (
                                            <Grid item xs={12} className='pb-4'>
                                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                    <h6 style={{ marginRight: "10px", color: "#bababa" }}>Number Value:</h6>
                                                    <Slider
                                                        id="numberTextValue"
                                                        name="numberTextValue"
                                                        value={customOptions.tileProperties[index].text}
                                                        onChange={(e, newValue) => handleSliderChange(e, newValue, 'text', index)}
                                                        style={{ marginRight: "10px", width: "132px" }}
                                                        aria-labelledby="input-slider"
                                                    />
                                                    <TextField
                                                        value={customOptions.tileProperties[index].text}
                                                        size="small"
                                                        variant="outlined"
                                                        type="number"
                                                        onKeyDown={(e) => handleOnKeyDown(e)}
                                                        onChange={(e) => handleTilesOptions('text', index, e)}
                                                        onBlur={(e) => handleBlur('text', index)}
                                                        InputProps={{
                                                            inputProps: {
                                                                step: 10,
                                                                min: 0,
                                                                max: 100,
                                                                type: 'number',
                                                                'aria-labelledby': 'input-slider',
                                                            }
                                                        }}
                                                        style={{ width: "70px" }}
                                                    />
                                                </div>
                                            </Grid>
                                        )
                                    }
                                    {/* {
                                        customOptions.tileProperties[index].rule === RulesEnum.DYNAMIC &&
                                        (
                                            <Grid item xs={12}>
                                                <FormGroup>
                                                    <label className="control-label" htmlFor="defaultSelectComponent">Select Component</label>
                                                    <select id="defaultSelectComponent"
                                                        value={customOptions.tileProperties[index].component}
                                                        className="form-control"
                                                        onChange={(e) => handleTilesOptions('component', index, e)}
                                                    >
                                                        <option value="">--Select Component--</option>
                                                        {
                                                            customOptions.tileProperties.map((p, i) => (
                                                                <option value={p.ID}>{p.ID}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </FormGroup>
                                                <p
                                                    style={{ textAlign: "unset" }}
                                                    class="MuiFormHelperText-root MuiFormHelperText-contained MuiFormHelperText-filled MuiFormHelperText-marginDense">
                                                    Select Component from Screen to make it dynamic.
                                                </p>
                                            </Grid>
                                        )
                                    } */}
                                    {
                                        customOptions.tileProperties[index].rule === RulesEnum.INTERLINKED &&
                                        (
                                            <>
                                                <Grid item xs={12} className='pb-4'>
                                                    <TextField
                                                        fullWidth
                                                        id="componentOnScreenSource"
                                                        select
                                                        name="componentOnScreenSource"
                                                        label="Select Component On Screen"
                                                        type="text"
                                                        variant="outlined"
                                                        value={customOptions.tileProperties[index].componentOnScreenSource}
                                                        onChange={(e) => handleTilesOptions('componentOnScreenSource', index, e)}
                                                    >
                                                        {
                                                            customOptions.tileProperties.map((p, i) => (
                                                                p.textRule === "number" && <MenuItem value={p.ID}>{p.ID}</MenuItem> 

                                                            ))
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} style={{
                                                    display: "flex",
                                                    justifyContent: "space-around"
                                                }} className='pb-4'>
                                                    <div>
                                                        <Button
                                                            className={!customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode}
                                                            disabled={!customOptions.tileProperties[index].componentOnScreenTarget ? true : false}
                                                            variant={`${customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "contained" : "outlined"}`}
                                                            size="small"
                                                            color={`${customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "primary" : "default"}`}
                                                            onClick={(e) => handleTilesOptions('componentOnScreenMethod', index, 'add')}
                                                            style={{ minWidth: "30px", marginRight: "10px" }}>
                                                            <AddIcon style={{
                                                                color: `${customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "#fff" : "#9e9e9e"}`,
                                                                fontSize: "1.3rem"
                                                            }} />
                                                        </Button>
                                                        <Button
                                                            className={!customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode}
                                                            disabled={!customOptions.tileProperties[index].componentOnScreenTarget ? true : false}
                                                            variant={`${customOptions.tileProperties[index].componentOnScreenMethod == "sub" ? "contained" : "outlined"}`}
                                                            size="small"
                                                            color={`${customOptions.tileProperties[index].componentOnScreenMethod === "sub" ? "primary" : "default"}`}
                                                            onClick={(e) => handleTilesOptions('componentOnScreenMethod', index, 'sub')}
                                                            style={{ minWidth: "30px", marginRight: "10px" }}>
                                                            <RemoveIcon style={{
                                                                color: `${customOptions.tileProperties[index].componentOnScreenMethod == "sub" ? "#fff" : "#9e9e9e"}`,
                                                                fontSize: "1.3rem"
                                                            }} />
                                                        </Button>
                                                        <Button
                                                            className={!customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode}
                                                            disabled={!customOptions.tileProperties[index].componentOnScreenTarget ? true : false}
                                                            variant={`${customOptions.tileProperties[index].componentOnScreenMethod == "mult" ? "contained" : "outlined"}`}
                                                            size="small"
                                                            color={`${customOptions.tileProperties[index].componentOnScreenMethod === "mult" ? "primary" : "default"}`}
                                                            onClick={(e) => handleTilesOptions('componentOnScreenMethod', index, 'mult')}
                                                            style={{ minWidth: "30px", marginRight: "10px" }}>
                                                            <CloseIcon style={{
                                                                color: `${customOptions.tileProperties[index].componentOnScreenMethod == "mult" ? "#fff" : "#9e9e9e"}`,
                                                                fontSize: "1.3rem"
                                                            }} />
                                                        </Button>
                                                        <Button
                                                            className={!customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode}
                                                            disabled={!customOptions.tileProperties[index].componentOnScreenTarget ? true : false}
                                                            variant={`${customOptions.tileProperties[index].componentOnScreenMethod == "div" ? "contained" : "outlined"}`}
                                                            size="small"
                                                            color={`${customOptions.tileProperties[index].componentOnScreenMethod === "div" ? "primary" : "default"}`}
                                                            onClick={(e) => handleTilesOptions('componentOnScreenMethod', index, 'div')}
                                                            style={{ minWidth: "30px" }}>
                                                            <span style={{ fontSize: "0.8rem" }}>/</span>
                                                        </Button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} className='pb-4'>
                                                    <TextField
                                                        fullWidth
                                                        id="componentOnScreenTarget"
                                                        select
                                                        name="componentOnScreenTarget"
                                                        label="Select Component On Screen"
                                                        type="text"
                                                        variant="outlined"
                                                        value={customOptions.tileProperties[index].componentOnScreenTarget}
                                                        onChange={(e) => handleTilesOptions('componentOnScreenTarget', index, e)}
                                                    >
                                                        {
                                                            customOptions.tileProperties.map((p, i) => (
                                                                p.textRule === "number" && <MenuItem value={p.ID}>{p.ID}</MenuItem>
                                                            ))
                                                        }
                                                    </TextField>
                                                </Grid>
                                            </>
                                        )
                                    }
                                    <Grid item xs={12} className='pb-4'>
                                        <TextField
                                            fullWidth
                                            id="tilesColor"
                                            select
                                            name="tilesColor"
                                            label="Tile's Color"
                                            type="text"
                                            variant="outlined"
                                            value={customOptions.tileProperties[index].tilesColor}
                                            onChange={(e) => handleTilesOptions('tilesColor', index, e)}
                                            helperText={"The theme color of your selected button. You can select from given options."}
                                        >
                                            <MenuItem value="custom">Custom</MenuItem>
                                            <MenuItem value="white">White</MenuItem>
                                            <MenuItem value="red">Red</MenuItem>
                                            <MenuItem value="blue">Blue</MenuItem>
                                        </TextField>
                                    </Grid>
                                    {
                                        customOptions.tileProperties[index].tilesColor === "custom" &&
                                        (
                                            <Grid item xs={12}>
                                                <label for="favcolor">Select your favorite color:</label>
                                                <input type="color" id="favcolor" name="favcolor"
                                                    value={customOptions.tileProperties[index].tilesRandomColor}
                                                    onChange={(e) => handleTilesOptions('tilesRandomColor', index, e)}></input>
                                            </Grid>
                                        )
                                    }
                                    {/* <Grid item xs={12} sm={12} className="element-options-border-grid  p-1">
                                        <ThemeProvider theme={theme}>
                                            <FormControl component="fieldset">
                                                <Grid container justifyContent="flex-start" alignItems="center" >
                                                    <Grid item className="mr-2">
                                                        <FormLabel component="legend">Action:</FormLabel></Grid>
                                                    <Grid item>
                                                        <FormGroup row aria-label="material" name="material"
                                                            value={customOptions.tileProperties[index].action}
                                                            onChange={(e) => handleTilesOptions('action', index, e)}
                                                        >
                                                            <FormControlLabel value="edit" control={<Checkbox color="primary" />} label="Edit" />
                                                            <FormControlLabel value="delete" control={<Checkbox color="primary" />} label="Delete" />
                                                        </FormGroup>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                        </ThemeProvider>
                                    </Grid> */}
                                </div>
                            </Grid>
                        </React.Fragment>
                    )
                })
            }
            <Grid item xs={12} className='pt-7 pb-4'>
                <TextField
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="Columns"
                    value={customOptions.columns}
                    type="number"
                    disabled
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <InfoIconTooltip
                                title={"This changes the orientation of your tiles from a single row (setting `0`) to columns. A setting of `1` arranges the tiles vertically into one column while a setting of `2` divides the tiles equally into two columns."}
                                placement="top-start"
                                //fontSize="small"
                                className={classes.tooltip}>
                                <InfoIcon className={classes.icon}/>
                            </InfoIconTooltip>
                        </InputAdornment>,
                    }}
                    fullWidth
                    onChange={(e) => handleTilesOptions('columns', 0, e)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="Spacing"
                    value={customOptions.spacing}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <InfoIconTooltip
                                title={"The theme color of your selected button. You can select from given options."}
                                placement="top-start"
                                //fontSize="small"
                                className={classes.tooltip}>
                                <InfoIcon className={classes.icon} />
                            </InfoIconTooltip>
                        </InputAdornment>,
                    }}
                    fullWidth
                    onChange={(e) => handleTilesOptions('spacing', 0, e)}
                />
            </Grid>
        </>
    )
}

export default TilesOptions;
