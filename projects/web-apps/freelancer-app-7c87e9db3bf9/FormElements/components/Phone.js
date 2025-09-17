import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { ErrorMessage, Validation } from "./FormValidation";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { useSelector } from "react-redux";
const Phone = (props) => {
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
    data?.value != undefined ? data?.value?.slice(3) : ""
  );
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (data.customOptions.required && textValue == "") {
      if (textValue != undefined) {
        changeText(textValue);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (textValue != undefined) {
        changeText(textValue);
      }
    }
  }, []);

  const changeText = (text) => {
    setTextValue(text);
    changedValues(
      "+91"+text,
      data.id,
      data.customOptions.required && text.length != 10
        ? false
        : text.length > 0 && !data.customOptions.required && text.length != 10
        ? false
        : !Validation("numbers", text)
        ? false
        : true
    );
  };
  // useEffect(() => {
  //   if (data.customOptions.required && textValue.length != 10) {
  //     themeData.actions.setPhoneText("Invalid");
  //   } else {
  //     themeData.actions.setPhoneText("");
  //   }
  // }, [textValue]);
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
        {data.customOptions.countryCode ? (
          <TextInput
            mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
            style={{ width: "17%", backgroundColor: colors.staticProfileDisableShowColor, }}
            label={""}
            placeholder={""}
            theme={{
              fonts: { regular: { fontFamily: fontsRegular(themeData) } },
              colors: {
                text: colors.staticTextColor,
                primary: colors.lightGrayColor,
                underlineColor: colors.transparentColor,
                placeholder: colors.staticTextColor,
              },
            }}
            defaultValue={data?.value != undefined ? data?.value?.slice(0, 3) : "+91"}
            editable={false}
          />
        ) : null}
        <TextInput
          mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
          style={{
            width: data.customOptions.countryCode ? "82%" : "100%",
            marginLeft: data.customOptions.countryCode ? "2%" : "0%",
            backgroundColor: colors.staticProfileDisableShowColor,
          }}
          label={"  " + data?.label}
          // placeholder={data?.label}
          theme={{
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              text: colors.staticTextColor,
              primary: primaryColor(themeData),
              underlineColor: colors.transparentColor,
              placeholder: colors.staticTextColor,
            },
          }}
          defaultValue={data?.value?.slice(3)}
          editable={isEditable}
          onChangeText={(text) => changeText(text)}
          // maxLength={
          //   data.customOptions.charLimit != undefined &&
          //   data.customOptions.charLimit != null &&
          //   String(data.customOptions.charLimit).length > 0
          //     ? Number(data.customOptions.charLimit)
          //     : 100000000000
          // }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          error={
            // textValue.length == 0 && data.customOptions.required
            //   ? true
            //   : 
              textValue.length > 0 && textValue.length != 10
              ? true
              : !Validation("numbers", textValue)
              ? true
              : false
            // data.customOptions.max == ""
            //   ? false
            //   : textValue > data.customOptions.max ||
            //     !Validation("numbers", textValue) ||
            //     (isRequiredFieldsFilled &&
            //       textValue.length == 0 &&
            //       data.customOptions.required)
          }
          returnKeyType={ 'done' }
          keyboardType={
            Platform.OS === "android"
              ? "phone-pad"
              : Platform.OS === "ios"
              ? "number-pad"
              : "numbers-and-punctuation"
          }
          maxLength={10}
          right={<TextInput.Icon name="phone" color={colors.staticGrayLabelColor} />}
        />
        {textValue.length > 0 ? null : data.customOptions?.required &&
          !isFocus ? (
          <Text
            style={{
              color: colors.staticRedColor,
              position: "absolute",
              marginLeft: "22%",
              marginTop: 25,
              fontFamily: fontsRegular(props),
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
              textValue.length > 0 && textValue.length != 10
              ? true
              : !Validation("numbers", textValue)
              ? true
              : false
            // data.customOptions.max == ""
            //   ? false
            //   : textValue > data.customOptions.max ||
            //     !Validation("numbers", textValue) ||
            //     (isRequiredFieldsFilled &&
            //       textValue.length == 0 &&
            //       data.customOptions.required)
          }
        >
          {textValue.length == 0 && data.customOptions.required
            ? ErrorMessage("numbers")
            : textValue.length > 0 && textValue.length != 10
            ? ErrorMessage("phone")
            : ErrorMessage("phone")}
        </HelperText>
      </View>
    </View>
  );
};
export default Phone;
const styles = StyleSheet.create({
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
