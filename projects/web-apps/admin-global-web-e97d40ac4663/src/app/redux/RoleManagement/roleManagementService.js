import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js';
const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";

const postRoleService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/roles`, null, data)
}
const getRoleService = (data) => {
    const { clientId, pageNumber, size } = data;
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/roles/client/${clientId}/?pagination=true&page=${pageNumber ? pageNumber : ""}&size=${size ? size : ""}`,
        null,
        null,
        'json',
        data.filter)
}
const getIndividualRoleService = (roleId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/roles/${roleId}`)
}
const setIndividualRoleService = (roleId, data) => {
    let updatedRole = {
        id: roleId,
        name: data.name,
        description: data.description,
        status: data.status
    }
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/roles/${roleId}`, null, updatedRole)
}

export {
    postRoleService,
    getRoleService,
    getIndividualRoleService,
    setIndividualRoleService
}