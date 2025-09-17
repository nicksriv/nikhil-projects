import config from "../../config";
import { asyncStorage } from "../asyncStorage";
import { authConstants } from "./authConstants";

const initialState = {
  isAuthenticated: false,
  profileData: {},
};

export const authReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case authConstants.AUTHENTICATED_DATA: {
      return {
        ...initialState,
        isAuthenticated: true,
        profileData: payload,
      };
    }
    case authConstants.RESET_AUTHENTICATED_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};
