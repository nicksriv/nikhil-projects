import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js';
const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";

const setAuthenticationService = (data) => {
    console.log(`${API_ENDPOINT}${APIVERSION}/clients/authenticate`)
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/authenticate`, null, data);
}

const logoutUserService = () => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/logout`);
}

const changeUserProfilePasswordService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/profiles/changepassword`, null, data)
}

export {
    setAuthenticationService,
    logoutUserService,
    changeUserProfilePasswordService
}