import { LOGIN,REDIRECT_LOGIN } from "../../constants";
const initialState = {
  login: {},
  loginredirect: true,
};
const AuthReducr = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: action.payload,
      };
      case REDIRECT_LOGIN:
      return {
        ...state,
        loginredirect: action.payload,
      };
    default:
      return state;
  }
};
export default AuthReducr;
