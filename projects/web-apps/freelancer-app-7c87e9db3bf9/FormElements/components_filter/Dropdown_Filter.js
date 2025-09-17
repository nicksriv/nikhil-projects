import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import envConfig from "../api/env";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";

const DropdownList = (props) => {
  const { data, changedValuesComponent, themeData, resetValue } = props;


  console.log('datadatadata',data);
  var statusArray = [];
  var obj = {};

  if (data?.hint.length > 13) {
    var newHint = data?.hint.slice(0, 13);
    newHint += "...";
  } else {
    var newHint = data?.hint;
  }
  
  for (var i = 0; i < data?.values?.length; i++) {
    obj = {
      label: data?.values[i].replace("[OnHover Option 1]", ""),
      value: data?.values[i].replace("[OnHover Option 1]", ""),
    };

    statusArray.push(obj);
  }

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const changedOption = (item) => {
    setValue(item.value);
    changedValuesComponent(item.value, data.componentId);
    setIsFocus(false);
  };

  useEffect(() => {
    setValue("");
    changedValuesComponent("", data.componentId);
  }, [resetValue]);

  const renderLabel = () => {
    if (value || isFocus) {
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
    }
    return null;
  };

  return (
    <View
      style={{
        // justifyContent: "center",
        width: "100%",
        margin: RA(5),
        height: RA(56),
        paddingTop: RA(5),
      }}
    >
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: primaryColor(themeData) },
        ]}
        placeholderStyle={{
          color: colors.grayToWhite,
          fontFamily: fontsRegular(themeData),
          fontSize: 15,
        }}
        selectedTextStyle={{
          color: colors.staticTextColor,
          fontFamily: fontsRegular(themeData),
          fontSize: 15,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        activeColor={colors.tableRowBg}
        containerStyle={{
          backgroundColor: colors.staticWhiteColor,
          borderColor: colors.staticBlackColor,
        }}
        itemTextStyle={{
          color:"#000"
        }}
        iconStyle={styles.iconStyle}
        data={statusArray}
        // maxHeight={200}
        maxHeight={
          statusArray.length == 1
            ? 55
            : statusArray.length == 2
            ? 110
            : statusArray.length == 3
            ? 160
            : 210
        }
        labelField="label"
        valueField="value"
        placeholder={"  " + newHint}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => changedOption(item)}
        showsVerticalScrollIndicator={true}
        dropdownPosition="bottom"
      />
    </View>
  );
};
export default DropdownList;

const styles = StyleSheet.create({
  dropdown: {
    height: RA(50),
    borderColor: colors.staticGrayLabelColor,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: RA(2),
    width: "100%",
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

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
