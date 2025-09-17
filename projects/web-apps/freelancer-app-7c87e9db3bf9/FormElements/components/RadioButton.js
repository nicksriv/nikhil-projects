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
} from "react-native";
import { View } from "react-native";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
var selectDeselect = [];
import UnCheckRadio from "../assets/images/UnCheckRadio.png";
import CheckRadio from "../assets/images/CheckRadio.png";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { useSelector } from "react-redux";
import { R } from "@app/res/index";

const RadioButton = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const { data, changedValues, isRequiredFieldsFilled, themeData } = props;
  const [selectedItems, setSlectedItems] = useState(data.value);

  useEffect(() => {
    if (data.customOptions.required) {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const onPressSelected = (item, label) => {
    setSlectedItems(label);
    if (item.includes(selectDeselect[selectDeselect.length - 1])) {
      selectDeselect = [];
      // setSlectedItems(null);
    } else {
      // setSlectedItems(item.label);
      selectDeselect.push(item);
      changedValues(label, data.id, true);
    }
    console.log(
      "selectDeselect item % length == ",
      item + "  length ==  " + selectDeselect.length
    );
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
            fontFamily: fontsRegular(themeData),
          }}
        >
          *
        </Text>
      ) : null}
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 20,
          fontFamily: fontsRegular(themeData),
          color: colors.staticTextColor,
        }}
      >
        {data?.label}
      </Text>
      <View
        style={{
          flex: 1,
          marginBottom: 5,
        }}
      >
        <FlatList
          style={{ marginLeft: 15 }}
          data={data.buttonRadioOptions}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                marginTop: data?.customOptions?.spacing,
                marginLeft: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => onPressSelected(item.key, item.label)}
                disabled={isEditable != undefined ? !isEditable : false}
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      selectedItems == item.label
                        ? R.colors.primary.main
                        : colors.staticWhiteColor,
                    borderColor:selectedItems == item.label
                    ? R.colors.white
                    : R.colors.black,
                    borderWidth: 1,
                    padding: 8,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontFamily: fontsRegular(themeData),
                    color:selectedItems == item.label
                    ? R.colors.white
                    : R.colors.black
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal={data?.customOptions?.columns == "0" ? true : false}
          numColumns={
            data?.customOptions?.columns == "0"
              ? 0
              : data?.customOptions?.columns
          }
          //columnWrapperStyle={{justifyContent: 'space-between'}}
          //contentContainerStyle={{ width: "100%" }}
        />
      </View>
    </View>
  );
};
export default RadioButton;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.staticWhiteColor,
    justifyContent: "center",
    borderRadius: 5,
    height: 31,
    width: 80,
    textAlign: "center",
  },
});
