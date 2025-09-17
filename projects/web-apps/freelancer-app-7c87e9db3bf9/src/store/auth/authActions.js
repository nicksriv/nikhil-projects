import { authConstants } from "./authConstants";

const authActions = {};

authActions.setAuthentication = (payload) => {
  return {
    type: authConstants.AUTHENTICATED_DATA,
    payload,
  };
};

authActions.logout = () => (
  {
    type: authConstants.LOGOUT_SAGA,
  }
);

export { authActions };
