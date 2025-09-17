import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
const DropdownList = (props) => {
  const { data, hint, changeTextComponent, themeData, resetValue } = props;

  console.log("444444411111 ", data);

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const changedOption = (item) => {
    console.log("ssssss11111 555 ", item.label);
    console.log("ssssss11111 555 ", item.value);
    setValue(item.value);
    changeTextComponent(item.value, hint);
    setIsFocus(false);
  };

  useEffect(() => {
    setValue("");
    changeTextComponent("", hint);
  }, [resetValue]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        width: "100%",
        margin: RA(5),
        height: RA(51),
      }}
    >
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: primaryColor(themeData) },
        ]}
        placeholderStyle={{
          color: colors.staticGrayColor,
          fontFamily: fontsRegular(themeData),
          fontSize: 15,
        }}
        selectedTextStyle={{
          color: colors.grayToWhite,
          fontFamily: fontsRegular(themeData),
          fontSize: 15,
        }}
        activeColor={colors.tableRowBg}
        containerStyle={{
          backgroundColor: colors.staticWhiteColor,
          borderColor: colors.staticBlackColor,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // maxHeight={200}
        maxHeight={data.length == 1
          ? 55
          : data.length == 2
          ? 110
          : data.length == 3
          ? 160
          : 210}
        labelField="label"
        valueField="value"
        placeholder={hint}
        value={value}
        // value={
        //   <Text
        //     style={{
        //       color: colors.staticTextColor,
        //       fontFamily: fontsRegular(themeData),
        //     }}
        //   >
        //     {value}
        //   </Text>
        // }
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
    borderRadius: 3,
    paddingHorizontal: RA(10),
    width: "100%",
    // marginLeft: RA(2),
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
