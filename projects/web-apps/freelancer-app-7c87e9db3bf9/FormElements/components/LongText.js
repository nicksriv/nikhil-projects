import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { ErrorMessage, Validation } from "./FormValidation";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { useSelector } from "react-redux";

const LongText = (props) => {
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
      ? data?.value
      : data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ? data?.customOptions?.defaultValue
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
        changeText(data?.customOptions?.defaultValue);
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
        changeText(data?.customOptions?.defaultValue);
        changedValues(data?.customOptions?.defaultValue, data.id, true);
        changedValues(data?.customOptions?.defaultValue, data.id, true);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const richText = React.useRef();

  const changeText = (text) => {
    setTextValue(text);
    changedValues(
      text,
      data.id,
      text.length == 0 && data.customOptions.required
        ? false
        : text.length == 0 && !data.customOptions.required
        ? true
        : text.length != 0 &&
          data.customOptions?.min != null &&
          data.customOptions.limitType === "Characters" &&
          data.customOptions?.min > 0 &&
          text.length < data.customOptions?.min
        ? false
        : data.customOptions?.max != null &&
          data.customOptions.limitType === "Characters" &&
          data.customOptions?.max > 0 &&
          text.length > data.customOptions?.max
        ? false
        : text.length != 0 &&
          data.customOptions?.min != null &&
          data.customOptions.limitType === "Words" &&
          data.customOptions?.min > 0 &&
          text.split(" ").length - 1 < Number(data.customOptions.min)
        ? false
        : data.customOptions?.max != null &&
          data.customOptions.limitType === "Words" &&
          data.customOptions?.max > 0 &&
          text.split(" ").length > Number(data.customOptions.max)
        ? false
        : Validation(data.customOptions.validationType.toLowerCase(), text)
    );
  };

  const changeRichText = (text) => {
    // console.log("texttexttexttext = ", text);
    setTextValue(text);
    changedValues(text, data.id, true);
  };

  return (
    <View>
      {data?.customOptions?.editorMode == "Rich_Text" ? (
        <SafeAreaView>
          <View
            style={{
              margin: 10,
              borderColor: colors.staticBlackColor,
              borderWidth: 0.5,
            }}
          >
            {/* {textValue.length > 0 ? null : data.customOptions.required ? (
              <Text
                style={{
                  color: colors.staticRedColor,
                  marginTop: 5,
                  marginLeft: 5,
                  fontFamily: fontsRegular(themeData),
                }}
              >
                *
              </Text>
            ) : null} */}
            <ScrollView>
              <RichToolbar
                editor={richText}
                actions={[
                  textValue.length > 0
                    ? null
                    : data.customOptions.required
                    ? actions.heading1
                    : null,
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.setStrikethrough,
                  actions.insertLink,
                ]}
                iconMap={{
                  [actions.heading1]: ({ tintColor }) => (
                    <Text
                      style={{
                        color: colors.staticRedColor,
                        margin: 5,
                        fontFamily: fontsRegular(themeData),
                      }}
                    >
                      *
                    </Text>
                  ),
                }}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                {/* <Text>Description:</Text> */}
                <RichEditor
                  ref={richText}
                  placeholder={"Type here.."}
                  editable={isEditable}
                  initialContentHTML={data?.value}
                  onChange={(descriptionText) =>
                    changeRichText(descriptionText)
                  }
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </SafeAreaView>
      ) : (
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
              // placeholder={data?.label}
              theme={{
                colors: {
                  text: colors.staticTextColor,
                  primary: primaryColor(themeData),
                  underlineColor: colors.transparentColor,
                  placeholder: colors.staticTextColor,
                },
                fonts: { regular: { fontFamily: fontsRegular(themeData) } },
              }}
              defaultValue={
                data?.value != undefined
                  ? data?.value
                  : data?.customOptions?.defaultValue != "" &&
                    data?.customOptions?.defaultValue != undefined
                  ? data?.customOptions?.defaultValue
                  : null
              }
              editable={
                data?.customOptions?.isFieldDisabled
                  ? !data?.customOptions?.isFieldDisabled
                  : isEditable
              }
              keyboardType={
                data.customOptions?.validation === "Numeric"
                  ? "numeric"
                  : data.customOptions?.validation === "Currency"
                  ? "numeric"
                  : "default"
              }
              onChangeText={(text) => changeText(text)}
              maxLength={
                data.customOptions.limitType === "Characters" &&
                data.customOptions?.max > 0
                  ? data.customOptions?.max
                  : 100000000000
                // data.customOptions?.max > 0 ? data.customOptions?.max : 100000000000
              }
              error={
                // (isRequiredFieldsFilled &&
                //   textValue.length == 0 &&
                //   data.customOptions.required) ||
                textValue.length != 0 &&
                !Validation(
                  data.customOptions.validationType.toLowerCase(),
                  textValue
                )
              }
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              multiline={textValue.length > 40 ? true : false}
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
                // isRequiredFieldsFilled &&
                // textValue.length == 0 &&
                // data.customOptions.required
                //   ? true
                //   :
                textValue.length == 0 && !data.customOptions.required
                  ? false
                  : textValue.length == 0 && data.customOptions.required
                  ? false
                  : textValue.length != 0 &&
                    data.customOptions?.min != null &&
                    data.customOptions.limitType === "Characters" &&
                    data.customOptions?.min > 0 &&
                    textValue.length < data.customOptions?.min
                  ? true
                  : data.customOptions?.max != null &&
                    data.customOptions.limitType === "Characters" &&
                    data.customOptions?.max > 0 &&
                    textValue.length > data.customOptions?.max
                  ? true
                  : textValue.length != 0 &&
                    data.customOptions?.min != null &&
                    data.customOptions.limitType === "Words" &&
                    data.customOptions?.min > 0 &&
                    textValue.split(" ").length - 1 <
                      Number(data.customOptions.min)
                  ? true
                  : data.customOptions?.max != null &&
                    data.customOptions.limitType === "Words" &&
                    data.customOptions?.max > 0 &&
                    textValue.split(" ").length > Number(data.customOptions.max)
                  ? true
                  : !Validation(
                      data.customOptions.validationType.toLowerCase(),
                      textValue
                    )
              }
            >
              {isRequiredFieldsFilled &&
              textValue.length == 0 &&
              data.customOptions.required
                ? "Required"
                : data.customOptions?.min != null &&
                  data.customOptions.limitType === "Characters" &&
                  data.customOptions?.min > 0 &&
                  textValue.length < data.customOptions?.min
                ? "Minimum characters limit is " + data.customOptions?.min
                : data.customOptions?.max != null &&
                  data.customOptions.limitType === "Characters" &&
                  data.customOptions?.max > 0 &&
                  textValue.length > data.customOptions?.max
                ? "Maximum character length is reached"
                : data.customOptions?.min != null &&
                  data.customOptions.limitType === "Words" &&
                  data.customOptions?.min > 0 &&
                  textValue.split(" ").length - 1 <
                    Number(data.customOptions.min)
                ? "Minimum words limit is " + data.customOptions?.min
                : data.customOptions?.max != null &&
                  data.customOptions.limitType === "Words" &&
                  data.customOptions?.max > 0 &&
                  textValue.split(" ").length > Number(data.customOptions.min)
                ? "Maximum words length is reached"
                : ErrorMessage(data.customOptions.validationType.toLowerCase())}
            </HelperText>
          </View>
        </View>
      )}
    </View>
  );
};

export default LongText;
const styles = StyleSheet.create({
  default: {
    width: "100%",
    textAlignVertical: "center",
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
