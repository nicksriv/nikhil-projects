import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
const Email = (props) => {
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
    <View>
      <View
        style={{
          height: RA(56),
          width: "100%",
          flexDirection: "row",
          margin: RA(5),
        }}
      >
        {renderLabel()}
        <TextInput
          mode="outlined"
          style={styles.default}
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
          placeholder={isFocus || textValue != "" ? "" : newHint}
          onChangeText={(text) => changeText(text)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <Icon
          name="email"
          size={20}
          color={colors.staticGrayLabelColor}
          style={{ marginLeft: -30, marginTop: RA(22) }}
        />
      </View>
    </View>
  );
};

export default Email;
const styles = StyleSheet.create({
  default: {
    fontSize: RA(15),
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
