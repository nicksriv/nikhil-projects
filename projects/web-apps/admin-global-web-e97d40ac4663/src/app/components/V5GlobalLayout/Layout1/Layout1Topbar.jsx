import React, { useState, useEffect } from 'react';
import {
    Icon,
   // IconButton,
    MenuItem,
    Avatar,
  //  useMediaQuery,
    //Hidden,
    //Grid,
    TextField,
    //InputBase,
} from '@material-ui/core';
import { V5GlobalMenu, 
    //V5GlobalSearchBox 
} from 'app/components';
import NotificationBar from '../../NotificationBar/NotificationBar'
import { Link, useLocation } from 'react-router-dom'
//import Slide from '@material-ui/core/Slide'
//import AppSettings from '../../AppSettings/AppSettings'
import {
    makeStyles,
  //  useTheme,
    createTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
//import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth';
//import useSettings from 'app/hooks/useSettings';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import LoginAs from 'app/components/LogInAs/LoginAs';
import { useSelector, useDispatch } from 'react-redux';
import { config } from 'helper/config';
import InputAdornment from '@material-ui/core/InputAdornment';
//import Visibility from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search';
import V5GlobalChangeProfilePassword from 'app/components/V5GlobalChangeProfilePassword/V5GlobalChangeProfilePassword';
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog';
import useSettings from 'app/hooks/useSettings';
import { setClientIdForUsers } from 'app/redux/UserManagement/userManagementSlice';
import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';
//import { locals } from 'v5gl-form-builder/server/api/routes';

const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
// const API_ENDPOINT = isProd
//     ? config.production.api_endpoint
//     : config.development.screenbuilder_api_endpoint;

// const APIVERSION = "screenbuilder/api/v1";
// const token = localStorage.getItem('accessToken');
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

const useStyles = makeStyles(({ palette, ...theme }) => ({
    // topbar: {
    //     top: 0,
    //     zIndex: 96,
    //     transition: 'all 0.3s ease',

    //     background:
    //         'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

    //     '& .topbar-hold': {
    //         backgroundColor: palette.primary.main,
    //         height: 80,
    //         paddingLeft: 18,
    //         paddingRight: 20,
    //         [theme.breakpoints.down('sm')]: {
    //             paddingLeft: 16,
    //             paddingRight: 16,
    //         },
    //         [theme.breakpoints.down('xs')]: {
    //             paddingLeft: 14,
    //             paddingRight: 16,
    //         },
    //     },
    //     '& .fixed': {
    //         // boxShadow: theme.shadows[1],
    //         height: 64,
    //     },
    // },
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },

    topbar: {
        // zIndex: '1000',
        // position: 'fixed',
        // left: '5.5rem',
        // right: 0,
        // marginBottom: '1rem',
        height: '110px'
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 185,
    },
    logoMain: {
        objectFit: 'contain',
        width: '110px',
        maxHeight: '75px',
        minHeight: '75px',
        marginBottom: '0.3rem',
        marginLeft: '-0.1rem'
    },
    logoClient: {
        objectFit: 'contain',
        width: '110px',
        marginLeft: '0.5rem',
        maxHeight: '75px',
        minHeight: '75px',
    },
    emptyLogoView: {
        objectFit: 'contain',
        width: '130px',
        marginLeft: '3.5rem',
        maxHeight: '75px',
        minHeight: '75px',
        zIndex: 100,
    },
    sideBorder: {
        borderLeft: '1px solid lightgray',
        maxHeight: '50px',
        marginLeft: '1rem',
        marginRight: '1rem',
        height: '30px',
    },
    topBarRight: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        justifyContent: 'flex-end',
        paddingBottom: '1rem',
        maxHeight: '95px',
        minHeight: '95px',
        marginRight: '1rem',
    },
    topBarLeft: {
        backgroundColor: '#F5F5F5',
        maxHeight: '95px',
        minHeight: '95px',
        display: 'flex',
        alignItems: 'center',
    },
    searchBox: {
        width: '200px',
        marginRight: '20px'
    },
    logoWrapper: {
        marginTop: '-1px', 
        marginLeft: '20px'
    },
    defaultLogo: {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        transition: '.2s ease',
        backgroundColor: '#2C3E93',
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        textTransform: 'uppercase',
        paddingBottom: "0.3rem"
    }
}))
const custom = createTheme({
    palette: {
        primary: {
            main: '#2C3E93',
        },
    },
})
const Layout1Topbar = () => {
   // const theme = useTheme()
    const classes = useStyles()
    //const {settings,updateSettings } = useSettings()
    const { logout} = useAuth()
   // const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
   // const fixed = settings.layout1Settings.topbar.fixed
    const [ panelOpen, setPanelOpen ] = useState(false)
    const { clientIdForUserLogo } = useSelector((state) => state.users)
    // const { clientLogoForHeader, clientDetails } = useSelector((state) => state.clients)
    const [ changePasswordOpen , setChangePasswordOpen] = useState(false);
    const [profileLogoHeader, setProfileLogoHeader] = useState('');
    const { userProfileLogo, employeeDetails, userProfileDetails, empId } = useSelector((state) => state.profile);
    const { userProfileImageId, userLogoId } = useSelector((state) => state.auth);
    const [ showLogoutPopup, setShowLogoutPopup] = useState(false);
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('');
    const adminId = localStorage.getItem("adminId");
    const clientId = localStorage.getItem("selectedClientId");
    const clientName = localStorage.getItem("clientName");
    const userType = localStorage.getItem("typeOfUser");
    const qaId = localStorage.getItem('qaId')


    const { settings } = useSettings();

    const leftSidebar = settings.layout1Settings.leftSidebar;
    const { mode } = leftSidebar;
    const switchClientDisabled = useSelector((state) => {
        return state.auth.switchClientDisabled
    })
    // const handleClick = (e, status) => {
    //     setStatus(status);
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    // const openSearch = () => {
    //     setValue(true)
    // }
    // const updateSidebarMode = (sidebarSettings) => {
    //     updateSettings({
    //         layout1Settings: {
    //             leftSidebar: {
    //                 ...sidebarSettings,
    //             },
    //         },
    //     })
    // }

    // const handleSidebarToggle = () => {
    //     let { layout1Settings } = settings
    //     let mode
    //     if (isMdScreen) {
    //         mode =
    //             layout1Settings.leftSidebar.mode === 'close'
    //                 ? 'mobile'
    //                 : 'close'
    //     } else {
    //         mode =
    //             layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
    //     }
    //     updateSidebarMode({ mode })
    // }
    const handleDrawerToggle = (toggleValue) => {
        if (toggleValue) {
            setPanelOpen(toggleValue)
        } else {
            setPanelOpen(!panelOpen)
        }
    }
    const handleChangePassword = () => {
        setChangePasswordOpen(!changePasswordOpen);
    }
    const handleChangePasswordClose = (close) => {
        if(!close) {
            setChangePasswordOpen(false);
        }
    }

    useEffect(() => {
        // dispatch({
        //     type: "getUserProfileLogoAction",
        // });
        if (userType !== 'QUALITY_ASSURANCE') {
            dispatch({
                type: 'getUserProfileDetailsAction',
            })
        }
    }, [dispatch]);

    useEffect(() => {
        let header = "";
        if (localStorage.getItem('typeOfUser') === "Admin") {
            header = userProfileDetails.fullName ? userProfileDetails.fullName.substring(0, 2) : ""
        } else {
            header = userProfileDetails.firstName ? userProfileDetails.firstName.substring(0, 2) : "";
        }
        setProfileLogoHeader(header);
    }, [userProfileDetails]);

   
    const handleProfile = () => {
        dispatch({
            type: "getUserProfileDetailsAction" 
        });
        // dispatch({
        //     type: "getUserProfileLogoAction", 
        // });
    }
    
    // useEffect(() => {
    //     dispatch({
    //         type: 'getClientLogoAction',
    //         id: clientIdForUserLogo,
    //     })
    // }, [clientIdForUserLogo])

    const confirmLogout = () => {
        setShowLogoutPopup(true);
    }

    const logoutUser = () => {
        dispatch({
            type: setClientIdForUsers.type,
            payload: { clientId: '', clientLogoId: ''}
        });
        dispatch({
            type: setClientFilterDetails.type,
            payload: {
                        clientName: "",
                        clientId: "",
                        state: "",
                        headOfficeName: "",
                        status: "",
                        from: null,
                        to: null
                    }
        })
        logout();
    }
    return (
        <div className={`${classes.topbar} `}>
            <div className="flex items-center">
                <div className={classes.topBarLeft}>
                    {
                    mode === 'compact' ?
                    <div className={`w-180 ${classes.logoWrapper}`}>
                        <img
                            className={classes.logoMain}
                            src="/assets/images/V5Globallogo.png"
                            alt={'Logo'}
                        />
                    </div>
                    : null}
                    {
                    // userProfileImageId? (
                    //     <div>
                    //         { userProfileImageId?(
                    //             <img
                    //                 className={classes.logoClient}
                    //                 src={userProfileImageId}
                    //                 alt="Logo"
                    //             />
                    //         ) : null}
                    //     </div>
                    // ) : 
                    // clientLogoForHeader ? ( 
                    //     <div>
                    //         { clientLogoForHeader ? (
                    //             <img
                    //             className={classes.logoClient}
                    //                 src={clientLogoForHeader}
                    //                 alt="Logo"
                    //             />
                    //         ): null}
                    //         </div>
                    // )
                    userLogoId && clientIdForUserLogo && userLogoId !== ""?
                    <img src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${userLogoId}`} className={classes.logoClient} alt="logo"/>
                     : (
                        <div className={classes.emptyLogoView}></div>
                    )}
                </div>
                <div className={`${classes.topBarRight} w-full `}>
                    {
                        <ThemeProvider theme={custom}>
                            {' '}
                            {/* <TextField
                                placeholder="Search"
                                InputLabelProps={{
                                    style: {
                                        height: '40px'
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" style={{ color: 'rgba(0, 0, 0, 0.3)'}}>
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        height: '40px',
                                        padding: '0 14px',
                                    },
                                }}
                                className={classes.searchBox}
                                id="outlined-multiline-flexible"
                                color="primary"
                                value={value}
                                onChange={handleChange}
                                variant="outlined"
                            /> */}
                        </ThemeProvider>
                    }

                    {/* <NotificationProvider>
                        <NotificationBar />
                    </NotificationProvider> */}
                    <V5GlobalMenu
                        menuButton={
                            <div className={`${classes.userMenu}  flex`}>
                                {/* <Hidden xsDown>
                                        <span>
                                            Hi <strong>{user.name}</strong>
                                        </span>
                                    </Hidden> */}
                                {userProfileImageId ? (
                                    <Avatar
                                        className="cursor-pointer ml-10"
                                        src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${userProfileImageId}`}
                                    />
                                ) : (
                                    <div className={classes.defaultLogo}>
                                        {' '}
                                        <h4>{profileLogoHeader}</h4>
                                    </div>
                                )}

                                <div className="flex-column ml-3 mt-3">
                                    <p
                                        style={{ fontSize: '0.8rem' }}
                                        className="mb-0 mt-1 card-subtitle"
                                    >
                                        {userType === 'QUALITY_ASSURANCE'
                                            ? `Emp ID: ${qaId}`
                                            : ` Emp ID:  ${
                                                  !userProfileDetails
                                                      .employeeDetails
                                                      ?.employeeId &&
                                                  adminId === 'undefined'
                                                      ? clientId
                                                      : userProfileDetails
                                                            .employeeDetails
                                                            ?.employeeId
                                                      ? userProfileDetails
                                                            .employeeDetails
                                                            ?.employeeId
                                                      : adminId
                                              }`}
                                    </p>
                                    <p
                                        style={{ fontSize: '0.8rem' }}
                                        className="mt-0 card-subtitle text-black"
                                    >
                                        {userType === 'Client'
                                            ? clientName
                                            : userProfileDetails.fullName}
                                    </p>
                                </div>
                                <div>
                                    <Icon
                                        style={{ fontSize: '1rem' }}
                                        className="material-icons-two-tone ml-3"
                                    >
                                        keyboard_arrow_down
                                    </Icon>
                                </div>
                            </div>
                        }
                    >
                        <MenuItem className="mt-5">
                            <Link className={classes.menuItem} to="/">
                                <Icon className="material-icons-two-tone">
                                    {' '}
                                    home{' '}
                                </Icon>
                                <span className="pl-4"> Home </span>
                            </Link>
                        </MenuItem>
                        <MenuItem
                            onClick={handleChangePassword}
                            className={classes.menuItem}
                        >
                            <Icon className="material-icons-two-tone">
                                {' '}
                                lock{' '}
                            </Icon>
                            <span className="pl-4"> Change Password </span>
                        </MenuItem>
                        {localStorage.getItem('typeOfUser') === 'Admin' ? (
                            <MenuItem
                                onClick={handleDrawerToggle}
                                className={classes.menuItem}
                                disabled={switchClientDisabled}
                            >
                                <Icon className="material-icons-two-tone">
                                    {' '}
                                    autorenew{' '}
                                </Icon>
                                <span className="pl-4"> Switch Client </span>
                            </MenuItem>
                        ) : null}
                        <MenuItem onClick={handleProfile}>
                            <Link
                                className={classes.menuItem}
                                to="/user-profile"
                            >
                                <Icon className="material-icons-two-tone">
                                    {' '}
                                    person{' '}
                                </Icon>
                                <span className="pl-4"> Profile </span>
                            </Link>
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <Icon className="material-icons-two-tone">
                                {' '}
                                settings_outlined{' '}
                            </Icon>
                            <span className="pl-4"> Settings </span>
                        </MenuItem>
                        <MenuItem
                            onClick={confirmLogout}
                            className={classes.menuItem}
                        >
                            <Icon className="material-icons-two-tone">
                                {' '}
                                power_settings_new{' '}
                            </Icon>
                            <span className="pl-4"> Logout </span>
                        </MenuItem>
                    </V5GlobalMenu>
                </div>

                {/* {clientIdForUsers !== "Te0001" ? <>
                                    <div className={classes.sideBorder}></div>
                                    <img className={`${classes.logoClient}`} src={`${API_ENDPOINT}/clients/${clientIdForUserLogo}/logo`} alt="client logo" />
                                </> : null} */}
            </div>
            <ConfirmationDialog
                open={showLogoutPopup}
                onConfirmDialogClose={() => setShowLogoutPopup(false)}
                text={`Are you sure you want to logout ?`}
                onYesClick={logoutUser}
            />
            <LoginAs
                handleDrawerToggle={handleDrawerToggle}
                panelOpen={panelOpen}
            />
            <V5GlobalChangeProfilePassword
                open={changePasswordOpen}
                Close={handleChangePasswordClose}
            />
        </div>
    )
}

export default React.memo(Layout1Topbar)
