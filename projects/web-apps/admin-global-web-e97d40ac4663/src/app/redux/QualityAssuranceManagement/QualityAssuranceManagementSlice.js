import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    qualityAssuranceList: [

    ],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    qualityAssuranceTableHeader: [
        { key: 'fullName', name: 'Name', hasSorting: false },
        { key: 'qualityAssuranceRefNo', name: 'QARefNo', hasSorting: false },
        { key: 'email', name: 'Email', hasSorting: false },
        { key: 'mobile', name: 'Mobile', hasSorting: false },
        { key: 'status', name: 'QAStatus', hasSorting: false },
        { key: 'clients', name: 'Clients', hasSorting: false, multiChipView: true, },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    clientsAssuranceTableHeader: [
        { key: 'clientId', name: 'Client ID', hasSorting: false },
        { key: 'clientName', name: 'Client Name', hasSorting: false },
        { key: 'email', name: 'Client Email', hasSorting: false },
        { key: 'status', name: 'Client Status', hasSorting: false },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    qualityAssuranceFilterDetails: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        qualityControllerStatus: '',
        qualityAssuranceRefNo: ''
    },
    qualityAssuranceDetails: {

    }, qualityAssuranceCredential: {},
    qualityAssuranceEmailTemplate: {},
    showQualityAssuranceDetailsPopup: false,
    sortOptions: {
        direction: 'DESC',
        sortBy: '',
    },
    loading:0,
    activeStep: 0,
}

const qualityAssuranceManagementSlice = createSlice({
    name: 'qualityassuranceManagement',
    initialState,
    reducers: {
        setInitialState(state, { type, payload }) {
            state.activeStep = initialState.activeStep
        },
        setQualityAssuranceList(state, { type, payload }) {
            const { list, totalElements, totalPages, size } = payload
            state.qualityAssuranceList = list
            state.totalElements = totalElements
            state.totalPages = totalPages
            state.size = size
        },
        setQualityAssuranceFilterDetails(state, { type, payload }) {
            state.qualityAssuranceFilterDetails = payload
        },
        setQualityAssuranceDetails(state, { type, payload }) {
            state.qualityAssuranceDetails = payload
        },
        setQualityAssuranceCredential(state, action) {
            state.qualityAssuranceCredential = action.payload
        },
        setShowQualityAssuranceDetailsPopup(state, action) {
            state.showQualityAssuranceDetailsPopup = action.payload
        },
        setQualityAssuranceEmailTemplate(state, action) {
            state.qualityAssuranceEmailTemplate = action.payload
        },
        setLoader(state, action) {
            state.loading = action.payload
        },

    },
})

export default qualityAssuranceManagementSlice.reducer

//Actions
export const {
    setQualityAssuranceList, setShowQualityAssuranceDetailsPopup,setQualityAssuranceEmailTemplate,
    setQualityAssuranceFilterDetails, setQualityAssuranceDetails, setQualityAssuranceCredential, setLoader
} = qualityAssuranceManagementSlice.actions
