import React, { useState } from "react";

import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommonFilter from "./CommonFilter";
import { RA } from "../assets/fontSize/fontSize";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { windowWidth } from "../utils/constants";

const ReportTableFilter = (props) => {
  const {
    title,
    tableDataSource,
    onPressCancel,
    cancelButtonText,
    submitButtonText,
    getFilterdParam,
    filtersList,
    themeData,
  } = props;

  const [siteId, setSiteId] = useState("");
  const [siteFromDate, setFromDate] = useState("");
  const [siteToDate, setToDate] = useState("");
  const [resetValue, setResetValue] = useState(false);
  const [preFilledParam, setPreFilledParam] = useState({});

  console.log("ReportTableFilter  preFilledParam ==props111 ", props);

  const onPressSubmit = () => {
    getFilterdParam(siteId, siteFromDate, siteToDate);
    setPreFilledParam({
      siteId: siteId,
      siteFromDate: siteFromDate,
      siteToDate: siteToDate,
    });
  };

  const getChangedValueMultiSelect = (item) => {
    setSiteId(item);
  };

  const getChangedValueDateFrom = (item) => {
    setFromDate(item);
  };
  const getChangedValueDateTo = (item) => {
    setToDate(item);
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
              style={{ fontSize: RA(15), fontFamily: fontsRegular(themeData), fontWeight: '700' }}
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
                  // showMultiSelect={filtersList[0] == "SITE_ID" ? true : false}
                  showMultiSelect={true}
                  showFromToDate={filtersList[1] == "DATE_RANGE" ? true : false}
                  getChangedValueMultiSelect={getChangedValueMultiSelect}
                  getChangedValuesDateFrom={getChangedValueDateFrom}
                  getChangedValuesDateTo={getChangedValueDateTo}
                  resetValue={resetValue}
                  preFilledParam={preFilledParam}
                />
              </View>
            </View>
          </ScrollView>
          {/* </View> */}
          <View
            // style={{
            //   flexDirection: "row",
            //   height: "50%",
            //   marginLeft: RA(10),
            // }}
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
              labelStyle={{ fontSize: RA(13), color: colors.staticBlackColor }}
            >
              {submitButtonText}
            </Button>
          </View>
        </View>
      </Modal>
    </View>

    // <View
    //   style={{
    //     height: Dimensions.get("screen").height / 2.5,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     bottom: 20,
    //     position: "absolute",
    //     backgroundColor: "#ffffff",
    //   }}
    // >
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       height: Dimensions.get("screen").height / 15,
    //       width: Dimensions.get("screen").width,
    //       justifyContent: "space-between",
    //       backgroundColor: "#57C2BA",
    //       alignItems: "center",
    //       paddingHorizontal: Dimensions.get("screen").width / 25,
    //       borderTopLeftRadius: 22,
    //       borderTopRightRadius: 22,
    //     }}
    //   >
    //     <Text style={{ fontSize: RA(15), fontFamily: fontsRegular(themeData) }}>Filter</Text>
    //     <Icon name="close" size={20} onPress={onPressCancel} />
    //   </View>
    //   <View styles={{ height: Dimensions.get("screen").width / 55 }}>
    //     <ScrollView style={{ backgroundColor: "#ffffff", flex: 1 }}>
    //       <View
    //         style={{
    //           backgroundColor: "#ffffff",
    //           flexWrap: "wrap",
    //           width: Dimensions.get("window").width,
    //           justifyContent: "space-evenly",
    //           margin: 5,
    //         }}
    //       >
    //         <CommonFilter
    //           widthFull={true}
    //           showMultiSelect={filtersList[0] == "SITE_ID" ? true : false}
    //           showFromToDate={filtersList[1] == "DATE_RANGE" ? true : false}
    //           getChangedValueMultiSelect={getChangedValueMultiSelect}
    //           getChangedValuesDateFrom={getChangedValueDateFrom}
    //           getChangedValuesDateTo={getChangedValueDateTo}
    //           resetValue={resetValue}
    //           preFilledParam={preFilledParam}
    //         />
    //       </View>
    //     </ScrollView>
    //   </View>

    //   <View
    //     style={{
    //       flexDirection: "row",
    //       height: "50%",
    //       marginLeft:RA(10),
    //     }}
    //   >
    //     <Button
    //       mode="outlined"
    //       type="outlined"
    //       color="#57C2BA"
    //       onPress={onPressClear}
    //       style={[styles.default, { borderColor: "#57C2BA", borderWidth: 1 }]}
    //       labelStyle={{fontSize: RA(13)}}
    //     >
    //       Clear
    //     </Button>
    //     <View style={{ width: RA(23) }} />
    //     <Button
    //       mode="text"
    //       type="text"
    //       color="#000000"
    //       onPress={onPressSubmit}
    //       style={[styles.default, { backgroundColor: "#57C2BA" }]}
    //       labelStyle={{fontSize: RA(13)}}
    //     >
    //       Apply
    //     </Button>
    //   </View>
    // </View>
  );
};

export default ReportTableFilter;

const styles = StyleSheet.create({
  // default: {
  //   height: RA(50),
  //   width: RA(170),
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  default: {
    height: RA(45),
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
