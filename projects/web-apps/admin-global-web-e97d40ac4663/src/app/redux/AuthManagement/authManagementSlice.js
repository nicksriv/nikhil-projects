import { createSlice } from '@reduxjs/toolkit';
// import { fieldLevelValidation, isEmpty } from '../../../utils';
import axios from 'helper/axios.js';
import jwtDecode from 'jwt-decode';

const initialState = {
    isAuthenticated: false,
    isInitialised: true,
    user: null,
    userNavigations: [],
    changePasswordSuccess: false,
    userProfileImageId: localStorage.getItem('profileId') ? localStorage.getItem('profileId') : "",
    userLogoId: localStorage.getItem('logoId') ? localStorage.getItem('logoId') : "",
}

const authInfoSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.isInitialised = true;
            state.user = initialState.user;
        },
        setLoginDetails(state, action) {
            const { token, themeEnabled, workFlowEnabled } = action.payload;
            state.isInitialised = false;
            if (themeEnabled)
                localStorage.setItem('editThemeEnabled', themeEnabled)
            if (workFlowEnabled)
                localStorage.setItem('editWorkflowEnabled', workFlowEnabled);
            if (token) {
                state.isAuthenticated = true;
                setSession(token);
            } else {
                setSession("");
            }
        },
        setLogoutDetails(state, action) {
            state.isAuthenticated = false;
            setSession(null);
            localStorage.removeItem('editThemeEnabled');
            localStorage.removeItem('editWorkflowEnabled');
            localStorage.removeItem('logoId');
            localStorage.removeItem('profileId');
            localStorage.removeItem('googleMapAuthKey');
        },
        setNavigations(state, action) {
            state.userNavigations = action.payload;
        },
        setCPasswordStatus(state, action) {
            state.changePasswordSuccess = action.payload;
        },
        setUserProfileImageId(state, action) {
            state.userProfileImageId = action.payload;
        },
        setUserLogoId(state, action) {
            state.userLogoId = action.payload;
        },
    },
});

export const setSession = (accessToken) => {
    if (accessToken) {
        const user = jwtDecode(accessToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('adminId', user.adminId);
        localStorage.setItem('typeOfUser', user.typeOfUser);
        localStorage.setItem('userRole', user.userRole);
        // localStorage.setItem('userDetails', user);
        if (user.typeOfUser === "Client") {
            localStorage.setItem('selectedClientLogo', user.id);
            localStorage.setItem('clientName', user.firstName);
            localStorage.setItem('selectedClientId', user.clientId);
        } else if (user.typeOfUser === "User") {
            localStorage.setItem('selectedClientLogo', user.clientSystemId);
            localStorage.setItem('selectedClientId', user.clientId);
        } else {
            localStorage.setItem('adminLId', user.id);
            localStorage.setItem('adminSId', user.clientId);
        }
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('selectedClientLogo');
        localStorage.removeItem('selectedClientId');
        localStorage.removeItem('typeOfUser');
        localStorage.removeItem('adminLId');
        localStorage.removeItem('adminSId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('logoId');
        localStorage.removeItem('qaId');
        localStorage.removeItem('qaName');
        delete axios.defaults.headers.common.Authorization;
    }
}

export default authInfoSlice.reducer;

// Actions
export const {
    setInitialState,
    setLoginDetails,
    setLogoutDetails,
    setNavigations,
    setCPasswordStatus,
    setUserProfileImageId,
    setUserLogoId,
    setClientDisabled,
    setClientEnabled
} = authInfoSlice.actions;
