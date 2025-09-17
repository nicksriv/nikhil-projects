import { Button, Grid, Icon, InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { CalendarToday, CameraAlt, Close } from '@material-ui/icons';
import { navigations } from 'app/navigations';
import { useSelector, useDispatch } from 'react-redux';
import V5GlobalFooterButtons from 'app/components/V5GlobalFooterButtons/V5GlobalFooterButtons';

function ScreenView() {

    const useStyles = makeStyles((theme) => ({
        screenContainer: {
            backgroundColor: "#FEFFFE",
            maxHeight: "95%",
            padding: "2rem"
        },
        phoneRight: {
            position: "relative",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center"
        },
        phoneRightOverLay: {
            position: "absolute",
            top: 0,
            background: "black"

        },
        imdesc: {
            display: "inline-block",
            verticalAlign: "middle",
            position: "relative"
        },
        leftMobileContainer: {
            display: "inline-block",
            verticalAlign: "middle",
            position: "relative",
            marginLeft: "2rem"
        },
        rightMobileContainer: {
            display: "inline-block",
            verticalAlign: "middle",
            position: "relative",
            margin: "0 -3rem"
        },
        para: {
            textAlign: "center",
            background: "red"
        },
        cen: {
            position: "absolute",
            top: "9%",
            left: "23%",
            background: "white",
            width: "54%",
            height: "72%",
            borderRadius: "0.3rem",
            display: "flex",
            flexDirection: "column"
        },
        submitBtn: {
            position: "absolute",
            width: "-webkit-fill-available",
            backgroundColor: "#50BEB6",
            height: "1.7rem",
            bottom: "0.5rem",
            margin: " 0.2rem 0.5rem",
            fontSize: "0.7rem"
        },
        inputField: {
            margin: "0.5rem",
            marginTop: "1rem"
        },
        iconColor: {
            color: "lightgrey",
            fontSize: "0.8rem"
        },
        mapImg: {
            width: "-webkit-fill-available",
            margin: "0.5rem",
            height: "3rem"
        },
        locationBtn: {
            border: "1px solid #50BEB6",
            color: "#50BEB6",
            float: "right",
            margin: "0.1rem 0.5rem",
            width: "50%",
            height: "1.5rem",
            fontSize: "0.6rem"
        },
        cameraContainer: {
            border: "1px dashed #50BEB6",
            height: "2.5rem",
            margin: "0.5rem",
            borderRadius: "0.2rem"
        },
        userProfile: {
            width: "1.5rem",
            borderRadius: "100%",
            marginRight: "0.5rem"
        },
        logo: {
            width: "3rem",
        },
        phoneLeftOverLay: {
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: "1",
            position: "absolute",
            opacity: "0.7",
            borderRadius: "0.3rem",
        },
        sideMenu: {
            width: "75%",
            height: "100%",
            backgroundColor: "#F4EBE1",
            zIndex: "1",
            position: "absolute",
            opacity: "1",
            borderRadius: "0.3rem 0 0 0.3rem",
        },
        activeNav: {
            background: '#F1E3D5',
            padding: '0.5rem 0',
            color: 'black',
            opacity: 1,
            borderRadius: '0px 4px 4px 0px',
        },
        FooterBtn: {
            position: "absolute",
            bottom: "5rem",
            right: "1rem"
        },
        phoneImg: {}
    }));

    const classes = useStyles();
    const { selectedPrimaryColor, selectedMenuColor, selectedFontStyle } = useSelector((state) => state.theme)
    const { clientIdForUserLogo } = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const saveData = () => {

        dispatch({
            type: "setThemeConfigurationAction",
            payload: {
                primaryColor: selectedPrimaryColor,
                menuColor: selectedMenuColor,
                font: selectedFontStyle,
                clientId: clientIdForUserLogo
            }
        })

    }

    const resetColor = () => {
        dispatch({
            type: "getThemeConfigurationAction",
            clientId: clientIdForUserLogo
        })
        dispatch({
            type: "setPrimaryColorAction",
            payload: ""
        })
        dispatch({
            type: "setMenuColorAction",
            payload: ""
        })
        dispatch({
            type: "setFontStyleAction",
            payload: ""
        })

    }

    return (
        <>
            <Grid conatiner className={`${classes.screenContainer} flex justify-around`} style={{ fontFamily: selectedFontStyle }}>
                <div className="flex">
                    <Grid item lg={6}>
                        <div className={classes.leftMobileContainer} style={{ fontFamily: selectedFontStyle }}>
                            <img className={classes.phoneImg} src="/assets/images/phone.svg" alt="phoneImg" />
                            <div className={`${classes.cen}`}>
                                <div className={classes.phoneLeftOverLay}></div>
                                <div className={classes.sideMenu} style={{ backgroundColor: selectedMenuColor }}>
                                    <Close className='text-15 text-gray ml-2 mt-5' />
                                    <div className='mt-7'>
                                        {navigations.map((element, index) => {
                                            return <div className={`flex items-center mt-5 ${index === 0 && classes.activeNav}`} style={{ backgroundColor: selectedMenuColor }}>
                                                <Icon className={`text-11 material-icons-two-tone ml-2 mr-2 ${index === 0 ? "text-black" : "text-muted"}`}>{element.icon}</Icon>
                                                <a className={`text-11 no-white-space ${index === 0 ? "text-black" : "text-muted"}`}>{element.name}</a>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className='flex items-center justify-between mt-3'>
                                    <div className='flex items-center'>
                                        <MenuIcon className='text-15 text-gray ml-2 mr-3' />
                                        <img src="/assets/images/V5GlobalLogo.png" className={classes.logo} alt="v5img" />
                                    </div>
                                    <div className='flex items-center'>
                                        <SearchIcon className='text-15 text-light-gray mr-2' />
                                        <NotificationsNoneIcon className='text-15 text-light-gray mr-1' />
                                        <img src="/assets/images/face-1.jpg" className={classes.userProfile} alt="img" />
                                    </div>
                                </div>
                                <div className='flex items-center mt-2'>
                                    <ArrowBackIcon className='text-15 text-gray mt-1 ml-2' />
                                    <h5 className=' ml-1 mt-3'>Detailed Page</h5>
                                </div>
                                <TextField disabled size="small" className={classes.inputField} variant='outlined' placeholder='6 OCT 2022' InputProps={{
                                    endAdornment: <InputAdornment position="end"><CalendarToday className={classes.iconColor} fontSize="small" /></InputAdornment>,
                                    style: { fontSize: 12, height: 25 }
                                }} />
                                <div>
                                    <img src="/assets/images/map.png" className={classes.mapImg} alt="map"/>
                                    <Button variant='outlined' className={classes.locationBtn} size="small">Get Location</Button>
                                </div>
                                <div>
                                    <p className='text-10 text-black mx-3 mt-0'>Address:</p>
                                    <p className='text-9 text-gray mx-3 mt-1'>Big Bazar Mall GS 24 OLD GOLD SPOT BLDG, Ameerpet Road, Ameerpet, Hyderabad, Telangana 500073</p>
                                </div>
                                <div className={classes.cameraContainer}>
                                    <div className='flex flex-column items-center justify-center mt-2'>
                                        <CameraAlt className={classes.iconColor} />
                                        <p className='mt-0 text-gray text-11'>Capture Self</p>
                                    </div>
                                </div>
                                <TextField disabled size="small" className={classes.inputField} variant='outlined' placeholder='Remark(optional)' InputProps={{
                                    style: { height: 25, fontSize: 12 }
                                }} />
                                <Button className={classes.submitBtn} size="medium">Submit</Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className={classes.rightMobileContainer} style={{ fontFamily: selectedFontStyle }}>
                        <img src="/assets/images/phone.svg" alt="phone"/>
                        <div className={`${classes.cen}`}>
                            <div className='flex items-center justify-between mt-3'>
                                <div className='flex items-center'>
                                    <MenuIcon className='text-15 text-gray ml-2 mr-3' />
                                    <img src="/assets/images/V5GlobalLogo.png" className={classes.logo}alt="v5Img" />
                                </div>
                                <div className='flex items-center'>
                                    <SearchIcon className='text-15 text-light-gray mr-2' />
                                    <NotificationsNoneIcon className='text-15 text-light-gray mr-1' />
                                    <img src="/assets/images/face-1.jpg" className={classes.userProfile} alt="img" />
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <ArrowBackIcon className='text-15 text-gray mt-1 ml-2' />
                                <h5 className=' ml-1 mt-3'>Detailed Page</h5>
                            </div>
                            <TextField disabled size="small" className={classes.inputField} variant='outlined' placeholder='6 OCT 2022' InputProps={{
                                endAdornment: <InputAdornment position="end"><CalendarToday className={classes.iconColor} fontSize="small" /></InputAdornment>,
                                style: { fontSize: 12, height: 25 }
                            }} />
                            <div>
                                <img src="/assets/images/map.png" className={classes.mapImg} alt="map" />
                                <Button variant='outlined' className={classes.locationBtn} style={{ border: `1px solid ${selectedPrimaryColor}`, color: selectedPrimaryColor }} size="small">Get Locations</Button>
                            </div>
                            <div>
                                    <p className='text-9 text-light-gray mx-3 mt-0'>Address:</p>
                                    <p className='text-9 text-gray mx-3 mt-1'>Big Bazar Mall GS 24 OLD GOLD SPOT BLDG, Ameerpet Road, Ameerpet, Hyderabad, Telangana 500073</p>
                            </div>
                            <div className={classes.cameraContainer} style={{ border: `1px dashed ${selectedPrimaryColor ? selectedPrimaryColor : "#50BEB6"}` }}>
                                <div className='flex flex-column items-center justify-center mt-1'>
                                    <CameraAlt className={classes.iconColor} />
                                    <p className='mt-0 text-gray text-9'>Capture Self</p>
                                </div>
                            </div>
                            <TextField disabled size="small" className={classes.inputField} variant='outlined' placeholder='Remark(optional)' InputProps={{
                                style: { height: 25, fontSize: 12 }
                            }} />
                            <Button className={classes.submitBtn} style={{ backgroundColor: selectedPrimaryColor }} size="medium">Submit</Button>

                        </div>
                    </div>
                    </Grid>

                </div>

                <div className={classes.FooterBtn}>
                    <V5GlobalFooterButtons outlinedButtonText="RESET" solidButtonText="APPLY" saveData={saveData} handleCancel={resetColor} />
                </div>
            </Grid >
        </>
    )
}

export default ScreenView