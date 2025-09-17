import { createSlice } from '@reduxjs/toolkit';

var initialState = {
    pageNumber: 0,
    roleTableHeaders: [
        { key: "name", name: "Role Name", hasSorting: false },
        { key: "modules", name: "Modules", hasSorting: false, multiChipView: true , displayAssignLink:false},
        { key: "users", name: "User Count", hasSorting: false, alignmentDirection: 'text-right pr-15' },
        { key: "status", name: "Status", hasSorting: false },
        { key: "actionHeader", icon: "more_vert", alignIcon: 'float-right pr-5' }

    ],
    roleDetails: {
        clientId: localStorage.getItem('selectedClientLogo')
            ? localStorage.getItem('selectedClientLogo')
            : '',
        description: "",
        name: "",
        status: ""
    },
    rolesList: [],
    loading: "start",
    statuses: ['ACTIVE', 'INACTIVE'],
    roleFilterDetails: {
        roleName: '',
        modules: '',
        status: '',
        from: null,
        to: null
    },
    saveAndContinueBtnDisabled: true,
    modulesList: []
}

const roleInfoSlice = createSlice({
    name: 'roleInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.roleDetails = initialState.roleDetails;
            state.rolesList = initialState.rolesList;
        },
        setRoleFilterDetails(state, action) {
            state.roleFilterDetails = action.payload;
        },
        setRoleDetails(state, action) {
            const { name, value } = action.payload;
            state.roleDetails[name] = value;
            if (state.roleDetails.name) {
                state.saveAndContinueBtnDisabled = false;
                state.cancelBtnDisabled = false;
            } else {
                state.saveAndContinueBtnDisabled = true;
                state.cancelBtnDisabled = true;
            }
        },
        setRoleModules(state, action) {
            state.modulesList = action.payload;
        },
        setRolesList(state, action) {
            state.rolesList = action.payload;
        },
        setLoader(state, action) {
            state.loading = action.payload;
        },
        setFetchedRoleDetails(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
        }
    },
});

export default roleInfoSlice.reducer;

// Actions
export const {
    setRoleFilterDetails,
    setInitialState,
    setRoleDetails,
    setRolesList,
    setFetchedRoleDetails,
    setRoleModules,
    setLoader
} = roleInfoSlice.actions;
