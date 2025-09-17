import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
const Phone = (props) => {
  const { data, changedValuesComponent, themeData, resetValue } = props;
  const [textValue, setTextValue] = useState(
    data.value != undefined ? data.value : ""
  );
  if (data?.hint.length > 15) {
    var newHint = data?.hint.slice(0, 15);
    newHint += "...";
  } else {
    var newHint = data?.hint;
  }
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setTextValue("");
    changedValuesComponent("", data.componentId);
  }, [resetValue]);

  const changeText = (text) => {
    setTextValue(text);
    changedValuesComponent(text, data.componentId);
  };

  const renderLabel = () => {
    if (textValue || isFocus) {
      return (
        <View style={styles.floatingLabel}>
          <Text
            style={{
              color: isFocus
                ? primaryColor(themeData)
                : colors.staticGrayLabelColor,
              fontFamily: fontsRegular(themeData),
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            {" " + newHint}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        height: RA(54),
        width: "100%",
        flexDirection: "row",
        margin: RA(5),
      }}
    >
      {renderLabel()}
      <TextInput
        mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
        style={styles.default}
        placeholder={isFocus || textValue != "" ? "" : newHint}
        theme={{
          fonts: { regular: { fontFamily: fontsRegular(themeData) } },
          colors: {
            text: colors.staticTextColor,
            primary: primaryColor(themeData),
            underlineColor: colors.transparentColor,
            placeholder: colors.staticGrayLabelColor,
          },
        }}
        defaultValue={data.value}
        editable={true}
        value={textValue}
        onChangeText={(text) => changeText(text)}
        keyboardType={
          Platform.OS === "android"
            ? "phone-pad"
            : Platform.OS === "ios"
            ? "number-pad"
            : "numbers-and-punctuation"
        }
        maxLength={10}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    width: "100%",
    backgroundColor: colors.staticWhiteColor,
    justifyContent: "center",
  },
  floatingLabel: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: colors.staticWhiteColor,
    left: 12,
    top: -5,
    zIndex: 999,
    paddingHorizontal: RA(5),
    fontSize: 14,
  },
});
