import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";


import Text from "@app/component/common/Text";
import Card from "@app/component/common/Card";
import Separator from "@app/component/common/Separator";
import TextInput from "@app/component/common/TextInput";
import Button from "@app/component/form/Button";

const SignUpForm = ({
  onRequestOtp,
  onChange,
  formData,
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

      <TextInput
        placeholder="First Name"
        name="firstName"
        onChange={(value) => onChange("firstName", value)}
        value={formData.firstName}
        error={formError.firstName}
      />
      <TextInput
        placeholder="Last Name"
        name="lastName"
        onChange={(value) => onChange("lastName", value)}
        value={formData.lastName}
        error={formError.lastName}
      />
      <TextInput
        placeholder="Email Id"
        name="email"
        onChange={(value) => onChange("email", value)}
        value={formData.email}
        error={formError.email}
      />
      <TextInput
        placeholder="Mobile Number"
        keyboardType="numeric"
        name="mobile"
        onChange={(value) => onChange("mobile", value)}
        value={formData.mobile}
        error={formError.mobile}
      />

      <Separator size={20} />
      <Button
        text={"Request Otp"}
        onPress={() => onRequestOtp()}
        isLoading={isLoading}
        disabled={isLoading ? true : false}
        size="md"
        variant="contained"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingBottom: R.units.scale(12),
  },
});
export default SignUpForm;
