import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    freelancerList: [

    ],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    freelancerTableHeader: [
        { key: 'fullName', name: 'Name', hasSorting: false },
        { key: 'freelancerRefNo', name: 'RefNo', hasSorting: false },
        { key: 'email', name: 'Email', hasSorting: false },
        { key: 'mobile', name: 'Mobile', hasSorting: false },
        { key: 'status', name: 'Status', hasSorting: false },
        { key: 'state', name: 'State', hasSorting: false },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    freelancerFilterDetails: {
        firstName: '',
        lastName: '',
        freelancerRefNo: '',
        email: '',
        mobile: '',
        status: '',
        state: ''
    },
    sortOptions: {
        direction: 'DESC',
        sortBy: '',
    },
    loading:0,
    activeStep: 0,
    freelancerDetails: {},
    freelancerStatsJobs: {}
}

const freelancerManagementSlice = createSlice({
    name: 'freelancerManagement',
    initialState,
    reducers: {
        setInitialState(state, { type, payload }) {
            state.activeStep = initialState.activeStep
            state.freelancerDetails = initialState.freelancerDetails

        },
        setFreelancerList(state, { type, payload }) {
            const { list, totalElements, totalPages, size } = payload
            state.freelancerList = list
            state.totalElements = totalElements
            state.totalPages = totalPages
            state.size = size
        },
        setFreelancerFilterDetails(state, { type, payload }) {
            state.freelancerFilterDetails = payload
        },
        setLoader(state, action) {
            state.loading = action.payload
        },
        setFreelancerDetails(state, { type, payload }) {
            state.freelancerDetails = payload
        },
        setFreelancerStatsJobs(state, { type, payload }) {
            state.freelancerStatsJobs = payload
        },
    },
})

export default freelancerManagementSlice.reducer

//Actions
export const {
    setFreelancerList,
    setFreelancerFilterDetails,
    setFreelancerDetails,
    setLoader,
    setInitialState,
    setFreelancerStatsJobs
} = freelancerManagementSlice.actions
