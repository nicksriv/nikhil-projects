import { Button, Checkbox, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import { useDispatch, useSelector } from 'react-redux';


function ColorSelector() {

    const useStyles = makeStyles((theme) => ({
        root: {
            "&:hover": {
                backgroundColor: "transparent",
            },
        },
        colorContainer: {
            backgroundColor: "#FEFFFE",
            height: "95%",
        },
        checkBtn: {
            height: "1.7rem",
            paddingRight: "0rem",
            paddingLeft: "0.8rem",
            whiteSpace: "nowrap",
            width: "100%",
            justifyContent: "space-between",
            fontWeight: "400",

        },
        checkIcon: {
            fontSize: "1.2rem"
        },
        greenBtn: {
            backgroundColor: "#ECF8F8",
            color: "#50BEB6",
            border: "1px solid #50BEB6"
        },
        redBtn: {
            backgroundColor: "#F9E8E9",
            color: "#B61C1D",
            border: "1px solid #B61C1D"

        },
        blueBtn: {
            backgroundColor: "#E1E4EE",
            color: "#2B4EBC",
            border: "1px solid #2B4EBC"
        },
        purpleBtn: {
            backgroundColor: "#F5E8F6",
            color: "#9C26B1",
            border: "1px solid #9C26B1"
        },
        greyBtn: {
            backgroundColor: "#E9E8E9",
            color: "grey",
            border: "1px solid grey"
        },
        whiteBtn: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid black"
        },
        lightGreyBtn: {
            backgroundColor: "#F5F4F5",
            color: "lightgrey",
            border: "1px solid lightgrey"
        },
        lightBlueBtn: {
            backgroundColor: "#E5FBF9",
            color: "#20DECC",
            border: "1px solid #20DECC"
        },
        peachBtn: {
            backgroundColor: "#FBF2EB",
            color: "#F9AD5E",
            border: "1px solid #F9AD5E"
        }
    }));

    const classes = useStyles();
    const { primaryColors, menuColors, textStyles, selectedPrimaryColor, selectedMenuColor, selectedFontStyle } = useSelector((state) => state.theme);
    // const [primaryColor, setPrimaryColor] = useState('');
    // const [menuColor, setMenuColor] = useState('');
    const [fontStyle ] = useState('');
    const dispatch = useDispatch();

    const selectPrimaryColor = (colorValue) => {
        dispatch({
            type: "setPrimaryColorAction",
            payload: colorValue
        })
    }

    const selectMenuColor = (colorValue) => {
        dispatch({
            type: "setMenuColorAction",
            payload: colorValue
        })
    }

    const selectFont = (font) => {
        dispatch({
            type: "setFontStyleAction",
            payload: font
        })
    }



    return (
        <Grid container className={`${classes.colorContainer}`} >
            <Grid className="p-10">
                <h5 className='mb-5'>Select Primary Color</h5>
                <Grid lg={12} container spacing={2}>
                    {primaryColors.map((color) => {
                        return <Grid item lg={6}>
                            <Button variant="outlined" size="small" onClick={() => selectPrimaryColor(color.value)} className={`${classes.checkBtn} mr-5 
                         ${color.name === "SEA GREEN" && classes.greenBtn} 
                         ${color.name === "RED" && classes.redBtn}
                         ${color.name === "BLUE" && classes.blueBtn}
                         ${color.name === "PURPLE" && classes.purpleBtn}
                         ${color.name === "GREY" && classes.greyBtn} 
                         `}>
                                {color.name}
                                <Checkbox
                                    name="color"
                                    classes={{ root: classes.root }}
                                    icon={<CircleUnchecked style={{ color: `${color.value}` }} className={`${classes.checkIcon}`} />}
                                    checked={selectedPrimaryColor === color.value ? true : false}
                                    checkedIcon={<CircleCheckedFilled style={{ color: `${color.value}` }} className={`${classes.checkIcon}`} />}
                                />
                            </Button>
                        </Grid>
                    })}
                    <Grid item lg={12} className="">
                        <label for="html" className='mr-5'>Custom Color </label>
                        <input type="color" className='cursor-pointer' id="favcolor" name="favcolor" placeholder='custom' onChange={(e) => selectPrimaryColor(e.target.value)}></input>
                    </Grid>
                </Grid>
                <Grid className="mt-12">
                    <h5 className='mb-5'>Select Menu Color</h5>
                    <Grid lg={12} container spacing={2}>

                        {menuColors.map((color) => {
                            return <Grid item lg={6}> <Button variant="outlined" size="small" onClick={() => selectMenuColor(color.themeValue)} className={`${classes.checkBtn} mr-3
                        ${color.name === "PEACH" && classes.peachBtn}
                        ${color.name === "LIGHT GREY" && classes.lightGreyBtn}
                        ${color.name === "LIGHT BLUE" && classes.lightBlueBtn}
                        ${color.name === "WHITE" && classes.whiteBtn}
                        ${color.name === "DARK GREY" && classes.greyBtn}
                        
                        `}>
                                {color.name}
                                <Checkbox
                                    classes={{ root: classes.root }}
                                    name="color"
                                    icon={<CircleUnchecked style={{ color: `${color.BtnColorValue}` }} className={`${classes.checkIcon}`} />}
                                    checked={selectedMenuColor === color.themeValue ? true : false}
                                    checkedIcon={<CircleCheckedFilled style={{ color: `${color.BtnColorValue}` }} className={`${classes.checkIcon}`} />}
                                />
                            </Button>
                            </Grid>
                        })}
                        <Grid item lg={12}>
                            <label for="html" className='mr-5'>Custom Color </label>
                            <input type="color" className='cursor-pointer' id="favcolor" name="favcolor" placeholder='custom' onChange={(e) => selectMenuColor(e.target.value)}></input>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="mt-12">
                    <h5 className='mb-5'>Select Font</h5>
                    <Grid lg={12} container spacing={2}>
                        {textStyles.map((color) => {
                            return <Grid item lg={6}> <Button variant="outlined" size="small" onClick={() => selectFont(color.fontValue)} className={`${classes.checkBtn} mr-3 ${fontStyle === color.fontValue || selectedFontStyle === color.fontValue ? classes.greenBtn : ''}`}>
                                {color.name}
                                <Checkbox
                                    classes={{ root: classes.root }}
                                    name="color"
                                    icon={<CircleUnchecked style={{ color: "gray" }} className={`${classes.checkIcon}`} />}
                                    checked={selectedFontStyle === color.fontValue ? true : false}
                                    checkedIcon={<CircleCheckedFilled style={{ color: `${color.value}` }} className={`${classes.checkIcon}`} />}
                                />
                            </Button>
                            </Grid>
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </ Grid>
    )
}

export default ColorSelector