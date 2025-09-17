import React, { useState } from 'react';

import {
    Drawer, IconButton, Grid, Button, Input, InputAdornment
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import useSettings from 'app/hooks/useSettings';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { convertDate } from 'app/views/utilities/DateFormat';
import EmailPopUp from '../EmailPopUp/EmailPopUp';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ChangePasswordPopUp from '../ChangePassword/ChangePasswordPopUp';


const useStyles = makeStyles(({ palette, ...theme }) => ({
    miniCart: {
        width: '350px',
        '& .cart__topbar': {
            height: 'var(--topbar-height)',
        },
        '& .mini-cart__item': {
            transition: 'background 300ms ease',
            '&:hover': {
                background: 'rgba(0,0,0,0.01)',
            },
        },
    },
    basicTable: {
        fontFamily: 'SF Pro Display',
        borderCollapse: 'collapse',
        width: '100%',
        borderRadius: '3px',
        borderStyle: 'hidden', /* hide standard table (collapsed) border */
        boxShadow: '0 0 0 1px #0000001F', /* this draws the table border  */
        marginTop: '30px'
    },

    td: {
        border: '1px solid #0a0a0a',
        textAlign: 'left',
        padding: '16px 12px',
    },

    th: {
        border: '1px solid #0000001F',
        textAlign: 'left',
        padding: '16px 12px',
    },

    heading: {
        color: '#000000DE',
        opacity: 0.54,
        fontSize: '16px',
        minWidth: '150px'
    },
    desc: {
        color: '#00000099',
        fontSize: "1rem",
        lineHeight: "1.6rem"
    },

}))

const DetailsDailogue = (props) => {
    const {
        container,
        open,
        clientId,
        userId,
        vendorId,
        qualityAssuranceId,
        isUserPopup,
        isClientPopup,
        isVendorPopup,
        isQualityAssurancePopup,
        closeAction,
        description,
        data,
        shareMail,
       //changePassword,
        showPassword,
       //setShowPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        filledBtnText,
        outlinedBtnText,
        hasBtn,
        descriptionHeading
       //handleChangePassword,
       //isChangePasswordBtnDisable
    } = props;
    const classes = useStyles();
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);
    const [changePasswordOpen , setChangePasswordOpen] = useState(false);
    const { clientEmailTemplate, clientCredentialDetails } = useSelector((state) => state.clients);
    const { userEmailTemplate, userCredentialDetails } = useSelector((state) => state.users);
    const { vendorEmailTemplate, vendorCredential } = useSelector((state) => state?.vendorManagement);
    const {qualityAssuranceEmailTemplate,qualityAssuranceCredential} = useSelector((state) => state.qualityAssuranceManagement);
    const dispatch = useDispatch();
    const { settings } = useSettings();

    
    const handleDrawerToggle = () => {
        closeAction();
    }
    const handleShareMail = () => {
        setEmailPopupOpen(!emailPopupOpen);
        shareMail("id");
        if (clientId) 
        {
            dispatch({
                type: "getClientEmailTemplateAction",
                clientId
            })
        } 
        if (qualityAssuranceId) 
        {
            dispatch({
                type: "getQualityAssuranceEmailTemplateAction",
                payload:{qualityAssuranceId}
            })
        } 
        
        if (vendorId) {
            dispatch({
                type: 'getVendorEmailTemplateAction',
                payload: {
                    vendorId,
                },
            })
        } else if (userId) {
            dispatch({
                type: 'getUserEmailTemplateAction',
                userId,
            })
        }
    }

    const handleChangePasswordPopUp = () => {
        setChangePasswordOpen(!changePasswordOpen);
    }
    const handleEmailPopupClose = (close) => {
        
        if (!close) {
            setEmailPopupOpen(false);
        }
    }

    const handleChangePasswordClose = (close) => {
        if(!close) {
            setChangePasswordOpen(false);
        }
    }

    return (
        <ThemeProvider theme={settings.themes[settings.activeTheme]}>
            <EmailPopUp
                open={emailPopupOpen}
                Close={handleEmailPopupClose}
                clientEmailTemplate={clientEmailTemplate}
                clientCredentialDetails={clientCredentialDetails}
                userEmailTemplate={userEmailTemplate}
                userCredentialDetails={userCredentialDetails}
                vendorEmailTemplate={vendorEmailTemplate}
                vendorCredential={vendorCredential}
                qualityAssuranceEmailTemplate={qualityAssuranceEmailTemplate}
                qualityAssuranceCredential={qualityAssuranceCredential}
                isUserPopup={isUserPopup}
                isClientPopup={isClientPopup}
                isVendorPopup={isVendorPopup}
                isQualityAssurancePopup={isQualityAssurancePopup}
                />
            <ChangePasswordPopUp
                open={changePasswordOpen}
                Close={handleChangePasswordClose}
                onClose={handleDrawerToggle}
                isUserPopup={isUserPopup}
                isClientPopup={isClientPopup}
                isVendorPopup={isVendorPopup}
                isQualityAssuarncePopup={isQualityAssurancePopup}
                data={data}
                clientId={clientId}
                userId={userId}
                vendorId={vendorId}
                qualityAssuranceId={qualityAssuranceId}
            />
            <Drawer
                width='100px'
                container={container}
                variant="temporary"
                anchor='right'
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Grid className={clsx('flex-column h-full', classes.miniCart)}>
                    <div className="cart__topbar flex justify-between items-center p-1 mb-sm-30 pl-4">
                        <h5 className="my-0 font-medium">Info</h5>
                        <IconButton onClick={closeAction}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Grid className="p-4 mb-sm-30">
                        <h5 className="my-0 font-medium">{descriptionHeading}</h5>
                        <p className={`${classes.desc} opacity-54`}>
                            {description}
                        </p>
                        {
                            data &&
                            <table className={classes.basicTable}>
                             
                                {data.map((tableProp, index) => {
                                    return Object.entries(tableProp).map(
                                        ([key, value]) => {
                                            return (
                                                <tr>
                                                    <td
                                                        className={`${classes.th} ${classes.heading}`}>
                                                        {key}
                                                    </td>
                                                    <td
                                                        className={`${classes.th}`}>
                                                        {
                                                            key === "Joining Date" ?
                                                                convertDate(value)
                                                                :
                                                                key === "Password" ?
                                                                    <Input
                                                                        id="standard-adornment-password"
                                                                        type={showPassword ? "text" : "password"}
                                                                        value={value}
                                                                       // onChange={handleChangePassword}
                                                                        disableUnderline={true}
                                                                        inputProps={{ readOnly: true }}
                                                                        endAdornment={
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    aria-label="toggle password visibility"
                                                                                    onClick={handleClickShowPassword}
                                                                                    onMouseDown={handleMouseDownPassword}
                                                                                >
                                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        }
                                                                    />

                                                                    : value
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                })}
                              
                            </table>
                        }
                    </Grid>
                    {hasBtn && <Grid className="flex-column items-center">
                        <Button className={`w-200 bg-primary text-black font-medium ${changePasswordOpen ? 'disabled' : ''}`} variant="contained" 
                        // onClick={changePassword}
                        onClick={handleChangePasswordPopUp}
                        // disabled={isChangePasswordBtnDisable}
                        disabled={changePasswordOpen ? true : false}
                        >
                            {filledBtnText}
                        </Button>
                        <Button className="w-200 color-primary border-primary mt-5" variant="outlined" onClick={handleShareMail}>
                            {outlinedBtnText}
                        </Button>
                    </Grid>}
                </Grid>
            </Drawer>
        </ThemeProvider>
    )
}

export default DetailsDailogue;
