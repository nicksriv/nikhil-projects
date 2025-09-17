import React from "react";
import Text from "./Text";
import { StyleSheet, TextInput as RNTextInput } from "react-native";
import { R } from "../../res";

const TextInput = ({ disabled = false, onChange, error, value,helperText, style, ...props }) => {
  return (
    <>
      <RNTextInput
        style={disabled ? [styles.inputDisableStyle, style] : [styles.inputStyle, style]}
        editable={disabled ? false : true}
        onChangeText={onChange}
        value={value}
        placeholderTextColor={R.colors.text.secondary}
        {...props}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      {helperText ? <Text style={styles.helperTextMessage}>{helperText}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: R.colors.background.input,
    fontSize: R.units.scale(14),
    padding: R.units.scale(10),
    textAlign: "left",
    marginVertical: R.units.scale(10),
    borderRadius: R.units.scale(5),
    color:R.colors.black
  },
  inputDisableStyle: {
    backgroundColor: R.colors.background.disabled,
    opacity: 0.5,
    fontSize: R.units.scale(14),
    padding: R.units.scale(10),
    textAlign: "left",
    marginVertical: R.units.scale(10),
    borderRadius: R.units.scale(5),
  },
  errorMessage: {
    color: R.colors.text.error,
    fontSize: R.units.scale(10),
    paddingHorizontal: R.units.scale(10),
    paddingLeft: 0,
    marginBottom: R.units.scale(4),
    lineHeight: R.units.scale(12),
  },
  helperTextMessage:{
    color:"#0009",
    fontSize: R.units.scale(8),
    marginLeft:R.units.scale(3)
  }
});

export default TextInput;
