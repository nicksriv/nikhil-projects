import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
const LongText = (props) => {

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
        value={textValue}
        editable={true}
        onChangeText={(text) => changeText(text)}
        error={/^[a-zA-Z0-9_ ]*$/.test(textValue) ? false : true}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        multiline
      />
    </View>
  );
};

export default LongText;
const styles = StyleSheet.create({
  default: {
    width: "100%",
    backgroundColor: colors.staticWhiteColor,
    fontSize: 15,
    height: "100%",
    justifyContent: "center",
  },
});
