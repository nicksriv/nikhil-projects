import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu, Provider, ActivityIndicator, DefaultTheme} from 'react-native-paper';
import container from '../stores/Services/HomeServices';
import {compose} from 'recompose';
import {colors, primaryColor} from '../themes/color'; // Dynamic Themes
import {fontsRegular, fontsBold} from '../assets/fonts/fonts';
//****************** Table Filter Modal
import TableFilter from '../filterModal/TableFilter';
import {RA} from '../assets/fontSize/fontSize';
import HTMLView from 'react-native-htmlview';
import { navigationHelper } from "@app/helper/navigation";
import { ScreenConstants } from "@app/navigator/ScreenConstants";
import { getRowDetails } from "../stores/Actions/pageList";

var filterParamData = [{name: 'Clear Filters'}];
const Table = props => {
  const {
    mySubModule,
    myModule,
    activeJobId,
    tableSpinner,
    masterHeader,
    filterHeader,
    rowList,
    filter,
    visible,
    closeMenu,
    actions,
    openMenu,
    navigation,
    rowData,
    moduleId,
    subModuleId,
    selectMenuItem,
    filtersList,
    themeData,
    showFilters,
    handleFilterToggle,
  } = props;
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white', // set the background color here
    },
  };
  // const [visible, setVisible] = React.useState(false);÷
  const [showFilterParam, setShowFilterParam] = useState(false);

  //****************** Table Filter Modal
  const [showFilterTableModule, setShowFilterTableModule] = useState(false);
  const [tableDataSource, setTableDataSource] = useState(filtersList);

  const hasAge = (pAge, object) => {
    return (
      object.length === object.filter(({ active }) => active === pAge).length
    );
  };

  const onClickOfRow = async(rowDetails) => {
    try {
      getRowDetails(moduleId, subModuleId, rowDetails.id)

      setTimeout(() => {
        navigation.navigate(ScreenConstants.SCREEN_BUILDER, {
          fromRowData: true,
          moduleData: myModule,
          subModuleData: mySubModule,
        });
      }, 2000);


    } catch (error) {
      console.log("onClickOfRow error",error);
    } 
  };

  const ClearFilterParam = (key, itemName) => {
    props.getRowList(
      moduleId,
      subModuleId,
      selectMenuItem,
      activeJobId,
      
    );    filterParamData = [];
    filterParamData = [{name: 'Clear Filters'}];
    handleFilterToggle(false)

    // setShowFilters(false)
  };
  //****************** Table Filter Modal
  const getFilterdParam = (rowDetailsComponent, rowDetailsDate) => {
    setShowFilterParam(true);

    try {
      filterParamData = [];
      filterParamData = [{name: 'Clear Filters'}];
      // setShowFilterTableModule(false);
      handleFilterToggle(true)
      props.getRowList(
        moduleId,
        subModuleId,
        selectMenuItem,
        activeJobId,
        rowDetailsComponent,
        rowDetailsDate,
      );
    } catch (error) {
      console.log("ERRRROR",error)
    }
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

  const handleData = (column, value) => {

    const keys = value.constructor.name === "Object" ? Object.keys(value) : []
    try {
      if (column.format && value !== '-') {
        if (column.id == 'Phone') {
          value = column
            .format(value)
            .substring(3, column.format(value).length);
          return value;
        }
        if (keys.includes('time')) {
          return value.id;
        } else {
          value = column.format(value);
          return value;
        }
      } else {
        return value;
      }
    } catch (error) {
      console.log('Errror', error);
    }
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
    <Provider theme={theme}>
      <View>
        {rowList && rowList.length > 0 ? (
          <>
            {filterHeader.length > 0 ? (
              <View
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
                      textAlign: "center",
                      textAlignVertical: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => props.navigation.goBack()}
                  >
                    <Icon
                      name="arrow-back"
                      size={20}
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
                        // fontSize: 15,
                        fontWeight: "400",
                      }}
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={historyDownload}>
                    <Icon
                      name="file-download"
                      // name="cloud-download"
                      size={25}
                      style={{
                        color: primaryColor(themeData),
                        backgroundColor: colors.transparentColor,
                        // fontSize: 15,
                        fontWeight: "400",
                      }}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            ) : null}

            {showFilters ? (
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
                height: "75%",
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
                // padding={4}
                alignSelf={"center"}
                // borderWidth={1}
                // borderColor={primaryColor(themeData)}
                borderRadius={10}
                // marginTop={"5%"}
                contentContainerStyle={{borderRadius: 10, overflow: 'hidden'}}
                onMomentumScrollEnd={(e) => newScrollEnd(e)}
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
                  <ScrollView
                    onMomentumScrollEnd={(e) => newScrollEnd(e)}
                    horizontal
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
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
                                  filterHeader.length - 1 === index ? 40 : 0,
                              }}
                            >
                              <Text
                                style={{
                                  color: colors.staticGrayLabelColor,
                                  fontSize: 14,
                                  fontWeight: "bold",
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
            {/* table data starts */}

                      {rowList?.map((row, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => onClickOfRow(rowData.records[index])}
                            style={{
                              flexDirection: 'row',
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
                                      // backgroundColor: "red",
                                      // margin: 10,
                                      marginHorizontal: 8,
                                      marginRight: 0,
                                      // marginRight:
                                      //   filterHeader.length - 1 === index
                                      //     ? 40
                                      //     : 0,
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
                                        {handleData(column,value)}
                                       
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
                    <Modal
                      visible={showFilterTableModule}
                      animationType="slide"
                      transparent={true}
                    >
                      <TableFilter
                        title="Filter"
                        cancelButtonText="Clear"
                        submitButtonText="Apply"
                        onPressCancel={() => setShowFilterTableModule(false)}
                        tableDataSource={tableDataSource}
                        themeData={props}
                        getFilterdParam={getFilterdParam}
                        setShowFilterParam={setShowFilterParam}
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
                            <Menu.Item
                              onPress={() => filter(item)}
                              title={item.label}
                              // titleStyle={{fontSize:12,color: primaryColor(themeData)}}
                              titleStyle={{
                                fontSize: 12,
                                color: item?.active
                                  ? primaryColor(themeData)
                                  : "black",
                              }}
                              style={{
                                // backgroundColor: item?.active ? "#50BFB70F" : "#50BFB70F",
                                backgroundColor: item?.active
                                  ? "lightgrey"
                                  : "#5222ea00",
                                margin: 5,
                                borderRadius: 4,
                                borderWidth: 1,
                                height: 30,
                                // borderColor: item?.active ? primaryColor(themeData) : primaryColor(themeData),
                                borderColor: item?.active
                                  ? primaryColor(themeData)
                                  : primaryColor(themeData),
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
            {/* table data ends */}
            
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
              {showFilters ? (
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
                }}>
                No Records found
              </Text>
            </View>
          </View>
        )}
      </View>
    </Provider>
  );
};

export default compose(container)(Table);

const componentStyles = StyleSheet.create({
  color: colors.staticTextColor,
});
