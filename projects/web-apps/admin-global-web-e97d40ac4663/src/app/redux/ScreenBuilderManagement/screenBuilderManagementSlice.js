import { createSlice } from '@reduxjs/toolkit';
//import { v4 as uuid } from 'uuid';

var initialState = {
  fileId: '',
  moduleList: [],
  apiLoader: true,
  loading: "start",
  clientModulesList: [],
  clientSubModulesList: [],
  createdModule: {
    icon: '',
    isChildModule: false,
    moduleName: '',
    parentModuleName: '',
    moduleId: '',
    clientId: localStorage.getItem("selectedClientLogo") ? localStorage.getItem("selectedClientLogo") : "",
    //mappedRole: 'Store Manager',
    //status: 'ACTIVE',
  },
  cloneWorkflowDetails: {
    parentModuleId: "",
    submoduleId: "",
    moduleName: "",
    clientId: localStorage.getItem("selectedClientLogo") ? localStorage.getItem("selectedClientLogo") : "",
    moduleIcon: ""
  },
  moduleDetails: {
    icon: '',
    moduleName: '',
    parentModuleName: '',
    mappedRole: '',
    status: 'ACTIVE',

  },
  moduleTableHeaders: [
    { key: 'drop', name: '' },
    { key: 'icon', name: 'Icon' },
    { key: 'name', name: 'Module Name' },
    { key: 'subModules', name: 'Sub Module Name' },
    { key: 'roles', name: 'Roles' },
    { key: 'status', name: 'Status' },
    { key: 'actionHeader', icon: 'more_vert' },
  ],
  statuses: ['ACTIVE', 'INACTIVE'],
  moduleFilterDetails: {
    moduleName: '',
    //parentModuleName: '',
    //rolesMapped: '',
    status: '',
    from: null,
    to: null
  },
  screenData: [],
  workflowRoles: [],
  dynamicSubmoduleWorkflowDetails: {},
  workflowInformation: {},
  workflowStatus: "DRAFT",
  workflowRequestBackup: [],
  masterScreensWorkflowDataBackup: [{
    displayIndex: 1,
    screenTitle: "Master screen_01",
    tableHeaders: [
      { key: 'date', name: 'Date' },
      { key: 'checkIn', name: 'CheckIn' },
      { key: 'checkOut', name: 'Checkout' },
      { key: 'duration', name: 'Duration' },
      { key: 'actionHeader', icon: 'more_vert' },
    ],
    tableData: [
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }
    ],
    isListingPage: true,
    isConsolidatedScreen: false,
    isDatatableChecked: false
  }],
  workflowRequest: [],
  masterScreensWorkflowData: [{
    displayIndex: 1,
    screenTitle: "Master screen_01",
    tableHeaders: [
      { key: 'date', name: 'Date' },
      { key: 'checkIn', name: 'CheckIn' },
      { key: 'checkOut', name: 'Checkout' },
      { key: 'duration', name: 'Duration' },
      { key: 'actionHeader', icon: 'more_vert' },
    ],
    tableData: [
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }, {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      },
      {
        date: '14-Dec',
        checkIn: '9:10am',
        checkOut: '5:10pm',
        duration: '8hr'
      }
    ],
    isListingPage: true,
    isConsolidatedScreen: false,
    isDatatableChecked: false
  }],
  featureTemplate: [],
  formElementCheck: [],
  moduleId: '',
  subModuleId: '',
  screenId: '',
  screenName: '',
  clientId: localStorage.getItem("selectedClientLogo") ? localStorage.getItem("selectedClientLogo") : "",
  clientCode: localStorage.getItem("selectedClientId") ? localStorage.getItem("selectedClientId") : "",
  icons: [
    {
      id: 0,
      icon: 'event_seat',
      iconName: "Event seat"
    },
    {
      id: 1,
      icon: 'date_range',
      iconName: "Date range"

    },
    {
      id: 2,
      icon: 'calendar_today',
      iconName: "Calender today"
    },
    {
      id: 3,
      icon: 'event_busy',
      iconName: "Event busy"
    },
    // {
    //   id: 4,
    //   icon: 'no_accounts',
    //   iconName: "No account"
    // },
    {
      id: 5,
      icon: 'pending_actions',
      iconName: "Pendding actions"
    },
    {
      id: 6,
      icon: 'analytics',
      iconName: "analytics"
    },
    {
      id: 7,
      icon: 'stars',
      iconName: "stars"
    },
    {
      id: 8,
      icon: 'person',
      iconName: "person"
    },
    {
      id: 9,
      icon: 'settings',
      iconName: "settings"
    },
    {
      id: 10,
      icon: 'home_work',
      iconName: "home work"
    },
    {
      id: 11,
      icon: 'find_in_page',
      iconName: "find in page"
    },
    {
      id: 12,
      icon: 'event_available',
      iconName: "event available"
    },
    {
      id: 13,
      icon: 'face',
      iconName: "face"
    },
    {
      id: 14,
      icon: 'group_add',
      iconName: "group add"
    },
    {
      id: 15,
      icon: 'group_work',
      iconName: "group work"
    },
    {
      id: 15,
      icon: 'all_out',
      iconName: "all out"
    },
  ],
  sortOptions: {
    direction: "DESC",
    sortBy: "",
  },
  showMasterScreen: false,
  isWorkflowDataLoading: false,
  roleName: [],
  submoduleSuccessStatus: false,
  mappedByValue: '',
  selectedWorkflowId: ''
}

const moduleInfoSlice = createSlice({
  name: 'moduleInfo',
  initialState,
  reducers: {
    setInitialState(state, action) {
      state.moduleDetails = initialState.moduleDetails;
      state.screenData = initialState.screenData;
      state.screenName = initialState.screenName;
      state.featureTemplate = initialState.featureTemplate;
      state.formElementCheck = initialState.formElementCheck;
      state.subModuleId = initialState.subModuleId;
      state.workflowInformation = initialState.workflowInformation;
      state.workflowStatus = initialState.workflowStatus;
      state.masterScreensWorkflowData = initialState.masterScreensWorkflowData;
      state.workflowRequest = initialState.workflowRequest;
      state.workflowRequestBackup = initialState.workflowRequestBackup;
      state.masterScreensWorkflowDataBackup = initialState.masterScreensWorkflowDataBackup;
      //state.createdModule = initialState.createdModule;
      state.showMasterScreen = initialState.showMasterScreen;
      state.isWorkflowDataLoading = initialState.isWorkflowDataLoading;
      state.roleName = initialState.roleName;
    },
    setModuleFilterDetails(state, action) {
      state.moduleFilterDetails = action.payload
    },
    setUploadedFileId(state,action) {
      state.fileId = action.payload
    },
    setLoader(state, action) {
      state.apiLoader = action.payload.payload;
    },
    setCreatedModule(state, action) {
      const { name, value } = action.payload;
      state.createdModule[name] = value;
    },
    setCloneWorkflowDetails(state, action) {
      const { name, value } = action.payload;
      state.cloneWorkflowDetails[name] = value;
    },
    setModule(state, action) {
      console.log('mmmmmm')
      const { createdModule } = action.payload;
      state.moduleList.data = [...state.moduleList.data, createdModule];
    },
    setFormData(state, action) {
      state.screenData.push(action.payload);
    },
    setAllModules(state, action) {
      state.moduleList = action.payload
    },
    setAppLoader(state, action) {
      state.loading = action.payload;
    },
    setStateByName(state, action) {
      const { name, value, fieldName } = action.payload;
      if (fieldName) {
        state[fieldName][name] = value;
      } else {
        state[name] = value;
      }
    },
    setFeatureTemplate(state, action) {
      const { //value,
        data } = action.payload;
      // const unique_id = uuid();
      // //let ftArr = [];
      // let ft = {
      //   templateId: unique_id,
      //   templateTitle: value,
      //   formData: []
      // };
      // for (let index = 0; index < state.formElementCheck.length; index++) {
      //   const element = state.formElementCheck[index];
      //   let d = data.find(x => x.id === element.id);
      //   if (d) {
      //     d.displayOrder = element.displayOrder;
      //     ft.formData.push(d);
      //   }
      // }
      // //ftArr.push(ft);
      // //state.featureTemplate = ftArr;
      // state.featureTemplate.push(ft);
      state.featureTemplate = data;
    },
    setWorkflowState(state, action) {
      const { data, screenIndex, id, pageMode, screenName, masterScreensWorkflowData } = action.payload;
      let wd = state.masterScreensWorkflowData;
      let dis, highestDisplayIndex, sd;
      if (wd && wd.length > 0) {
        dis = wd.map((a) => a.displayIndex);
        highestDisplayIndex = Math.max(...dis);
      } else {
        highestDisplayIndex = 0;
      }
      sd = data.slice(0);
      if (pageMode === "add") {
        //...TODO::IF required we can set default title if not supplied 
        //..till then commented below line
        //const defaultScreenTitle = `Master screen_0${screenIndex + 1}`;
        const defaultScreenTitle = "";
        const d = {
          displayIndex: screenIndex + 1,
          screenId: id,
          screenTitle: `${screenName ? screenName : defaultScreenTitle}`,
          screenData: sd,
          isListingPage: false,
          isConsolidatedScreen: false
        };
        wd.splice(screenIndex + 1, 0, d);
      } else if (pageMode === "editmasterscreen") {
        wd[screenIndex].screenData = sd;
        wd[screenIndex].screenTitle = `${screenName ? screenName : ""}`;
      } else {
        //...TODO::IF required we can set default title if not supplied 
        //..till then commented below line
        //const defaultTitle = `Master screen_0${highestDisplayIndex + 1}`;
        const defaultTitle = "";
        wd.push({
          displayIndex: highestDisplayIndex + 1,
          screenId: id,
          screenTitle: `${highestDisplayIndex === 2 && screenName ? screenName : defaultTitle}`,
          screenData: sd,
          isListingPage: false,
          isConsolidatedScreen: false
        });
      }
      //..correct display order
      // wd.map((d, i) => {
      wd.forEach((d, i) => {
        d.displayIndex = (i + 1);
        if (i > 0) {
          let prevId = wd[i - 1].screenId;
          let nextId;

          wd[i].previousScreenId = prevId;
          if ((i + 1) >= wd.length) {
            nextId = wd[i].screenId;
          } else {
            nextId = wd[i + 1].screenId;
          }
          wd[i].nextScreenId = nextId;
        }
      });

      state.masterScreensWorkflowData = wd;

      let wr = state.workflowRequest;
      let wrObj = {
        id: null,
        displayOrder: screenIndex,
        screenName: screenName,
        screenId: id,
        nextScreenId: id,
        previousScreenId: id,
        status: "ACTIVE"
      };
      if (wr && wr.length <= 0) {
        wr.push(wrObj);
      } else if (pageMode === "add") {
        if (screenIndex > 0) {
          wrObj.previousScreenId = wr[screenIndex - 1].screenId;
        }
        wr.splice(screenIndex, 0, wrObj);
      } else if (pageMode === "editmasterscreen") { } else {
        wr.push(wrObj);
      }

      // if (pageMode === "add" || (wr && wr.length <= 0)) {
      //     if (screenIndex > 0) {
      //         wrObj.previousScreenId = wr[screenIndex - 1].screenId;
      //         let nextId;
      //         if ((screenIndex + 1) >= wr.length) {
      //             nextId = wr[screenIndex].screenId;
      //         } else {
      //             nextId = wr[screenIndex + 1].screenId;
      //         }
      //         wr[screenIndex].nextScreenId = nextId;
      //     }
      //     wr.splice(screenIndex, 0, wrObj);
      // }
      // wr.map((d, i) => {
      //     if (i > 0) {
      //         let prevId = wr[i - 1].screenId;
      //         let nextId;

      //         wr[i].previousScreenId = prevId;
      //         if ((i + 1) >= wr.length) {
      //             nextId = wr[i].screenId;
      //         } else {
      //             nextId = wr[i + 1].screenId;
      //         }
      //         wr[i].nextScreenId = nextId;
      //     }
      // });
      state.workflowRequest = wr;
      state.workflowRequestBackup = state.workflowRequest;
      state.masterScreensWorkflowDataBackup = state.masterScreensWorkflowData;
    },
    setMasterScreensWorkflowData(state, action) {
      const { data } = action.payload;
      state.masterScreensWorkflowData.push(data);
    },
    setWorkflowDragnDropState(state, action) {
      const { data } = action.payload;
      let wd = data.slice(0);
      let wr = state.workflowRequest;
      wd = wd.sort((a, b) => a.displayIndex - b.displayIndex);
      state.masterScreensWorkflowData = wd;
      let newWR = [];
      if (wr.length > 1) {
        state.masterScreensWorkflowData.forEach((d, i) => {
          //  state.masterScreensWorkflowData.map((d, i) => {
          if (!d.isListingPage) {
            let wrObj = {
              id: null,
              displayOrder: null,
              screenName: "",
              screenId: d.screenId,
              nextScreenId: d.screenId,
              previousScreenId: d.screenId,
              status: "ACTIVE"
            };
            newWR.push(wrObj);
          }
        });
        state.workflowRequest = newWR;
      }
    },
    setCollapseExpandState(state, action) {
      const { id } = action.payload;
      //state.moduleList.data.map((r, i) => {
      state.moduleList.data.forEach((r, i) => {
        if (r.id === id) {
          state.moduleList.data[i].isExpand = !state.moduleList.data[i].isExpand;
        }
      });
    },
    setSBSortOptions(state, action) {
      state.sortOptions = action.payload;
    },
    setWorkEditDetails(state, action) {
      const { showMasterScreen, moduleInfo, submoduleInfo, source } = action.payload;
      state.showMasterScreen = showMasterScreen;
      state.isWorkflowDataLoading = true;
      let cm = {
        icon: moduleInfo.icon,
        isChildModule: source === "module" ? false : true,
        moduleName: source === "module" ? moduleInfo.name : submoduleInfo.name,
        parentModuleName: source === "module" ? "" : moduleInfo.name,
        moduleId: moduleInfo.id,
        clientId: state.createdModule.clientId
      };
      state.createdModule = cm;
      state.moduleId = moduleInfo.id;
      if (submoduleInfo) {
        state.subModuleId = submoduleInfo.id;
      }
    },
    setScreenDataInWorkflow(state, action) {
      const { data, index, name } = action.payload;
      if (state.masterScreensWorkflowData[index]
        && state.masterScreensWorkflowData[index].screenData) {
        state.masterScreensWorkflowData[index].screenData = data;
        state.masterScreensWorkflowData[index].screenTitle = name;
      }
    },
    setApprovalMechanism(state, action) {
      const { source, checked } = action.payload;
      if (source === "datatable") {
        if (checked) {
          state.masterScreensWorkflowData[0].isDatatableChecked = true;
        } else {
          state.masterScreensWorkflowData[0].isDatatableChecked = false;
        }
      }
    },
    setConsolidatedFlag(state, action) {
      state.masterScreensWorkflowData[0].isConsolidatedScreen = true;
    },
    setConsolidatedFlagAll(state, action) {
      state.masterScreensWorkflowData.map((m, i) => {
        state.masterScreensWorkflowData[i].isConsolidatedScreen = true;
      });
    },
    setTabSelectionState(state, action) {
      const { workflowPageMode, selectedTab } = action.payload;
      const tabEnum = {
        COMPONENT: 'COMPONENT',
        FEATURE_TEMPLATE: 'FEATURE TEMPLATE',
        PRIVILEGE: 'PRIVILEGE'
      }
      if (workflowPageMode === "add" && selectedTab === tabEnum.PRIVILEGE) {
        state.showMasterScreen = true;
        state.isWorkflowDataLoading = true;
      } else if (workflowPageMode === "add" &&
        (selectedTab === tabEnum.COMPONENT || selectedTab === tabEnum.FEATURE_TEMPLATE)) {
        state.showMasterScreen = false;
        state.isWorkflowDataLoading = false;
        state.screenName = initialState.screenName;
        // state.workflowRequestBackup = initialState.workflowRequestBackup;
        // state.masterScreensWorkflowDataBackup = initialState.masterScreensWorkflowDataBackup;
        // state.workflowRequest = initialState.workflowRequest;
        // state.masterScreensWorkflowData = initialState.masterScreensWorkflowData;
      }
    },
    setApprovalOnTable(state, action) {
      state.masterScreensWorkflowData[0].isDatatableChecked = true;
      state.masterScreensWorkflowDataBackup[0].isDatatableChecked = true;
    },
    setSubmoduleSuccessStatus(state, action) {
      state.submoduleSuccessStatus = action.payload;
    }
  },
})

export default moduleInfoSlice.reducer;

//Actions
export const {
  setInitialState,
  setAllModules,
  setModuleFilterDetails,
  setCreatedModule,
  setCloneWorkflowDetails,
  setModule,
  setFormData,
  setStateByName,
  setFeatureTemplate,
  setWorkflowState,
  setMasterScreensWorkflowData,
  setWorkflowDragnDropState,
  setCollapseExpandState,
  setSBSortOptions,
  setWorkEditDetails,
  setScreenDataInWorkflow,
  setApprovalMechanism,
  setConsolidatedFlag,
  setConsolidatedFlagAll,
  setTabSelectionState,
  setApprovalOnTable,
  setLoader,
  setAppLoader,
  setSubmoduleSuccessStatus,
  setUploadedFileId
} = moduleInfoSlice.actions;