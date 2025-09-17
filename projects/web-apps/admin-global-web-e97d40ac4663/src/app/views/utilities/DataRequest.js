import axios from 'helper/axios.js';
import { config } from 'helper/config';
import { setSession } from 'app/redux/AuthManagement/authManagementSlice';

const { isProd } = config;

const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

export const xhrClient = {
    async requestBase(route, requestMethod, customRequestHeaders, data, responseType = "json", params, requestConfig = null) {
        // console.log(requestMethod, responseType, params);
        const request = {
            method: requestMethod,
            //url: `${API_ENDPOINT}${route}`,
            url: `${route}`,
            responseType,
            headers: {
                'accept': 'application/json',
                'Content-Type': customRequestHeaders? customRequestHeaders: 'application/json',
                //'Cache-Control': 'no-cache',                
                'Access-Control-Allow-Origin': '*'
            },
            params: params
        }

        //const requestHeaders = Object.assign({}, request.headers, customRequestHeaders);
        if (requestMethod !== 'get') {
            request.data = data;
        }
        if (requestConfig) {
            request.config = requestConfig;
        }

        return await axios(request)
            .then((response) => {
                // const responseData = response.data.data ? response.data.data : response.data;
                const responseData = response.data? response.data : response;
                return responseData;
            })
            .catch((error) => {
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    setSession(null);
                    window.location.href = '/';
                }
                throw error.response.data;
            })
    },

    //...GET
    async get(route, customRequestHeaders = null, data = null, responseType = "json", params = {}) {
        const requestMethod = 'get';
        return this.requestBase(route, requestMethod, customRequestHeaders, data, responseType, params);
    },
    //...POST
    async post(route, customRequestHeaders = null, data = null, responseType = "json", params = {}, requestConfig = null) {
        const requestMethod = 'post';
        return this.requestBase(route, requestMethod, customRequestHeaders, data, responseType, params, requestConfig);
    },
    //...PUT
    async put(route, customRequestHeaders = null, data = null, responseType = "json", params = {}) {
        const requestMethod = 'put';
        return this.requestBase(route, requestMethod, customRequestHeaders, data, responseType, params);
    },
    //...DELETE
    async delete(route, customRequestHeaders = null, data = null, params = {}) {
        const requestMethod = 'delete';
        return this.requestBase(route, requestMethod, customRequestHeaders, data, params);
    }
}