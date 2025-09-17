import { createSlice } from '@reduxjs/toolkit'
import { fieldLevelValidation, isEmpty } from '../../../helper/utils'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    clientIdForUsers: localStorage.getItem('selectedClientId')
        ? localStorage.getItem('selectedClientId')
        : '',
    clientIdForUserLogo: localStorage.getItem('selectedClientLogo')
        ? localStorage.getItem('selectedClientLogo')
        : '',
    clientsList: [],
    usersList: [],
    userBasicDetails: {
        firstName: '',
        middleName: '',
        lastName: '',
        dob: null,
        contactNumber: '',
        personalEmail: '',
        gender: 'NONE',
        pan: '',
        aadharNumber: '',
        address: '',
        country: 'India',
        state: '',
        city: '',
        area: '',
        pinCode: '',
        status: 'ACTIVE',
    },
    userEmploymentDetails: {
        roles: [],
        typeOfEmployment: '',
        employeeId: '',
        joiningDate: null,
        email: '',
        status: 'ACTIVE',
        reportingManager: {
            id: '',
            name: '',
            roles: [],
        },
        referral: {
            id: '',
            name: '',
            roles: [],
        },
    },
    userBankDetails: {
        accountNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: '',
    },
    filteredMappedLocation: {},
    mappedLocations: [],
    statuses: ['ACTIVE', 'INACTIVE', 'DRAFT'],
    genders: ['MALE', 'FEMALE', 'OTHERS'],
    id: '',
    activeStep: 0,
    showSubmitPopUp: false,
    statesCitiesMasterData: [],
    states: [],
    cities: [],
    clientStores: [],
    clientStoresDetails: [],
    clientRoles: [],
    bankMaster: [],
    clientEmployees: [],
    isBasicDetailsSaved: false,
    isEmploymentDetailsSaved: false,
    isMappedLocationSaved: false,
    formBtnStates: {
        basicDetails: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
        employmentDetails: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
        mappedLocation: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
        bankDetails: {
            cancelBtnDisabled: true,
            submitBtnDisabled: true,
        },
    },
    userTableHeaders: [
        { key: 'employeeName', name: 'Emp Name', hasSorting: true },
        { key: 'employeeId', name: 'Emp ID', hasSorting: true },
        { key: 'roles', name: 'Roles', hasSorting: false, multiChipView: true, displayAssignLink: false },
        { key: 'reportingManager', name: 'Reporting Manager' },
        { key: 'gender', name: 'Gender', hasSorting: false },
        { key: 'city', name: 'City', hasSorting: true },
        // { key: "city", name: "City"},
        { key: 'status', name: 'Status' },
        { key: 'contactNumber', name: 'Contact Number', hasSorting: false, alignmentDirection: 'text-right' },
        { key: 'age', name: 'Age (Yrs)', hasSorting: false, alignmentDirection: 'text-right' },
        { key: 'mappedStores', name: 'Mapped Store', hasSorting: false, multiChipView: true },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    userCredentialDetails: {
        joiningDate: '',
        userId: '',
        username: '',
        password: '',
    },
    bulkUploadReport: {
        errors: [
            {
                message: '',
                rowId: 0,
            },
        ],
        failedRecordsCount: 0,
        message: '',
        successRecordsCount: 0,
        totalRecordsCount: 0,
    },
    siteMapUpload:{
        errors: [
            {
                message: '',
                rowId: 0,
            },
        ],
        failedRecordsCount: 0,
        message: '',
        successRecordsCount: 0,
        totalRecordsCount: 0,
    },
    showUploadComplete: false,
    showUserDetailsPopup: false,
    userFilterDetails: {
        employeeName: '',
        employeeId: '',
        reportingManager: '',
        role: '',
        gender: '',
        status: '',
        contactNumber: '',
        mappedStore: '',
        ageFrom: 0,
        ageTo: 0,
        from: null,
        to: null,
    },
    errorState: {
        userBasicDetails: {
            contactNumber: {
                error: false,
                errorMsg: 'Mobile number should contain 10 digits',
            },
            personalEmail: {
                error: false,
                errorMsg: 'Enter a valid email',
            },
            pan: {
                error: false,
                errorMsg: 'Pan number is not valid',
             
            },
            aadharNumber: {
                error: false,
                errorMsg: 'Aadhar number is not valid',
            },
            pinCode: {
                error: false,
                errorMsg: "please enter six digits only"
            }
        },
        userEmploymentDetails: {
            email: {
                error: false,
                errorMsg: 'Enter a valid email',
            },
            employeeId: {
                error: false,
                errorMsg: 'Employee Id Is Already Taken',
            },
        },
        userBankDetails: {
            ifscCode: {
                error: false,
                errorMsg: 'Enter a valid Ifsc Code',
            },
        },
    },
    usersErrorLog: [],
    userEmailTemplate: {},
    sortOptions: {
        direction: "DESC",
        sortBy: "",
    },
    loading: "start",
    test: "",
    weekDays:[
        { id: "0", name: "Monday"},
        { id: "1", name: "Tuesday"},
        { id: "2", name: "Wednesday"},
        { id: "3", name: "Thursday"},
        { id: "4", name: "Friday" },
        {id: "5",  name: "Saturday"},
        {id: "6", name: "Sunday" },
    ]
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.userBasicDetails = initialState.userBasicDetails
            state.userEmploymentDetails = initialState.userEmploymentDetails
            state.filteredMappedLocation = initialState.filteredMappedLocation
            state.mappedLocations = initialState.mappedLocations
            state.userBankDetails = initialState.userBankDetails
            state.id = initialState.id
            state.showSubmitPopUp = initialState.showSubmitPopUp
            state.activeStep = initialState.activeStep
            state.statesCitiesMasterData = initialState.statesCitiesMasterData
            state.states = initialState.states
            state.cities = initialState.cities
            state.clientStores = initialState.clientStores
            state.clientStoresDetails = initialState.clientStoresDetails
            state.clientRoles = initialState.clientRoles
            state.bankMaster = initialState.bankMaster
            state.clientEmployees = initialState.clientEmployees
            state.isBasicDetailsSaved = initialState.isBasicDetailsSaved;
            state.isEmploymentDetailsSaved = initialState.isEmploymentDetailsSaved;
            state.isMappedLocationSaved = initialState.isMappedLocationSaved;
            state.errorState = initialState.errorState
            state.formBtnStates = initialState.formBtnStates
            state.userFilterDetails = initialState.userFilterDetails
            state.sortOptions = initialState.sortOptions
            state.siteMapUpload = initialState.siteMapUpload;

        },
        setClientIdForUsers(state, action) {
            state.clientIdForUsers = action.payload.clientId
            state.clientIdForUserLogo = action.payload.clientLogoId
            localStorage.setItem('selectedClientId', action.payload.clientId)
            localStorage.setItem(
                'selectedClientLogo',
                action.payload.clientLogoId
            )
        },
        setStatesData(state, action) {
            state.states = action.payload;
        },
        setCitiesData(state, action) {
            state.cities = action.payload;
        },
        setUserCredentialDetails(state, action) {
            state.userCredentialDetails = action.payload
        },
        setShowUserDetailsPopup(state, action) {
            state.showUserDetailsPopup = action.payload
        },
        setAllUsers(state, action) {
            state.usersList = action.payload
        },
        setAllStoresByClientId(state, action) {
            state.clientStores = action.payload
        },
        setAllStoresDetailsByClientId(state, action) {
            state.clientStoresDetails = action.payload
        },
        setAllRolesByClientId(state, action) {
            state.clientRoles = action.payload
        },
        setBankMaster(state, action) {
            state.bankMaster = action.payload
        },
        setUserDetails(state, action) {
            const { name, value } = action.payload
            state.userBasicDetails[name] = value

            if (name === 'state') {
                let citiesData = initialState.cities; 
                // let statesData = state.statesCitiesMasterData
                // let citiesData = []
                // citiesData = statesData.filter((x) => x.state === value)
                // //..ARRANGE CITIES IN ASCENDING ORDER
                let sortedCities = citiesData.sort(function (a, b) {
                    var textA = a.name.toUpperCase()
                    var textB = b.name.toUpperCase()
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                })
                 state.cities = sortedCities
                // state.cities = initialState.cities
            }

            //..Validation
            let isError = false
            if (
                [
                    'personalEmail',
                    'contactNumber',
                    'aadharNumber',
                    'pan',
                    'pinCode'
                ].includes(name)
            ) {
                if (!isEmpty(value) && fieldLevelValidation(name, value)) {
                    state.errorState.userBasicDetails[name].error = true
                    isError = true
                } else {
                    state.errorState.userBasicDetails[name].error = false
                    isError = false
                }
            }

            if (state.errorState.userBasicDetails.personalEmail.error
                || state.errorState.userBasicDetails.contactNumber.error
                || state.errorState.userBasicDetails.aadharNumber.error
                || state.errorState.userBasicDetails.pan.error) {
                isError = true;
            }

            if (
                state.userBasicDetails.firstName &&
                state.userBasicDetails.lastName &&
                state.userBasicDetails.dob &&
                state.userBasicDetails.contactNumber?.match(/^[1-9][0-9]*$/gm) &&
                !isError
            ) {
                state.formBtnStates.basicDetails.saveAndContinueBtnDisabled = false
                state.formBtnStates.basicDetails.cancelBtnDisabled = false
            } else {
                state.formBtnStates.basicDetails.saveAndContinueBtnDisabled = true
                state.formBtnStates.basicDetails.cancelBtnDisabled = true
            }
        },
        setUserEmploymentDetails(state, action) {
            const { name, value, objSource } = action.payload
            if (objSource === 'reportingManager' || objSource === 'referral') {
                if (state.userEmploymentDetails[objSource] === null) {
                    let reportingManager = {
                        id: '',
                        name: '',
                        roles: [],
                    }
                    reportingManager[name] = value;
                    state.userEmploymentDetails[objSource] = reportingManager;
                } else {
                    state.userEmploymentDetails[objSource][name] = value
                }
            } else {
                state.userEmploymentDetails[name] = value
            }

            //..Validation
            let isError = false
            if (['email'].includes(name)) {
                if (!isEmpty(value) && fieldLevelValidation(name, value)) {
                    state.errorState.userEmploymentDetails[name].error = true
                    isError = true
                } else {
                    state.errorState.userEmploymentDetails[name].error = false
                    isError = false
                }
            }
            //..Check If Emp Id has already taken           
            let isEmpIdExist = state.usersList.data?.findIndex((user) => user.employeeId === value);
            if (name === "employeeId" && isEmpIdExist !== -1 && isEmpIdExist !== undefined) {
                state.errorState.userEmploymentDetails[name].error = true;
                isError = true;
            } else if ((name === "employeeId" && isEmpIdExist === -1) || (name === "employeeId" && isEmpIdExist === undefined)) {
                state.errorState.userEmploymentDetails[name].error = false;
                isError = false;
            }

            if (state.errorState.userEmploymentDetails.email.error
                || state.errorState.userEmploymentDetails.employeeId.error
            ) {
                isError = true;
            }

            if (
                state.userEmploymentDetails.roles &&
                state.userEmploymentDetails.typeOfEmployment &&
                state.userEmploymentDetails.joiningDate &&
                state.userEmploymentDetails.employeeId &&
                !isError
            ) {
                state.formBtnStates.employmentDetails.saveAndContinueBtnDisabled = false
                state.formBtnStates.employmentDetails.cancelBtnDisabled = false
            } else {
                state.formBtnStates.employmentDetails.saveAndContinueBtnDisabled = true
                state.formBtnStates.employmentDetails.cancelBtnDisabled = true
            }
        },
        setUserBankDetails(state, action) {
            const { name, value } = action.payload
            state.userBankDetails[name] = value
            //..Validation
            let isError = false
            if (['ifscCode'].includes(name)) {
                if (!isEmpty(value) && fieldLevelValidation(name, value)) {
                    state.errorState.userBankDetails[name].error = true
                    isError = true
                } else {
                    state.errorState.userBankDetails[name].error = false
                    isError = false
                }
            }

            if (state.userBankDetails.bankName) {
                state.formBtnStates.bankDetails.submitBtnDisabled = false
                state.formBtnStates.bankDetails.cancelBtnDisabled = false
            } else {
                state.formBtnStates.bankDetails.submitBtnDisabled = true
                state.formBtnStates.bankDetails.cancelBtnDisabled = true
            }
        },
        setEmpReportingReferralDetails(state, action) {
            const { value, objSource } = action.payload
            const emp = state.clientEmployees.find((x) => x.userId === value)
            state.test = emp
            if (
                emp &&
                (objSource === 'reportingManager' || objSource === 'referral')
            ) {
                state.userEmploymentDetails[objSource].name = emp.employeeName
                state.userEmploymentDetails[objSource].roles = emp.roles
            } else if (!emp &&
                (objSource === 'reportingManager' || objSource === 'referral')) {
                state.userEmploymentDetails[objSource].name = ""
                state.userEmploymentDetails[objSource].roles = []
            }
        },
        setSelectedMappedLocation(state, action) {
            state.filteredMappedLocation = action.payload
            let hasDuplicateLocation = false;
            state.mappedLocations.forEach((location) => {
                if (JSON.stringify(location.id) === JSON.stringify(action.payload.id)) {
                    hasDuplicateLocation = true;
                }
            });
            if (!hasDuplicateLocation) {
                state.formBtnStates.mappedLocation.saveAndContinueBtnDisabled = false
                state.formBtnStates.mappedLocation.cancelBtnDisabled = false
            } else {
                state.formBtnStates.mappedLocation.saveAndContinueBtnDisabled = true
                state.formBtnStates.mappedLocation.cancelBtnDisabled = true
            }
        },
        setFilteredLocationEmpty(state, action) {
            state.filteredMappedLocation = {}
        },
        setMappedLocationDetails(state, action) {
            const { filtredLocation } = action.payload
            if (filtredLocation && !Array.isArray(filtredLocation)) {
                state.mappedLocations.unshift(filtredLocation)
            }
            if (Array.isArray(filtredLocation)) {
                state.mappedLocations = filtredLocation
            }
            if (
                state.mappedLocations.length > 0 ||
                filtredLocation.length > 0
            ) { 
                state.formBtnStates.mappedLocation.saveAndContinueBtnDisabled = false
                state.formBtnStates.mappedLocation.cancelBtnDisabled = false
            } else {
                state.formBtnStates.mappedLocation.saveAndContinueBtnDisabled = true
                state.formBtnStates.mappedLocation.cancelBtnDisabled = true
            }
        },

        setMappedLocationState(state, action) {
            state.mappedLocations = action.payload
        },
        setBankDetailsState(state, action) {
            state.userBankDetails = action.payload
        },
        // setAllStates(state, action) {
        //     let states = []
        //     state.statesCitiesMasterData.forEach(function (item) {
        //         var i = states.findIndex((x) => x.state === item.state)
        //         if (i <= -1) {
        //             states.push(item)
        //         }
        //     })
        //     //..ARRANGE STATES IN ASCENDING ORDER
        //     let sortedState = states.sort(function (a, b) {
        //         var textA = a.state.toUpperCase()
        //         var textB = b.state.toUpperCase()
        //         return textA < textB ? -1 : textA > textB ? 1 : 0
        //     })
        //     state.states = sortedState
        // },
        // setAllCitiesByState(state, action) {
        //     let statesData = state.statesCitiesMasterData
        //     let citiesData = []
        //     citiesData = statesData.filter(
        //         (x) => x.state === state.userBasicDetails.state
        //     )

        //     //..ARRANGE STATES IN ASCENDING ORDER
        //     let sortedCities = citiesData.sort(function (a, b) {
        //         var textA = a.name.toUpperCase()
        //         var textB = b.name.toUpperCase()
        //         return textA < textB ? -1 : textA > textB ? 1 : 0
        //     })
        //     state.cities = sortedCities
        // },
        setUserState(state, action) {
            const { name, value } = action.payload
            state[name] = value
        },
        setUsersErrorLog(state, action) {
            const { errors } = action.payload
            state.usersErrorLog = errors
        },
        setUserFilterDetails(state, action) {
            state.userFilterDetails = action.payload
        },
        setFormBtnState(state, action) {
            const { formName } = action.payload
            if (formName === 'basicDetails') {
                if (
                    state.userBasicDetails.firstName &&
                    state.userBasicDetails.lastName &&
                    state.userBasicDetails.dob &&
                    state.userBasicDetails.contactNumber
                ) {
                    state.formBtnStates.basicDetails.saveAndContinueBtnDisabled = false
                    state.formBtnStates.basicDetails.cancelBtnDisabled = false
                } else {
                    state.formBtnStates.basicDetails.saveAndContinueBtnDisabled = true
                    state.formBtnStates.basicDetails.cancelBtnDisabled = true
                }
            }
        },

        setPageNumber(state, action) {
            state.pageNumber = action.payload
        },
        setPageSize(state, action) {
            state.pageSize = action.payload
        },
        getUserEmailTemplate(state, action) {
            state.userEmailTemplate = action.payload
        },
        setUserSortOptions(state, action) {
            state.sortOptions = action.payload
        },
        setLoader(state, action) {
            state.loading = action.payload;
        },
    },
})

export default userInfoSlice.reducer

// Actions
export const {
    setAllUsers,
    setInitialState,
    setAllStoresByClientId,
    setAllRolesByClientId,
    setBankMaster,
    setUserDetails,
    setUserEmploymentDetails,
    setUserBankDetails,
    setBankDetailsState,
    setEmpReportingReferralDetails,
    setSelectedMappedLocation,
    setMappedLocationDetails,
    setMappedLocationState,
    setUserFilterDetails,
    setStatesData,
    setCitiesData,
    //setAllStates,
    //setAllCitiesByState,
    setUserState,
    setFormBtnState,
    setUserCredentialDetails,
    setShowUserDetailsPopup,
    setClientIdForUsers,
    startLoading,
    endLoading,
    setPageNumber,
    setPageSize,
    setUsersErrorLog,
    getUserEmailTemplate,
    setUserSortOptions,
    setAllStoresDetailsByClientId,
    setLoader,
    setFilteredLocationEmpty
} = userInfoSlice.actions
