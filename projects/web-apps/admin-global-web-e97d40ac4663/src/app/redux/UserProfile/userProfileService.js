import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js';

const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";

// const profileId = localStorage.getItem('profileId')? localStorage.getItem('profileId') : '';

// FETCH USER PROFILE DETAILS API
const getUserProfileDetailsService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/profiles/me`);
}
// UPDATE USER PROFILE DETAILS API
const updateUserProfileDetailsService = (data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/profiles/me`, null, data);
}


const getUserProfileLogoService = (profileId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/files/${profileId}`, null, null, 'blob');
}

const updateUserProfileLogoService = (file) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/files/upload?fileType=LOGO`, null, file);
}

const getStatesDataService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/states`);
}

const getCitiesByStateDataService = (stateName) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/cities?stateName=${stateName}`);
}

export {
    getUserProfileDetailsService,
    updateUserProfileDetailsService,
    getUserProfileLogoService,
    updateUserProfileLogoService,
    getStatesDataService,
    getCitiesByStateDataService
};