import React from 'react';
import {StyleSheet} from 'react-native';
import {R} from '@app/res';

import OTPTextInput from 'react-native-otp-textinput';

import Text from '@app/component/common/Text';
import View from '@app/component/common/View';
import Card from '@app/component/common/Card';
import Separator from '@app/component/common/Separator';
import Button from '@app/component/form/Button';

const LoginOtp = ({
  formData,
  onVerify,
  onChange,
  isLoading,
  mobileResendTime,
  onResendOtp,
  formError,
  showResendOTP,
}) => {
  return (
    <Card style={styles.cardStyle}>
      <Text variant="subtitle1" font="semibold">
        OTP Verification
      </Text>
      <Text>
        Sent on {formData.mobile}
        {''}
      </Text>
      <Separator size={20} />
      <OTPTextInput
        defaultValue={formData.mobileOtp}
        inputCount={6}
        tintColor={R.colors.primary.lightest}
        textInputStyle={{
          borderWidth: R.units.scale(3),
          width: R.units.scale(35),
        }}
        handleTextChange={value => onChange('mobileOtp', value)}
        containerStyle={{
          marginHorizontal: 8,
        }}
      />
      <Text color={R.colors.danger.main} variant="caption">
        {formError.mobileOtp}
      </Text>
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between">
        <Text>Didn't receive OTP?</Text>
        {mobileResendTime > 0 ? (
          <Text>
            {mobileResendTime > 0 ? ` in ${mobileResendTime} sec` : null}
          </Text>
        ) : (
          <Text color={R.colors.chipBorder} onPress={() => onResendOtp()}>
            Resend
          </Text>
        )}
      </View>
      <Separator size={20} />
      <Button
        text={'Verify OTP'}
        onPress={() => {
          onVerify();
        }}
        isLoading={isLoading}
        size="md"
        variant="contained"
        disabled={isLoading ? true : false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingBottom: R.units.scale(12),
  },
  errorMessage: {},
});
export default LoginOtp;
