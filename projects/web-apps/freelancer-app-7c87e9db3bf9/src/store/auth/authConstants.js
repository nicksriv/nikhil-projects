export const authConstants = {
  AUTHENTICATED_DATA: "AUTHENTICATED_DATA",
  RESET_AUTHENTICATED_DATA: "RESET_AUTHENTICATED_DATA",

  LOGIN_REQUEST_OTP_API: "authenticate/send-otp",
  LOGIN_VERIFY_OTP_API: "authenticate/verify-otp",
  LOGIN_RESEND_OTP_API: "authenticate/send-otp",

  SIGNUP_REQUEST_OTP_API: "authenticate/onboarding/step-1/send-otp",
  SIGNUP_VERIFY_OTP_API: "authenticate/onboarding/step-2/verify-otp",
  SIGNUP_RESEND_OTP_API: "authenticate/onboarding/step-1/send-otp",
  CREATE_ACCOUNT_API: "authenticate/onboarding/step-3/create-account",

  LOGOUT_API: "authenticate/logout",
  LOGOUT_SAGA: "LOGOUT_SAGA",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_RESPONSE: "LOGOUT_RESPONSE",

  VENDOR_USER_LOGIN_API:"authenticate/vendor/login"
};
