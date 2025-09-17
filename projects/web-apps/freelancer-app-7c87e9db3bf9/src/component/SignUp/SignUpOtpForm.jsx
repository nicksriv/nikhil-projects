import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";

import OTPTextInput from "react-native-otp-textinput";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Card from "@app/component/common/Card";
import Separator from "@app/component/common/Separator";
import TextInput from "@app/component/common/TextInput";
import Button from "@app/component/form/Button";

const SignUpOtpForm = ({
  formData,
  onChange,
  onVerifyOtp,
  mobileResendTime,
  emailResendTime,
  onResendOtp,
  formError,
  isLoading,
}) => {
  return (
    <Card style={styles.cardStyle}>
      <Text variant="subtitle1" font="semibold">
        Sign up
      </Text>
      <Text>Enter your details</Text>
      <Separator size={10} />

      <TextInput disabled placeholder="First Name" value={formData.firstName} />
      <TextInput disabled placeholder="Last Name" value={formData.lastName} />

      <Separator size={10} />
      <Text variant="caption" style={styles.enterOtpText}>
        OTP sent to {formData.email}
      </Text>
      <OTPTextInput
        inputCount={6}
        tintColor={R.colors.primary.lightest}
        textInputStyle={{
          borderWidth: R.units.scale(3),
          width: R.units.scale(35),
        }}
        handleTextChange={(value) => onChange("emailOtp", value)}
        containerStyle={{
          marginHorizontal: 8,
        }}
      />
      {formError.emailOtp ? (
        <Text variant="caption" color={R.colors.danger.main}>
          {formError.emailOtp}
        </Text>
      ) : null}

      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text>Didn't receive OTP?</Text>
        {emailResendTime > 0 ? (
          <Text>
            {emailResendTime > 0 ? ` in ${emailResendTime} sec` : null}
          </Text>
        ) : (
          <Text
            color={R.colors.chipBorder}
            onPress={() => onResendOtp({ type: "email" })}
          >
            Resend
          </Text>
        )}
      </View>

      <Separator size={10} />
      <Text variant="caption" style={styles.enterOtpText}>
        OTP sent to {formData.mobile}
      </Text>
      <OTPTextInput
        inputCount={6}
        tintColor={R.colors.primary.lightest}
        textInputStyle={{
          borderWidth: R.units.scale(3),
          width: R.units.scale(35),
        }}
        handleTextChange={(value) => onChange("mobileOtp", value)}
        containerStyle={{
          marginHorizontal: 8,
        }}
      />

      {formError.mobileOtp ? (
        <Text color={R.colors.danger.main} variant="caption">
          {formError.mobileOtp}
        </Text>
      ) : null}
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text>Didn't receive OTP?</Text>
        {mobileResendTime > 0 ? (
          <Text>
            {mobileResendTime > 0 ? ` in ${mobileResendTime} sec` : null}
          </Text>
        ) : (
          <Text
            color={R.colors.chipBorder}
            onPress={() => onResendOtp({ type: "mobile" })}
          >
            Resend
          </Text>
        )}
      </View>
      <Separator size={20} />
      <Button
        text={"Verify OTP"}
        isLoading={isLoading}
        onPress={() => onVerifyOtp()}
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
});
export default React.memo(SignUpOtpForm);
