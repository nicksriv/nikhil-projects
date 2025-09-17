import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    size: 0,
    loading:0,
    vendorRegistrationList: [],
    vendorRegistrationTableHeader: [
        { key: 'name', name: 'Vendor Name', hasSorting: false },
        { key: 'jobId', name: 'Job Id', hasSorting: false },
        { key: 'mobile', name: 'Mobile', hasSorting: true },
        { key: 'email', name: 'Email' ,hasSorting: false},
        {key:'actions',name:'Actions',hasSorting:false},
        {key:'vendorRequestStatus',name:'Status',hasSorting:false},
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    vendorRegistrationFilterDetails: {
        vendorName: '',
        mobile:'',
        email:''  
    },
    vendorRegistrationActionData:{
        jobId:null,
        vendorRequestId:null
    },
    assignVendorRegistrationList:[],
    assignVendorRegistrationTableHeader: [
        { key: 'vendorName', name: 'Vendor Name', hasSorting: false },
        { key: 'email', name: 'Email', hasSorting: false },
        { key: 'mobile', name: 'Mobile', hasSorting: false },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    vendorBasicDetails:{
        
    },
    sortOptions: {
        direction: 'DESC',
        sortBy: '',
    },
    activeStep: 0,
   
}

const vendorRegistrationSlice = createSlice({
    name: 'vendorRegistration',
    initialState,
    reducers: {
        setVendorRegistrationDetailFilter(state, { type, payload }) {
            state.vendorRegistrationFilterDetails = payload
        },
        setVendorRegistrationList(state, { type, payload }) {
            const { list, totalElements, totalPages, size } = payload
            state.vendorRegistrationList = list
            state.totalElements = totalElements
            state.totalPages = totalPages
            state.size = size
        },
        setLoader(state, { type, payload }) {
            state.loading = payload
        },
        setVendorRequestActionData(state, { type, payload }) {
            state.vendorRegistrationActionData = payload
        },
        setAssignVendorRegistrationList(state, { type, payload }) {
            state.assignVendorRegistrationList = payload;
        },
        setVendorBasicDetails(state,{type,payload}) {
            state.vendorBasicDetails = payload;
        },
    },
})

export default vendorRegistrationSlice.reducer

// Actions

export const {
    setVendorRegistrationList,setLoader,setVendorRegistrationDetailFilter,setVendorRequestActionData,
    setAssignVendorRegistrationList,setVendorBasicDetails
} = vendorRegistrationSlice.actions
