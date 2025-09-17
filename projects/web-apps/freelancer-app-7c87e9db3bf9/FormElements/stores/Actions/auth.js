import { LOGIN, LOADER_OFF, LOADER_ON, ERROR,REDIRECT_LOGIN } from "../../constants";
import apiConfig from "../../api/api_config";
import envConfig from "../../api/env";
import jwt_decode from "jwt-decode";

const baseUrl = envConfig.BaseUrl;
const ClientLogo = envConfig.ClientLogo;
const api = apiConfig.urls.list;
const fullUrl = baseUrl + api;

export function setAuth(rowList) {
  return {
    type: LOGIN,
    payload: rowList,
  };
}
export function setredirectlogin(login) {
  return {
    type: REDIRECT_LOGIN,
    payload: login,
  };
}

export function setError(rowList) {
  return {
    type: ERROR,
    payload: rowList,
  };
}
export function login(payload) {
  return async (dispatch) => {
    dispatch(loaderOn());
    return fetch(ClientLogo+`api/v1/users/authenticate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var decoded = jwt_decode(responseJson?.token);
        console.log("decoded", decoded);
        global.authToken = decoded.token;
        dispatch(setAuth({ ...responseJson, decoded }));
        dispatch(loaderOff());
        return responseJson;
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(setError(error));
        global.authToken = "";
        dispatch(loaderOff());
      });
  };
}

export function logOut() {
  return async (dispatch) => {
    console.log("Logout");
    dispatch(loaderOn());
    return fetch(ClientLogo+`/api/v1/logout`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: global.authToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(setError(null));
        dispatch(setAuth({}));
        dispatch(loaderOff());
      })
      .catch((error) => {
        console.log("error", error);
        global.authToken = "";
        dispatch(setError(error));
        dispatch(loaderOff());
      });
  };
}

export function loaderOn() {
  return {
    type: LOADER_ON,
  };
}
export function loaderOff() {
  return {
    type: LOADER_OFF,
  };
}
