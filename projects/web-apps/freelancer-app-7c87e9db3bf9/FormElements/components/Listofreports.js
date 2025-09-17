import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  FlatList,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, Divider, Provider } from "react-native-paper";
import { styles } from "../styles/HomeScreenStyles";
import envConfig from "../api/env";
import container from "../stores/Services/HomeServices";
import { compose } from "recompose";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors, primaryColor } from "../themes/color";

import { useDispatch } from "react-redux";

import { setViewReportlist } from "../stores/Actions/pageList";
import AntIcon from "react-native-vector-icons/AntDesign";

const Listofreports = ({
  filterHeader,
  rowList,
  navigation,
  rowData,
  moduleId,
  subModuleId,
  actions,
  tableSpinner,
  props,
  themeData,
}) => {
  // const [visible, setVisible] = React.useState(false);÷
  const [shouldShow, setShouldShow] = useState(true);
  const [checkedValues, setCheckedValues] = useState([]);
  const [rowValues, setRowValues] = useState([]);
  //sorting ASC & DES start
  const [sortrowValues, setSortRowValues] = useState([]);
  const [sortrowdesValues, setSortRowDesValues] = useState([]);
  //sorting ASC & DES end
  const baseUrl = envConfig.BaseUrlReport;
  console.log("ROWWWWWlistttttttttttlistofreport===> ", rowList);
  console.log("ROWWWWWlistttttttttttlistofreportmoduleId===> ", moduleId);
  // console.log(showfilterdata);
  const onClickOfRow = (id, filters) => {
    props.actions.setViewReportlist(id);
    props.actions.setViewReportlistFilter(filters);
  };

  useEffect(
    () => {
      getListofReports();
      //sorting ASC & DES start
      setRowValues(sortrowValues);
      setRowValues(sortrowdesValues);
      //sorting ASC & DES end

      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          handleBackButtonClick
        );
      };
    },
    sortrowValues,
    sortrowdesValues,
    []
  );

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: props?.auth?.token,
  };
  const getListofReports = () => {
    return fetch(
      `${baseUrl}` + "api/v1/modules/" + `${moduleId}` + "/reports",
      {
        headers: header,
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        console.log("data= Mahendrendataaa > ", responseJson.reports);
        setRowValues(responseJson.reports);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
      });
  };

  const handleBackButtonClick = () => {
    console.log("pressedbackghandle");
    props.actions.setVisibleListofReport(false);
    return true;
  };

  const backhandler = () => {
    console.log("backhandlerrrrrrrpress");
    props.actions.setVisibleListofReport(false);
  };

  //sorting start
  const clickedsort = (value) => {
    console.log("clickeddddsorrtt", value);

    if (value == "ASC") {
      rowValues.sort((a, b) => (a.name - b.name ? 1 : -1));

      console.log(rowValues);

      setSortRowValues(rowValues);
    } else {
      rowValues.sort((a, b) => (b.name - a.name ? 1 : -1));

      console.log(rowValues);

      setSortRowDesValues(rowValues);
    }
  };
  //sorting end

  return (
    <Provider>
      <>
        {rowValues.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
              borderColor: primaryColor(props),
              borderWidth: 1,
              borderRadius: 10,
              shadowOpacity: 0.2,
              marginTop: "5%",
              width: "98%",
              height: 50,
              backgroundColor: colors.staticWhiteColor,
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "2%",
                width: "70%",
              }}
            >
              {/* <TouchableOpacity onPress={() => backhandler()}>
                <Icon
                  name="arrow-back"
                  size={20}
                  style={{ marginRight: 10 }}
                  color={primaryColor(props)}
                />
              </TouchableOpacity> */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: colors.staticTextColor,
                  fontFamily: fontsRegular(props),
                }}
              >
                List of Reports
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            // height: "auto",
            // flex: 1,
            shadowOpacity: 0.2,
            backgroundColor: colors.staticWhiteColor,
            height: "85%",
            width: "98%",
            alignSelf: "center",
            borderWidth: 1,
            borderColor: primaryColor(props),
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flex: 1,
              // shadowOpacity: 0.2,
              // backgroundColor: colors.staticWhiteColor,
              // height: "95%",
              // width: "98%",
              // alignSelf: "center",
              // borderWidth: 1,
              // borderColor: primaryColor(props),
              // borderRadius: 10,
              // marginTop: "5%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderColor: colors.tableRowBg,
                borderWidth: 1,
                backgroundColor: colors.tableRowBg,
              }}
            >
              {/* {item.active !== true && ( */}
              <View
                style={{
                  height: 45,
                  // width: "auto",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.staticTextColor,
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: fontsRegular(props),
                  }}
                >
                  Report Name
                </Text>
              </View>
              {/* )} */}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 10,
                }}
              >
                <AntIcon
                  name="caretup"
                  size={10}
                  color={colors.staticBlackColor}
                  onPress={() => clickedsort("ASC")}
                />
                <AntIcon
                  name="caretdown"
                  size={10}
                  color={colors.staticBlackColor}
                  onPress={() => clickedsort("DES")}
                />
              </View>

              {/* <View style={{ marginLeft: 50 }} /> */}
            </View>

            <ScrollView>
              {rowValues?.map((row, index) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      borderColor: colors.staticWhiteColor,
                      borderWidth: 1,
                      backgroundColor:
                        index % 2 === 0
                          ? colors.staticWhiteColor
                          : colors.staticWhiteColor,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => onClickOfRow(row.id, row.filters)}
                      style={{
                        // width: "100%",
                        height: 45,
                        // borderColor: "#5222EA1F",
                        // borderWidth: 0.5,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.staticTextColor,
                          fontFamily: fontsRegular(props),
                        }}
                      >
                        {row.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </>
    </Provider>
  );
};

export default compose(container)(Listofreports);
