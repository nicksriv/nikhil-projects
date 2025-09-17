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
  Dimensions,
  Alert,
  PermissionsAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu, Divider, Provider, ActivityIndicator } from "react-native-paper";
import { styles } from "../styles/HomeScreenStyles";
import envConfig from "../api/env";
import container from "../stores/Services/HomeServices";
import { compose } from "recompose";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import HTMLView from "react-native-htmlview";
var filterParamData = [{ name: "Clear Filters" }];

//****************** Table Filter Modal
import TeamModuleFilter from "../filterModal/TeamModuleFilter";

const TeamTable = (props) => {
  const {
    masterHeader,
    filterHeader,
    rowList,
    filter,
    visible,
    closeMenu,
    openMenu,
    navigation,
    rowData,
    moduleId,
    subModuleId,
    actions,
    tableSpinner,
    authorization,
    filtersList,
    selectMenuItem,
    themeData,
  } = props;

  console.log("rowData filtersList3333  = ", rowData);
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + props.auth.token,
  };
  // const [visible, setVisible] = React.useState(false);÷
  const [shouldShow, setShouldShow] = useState(true);
  const [checkedValues, setCheckedValues] = useState([]);

  //****************** Table Filter Modal
  const [showFilterTableModule, setShowFilterTableModule] = useState(false);
  const [tableDataSource, setTableDataSource] = useState(filtersList);
  const [showFilterParam, setShowFilterParam] = useState(false);
  const [getAllRowDetails, setGetAllRowDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(false);
  }, [rowData]);
  const baseUrl = envConfig.BaseUrl;
  console.log("ROWWWWW===> ", filtersList);
  // console.log(showfilterdata);

  const hasAge = (pAge, object) => {
    return (
      object.length === object.filter(({ active }) => active === pAge).length
    );
  };

  const onClickOfRow = (rowDetails) => {
    console.log("MOD ===> ", moduleId, "SubMOD===> ", subModuleId);
    actions
      .getRowDetails(moduleId, subModuleId, rowDetails.id, selectMenuItem)
      .then((response) => {
        navigation.navigate("DetailsScreen", {
          fromRowData: true,
          selectMenuItem: selectMenuItem,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const approveData = (value, rowData) => {
    console.log(" approveData CURRENT DATA => ", value);
    console.log("PUT ====> ", rowData.id);

    setLoader(true);
    fetch(
      selectMenuItem?.mappedBy
        ? envConfig.BaseUrl +
            "api/v1/modules/" +
            `${moduleId}` +
            "/submodule/" +
            `${subModuleId}` +
            "/form/" +
            `${rowData.id}` +
            `?mappedBy=${selectMenuItem?.mappedBy}` +
            "&workflowId=" +
            `${global.currentWorkflowId}`
        : envConfig.BaseUrl +
            "api/v1/modules/" +
            `${moduleId}` +
            "/submodule/" +
            `${subModuleId}` +
            "/form/" +
            `${props.rowDetails.id}` +
            "?workflowId=" +
            `${global.currentWorkflowId}`,
      {
        method: "PUT",
        headers: header,
        body: JSON.stringify({ approved: value }),
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
        console.log(" approveData SUBMIT DATA ===> ", responseJson);
        props.actions.getHeaderList(moduleId, subModuleId, props.mySubModule);
        props.actions.getRowList(moduleId, subModuleId, selectMenuItem);
        // setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
        setLoader(false);
      });
  };
  //****************** Table Filter Modal

  const getFilterdParam = (
    static_rowDetailsComponent,
    static_rowDetailsDate
  ) => {
    filterParamData = [];
    filterParamData = [{ name: "Clear Filters" }];
    setGetAllRowDetails(static_rowDetailsComponent);

    console.log(
      "static_rowDetailsComponentstatic_rowDetailsComponent",
      static_rowDetailsComponent
    );
    console.log(
      "static_rowDetailsComponentstatic_rowDetailsComponent",
      static_rowDetailsDate
    );
    // Alert.alert("aaaa6666");
    setShowFilterTableModule(false);
    setShowFilterParam(true);
    props.actions.getRowList(
      moduleId,
      subModuleId,
      selectMenuItem,
      "",
      "",
      static_rowDetailsComponent,
      static_rowDetailsDate
    );
  };

  const onPressClearParams = () => {
    setShowFilterParam(false),
      props.actions.getRowList(
        moduleId,
        subModuleId,
        selectMenuItem,
        "",
        "",
        "",
        ""
      );
  };

  const newScrollEnd = ({ event }) => {
    if (props.rowData.records.length < props.rowData.total) {
      props.actions.getRowList(
        moduleId,
        subModuleId,
        selectMenuItem,
        "",
        "",
        "",
        "",
        props.rowData.records.length + 5
      );
    }
  };
  const ClearFilterParam = (key, itemName) => {
    console.log("rrrrrrrprops1111 == ", key, itemName);
    props.actions.getRowList(moduleId, subModuleId, selectMenuItem, "", "");
    setShowFilterParam(false);
    filterParamData = [];
    filterParamData = [{ name: "Clear Filters" }];
  };

  const historyDownload = () => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === "ios") {
      downloadHistory();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "storage title",
            message: "storage_permission",
          }
        ).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log("Storage Permission Granted.");
            downloadHistory();
          } else {
            //If permission denied then show alert 'Storage Permission
            //Not Granted'
            Alert.alert("storage_permission");
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log("error", err);
      }
    }
  };

  const downloadHistory = async () => {
    props.actions.getRowDownload(moduleId, subModuleId, selectMenuItem);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 12,
          borderColor: primaryColor(themeData),
          height: 33,
          marginHorizontal: RA(10),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.staticWhiteColor,
          flexDirection: "row",
          padding: 7,
          width: RA(120),
        }}
        onPress={() => ClearFilterParam(item.key, item.name)}
      >
        <Text
          style={{
            fontSize: 13,
            color: primaryColor(themeData),
            paddingHorizontal: 8,
          }}
        >
          {item.name}
        </Text>
        <IconCommunity name="close-circle" color="gray" size={18} />
      </TouchableOpacity>
    );
  };

  const onPressTableFilter = () => {
    filtersList.map((item, index) => {
      if (item.type == "Number" || item.type == "Time") {
        delete filtersList[index]; // Delete old key
      }
      return item;
    });
    setTableDataSource(filtersList);
    setShowFilterTableModule(true);
  };

  return tableSpinner ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.transparentColor,
      }}
    >
      <ActivityIndicator
        size={25}
        animating={true}
        color={colors.staticPrimaryColor}
      />

      <Text style={{ fontSize: 20, color: colors.staticTextColor }}>
        Loading
      </Text>
    </View>
  ) : (
    <Provider>
      {rowList && rowList.length > 0 ? (
        <>
          <>
            {filterHeader.length > 0 ? (
              <View
                // style={{ flexDirection: "row-reverse", paddingHorizontal: 20 }}
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  borderColor: primaryColor(themeData),
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
                  {/* <TouchableOpacity
                    style={{
                      // marginTop: "2%",
                      textAlign: "center",
                      textAlignVertical: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => props.navigation.goBack()}
                  >
                    <Icon
                      name="arrow-back"
                      size={25}
                      color={primaryColor(themeData)}
                    />
                  </TouchableOpacity> */}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      marginLeft: "5%",
                      // marginTop: "2%",
                      alignSelf: "center",
                      fontFamily: fontsRegular(themeData),
                      color: colors.staticTextColor,
                    }}
                  >
                    {selectMenuItem?.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "15%",
                    marginRight: "2%",
                  }}
                >
                  <TouchableOpacity onPress={onPressTableFilter}>
                    <Icon
                      name="filter-alt"
                      size={25}
                      style={{
                        color: primaryColor(themeData),
                        backgroundColor: colors.transparentColor,
                        fontWeight: "400",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={historyDownload}>
                    <Icon
                      name="file-download"
                      size={25}
                      style={{
                        color: primaryColor(themeData),
                        backgroundColor: colors.transparentColor,
                        // fontSize: 15,
                        fontWeight: "400",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {showFilterParam ? (
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop: RA(10),
                }}
              >
                <FlatList
                  horizontal={true}
                  data={filterParamData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : null}
            <View
              style={{
                shadowOpacity: 0.2,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: "5%",
                width: "98%",
                height: "85%",
                alignSelf: "center",
                backgroundColor: colors.staticWhiteColor,
                borderColor: primaryColor(themeData),
                overflow: "hidden",
              }}
            >
              <ScrollView
                backgroundColor={colors.staticWhiteColor}
                height={"100%"}
                width={"100%"}
                alignSelf={"center"}
                // borderWidth={1}
                // borderColor={primaryColor(themeData)}
                borderRadius={10}
                // marginTop={"5%"}
                onMomentumScrollEnd={(e) => newScrollEnd(e)}
                nestedScrollEnabled={true}
              >
                <View
                  style={{
                    // marginTop: 5,
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    height: "auto",
                  }}
                >
                  <View
                    style={{
                      // marginTop: 15,
                      flexDirection: "row",
                      width:
                        selectMenuItem?.hasApprovalOnTable === true
                          ? "80%"
                          : "100%",
                      justifyContent: "space-between",
                      height: "auto",
                    }}
                  >
                    <ScrollView
                      onMomentumScrollEnd={(e) => newScrollEnd(e)}
                      horizontal
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            borderColor: colors.tableRowBg,
                            borderWidth: 1,
                            backgroundColor: colors.tableRowBg,
                          }}
                        >
                          {filterHeader?.map((item, index) => (
                            <>
                              {/* {item.active !== true && ( */}
                              <TouchableOpacity
                                style={{
                                  height: 45,
                                  // width: "auto",
                                  width:
                                    filterHeader.length == 1
                                      ? Dimensions.get("window").width / 1.15
                                      : filterHeader.length == 2
                                      ? item.label.length > 20
                                        ? item.label.length * 7
                                        : Dimensions.get("window").width / 2.35
                                      : item.label.length > 20
                                      ? item.label.length * 7
                                      : 125,
                                  justifyContent: "center",
                                  // alignItems: "center",
                                  marginHorizontal: 8,
                                  marginRight:
                                    selectMenuItem?.hasApprovalOnTable ===
                                      false && filterHeader.length - 1 === index
                                      ? 40
                                      : 0,
                                }}
                              >
                                <Text
                                  style={{
                                    color: colors.staticTextColor,
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    paddingHorizontal: 5,
                                    fontFamily: fontsRegular(themeData),
                                  }}
                                >
                                  {item.label ? item.label : "-"}
                                </Text>
                              </TouchableOpacity>
                              {/* )} */}
                            </>
                          ))}
                          {/* <View style={{ marginLeft: 50 }} /> */}
                        </View>
                        {rowList?.map((row, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                onClickOfRow(rowData.records[index])
                              }
                              style={{
                                flexDirection: "row",
                                // width: "100%",
                                height: 45,
                                borderColor: colors.staticWhiteColor,
                                borderWidth: 0.5,
                                backgroundColor:
                                  index % 2 === 0
                                    ? colors.staticWhiteColor
                                    : colors.staticWhiteColor,
                                // justifyContent: "space-between",
                                // backgroundColor:
                                //   rowList[index]?.status === "ACTIVE"
                                //     ? "#ffffff"
                                //     : "#0000001F",
                              }}
                            >
                              {filterHeader?.map((column) => {
                                const value = row[column.id];
                                return (
                                  <>
                                    <View
                                      // onPress={() => {
                                      //   alert("bye");
                                      // }}
                                      style={{
                                        width:
                                          filterHeader.length == 1
                                            ? Dimensions.get("window").width /
                                              1.15
                                            : filterHeader.length == 2
                                            ? column.label.length > 20
                                              ? column.label.length * 7
                                              : Dimensions.get("window").width /
                                                2.35
                                            : column.label.length > 20
                                            ? column.label.length * 7
                                            : 125,
                                        //padding: 15,
                                        justifyContent: "center",
                                        // alignItems: "center",
                                        // margin: 10,
                                        marginHorizontal: 8,
                                        marginRight: 0,
                                        // selectMenuItem?.hasApprovalOnTable ===
                                        //   false && filterHeader.length - 1 === index
                                        //   ? 40
                                        //   : 0,
                                      }}
                                    >
                                      {column?.label == "Long Text Field" ? (
                                        <HTMLView
                                          value={value}
                                          textComponentProps={{
                                            style: componentStyles,
                                          }}
                                        />
                                      ) : column?.label == "Time" ||
                                        column?.label == "Checkout Time" ? (
                                        <Text
                                          style={{
                                            // color:
                                            //   item[ele] === "ACTIVE" ? "#B4BAC1" : "#000000DE",
                                            color: colors.staticTextColor,
                                            fontSize: 14,
                                            justifyContent: "center",
                                            paddingHorizontal: 5,
                                            // textAlign: "center",
                                          }}
                                        >
                                          {value?.id ? value?.id : "  -"}
                                        </Text>
                                      ) : (
                                        <Text
                                          style={{
                                            // color:
                                            //   item[ele] === "ACTIVE" ? "#B4BAC1" : "#000000DE",
                                            color: colors.staticTextColor,
                                            fontSize: 14,
                                            justifyContent: "center",
                                            paddingHorizontal: 5,
                                            // textAlign: "center",
                                          }}
                                        >
                                          {column.format && value !== "-"
                                            ? column.id == "Phone"
                                              ? column
                                                  .format(value)
                                                  .substring(
                                                    3,
                                                    column.format(value).length
                                                  )
                                              : column.format(value)
                                            : value}
                                        </Text>
                                      )}
                                    </View>
                                  </>
                                );
                              })}
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* //****************** Table Filter Modal */}
                    </ScrollView>
                  </View>
                  {selectMenuItem?.hasApprovalOnTable && (
                    <View
                      style={{
                        // marginTop: 15,
                        flexDirection: "row",
                        width: "20%",
                        justifyContent: "space-between",
                        height: "auto",
                      }}
                    >
                      <ScrollView>
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between",
                              borderColor: colors.staticWhiteColor,
                              borderWidth: 1,
                              backgroundColor: colors.staticWhiteColor,
                              marginTop: 45,
                            }}
                          ></View>
                          {rowData?.records &&
                            rowList?.map((row, index) => {
                              return (
                                <View
                                  onPress={() =>
                                    onClickOfRow(rowData.records[index])
                                  }
                                  style={{
                                    flexDirection: "row",
                                    // width: "100%",
                                    height: 45,
                                    borderColor: colors.staticWhiteColor,
                                    borderWidth: 0.5,
                                    backgroundColor:
                                      index % 2 === 0
                                        ? colors.staticWhiteColor
                                        : colors.staticWhiteColor,
                                  }}
                                >
                                  <TouchableOpacity
                                    // onPress={() => alert("Reject_Button")}
                                    onPress={() => {
                                      approveData(
                                        false,
                                        rowData.records[index]
                                      );
                                    }}
                                  >
                                    {rowData?.records[index]?.approved ==
                                      false &&
                                    rowData?.records[index]
                                      ?.previouslyApproved == false ? (
                                      <Icon
                                        name="thumb-down-alt"
                                        size={25}
                                        style={[
                                          styles.imageMenu1,
                                          { marginLeft: 10 },
                                        ]}
                                        color={colors.staticRedColor}
                                      />
                                    ) : (
                                      <Icon
                                        name="thumb-down-alt"
                                        size={25}
                                        style={[
                                          styles.imageMenu1,
                                          { marginLeft: 10 },
                                        ]}
                                        color={colors.grayToWhite}
                                      />
                                    )}
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    // onPress={() => alert("Approve_Button")}
                                    onPress={() => {
                                      approveData(true, rowData.records[index]);
                                    }}
                                  >
                                    {rowData?.records[index]?.approved ==
                                      true &&
                                    rowData?.records[index]
                                      ?.previouslyApproved == true ? (
                                      <Icon
                                        name="thumb-up-alt"
                                        size={25}
                                        style={[
                                          styles.imageMenu1,
                                          { marginLeft: 10 },
                                        ]}
                                        color={primaryColor(themeData)}
                                      />
                                    ) : (
                                      <Icon
                                        name="thumb-up-alt"
                                        size={25}
                                        style={[
                                          styles.imageMenu1,
                                          { marginLeft: 10 },
                                        ]}
                                        color={colors.grayToWhite}
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                        </View>
                      </ScrollView>
                    </View>
                  )}
                  <Modal
                    visible={showFilterTableModule}
                    animationType="slide"
                    transparent={true}
                  >
                    <TeamModuleFilter
                      title="Filter"
                      cancelButtonText="Cancel"
                      submitButtonText="Apply"
                      onPressCancel={() => setShowFilterTableModule(false)}
                      tableDataSource={tableDataSource}
                      themeData={props}
                      getFilterdParam={getFilterdParam}
                      moduleId={moduleId}
                      subModuleId={subModuleId}
                    />
                  </Modal>
                  {filterHeader.length > 0 ? (
                    <View
                      style={{
                        // marginTop: 5,
                        flexDirection: "row",
                        // marginLeft: 10,
                        padding: 5,
                        // marginRight: 20,
                        // height: "80%",
                        // justifyContent: "space-between",
                        backgroundColor: colors.tableRowBg,
                        width:
                          selectMenuItem?.hasApprovalOnTable === true
                            ? 100
                            : 40,
                        height: 47,
                        position: "absolute",
                        marginLeft:
                          selectMenuItem?.hasApprovalOnTable === true
                            ? Dimensions.get("screen").width * 0.78
                            : Dimensions.get("screen").width * 0.88,
                        // marginTop: Dimensions.get("screen").width * 0.039,
                      }}
                    >
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                          <Icon
                            name="more-vert"
                            onPress={openMenu}
                            size={25}
                            style={{
                              color: colors.staticGrayLabelColor,
                              backgroundColor: colors.tableRowBg,
                              // fontSize: 15,
                              fontWeight: "400",
                              marginTop: 5,
                              marginLeft:
                                selectMenuItem?.hasApprovalOnTable === true
                                  ? 40
                                  : 0,
                            }}
                          />
                        }
                      >
                        {[
                          {
                            label: "Select All",
                            id: "All",
                            active: hasAge(true, masterHeader),
                          },
                          ...masterHeader,
                        ]?.map(
                          (
                            item,
                            id //{
                          ) => (
                            //  console.log("resullltttiddddd"+extrafilterData);
                            <Menu.Item
                              onPress={() => filter(item)}
                              title={item.label}
                              // titleStyle={{fontSize:12,color: primaryColor(themeData)}}
                              titleStyle={{
                                fontSize: 12,
                                color: item?.active
                                  ? primaryColor(themeData)
                                  : colors.tableRowBg,
                              }}
                              style={{
                                // backgroundColor: item?.active ? "#50BFB70F" : "#50BFB70F",
                                backgroundColor: item?.active
                                  ? "#50BFB70F"
                                  : "#5222ea00",
                                margin: 5,
                                borderRadius: 4,
                                borderWidth: 1,
                                height: 30,
                                // borderColor: item?.active ? primaryColor(themeData) : primaryColor(themeData),
                                borderColor: item?.active
                                  ? primaryColor(themeData)
                                  : colors.tableRowBg,
                                fontSize: 10,
                                marginHorizontal: 10,
                              }}
                            />
                          )
                          //   }
                        )}
                      </Menu>
                    </View>
                  ) : null}
                </View>
              </ScrollView>
            </View>
          </>

          <Modal visible={loader} transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size={50}
                // style={{ alignSelf: "center" }}
                color="black"
              />
            </View>
          </Modal>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            height: "90%",
            // justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          {showFilterParam ? (
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <FlatList
                horizontal={true}
                data={filterParamData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {/* {showFilterParam ? (
            <View
              style={{
                // width: RA(380),
                // height: RA(100),
                // alignItems: "flex-start",
                // justifyContent: "flex-start",
                // alignContent: "flex-start",
                // alignSelf: "flex-start",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 12,
                  borderColor: primaryColor(themeData),
                  height: 33,
                  marginHorizontal: RA(15),
                  marginTop: RA(30),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.staticWhiteColor,
                  flexDirection: "row",
                  width: RA(120),
                }}
                onPress={onPressClearParams}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: primaryColor(themeData),
                    paddingHorizontal: 8,
                  }}
                >
                  Clear Filters
                </Text>
                <IconCommunity name="close-circle" color="gray" size={18} />
              </TouchableOpacity>
            </View>
          ) : null} */}
          <View
            style={{
              width: "100%",
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../assets/images/NoData.png")}
              style={{ height: 120 }}
            />
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                fontFamily: fontsRegular(themeData),
                color: colors.staticTextColor,
              }}
            >
              No Records found
            </Text>
          </View>
        </View>
      )}
    </Provider>
  );
};

export default compose(container)(TeamTable);

const componentStyles = StyleSheet.create({
  color: colors.staticTextColor,
});
