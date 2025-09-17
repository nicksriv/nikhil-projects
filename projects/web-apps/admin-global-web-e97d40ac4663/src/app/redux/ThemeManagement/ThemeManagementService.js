import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js';
const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";

const setThemeConfigService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/themes`, null, data);
}
const getThemeConfigService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/themes/${clientId}`);
}

export {
    setThemeConfigService,
    getThemeConfigService
};