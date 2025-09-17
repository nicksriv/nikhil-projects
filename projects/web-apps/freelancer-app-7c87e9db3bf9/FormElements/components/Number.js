import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { ErrorMessage, Validation } from "./FormValidation";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { useSelector } from "react-redux";

const Number = (props) => {
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
    changedValues,
    isRequiredFieldsFilled,
    themeData,
  } = props;

  const [textValue, setTextValue] = useState(
    data?.value != undefined
      ? data?.value.toString()
      : data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ? data?.customOptions?.defaultValue.toString()
      : ""
  );
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (data.customOptions.required && textValue == "") {
      if (data.value != undefined) {
        changeText(data.value.toString());
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        changeText(data?.customOptions?.defaultValue.toString());
        changedValues(data?.customOptions?.defaultValue, data.id, true);
        changedValues(data?.customOptions?.defaultValue, data.id, true);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        changeText(data.value.toString());
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        changeText(data?.customOptions?.defaultValue.toString());
        changedValues(data?.customOptions?.defaultValue, data.id, true);
        changedValues(data?.customOptions?.defaultValue, data.id, true);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const changeText = (text) => {
    setTextValue(text);
    changedValues(
      parseInt(text),
      data.id,
      text.length == 0 && data.customOptions.required
        ? false
        : text.length == 0 && !data.customOptions.required
        ? true
        : (data.customOptions.max != "" && text > data.customOptions.max) ||
          (data.customOptions.min != "" && text < data.customOptions.min)
        ? false
        : Validation("numbers", text)
    );
  };

  return (
    <View>
      <View
        style={{
          // height: 60,
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
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              text: colors.staticTextColor,
              primary: primaryColor(themeData),
              underlineColor: colors.transparentColor,
              placeholder: colors.staticTextColor,
            },
          }}
          // defaultValue={data?.value != undefined ? String(data?.value) : null}
          defaultValue={
            data?.value != undefined
              ? String(data?.value)
              : data?.customOptions?.defaultValue != "" &&
                data?.customOptions?.defaultValue != undefined
              ? data?.customOptions?.defaultValue.toString()
              : null
          }
          editable={
            data?.customOptions?.isFieldDisabled
              ? !data?.customOptions?.isFieldDisabled
              : isEditable
          }
          onChangeText={(text) => changeText(text)}
          error={
            data.customOptions.max == ""
              ? false
              : (textValue > data.customOptions.max &&
                  textValue < data.customOptions.min) ||
                !Validation("numbers", textValue)
            // ||
            // (isRequiredFieldsFilled &&
            //   textValue.length == 0 &&
            //   data.customOptions.required)
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          returnKeyType={"done"}
          keyboardType={
            Platform.OS === "android"
              ? "phone-pad"
              : Platform.OS === "ios"
              ? "number-pad"
              : "numbers-and-punctuation"
          }
        />
        {textValue.length > 0 ? null : data.customOptions?.required &&
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
            // (textValue.length == 0 && isRequiredFieldsFilled) ||
            (textValue.length != 0 &&
              data?.customOptions?.required &&
              (data.customOptions.max != ""
                ? textValue > data.customOptions.max
                : 0 || data.customOptions.min != ""
                ? textValue < data.customOptions.min
                : 0)) ||
            !Validation("numbers", textValue) ||
            (textValue.length != 0 &&
              !data?.customOptions?.required &&
              (textValue > data.customOptions.max ||
                textValue < data.customOptions.min))
          }
          //visible={true}
        >
          {textValue.length == 0 && data.customOptions.required
            ? "Required"
            : (data.customOptions.max != "" &&
                textValue > data.customOptions.max) ||
              textValue < data.customOptions.min
            ? ErrorMessage(
                "numberRange",
                data.customOptions.min,
                data.customOptions.max
              )
            : ErrorMessage("numbers")}
        </HelperText>
      </View>
    </View>
  );
};

export default Number;
const styles = StyleSheet.create({
  default: {
    width: "100%",
    backgroundColor: colors.staticProfileDisableShowColor,
    // margin: 10,
    // height: 56,
    // width: 360,
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
