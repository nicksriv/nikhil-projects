import { createSlice } from '@reduxjs/toolkit'
var initialState = {
    // sitesCount: '',
    // usersCount: '',
    // clientsCount: '',
    lastLoginInfo: {
        browser: '',
        ip: '',
        time: '',
    },
    dashboardStats : {

    },
    dashboardJobStats : {

    },
    teams: [],
    modules: null,
    chartsData: [],
    clientInfo: {
        name: '',
        clientId: '',
        id: '',
    },
    profileUrls: {},
    loading: 'start',
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardData(state, action) {
            const { storesCount, usersCount, clientsCount, login, teams, modules } =
                action.payload
            // state.sitesCount = storesCount
            // state.usersCount = usersCount
            // state.clientsCount = clientsCount
            state.lastLoginInfo = login
            state.teams = teams
            state.modules = modules
        },
        setStatistics(state, action) {
            const { charts, clientId, clientName, id } = action.payload
            state.chartsData = charts? charts: []
            state.clientInfo = {
                name: clientName,
                clientId,
                id,
            }
        },
        setProfileUrls(state, action) {
            const { id, profileUrl } = action.payload
            state.profileUrls = {
                ...state.profileUrls,
                [id]: profileUrl,
            }
        },

        setDashboardStats(state,action){
            state.dashboardStats = action.payload
        },
        setDashboardJobStats(state,action){
            state.dashboardJobStats = action.payload
        },
        setLoader(state, { type, payload }) {
            state.loading = payload
        },
    },
})
export default dashboardSlice.reducer

// Actions
export const { setDashboardData, setStatistics, setProfileUrls,setDashboardStats,setDashboardJobStats,setLoader } =
    dashboardSlice.actions
