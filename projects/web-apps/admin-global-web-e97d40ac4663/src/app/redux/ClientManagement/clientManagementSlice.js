import { createSlice } from '@reduxjs/toolkit';
import { fieldLevelValidation, isEmpty } from '../../../helper/utils';

var initialState = {
  clientsList: [],
  activeClientsList: [],
  loading: "start",
  selectedClientLogo: '',
  modulesList: [],
  clientDetails: {
    clientId: "",
    clientName: "",
    headOfficeName: "",
    // uploadLogo:"",
    address: "",
    state: "",
    city: "",
    area: "",
    country: "India",
    logoId: "",
    backgroundImageId:"",
    opacity: null,
    pinCode: '',
    status: 'ACTIVE',
    admin: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobile: "",
      email: ""
    }
  },
  assignQualityAssurances:[],
  errorState: {
    clientDetails: {
      mobile: {
        error: false,
        errorMsg: "Mobile number should contain 10 digits"
      },
      email: {
        error: false,
        errorMsg: "Enter a valid email"
      },
      clientName: {
        error: false,
        errorMsg: "Name should be at least 3 characters long"
      },
      pinCode: {
        error: false,
        errorMsg: "please enter six digits only"
      }

    }
  },
  activeStep: 0,
  clientModules: [],
  clientPrivilege: [],
  clientPrivilages: {
    editTheme: false,
    editWorkFlow: false
  },
  //statesCitiesMasterData: [],
  states: [],
  cities: [],
  clientId: '',
  clientGeneratedId: '',
  clientUserName: '',
  clientPassword: '',
  clientCreatedMessage: '',
  clientModulesCreatedMessage: '',
  clientPrivilegeCreatedMessage: '',
  cancelBtnDisabled: true,
  saveAndContinueBtnDisabled: true,
  cancelBtnDisabled_Modules: true,
  saveAndContinueBtnDisabled_Modules: true,
  cancelBtnDisabled_accessPriv: true,
  submitBtnDisabled_accessPriv: true,
  clientTableHeaders: [
    { key: "clientName", name: "Client Name", hasSorting: true },
    { key: "clientId", name: "Client Id", hasSorting: true },
    { key: "headOfficeName", name: "Head Office Name", hasSorting: true },
    { key: "state", name: "State", hasSorting: true },
    { key: "area", name: "Area", hasSorting: true },
    { key: "status", name: "Status", hasSorting: true },
    // { key: "city", name: "City"},
    { key: "createdAt", name: "Date of Joining" },
    { key: "resourceCount", name: "Resource Count", hasSorting: false, alignmentDirection: 'text-right' },
    { key: "storeCount", name: "Store Count", hasSorting: false, alignmentDirection: 'text-right' },
    { key: "actionHeader", icon: "more_vert" }
  ],
  showSubmitPopUp: false,
  showClientDetailsPopup: false,
  clientCredentialDetails: {
    joiningDate: "",
    clientId: "",
    clientName: "",
    password: ""
  },
  statuses: ["ACTIVE", "INACTIVE", "DRAFT"],
  modulePrevilages: [],
  clientFilterDetails: {
    clientName: "",
    clientId: "",
    state: "",
    headOfficeName: "",
    status: "",
    from: null,
    to: null
  },
  clientEmailTemplate: {},
  clientLogoForHeader: null,
  clientHeaderLogo: '',
  sortOptions: {
    direction: "DESC",
    sortBy: "",
  },
};

const clientInfoSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    setInitialState(state, action) {
      state.clientDetails = initialState.clientDetails;
      state.errorState = initialState.errorState;
      state.activeStep = initialState.activeStep;
      state.modulesList = initialState.modulesList;
      state.clientModules = initialState.clientModules;
      state.clientPrivilege = initialState.clientPrivilege;
      state.statesCitiesMasterData = initialState.clientPrivilege;
      //state.states = initialState.states;
      //state.cities = initialState.states;
      state.clientId = initialState.clientId;
      state.clientGeneratedId = initialState.clientGeneratedId;
      state.clientUserName = initialState.clientUserName;
      state.clientPassword = initialState.clientPassword;
      state.clientCreatedMessage = initialState.clientCreatedMessage;
      state.clientModulesCreatedMessage = initialState.clientModulesCreatedMessage;
      state.clientPrivilegeCreatedMessage = initialState.clientPrivilegeCreatedMessage;
      state.cancelBtnDisabled = initialState.cancelBtnDisabled;
      state.saveAndContinueBtnDisabled = initialState.saveAndContinueBtnDisabled;
      state.cancelBtnDisabled_Modules = initialState.cancelBtnDisabled_Modules;
      state.saveAndContinueBtnDisabled_Modules = initialState.saveAndContinueBtnDisabled_Modules;
      state.cancelBtnDisabled_accessPriv = initialState.cancelBtnDisabled_accessPriv;
      state.submitBtnDisabled_accessPriv = initialState.submitBtnDisabled_accessPriv;
      state.showSubmitPopUp = initialState.showSubmitPopUp;
      state.showClientDetailsPopup = initialState.showClientDetailsPopup;
      state.sortOptions = initialState.sortOptions;
    },
    setAllClients(state, action) {
      state.clientsList = action.payload;
    },
    setLoader(state, action) {
      state.loading = action.payload;
    },
    setClientsList(state, action) {
      state.activeClientsList = action.payload;
    },
    setSelectedClientLogo(state, action) {
      state.selectedClientLogo = action.payload;
    },
    setAllModules(state, action) {//..GET MASTERS MODULES      
      state.modulesList = action.payload;
    },
    setClientDetailsById(state, action) {//..GET SELECTED CLIENT DETAILS
      state.clientDetails = action.payload;
    },
    setClientModulesById(state, action) {//..GET SELECTED CLIENT MODULES
      state.clientModules = action.payload;
      action.payload.map((m, i) => {
        const mIndex = state.modulesList.findIndex(x => x.id === m.id);
        if (mIndex !== -1) {
          state.modulesList[mIndex].checked = true;
        }
        return m;
      });
    },
    setClientPrivilegeById(state, action) {//..GET SELECTED CLIENT PRIVILEGE
      // state.clientPrivilege = action.payload;
      // action.payload.map((m, i) => {
      //   const mIndex = state.modulesList.findIndex(x => x.id === m.moduleId);
      //   if (mIndex !== -1) {
      //     state.modulesList[mIndex].view = m.view;
      //     state.modulesList[mIndex].editTheme = m.editTheme;
      //     state.modulesList[mIndex].editWorkFlow = m.editWorkFlow;
      //   }
      //   return m;
      // });
      state.clientPrivilages = action.payload;
    },
    setClientDetails(state, action) {
      const { name, value, isClientAdminDetails } = action.payload;
      if (isClientAdminDetails) {
        state.clientDetails.admin[name] = value;
      } else {
        state.clientDetails[name] = value;
        if (name === 'state') {
          let statesData = state.statesCitiesMasterData;
          let citiesData = [];
          citiesData = statesData.filter((x) => x.state === value);
          //..ARRANGE CITIES IN ASCENDING ORDER        
          let sortedCities = citiesData.sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
          state.cities = sortedCities;
        }
      }


      //..Validation
      let isError = false;
      if (['email', 'mobile', 'clientName', 'pinCode'].includes(name)) {
        if (!isEmpty(value) && fieldLevelValidation(name, value)) {
          state.errorState.clientDetails[name].error = true;
          isError = true;
        } else {
          state.errorState.clientDetails[name].error = false;
          isError = false;
        }
      }

      if (state.errorState.clientDetails.mobile.error
        || state.errorState.clientDetails.email.error) {
        isError = true;
      }

      if (state.clientDetails.clientName
        && state.clientDetails.headOfficeName
        && state.clientDetails.admin.firstName
        && state.clientDetails.admin.lastName
        && state.clientDetails.admin.mobile?.match(/^[1-9][0-9]*$/gm)
        && state.clientDetails.admin.email
        && !isError) {
        state.saveAndContinueBtnDisabled = false;
        state.cancelBtnDisabled = false;
      } else {
        state.saveAndContinueBtnDisabled = true;
        state.cancelBtnDisabled = true;
      }
    },
    setLogoForClient(state, action) {
      const { id } = action.payload;
      state.clientDetails.logoId = id;
    },
    setBackgroundImage(state,action){
      const { id } = action.payload;
      state.clientDetails.backgroundImageId = id;
    },
    setClientLogoName(state, action) {
      state.clientDetails.clientLogoName = action.payload;
    },
    // setAllStates(state, action) {
    //   let states = [];
    //   state.statesCitiesMasterData.forEach(function (item) {
    //     var i = states.findIndex(x => x.state === item.state);
    //     if (i <= -1) {
    //       states.push(item);
    //     }
    //   });
    //   //..ARRANGE STATES IN ASCENDING ORDER        
    //   let sortedState = states.sort(function (a, b) {
    //     var textA = a.state.toUpperCase();
    //     var textB = b.state.toUpperCase();
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    //   });
    //   state.states = sortedState;
    // },
    // setAllCitiesByState(state, action) {
    //   let statesData = state.statesCitiesMasterData;
    //   let citiesData = [];
    //   citiesData = statesData.filter((x) => x.state === state.clientDetails.state);

    //   //..ARRANGE STATES IN ASCENDING ORDER        
    //   let sortedCities = citiesData.sort(function (a, b) {
    //     var textA = a.name.toUpperCase();
    //     var textB = b.name.toUpperCase();
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    //   });
    //   state.cities = sortedCities;
    // },
    setAllStates(state, action) {
      state.states = action.payload;
    },
    setAllCitiesByState(state, action) {
      state.cities = action.payload;
    },
    setClientModule(state, action) {
      // const { name, checked, ap, isModuleCheck } = action.payload;
      // let smIndex = state.modulesList.findIndex(x => x.id === name);
      // if (isModuleCheck) {
      //   state.modulesList[smIndex].checked = checked;
      // } else {
      //   state.modulesList[smIndex][ap] = checked;
      //   //..Check if View is uncheck and theme or workflow is selected then check view by default
      //   if (!state.modulesList[smIndex].view
      //     && (ap === "editTheme" || ap === "editWorkFlow")) {
      //     state.modulesList[smIndex].view = true;
      //   }
      //   if (ap === "view" && !checked) {
      //     state.modulesList[smIndex].editTheme = false;
      //     state.modulesList[smIndex].editWorkFlow = false;
      //   }
      // }
      const { name, checked } = action.payload;
        //..Check if View is uncheck and theme or workflow is selected then check view by default
      // if (state.clientPrivilages.length) {
      //   let clientPrivilages = [...state.clientPrivilages];
      //   clientPrivilages.forEach((module, index)=>{
      //     clientPrivilages[index][name] = checked;
      //   })
      //   state.clientPrivilages = clientPrivilages;
      // } else {
      //   let clientPrivilages = [];
      //   clientModulesList.forEach((module)=>{
      //     clientPrivilages.push({moduleId: module.id,
      //       view: checked,
      //       editTheme: checked,
      //       editWorkFlow: checked});
      //   });
      //   state.clientPrivilages = clientPrivilages;
      // }
      let clientPrivilages = {...state.clientPrivilages};
      clientPrivilages[name] = checked;
      state.clientPrivilages = clientPrivilages;
    },
    setClientState(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setClientDetailBtnDisableState(state, action) {
      if (state.clientDetails.clientName
        && state.clientDetails.headOfficeName
        && state.clientDetails.admin.firstName
        && state.clientDetails.admin.lastName
        && state.clientDetails.admin.mobile
        && state.clientDetails.admin.email) {
        state.saveAndContinueBtnDisabled = false;
        state.cancelBtnDisabled = false;
      } else {
        state.saveAndContinueBtnDisabled = true;
        state.cancelBtnDisabled = true;
      }
    },
    setClientModulesBtnDisableState(state, action) {
      //..CHECK IF ANY MODULE CHECKED
      let moduleCheckIndex = state.modulesList.findIndex(x => x.checked === true);
      if (moduleCheckIndex !== -1) {
        state.saveAndContinueBtnDisabled_Modules = false;
        state.cancelBtnDisabled_Modules = false;
      } else {
        state.saveAndContinueBtnDisabled_Modules = true;
        state.cancelBtnDisabled_Modules = true;
      }
    },
    setClientAccessPrivilegeBtnDisableState(state, action) {
      //..CHECK IF ANY ACCESS PRIVILEGE CHECKED
      let accessPrivilegeCheckIndex = state.modulesList.findIndex(x =>
      (x.checked === true
        && (x.view === true || x.editTheme === true || x.editWorkFlow === true)));
      if (accessPrivilegeCheckIndex !== -1) {
        state.submitBtnDisabled_accessPriv = false;
        state.cancelBtnDisabled_accessPriv = false;
      } else {
        state.submitBtnDisabled_accessPriv = true;
        state.cancelBtnDisabled_accessPriv = true;
      }
    },
    setShowClientDetailsPopup(state, action) {
      state.showClientDetailsPopup = action.payload;
    },
    setClientCredentialDetails(state, action) {
      state.clientCredentialDetails = action.payload;
    },
    setClientFilterDetails(state, action) {
      state.clientFilterDetails = action.payload;
    },
    getEmailTemplate(state, action) {
      state.clientEmailTemplate = action.payload;
    },
    setClientLogoForHeader(state, action) {
      state.clientLogoForHeader = action.payload;
    },
    setClientSortOptions(state, action) {
      state.sortOptions = action.payload;
    },
    setClientHeaderLogo(state, action) {
      state.clientHeaderLogo = action.payload;
    },
    setAssignedQualityAssurances(state,action){
      state.assignQualityAssurances = action.payload;
    }
    // //..ADD SHOW PASSWORD PROPERTY TO FALSE INITIALLY
    // state.showClientDetailsPopup.showPassword = false;
  },
});

export default clientInfoSlice.reducer;

// Actions
export const {
  setInitialState,
  setAllClients,
  setClientsList,
  setSelectedClientLogo,
  setAllModules,
  setClientDetailsById,
  setClientModulesById,
  setClientPrivilegeById,
  setClientDetails,
  setAllStates,
  setAllCitiesByState,
  setClientModule,
  setClientState,
  setClientDetailBtnDisableState,
  setClientModulesBtnDisableState,
  setClientAccessPrivilegeBtnDisableState,
  setShowClientDetailsPopup,
  setClientCredentialDetails,
  setClientFilterDetails,
  getEmailTemplate,
  setLogoForClient,
  setBackgroundImage,
  setClientLogoForHeader,
  setClientSortOptions,
  setLoader,
  setClientHeaderLogo,
  setClientLogoName,setAssignedQualityAssurances
} = clientInfoSlice.actions;
