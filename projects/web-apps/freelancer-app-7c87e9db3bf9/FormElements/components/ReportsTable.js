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
  PermissionsAndroid,
} from "react-native";
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, Divider, Provider, ActivityIndicator } from "react-native-paper";
import { styles } from "../styles/HomeScreenStyles";
import envConfig from "../api/env";
import container from "../stores/Services/HomeServices";
import { compose } from "recompose";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import ReportTableFilter from "../filterModal/ReportTableFilter";
// import RNFetchBlob from "rn-fetch-blob";
var filterParamData = [{ name: "Clear Filters" }];
import { RA } from "../assets/fontSize/fontSize";
import HTMLView from "react-native-htmlview";
import moment from 'moment';

const BaseUrlReport = envConfig.BaseUrlReport;

var newrowfilterlist = [];
var finalval;
let s;

const ReportsTable = ({
  masterHeader,
  filterHeader,
  rowList,
  filterreport,
  visible,
  closeMenu,
  openMenu,
  navigation,
  rowData,
  moduleId,
  subModuleId,
  actions,
  tableSpinner,
  props,
  selectMenuItem,
  themeData,
  filtersList,
  clickApply,
  reportid,
}) => {
  // const [visible, setVisible] = React.useState(false);÷
  const [shouldShow, setShouldShow] = useState(true);
  const [checkedValues, setCheckedValues] = useState([]);
  const [showFilterParam, setShowFilterParam] = useState(false);
  const [componentids, setComponentids] = useState();
  const [newrowlist, setNewRowList] = useState(rowList);
  const [tableDataSource, setTableDataSource] = useState(filtersList);

  const [checkedsitedownloadvalues, setCheckedSiteDownloadValues] = useState();
  const [checkedfromdatedownloadvalues, setCheckedFromDateDownloadValues] = useState();
  const [checkedtodatedownloadvalues, setCheckedToDateDownloadValues] = useState();

  const [showReportTableFilterModule, setShowReportTableFilterModule] =
    useState(false);
  const baseUrl = envConfig.BaseUrl;
  console.log("ROWWWWWrepottablelisttmahereportstable===>1111 ", filtersList);
  console.log(
    "ROWWWWWrepottablelisttmahereportstablemasterHeader===>1111 ",
    masterHeader
  );
  console.log("ROWWWWWrepottablelisttheaderrrrrrr===> ", filterHeader);
  console.log("ROWWWWWrepottablelisttopenMenuprops===> ", props);
  console.log("ROWWWWWrepottablelisttopenMenupropsrowList===> ", rowList);
  console.log("reportidreportid===> ", reportid);
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    //rowList = [];

    newrowfilterlist = [];

    s = setInterval(() => {
      setCounter((state) => state + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(
      "componentttttidddddcomponentidsrowlistrowListrowList",
      rowList
    );

    setCheckedSiteDownloadValues([]);
    setCheckedFromDateDownloadValues('');
    setCheckedToDateDownloadValues('');

    //rowList = [];

    setComponentids([]);
    newrowfilterlist = [];

    if (counter == 1) {
      clearInterval(s);

      let res = rowList.reduce((arr, o) => {
        return Object.keys(o).reduce((a, k) => {
          if (a.indexOf(k) == -1) a.push(k);
          return a;
        }, arr);
      }, []);
      console.log("ressssssss", res);

      res.map((ele) => {
        filterHeader.forEach((element) => {
          if (element.componentId == ele) {
            console.log("satisfieddddddd", element);

            newrowfilterlist.push(element.componentId);
          }
        });
      });

      console.log("componentttttidddddcomponentids", newrowfilterlist);

      setComponentids(newrowfilterlist);
    }
  }, [counter]);

  const backhandler = () => {
    themeData.actions.setViewReportlist("");
    setComponentids([]);

    //rowList = [];
    newrowfilterlist = [];
  };

  const onPressReportTableFilter = () => {
    setTableDataSource(filtersList);
    setShowReportTableFilterModule(true);
  };

  const getFilterdParam = (
    getChangedValueMultiSelect,
    getFromChangedDate,
    getToChangedDate
  ) => {
    filterParamData = [];
    filterParamData = [{ name: "Clear Filters" }];
    setShowFilterParam(true);


    setCheckedSiteDownloadValues(getChangedValueMultiSelect);
    setCheckedFromDateDownloadValues(getFromChangedDate);
    setCheckedToDateDownloadValues(getToChangedDate);
    

    setShowReportTableFilterModule(false);
    clickApply(
      getChangedValueMultiSelect,
      getFromChangedDate,
      getToChangedDate
    );
  };

  const ClearFilterParam = (key, itemName) => {
    //if (itemName == "Clear all") {
    themeData.actions.getRowList(moduleId, subModuleId, selectMenuItem, "", "");
    setShowFilterParam(false);
    setCheckedSiteDownloadValues([]);
    setCheckedFromDateDownloadValues('');
    setCheckedToDateDownloadValues('');
    filterParamData = [];
    filterParamData = [{ name: "Clear Filters" }];
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

  const downloadHistory = () => {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let date = new Date();

    let datee = new Date(Math.floor(date.getTime() + date.getSeconds() / 2));

    var currentDate = moment().format("DD-MM-YYYY hh:mm a");

    console.log('testtss');
    console.log('loodoooofogoggg',BaseUrlReport + "api/v1/" + reportid + "/download-report" +
    "?sites=" +
    checkedsitedownloadvalues +
    "&from=" +
    checkedfromdatedownloadvalues +
    "&to=" +
    checkedtodatedownloadvalues);
    

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          "/Report " +
          moment().format("DD_MM_YYYY_hh_mm_a") + '.xls',
        description: "Report Download",
      },
    };
    config(options)
      .fetch("GET", BaseUrlReport + "api/v1/" + reportid + "/download-report" +
      "?sites=" +
      checkedsitedownloadvalues +
      "&from=" +
      checkedfromdatedownloadvalues +
      "&to=" +
      checkedtodatedownloadvalues, {
        Authorization: global.authToken,
        // more headers  ..
      })
      // when response status code is 200
      .then((res) => {
        // the conversion is done in native code
        console.log(JSON.stringify(res));
        alert("report download successfully");
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log("errorMessage", errorMessage);
        console.log("statusCode", statusCode);
      });
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
      <View>
        {rowList && rowList.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
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
                style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
              >
                {/* <TouchableOpacity onPress={backhandler}>
                  <Icon
                    name="arrow-back"
                    size={20}
                    style={{ marginRight: 10 }}
                    color={primaryColor(themeData)}
                  />
                </TouchableOpacity> */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: colors.staticTextColor,
                    fontFamily: fontsRegular(themeData),
                  }}
                >
                  Reports Details
                </Text>
              </View>

              {filterHeader.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    width: "20%",
                  }}
                >
                  <TouchableOpacity onPress={onPressReportTableFilter}>
                    <Icon
                      name="filter-alt"
                      size={25}
                      style={{
                        color: primaryColor(themeData),
                        backgroundColor: colors.transparentColor,
                        // fontSize: 15,
                        fontWeight: "400",
                        marginLeft: 10,
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
              ) : null}
            </View>
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
                nestedScrollEnabled={true}
              >
                <View
                  style={{
                    // marginTop: 15,
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    height: "auto",
                  }}
                >
                  <ScrollView horizontal>
                    <View>
                      {/* Headerrrrrr part start */}
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          // justifyContent: "space-between",
                          borderColor: colors.tableRowBg,
                          borderWidth: 1,
                          backgroundColor: colors.tableRowBg,
                        }}
                      >
                        {filterHeader?.map((item, index) => (
                          <>
                            {componentids.map((ele) =>
                              item.componentId == ele ? (
                                <View
                                  style={{
                                    height: 45,
                                    width:
                                      filterHeader.length == 1
                                        ? Dimensions.get("window").width / 1.05
                                        : filterHeader.length == 2
                                        ? item.label.length > 20
                                          ? item.label.length * 7
                                          : Dimensions.get("window").width / 2.2
                                        : item.label.length > 20
                                        ? item.label.length * 7
                                        : 125,
                                    justifyContent: "center",
                                    // alignItems: "center",
                                    marginHorizontal: 8,
                                  }}
                                >
                                  {console.log(
                                    "itemitemitemitemitemitemitem 1 = ",
                                    filterHeader.length
                                  )}
                                  <Text
                                    style={{
                                      color: colors.staticTextColor,
                                      fontSize: 14,
                                      fontWeight: "bold",
                                      fontFamily: fontsRegular(themeData),
                                    }}
                                  >
                                    {item.label}
                                  </Text>
                                </View>
                              ) : null
                            )}
                          </>
                        ))}
                        {/* <View style={{ marginLeft: 50 }} /> */}
                      </View>

                      {/* Headerrrrrr part end */}

                      {/* Row list part start */}

                      {rowList?.map((row, index) => {
                        return (
                          <View
                            // onPress={() => onClickOfRow(rowData.records[index])}
                            style={{
                              flexDirection: "row",
                              // width: "100%",
                              height: 45,
                              borderColor: colors.staticWhiteColor,
                              borderWidth: 0.5,
                              // backgroundColor: 'green'
                              backgroundColor:
                                index % 2 === 0
                                  ? colors.staticWhiteColor
                                  : colors.staticWhiteColor,
                            }}
                          >
                            {filterHeader?.map((item, index) => (
                              <>
                                {componentids.map((ele) =>
                                  item.componentId == ele ? (
                                    <View
                                      style={{
                                        height: 45,
                                        width:
                                          filterHeader.length == 1
                                            ? Dimensions.get("window").width /
                                              1.05
                                            : filterHeader.length == 2
                                            ? item.label.length > 20
                                              ? item.label.length * 7
                                              : Dimensions.get("window").width /
                                                2.2
                                            : item.label.length > 20
                                            ? item.label.length * 7
                                            : 125,
                                        justifyContent: "center",
                                        // alignItems: "center",
                                        marginHorizontal: 8,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: colors.staticTextColor,
                                          fontSize: 14,
                                          fontFamily: fontsRegular(themeData),
                                        }}
                                      >
                                        {row[item.componentId]}
                                      </Text>
                                    </View>
                                  ) : null
                                )}
                              </>
                            ))}
                          </View>
                        );
                      })}
                      {/* Row list part end */}
                    </View>
                    <Modal
                      visible={showReportTableFilterModule}
                      animationType="slide"
                      transparent={true}
                    >
                      <ReportTableFilter
                        title="Filter"
                        cancelButtonText="Clear"
                        submitButtonText="Apply"
                        onPressCancel={() =>
                          setShowReportTableFilterModule(false)
                        }
                        themeData={themeData}
                        getFilterdParam={getFilterdParam}
                        filtersList={filtersList}
                      />
                    </Modal>
                  </ScrollView>
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
                        width: 40,
                        height: 45,
                        position: "absolute",
                        marginLeft: Dimensions.get("screen").width * 0.88,
                        backgroundColor: colors.tableRowBg,
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
                              alignSelf: "center",
                            }}
                          />
                        }
                      >
                        {[
                          { label: "Select All", id: "All" },
                          ...masterHeader,
                        ]?.map(
                          (
                            item,
                            id //{
                          ) =>
                            //  console.log("resullltttiddddd"+extrafilterData);
                            componentids.map((ele) =>
                              item.componentId == ele ? (
                                <Menu.Item
                                  onPress={() => filterreport(item)}
                                  title={item.label}
                                  // titleStyle={{fontSize:12,color: "#50BFB7"}}
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
                                    borderColor: item?.active
                                      ? primaryColor(themeData)
                                      : colors.tableRowBg,
                                    fontSize: 10,
                                    marginHorizontal: 10,
                                  }}
                                />
                              ) : null
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
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              // justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "15%",
            }}
          >
            <>
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
            </>
            <View
              style={{
                marginTop: "25%",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <Image
                source={require("../assets/images/NoData.png")}
                style={{ height: RA(120), marginLeft: RA(15) }}
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
          // <View
          //   style={{
          //     width: "100%",
          //     height: "90%",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     alignSelf: "center",
          //   }}
          // >
          //   <Image
          //     source={require("../assets/images/NoData.png")}
          //     style={{ height: 120 }}
          //   />
          //   <Text
          //     style={{
          //       fontSize: 20,
          //       margin: 10,
          //       fontFamily: fontsRegular(themeData),
          //       color: colors.staticTextColor,
          //     }}
          //   >
          //     No Records found
          //   </Text>
          // </View>
        )}
      </View>
    </Provider>
  );
};
// const styles = StyleSheet.create({
//   table: {
//     width: "100%",
//     height: 70,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
export default compose(container)(ReportsTable);

const componentStyles = StyleSheet.create({
  color: colors.staticTextColor,
});

{
  /* {find?.map((ele) => (
                      <TouchableOpacity
                      onPress={()=>{ }}
                        style={{
                          width: 108,
                          //padding: 15,
                          justifyContent: "center",
                          // alignItems: "center",
                          // backgroundColor: "red",
                          // margin: 10,
                          marginHorizontal: 8,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              item[ele] === "ACTIVE" ? "#B4BAC1" : "#000000DE",
                            fontSize: 12,
                            justifyContent: "center",
                            paddingHorizontal: 5,
                          }}
                        >
                          {item[ele]}
                        </Text>
                      </TouchableOpacity>
                    ))} */
}
