import React, { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slider from '@material-ui/core/Slider';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { useDispatch, useSelector } from 'react-redux';
import FormHeadingPopup from './FormHeadingPopup';
import { config } from 'helper/config';
import { setStateByName } from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice';

// const { isProd } = config;

const useStyles = makeStyles(({ palette, ...theme }) => ({
    logoClient: {
        // objectFit: "contain",
        width: "auto",
        height: "24px",
        marginLeft: "0.4rem"
    },
    arrowIcon: {
        color: "#bbb",
        fontSize: "1.3rem"
    },
    editIcon: {
        color: "#9F9F9E",
        cursor: "pointer",
        "&:hover": {
            color: "#000",
        },
    },
    stickyHeader: {
        top: "0px",
        position: "sticky",
        //paddingTop: "15px",
        zIndex: 600,
        marginTop: 0,
        backgroundColor: "white"
    },
    customBorder: {
        borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
        //boxShadow: "10px 4px 6px -6px #222"
        // "-webkit-box-shadow": "0 4px 6px -6px #222",
        // "-moz-box-shadow": "0 4px 6px -6px #222",
        // boxShadow: "0 4px 6px -6px #222"

        // "-webkit-box-shadow": "-2px -1px 15px 7px rgba(0,0,0,0.5)",
        // "-moz-box-shadow": "-3px -2px 30px 14px rgba(0,0,0,0.425)",
        // boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)"
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
        '& .MuiSlider-track': {
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
            fontSize: "1.25rem",
            marginTop: "5px"
        }
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

const FormBuilderHeader = (props) => {
    const {
        pageMode,
        screenTitle
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [formHeading, setFormHeading] = useState("");
    const [inputValue, setInputValue] = useState("Check-In");
    const [status, setStatus] = useState("ACTIVE");
    // const handleStatusChange = (status) => {
    //     setStatus(status);
    // }
    const { clientLogoForHeader } = useSelector((state) => state.clients)
    const { clientIdForUsers, clientIdForUserLogo } = useSelector(
        (state) => state.users
    );
    const handlePopUp = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        setInputValue(formHeading);
    }
    const handlePopUpClose = (isClosed) => {
        if (isClosed) {
            setOpen(false);
        }
    }
    const handleTitleText = (e) => {
        const { value } = e.target;
        setInputValue(value);
    }
    const handleSave = (e) => {
        e.preventDefault();
        setFormHeading(inputValue);
        setOpen(false);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenName',
                value: inputValue
            },
        });
        dispatch({
            type: 'getClientModulesAction',
            payload: {
                clientId: clientIdForUsers,
                id: clientIdForUserLogo
            }
        });
    }
    useEffect(() => {
        if (pageMode === "editmasterscreen") {
            setFormHeading(screenTitle);
        }
    }, [screenTitle]);
    return (
        <div className={classes.stickyHeader}>
            <Grid container justifyContent="space-between" className={`p-2 ${classes.customBorder}`}>
                <Grid item >
                    <span color="#ffffff" style={{
                        marginRight: '10px',
                        marginLeft: '6px',
                        fontSize: '1.10rem',
                        opacity: '0.2',
                        display: "inline"
                    }}>Status:</span>
                </Grid>
                <Grid item>
                    <Grid container spacing={1} className={`${classes.icon}`}>
                        <Grid item>
                            <PanToolOutlinedIcon
                                className={`float-right ${classes.opacityPoint2}`}
                                style={{ fontSize: "1.20rem" }}
                            />
                        </Grid>
                        <Grid item
                            className={`${classes.rightBorder} ${classes.opacityPoint1}`}
                        >
                        </Grid>
                        <Grid item>
                            <ZoomInIcon
                                className={`float-right ${classes.opacityPoint2}`}
                                style={{ fontSize: "1.35rem" }}
                            />
                        </Grid>
                        <Grid item>
                            <Slider
                                track={false}
                                disabled
                                className={classes.slider}
                                defaultValue={50}
                                aria-labelledby="continuous-slider" />
                        </Grid>
                        <Grid item>
                            <ZoomOutIcon
                                className={`float-right ${classes.opacityPoint2}`}
                                style={{ fontSize: "1.35rem" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between" className={`p-2`}>
                <Grid item >
                    <MenuIcon color="#ffffff"
                        style={{ marginRight: '10px', opacity: '0.3', display: "inline" }}
                    />
                    {clientLogoForHeader &&
                        <img className={classes.logoClient} src={clientLogoForHeader} alt="Logo" />
                    }
                </Grid>
                {/* <Grid item>
                    <span style={{ color: "#0000001F", fontWeight: "400" }}>
                        Main header: Non-editable
                    </span>
                </Grid> */}
                <Grid item>
                    <PermIdentityIcon
                        className="float-right"
                        style={{ opacity: '0.3' }}
                    />
                    <NotificationsNoneOutlinedIcon
                        className="float-right"
                        style={{ marginRight: '20px', opacity: '0.3' }}
                    />
                </Grid>
            </Grid>
            {/* <hr style={{ marginLeft: "-10px", marginRight: "-10px", marginTop: "0px", marginBottom: '0px' }} /> */}
            <Grid className="flex items-center pl-2" style={{ backgroundColor: "#FAFAFA" }}>
                <ArrowBackIcon className={`mr-3 ${classes.arrowIcon}`} />
                <h4 className="mt-3 mr-3 font-normal">{formHeading ? formHeading : "Page Title "}<span className='text-error text-18'>*</span></h4>
                <EditIcon className={`mr-5 ${classes.editIcon}`} onClick={handlePopUp} />
            </Grid>
            <FormHeadingPopup
                open={open}
                charecterLimit={24}
                isRequired={false}
                popupHeading="Edit Page Title"
                inputLabel="Page Title"
                inputValue={inputValue}
                inputName={""}
                handlePopUpClose={handlePopUpClose}
                handleTitleText={handleTitleText}
                handleSave={handleSave}
            />
        </div>
    );
}

export default FormBuilderHeader;