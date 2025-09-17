import React, { useState, useEffect } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import { capitalize } from 'helper/utils';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import EditIcon from '@material-ui/icons/Edit';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Icon, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import history from 'helper/history.js';
import { useSelector, useDispatch } from 'react-redux';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import AddSiteManagerPopUp from './components/SiteOnBoard/AddSiteManagerPopup';
import WithManager from './components/WithManager';
import DisabledView from 'app/components/EmptyView/DisabledView';
import V5GlobalFooterButtons from 'app/components/V5GlobalFooterButtons/V5GlobalFooterButtons.jsx'
import Geocode from "react-geocode";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import queryString from 'query-string';
import { compose, withProps } from "recompose";
import { ConfirmationDialog } from 'app/components';

function SiteOnboard() {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& .MuiFormControlLabel-label": {
                color: "#000000BC" // or black
            },
            "& .MuiChip-label": {
                color: "#00000061"
            },
            "& .MuiChip-outlined": {
                backgroundColor: "white",
                height: "1.8rem"
            }
        },
        stickyHeader: {
            position: "sticky",
            top: "0rem",
            backgroundColor: "#f5f5f5",
            zIndex: "100",
            width: "100%",
            paddingTop: "1rem"
        },
        stickyFooter: {
            position: "sticky",
            bottom: "0px",
            height: "5rem",
            backgroundColor: "#f5f5f5",
            zIndex: "100",
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
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
        textBox: {
            width: "37rem"
        },
        statusControl: {
            color: "light-gray",
            marginLeft: "0.1rem !important"
        },
        helperText: {
            textAlign: "right"
        },
        solidBtn: {
            backgroundColor: "#2A4FBC",
            color: "white"
        },
        solidBtnDisabled: {
            backgroundColor: "#E0E1E1 !important",
            color: "gray !important"
        },
        outlinedBtn: {
            height: "2rem"
        },
        iconColor: {
            color: "#636365"
        },
        locationBtn: {
            marginTop: '15px',
            backgroundColor: "transparent",
            border: "1px solid #2C3E93",
            color: "#2C3E93",
            fontWeight: "500",
            float: "right"
        }
    }));

    const [pageMode, setPageMode] = useState("");
    // const [siteName, setSiteName] = useState("");
    // const [description, setDescription] = useState("");
    const [disabled] = useState(true);
    const [showDeletePopup, setshowDeletePopup] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [mapView, setMapView] = useState(false);
    const [address, setAddress] = useState("");
    const [siteManagerAddOpen, setSiteManagerAddOpen] = useState(false);
    // const [managerData, setManagerData] = useState(false);
    const { managers, siteDetails, states, cities, errorState } = useSelector((state) => state.sites);
    const { clientIdForUsers } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        const parsedQS = queryString.parse(window.location.search);
        const { pathname } = window.location;
        const currentMode = pathname.replace("/site/", "");
        setPageMode(pathname.replace("/site/", "") && pathname.replace("/site/", "").trim());
        if (currentMode === "add") {
            dispatch({
                type: "setSiteFormDetailsAction",
                payload: {
                    name: "status",
                    value: "ACTIVE",
                }
            })
        }
        if (parsedQS && parsedQS.id) {
            dispatch({
                type: "getIndividualDetailsAction",
                payload: {
                    id: parsedQS.id
                }
            })
        }
        if (currentMode === "edit" || currentMode === "view") {
            setLatitude(siteDetails.latitude);
            setLongitude(siteDetails.longitude);
            setMapView(true)
            getLatLong()
        }
    }, []);

    // useEffect(() => {
    //     dispatch({ type: 'getStatesCitiesMasterAction' });
    // }, [dispatch]);

    useEffect(() => {
        dispatch({ type: 'getStatesDataAction' });
    }, [dispatch]);

    useEffect(() => {
        dispatch({ 
            type: 'getCitiesByStateDataAction',
            payload: siteDetails.state   
        });
    }, [siteDetails.state]);

    const handleBack = () => {
        history.push('/site-management');
    }
    const handleCancel = () => {
        setshowDeletePopup(true);
    }
    const confirmDelete = () => {
        history.push('/site-management')
    }
    //....VALIDATE SITE BASIC DETAILS INPUT VALUES
    function validateSiteDetailsInput(fieldName, fieldValue) {
        let isValid = false;
        const regexOnlyAlphabetsWithSpaces = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
        const onlyNumbersRegex = /^[0-9\b]+$/;
        const alphanumericWithSC = /^[A-Za-z0-9\s-,#]+$/;
        // const alphaNumericRegx = /^[a-z0-9]+$/gi;

        switch (fieldName) {
            case 'name':
                //..Allow Alphabets only along with spaces
                if (
                    fieldValue === '' ||
                    fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
                ) {
                    isValid = true;
                }
                break;
            case 'address':
                //..Alphanumeric with special characters such as hyphen, comma, space, #
                if (
                    fieldValue === '' ||
                    fieldValue.trim().match(alphanumericWithSC)
                ) {
                    isValid = true;
                }
                break;
            case 'area':
                //..Allow Alphabets only
                if (
                    fieldValue === '' ||
                    fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
                ) {
                    isValid = true;
                }
                break;
            case 'pin':
            case 'phone':
                //..Allow Numeric only
                if (fieldValue === '' || fieldValue.trim().match(onlyNumbersRegex)) {
                    isValid = true;
                }
                break;
            default:
                isValid = true;
                break;
        }
        return isValid;
    }
    const handleInputChange = (e, status) => {
        const { name, value } = e.target;
        if (!validateSiteDetailsInput(name, value)) {
            return;
        } else {

            if (status) {
                dispatch({
                    type: "setSiteFormDetailsAction",
                    payload: {
                        name: "status",
                        value: status,
                    }
                })
            } else {
                dispatch({
                    type: "setSiteFormDetailsAction",
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        }

    }
    const saveData = () => {
        const parsedQS = queryString.parse(window.location.search);
        if (pageMode === "edit") {

            dispatch({
                type: "setIndividualSiteDetailsAction",
                payload: {
                    id: parsedQS.id,
                    siteDetails: siteDetails  
                   

                }
            })
        } else {
            let requestBody = {
                ...siteDetails, clientId: clientIdForUsers
            }
            dispatch({
                type: "setSiteDetailsAction",
                payload: requestBody
            })
        }
        history.push('/site-management')
    }

    const addSitePopupClose = () => {
        setSiteManagerAddOpen(false)
    }
    const handleEditIcon_View = (e) => {
        setPageMode('edit');
    }
    const managerPopupSave = (e) => {
        // setManagerData(true);
        setSiteManagerAddOpen(false);
    }
    const handleDeleteIcon = (e) => {
        // setManagerData(false);
    }
    const googleMapAuthKey = localStorage.getItem("googleMapAuthKey");
    console.log(googleMapAuthKey)
    const MyMapComponent = compose(
        withProps({
            /**
             * Note: create and replace your own key in the Google console.
             * https://console.developers.google.com/apis/dashboard
             * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
             */
            googleMapURL:
                `https://maps.googleapis.com/maps/api/js?key=${googleMapAuthKey}&v=3.exp&libraries=geometry,drawing,places`,
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `100px` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )((props) => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: latitude, lng: longitude }}>
            {props.isMarkerShown && (
                <Marker position={{ lat: latitude, lng: longitude }} />
            )}
        </GoogleMap>
    ));

    const getLatLong = () => {

        let location = null;
        let lat = '';
        let lng = '';

        if (latitude && longitude) {
            // this.setState({ showMapView: true });
            // this.setState({ mapLoaded: true });
        } else {
            if (window.navigator && window.navigator.geolocation) {
                location = window.navigator.geolocation;
            }
            if (location) {
                location.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    Geocode.setApiKey(googleMapAuthKey);

                    // set response language. Defaults to english.
                    Geocode.setLanguage("en");
                    Geocode.setLocationType("ROOFTOP");
                    Geocode.fromLatLng(lat, lng).then(
                        (response) => {
                            const address = response.results[0].formatted_address;
                            if (address) {
                                setAddress(address)
                            }

                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                    setLatitude(lat);
                    setLongitude(lng);
                    setMapView(true);
                    dispatch({
                        type: "setSiteFormDetailsAction",
                        payload: {
                            name: "latitude",
                            value: lat
                        }
                    })
                    dispatch({
                        type: "setSiteFormDetailsAction",
                        payload: {
                            name: "longitude",
                            value: lng
                        }
                    })

                })
            }


        }
    }
    return (
        <Grid className={` ${classes.root}`}>
            <div className="analytics m-sm-30 pr-5 pb-12">
                <div className={classes.stickyHeader}>
                    <Grid container spacing={2} justify="space-between" className="flex items-center pt-2">
                        <Grid item className="flex">
                            <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                            <h1 className="ml-10px">{pageMode && capitalize(pageMode)} Site</h1>
                        </Grid>
                        {
                            pageMode === "view" && (
                                <Grid item className="mt-7">
                                    <EditIcon
                                        className="cursor-pointer text-light-gray mt-7"
                                        fontSize="small"
                                        onClick={handleEditIcon_View}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </div>
                <form>
                    <div className={"w-full ml-8"}>
                        <Grid container direction="row" spacing="3" className='pb-4 w-full'>
                            <Grid item>
                                <h5>Site Details</h5>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="siteName"
                                    name="name"
                                    label="Site Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={siteDetails && siteDetails.name}
                                    onChange={handleInputChange}
                                    //     className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    required
                                    disabled={pageMode === "view" ? true : false}
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                // error={errorState && errorState.firstName && errorState.firstName.error}
                                // helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="siteType">Site Type</InputLabel>
                                    <Select
                                        labelId="siteType"
                                        id="siteType"
                                        name="type"
                                        value={siteDetails && siteDetails.type}
                                        label="Site Type"
                                        variant="outlined"
                                        defaultValue="Save"
                                        disabled={pageMode === "view" ? true : false}
                                        onChange={(e) => handleInputChange(e)}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            getContentAnchorEl: null
                                        }}
                                    >
                                        <MenuItem value="RETAILERS">RETAILERS</MenuItem>
                                        <MenuItem value="WHOLESALE">WHOLESALE</MenuItem>
                                        <MenuItem value="WAREHOUSE">WAREHOUSE</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="siteId"
                                    name="siteId"
                                    label="Site Id"
                                    type="text"
                                 
                                    variant="outlined"
                                    fullWidth
                                    value={siteDetails && siteDetails.siteId}
                                    onChange={handleInputChange}
                                    required
                                    disabled={pageMode !=="add"}
                                
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    error={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.siteId
                                        && errorState.siteBasicDetails.siteId.error}
                                    helperText={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.siteId
                                        && errorState.siteBasicDetails.siteId.error
                                        && errorState.siteBasicDetails.siteId.errorMsg}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="contactNumber"
                                    name="phone"
                                    label="Contact Number"
                                    type="text"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                    }}
                                    required
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    variant="outlined"
                                    value={siteDetails && siteDetails.phone}
                                    onChange={handleInputChange}
                                    // className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                    error={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.phone
                                        && errorState.siteBasicDetails.phone.error? true :!siteDetails?.phone.match(/^[1-9][0-9]*$/gm) && siteDetails?.phone.length > 0 ? true : false}
                                    helperText={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.phone
                                        && errorState.siteBasicDetails.phone.error
                                        && errorState.siteBasicDetails.phone.errorMsg? errorState.siteBasicDetails.phone.errorMsg: !siteDetails?.phone.match(/^[1-9][0-9]*$/gm) && siteDetails?.phone.length > 0 ? `Please enter valid mobile number` : null }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="siteEmail"
                                    name="email"
                                    label="Site Email"
                                    type="text"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                    }}
                                    variant="outlined"
                                    value={siteDetails && siteDetails.email}
                                    onChange={handleInputChange}
                                    //     className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                    error={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.email
                                        && errorState.siteBasicDetails.email.error}
                                    helperText={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.email
                                        && errorState.siteBasicDetails.email.error
                                        && errorState.siteBasicDetails.email.errorMsg}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="Address"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={siteDetails && siteDetails.address}
                                    onChange={handleInputChange}
                                    //     className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                // error={errorState && errorState.firstName && errorState.firstName.error}
                                // helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    disabled
                                    id="country"
                                    name="country"
                                    label="Country"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value="India"
                                    onChange={handleInputChange}
                                //     className={`${styleObj.textFieldWidth}
                                // ${pageMode === "view" ?
                                //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                //             : `${classes.root}`}`}
                                // disabled={pageMode === "view" ? true : false}
                                // error={errorState && errorState.firstName && errorState.firstName.error}
                                // helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="state"
                                    select
                                    type="text"
                                    name="state"
                                    label="State"
                                    value={siteDetails && siteDetails.state}
                                    variant="outlined"
                                    disabled={pageMode === "view" ? true : false}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    { 
                                states && states.map((x,index)=>{
                        return(
                        <MenuItem value={x.name}>{x.name}</MenuItem>
                        )
                    }) 
                    }
                                </TextField>

                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="city"
                                    name="city"
                                    type="text"
                                    fullWidth
                                    select
                                    value={siteDetails && siteDetails.city}
                                    label="City"
                                    disabled={pageMode === "view" ? true : false}
                                    variant="outlined"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error'
                                        }
                                    }}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    { 
                                cities && cities.map((x,index)=>{
                                    return(
                                    <MenuItem value={x.name} >{x.name}</MenuItem>
                                    )
                                    }) 
                                }

                                </TextField>

                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="area"
                                    name="area"
                                    label="Area"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={siteDetails && siteDetails.area}
                                    onChange={handleInputChange}
                                    //     className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                // error={errorState && errorState.firstName && errorState.firstName.error}
                                // helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    id="pin"
                                    name="pin"
                                    label="Pin"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={siteDetails && siteDetails.pin}
                                    onChange={handleInputChange}
                                    //     className={`${styleObj.textFieldWidth} 
                                    // ${pageMode === "view" ?
                                    //             `${classes.disabledInput} ${classes.disabledInputLabel}`
                                    //             : `${classes.root}`}`}
                                    disabled={pageMode === "view" ? true : false}
                                    error={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.pin
                                        && errorState.siteBasicDetails.pin.error}
                                    helperText={errorState
                                        && errorState.siteBasicDetails
                                        && errorState.siteBasicDetails.pin
                                        && errorState.siteBasicDetails.pin.error
                                        && errorState.siteBasicDetails.pin.errorMsg}
                                // error={errorState && errorState.firstName && errorState.firstName.error}
                                // helperText={errorState && errorState.firstName && errorState.firstName.errorMsg}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <FormControlLabel
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                    value="status"
                                    name="status"
                                    label="Status:"
                                    labelPlacement="start"
                                    size="small"
                                    className={classes.statusControl}
                                    control={
                                        <>
                                            {pageMode !== "view" ? <>
                                                <Button variant="outlined" size="small"
                                                    onClick={(e) => handleInputChange(e, "INACTIVE")}
                                                    name="status"
                                                    className={siteDetails.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                                >
                                                    INACTIVE
                                                    <Checkbox
                                                        name="INACTIVE"
                                                        icon={<CircleUnchecked />}
                                                        checked={siteDetails.status === "INACTIVE" ? true : false}
                                                        checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                    />
                                                </Button>

                                                <Button variant="outlined" size="small"
                                                    onClick={(e) => handleInputChange(e, "ACTIVE")}
                                                    name="status"
                                                    className={siteDetails.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                                >
                                                    ACTIVE
                                                    <Checkbox color='primary' name="ACTIVE"
                                                        icon={<CircleUnchecked />}
                                                        checked={siteDetails.status === "ACTIVE" ? true : false}
                                                        checkedIcon={<CircleCheckedFilled />}
                                                    />
                                                </Button>
                                            </> : siteDetails.status === "INACTIVE" ? <Button variant="outlined" size="small"

                                                name="status"
                                                className={siteDetails.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                            >
                                                INACTIVE
                                                <Checkbox
                                                    name="INACTIVE"
                                                    icon={<CircleUnchecked />}
                                                    checked={siteDetails.status === "INACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                                />
                                            </Button> : <Button variant="outlined" size="small"

                                                name="status"
                                                className={siteDetails.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                            >
                                                ACTIVE
                                                <Checkbox color='primary' name="ACTIVE"
                                                    icon={<CircleUnchecked />}
                                                    checked={siteDetails.status === "ACTIVE" ? true : false}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </Button>}
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}></Grid>
                        </Grid>
                        <Grid container direction="row" spacing="3" className='pb-4 w-full'>
                            <Grid item>
                                <h5>Locate on Map</h5>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="locationCoOrdinates"
                                    name="locationCoOrdinates"
                                    label="Location Address"
                                    type="text"
                                    className="w-360"
                                    variant="outlined"
                                    fullWidth

                                    value={address}
                                    disabled
                                />
                                <Button variant="outlined" className={classes.locationBtn} onClick={getLatLong}>
                                    GET LOCATION
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                {mapView ? <MyMapComponent isMarkerShown /> : <img style={{ height: "100px", position: "inherit", width: "100%" }} src={`/assets/images/map.png`} alt="map" />
                                }
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing="3" className='pb-4 w-full flex justify-between items-center'>
                            <Grid item>
                                <h5>Site Manager Details</h5>
                            </Grid>
                            <Grid>

                                {(pageMode === "add" && managers.length > 0) || (pageMode === "edit" && siteDetails.managers.length > 0) ?
                                    <Tooltip title={<span className='text-13'>Add Store Manager</span>}>
                                        <Icon onClick={() => setSiteManagerAddOpen(true)} className={`${classes.iconColor}  mr-9 cursor-pointer`}>
                                            <img src={'/assets/images/icons/site_person.svg'} alt="img" />
                                        </Icon>
                                    </Tooltip> : null
                                }
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className='min-h-120 w-full'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                 {(pageMode === "add" && managers.length > 0) || (pageMode === "edit" && siteDetails.managers.length > 0) || (pageMode === "view" && siteDetails.managers.length > 0) ?
                                    <WithManager data={pageMode === "add" ? managers : siteDetails.managers} pageMode={pageMode} />
                                    : <DisabledView
                                        imgSrc="/assets/images/icons/Data_Illustration.svg"
                                        title="No users have been mapped."
                                        actionLink="CLICK HERE TO ADD"
                                        isLeftAligned={false}
                                        background="#FFFEFE"
                                        borderType="dashed"
                                        textSize="medium"
                                        pageMode={pageMode}
                                        actionHandler={() => setSiteManagerAddOpen(true)}
                                    />}

                            </Grid>
                        </Grid>

                    </div>
                </form>
            </div>
            {pageMode !== "view" && <Grid className=" mr-3 pt-5 position-bottom-right mb-5">
                <V5GlobalFooterButtons outlinedButtonText="Cancel" solidButtonText="Save" saveData={saveData}
                // isDisabled={pageMode === "edit" ? false : saveAndContinueBtnDisabled}
                isDisabled={siteDetails.name === ""|| siteDetails.siteId === ""||siteDetails.state === "" || siteDetails.city === "" || siteDetails.phone === ""|| !siteDetails.phone?.match(/^[1-9][0-9]*$/gm) || (siteDetails.phone.length !== 10 && disabled)}
                 handleCancel={handleCancel} />
            </Grid>}

            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setshowDeletePopup(false)}
                text={`Are you sure to discard the changes ?`}
                onYesClick={confirmDelete}
            />
            <AddSiteManagerPopUp
                open={siteManagerAddOpen}
                Close={addSitePopupClose}
                pageMode={pageMode}
                handleSave={managerPopupSave}
                handleDeleteIcon={handleDeleteIcon}
            />
        </Grid>
    )
}

export default SiteOnboard
