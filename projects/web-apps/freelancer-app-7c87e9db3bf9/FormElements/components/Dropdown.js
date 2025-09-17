import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { HelperText } from "react-native-paper";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import FormElement from "../components/index";
import { useSelector } from "react-redux";

const DropdownList = (props) => {
  const isEditable = useSelector(
    (state) => state?.tablelist?.rowDetails?.editable
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
    elementType = ""
  } = props;

  const [dataSource, setDataSource] = useState([]);
  const [isAvailable, setAvailable] = useState(false);
  const [validationData, setValidationData] = useState([]);

  // console.log("datadatadatadatadatadata = ", data);

  const [value, setValue] = useState(
    data?.value != undefined
      ? data?.value
      : data?.customOptions?.defaultOptions != undefined
      ? data?.customOptions?.defaultOptions
      : ""
  );
  const [isFocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState(data.dropDownOptions);

  useEffect(() => {
    if (data.customOptions.showEmptyTextOption) {
      const dataOptions = options;
      dataOptions.unshift({
        value: data.customOptions.emptyOptionText,
        label: data.customOptions.emptyOptionText,
        key: data.customOptions.emptyOptionText,
      });
      setOptions(dataOptions);
    }
    if (data.customOptions.defaultOptions != undefined) {
      changedValues(data.customOptions.defaultOptions, data.id, true);
      validateDataComponent();
    } else if (data.customOptions.required && value == "") {
      changedValues("", data.id, false);
    } else {
      changedValues(value, data.id, true);
      validateDataComponent();
    }
  }, [data.customOptions.emptyOptionText]);

  const validateDataComponent = () => {
    data.dropDownOptions.map((optionItem, index) => {
      if (optionItem.value == value) {
        componentHandel(optionItem);
      }
    });
  };

  const componentHandel = (item) => {
    setDataSource([]);
    setAvailable(false);
    if (data?.hasDependentComponents == true && data?.dependentComponents) {
      data.dependentComponents.map((componentItem, index) => {
        {
          for (var i = 0; i < componentItem.parentId.length; i++) {
            if (componentItem.parentId[i] == item.key) {
              const formData = componentItem.form;
              setDataSource(formData);
              setAvailable(true);
            }
          }
        }
      });
    }
  };

  const changedOption = (item) => {
    // console.log("itemitemitemitemitem = ", item);
    componentHandel(item);
    setValue(item.value);
    changedValues(item.value, data.id, true);
    setIsFocus(false);
  };

  const changeText = (text, id, validation) => {
    console.log("validationDatavalidationData = ", text, id, validation);
    const newValue = { text, id, validation };
    if (validationData.length < dataSource.length) {
      validationData.push(newValue);

      if (validationData.length == dataSource.length) {
        var listOfTrue;
        for (var i = 0; i < validationData?.length; i++) {
          if (validationData[i].validation == false) {
            listOfTrue = { validation: validationData[i].validation };
          }
        }

        if (listOfTrue?.validation == false) {
          changedValues(text, id, false);
        } else {
          changedValues(text, id, validation);
        }
      }
    } else {
      validationData.map((vItem) => {
        if (vItem.id == id) {
          vItem.validation = validation;
        }
      });
      var listOfValidation;
      for (var i = 0; i < validationData?.length; i++) {
        if (validationData[i].validation == false) {
          listOfValidation = { validation: validationData[i].validation };
        }
      }
      if (listOfValidation?.validation == false) {
        changedValues(text, id, false);
      } else {
        changedValues(text, id, validation);
      }
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <View style={styles.floatingLabel}>
          {value.length > 0 || !data.customOptions.required ? null : (
            <Text
              style={{
                color: colors.staticRedColor,
                fontFamily: fontsRegular(themeData),
              }}
            >
              {""}*
            </Text>
          )}

          <Text
            style={{
              color:
                !data.customOptions.required && !isFocus
                  ? colors.staticTextColor
                  : isFocus
                  ? primaryColor(themeData)
                  : data.customOptions.required && value.length == 0
                  ? colors.staticRedColor
                  : colors.staticTextColor,
              fontFamily: fontsRegular(themeData),
              fontSize: RA(13),
              fontWeight: "400",
            }}
          >
            {" " + data?.label}
          </Text>
        </View>
      );
    }
    return null;
  };


  const renderComponents = () => {
    if (isAvailable == true) {
      return (
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={
              Platform.OS == "android"
                ? dataSource?.length * -300
                : dataSource?.length > 6
                ? dataSource?.length * -66
                : 0
            }
            enabled
          >
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  {dataSource &&
                    dataSource.map((item, index) => (
                      <FormElement
                        key={item.id}
                        data={item}
                        themeData={themeData}
                        changedValues={changeText}
                        // isRequiredFieldsFilled={checkRequiredFields}
                      />
                    ))}
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: "95%",
          paddingTop: 10,
        }}
      >
        {renderLabel()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: primaryColor(themeData) },
            // isRequiredFieldsFilled &&
            //   value.length == 0 &&
            //   data.customOptions.required && {
            //     borderColor: colors.staticRedColor,
            //   },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          activeColor={colors.tableRowBg}
          containerStyle={{
            backgroundColor: colors.staticWhiteColor,
            borderColor: colors.staticBlackColor,
          }}
          iconStyle={styles.iconStyle}
          data={data?.dropDownOptions}
          maxHeight={
            data?.dropDownOptions.length == 1
              ? 50
              : data?.dropDownOptions.length == 2
              ? 100
              : data?.dropDownOptions.length == 3
              ? 150
              : 200
          }
          labelField="label"
          valueField="value"
          placeholder={isFocus || value ? value : "  " + data?.label}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => changedOption(item)}
          disable={isEditable != undefined ? !isEditable : false}
          showsVerticalScrollIndicator={true}
          dropdownPosition="bottom"
          itemTextStyle={{
            color:"#000"
          }}
        />
        {isFocus || value || !data.customOptions.required ? null : (
          <Text
            style={{
              color: colors.staticRedColor,
              position: "absolute",
              marginLeft: 15,
              top: 35,
              fontFamily: fontsRegular(themeData),
            }}
          >
            {" "}
            *
          </Text>
        )}
      </View>
      <View style={styles.helpersWrapper}>
        <HelperText
          type="error"
          style={styles.helper}
          visible={
            false
            // isRequiredFieldsFilled &&
            // data.customOptions.required &&
            // value.length == 0
          }
        >
          {"Required"}
        </HelperText>
      </View>
      {renderComponents()}
    </View>
  );
};
export default DropdownList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.staticWhiteColor,
    padding: 16,
  },
  dropdown: {
    height: 55,
    borderColor: colors.staticTextColor,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1.1,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: "100%",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  floatingLabel: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: colors.backgroundColor,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: RA(5),
    fontSize: 14,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.staticWhiteColor,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.grayToWhite,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.staticTextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  helpersWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helper: {
    flexShrink: 1,
    color: colors.staticRedColor,
  },
});
