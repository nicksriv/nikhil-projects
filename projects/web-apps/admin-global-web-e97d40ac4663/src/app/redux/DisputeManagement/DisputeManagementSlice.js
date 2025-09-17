import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    disputeList: [

    ],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    disputeTableHeader: [
        { key: 'clientName', name: 'Client Name', hasSorting: false },
        { key: 'disputeRefNo', name: 'Dispute Ref No', hasSorting: false },
        { key: 'disputeStatus', name: 'Dispute Status', hasSorting: false },
        { key: 'disputeTitle', name: 'Dispute Title', hasSorting: false },
        { key: 'raisedAt', name: 'Raised At', hasSorting: false },
        { key: 'raisedBy', name: 'Raised By', hasSorting: false },
        { key: 'userType', name: 'User Type', hasSorting: false },
        { key: 'actionHeader', icon: 'more_vert' },
    ],

    sortOptions: {
        direction: 'DESC',
        sortBy: '',
    },
    loading: 'start',
    activeStep: 0,
    disputeFilterDetails: {
        disputeRefNo: '',
        clientId: '',
        userType: '',
        disputeStatus: '',
        from: null,
        to: null,
    },
    disputeDetails: {}
}

const disputeManagementSlice = createSlice({
    name: 'freelancerManagement',
    initialState,
    reducers: {
        setInitialState(state, { type, payload }) {
            state.activeStep = initialState.activeStep
            state.disputeDetails = initialState.disputeDetails
        },
        setDisputeList(state, { type, payload }) {
            const { list, totalElements, totalPages, size } = payload
            state.disputeList = list
            state.totalElements = totalElements
            state.totalPages = totalPages
            state.size = size
        },
        setDisputeFilterDetails(state, { type, payload }) {
            state.disputeFilterDetails = payload
        },
        setLoader(state, action) {
            state.loading = action.payload
        },
        setDisputeDetails(state, { type, payload }) {
            state.disputeDetails = payload
        },
    },
})

export default disputeManagementSlice.reducer

//Actions
export const {
    setDisputeList,
    setDisputeFilterDetails,
    setDisputeDetails, setLoader
} = disputeManagementSlice.actions
