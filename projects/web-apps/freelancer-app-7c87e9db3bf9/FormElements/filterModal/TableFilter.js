import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, HelperText, Modal } from "react-native-paper";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import FormElement from "../components_filter/index_filter";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { RA } from "../assets/fontSize/fontSize";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

const TableFilter = (props) => {
  console.log("TableFilter = ", props);
  const {
    title,
    tableDataSource,
    onPressCancel,
    cancelButtonText,
    submitButtonText,
    getFilterdParam,
    themeData,
    setShowFilterParam
  } = props;

  console.log("tableDataSource== ", tableDataSource);
  useEffect(() => {
    tableDataSource.map((item, index) => {
      if (item.type == "Number" || item.type == "Time") {
        delete tableDataSource[index]; // Delete old key
      }
      return item;
    });
  }, []);
  const [rowDetailsComponent, setRowDetailsComponent] = useState({});
  const [rowDetailsDate, setRowDetailsDate] = useState({});
  const [resetValue, setResetValue] = useState(false);

  const changeTextComponent = (text, id) => {
    const editedItem = rowDetailsComponent;
    editedItem[id] = text;
    setRowDetailsComponent(editedItem);
  };

  const changedValuesDate = (text, hint) => {
    const editedItem = rowDetailsDate;
    editedItem[hint] = text;
    setRowDetailsDate(editedItem);
  };

  const onPressSubmit = () => {
    console.log("PREEESSSSED",rowDetailsComponent);
    console.log("rowDetailsDaterowDetailsDate",rowDetailsDate)

    getFilterdParam(rowDetailsComponent, rowDetailsDate);
    setShowFilterParam(true)
  };
  const onPressClear = () => {
    if (resetValue) {
      setResetValue(false);
    } else {
      setResetValue(true);
    }
  };

  return (
    <View
      style={{
        // height: RA(400),
        // marginTop: RA(300),
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // bottom: RA(20),
        backgroundColor: colors.transparentColor,
      }}
    >
      <Modal animationType={"fade"} transparent={true} visible={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? -50 : -450}
          enabled
        >
          <View
            style={{
              // height: RA(400),
              // marginTop: RA(300),
              height: "65%",
              marginTop: Platform.OS === "android" ? "60%" : "75%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.transparentColor,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: Dimensions.get("screen").height / 15,
                width: Dimensions.get("screen").width,
                justifyContent: "space-between",
                backgroundColor: primaryColor(themeData),
                alignItems: "center",
                paddingHorizontal: Dimensions.get("screen").width / 25,
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
              }}
            >
              <Text
                style={{
                  fontSize: RA(15),
                  fontFamily: fontsRegular(themeData),
                  fontWeight: "700",
                  color:"#fff"
                }}
              >
                {title}
              </Text>
              <Icon color="#fff" name="close" size={25} onPress={onPressCancel} />
            </View>

            {/* <View styles={{ height: RA(100) }}> */}
            <ScrollView
              style={{
                backgroundColor: colors.staticWhiteColor,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.staticWhiteColor,
                  // backgroundColor: "pink",

                  flexWrap: "wrap",
                  flexDirection: "row",
                  margin: RA(5),
                  // marginLeft: 10,
                }}
              >
                {tableDataSource?.map((item, index) => {
                  return (
                    <View
                      style={{
                        width: "45%",
                        justifyContent: "space-evenly",
                        marginHorizontal: RA(6),
                        backgroundColor: colors.staticWhiteColor,
                      }}
                    >
                      {/* <View style={{ width: "100%" }}> */}
                      <FormElement
                        key={index}
                        data={item}
                        themeData={themeData}
                        changedValuesComponent={changeTextComponent}
                        changedValuesDate={changedValuesDate}
                        resetValue={resetValue}
                      />
                      {/* </View> */}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            {/* </View> */}
            <View
              style={{
                flexDirection: "row",
                height: "20%",
                width: "100%",
                backgroundColor: colors.staticWhiteColor,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                mode="outlined"
                type="outlined"
                onPress={onPressClear}
                textColor="#000"
                style={[
                  styles.default,
                  {
                    borderColor: primaryColor(themeData),
                    borderWidth: 1,
                    fontFamily: fontsRegular(themeData),
                  },
                ]}
                labelStyle={{ fontSize: RA(13) }}
              >
                {cancelButtonText}
              </Button>

              <Button
                mode="contained"
                // type="contained"
                // color={colors.staticBlackColor}
                onPress={onPressSubmit}
                style={[
                  styles.default,
                  {
                    backgroundColor: primaryColor(themeData),
                    fontFamily: fontsRegular(themeData),
                  },
                ]}
                labelStyle={{
                  fontSize: RA(13),
                }}
              >
                {submitButtonText}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  
  );
};

export default TableFilter;

const styles = StyleSheet.create({
  default: {
    height: RA(45),
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
