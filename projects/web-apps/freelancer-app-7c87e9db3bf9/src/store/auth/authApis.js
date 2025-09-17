import { authConstants } from "./authConstants";
import { axios } from "../../helper/axios";

const authApis = {};

authApis.signUpRequestOtp = async ({ mobile, email }) => {
  const res = await axios.post(authConstants.SIGNUP_REQUEST_OTP_API, {
    email,
    mobile,
    otpType: null,
  });
  return res;
};
authApis.signUpResendEmailOtp = async ({ email, mobile }) => {
  const res = await axios.post(authConstants.SIGNUP_REQUEST_OTP_API, {
    email,
    mobile,
    otpType: "EMAIL",
  });
  return res;
};
authApis.signUpResendMobileOtp = async ({ email, mobile }) => {
  const res = await axios.post(authConstants.SIGNUP_REQUEST_OTP_API, {
    email,
    mobile,
    otpType: "MOBILE",
  });
  return res;
};

authApis.signUpVerifyOtp = async (payload) => {
  const res = await axios.post(authConstants.SIGNUP_VERIFY_OTP_API, payload);
  return res;
};

authApis.createAccount = async (payload) => {
  const res = await axios.post(authConstants.CREATE_ACCOUNT_API, payload);
  return res;
};

authApis.loginRequestOtp = async (payload) => {
  const res = await axios.post(authConstants.LOGIN_REQUEST_OTP_API, payload);
  return res;
};

authApis.loginVerifyOtp = async (payload) => {
  const res = await axios.post(authConstants.LOGIN_VERIFY_OTP_API, payload);
  return res;
};

authApis.logoutApi = async (payload) => {
  const res = await axios.get(authConstants.LOGOUT_API, payload);
  return res;
};

authApis.vendorUserLoginApi = async(payload)=>{
  const res = await axios.post(authConstants.VENDOR_USER_LOGIN_API,payload)
  return res;
}
export { authApis };
