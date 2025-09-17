//
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ErrorMessage, Validation } from "./FormValidation";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { useSelector } from "react-redux";

const Email = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const {
    data,
    formik,
    customStyle,
    placeholderText,
    type,
    index,
    changedValues = () => {},
    isRequiredFieldsFilled,
    themeData,
  } = props;
  const [textValue, setTextValue] = useState(
    data.value != undefined ? data.value : ""
  );
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (data.value != undefined) {
      changeText(data.value);
    }
  }, []);

  useEffect(() => {
    if (data.customOptions.required && textValue == "") {
      if (data.value != undefined) {
        changeText(data.value);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        changeText(data.value);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const changeText = (text) => {
    setTextValue(text);
    changedValues(
      text,
      data.id,
      text.length == 0 && data.customOptions.required
        ? false
        : text.length > 0 && !Validation("email", text)
        ? false
        : text.length == 0 && !data.customOptions.required
        ? true
        : Validation("email", text)
    );
  };

  // Submit validation
  // useEffect(() => {
  //   if (
  //     (textValue.length == 0 &&
  //       data.customOptions.required &&
  //       !Validation("email", textValue)) ||
  //     (textValue.length != 0 &&
  //       data.customOptions.required &&
  //       !Validation("email", textValue)) ||
  //     (textValue.length != 0 &&
  //       !data.customOptions.required &&
  //       !Validation("email", textValue))
  //   ) {
  //     themeData.actions.setEmailText("Invalid");
  //   } else {
  //     themeData.actions.setEmailText("");
  //   }
  // }, [textValue]);

  return (
    <View>
      <View
        style={{
          height: 60,
          width: "95%",
          flexDirection: "row",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <TextInput
          mode={data?.fieldVariant}
          style={styles.default}
          label={"  " + data?.label}
          theme={{
            colors: {
              text: colors.staticTextColor,
              primary: primaryColor(themeData),
              underlineColor: colors.transparentColor,
              placeholder: colors.staticTextColor,
            },
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
          }}
          defaultValue={data.value}
          editable={isEditable}
          onChangeText={(text) => changeText(text)}
          error={
            // (textValue.length == 0 && data.customOptions.required) ||
            textValue.length > 0 ? !Validation("email", textValue) : false
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          right={
            <TextInput.Icon name="email" color={colors.staticGrayLabelColor} />
          }
        />
        {textValue.length > 0 ? null : data.customOptions.required &&
          !isFocus ? (
          <Text
            style={{
              color: colors.staticRedColor,
              position: "absolute",
              marginLeft: 10,
              marginTop: 25,
              fontFamily: fontsRegular(themeData),
            }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View style={styles.helpersWrapper}>
        <HelperText
          type="error"
          style={styles.helper}
          visible={
            // textValue.length == 0 && data.customOptions.required
            //   ? true
            //   :
            textValue.length > 0 ? !Validation("email", textValue) : false
          }
        >
          {textValue.length == 0 && data.customOptions.required
            ? "Required"
            : ErrorMessage("email")}
        </HelperText>
      </View>
    </View>
  );
};
export default Email;
const styles = StyleSheet.create({
  default: {
    // margin: 10,
    // height: 60,
    width: "100%",
    backgroundColor: colors.staticProfileDisableShowColor,
  },
  helpersWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: "right",
  },
});
