import { it } from "jest-circus";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Alert,
  Platform,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Checkbox as CB, useTheme } from "react-native-paper";

import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { useSelector } from "react-redux";

const CheckList = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const { data, changedValues, themeData } = props;

  const [selectedItems, setSelectedItems] = useState(data?.value != undefined ? data?.value : []);

  // useEffect(() => {
  //   if (data.value != undefined || data.value != null) {
  //     changedValues(data.value, data.id, true);
  //   }
  // }, []);

  
  useEffect(() => {
    if (selectedItems.length == 0 && data.customOptions?.required) {
      changedValues(selectedItems, data.id, false);
    }else if (selectedItems.length == 0 && !data.customOptions?.required) {
      changedValues(selectedItems, data.id, true);
    } else {
      changedValues(selectedItems, data.id, true);
      // onPressSelected(selectedItems)
    }
  },[selectedItems])

  const onPressSelected = (item) => {
    if (selectedItems.includes(item.label)) {
      const newListItem = selectedItems.filter((label) => label !== item.label);
      return setSelectedItems(newListItem);
    }
    setSelectedItems([...selectedItems, item.label]);
    changedValues(selectedItems, data.id, true);
  };
  const getSelected = (item) => {
    return selectedItems.includes(item.label);
  };


  return (
    <View>
      {data.customOptions?.required ? (
        <Text
          style={{
            color: "red",
            position: "absolute",
            marginLeft: 10,
            marginTop: 12,
            //fontFamily: fontsRegular(themeData),
          }}
        >
          *
        </Text>
      ) : null}
      <Text
        style={{
          marginVertical: 10,
          marginLeft: data.customOptions?.required ? 20 : 10,
          color: colors.staticTextColor
        }}
      >
        {data?.label}
      </Text>
      <View style={{ marginLeft: 10 }}>
        <FlatList
          data={data?.checkListOptions}
          horizontal={data?.customOptions?.columns == "0" ? true : false}
          numColumns={
            data?.customOptions?.columns == "0"
              ? 0
              : data?.customOptions?.columns > 4
              ? 4
              : data?.customOptions?.columns
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => onPressSelected(item)}
              disabled={isEditable != undefined ? !isEditable : false}
            >
              <CB.Android
                color={primaryColor(themeData)}
                uncheckedColor={colors.staticBlackColor}
                status={getSelected(item) ? "checked" : "unchecked"}
              />
              <Text style={{ marginLeft: 1, marginTop: 8, color: colors.staticTextColor }}>{item?.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default CheckList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.staticWhiteColor,
    justifyContent: "center",
    width: 150,
    borderRadius: 5,
    height: 31,
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 370,
  },
  icon: {
    marginRight: 5,
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
  },
  selectedTextStyle: {
    fontSize: 16,
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
