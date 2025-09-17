import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  processColor,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import envConfig from "../api/env";
import { colors, primaryColor } from "../themes/color";
import { ActivityIndicator } from "react-native-paper";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

const BaseUrlReport = envConfig.BaseUrlReport;

import CommonGraph from "./CommonGraph";
import { RA } from "../assets/fontSize/fontSize";

let checkCount;
const Graph = ({ props, fromScreen, selectedChart }) => {
  const route = useRoute();
  const [newChartsData, setNewChartsData] = useState([]);
  const [tableSpinner, setTableSpinner] = useState(true);
  const getChartData = (SiteId, FromDate, ToDate) => {
    var newData = [];
    var array =
      selectedChart != undefined ? selectedChart : props?.chartApiData;

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: global.authToken,
    };

    if (selectedChart != undefined) {
      fetch(
        `${BaseUrlReport}` +
          "api/v1/charts/" +
          array?.id +
          "?sites=" +
          SiteId.toString() +
          "&from=" +
          FromDate +
          "&to=" +
          ToDate,
        {
          headers: header,
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          const data11 = responseJson;
          if (data11?.charts.length != 0) {
            var res = data11?.charts.map((item, index) => {
              if (isNaN(item[data11?.xAxis.componentId])) {
                data11.chartType = "vertical";
                if (
                  item[data11?.yAxis.componentId] == "Infinity" ||
                  item[data11?.yAxis.componentId] == "NA"
                ) {
                  item["label"] = item[data11?.xAxis.componentId]; // Assign new key
                  item["y"] = parseFloat(0);
                } else {
                  item["label"] = item[data11?.xAxis.componentId]; // Assign new key
                  item["y"] = parseFloat(item[data11?.yAxis.componentId]);
                }
              } else {
                data11.chartType = "horizontal";
                if (
                  item[data11?.xAxis.componentId] == "Infinity" ||
                  item[data11?.yAxis.componentId] == "NA"
                ) {
                  item["y"] = parseFloat(0); // Assign new key
                  item["label"] = item[data11?.yAxis.componentId];
                } else {
                  item["y"] = parseFloat(item[data11?.xAxis.componentId]); // Assign new key
                  item["label"] = item[data11?.yAxis.componentId];
                }
              }
              delete item[data11?.xAxis.componentId]; // Delete old key
              delete item[data11?.yAxis.componentId]; // Delete old key
              return item;
            });
            data11.values = data11?.charts.map((o) => {
              return o.y;
            });
            data11.labels = data11?.charts.map((o) => {
              return o.label;
            });

            data11.pieChart = data11.charts.map((obj) => ({
              value: obj.y,
              label: obj.label,
            }));

            data11.lineChart = data11.charts.map((obj) => ({
              x: obj.y,
              y: 0,
            }));

            data11.newlineChart = data11.charts.map((obj) => ({
              values: data11.lineChart,
              label: obj.label,
            }));

            data11.pieColors = data11?.charts.map((o) => {
              return generateRandomColor();
            });

            data11.chartColors = data11?.charts.map((o) => {
              return generateRandomColor();
            });
            var MaxRes = Math.max.apply(
              Math,
              data11?.charts.map(function (o) {
                return o.y;
              })
            );
            var MinRes = Math.min.apply(
              Math,
              data11?.charts.map(function (o) {
                return o.y;
              })
            );
            data11.maximumValue = MaxRes;
            data11.minimumValue = MinRes;
            chartData = res;
            newData.push(data11);
          }
        })
        .catch((error) => {});
    } else {
      for (var i = 0; i < array?.length; i++) {
        fetch(
          `${BaseUrlReport}` +
            "api/v1/charts/" +
            array[i]?.id +
            "?sites=" +
            SiteId.toString() +
            "&from=" +
            FromDate +
            "&to=" +
            ToDate,
          {
            headers: header,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const data11 = responseJson;
            console.log("charttttdataaa", responseJson);

            if (data11?.charts.length != 0) {
              var res = data11?.charts.map((item, index) => {
                if (isNaN(item[data11?.xAxis.componentId])) {
                  data11.chartType = "vertical";
                  if (
                    item[data11?.yAxis.componentId] == "Infinity" ||
                    item[data11?.yAxis.componentId] == "NA"
                  ) {
                    item["label"] = item[data11?.xAxis.componentId]; // Assign new key
                    item["y"] = parseFloat(0);
                  } else {
                    item["label"] = item[data11?.xAxis.componentId]; // Assign new key
                    item["y"] = parseFloat(item[data11?.yAxis.componentId]);
                  }
                } else {
                  data11.chartType = "horizontal";
                  if (
                    item[data11?.xAxis.componentId] == "Infinity" ||
                    item[data11?.yAxis.componentId] == "NA"
                  ) {
                    item["y"] = parseFloat(0); // Assign new key
                    item["label"] = item[data11?.yAxis.componentId];
                  } else {
                    item["y"] = parseFloat(item[data11?.xAxis.componentId]); // Assign new key
                    item["label"] = item[data11?.yAxis.componentId];
                  }
                }
                delete item[data11?.xAxis.componentId]; // Delete old key
                delete item[data11?.yAxis.componentId]; // Delete old key
                return item;
              });
              data11.values = data11?.charts.map((o) => {
                return o.y;
              });
              data11.labels = data11?.charts.map((o) => {
                return o.label;
              });

              data11.pieChart = data11?.charts.map((o, i) => {
                console.log("ooooo", o);
              });

              data11.pieChart = data11.charts.map((obj) => ({
                value: obj.y,
                label: obj.label,
              }));

              data11.lineChart = data11.charts.map((obj) => ({
                x: obj.y,
                y: 0,
              }));

              data11.newlineChart = data11.charts.map((obj) => ({
                values: data11.lineChart,
                label: obj.label,
              }));

              data11.pieColors = data11?.charts.map((o) => {
                return generateRandomColor();
              });

              var MaxRes = Math.max.apply(
                Math,
                data11?.charts.map(function (o) {
                  return o.y;
                })
              );
              var MinRes = Math.min.apply(
                Math,
                data11?.charts.map(function (o) {
                  return o.y;
                })
              );
              data11.maximumValue = MaxRes;
              data11.minimumValue = MinRes;
              chartData = res;
              newData.push(data11);
            }
          })
          .catch((error) => {});
      }
    }

    props.actions.setAllChartDataRedux(newData);
  };

  const generateRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    var pColors = processColor(color);
    return pColors;
  };

  const getAllChartData = () => {
    setTableSpinner(true);
    var allNewData = [];
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: global.authToken,
    };
    fetch(
      `${BaseUrlReport}` + "api/v1/modules/" + props.myModule.id + "/charts",
      {
        headers: header,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const data11 = responseJson;

        console.log("charttttdataaa", responseJson);
        var allData = data11.data.map((allDataItem, allDataIndex) => {
          if (allDataItem?.charts.length != 0) {
            var allRes = allDataItem.charts.map((item, index) => {
              if (isNaN(item[allDataItem.xAxis.componentId])) {
                allDataItem.chartType = "vertical";
                if (
                  item[allDataItem?.yAxis.componentId] == "Infinity" ||
                  item[allDataItem?.yAxis.componentId] == "NA"
                ) {
                  item["label"] = item[allDataItem.xAxis.componentId]; // Assign new key
                  item["y"] = parseFloat(0);
                } else {
                  item["label"] = item[allDataItem.xAxis.componentId]; // Assign new key
                  item["y"] = parseFloat(item[allDataItem?.yAxis.componentId]);
                }
              } else {
                allDataItem.chartType = "horizontal";
                if (
                  item[allDataItem?.xAxis.componentId] == "Infinity" ||
                  item[allDataItem?.yAxis.componentId] == "NA"
                ) {
                  item["y"] = parseFloat(0);
                  item["label"] = item[allDataItem.yAxis.componentId];
                } else {
                  item["y"] = parseFloat(item[allDataItem?.xAxis.componentId]);
                  item["label"] = item[allDataItem.yAxis.componentId];
                }
              }
              delete item[allDataItem.xAxis.componentId]; // Delete old key
              delete item[allDataItem.yAxis.componentId]; // Delete old key
              return item;
            });

            allDataItem.values = allDataItem?.charts.map((o) => {
              return o.y;
            });
            allDataItem.labels = allDataItem?.charts.map((o) => {
              return o.label;
            });

            allDataItem.pieColors = allDataItem?.charts.map((o) => {
              return generateRandomColor();
            });

            allDataItem.pieChart = allDataItem.charts.map((obj) => ({
              value: obj.y,
              label: obj.label,
            }));

            allDataItem.lineChart = allDataItem.charts.map((obj) => ({
              x: obj.y,
              y: 0,
            }));

            allDataItem.newlineChart = allDataItem.charts.map((obj) => ({
              values: allDataItem.lineChart,
              label: obj.label,
            }));

            console.log(
              "allDataItem.newlineChartallDataItem.newlineChart",
              allDataItem.newlineChart
            );

            var allMaxRes = Math.max.apply(
              Math,
              allDataItem?.charts.map(function (o) {
                return o.y;
              })
            );
            var allMinRes = Math.min.apply(
              Math,
              allDataItem?.charts.map(function (o) {
                return o.y;
              })
            );
            allDataItem.maximumValue = allMaxRes;
            allDataItem.minimumValue = allMinRes;
            allChartData = allRes;
            allNewData.push(allDataItem);
          }
          // }
        });
        allNewChartData = allData;
        props.actions.setAllChartDataReportRedux(allNewData);
      });
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    checkCount = setInterval(() => {
      setCounter((state) => state + 1);
    }, 3000);
  }, []);

  useEffect(() => {
    if (counter == 1) {
      clearInterval(checkCount);
      if (fromScreen == "Dashboard") {
        setNewChartsData(props?.allChartDataRedux);
        setTableSpinner(false);
      } else {
        setNewChartsData(props?.allChartDataReportRedux);
        setTableSpinner(false);
      }
    }
  }, [counter]);

  useEffect(() => {
    if (fromScreen == "Dashboard") {
      getChartData("", "", "");
    } else {
      getAllChartData();
    }
  }, []);

  const navigatelistofreports = () => {
    props.actions.setVisibleListofReport(true);
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
    <View style={styles.container}>
      {route.name == "Home" ? (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
            borderColor: primaryColor(props),
            borderWidth: 1,
            borderRadius: 10,
            shadowOpacity: 0.2,
            marginTop: "5%",
            marginBottom: "5%",
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
              <Icon name="arrow-back" size={20} color={primaryColor(props)} />
            </TouchableOpacity> */}

            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginLeft: "5%",
                // marginTop: "2%",
                alignSelf: "center",
                fontFamily: fontsRegular(props),
                color: colors.staticTextColor,
              }}
            >
              Reports
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15%",
            }}
          >
            <TouchableOpacity onPress={() => navigatelistofreports()}>
              <Icon
                name="table-chart"
                size={25}
                style={{
                  color: primaryColor(props),
                  backgroundColor: colors.transparentColor,
                  fontWeight: "400",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <ScrollView>
        {newChartsData &&
          newChartsData?.map((item, index) => (
            <CommonGraph
              key={item.id}
              data={item}
              themeData={props}
              // xAxis={xAxis}
              // yAxis={yAxis}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default Graph;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS == "android" ? RA(40) : RA(30),
  },
});
