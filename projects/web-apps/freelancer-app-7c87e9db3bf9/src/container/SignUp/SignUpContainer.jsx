import React from 'react';
import {R} from '@app/res';

import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import Link from '@app/component/common/Link';

import AuthLayout from '@app/component/Layouts/AuthLayout';
import SignUpForm from '@app/component/SignUp/SignUpForm';
import SignUpOtpForm from '@app/component/SignUp/SignUpOtpForm';

import {validationHelper} from '@app/helper/validation';
import {authApis} from '@app/store/auth/authApis';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import {asyncStorage} from '@app/store/asyncStorage';

const otpRequestTimer = 30;
export default class SignUpContainer extends React.Component {
  emailInterval = 0;
  mobileInterval = 0;
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        emailOtp: '',
        mobile: '',
        mobileOtp: '',
        emailVerifyId: '',
        mobileVerifyId: '',
      },
      formError: {
        firstName: '',
        lastName: '',
        email: '',
        emailOtp: '',
        mobile: '',
        mobileOtp: '',
        emailVerifyId: '',
        mobileVerifyId: '',
      },
      isOtpRequested: false,
      isLoading: false,
      emailResendTime: 0,
      mobileResendTime: 0,
    };
  }

  componentWillUnmount = () => {
    clearInterval(this.emailInterval);
    clearInterval(this.mobileInterval);
  };

  emailResendTimer = async () => {
    try {
      const {emailResendTime, formData} = this.state;
      const res = await authApis.signUpResendEmailOtp({
        email: formData.email,
        mobile: formData.mobile,
      });
      if (emailResendTime > 0) {
        return;
      }
      this.setState({emailResendTime: otpRequestTimer});

      this.emailInterval = setInterval(() => {
        const {emailResendTime} = this.state;
        let time = emailResendTime - 1;
        this.setState({emailResendTime: time});
        time === 0 && clearInterval(this.emailInterval);
      }, 1000);
    } catch (error) {}
  };

  mobileResendTimer = async () => {
    try {
      const {mobileResendTime, formData} = this.state;
      const res = await authApis.signUpResendMobileOtp({
        email: formData.email,
        mobile: formData.mobile,
      });
      if (mobileResendTime > 0) {
        return;
      }

      this.setState({mobileResendTime: otpRequestTimer});
      this.mobileInterval = setInterval(() => {
        const {mobileResendTime} = this.state;
        let time = mobileResendTime - 1;
        this.setState({mobileResendTime: time});
        time === 0 && clearInterval(this.mobileInterval);
      }, 1000);
    } catch (error) {}
  };

  handleResendOtp = async ({type}) => {
    if (type === 'email') {
      this.emailResendTimer();
    }
    if (type === 'mobile') {
      this.mobileResendTimer();
    }
  };

  // getGeoLocationPermission = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync();
  //   await asyncStorage.setLocation({
  //     long: location.coords.longitude,
  //     lat: location.coords.latitude,
  //   });
  // };

  handleInputChange = (name, value) => {
    const {formData} = this.state;
    formData[name] = value;
    this.setState({formData});
  };

  handleValidation = () => {
    const {formError, formData} = this.state;

    const firstNameValidation = validationHelper.name(formData.firstName);
    formError.firstName = firstNameValidation.message;

    const lastNameValidation = validationHelper.lastName(formData.lastName);
    formError.lastName = lastNameValidation.message;

    const emailValidation = validationHelper.email(formData.email);
    formError.email = emailValidation.message;

    const mobileValidation = validationHelper.mobile(formData.mobile);
    formError.mobile = mobileValidation.message;

    this.setState({formError});
    return (
      firstNameValidation.isValid &&
      lastNameValidation.isValid &&
      emailValidation.isValid &&
      mobileValidation.isValid
    );
  };
  handleOtpValidation = () => {
    const {formError, formData} = this.state;

    const emailOtpValidation = validationHelper.otp(formData.emailOtp);
    formError.emailOtp = emailOtpValidation.message;

    const mobileOtpValidation = validationHelper.otp(formData.mobileOtp);
    formError.mobileOtp = mobileOtpValidation.message;
    this.setState({formError});
    return mobileOtpValidation.isValid && emailOtpValidation.isValid;
  };

  handleSignUpRequestOtp = async () => {
    const validation = this.handleValidation();
    if (!validation) {
      return;
    }
    try {
      this.setState({isLoading: true});
      const {formData} = this.state;
      // firstName: formData.firstName,
      // lastName: formData.lastName,
      this.setState({isLoading: true});

      const res = await authApis.signUpRequestOtp({
        mobile: formData.mobile,
        email: formData.email,
      });
      this.setState({isLoading: false});
      this.setState({isOtpRequested: true});
      return;
    } catch (err) {
      console.log('handleSignUpRequestOtp error :', err);
    } finally {
      this.setState({isLoading: false});
    }
  };

  handleSignUpVerifyOtp = async () => {
    const otpValidation = this.handleOtpValidation();
    if (!otpValidation) {
      return;
    }
    try {
      const {formData} = this.state;
      const payload = {
        mobile: formData.mobile,
        mobileOTP: formData.mobileOtp,
        email: formData.email,
        emailOTP: formData.emailOtp,
      };
      const res = await authApis.signUpVerifyOtp(payload);
      if (Object.keys(res).length > 0) {
        this.createAccount({
          emailVerifyId: res.emailVerifyId,
          mobileVerifyId: res.mobileVerifyId,
        });
      }
    } catch (err) {
      console.log('handleSignUpVerifyOtp error : ', err);
    }
  };

  createAccount = async ({emailVerifyId, mobileVerifyId}) => {
    try {
      const {formData} = this.state;
      let location = await asyncStorage.getLocation();
      location = JSON.parse(location);
      const payload = {
        mobile: formData.mobile,
        mobileOTP: formData.mobileOtp,
        email: formData.email,
        emailOTP: formData.emailOtp,
        mobileVerifyId: mobileVerifyId,
        emailVerifyId: emailVerifyId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        lat: location.long,
        lng: location.lat,
      };
      this.setState({isLoading: true});
      const res = await authApis.createAccount(payload);
      await asyncStorage.setToken(res.token);
      // // redirect to home screen
      this.props.setAuthenticationAction(res);
    } catch (err) {
      console.log('createAccount err: ', err);
    }
  };

  render() {
    const {isOtpRequested, formData, formError, isLoading} = this.state;
    return (
      <AuthLayout>
        {isOtpRequested ? (
          <SignUpOtpForm
            formData={formData}
            isLoading={isLoading}
            onChange={this.handleInputChange}
            formError={formError}
            onVerifyOtp={this.handleSignUpVerifyOtp}
            handleResendOtp={this.handleResendOtp}
            emailResendTime={this.state.emailResendTime}
            mobileResendTime={this.state.mobileResendTime}
            onResendOtp={this.handleResendOtp}
          />
        ) : (
          <SignUpForm
            isLoading={isLoading}
            onRequestOtp={this.handleSignUpRequestOtp}
            onChange={this.handleInputChange}
            formData={formData}
            formError={formError}
          />
        )}

        <View
          style={{
            paddingLeft: R.units.scale(20),
            paddingTop: R.units.scale(2),
            flexDirection: 'row',
          }}>
          <Text variant="body1">Already have an account? </Text>
          <Link variant="body1" redirectTo={ScreenConstants.LOGIN}>
            Sign in
          </Link>
        </View>
      </AuthLayout>
    );
  }
}
