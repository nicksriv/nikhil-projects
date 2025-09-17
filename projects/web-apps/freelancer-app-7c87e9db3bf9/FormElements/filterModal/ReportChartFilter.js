import React, { useState } from "react";

import CommonFilter from "./CommonFilter";

import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Modal } from "react-native-paper";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RA } from "../assets/fontSize/fontSize";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes

const ReportChartFilter = (props) => {
  const {
    title,
    tableDataSource,
    onPressCancel,
    cancelButtonText,
    submitButtonText,
    dataID,
    getFilterdParam,
    getClearParam,
    themeData,
    //filtersList,
  } = props;

  const [static_rowDetailsComponent, setRowDetailsComponent] = useState({});
  const [static_rowDetailsDateTo, setRowDetailsDateTo] = useState({});
  const [static_rowDetailsDateFrom, setRowDetailsDateFrom] = useState({});
  const [static_chartID, setStatic_chartID] = useState(dataID);
  const [resetValue, setResetValue] = useState(false);

  const onPressSubmit = () => {
    //console.log("EDITED rowDetailsComponent ==> ", rowDetailsComponent);
    //console.log("EDITED rowDetailsDate ==> ", rowDetailsDate);
    getFilterdParam(
      static_rowDetailsComponent,
      static_rowDetailsDateFrom,
      static_rowDetailsDateTo,
      static_chartID
    );
  };

  const getChangedValueMultiSelect = (item) => {
    setRowDetailsComponent(item);
  };

  const getChangedValueDateFrom = (item) => {
    setRowDetailsDateFrom(item);
  };
  const getChangedValueDateTo = (item) => {
    setRowDetailsDateTo(item);
  };

  const onPressClear = () => {
    getClearParam(true);
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
        <View
          style={{
            // height: RA(400),
            // marginTop: RA(300),
            height: "65%",
            marginTop: Platform.OS === "android" ? "60%" : "80%",
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
              }}
            >
              Filter
            </Text>
            <Icon name="close" size={25} onPress={onPressCancel} />
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
                flexWrap: "wrap",
                // width: "100%",
                flexDirection: "row",
                margin: RA(10),
                // marginLeft: 10,
                backgroundColor: colors.staticWhiteColor,
                // backgroundColor: "pink",
              }}
            >
              <View
                style={{
                  width: "100%",
                  margin: RA(5),
                }}
              >
                <CommonFilter
                  widthFull={true}
                  //showMultiSelect={filtersList[0] == "SITE_ID" ? true : false}
                  //showFromToDate={filtersList[1] == "DATE_RANGE" ? true : false}
                  showMultiSelect={true}
                  showFromToDate={true}
                  getChangedValueMultiSelect={getChangedValueMultiSelect}
                  getChangedValuesDateFrom={getChangedValueDateFrom}
                  getChangedValuesDateTo={getChangedValueDateTo}
                  resetValue={resetValue}
                />
              </View>
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
              color={primaryColor(themeData)}
              onPress={onPressClear}
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
              onPress={onPressSubmit}
              style={[
                styles.default,
                {
                  backgroundColor: primaryColor(themeData),
                  fontFamily: fontsRegular(themeData),
                },
              ]}
              labelStyle={{ fontSize: RA(13), color: colors.staticBlackColor }}
            >
              {submitButtonText}
            </Button>
          </View>
        </View>
      </Modal>
    </View>

  );
};

export default ReportChartFilter;

const styles = StyleSheet.create({
  default: {
    height: RA(45),
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
