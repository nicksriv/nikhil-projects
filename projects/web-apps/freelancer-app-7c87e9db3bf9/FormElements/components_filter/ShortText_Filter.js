import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";

const ShortText = (props) => {
  const { data, changedValuesComponent, themeData, resetValue } = props;

  const [textValue, setTextValue] = useState(
    data.value != undefined ? data.value : ""
  );
  const [isFocus, setIsFocus] = useState(false);

  if (data?.hint.length > 15) {
    var newHint = data?.hint.slice(0, 15);
    newHint += "...";
  } else {
    var newHint = data?.hint;
  }
  useEffect(() => {
    setTextValue("");
    changedValuesComponent("", data.componentId);
  }, [resetValue]);

  const changeText = (text) => {
    setTextValue(text);
    changedValuesComponent(text, data.componentId);
  };

  const renderLabel = () => {
    if (isFocus || textValue != "") {
      return (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            backgroundColor: colors.staticWhiteColor,
            left: 12,
            top: -1,
            zIndex: 999,
            paddingHorizontal: RA(5),
            fontSize: 14,
          }}
        >
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
    }
    return null;
  };

  return (
    <View
      style={{
        height: RA(56),
        width: "100%",
        margin: RA(5),
        flexDirection: "row",
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
        onChangeText={(text) => {
          changeText(text);
        }}
        value={textValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {textValue.length > 0 ? null : data.customOptions?.required &&
        !isFocus ? (
        <Text
          style={{
            color: colors.staticRedColor,
            fontFamily: fontsRegular(themeData),
            position: "absolute",
            marginLeft: 10,
            marginTop: 25,
          }}
        >
          *
        </Text>
      ) : null}
    </View>
  );
};

export default ShortText;
const styles = StyleSheet.create({
  default: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.staticWhiteColor,
    fontSize: 15,
    justifyContent: "center",
  },
});
