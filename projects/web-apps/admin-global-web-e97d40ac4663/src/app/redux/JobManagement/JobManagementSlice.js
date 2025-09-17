import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    pageNumber: 0,
    pageSize: 10,
    jobList: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    jobDetails: {},
    jobTableHeader: [
        { key: 'jobTitle', name: 'Job Title', hasSorting: false },
        { key: 'jobRefNo', name: 'Job Refno', hasSorting: false },
        { key: 'jobType', name: 'Job Type', hasSorting: false },
        { key: 'jobStatus', name: 'Job status' },
        { key: 'state', name: 'State', hasSorting: false },
        {
            key: 'skills',
            name: 'Skills',
            hasSorting: false,
            multiChipView: true,
        },
        { key: 'jobApplicant', name: 'Applicants' },
        { key: 'jobCandidate', name: 'Candidates' },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    qaJobTableHeader: [
        { key: 'jobTitle', name: 'Job Title', hasSorting: false },
        { key: 'jobRefNo', name: 'Job Refno', hasSorting: false },
        { key: 'jobType', name: 'Job Type', hasSorting: false },
        { key: 'jobStatus', name: 'Job status' },
        { key: 'state', name: 'State', hasSorting: false },
        {
            key: 'skills',
            name: 'Skills',
            hasSorting: false,
            multiChipView: true,
        },
        { key: 'jobCandidate', name: 'Candidates' },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    jobFilterDetails: {
        jobTitle: '',
        jobType: '',
        state: '',
        jobStatus: '',
        skills: '',
        from: null,
        to: null,
    },
    jobFilterSkillsView: [],
    sortOptions: {
        direction: 'DESC',
        sortBy: '',
    },
    loading: 0,
    skillsList: [],
    activeStep: 0,
    formBtnStates: {
        jobSummary: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
        jobSetting: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
        billingTiming: {
            cancelBtnDisabled: true,
            saveAndContinueBtnDisabled: true,
        },
    },
    weekDays: [
        { id: 'Mon', name: 'Monday' },
        { id: 'Tue', name: 'Tuesday' },
        { id: 'Wed', name: 'Wednesday' },
        { id: 'Thu', name: 'Thursday' },
        { id: 'Fri', name: 'Friday' },
        { id: 'Sat', name: 'Saturday' },
        { id: 'Sun', name: 'Sunday' },
    ],
    countries: [
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Aruba', code: 'AW' },
        { name: 'Australia', code: 'AU' },
        { name: 'India', code: 'IN' },
        { name: 'Slovenia', code: 'SI' },
        { name: 'Solomon Islands', code: 'SB' },
        { name: 'Somalia', code: 'SO' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
        { name: 'Spain', code: 'ES' },
        { name: 'Sri Lanka', code: 'LK' },
        { name: 'Sudan', code: 'SD' },
        { name: 'Suriname', code: 'SR' },
        { name: 'Svalbard and Jan Mayen', code: 'SJ' },
        { name: 'Swaziland', code: 'SZ' },
        { name: 'Sweden', code: 'SE' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'Syrian Arab Republic', code: 'SY' },
        { name: 'Taiwan, Province of China', code: 'TW' },
        { name: 'Tajikistan', code: 'TJ' },
        { name: 'Tanzania, United Republic of', code: 'TZ' },
        { name: 'Thailand', code: 'TH' },
        { name: 'Timor-Leste', code: 'TL' },
        { name: 'Togo', code: 'TG' },
        { name: 'Tokelau', code: 'TK' },
        { name: 'Tonga', code: 'TO' },
        { name: 'Trinidad and Tobago', code: 'TT' },
        { name: 'Tunisia', code: 'TN' },
        { name: 'Turkey', code: 'TR' },
        { name: 'Turkmenistan', code: 'TM' },
        { name: 'Turks and Caicos Islands', code: 'TC' },
        { name: 'Tuvalu', code: 'TV' },
        { name: 'Uganda', code: 'UG' },
        { name: 'Ukraine', code: 'UA' },
        { name: 'United Arab Emirates', code: 'AE' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' },
        { name: 'United States Minor Outlying Islands', code: 'UM' },
        { name: 'Uruguay', code: 'UY' },
    ],
    applicantTableHeader: [
        { key: 'applicantName', name: 'Applicant Name' },
        { key: 'userType', name: 'User Type' },
        { key: 'jobApplicationStatus', name: 'Job Applicant Status' },
        { key: 'jobApplicationAt', name: 'Applied At' },
        { key: 'userNote', name: 'User Note' },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    applicantList: [],
    applicantDetails: {},
    applicantFilterDetails: {
        userType: '',
        jobApplicationStatus: '',
        from: null,
        to: null,
    },
    candidateList: [],
    candidateDetails: {},
    candidateTableHeader: [
        { key: 'candidateName', name: 'Candidate Name' },
        { key: 'userType', name: 'User Type' },
        { key: 'jobStatus', name: 'Job Status' },
        { key: 'amountStatus', name: 'Payment Status' },
        { key: 'actionHeader', icon: 'more_vert' },
    ],
    candidateFilterDetails: {
        candidateName: '',
        userType: '',
        jobStatus: '',
        amountStatus: '',
        from: null,
        to: null,
    },
    applicantRecentWorkList: [],
    freelancerDetails: {},
    vendorDetails: {},
    jobModules: [],
    clientId: localStorage.getItem("selectedClientLogo") ? localStorage.getItem("selectedClientLogo") : "",
}

const jobManagementSlice = createSlice({
    name: 'jobManagement',
    initialState,
    reducers: {
        setInitialState(state, { type, payload }) {
            state.activeStep = initialState.activeStep
            state.applicantDetails = initialState.applicantDetails
            state.candidateDetails = initialState.candidateDetails
            // state.freelancerDetails = initialState.freelancerDetails
            // state.vendorDetails = initialState.vendorDetails
        },
        setJobList(state, { type, payload }) {
            const { list, totalElements, totalPages, size } = payload
            state.jobList = list
            state.totalElements = totalElements
            state.totalPages = totalPages
            state.size = size
        },
        setJobDetails(state, { type, payload }) {
            state.jobDetails = payload
        },
        setJobFilterDetails(state, { type, payload }) {
            state.jobFilterDetails = payload
        },
        setJobFilterSkillsView(state, { type, payload }) {
            state.jobFilterSkillsView = payload
        },
        setJobSortOption(state, { type, payload }) {
            state.sortOptions = payload
        },
        setSkillsList(state, { type, payload }) {
            state.skillsList = payload
        },
        setJobFormBtnState(state, { type, payload }) {
            const { name, value } = payload
            state[name] = value
        },
        setLoader(state, { type, payload }) {
            state.loading = payload
        },
        setApplicantList(state, { type, payload }) {
            const { list } = payload
            state.applicantList = list
        },
        setApplicantDetails(state, { type, payload }) {
            state.applicantDetails = payload
        },
        setApplicantFilterDetails(state, { type, payload }) {
            state.applicantFilterDetails = payload
        },
        setCandidateList(state, { type, payload }) {
            const { list } = payload
            state.candidateList = list
        },
        setCandidateDetails(state, { type, payload }) {
            state.candidateDetails = payload
        },
        setCandidateFilterDetails(state, { type, payload }) {
            state.candidateFilterDetails = payload
        },
        setApplicantRecentWorkList(state, { type, payload }) {
            const { list } = payload
            state.applicantRecentWorkList = list
        },
        setFreelancerDetails(state, { type, payload }) {
            state.freelancerDetails = payload
        },
        setVendorDetails(state, { type, payload }) {
            state.vendorDetails = payload
        },
        setJobModules(state, { type, payload }) {
            state.jobModules = payload
        },
        setClientId(state, { type, payload }) {
            const { clientId } = payload
            state.clientId = clientId
        }
    },
})

export default jobManagementSlice.reducer

//Actions
export const {
    setInitialState,
    setJobList,
    setJobDetails,
    setJobFilterDetails,
    setJobFilterSkillsView,
    setJobSortOption,
    setSkillsList,
    setJobFormBtnState,
    setLoader,
    setApplicantList,
    setApplicantDetails,
    setApplicantFilterDetails,
    setCandidateList,
    setCandidateDetails,
    setCandidateFilterDetails,
    setApplicantRecentWorkList,
    setFreelancerDetails,
    setVendorDetails,
    setJobModules,
    setClientId,
} = jobManagementSlice.actions
