import React, { useState } from 'react';;
import { Grid, Button, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import PanToolAlt from "@material-ui/icons/PanToolTwoTone";
import Slider from '@material-ui/core/Slider';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@material-ui/icons/ZoomOutOutlined';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    customBorder: {
        //borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
        //boxShadow: "10px 4px 6px -6px #222"
        // "-webkit-box-shadow": "0 4px 6px -6px #222",
        // "-moz-box-shadow": "0 4px 6px -6px #222",
        // boxShadow: "0 4px 6px -6px #222"

        // "-webkit-box-shadow": "-2px -1px 15px 7px rgba(0,0,0,0.5)",
        // "-moz-box-shadow": "-3px -2px 30px 14px rgba(0,0,0,0.425)",
        // boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)"
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 2px 4px #00000029",
        borderRadius: "3px 3px 0px 0px",
        opacity: 1
    },
    slider: {
        width: 70,
        '& .MuiSlider-thumb': {
            width: "2px",
        },
        '& .MuiSlider-thumb.Mui-disabled': {
            width: "2px",
            height: "10px",
            marginTop: "-4px",
            opacity: 0.38
        },
    },
    sliderEnable: {
        '& .MuiSlider-root': {
            color: "#9e9e9e !important"
        }
    },
    sliderDisable: {
        '& .MuiSlider-root.Mui-disabled .MuiSlider-track': {
            opacity: 0.2
        }
    },
    actvBtn: {
        backgroundColor: "#E5F2F0",
        color: "#2C3E93",
        border: "1px solid #2C3E93",
        padding: "0 0 0 1rem",
        margin: "0 0.5rem",
        height: "2rem",
    },
    inctvBtn: {
        backgroundColor: "#EBD9DC",
        border: "1px solid #B10021",
        padding: "0 0 0 1rem",
        height: "2rem",
        margin: "0 0.5rem",
        color: "#B10021"
    },
    button: {
        padding: "0 0 0 1rem",
        margin: "0 0.5rem",
        height: "2rem",
        backgroundColor: "white"
    },
    statusControl: {
        //marginLeft: "12rem",
        color: "light-gray",
        '& .MuiTypography-body1': {
            fontSize: '1.10rem',
            opacity: '0.2',
            marginLeft: "-9px"
        }
    },
    icon: {
        '& .MuiSvgIcon-root': {
            fontSize: "1.35rem",
            marginTop: "5px"
        }
    },
    opacityPoint4: {
        opacity: 0.4
    },
    opacityPoint3: {
        opacity: 0.3
    },
    opacityPoint1: {
        opacity: 0.1
    },
    opacityPoint2: {
        opacity: 0.2
    },
    rightBorder: {
        borderRight: "1px solid gray",
    }
}));

function V5FormBuilderMasterScreensHeader(props) {
    const {
        panning,
        handlePan,
        zoomIn,
        zoomOut,
        resetTransform,
        status,
        handleStatusChange,
        showPrivilegePreviewPlaceholder
    } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(50);
    const handleSliderChange = (event, newValue) => {
        if (value < 50) {
            setValue(50);
            if (newValue > 50) {
                zoomOut(1);
            } else if (newValue < 50) {
                zoomIn(1);
            }
        } else if (value > 100) {
            setValue(100);
        } else {
            setValue(newValue);
            if (newValue > value) {
                zoomOut(1);
            } else if (newValue < value) {
                zoomIn(1);
            }
        }
    };
    const handleZoomInZoomOut = (e, source) => {
        let newValue;
        if (source === "zoomin") {
            newValue = value - 20;
            if (newValue < 5) {
                newValue = 5;
            } else if (newValue > 100) {
                newValue = 100;
            }
            zoomIn();
            setValue(newValue);
        } else if (source === "zoomout") {
            newValue = value + 20;
            if (newValue < 50) {
                newValue = 50;
            } else if (newValue > 100) {
                newValue = 100;
            }
            zoomOut();
            setValue(newValue);
        }
    }
    return (
        <>
            <Grid container justifyContent="space-between"
                className={`p-2 ${classes.customBorder}`}>
                <Grid item>
                    <FormControlLabel
                        value="status"
                        name="status"
                        label="Status:"
                        labelPlacement="start"
                        size="small"
                        className={classes.statusControl}
                        style={{cursor: "default"}}
                        control={
                            <>
                                {
                                    !showPrivilegePreviewPlaceholder &&
                                    (
                                        <>
                                            <Button variant="outlined" size="small"
                                                onClick={(e) => handleStatusChange("INACTIVE")}
                                                name="status"
                                                className={status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                            >
                                                INACTIVE
                                                <Checkbox
                                                    name="INACTIVE"
                                                    icon={<CircleUnchecked />}
                                                    checked={status === "INACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                />
                                            </Button>

                                            <Button variant="outlined" size="small"
                                                onClick={(e) => handleStatusChange("ACTIVE")}
                                                name="status"
                                                className={status === "ACTIVE" ? classes.actvBtn : classes.button}
                                            >
                                                ACTIVE
                                                <Checkbox color='primary' name="ACTIVE"
                                                    icon={<CircleUnchecked />}
                                                    checked={status === "ACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </Button>
                                        </>
                                    )
                                }
                            </>
                        }
                    />
                </Grid>
                <Grid item>
                    <Grid container spacing={1} className={`${classes.icon}`}>
                        <Grid item>
                            {
                                !showPrivilegePreviewPlaceholder ?
                                    (
                                        panning ? <Tooltip placement="bottom" title="Enable Panning">
                                            <PanToolOutlinedIcon
                                                onClick={handlePan}
                                                className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                                style={{ fontSize: "1.20rem" }}
                                            />
                                        </Tooltip>
                                            :
                                            <Tooltip placement="bottom" title="Disable Panning">
                                                <PanToolAlt
                                                    onClick={handlePan}
                                                    className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                                    style={{ fontSize: "1.20rem" }}
                                                />
                                            </Tooltip>
                                    )
                                    :
                                    (
                                        <PanToolOutlinedIcon
                                            className={`float-right ${classes.opacityPoint2}`}
                                            style={{ fontSize: "1.20rem" }}
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item
                            className={`${classes.rightBorder} ${showPrivilegePreviewPlaceholder ? classes.opacityPoint1 : classes.opacityPoint2}`}
                        >
                        </Grid>
                        <Grid item>
                            {
                                !showPrivilegePreviewPlaceholder ?
                                    (
                                        <ZoomInIcon
                                            onClick={(e) => handleZoomInZoomOut(e, "zoomin")}
                                            //onClick={() => zoomIn()}
                                            className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                            style={{ fontSize: "1.35rem" }}
                                        />
                                    )
                                    : (
                                        <ZoomInIcon
                                            className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                            style={{ fontSize: "1.35rem" }}
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item>
                            {
                                !showPrivilegePreviewPlaceholder ?
                                    (
                                        <Slider className={`${classes.slider}`}
                                            style={{ color: "#9e9e9e" }}
                                            value={typeof value === 'number' ? value : 0}
                                            defaultValue={5}
                                            onChange={(e, newValue) => handleSliderChange(e, newValue)}
                                            aria-labelledby="continuous-slider" />
                                    )
                                    : (
                                        <Slider className={`${classes.slider}`}
                                            track={false}
                                            disabled
                                            defaultValue={50}
                                            aria-labelledby="continuous-slider" />
                                    )
                            }

                        </Grid>
                        <Grid item>
                            {
                                !showPrivilegePreviewPlaceholder ?
                                    (
                                        <ZoomOutIcon
                                            onClick={(e) => handleZoomInZoomOut(e, "zoomout")}
                                            //onClick={() => zoomOut()}
                                            className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                            style={{ fontSize: "1.35rem" }}
                                        />
                                    )
                                    : (
                                        <ZoomOutIcon

                                            className={`float-right ${showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4}`}
                                            style={{ fontSize: "1.35rem" }}
                                        />
                                    )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default V5FormBuilderMasterScreensHeader;
