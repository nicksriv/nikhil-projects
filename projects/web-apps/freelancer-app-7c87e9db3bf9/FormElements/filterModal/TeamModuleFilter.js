//Team module filter.js

import React, { useState, useEffect } from "react";

import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Static_Dropdown_Filter from "../components_filter/Static_Dropdown_Filter";
import Static_Date_Filter from "../components_filter/Static_Date_Filter";
import { RA } from "../assets/fontSize/fontSize";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import FormElement from "../components_filter/index_filter";

import envConfig from "../api/env";
import { windowWidth } from "../utils/constants";
const baseUrl = envConfig.ClientLogo;

let empID = [];
let empName = [];
let empRole = [];

const TeamModuleFilter = (props) => {
  const {
    title,
    tableDataSource,
    onPressCancel,
    cancelButtonText,
    submitButtonText,
    getFilterdParam,
    themeData,
  } = props;

  //var preFilledParam = "";

  const [resetValue, setResetValue] = useState(false);

  console.log("TeamModuleFilter1112222 ", tableDataSource);
  const [static_rowDetailsComponent, setRowDetailsComponent] = useState({});
  const [static_rowDetailsDate, setRowDetailsDate] = useState({});
  //const [preFilledParam, setPreFilledParam] = useState({});

  //console.log("preFilledParam3333332222 ==> ", preFilledParam);

  const onPressApply = () => {
    console.log(
      "TeamModuleFilter111 rowDetailsComponent ==> ",
      static_rowDetailsComponent
    );
    console.log(
      "TeamModuleFilter111 rowDetailsDate ==> ",
      static_rowDetailsDate
    );
    //setPreFilledParam(JSON.stringify(static_rowDetailsDate));

    getFilterdParam(static_rowDetailsComponent, static_rowDetailsDate);
  };

  const onPressClear = () => {
    if (resetValue) {
      setResetValue(false);
    } else {
      setResetValue(true);
    }
  };

  // if (data.hint == "employeeId") {
  //   statusArray = empID;
  // } else if (data.hint == "userName") {
  //   statusArray = empName;
  // } else if (data.hint == "role") {
  //   statusArray = empRole;
  // }

  useEffect(() => {


   
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: global.authToken,
    };

    fetch(`${baseUrl}` + "api/v1/employee-info", {
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

        console.log('responnnnnjson', responseJson);

        var objEmpID;
        var objName;
        var objRole;
        for (var i = 0; i < data.length; i++) {
          objEmpID = {
            // label: data[i].employeeId,
            value: data[i].employeeId,
          };
          objName = {
            // label: data[i].name,
            value: data[i].name,
          };

          if (empID.length < data.length) {
            empID.push(objEmpID);
            empName.push(objName);
          }

          let roleData = data[i].roles;
          for (var j = 0; j < roleData.length; j++) {
            objRole = {
              value: roleData[j].name,
              // value: roleData[j].id,
            };
            if (empRole.length < 2) {
              empRole.push(objRole);
            }
          }
        }

        console.log('empRole',empID);
        console.log('empRole',empName);
        console.log('empRole',empRole);


       
        var empid = empID.map(function(item) {
          return item['value'];
        });

        var empname = empName.map(function(item) {
          return item['value'];
        });

        var emprole = empRole.map(function(item) {
          return item['value'];
        });

        console.log('valueueuueueueeee',empid);
        console.log('valueueuueueueeee',empname);
        console.log('valueueuueueueeee',emprole);

        tableDataSource.map((item) => {
          console.log('itemmssssss',item);
    
          if (item.componentId == "employeeId") {
            item.values = empid;
            console.log('itemmmmssstrueeee',item.values);
          }
  
          if (item.componentId == "userName") {
            item.values = empname;
            console.log('itemmmmssstrueeee',item.values);
          }
  
          if (item.componentId == "role") {
            item.values = emprole;
            console.log('itemmmmssstrueeee',item.values);
          }
        })
        
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
      });

     

       
      
      

  }, []);

  const changeTextComponent = (text, id) => {
    console.log("changeText ==>5555 ", text);
    const editedItem = static_rowDetailsComponent;
    editedItem[id] = text;
    setRowDetailsComponent(editedItem);
  };

  const changedValuesDate = (text, hint) => {
    console.log("changeText ==>Date==333 ", text, hint);
    const editedItem = static_rowDetailsDate;
    editedItem[hint] = text;
    setRowDetailsDate(editedItem);
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
              {title}
            </Text>
            <Icon name="close" size={25} onPress={onPressCancel} />
          </View>

          <ScrollView
            style={{
              backgroundColor: colors.staticWhiteColor,
            }}
          >
            <View
              style={{
                backgroundColor: colors.staticWhiteColor,
                flexWrap: "wrap",
                flexDirection: "row",
                margin: RA(10),

              }}
            >

              {/* <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Static_Date_Filter
                  hint="Date From"
                  changedValuesDate={changedValuesDate}
                  resetValue={resetValue}
                  widthFull={false}
                />
                <Static_Date_Filter
                  hint="Date To"
                  changedValuesDate={changedValuesDate}
                  resetValue={resetValue}
                  widthFull={false}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",

                  justifyContent: "space-evenly",

                }}
              >
                <Static_Dropdown_Filter
                  data={empID}
                  hint="Emp ID"
                  changeTextComponent={changeTextComponent}
                  resetValue={resetValue}
                />
                <Static_Dropdown_Filter
                  data={empName}
                  hint="Emp Name"
                  changeTextComponent={changeTextComponent}
                  resetValue={resetValue}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Static_Dropdown_Filter
                  data={empRole}
                  hint="Emp Role"
                  changeTextComponent={changeTextComponent}
                  resetValue={resetValue}
                />
              </View> */}
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
                    {/* {item.values == null ? null : <FormElement
                      key={index}
                      data={item}
                      themeData={themeData}
                      changedValuesComponent={changeTextComponent}
                      changedValuesDate={changedValuesDate}
                      resetValue={resetValue}
                    />} */}

<FormElement
                      key={index}
                      data={item}
                      themeData={themeData}
                      changedValuesComponent={changeTextComponent}
                      changedValuesDate={changedValuesDate}
                      resetValue={resetValue}
                    />
                  </View>
                );
              })}
              {/* </View> */}
              {/* </View> */}
            </View>
          </ScrollView>

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
              onPress={onPressApply}
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
    //     <ScrollView style={{ backgroundColor: "#ffffff" }}>
    //       <View
    //         style={{
    //           backgroundColor: "#ffffff",
    //           flexWrap: "wrap",
    //           margin: 5,
    //         }}
    //       >
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             width: Dimensions.get("window").width - RA(10),
    //           }}
    //         >
    //           <Static_Date_Filter
    //             hint="From Date"
    //             changedValuesDate={changedValuesDate}
    //             resetValue={resetValue}
    //             widthFull={false}
    //             //preFilledParam={preFilledParam}
    //           />
    //           <View style={{ width: RA(5) }} />
    //           <Static_Date_Filter
    //             hint="To Date"
    //             changedValuesDate={changedValuesDate}
    //             resetValue={resetValue}
    //             widthFull={false}
    //             // preFilledParam={preFilledParam}
    //           />
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             width: Dimensions.get("window").width,
    //             justifyContent: "space-evenly",
    //             paddingHorizontal: 15,
    //             marginLeft: -5,
    //           }}
    //         >
    //           <Static_Dropdown_Filter
    //             data={empID}
    //             hint="Emp ID"
    //             changeTextComponent={changeTextComponent}
    //             resetValue={resetValue}
    //           />
    //           <View style={{ width: RA(11) }} />
    //           <Static_Dropdown_Filter
    //             data={empName}
    //             hint="Emp Name"
    //             changeTextComponent={changeTextComponent}
    //             resetValue={resetValue}
    //           />
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             width: Dimensions.get("window").width / 2 - 20,
    //             justifyContent: "space-evenly",
    //             marginLeft: RA(8),
    //           }}
    //         >
    //           <Static_Dropdown_Filter
    //             data={empRole}
    //             hint="Emp Role"
    //             changeTextComponent={changeTextComponent}
    //             resetValue={resetValue}
    //           />
    //         </View>

    //         {/* {tableDataSource?.map((item, index) => {
    //           return (
    //             <FormElement
    //               key={index}
    //               data={item}
    //               themeData={themeData}
    //               changedValuesComponent={changeTextComponent}
    //               changedValuesDate={changedValuesDate}
    //             />
    //           );
    //         })} */}
    //       </View>
    //     </ScrollView>
    //   </View>

    //   <View
    //     style={{
    //       flexDirection: "row",
    //       height: "50%",
    //       marginLeft: RA(10),
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
    //       onPress={onPressApply}
    //       style={[styles.default, { backgroundColor: "#57C2BA" }]}
    //       labelStyle={{fontSize: RA(13)}}
    //     >
    //       Apply
    //     </Button>
    //   </View>
    // </View>
  );
};

export default TeamModuleFilter;

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
