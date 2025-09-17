import React, { 
    //Fragment
    useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { V5GlobalStepper, PopUp, ConfirmationDialog, EmailPopUp } from '../../components';
import ClientDetails from './components/ClientOnboard/ClientDetails';
import Modules from './components/ClientOnboard/Modules';
import AccessPrivilege from './components/ClientOnboard/AccessPrivilege';
import history from 'helper/history.js';
import queryString from 'query-string';
import { capitalize } from '../../../helper/utils';
import { setClientState, setClientPrivilegeById, setClientLogoName } from '../../redux/ClientManagement/clientManagementSlice';

//..Functions
//....ADD NEW CLIENT STEPS
function getSteps() {
    return ['Client Details', 'Modules', 'Access privilege']
}
//....VALIDATE CLIENT ADMIN INPUT VALUES
function validateClientAdminInputValues(fieldName, fieldValue) {
    let isValid = false;
    const regexOnlyAlphabetsWithSpaces = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    const onlyNumbersRegex = /^[0-9\b]+$/;
    const alphanumericWithSC = /^[A-Za-z0-9\s-,#]+$/;
    switch (fieldName) {
        case 'headOfficeName':
        case 'firstName':
        case 'middleName':
        case 'lastName':
            //..Allow Alphabets only along with spaces
            if (
                fieldValue === '' ||
                fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
            ) {
                isValid = true;
            }
            break
        case 'clientName':
            if (
                fieldValue === '' ||
                fieldValue.trim().match(alphanumericWithSC)
            ) {
                isValid = true;
            }
            break
        case 'address':
            //..Alphanumeric with special characters such as hyphen, comma, space, #
            if (
                fieldValue === '' ||
                fieldValue.trim().match(alphanumericWithSC)
            ) {
                isValid = true;
            }
            break
        case 'area':
            //..Allow Alphabets only
            if (
                fieldValue === '' ||
                fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
            ) {
                isValid = true;
            }
            break
        case 'pinCode':
        case 'mobile':
            //..Allow Numeric only
            if (fieldValue === '' || fieldValue.trim().match(onlyNumbersRegex)) {
                isValid = true;
            }
            break
        default:
            isValid = true;
            break
    }
    return isValid
}

//..ADD NEW CLIENT STYLES
const useStyles = makeStyles((theme) => ({
    moduleBoxStyleUncheck: {
        top: '227px',
        left: '112px',
        width: 'w-full',
        height: 'auto',
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        // border: '1px solid var(--light-🌕-outline-on-surface-000000-12-)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #0000001F',
        borderRadius: '56px',
        opacity: 1,
    },
    moduleBoxStyleCheck: {
        top: '227px',
        left: '112px',
        width: 'w-full',
        height: '50px',
        // background:
        //     'var(--light-🌕-on - primary - high - emphasis - ffffff) 0 % 0 % no - repeat padding - box',
       // border: '1px solid var(--primary - 500 -🌕)',
        // background: '#FFFFFF 0 % 0 % no - repeat padding - box',
        border: '1px solid #2C3E93',
        // borderRadius: '56px',
        opacity: 1,
        backgroundColor: "rgba(71, 199, 151, .1)"
    },
    moduleLabelCheckStyle: {
        //top: '238px',
        //left: '517px',
        //width: '117px',
        //height: '19px',
        // font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-20) var(--unnamed-font-family-sf-pro)',
        // letterSpacing: 'var(--unnamed-character-spacing-0-25)',
        //color: 'var(--primary-500-🌕)',
        textAlign: 'center',
        font: 'normal normal normal 14px/20px SF Pro Display,sans-serif',
        letterSpacing: '0.25px',
        color: '#2C3E93',
        textTransform: 'uppercase',
        opacity: 1,
    },
    moduleLabelUncheckStyle: {
        // top: '238px',
        // left: '148px',
        // width: '118px',
        // height: '19px',
      //  font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14) /var(--unnamed-line-spacing-20) var(--unnamed-font-family-sf-pro)',
        //letterSpacing: 'var(--unnamed-character-spacing-0-25)',
        //color: 'var(--light-🌕-on-surface-high-emphasis-000000-87-)',
        textAlign: 'left',
        font: 'normal normal normal 14px / 20px SF Pro',
        letterSpacing: '0.25px',
        color: '#000000DE',
        textTransform: 'capitalize',
        opacity: 1,
    },
    styleCheckLableStyle: {
        top: '238px',
        left: '148px',
        //width: '118px',
        //height: '20px',
        //background: "var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box",
        //background: '#FFFFFF 0% 0% no-repeat padding-box',
        //opacity: 1
    },
    styleCheckIconStyle: {
        top: '238px',
        left: '120px',
        width: '20px',
        height: '20px',
        marginLeft: '8px',
        //background: "transparent url('img/Check.png') 0% 0% no-repeat padding-box",
        opacity: 1,
    },
    styleCheckedIconStyle: {
        top: '238px',
        left: '120px',
        width: '20px',
        height: '20px',
        marginLeft: '8px',
        color: "#2C3E93",
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        // background: '#FFFFFF 0% 0% no-repeat padding-box',
        opacity: 1,
    },
    //..ACCESS PRIVILEGE
    accessPrivilegeLabel: {
        top: '229px',
        left: '156px',
        width: '166px',
        height: '26px',
        marginTop: 'inherit',
        //font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-20)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-sf-pro)',
        //letterSpacing: 'var(--unnamed-character-spacing-0-15)',
        //color: 'var(--light-🌕-on-surface-high-emphasis-000000-87-)',
        textAlign: 'left',
        font: 'normal normal medium 20px/24px SF Pro',
        letterSpacing: '0.15px',
        color: '#000000DE',
        textTransform: 'capitalize',
        opacity: 1,
    },
    accessPrivilegeBoxStyleCheck_View: {
        top: '221px',
        left: '438px',
        width: '143px',
        height: '42px',
        //background:
          //  'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        //border: '1px solid var(--primary-500-🌕)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid  #2C3E93',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeBoxStyleCheck_Theme: {
        top: '221px',
        left: '629px',
        width: '244px',
        height: '42px',
        //background:
          //  'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        //border: '1px solid var(--primary-500-🌕)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid  #2C3E93',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeBoxStyleCheck_Workflow: {
        top: '221px',
        left: '921px',
        width: '260px',
        height: '42px',
        //background:
          //  'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        //border: '1px solid var(--primary-500-🌕)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid  #2C3E93',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeBoxStyleUnCheck_View: {
        top: '309px',
        left: '438px',
        width: '143px',
        height: '42px',
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        // border: '1px solid var(--light-🌕-outline-on-surface-000000-12-)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #0000001F',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeBoxStyleUncheck_Theme: {
        top: '309px',
        left: '629px',
        width: '244px',
        height: '42px',
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        // border: '1px solid var(--light-🌕-outline-on-surface-000000-12-)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #0000001F',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeBoxStyleUncheck_Workflow: {
        top: '309px',
        left: '921px',
        width: '260px',
        height: '42px',
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
       // border: '1px solid var(--light-🌕-outline-on-surface-000000-12-)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #0000001F',
        borderRadius: '56px',
        opacity: 1,
    },
    accessPrivilegeCheckedIconStyle: {
        top: '237px',
        left: '449px',
        width: '14px',
        height: '10px',
        // background:
        //     'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        opacity: 1,
    },
    accessPrivilegeUnCheckIconStyle: {
        top: '320px',
        left: '637px',
        width: '20px',
        height: '20px',
        //border: '1px solid var(--dark-🌑-on-primary-disabled-000000-38-)',
        border: '1px solid #00000061',
        opacity: 1,
    },
    stickyHeader: {
        position: "sticky",
        top: "0rem",
        backgroundColor: "#f5f5f5",
        zIndex: "100",
        paddingTop: "1rem"
    }
}))

const ClientOnboard = () => {
    //..ADD NEW CLIENT
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        clientDetails,
        errorState,
        modulesList,
        // clientModules,
        // clientPrivilege,
        states,
        cities,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        cancelBtnDisabled_Modules,
        saveAndContinueBtnDisabled_Modules,
        cancelBtnDisabled_accessPriv,
        submitBtnDisabled_accessPriv,
        clientId,
        activeStep,
        showSubmitPopUp,
        clientGeneratedId,
        clientUserName,
        clientPassword,
        clientEmailTemplate,
        clientCredentialDetails,
        clientPrivilages
    } = useSelector((state) => state.clients);
    const { userEmailTemplate, userCredentialDetails } = useSelector((state) => state.users);
    const { clientModulesList } = useSelector((state) => state.screenBuilder);
    //....STYLE CONSTANTS
    const styleObj = {
        textFieldWidth: 'w-full',
    }
    //....LOCAL STATES
    const [pageMode, setPageMode] = React.useState('');
    const [fileName, setFileName] = React.useState('');
    const [backImageName, setBackImageName] = React.useState('');
    const [deletebackgroundImage, setDeletebackgroundImage] = React.useState(false);
    const [deletelogoImage, setDeletelogoImage] = React.useState(false);
    const [backArrowDisabled, setBackArrowDisabled] = React.useState(true);
    const [nextArrowDisabled, setNextArrowDisabled] = React.useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [backgroundImageSrc, setBackgroundImageSrc] = useState("");
    const clientOnboardTimer = useRef(null);

    //....LOCAL VARIABLE
    const steps = getSteps();

    //..HANDLERS
    //....CLIENT ADMIN INPUT CONTROL CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!validateClientAdminInputValues(name, value)) return
        if (
            name === 'firstName' ||
            name === 'middleName' ||
            name === 'lastName' ||
            name === 'mobile' ||
            name === 'email'
        ) {
            dispatch({
                type: 'setClientDetailsAction',
                payload: {
                    name: name,
                    value: value,
                    isClientAdminDetails: true,
                },
            });
        } else {
            dispatch({
                type: 'setClientDetailsAction',
                payload: {
                    name: name,
                    value: value,
                    isClientAdminDetails: false,
                },
            });
        }
    }
    //....CLIENT ADMIN STATUS CHANGE
    const handleStatusChange = (status) => {
        dispatch({
            type: 'setClientDetailsAction',
            payload: {
                name: "status",
                value: status,
                isClientAdminDetails: false,
            },
        });
    }
    const handleDrop = (Files) => {
        if (Files && Array.isArray(Files) && Files.length > 0) {
            let data = new FormData();
            data.append('file', Files[0]);
            setFileName(Files[0].name);
            dispatch({
                type: 'setClientLogoAction',
                file: data
            });
        }
    }
    const handleBackgroundImage = (Files) => {
        setBackgroundImageSrc(URL.createObjectURL(Files[0]))
        setBackImageName(Files[0].name);

    }
    const deleteLogo = () => {
        setFileName("")
        setDeletelogoImage(true);
        let data = ""
        dispatch({
            type: 'setClientLogoAction',
            file: null
        });
        dispatch({
            type: setClientLogoName.type,
            payload: ""
        });
    }
    const deleteImage = () => {
        setBackImageName("");
        setDeletebackgroundImage(true)
        dispatch({
            type: 'setClientBackgroundAction',
            file: null
        });
    }
    useEffect(()=>{
        dispatch({
            type: setClientLogoName.type,
            payload : fileName
        })
    },[fileName]);
    //....HANDLE NEXT ARROW FOOTER OF THE PAGES
    const handleNextArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep + 1 },
        });
    }
    //....HANDLE BACK ARROW FOOTER OF THE PAGES
    const handleBackArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep - 1 },
        });
    }
    const handleEmailPopupClose = (close) => {
        if (!close) {
            setEmailPopupOpen(false);
        }
    }

    useEffect(() => {
        var elmntToView = document.getElementById("sectionId");
        elmntToView.scrollIntoView();
    }, [activeStep]);

    //....HANDLE SAVE & CONTINUE BUTTON ACTION FOR CLIENT ADMIN AND MODULES PAGE
    const handleSaveAndContinue = (e, pageSource) => {
        if (pageSource === 'CLIENT') {
            if (pageMode === 'add') {
                dispatch({
                    type: 'postClientDetailsAction',
                    payload: {
                        clientDetails: clientDetails,
                        activeStep: activeStep,
                    },
                });
            } else {
                dispatch({
                    type: 'putClientDetailsAction',
                    payload: {
                        clientDetails: clientDetails,
                        clientId: clientId,
                        activeStep: activeStep + 1,
                    },
                });
            }
        } else if (pageSource === 'MODULES') {
            if (clientId) {
                const filterModules = modulesList.filter(
                    (x) => x.checked === true
                );
                const selectedClientModules = filterModules.map((m) => {
                    return { id: m.id }
                });
                dispatch({
                    type: 'postClientModulesAction',
                    payload: {
                        clientModules: selectedClientModules,
                        clientId: clientId,
                        activeStep: activeStep,
                    },
                });
            }
        }
    }
    //....TODO::::HANDLE CANCEL BUTTON ACTION FOR CLIENT ADMIN AND MODULES PAGE
    const handleCanceBtn = (state) => {
        const { pathname } = window.location;
        const actualPMode = pathname.replace("/client/", "") && pathname.replace("/client/", "").trim();
        if (activeStep === 0) {
            const isEmpty = (obj) => {
                for (let key in obj) {
                    if (key !== "country"
                        && key !== "status"
                        && key !== "admin" && obj[key] !== "") {
                        return false;
                    } else if (key === "admin"
                        && (
                            obj[key].firstName !== ""
                            || obj[key].middleName !== ""
                            || obj[key].lastName !== ""
                            || obj[key].mobile !== ""
                            || obj[key].email !== "")) {
                        return false;
                    }
                }
                return true;
            }
            if (isEmpty(clientDetails)) {
                history.push('/client-management');
            } else {
                if (actualPMode === "view") {
                    setPageMode('view');
                } else {
                    setShowDeletePopup(true);
                }
            }
        } else if (activeStep === 1 || activeStep === 2) {
            if (actualPMode === "view") {
                setPageMode('view');
            } else {
                setShowDeletePopup(true);
            }
        }

    }
    //....MODULES
    const handleModules = (e) => {
        const { name, checked } = e.target;
        dispatch({
            type: 'setClientModuleAction',
            payload: {
                name: name,
                checked: checked,
                isModuleCheck: true,
            },
        });
    }
    //....ACCESS PRIVILEGE
    const handleAccessPrivilegeChange = (name, status) => {
        // const { name, checked } = e.target;
        // dispatch({
        //     type: 'setClientModuleAction',
        //     payload: {
        //         name: name,
        //         checked: checked,
        //         ap: ap,
        //         isModuleCheck: false,
        //     },
        // });
        dispatch({
            type: 'setClientModuleAction',
            payload: {
                name: name,
                checked: status,
            },
        });
    }
    //.....SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        if (clientId) {
            const filterModules = modulesList.filter((x) => x.checked === true)
            const selectedClientPrivileges = filterModules.map((m) => {
                return {
                    moduleId: m.id,
                    view: m.view,
                    editTheme: m.editTheme,
                    editWorkFlow: m.editWorkFlow,
                }
            });
            selectedClientPrivileges.map((ap, i) => {
                if (!ap.view && (ap.editTheme || ap.editWorkFlow)) {
                    selectedClientPrivileges[i].view = true;
                }
                return null;
            });
            // dispatch({
            //     type: 'putClientPrivilegeAction',
            //     payload: {
            //         clientPrivilege: selectedClientPrivileges,
            //         clientId: clientId,
            //         clientGeneratedId: clientGeneratedId,
            //         activeStep: activeStep,
            //         pageMode: pageMode,
            //     },
            // });
            dispatch({
                type: 'putClientPrivilegeAction',
                payload: {
                    clientPrivilege: clientPrivilages,
                    clientId: clientId,
                    clientDetails,
                    clientGeneratedId: clientGeneratedId,
                    activeStep: activeStep,
                    pageMode: pageMode,
                },
            });
            clientOnboardTimer.current = setTimeout(() => {
                history.push('/client-management');
                dispatch({
                    type: setClientPrivilegeById.type,
                    payload: {
                        editTheme: false,
                        editWorkFlow: false
                    }
                });
            }, 3000);
        }
    }
    const handleBack = (e) => {
        history.push('/client-management');
    }
    const handleEmail = (e) => {
        clearTimeout(clientOnboardTimer.current);
        setEmailPopupOpen(!emailPopupOpen);
        dispatch({
            type: "getClientEmailTemplateAction",
            clientId: clientGeneratedId
        });
        dispatch({ type: setClientState.type, payload: { name: 'showSubmitPopUp', value: false } });
    }
    const handleEditIcon_View = (e) => {
        setPageMode('edit');
    }
    //..EVENTS (HOOKS)
    //....This is for counter state variable
    useEffect(() => {
        if (activeStep === 0) {
            setBackArrowDisabled(true);
            setNextArrowDisabled(false);
        } else if (activeStep === 1 && clientId) {
            dispatch({
                type: 'getClientModulesAction',
                payload: {
                    id: clientId
                }
            });
            setBackArrowDisabled(false);
            setNextArrowDisabled(false);
        }
        else if (activeStep === 2) {
            setNextArrowDisabled(true);
        } else {
            setBackArrowDisabled(false);
        }
    }, [activeStep])
    //..API CALL
    useEffect(() => {
        dispatch({ type: 'setInitialStateAction' });
        // dispatch({ type: 'getAllModulesAction' });
        // dispatch({ type: 'getStatesCitiesMasterAction' });
        dispatch({ type: 'getStatesDataAction'});
        //..EDIT CLIENT
        const parsedQS = queryString.parse(window.location.search);
        const { pathname } = window.location;
        setPageMode(pathname.replace("/client/", "") && pathname.replace("/client/", "").trim());
        if (parsedQS && parsedQS.id) {
            //setPageMode('Edit');
            dispatch({
                type: 'setClientIdAction',
                payload: { clientId: parsedQS.id },
            });
            //..API CALL TO FETCH SELECTED CLIENT DETAILS
            dispatch({
                type: 'getClientDetailsByIdAction',
                payload: { clientId: parsedQS.id },
            });
            //..API CALL TO FETCH SELECTED CLIENT MODULES
            // dispatch({
            //     type: 'getClientModulesByIdAction',
            //     payload: { clientId: parsedQS.id },
            // });
            dispatch({
                type: 'getClientModulesAction',
                payload: {
                    id: parsedQS.id? parsedQS.id: clientId
                }
            });
            //..API CALL TO FETCH SELECTED CLIENT PRIVILEGE
            // dispatch({
            //     type: 'getClientPrivilegeByIdAction',
            //     payload: { clientId: parsedQS.id },
            // });
        }
    }, [dispatch])
    return (
        <Grid id="sectionId">
            <div className="analytics m-sm-30">
                <div className={classes.stickyHeader}>
                    <Grid container spacing={2} justify="space-between" className="flex items-center pt-2">
                        <Grid item className="flex">
                            <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                            <h1 className="ml-10px h1">{pageMode && capitalize(pageMode)} Client</h1>
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
                    <Grid className="m-center" item xs={12} sm={12} md={6}>
                        <V5GlobalStepper
                            steps={steps}
                            activeStep={activeStep}
                            alternativeLabel={true}
                            pageMode={pageMode}
                        />

                    </Grid>
                </div>
                <Grid >
                    {/* <Grid className="m-center" item xs={12} sm={12} md={6}>
                        <V5GlobalStepper
                            steps={steps}
                            activeStep={activeStep}
                            alternativeLabel={true}
                            pageMode={pageMode}
                        />

                    </Grid> */}
                    <Grid item className="ml-9 mt-8">
                        {activeStep === 0 && (
                            <ClientDetails
                                backgroundImageSrc={backgroundImageSrc}
                                classes={classes}
                                errorState={errorState}
                                styleObj={styleObj}
                                formValues={clientDetails}
                                states={states}
                                cities={cities}
                                pageMode={pageMode}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={cancelBtnDisabled}
                                saveAndContinueBtnDisabled={
                                    saveAndContinueBtnDisabled
                                }
                                handleInputChange={handleInputChange}
                                handleStatusChange={handleStatusChange}
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={handleSaveAndContinue}
                                handleCanceBtn={handleCanceBtn}
                                handleDrop={handleDrop}
                                deleteLogo={deleteLogo}
                                deletelogoImage={deletelogoImage}
                                handleBackgroundImage={handleBackgroundImage}
                                imageError={imageError}
                                fileName={fileName}
                                backImageName={backImageName}
                                deletebackgroundImage={deletebackgroundImage}
                                deleteImage={deleteImage}
                            />
                        )}
                        {activeStep === 1 && (
                            <Modules
                                modules={clientModulesList}
                                clientId={clientId}
                                columns={3}
                                classes={classes}
                                styleObj={styleObj}
                                pageMode={pageMode}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={cancelBtnDisabled_Modules}
                                saveAndContinueBtnDisabled={
                                    saveAndContinueBtnDisabled_Modules
                                }
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={handleSaveAndContinue}
                                handleCanceBtn={handleCanceBtn}
                                handleModules={handleModules}
                                handleEmail={handleEmail}
                            />
                        )}
                        {activeStep === 2 && (
                            <AccessPrivilege
                                classes={classes}
                                pageMode={pageMode}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={cancelBtnDisabled_accessPriv}
                                submitBtnDisabled={submitBtnDisabled_accessPriv}
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={handleSaveAndContinue}
                                handleCanceBtn={handleCanceBtn}
                                modules={clientModulesList}
                                handleAccessPrivilegeChange={
                                    handleAccessPrivilegeChange
                                }
                                handleSubmit={handleSubmit}
                            />
                        )}
                        {showSubmitPopUp && (
                            <PopUp
                                popupHeading="Congratulations!"
                                popupType="success"
                                popupTitle=" Client has been onboarded successfully. Below credentials have been
                                    sent to your mail id."
                                popupButtonText="SHARE VIA MAIL"
                                handleEmail={handleEmail}
                                tableData={
                                    [
                                        {
                                            'Client ID': clientGeneratedId,
                                            Username: clientUserName,
                                            Password: clientPassword,
                                        },
                                    ]}
                            />
                        )}
                        <EmailPopUp
                            open={emailPopupOpen}
                            Close={handleEmailPopupClose}
                            clientEmailTemplate={clientEmailTemplate}
                            clientCredentialDetails={clientCredentialDetails}
                            userEmailTemplate={userEmailTemplate}
                            userCredentialDetails={userCredentialDetails}
                            isUserPopup={false}
                            isClientPopup={true}
                            isNavigateToListingPage={false}
                        />
                        <ConfirmationDialog
                            open={showDeletePopup}
                            onConfirmDialogClose={() => setShowDeletePopup(false)}
                            text="Modified data/Latest changes will be lost. Are you sure want to continue?"
                            onYesClick={handleBack}
                        />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default ClientOnboard
