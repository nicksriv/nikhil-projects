import { createSlice } from '@reduxjs/toolkit';
import { fieldLevelValidation, isEmpty } from 'helper/utils';

var initialState = {
    pageNumber: 0,
    siteTableHeaders: [
        { key: "siteId", name: "Site ID", singleChipView: true },
        { key: "siteName", name: "Site Name" },
        { key: "type", name: "Site Type" },
        { key: "contactNumber", name: "Contact Number", alignmentDirection: 'text-right', hasSorting: false },
        { key: "email", name: "Site Email", hasSorting: false },
        { key: "state", name: "State" },
        { key: "city", name: "City" },
        { key: "managers", name: 'Site Manager Names', multiChipView: true },
        { key: "status", name: "Status" },
        { key: "actionHeader", icon: "more_vert", alignIcon: 'float-right pr-5' }
    ],
    siteList: [],
    loading: "start",
    siteFilterDetails: {
        siteId : "",
        name: "",
        type: "",
        state:"",
        city:"",
        status: "",
        from: null,
        to: null
    },
    showUploadComplete: false,
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
    siteDetails: {
        address: "",
        area: "",
        city: "",
        clientId: localStorage.getItem('selectedClientId')
            ? localStorage.getItem('selectedClientId')
            : '',
        country: "India",
        email: "",
        latitude: 0,
        longitude: 0,
        managers: [],
        name: "",
        phone: "",
        pin: "",
        siteId: "",
        state: "",
        status: "",
        type: ""
    },
    errorState: {
        siteBasicDetails: {
            phone: {
                error: false,
                errorMsg: 'Mobile number should contain 10 digits',
            },
            email: {
                error: false,
                errorMsg: 'Enter a valid email',
            },
            pin: {
                error: false,
                errorMsg: 'please enter six digits only',
            },
            siteId: {
                error: false,
                errorMsg: 'Site already exists',   
            }
        },
    },
    statuses: ['ACTIVE', 'INACTIVE'],
    types: ['RETAILERS', 'WHOLESALE', 'WAREHOUSE'],
    states: [],
    cities: [],
    sitesErrorLog: [],
    managers: [],
    currentManager: {
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        mobile: ''
    },
    siteManagers: [],
    statesCitiesMasterData: [],
    saveAndContinueBtnDisabled: true,
    sortOptions: {
        direction: "DESC",
        sortBy: "",
    }
}

const siteInfoSlice = createSlice({
    name: 'siteInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.siteList = initialState.siteList;
            state.managers = initialState.managers;
            state.siteDetails = initialState.siteDetails;
            state.errorState = initialState.errorState;
            state.sortOptions = initialState.sortOptions;
            state.bulkUploadReport = initialState.bulkUploadReport;
            state.showUploadComplete = initialState.showUploadComplete
        },
        setStatesData(state, action) {
            state.states = action.payload;
        },
        setCitiesData(state, action) {
            state.cities = action.payload;
        },
        getAllSitesData(state, action) {
            state.siteList = action.payload;
        },
        setLoader(state, action) {
            state.loading = action.payload;
        },
        setSiteState(state, action) {
            const { name, value } = action.payload
            state[name] = value
        },
        setManagerDetails(state, action) {
            state.currentManager = action.payload;
        },
        setManagers(state, action) {

            let contains;
            if (action.payload.payload.pageMode === "add") {

                contains = state.managers.some(elem => {
                    return JSON.stringify(action.payload.payload.currentManager) === JSON.stringify(elem);
                });
            } else {
                contains = state.siteDetails.managers.some(elem => {
                    return JSON.stringify(action.payload.payload.currentManager) === JSON.stringify(elem);
                });
            }
            if (!contains) {
                if (action.payload.payload.pageMode === "add") {
                    state.managers.push(action.payload.payload.currentManager);
                } else {
                    state.siteDetails.managers.push(action.payload.payload.currentManager)
                }

            }
        },
        setListOfSiteManager(state, action) {
            const { empId } = action.payload;
            state.siteManagers.push(empId)
        },
        deleteManagerDetails(state, action) {
            const { payload } = action.payload;
            state.managers = payload;
            state.siteDetails.managers = payload;
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
        //     state.states = sortedState;
        // },
        // setAllCitiesByState(state, action) {
        //     let statesData = state.statesCitiesMasterData
        //     let citiesData = []
        //     citiesData = statesData.filter(
        //         (x) => x.state === state.siteDetails.state
        //     )
        //     //..ARRANGE STATES IN ASCENDING ORDER
        //     let sortedCities = citiesData.sort(function (a, b) {
        //         var textA = a.name.toUpperCase()
        //         var textB = b.name.toUpperCase()
        //         return textA < textB ? -1 : textA > textB ? 1 : 0
        //     })
        //     state.cities = sortedCities
        // },
        resetCurrentManager(state, action) {
            const { payload } = action.payload;
            state.currentManager = payload;
        },
        setSiteFormValues(state, action) {
            const { name, value } = action.payload;
            if (name === "managers") {
                state.siteDetails[name].push(value);
                state.siteManagers.push(value);
            } else {
                state.siteDetails[name] = value;
            }
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
                //state.cities = initialState.cities
            }
            //..Validation
            let isError = false
            if (['email', 'phone', 'pin'].includes(name)) {
                if (!isEmpty(value) && fieldLevelValidation(name, value)) {
                    state.errorState.siteBasicDetails[name].error = true
                    isError = true
                } else {
                    state.errorState.siteBasicDetails[name].error = false
                    isError = false
                }
            }
            let isSiteIdExist = state.siteList.data?.findIndex((site) => site.siteId === value);
            if (name === "siteId" && isSiteIdExist !== -1 && isSiteIdExist !== undefined) {
                state.errorState.siteBasicDetails[name].error = true;
                isError = true;
            } else if ((name === "siteId" && isSiteIdExist === -1) || (name === "siteId" && isSiteIdExist === undefined)) {
                state.errorState.siteBasicDetails[name].error = false;
                isError = false;
            }
            if (state.errorState.siteBasicDetails.email.error
                || state.errorState.siteBasicDetails.phone.error) {
                isError = true;
            }
            if (state.siteDetails.name &&
                state.siteDetails.phone?.match(/^[1-9][0-9]*$/gm)
                && state.siteDetails.state &&
                state.siteDetails.city && state.siteDetails.siteId && !isError) {
                state.saveAndContinueBtnDisabled = false;
            } else {
                state.saveAndContinueBtnDisabled = true;  
            }
        },
        // setFilterCities(state, action) {
        //     const State = action.payload;
        //     let statesData = state.statesCitiesMasterData
        //     let citiesData = []
        //     citiesData = statesData.filter((x) => x.state === State)
        //     //..ARRANGE CITIES IN ASCENDING ORDER
        //     let sortedCities = citiesData.sort(function (a, b) {
        //         var textA = a.name.toUpperCase()
        //         var textB = b.name.toUpperCase()
        //         return textA < textB ? -1 : textA > textB ? 1 : 0
        //     })
        //     state.cities = sortedCities
        // },
        setFetchedSiteDetails(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
        },
        setSiteFilterDetails(state, action) {
            state.siteFilterDetails = action.payload
        },
        setUploadState(state, action) {
            const { name, value } = action.payload
            state[name] = value
        },
        setSiteErrorLog(state, action) {
            const { errors } = action.payload
            state.sitesErrorLog = errors
        },
        setSiteSortOptions(state, action) {
            state.sortOptions = action.payload
        }
    },
});

export default siteInfoSlice.reducer;

// Actions
export const {
    setInitialState,
    setStatesData,
    setCitiesData,
    //setFilterCities,
    //setAllCitiesByState,
    getAllSitesData,
    setSiteFormValues,
    //setAllStates,
    setSiteState,
    setManagerDetails,
    setListOfSiteManager,
    deleteManagerDetails,
    resetCurrentManager,
    setManagers,
    setFetchedSiteDetails,
    setSiteFilterDetails,
    setUploadState,
    setSiteErrorLog,
    setSiteSortOptions,
    setLoader
} = siteInfoSlice.actions;
