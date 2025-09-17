import React from 'react';
import {R} from '@app/res';

import View from '@app/component/common/View';
import Text from '@app/component/common/Text';

import AuthLayout from '@app/component/Layouts/AuthLayout';
import LoginForm from '@app/component/Login/LoginForm';
import LoginOtp from '@app/component/Login/LoginOtp';
import VendorUserLoginForm from '@app/component/Login/VendorUserLoginForm';

import {validationHelper} from '@app/helper/validation';
import {asyncStorage} from '@app/store/asyncStorage';
import {authApis} from '@app/store/auth/authApis';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import {StyleSheet} from 'react-native';
import {navigationHelper} from '@app/helper/navigation';

const otpRequestTimer = 30;
export default class LoginContainer extends React.Component {
  mobileInterval = 0;
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        mobile: '918268052323',
        mobileOtp: '111111',
        userName: 'VUAS176768',
        password: '12345678',
        // userName: 'VUDP154418',
        // password: '987654321',
      },
      formError: {
        mobile: '',
        mobileOtp: '',
        userName: '',
        password: '',
      },
      isOtpRequested: false,
      isSendOtpLoading: false,
      isVerifyOtpLoading: false,
      mobileResendTime: 0,
      showResendOTP: false,
      isVendorUserLoading: false,
    };
  }
  async componentDidMount() {
    await this.setUserType();
  }

  setUserType = async () => {
    try {
      const {name} = this.props.route.params;
      const userType = await asyncStorage.setUserType(name);
    } catch (error) {
    }
  };

  handleInputChange = (name, value) => {
    const {formData} = this.state;
    formData[name] = value;
    this.setState({formData});
  };

  handleMobileValidation = () => {
    const {formError, formData} = this.state;
    const mobileValidation = validationHelper.mobile(formData.mobile);
    formError.mobile = mobileValidation.message;

    this.setState({formError});
    return mobileValidation.isValid;
  };

  handleOtpValidation = () => {
    const {formError, formData} = this.state;
    const mobileOtpValidation = validationHelper.otp(formData.mobileOtp);
    formError.mobileOtp = mobileOtpValidation.message;
    return mobileOtpValidation.isValid;
  };

  handleVendorUserValidation = () => {
    const {formError, formData} = this.state;
    const userNameValidation = validationHelper.name(formData.userName);
    formError.userName = userNameValidation.message;

    const passwordValidation = validationHelper.name(formData.password);
    formError.password = passwordValidation.message;

    this.setState({formError});
    return userNameValidation.isValid && passwordValidation;
  };

  handleLoginRequestOtp = async () => {
    const validation = this.handleMobileValidation();
    if (!validation) {
      return;
    }
    try {
      const {formData} = this.state;
      const payload = {
        mobile: formData.mobile,
      };
      this.setState({isSendOtpLoading: true});
      const res = await authApis.loginRequestOtp(payload);
      this.setState({isOtpRequested: true});

      return;
    } catch {
      this.setState({isSendOtpLoading: false});
    }
  };

  handleLoginOtpVerify = async () => {
    const validation = this.handleOtpValidation();
    if (!validation) {
      return;
    }
    try {
      const {formData} = this.state;
      const payload = {
        mobile: formData.mobile,
        otp: formData.mobileOtp,
      };
      this.setState({isVerifyOtpLoading: true});
      const res = await authApis.loginVerifyOtp(payload);
      global.authToken = res.token
      await asyncStorage.setToken(res.token);
      const profileData = {
        firstName: res.firstName,
        lastName: res.lastName,
        profileImage: res.profileImage,
        profileCompleted: res.profileCompleted,
        profileCompletionPercentage: res.profileCompletionPercentage,
      };
      await asyncStorage.setProfileData(profileData);
      this.props.setAuthenticationAction(res);
      // return;
    } catch (error) {
      this.setState({isVerifyOtpLoading: false});
    }
  };

  handleResendOtp = async () => {
    this.setState({showResendOTP: true});
    this.handleLoginRequestOtp();
  };

  mobileResendTimer = () => {
    const {mobileResendTime} = this.state;
    if (mobileResendTime > 0) {
      return;
    }
    this.setState({mobileResendTime: otpRequestTimer});
    this.mobileInterval = setInterval(() => {
      const {mobileResendTime} = this.state;
      let time = mobileResendTime - 1;
      this.setState({mobileResendTime: time});
      if (time === 0) {
        this.setState({showResendOTP: false});
        clearInterval(this.mobileInterval);
      }
    }, 1000);
  };

  handleVendorUserOncontinue = async () => {
    // const validation = this.handleVendorUserValidation();
    // if (!validation) {
    //   return;
    // }

    try {
      const {formData} = this.state;
      const payload = {
        userName: formData.userName,
        password: formData.password,
        userType: 'VENDOR_USER',
      };
      this.setState({isVendorUserLoading: true});
      const res = await authApis.vendorUserLoginApi(payload);
      console.log(res, 'vendor login ress===>');
      await asyncStorage.setToken(res.token);
      const profileData = {
        firstName: res.firstName ?? '',
        lastName: res.lastName ?? '',
        profileImage: res.profileImage === null ? '' : res.profileImage,
        profileCompleted: res.profileCompleted ?? '',
      };
      await asyncStorage.setProfileData(profileData);
      this.props.setAuthenticationAction(res);
    } finally {
      this.setState({isVendorUserLoading: false});
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.mobileInterval);
  };
  handleScreenRedirection = key => {
    if (key === 'noaccount') {
      navigationHelper.navigate({
        name: ScreenConstants.SIGNUP,
      });
    }
    if (key === 'notafreelancer' || key === 'notavendor-user') {
      navigationHelper.navigate({
        name: ScreenConstants.USER_SELECTION_SCREEN,
      });
    }
  };

  render() {
    const {
      isOtpRequested,
      formData,
      formError,
      isSendOtpLoading,
      isVerifyOtpLoading,
      showResendOTP,
    } = this.state;
    const {name: userType} = this.props.route.params
      ? this.props.route.params
      : 'freelancer';
    return (
      <AuthLayout>
        {userType === 'vendor-user' ? (
          <VendorUserLoginForm
            formData={formData}
            formError={formError}
            onChange={this.handleInputChange}
            onContinue={this.handleVendorUserOncontinue}
            isLoading={this.state.isVendorUserLoading}
          />
        ) : isOtpRequested ? (
          <LoginOtp
            isLoading={isVerifyOtpLoading}
            onChange={this.handleInputChange}
            formData={formData}
            formError={formError}
            onVerify={this.handleLoginOtpVerify}
            mobileResendTime={this.state.mobileResendTime}
            onResendOtp={this.handleResendOtp}
            showResendOTP={showResendOTP}
          />
        ) : (
          <LoginForm
            isLoading={isSendOtpLoading}
            onContinue={this.handleLoginRequestOtp}
            onChange={this.handleInputChange}
            formData={formData}
            formError={formError}
          />
        )}
        {userType === 'vendor-user' ? (
          <View style={styles.linkView}>
            <Text variant="caption">Not a company user?</Text>
            <Text
              variant="caption1"
              color={R.colors.primary.link}
              textDecoration="underline"
              onPress={() => this.handleScreenRedirection('notavendor-user')}>
              Switch User
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.linkView}>
              <Text variant="caption">Don't have an account? </Text>
              <Text
                variant="caption1"
                textDecoration="underline"
                color={R.colors.primary.link}
                onPress={() => this.handleScreenRedirection('noaccount')}>
                Sign up
              </Text>
            </View>
            <View style={styles.linkView}>
              <Text variant="caption">Not a freelancer user?</Text>
              <Text
                variant="caption1"
                color={R.colors.primary.link}
                textDecoration="underline"
                onPress={() => this.handleScreenRedirection('notafreelancer')}>
                Switch User
              </Text>
            </View>
          </>
        )}
      </AuthLayout>
    );
  }
}

const styles = StyleSheet.create({
  linkView: {
    paddingLeft: R.units.scale(20),
    paddingTop: R.units.scale(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
