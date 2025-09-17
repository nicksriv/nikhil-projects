import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors, primaryColor } from "../themes/color";
import envConfig from "../api/env";
import { RA } from "../assets/fontSize/fontSize";
const baseUrl = envConfig.ClientLogo;
import { useFocusEffect } from "@react-navigation/native";
let dataMultiSelect = [];
const MultiSelectComponent = (props) => {
  const { changedValueMultiSelect, resetValue } = props;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected("");
    changedValueMultiSelect("");
  }, [resetValue]);

  useFocusEffect(
    React.useCallback(() => {
      const header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: global.authToken,
      };

      return fetch(`${baseUrl}` + "api/v1/users/filter-sites", {
        headers: header,
      })
        .then((response) => {
          const statusCode = response.status;
          const responseJson = response.json();
          return Promise.all([statusCode, responseJson]);
        })
        .then(([statusCode, responseJson]) => {
          if (statusCode == 401 || statusCode == 403) {
            props.actions.logOut();
          }
          const data = responseJson;
          console.log("responseJson data", responseJson);
          // var data1 = data;
          for (var i = 0; i < data.length; i++) {
            var objSiteId = {
              label: data[i].siteId,
              value: data[i].siteId,
            };

            if (dataMultiSelect.length < data.length) {
              dataMultiSelect.push(objSiteId);
            }
          }
        })
        .catch((error) => {
          console.error(error);
          if (
            error?.data?.statuscode == 401 ||
            error?.data?.statuscode == 403
          ) {
            global.authToken = "";
            props.actions.setAuth(null);
          }
        });
    }, [])
  );
  const selectedChar = selected.toString();

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom:
            selectedChar.length >= 120
              ? "65%"
              : selectedChar.length >= 90
              ? "52%"
              : selectedChar.length >= 60
              ? "38%"
              : selectedChar.length >= 30
              ? "26%"
              : selectedChar.length > 0
              ? "13%"
              : 0,
        },
      ]}
    >
      <MultiSelect
        maxHeight={
          dataMultiSelect.length == 1
            ? 55
            : dataMultiSelect.length == 2
            ? 110
            : dataMultiSelect.length == 3
            ? 160
            : 210
        }
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        activeColor={colors.tableRowBg}
        containerStyle={{
          backgroundColor: colors.staticWhiteColor,
          borderColor: colors.staticBlackColor,
        }}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        showsVerticalScrollIndicator={true}
        data={dataMultiSelect}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign
                color={colors.staticTextColor}
                name="delete"
                size={17}
              />
            </View>
          </TouchableOpacity>
        )}
        labelField="label"
        valueField="value"
        placeholder="Select Site ID"
        value={selected}
        onChange={(item) => {
          setSelected(item);
          changedValueMultiSelect(item);
        }}
        dropdownPosition="bottom"
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    // padding: RA(1),
    width: "100%",
    height: RA(56),
    marginHorizontal: RA(5),
  },
  dropdown: {
    height: RA(50),
    borderColor: colors.staticGrayLabelColor,
    borderWidth: 1,
    borderRadius: RA(2),
    width: "100%",
    padding: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    color: colors.grayToWhite,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderColor: colors.staticBlackColor,
    borderWidth: 1,
    backgroundColor: colors.backgroundColor,
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: colors.staticTextColor,
  },
});
