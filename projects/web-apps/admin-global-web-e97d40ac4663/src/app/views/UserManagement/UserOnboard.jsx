
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { V5GlobalStepper, PopUp, EmailPopUp } from '../../components';
import history from 'helper/history.js';
import queryString from 'query-string';
import BasicDetails from './components/UserOnboard/BasicDetails';
import MappedLocation from './components/UserOnboard/MappedLocation';
import StatesCitiesMaster from '../ClientManagment/components/ClientOnboard/states-cities.json';
import BankDetails from './components/UserOnboard/BankDetails';
import EmploymentDetails from './components/UserOnboard/EmploymentDetails';
import { capitalize } from '../../../helper/utils';
import { format } from 'date-fns';
import { convertDate } from 'app/views/utilities/DateFormat';
import { setUserState } from '../../redux/UserManagement/userManagementSlice';

//..Functions
//....USER ONBOARD STEPS
function getSteps() {
    return [
        'Basic Details',
        'Employment Details',
        'Mapped Location',
        'Bank Details',
    ]
};

const useStyles = makeStyles((theme) => ({

    stickyHeader: {
        position: "sticky",
        top: "0rem",
        backgroundColor: "#f5f5f5",
        zIndex: "100",
        paddingTop: "1rem"
    }
}));

//....VALIDATE USER BASIC DETAILS INPUT VALUES
function validateUserBasicDetailsInput(fieldName, fieldValue) {
    let isValid = false;
    const regexOnlyAlphabetsWithSpaces = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    const onlyNumbersRegex = /^[0-9\b]+$/;
    const alphanumericWithSC = /^[A-Za-z0-9\s-,#]+$/;
    const alphaNumericRegx = /^[a-z0-9]+$/gi;
    switch (fieldName) {
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
        case 'branchName':
            //..Allow Alphabets only
            if (
                fieldValue === '' ||
                fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
            ) {
                isValid = true;
            }
            break;
        case 'accountNumber':
            if (fieldValue === '' || fieldValue.trim().match(onlyNumbersRegex)) {
                isValid = true;
            }
            break;
        case 'pinCode':
        case 'contactNumber':
            //..Allow Numeric only
            if (fieldValue === '' || fieldValue.trim().match(onlyNumbersRegex)) {
                isValid = true;
            }
            break;
        case 'employeeId':
            //..Allow alphanumeric Only
            if (fieldValue === '' || fieldValue.trim().match(alphaNumericRegx)) {
                isValid = true;
            }
            break;
        default:
            isValid = true;
            break;
    }
    return isValid;
}

const UserOnboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        userBasicDetails,
        userEmploymentDetails,
        mappedLocations,
        userBankDetails,
        filteredMappedLocation,
        id,
        clientIdForUsers,
        activeStep,
        formBtnStates,
        states,
        cities,
        errorState,
        showSubmitPopUp,
        userCredentialDetails,
        userEmailTemplate,
        clientIdForUserLogo,
        clientRoles
    } = useSelector((state) => state.users);
    const { clientEmailTemplate, clientCredentialDetails } = useSelector((state) => state.clients);

    //....STYLE CONSTANTS
    const styleObj = {
        textFieldWidth: 'w-full',
    };
    //....LOCAL STATES
    const [pageMode, setPageMode] = React.useState('');
    // const [citiesOnSelectedState, setCitiesOnSelectedState] = React.useState([]);
    const [backArrowDisabled, setBackArrowDisabled] = React.useState(true);
    const [nextArrowDisabled, setNextArrowDisabled] = React.useState(false);
    // const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [emailPopupOpen, setEmailPopupOpen] = useState(false);
    const userOnboardTimer = useRef(null);

    //....LOCAL VARIABLE

    const steps = getSteps();

    const genders = [
        { id: 1, name: 'MALE' },
        { id: 2, name: 'FEMALE' },
        { id: 3, name: 'OTHERS' }
    ];

    const pageSource = {
        BASIC: 'BASIC',
        EMPLOYMENT: 'EMPLOYMENT',
        MAPPED: 'MAPPED',
        BANK: 'BANK'
    }

    //..HANDLERS
    const handleInputChange = (e, form) => {
        const { name, value } = e.target;
        if (!validateUserBasicDetailsInput(name, value)) return;

        if (form === "employmentForm") {
            dispatch({
                type: 'setUserEmploymentDetailsAction',
                payload: {
                    name: name,
                    value: value,

                },
            });
        } else {
            dispatch({
                type: 'setUserDetailsAction',
                payload: {
                    name: name,
                    value: value,

                },
            });
        }

        // if (name == 'state') {
        //     let statesData = StatesCitiesMaster;
        //     let citiesData = [];
        //     citiesData = statesData.filter((x) => x.state == value);
        //     setCitiesOnSelectedState(citiesData);
        // }
    }
    const handleEmploymentInputChange = (e, objSource, status) => {
        const { name, value,
            //innerText 
        } = e.target;

        if (!validateUserBasicDetailsInput(name, value)) return;
        if (status) {
            dispatch({
                type: 'setUserEmploymentDetailsAction',
                payload: {
                    name: "status",
                    value: status,
                    objSource: objSource
                },
            });
        }
        dispatch({
            type: 'setUserEmploymentDetailsAction',
            payload: {
                name: name,
                value: value,
                objSource: objSource
            },
        });
    }
    const handleBankInputChange = (e, objSource) => {
        const { name, value } = e.target;
        if (!validateUserBasicDetailsInput(name, value)) return
        dispatch({
            type: 'setUserBankDetailsAction',
            payload: {
                name: name,
                value: value
            },
        });
    }
    const handleDate = (selectedDate, fieldName, page) => {
        // let dateSelected = convertDate(selectedDate)
        if (page === pageSource.BASIC) {
            dispatch({
                type: 'setUserDetailsAction',
                payload: {
                    name: fieldName,
                    value: selectedDate
                },
            });
        } else if (page === pageSource.EMPLOYMENT) {
            dispatch({
                type: 'setUserEmploymentDetailsAction',
                payload: {
                    name: fieldName,
                    value: selectedDate
                },
            });
        }
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
    //....USER BASIC DETAILS STATUS CHANGE
    // const handleStatusChange = (e) => {
    //     const { name, checked } = e.target;
    //     const status = checked ? 'ACTIVE' : 'INACTIVE';
    //     dispatch({
    //         type: 'setUserDetailsAction',
    //         payload: {
    //             name: name,
    //             value: status,

    //         },
    //     });
    // }
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
    //....HANDLE SAVE & CONTINUE BUTTON ACTION FOR CLIENT ADMIN AND MODULES PAGE
    const handleSaveAndContinue = (e, page) => {
        if (page === pageSource.BASIC) {
            const data = { ...userBasicDetails };
            try {
                data.dob = format(data.dob, "dd-MM-yyyy");
            } catch (ex) { }
            if (pageMode === 'add') {
                dispatch({
                    type: 'postUserBasicDetailsByClientIdAction',
                    payload: {
                        clientId: clientIdForUsers,
                        userBasicDetails: data,
                        activeStep: activeStep,
                    },
                });
            } else {
                dispatch({
                    type: 'putUserBasicDetailsByIdAction',
                    payload: {
                        userBasicDetails: data,
                        id: id,
                        activeStep: activeStep,
                    },
                });
            }
        } else if (page === pageSource.EMPLOYMENT) {
            const data = { ...userEmploymentDetails };
            try {
                data.joiningDate = format(data.joiningDate, "dd-MM-yyyy");
            } catch (ex) { }
            dispatch({
                type: 'putUserEmployeeDetailsByIdAction',
                payload: {
                    userEmploymentDetails: data,
                    id: id,
                    activeStep: activeStep,
                    roles: clientRoles
                },
            });
        } else if (page === pageSource.MAPPED) {

            let hasDuplicateLocation = false;
            let mappedLocationsCopy = [...mappedLocations];
            mappedLocations.map((location) => {
                if (JSON.stringify(location) === JSON.stringify(filteredMappedLocation)) {
                    hasDuplicateLocation = true;
                }
                return location;
            });

                mappedLocationsCopy.push(filteredMappedLocation)
                dispatch({
                    type: 'putUserLocationDetailsByIdAction',
                    payload: {
                        mappedLocations: mappedLocationsCopy,
                        id: id,
                        activeStep: activeStep,
                    },
                })

        }
    }
    //.....SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'putUserBankDetailsByIdAction',
            payload: {
                userBankDetails: userBankDetails,
                id: id,
                userId: userEmploymentDetails.userId,
                employeeId: userEmploymentDetails.employeeId,
                pageMode: pageMode,
                empName: `${userBasicDetails.firstName} ${userBasicDetails.middleName} ${userBasicDetails.lastName}`
            },
        });

        userOnboardTimer.current = setTimeout(() => {
            history.push('/user-management')
        }, 3000);
    }
    //....TODO::::HANDLE CANCEL BUTTON ACTION FOR CLIENT ADMIN AND MODULES PAGE
    const handleCanceBtn = (state) => {
        const { pathname } = window.location;
        const actualPMode = pathname.replace("/user/", "") && pathname.replace("/user/", "").trim();
        //..TODO::WILL CONFIRM ON CANCEL STATE AND THE IMPLEMENT
        // if (activeStep == 0) {
        //     const isEmpty = (obj) => {
        //         for (let key in obj) {
        //             if (
        //                 key !== 'country' &&
        //                 key !== 'status' &&
        //                 key !== 'admin' &&
        //                 obj[key] !== ''
        //             ) {
        //                 return false;
        //             } else if (
        //                 key == 'admin' &&
        //                 (obj[key].firstName !== '' ||
        //                     obj[key].middleName !== '' ||
        //                     obj[key].lastName !== '' ||
        //                     obj[key].mobile !== '' ||
        //                     obj[key].email !== '')
        //             ) {
        //                 return false;
        //             }
        //         }
        //         return true;
        //     }
        //     if (isEmpty(userBasicDetails)) {
        //         history.push('/user-management');

        //     } else {
        //         setShowDeletePopup(true);
        //     }
        // } else if (activeStep == 1 || activeStep == 2) {
        //     setShowDeletePopup(true);
        // }

        if (actualPMode === "view") {
            setPageMode('view');
        } else {
            history.push('/user-management');
        }
    }

    const handleBack = (e) => {
        history.push('/user-management');
    }
    const handleEmail = (e) => {
        clearTimeout(userOnboardTimer.current);
        setEmailPopupOpen(!emailPopupOpen);
        dispatch({
            type: "getUserEmailTemplateAction",
            userId: id
        });
        dispatch({ type: setUserState.type, payload: { name: 'showSubmitPopUp', value: false } });
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
        } else if (activeStep === 1) {
            setBackArrowDisabled(false);
            setNextArrowDisabled(false);
        } else if (activeStep === 2) {
            setBackArrowDisabled(false);
            setNextArrowDisabled(false);
        }
        else if (activeStep === 3) {
            setNextArrowDisabled(true);
        } else {
            setBackArrowDisabled(false);
        }
    }, [activeStep])

    // useEffect(() => {
    //     if (StatesCitiesMaster && StatesCitiesMaster.length) {
    //         StatesCitiesMaster.filter(
    //             (x) => x.name === userBasicDetails.city
    //         )
    //     }
    //     // if (cityInfo) {
    //     //     setCitiesOnSelectedState(cityInfo);
    //     // }
    // }, [userBasicDetails.city])
    useEffect(()=>{
        dispatch({ type: 'getCitiesByStateDataAction', payload: userBasicDetails.state})
    },[userBasicDetails.state])
    //..API CALL
    useEffect(() => {
        //..SETTING UP INITIAL STATE
        dispatch({ type: 'setInitialStateAction' });
        //..API CALL TO GET STORES DATA BY CLIENT ID
        dispatch({ type: 'getAllStoresByClientIdAction', payload: { clientId: clientIdForUsers } });
        //..API CALL TO GET ROLES MASTER DATA BY CLIENT ID
        dispatch({ type: 'getAllRolesByClientIdAction', payload: { clientId: clientIdForUserLogo } });
        //..API CALL TO GET BANKS MASTER DATA
        dispatch({ type: 'getBankMasterAction' });
        //..API CALL TO GET AND SET STATES CITIES MASTER DATA
        dispatch({ type: 'getStatesDataAction' })
        // dispatch({ type: 'getStatesCitiesMasterAction' });
        //..GET All USERS BY CLIENT ID
        dispatch({ type: 'getAllUsersByClientIdAction', payload: { clientId: clientIdForUsers } });
        //..EDIT USER
        const parsedQS = queryString.parse(window.location.search);
        const { pathname } = window.location;
        setPageMode(pathname.replace("/user/", "") && pathname.replace("/user/", "").trim());
        if (parsedQS && parsedQS.id) {
            dispatch({
                type: 'setUserIdAction',
                payload: { id: parsedQS.id },
            });
            //..GET SELECTED USER DETAILS            
            dispatch({
                type: 'getUserBasicDetailsByIdAction',
                payload: { id: parsedQS.id },
            });
            //..GET USER BANK DETAILS            
            dispatch({
                type: 'getUserBankDetailsByIdAction',
                payload: { id: parsedQS.id },
            });
            //..GET USER EMPLOYEE DETAILS            
            dispatch({
                type: 'getUserEmployeeDetailsByIdAction',
                payload: { id: parsedQS.id },
            });
            //..GET USER LOCATION DETAILS
            dispatch({
                type: 'getUserLocationDetailsByIdAction',
                payload: { id: parsedQS.id }
            });
        }
    }, [dispatch])
    return (
        <Grid id="sectionId">
            <div className="analytics m-sm-30">
                <div className={classes.stickyHeader}>
                    <Grid container spacing={2} justify="space-between" className="flex items-center pt-2">
                        <Grid item className="flex">
                            <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                            <h1 className="ml-10px">{pageMode && capitalize(pageMode)} User</h1>
                        </Grid>
                        {
                            pageMode === "view" && (
                                <Grid item>
                                    <EditIcon
                                        className="cursor-pointer text-light-gray mt-7"
                                        fontSize="small"
                                        onClick={handleEditIcon_View}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid item className="m-center" xs={12} sm={12} md={8}>
                        <V5GlobalStepper
                            steps={steps}
                            activeStep={activeStep}
                            alternativeLabel={true}
                            pageMode={pageMode}
                        />
                    </Grid>
                </div>
                <Grid>

                    <Grid item className="ml-9 mt-8">
                        {activeStep === 0 && (
                            <BasicDetails
                                classes={classes}
                                pageSource={pageSource}
                                styleObj={styleObj}
                                formValues={userBasicDetails}
                                errorState={errorState}
                                StatesCitiesMaster={StatesCitiesMaster}
                                states={states}
                                cities={cities}
                                pageMode={pageMode}
                                genders={genders}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={formBtnStates.basicDetails.cancelBtnDisabled}
                                saveAndContinueBtnDisabled={
                                    formBtnStates.basicDetails.saveAndContinueBtnDisabled
                                }
                                handleInputChange={handleInputChange}
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={handleSaveAndContinue}
                                handleCanceBtn={handleCanceBtn}
                                handleDate={handleDate}
                            />
                        )}
                        {activeStep === 1 && (
                            <EmploymentDetails
                                styleObj={styleObj}
                                pageSource={pageSource}
                                pageMode={pageMode}
                                errorState={errorState}
                                formValues={userEmploymentDetails}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={formBtnStates.employmentDetails.cancelBtnDisabled}
                                saveAndContinueBtnDisabled={
                                    formBtnStates.employmentDetails.saveAndContinueBtnDisabled
                                }
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={handleSaveAndContinue}
                                handleCanceBtn={handleCanceBtn}
                                handleEmploymentInputChange={handleEmploymentInputChange}
                                handleDate={handleDate}
                            />
                        )}
                        {activeStep === 2 && <MappedLocation
                            pageSource={pageSource}
                            pageMode={pageMode}
                            backArrowDisabled={backArrowDisabled}
                            nextArrowDisabled={nextArrowDisabled}
                            cancelBtnDisabled={formBtnStates.mappedLocation.cancelBtnDisabled}
                            saveAndContinueBtnDisabled={
                                formBtnStates.mappedLocation.saveAndContinueBtnDisabled
                            }
                            handleNextArrow={handleNextArrow}
                            handleBackArrow={handleBackArrow}
                            handleSaveAndContinue={handleSaveAndContinue}
                            handleCanceBtn={handleCanceBtn}
                        />}
                        {activeStep === 3 && <BankDetails
                            pageSource={pageSource}
                            pageMode={pageMode}
                            errorState={errorState}
                            backArrowDisabled={backArrowDisabled}
                            nextArrowDisabled={nextArrowDisabled}
                            cancelBtnDisabled={formBtnStates.bankDetails.cancelBtnDisabled}
                            saveAndContinueBtnDisabled={
                                formBtnStates.bankDetails.saveAndContinueBtnDisabled
                            }
                            handleNextArrow={handleNextArrow}
                            handleBackArrow={handleBackArrow}
                            handleSaveAndContinue={handleSaveAndContinue}
                            handleSubmit={handleSubmit}
                            handleCanceBtn={handleCanceBtn}
                            handleInputChange={handleBankInputChange}
                        />}
                        {showSubmitPopUp && (
                            <PopUp
                                popupHeading="Congratulations!"
                                popupType="success"
                                popupTitle=" User has been onboarded successfully. Below credentials have been
                                    sent to your mail id."
                                popupButtonText="SHARE VIA MAIL"
                                handleEmail={handleEmail}
                                tableData={
                                    [
                                        {
                                            'Joining Date': convertDate(userCredentialDetails.joiningDate),
                                            'User ID': userCredentialDetails.empId,
                                            Username: userCredentialDetails.username,
                                            Password: userCredentialDetails.password,
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
                            isUserPopup={true}
                            isClientPopup={false}
                            isNavigateToListingPage={true}
                        />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default UserOnboard
