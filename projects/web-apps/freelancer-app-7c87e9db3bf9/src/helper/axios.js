import * as coreAxios from "axios";
import _get from "lodash.get";

import config from "../config";
import { asyncStorage } from "../store/asyncStorage";
import { authActions } from "../store/auth/authActions";
import { commonActions } from "../store/common/commonActions";

export const axiosInterceptor = (dispatch) => {
  axios.interceptors.request.use(async (request) => {
    const authToken = await asyncStorage.getToken();
    if (authToken) {
      request["headers"]["Authorization"] = `Bearer ${authToken}`;
    }

    return request;
  });

  //response interceptors
  axios.interceptors.response.use(
    (response) => {
      if (!response.data) {
        return response;
      }

      return response.data;
    },
    (error) => {
      console.log("ERRR",JSON.stringify(error))

      const status = _get(error, 'response.status', -1);
      let toastMessage = _get(error, 'response.data.message', 'Something went wrong! Please contact support team');

      if (status === 401) {
        dispatch(authActions.logout());
      }

      if (status >= 500) {
        toastMessage = 'Something went wrong! Please contact support team';
      }

      if (status !== 401) {
        dispatch(commonActions.setToast({ message: toastMessage }));
      }

      return Promise.reject(error);
    }
  );
};

export const axios = coreAxios.default.create({
  baseURL: config.baseURL,
});

export const dynamicModuleInterceptor = (dispatch) => {
  dynamicModuleAxios.interceptors.request.use(async (request) => {
    
    const authToken = await asyncStorage.getToken();
    if (authToken) {
      request["headers"]["Authorization"] = `Bearer ${authToken}`;
    }

    return request;
  });

  //response interceptors
  dynamicModuleAxios.interceptors.response.use(
    (response) => {
      if (!response.data) {
        return response;
      }

      return response.data;
    },
    (error) => {
      const status = _get(error, 'response.status', -1);
      let toastMessage = _get(error, 'response.data.message', 'Something went wrong! Please contact support team');

      // if (status === 401) {
      //   dispatch(authActions.logout());
      // }

      if (status >= 500) {
        toastMessage = 'Something went wrong! Please contact support team';
      }

      // if (status !== 401) {
      //   dispatch(commonActions.setToast({ message: toastMessage }));
      // }

      return Promise.reject(error);
    }
  );
};

export const dynamicModuleAxios = coreAxios.default.create({
  baseURL: config.dynamicMdodule,
});
