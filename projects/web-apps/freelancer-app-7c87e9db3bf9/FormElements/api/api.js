/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosRequestConfig } from 'axios';
import { logMsg } from '@app/utils/analytics';
import apiConfig from '@app/api/api_config';
import { showInternetConnectionLostAlert } from '@app/utils/helper';

const shouldLogApiRequests = true;
/**
 * Create an Axios Client with default baseURL and other parameters
 */
const BASE_API_URL = apiConfig.KFINKART_INVESTOR_BASE_URL;
const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000, //timeout API request after 30 seconds
});

export const cancelTokenSource = axios.CancelToken.source();
/**
 * Request Wrapper with default success/error actions
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Api = (
  config: AxiosRequestConfig = {
    method: 'GET',
    data: {},
    url: '',
    cancelToken: cancelTokenSource.token,
  },
) => {
  shouldLogApiRequests && logMsg(`${BASE_API_URL}/${config.url}`);
  if (!global.isInternetConnected) {
    showInternetConnectionLostAlert();
    // logMsg('Cancelling Axios request as there is no internet connection');
    cancelTokenSource.cancel();
    return Promise.reject('No internet connection!');
  }
  // Success
  const onSuccess = (response) => {
    shouldLogApiRequests && logMsg('Request Successful!', response?.data);
    return Promise.resolve(response?.data);
  };

  // Error
  const onError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      shouldLogApiRequests && logMsg(error.response.data);
      shouldLogApiRequests && logMsg(error.response.status);
      shouldLogApiRequests && logMsg(error.response.headers);
      return Promise.reject(error.response && error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      shouldLogApiRequests && logMsg(error.request);
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      shouldLogApiRequests && logMsg('Error Message:', error.message);
      return Promise.reject(error.message);
    }
    // logMsg('Error config:', error.config);
  };

  // Append headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Set headers
  axiosClient.defaults.headers = headers;

  shouldLogApiRequests &&
    logMsg('Request Headers!', axiosClient.defaults.headers);

  shouldLogApiRequests && logMsg('Request Configurations!', config);

  try {
    if (config.method === 'GET') {
      shouldLogApiRequests &&
        logMsg(
          'GET Request URL!',
          `${BASE_API_URL}/${config.url}?${new URLSearchParams(
            config.params,
          ).toString()}`,
        );
    }
  } catch (err) {
    shouldLogApiRequests && logMsg(err);
  }

  return axiosClient(config).then(onSuccess).catch(onError);
};

export default Api;
