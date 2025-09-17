import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  processColor,
  PermissionsAndroid,
  Alert,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { compose } from "recompose";
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import container from "../stores/Services/HomeServices";
import Toast from "react-native-simple-toast";
import ViewShot, { captureRef } from "react-native-view-shot";
import ReportChartFilter from "../filterModal/ReportChartFilter";
import envConfig from "../api/env";
const BaseUrlReport = envConfig.BaseUrlReport;
import { RA } from "../assets/fontSize/fontSize";
import {
  BarChart,
  HorizontalBarChart,
  PieChart,
  LineChart
} from "react-native-charts-wrapper";
import { colors, primaryColor } from "../themes/color";
import CameraRoll from "@react-native-community/cameraroll";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

var pievaluesresult;
const CommonGraph = (props) => {
  const { data, xAxis, yAxis, chartsValue, allChartDataRedux } = props;
  const [chartsData, setChartsData] = useState(data);
  const [filterChartsData, setFilterChartsData] = useState([]);

  const [isFilterChart, setIsFilterChart] = useState(false);
  const [negativeValue, setNegativeValue] = useState(false);

  const [valuecharts, setValueCharts] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [ylocation, setYlocation] = useState(1);

  const viewShortRef = useRef();

  //graph list load start
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblename, setModalVisibleName] = useState("");
  const [isFilterPieChart, setIsFilterPieChart] = useState(false);
  //graph list load end

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  useEffect(() => {
    console.log("chartsDatachartsData", chartsData);
    console.log("chartsDatachartsData", chartsData.lineChart);

    var isFilterPieChartEmpty = isObjectEmpty(filterChartsData); // will return true;

    setIsFilterPieChart(isFilterPieChartEmpty);
    console.log("emptyyyyyy", isFilterPieChart);

    setModalVisibleName(chartsData.type);
    setValueCharts(chartsData.type);

    data.charts.map((item) => {
      if (item.value > 0) {
        // Positive
      } else {
        setNegativeValue(true);
        // Negative
      }
    });
  }, [negativeValue]);

  const getFilteredChartData = (SiteId, FromDate, ToDate, DataID) => {
    var newData = [];
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: global.authToken
    };
    fetch(
      `${BaseUrlReport}` +
        "api/v1/charts/" +
        DataID +
        "?sites=" +
        SiteId.toString() +
        "&from=" +
        FromDate +
        "&to=" +
        ToDate,
      {
        headers: header
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
                item["y"] = parseFloat(item[data11?.xAxis.componentId]);
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

          data11.pieColors = data11?.charts.map((o) => {
            return generateRandomColor();
          });

          data11.pieChart = data11.charts.map((obj) => ({
            value: obj.y,
            label: obj.label
          }));

          data11.lineChart = data11.charts.map((obj) => ({
            x: obj.y,
            y: 0
          }));

          data11.newlineChart = data11.charts.map((obj) => ({
            values: data11.lineChart,
            label: obj.label
          }));

          var MaxRes = Math.max.apply(
            Math,
            data11?.charts.map(function (o) {
              return o.value;
            })
          );
          var MinRes = Math.min.apply(
            Math,
            data11?.charts.map(function (o) {
              return o.value;
            })
          );
          data11.maximumValue = MaxRes;
          data11.minimumValue = MinRes;
          chartData = res;
          newData.push(data11);
          setFilterChartsData(newData);

          console.log("filterChartsData[0]", filterChartsData[0]);
          setIsFilterPieChart(false);

          if (filterChartsData[0]?.id == chartsData.id) {
            setChartsData(filterChartsData[0]);
            setIsFilterChart(true);
            setShowReportChartFilterModule(false);
          } else {
            setChartsData(data);
            setIsFilterChart(false);
          }
        } else {
          Toast.show("No data is available", Toast.SHORT);
        }
      });
  };

  const getFilterParam = (SiteId, FromDate, ToDate, DataID) => {
    if (SiteId != "" || FromDate != "" || ToDate != "") {
      getFilteredChartData(SiteId, FromDate, ToDate, DataID);
    }
  };
  const [showReportChartFilterModule, setShowReportChartFilterModule] =
    useState(false);

  const clearFilter = () => {
    if (filterChartsData[0]?.id == chartsData.id) {
      setChartsData(data);
      setIsFilterChart(false);
      setIsFilterPieChart(true);
    }
  };

  const clearAllFilter = (isClear) => {
    setChartsData(data);
    setIsFilterChart(false);
    setIsFilterPieChart(true);
    setShowReportChartFilterModule(false);
  };

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message: "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "Permission required",
        "Permission is required to save images to your device",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      // handle error as you please
      Alert.alert(
        "Save remote image",
        "Failed to save Image: " + err.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      let viewCurrentImgRef = viewShortRef.current;

      // react-native-view-shot caputures component
      const uri = await captureRef(viewCurrentImgRef, {
        format: "png",
        quality: 0.8
      });

      if (Platform.OS === "android") {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, "photo");
      if (image) {
        Alert.alert(
          "Image saved",
          "Successfully saved image to your gallery.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const hidemodal = (item, piechartvalues) => {
    console.log("itemmmmm", item);
    console.log("piechartvalues", piechartvalues);

    console.log("pievaluesresultpievaluesresult", pievaluesresult);

    if (piechartvalues) {
      pievaluesresult = true;
      piechartvalues.map((item) => {
        console.log("resullllltttt1111", item.value);

        if (item.value <= 0) {
          pievaluesresult = false;
        }
      });
      console.log("resulllllttttresullt111", pievaluesresult);
    }

    setModalVisible(!modalVisible);
    setModalVisibleName(item);
    setValueCharts(item);
    setIsFocus(false);
  };

  const getPosition = (event) => {
    console.log("getPositionresulllllttttresullt", pievaluesresult);

    if (!pievaluesresult) {
      pievaluesresult = true;
    } else {
      pievaluesresult = false;
    }

    setModalVisible(true);
    setYlocation(event.pageY);
  };

  const hideUserChartMenu = () => {
    setModalVisible(false);
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

  const checkPiedataValues = (chartvalue) => {
    chartvalue.map((item) => {
      console.log("resullllltttt", item.value);

      if (item.value <= 0) {
        result = false;
      }
    });
    console.log("resulllllttttresullt", result);
  };

  const handleSelect = (event) => {
    console.log("novaluessssselectedddevent", event);

    let entry = event.nativeEvent;
    if (entry == null) {
      console.log("novaluessssselecteddd");
    } else {
      console.log("valuessssselecteddd", JSON.stringify(entry));
    }

    console.log(event.nativeEvent);
  };

  const showReportFilter = () => {

    if (valuecharts === "PIE_CHART") {
      if (chartsData.maximumValue < 0 || chartsData.minimumValue < 0) {
        setShowReportChartFilterModule(false);
        Toast.show("Selected Chart type is Incompatible", Toast.SHORT);
      } else {
        setShowReportChartFilterModule(true);
      }
    } else {
      setShowReportChartFilterModule(true);
    }
  };
  //load graph types end

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: "98%",
            backgroundColor: colors.backgroundColor,
            margin: 5,
            borderColor: primaryColor(props),
            borderWidth: 1,
            borderRadius: 5,
            height: "98%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: colors.staticTextColor,
                flex: 1,
                margin: 10,
                textTransform: "capitalize"
              }}
            >
              {chartsData?.name}
            </Text>

            {/* </View> */}
            {/* <View
              style={{
                height: "100%",
                width: "40%",
                backgroundColor: "#FFFFFF",
              }}
            ></View> */}
            {/* <View
              style={{ height: "100%", width: "20%", flexDirection: "row" }}
            > */}
            <View
              style={{ flexDirection: "row", margin: 10, marginBottom: RA(40) }}
            >
              {isFilterChart ? (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 12,
                    borderColor: primaryColor(props),
                    height: 33,
                    marginHorizontal: RA(10),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.staticWhiteColor,
                    flexDirection: "row",
                    padding: 7,
                    width: RA(120)
                  }}
                  onPress={() => clearFilter()}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: primaryColor(props),
                      paddingHorizontal: 8
                    }}
                  >
                    Clear filter
                  </Text>
                  <IconCommunity name="close-circle" color="gray" size={18} />
                </TouchableOpacity>
              ) : null}

              <Pressable
                style={{ marginTop: 7, marginRight: 5 }}
                onPress={(event) => getPosition(event.nativeEvent)}
              >
                {modalVisiblename === "PIE_CHART" ? (
                  <AntDesign
                    style={{
                      marginRight: 5,
                      color: colors.staticGrayLabelColor,
                      backgroundColor: colors.transparentColor
                    }}
                    name="piechart"
                    size={22}
                    fontWeight="400"
                  />
                ) : modalVisiblename === "BAR_CHART" ? (
                  <AntDesign
                    style={{
                      marginRight: 5,
                      color: colors.staticGrayLabelColor,
                      backgroundColor: colors.transparentColor
                    }}
                    name="barschart"
                    size={22}
                    fontWeight="400"
                  />
                ) : modalVisiblename === "LINE_CHART" ? (
                  <AntDesign
                    style={{
                      marginRight: 5,
                      color: colors.staticGrayLabelColor,
                      backgroundColor: colors.transparentColor
                    }}
                    name="linechart"
                    fontWeight="400"
                    size={22}
                  />
                ) : (
                  <AntDesign
                    style={{
                      marginRight: 5,
                      color: colors.staticGrayLabelColor,
                      backgroundColor: colors.transparentColor
                    }}
                    name="barschart"
                    fontWeight="400"
                    size={22}
                  />
                )}
              </Pressable>

              <TouchableOpacity onPress={() => showReportFilter()}>
                {/* <Image
                  source={require("../assets/images/filter_alt_black.png")}
                  style={{ height: 24, width: 24, marginRight: 10 }}
                /> */}
                <Icon
                  name="filter-alt"
                  size={25}
                  style={{
                    color: colors.staticGrayLabelColor,
                    backgroundColor: colors.transparentColor,
                    // fontSize: 15,
                    fontWeight: "400",
                    marginTop: 5
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={downloadImage}>
                {/* <Image
                  source={require("../assets/images/upload_file_black.png")}
                  style={{ height: 24, width: 24, marginRight: 10 }}
                /> */}
                <Icon
                  name="file-download"
                  size={25}
                  style={{
                    color: colors.staticGrayLabelColor,
                    backgroundColor: colors.transparentColor,
                    // fontSize: 15,
                    fontWeight: "400",
                    marginTop: 5,
                    marginLeft: 10
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* </View> */}
          </View>

          <View style={{ flexDirection: "row", flex: 10 }}>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: 200,
                  fontSize: 10,
                  color: colors.staticGrayColor,
                  transform: [{ rotate: "270deg" }]
                }}
              >
                {valuecharts === "PIE_CHART" ? null : data.yAxis.hint}
              </Text>
            </View>

            <ViewShot
              ref={viewShortRef}
              backgroundColor={colors.staticBlackColor}
              style={{ flex: 8, backgroundColor: colors.backgroundColor }}
              options={{ format: "png", quality: 1.0 }}
              // captureMode='continuous'
            >
              <View style={{ flexDirection: "row", flex: 8 }}>
                {chartsData.chartType == "horizontal" ? (
                  <HorizontalBarChart
                    style={{ width: "98%", height: 300 }}
                    chartDescription={{ text: "" }}
                    data={{
                      dataSets: [
                        {
                          values: chartsData?.values,
                          // label: 'Bar dataSet',
                          config: {
                            color: processColor(colors.graphHorizontal),
                            valueTextColor: processColor(
                              colors.transparentColor
                            ),
                            // barShadowColor: colors.staticGrayLabelColor,
                            // highlightAlpha: 90,
                            highlightColor: processColor(colors.graphHorizontal)
                          }
                        }
                      ],
                      config: { barWidth: 0.5 }
                    }}
                    xAxis={{
                      drawAxisLine: false,
                      textColor: processColor(colors.staticGrayLabelColor),
                      valueFormatter: chartsData?.labels,
                      position: "BOTTOM",
                      textSize: 11,
                      drawGridLines: false,
                      granularityEnabled: true,
                      granularity: 1
                      // labelCount: 3
                    }}
                    yAxis={{
                      position: "BOTTOM",
                      left: { enabled: false },
                      right: {
                        gridColor: processColor(colors.componentFrameColor),
                        textColor: processColor(colors.staticGrayLabelColor),
                        labelCount: 4,
                        textSize: 11,
                        enabled: true,
                        axisMinimum:
                          chartsData.minimumValue < 0
                            ? chartsData.minimumValue
                            : null
                      }
                    }}
                    // yAxis={{position:"TOP",right:{enabled:false} }}

                    // yAxis={{labelCount:3}}

                    animation={{ durationX: 2000 }}
                    // legend={this.state.legend}
                    // gridBackgroundColor={processColor('#ffffff')}
                    drawBarShadow={false}
                    drawValueAboveBar={false}
                    drawHighlightArrow={true}
                    visibleRange={{ x: { min: 4, max: 7 } }}
                    legend={{ enabled: false }}

                    // onSelect={this.handleSelect.bind(this)}
                    // onChange={(event) => console.log(event.nativeEvent)}
                  /> ? (
                    valuecharts === "PIE_CHART" ? (
                      chartsData.maximumValue > 0 &&
                      chartsData.minimumValue > 0 ? (
                        <PieChart
                          style={{ width: "98%", height: 260 }}
                          chartDescription={{ text: "" }}
                          data={{
                            dataSets: [
                              {
                                values: chartsData?.pieChart,
                                config: {
                                  colors: chartsData?.pieColors,
                                  valueTextSize: 12,
                                  valueTextColor: processColor(
                                    colors.staticTextColor
                                  ),
                                  sliceSpace: 0,
                                  selectionShift: 10,
                                  xValuePosition: "OUTSIDE_SLICE",
                                  yValuePosition: "OUTSIDE_SLICE",
                                  valueFormatter: "#.#'%'",
                                  // valueLineColor: processColor('green'),
                                  valueLinePart1Length: 0.5,
                                  valueLinePart2Length: 0.0
                                  // valueLinePart1OffsetPercentage:1
                                }
                              }
                            ],
                            config: { barWidth: 0.5 }
                          }}
                          animation={{ durationX: 2000 }}
                          legend={{
                            enabled: true,
                            textSize: 10,
                            form: "CIRCLE",
                            textColor: processColor(colors.staticTextColor),
                            horizontalAlignment: "RIGHT",
                            verticalAlignment: "BOTTOM",
                            orientation: "HORIZONTAL",
                            wordWrapEnabled: true,
                            xEntrySpace: 2,
                            yEntrySpace: 1
                          }}
                          logEnabled={true}
                          extraOffsets={{
                            left: 5,
                            top: 5,
                            right: 5,
                            bottom: 5
                          }}
                          entryLabelColor={processColor(colors.staticTextColor)}
                          entryLabelTextSize={12}
                          entryLabelFontFamily={"HelveticaNeue-Medium"}
                          drawEntryLabels={true}
                          rotationEnabled={true}
                          rotationAngle={90}
                          usePercentValues={true}
                          styledCenterText={{
                            text: "",
                            color: processColor(colors.staticTextColor),
                            fontFamily: "HelveticaNeue-Medium",
                            size: 20
                          }}
                          centerTextRadiusPercent={100}
                          holeRadius={0}
                          holeColor={processColor("#f0f0f0")}
                          transparentCircleRadius={0}
                          transparentCircleColor={processColor("#f0f0f0")}
                          maxAngle={360}
                        />
                      ) : isFilterPieChart == false ? (
                        <PieChart
                          style={{ width: "98%", height: 260 }}
                          chartDescription={{ text: "" }}
                          data={{
                            dataSets: [
                              {
                                values: filterChartsData[0]?.pieChart,
                                config: {
                                  colors: filterChartsData[0]?.pieColors,
                                  valueTextSize: 10,
                                  valueTextColor: processColor(
                                    colors.staticTextColor
                                  ),
                                  sliceSpace: 0,
                                  selectionShift: 10,
                                  xValuePosition: "OUTSIDE_SLICE",
                                  yValuePosition: "OUTSIDE_SLICE",
                                  valueFormatter: "#.#'%'",
                                  // valueLineColor: processColor('green'),
                                  valueLinePart1Length: 0.5,
                                  valueLinePart2Length: 0.0
                                  // valueLinePart1OffsetPercentage:1
                                }
                              }
                            ],
                            config: { barWidth: 0.5 }
                          }}
                          animation={{ durationX: 2000 }}
                          legend={{
                            enabled: true,
                            textSize: 10,
                            form: "CIRCLE",
                            textColor: processColor(colors.staticTextColor),
                            horizontalAlignment: "RIGHT",
                            verticalAlignment: "BOTTOM",
                            orientation: "HORIZONTAL",
                            wordWrapEnabled: true,
                            xEntrySpace: 2,
                            yEntrySpace: 1
                          }}
                          logEnabled={true}
                          extraOffsets={{
                            left: 5,
                            top: 5,
                            right: 5,
                            bottom: 5
                          }}
                          entryLabelColor={processColor(colors.staticTextColor)}
                          entryLabelTextSize={10}
                          entryLabelFontFamily={"HelveticaNeue-Medium"}
                          drawEntryLabels={true}
                          rotationEnabled={true}
                          rotationAngle={90}
                          usePercentValues={true}
                          styledCenterText={{
                            text: "",
                            color: processColor(colors.staticTextColor),
                            fontFamily: "HelveticaNeue-Medium",
                            size: 20
                          }}
                          // centerTextRadiusPercent={100}
                          holeRadius={0}
                          holeColor={processColor("#f0f0f0")}
                          transparentCircleRadius={0}
                          transparentCircleColor={processColor("#f0f0f0")}
                          maxAngle={360}
                        />
                      ) : (
                        <View
                          style={{
                            width: "98%",
                            height: 300,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Text
                            style={{
                              color: colors.staticTextColor,
                              fontFamily: fontsRegular(props)
                            }}
                          >
                            Selected Chart type is Incompatible
                          </Text>
                        </View>
                      )
                    ) : valuecharts === "LINE_CHART" ? (
                      <LineChart
                        style={{ width: "98%", height: 300 }}
                        chartDescription={{ text: "" }}
                        // data = {datafinal}
                        // data={{
                        //   $set: {
                        //   dataSets: chartsData?.newlineChart,
                        //   }
                        // }}
                        data={{
                          dataSets: [
                            {
                              values: chartsData?.values,
                              // label: chartsData?.labels,
                              config: {
                                color: processColor(colors.graphVertical),
                                // barShadowColor: processColor("pink"),
                                valueTextColor: processColor(
                                  colors.transparentColor
                                ),
                                // highlightAlpha: 90,
                                highlightColor: processColor(
                                  colors.graphVertical
                                )
                              }
                            }
                          ],
                          config: { barWidth: 0.5 }
                        }}
                        legend={{ enabled: false }}
                        xAxis={{
                          textColor: processColor(colors.staticGrayLabelColor),
                          valueFormatter: chartsData?.labels,
                          position: "BOTTOM",
                          drawGridLines: false,
                          granularityEnabled: true,
                          textSize: 11,
                          granularity: 1,
                          labelRotationAngle: 90
                        }}
                        yAxis={{
                          inverted: false
                        }}
                        marker={{
                          enabled: true,
                          digits: 2,
                          backgroundTint: processColor("teal"),
                          markerColor: processColor(colors.staticPrimaryColor),
                          textColor: processColor("white")
                        }}
                        drawGridBackground={false}
                        borderColor={processColor("teal")}
                        borderWidth={1}
                        drawBorders={true}
                        autoScaleMinMaxEnabled={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={true}
                        scaleXEnabled={true}
                        scaleYEnabled={true}
                        pinchZoom={true}
                        doubleTapToZoomEnabled={true}
                        highlightPerTapEnabled={true}
                        keepPositionOnRotation={true}
                        highlightPerDragEnabled={true}
                        // visibleRange={this.state.visibleRange}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        onSelect={handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                      />
                    ) : (
                      <HorizontalBarChart
                        style={{ width: "98%", height: 300 }}
                        chartDescription={{ text: "" }}
                        data={{
                          dataSets: [
                            {
                              values: chartsData?.values,
                              // label: 'Bar dataSet',
                              config: {
                                color: processColor(colors.graphHorizontal),
                                valueTextColor: processColor(
                                  colors.transparentColor
                                ),
                                // barShadowColor: colors.staticGrayLabelColor,
                                // highlightAlpha: 90,
                                highlightColor: processColor(
                                  colors.graphHorizontal
                                )
                              }
                            }
                          ],
                          config: { barWidth: 0.5 }
                        }}
                        xAxis={{
                          drawAxisLine: false,
                          textColor: processColor(colors.staticGrayLabelColor),
                          valueFormatter: chartsData?.labels,
                          position: "BOTTOM",
                          textSize: 11,
                          drawGridLines: false,
                          granularityEnabled: true,
                          granularity: 1
                          // labelCount: 3
                        }}
                        yAxis={{
                          position: "BOTTOM",
                          left: { enabled: false },
                          right: {
                            gridColor: processColor(colors.componentFrameColor),
                            textColor: processColor(
                              colors.staticGrayLabelColor
                            ),
                            labelCount: 4,
                            textSize: 11,
                            enabled: true,
                            axisMinimum:
                              chartsData.minimumValue < 0
                                ? chartsData.minimumValue
                                : null
                          }
                        }}
                        // yAxis={{position:"TOP",right:{enabled:false} }}

                        // yAxis={{labelCount:3}}

                        animation={{ durationX: 2000 }}
                        // legend={this.state.legend}
                        // gridBackgroundColor={processColor('#ffffff')}
                        drawBarShadow={false}
                        drawValueAboveBar={false}
                        drawHighlightArrow={true}
                        visibleRange={{ x: { min: 4, max: 7 } }}
                        legend={{ enabled: false }}

                        // onSelect={this.handleSelect.bind(this)}
                        // onChange={(event) => console.log(event.nativeEvent)}
                      />
                    )
                  ) : (
                    <HorizontalBarChart
                      style={{ width: "98%", height: 300 }}
                      chartDescription={{ text: "" }}
                      data={{
                        dataSets: [
                          {
                            values: chartsData?.values,
                            // label: 'Bar dataSet',
                            config: {
                              color: processColor(colors.graphHorizontal),
                              valueTextColor: processColor(
                                colors.transparentColor
                              ),
                              // barShadowColor: colors.staticGrayLabelColor,
                              // highlightAlpha: 90,
                              highlightColor: processColor(
                                colors.graphHorizontal
                              )
                            }
                          }
                        ],
                        config: { barWidth: 0.5 }
                      }}
                      xAxis={{
                        drawAxisLine: false,
                        textColor: processColor(colors.staticGrayLabelColor),
                        valueFormatter: chartsData?.labels,
                        position: "BOTTOM",
                        textSize: 11,
                        drawGridLines: false,
                        granularityEnabled: true,
                        granularity: 1
                        // labelCount: 3
                      }}
                      yAxis={{
                        position: "BOTTOM",
                        left: { enabled: false },
                        right: {
                          gridColor: processColor(colors.componentFrameColor),
                          textColor: processColor(colors.staticGrayLabelColor),
                          labelCount: 4,
                          textSize: 11,
                          enabled: true,
                          axisMinimum:
                            chartsData.minimumValue < 0
                              ? chartsData.minimumValue
                              : null
                        }
                      }}
                      // yAxis={{position:"TOP",right:{enabled:false} }}

                      // yAxis={{labelCount:3}}

                      animation={{ durationX: 2000 }}
                      // legend={this.state.legend}
                      // gridBackgroundColor={processColor('#ffffff')}
                      drawBarShadow={false}
                      drawValueAboveBar={false}
                      drawHighlightArrow={true}
                      visibleRange={{ x: { min: 4, max: 7 } }}
                      legend={{ enabled: false }}

                      // onSelect={this.handleSelect.bind(this)}
                      // onChange={(event) => console.log(event.nativeEvent)}
                    />
                  )
                ) : <BarChart
                    style={{ width: "98%", height: 300 }}
                    chartDescription={{ text: "" }}
                    data={{
                      dataSets: [
                        {
                          values: chartsData?.values,
                          // label: 'Bar dataSet',
                          config: {
                            color: processColor(colors.graphVertical),
                            // barShadowColor: processColor("pink"),
                            valueTextColor: processColor(
                              colors.transparentColor
                            ),
                            // highlightAlpha: 90,
                            highlightColor: processColor(colors.graphVertical)
                          }
                        }
                      ],
                      config: { barWidth: 0.5 }
                    }}
                    xAxis={{
                      textColor: processColor(colors.staticGrayLabelColor),
                      valueFormatter: chartsData?.labels,
                      position: "BOTTOM",
                      drawGridLines: false,
                      granularityEnabled: true,
                      textSize: 11,
                      granularity: 1,
                      labelRotationAngle: 90
                    }}
                    animation={{ durationX: 2000 }}
                    legend={{ enabled: false }}
                    yAxis={{
                      position: "LEFT",
                      right: { enabled: false },
                      left: {
                        drawAxisLine: false,
                        textSize: 11,
                        gridColor: processColor(colors.componentFrameColor),
                        textColor: processColor(colors.staticGrayLabelColor),
                        labelCount: 4,
                        axisMinimum:
                          chartsData.minimumValue < 0
                            ? chartsData.minimumValue
                            : null
                      }
                    }}
                    // gridBackgroundColor={processColor('#ffffff')}
                    visibleRange={{ x: { min: 4, max: 7 } }}
                    drawBarShadow={false}
                    drawValueAboveBar={false}
                    // onSelect={(event) => renderLabel(event.nativeEvent)}
                  /> ? (
                  valuecharts === "PIE_CHART" ? (
                    chartsData.maximumValue > 0 &&
                    chartsData.minimumValue > 0 &&
                    isFilterPieChart == true ? (
                      <PieChart
                        style={{ width: "98%", height: 260 }}
                        chartDescription={{ text: "" }}
                        data={{
                          dataSets: [
                            {
                              values: chartsData?.pieChart,
                              config: {
                                colors: chartsData?.pieColors,
                                valueTextSize: 10,
                                valueTextColor: processColor(
                                  colors.staticTextColor
                                ),
                                sliceSpace: 0,
                                selectionShift: 10,
                                xValuePosition: "OUTSIDE_SLICE",
                                yValuePosition: "OUTSIDE_SLICE",
                                valueFormatter: "#.#'%'",
                                // valueLineColor: processColor('green'),
                                valueLinePart1Length: 0.5,
                                valueLinePart2Length: 0.0
                                // valueLinePart1OffsetPercentage:1
                              }
                            }
                          ],
                          config: { barWidth: 0.5 }
                        }}
                        animation={{ durationX: 2000 }}
                        legend={{
                          enabled: true,
                          textSize: 10,
                          form: "CIRCLE",
                          textColor: processColor(colors.staticTextColor),
                          horizontalAlignment: "RIGHT",
                          verticalAlignment: "BOTTOM",
                          orientation: "HORIZONTAL",
                          wordWrapEnabled: true,
                          xEntrySpace: 2,
                          yEntrySpace: 1
                        }}
                        logEnabled={true}
                        extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}
                        entryLabelColor={processColor(colors.staticTextColor)}
                        entryLabelTextSize={10}
                        entryLabelFontFamily={"HelveticaNeue-Medium"}
                        drawEntryLabels={true}
                        rotationEnabled={true}
                        rotationAngle={90}
                        usePercentValues={true}
                        styledCenterText={{
                          text: "",
                          color: processColor(colors.staticTextColor),
                          fontFamily: "HelveticaNeue-Medium",
                          size: 20
                        }}
                        // centerTextRadiusPercent={100}
                        holeRadius={0}
                        holeColor={processColor("#f0f0f0")}
                        transparentCircleRadius={0}
                        transparentCircleColor={processColor("#f0f0f0")}
                        maxAngle={360}
                      />
                    ) : isFilterPieChart == false ? (
                      <PieChart
                        style={{ width: "98%", height: 260 }}
                        chartDescription={{ text: "" }}
                        data={{
                          dataSets: [
                            {
                              values: filterChartsData[0]?.pieChart,
                              config: {
                                colors: filterChartsData[0]?.pieColors,
                                valueTextSize: 10,
                                valueTextColor: processColor(
                                  colors.staticTextColor
                                ),
                                sliceSpace: 0,
                                selectionShift: 10,
                                xValuePosition: "OUTSIDE_SLICE",
                                yValuePosition: "OUTSIDE_SLICE",
                                valueFormatter: "#.#'%'",
                                // valueLineColor: processColor('green'),
                                valueLinePart1Length: 0.5,
                                valueLinePart2Length: 0.0
                                // valueLinePart1OffsetPercentage:1
                              }
                            }
                          ],
                          config: { barWidth: 0.5 }
                        }}
                        animation={{ durationX: 2000 }}
                        legend={{
                          enabled: true,
                          textSize: 10,
                          form: "CIRCLE",
                          textColor: processColor(colors.staticTextColor),
                          horizontalAlignment: "RIGHT",
                          verticalAlignment: "BOTTOM",
                          orientation: "HORIZONTAL",
                          wordWrapEnabled: true,
                          xEntrySpace: 2,
                          yEntrySpace: 1
                        }}
                        logEnabled={true}
                        extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}
                        entryLabelColor={processColor(colors.staticTextColor)}
                        entryLabelTextSize={10}
                        entryLabelFontFamily={"HelveticaNeue-Medium"}
                        drawEntryLabels={true}
                        rotationEnabled={true}
                        rotationAngle={90}
                        usePercentValues={true}
                        styledCenterText={{
                          text: "",
                          color: processColor(colors.staticTextColor),
                          fontFamily: "HelveticaNeue-Medium",
                          size: 20
                        }}
                        // centerTextRadiusPercent={100}
                        holeRadius={0}
                        holeColor={processColor("#f0f0f0")}
                        transparentCircleRadius={0}
                        transparentCircleColor={processColor("#f0f0f0")}
                        maxAngle={360}
                      />
                    ) : (
                      <View
                        style={{
                          width: "98%",
                          height: 300,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: colors.staticTextColor,
                            fontFamily: fontsRegular(props)
                          }}
                        >
                          Selected Chart type is Incompatible
                        </Text>
                      </View>
                    )
                  ) : valuecharts === "LINE_CHART" ? (
                    <LineChart
                      style={{ width: "98%", height: 300 }}
                      chartDescription={{ text: "" }}
                      data={{
                        dataSets: [
                          {
                            values: chartsData?.values,
                            // label: 'Bar dataSet',
                            config: {
                              color: processColor(colors.graphVertical),
                              // barShadowColor: processColor("pink"),
                              valueTextColor: processColor(
                                colors.transparentColor
                              ),
                              // highlightAlpha: 90,
                              highlightColor: processColor(colors.graphVertical)
                            }
                          }
                        ],
                        config: { barWidth: 0.5 }
                      }}
                      legend={{ enabled: false }}
                      marker={{
                        enabled: true,
                        digits: 2,
                        backgroundTint: processColor("teal"),
                        markerColor: processColor(colors.staticPrimaryColor),
                        textColor: processColor("white")
                      }}
                      xAxis={{
                        textColor: processColor(colors.staticGrayLabelColor),
                        valueFormatter: chartsData?.labels,
                        position: "BOTTOM",
                        drawGridLines: false,
                        granularityEnabled: true,
                        textSize: 11,
                        granularity: 1,
                        labelRotationAngle: 90
                      }}
                      drawGridBackground={false}
                      borderColor={processColor("teal")}
                      borderWidth={1}
                      drawBorders={true}
                      autoScaleMinMaxEnabled={false}
                      touchEnabled={true}
                      dragEnabled={true}
                      scaleEnabled={true}
                      scaleXEnabled={true}
                      scaleYEnabled={true}
                      pinchZoom={true}
                      doubleTapToZoomEnabled={true}
                      highlightPerTapEnabled={true}
                      highlightPerDragEnabled={true}
                      // visibleRange={this.state.visibleRange}
                      dragDecelerationEnabled={true}
                      dragDecelerationFrictionCoef={0.99}
                      onSelect={handleSelect.bind(this)}
                    />
                  ) : (
                    <BarChart
                      style={{ width: "98%", height: 300 }}
                      chartDescription={{ text: "" }}
                      data={{
                        dataSets: [
                          {
                            values: chartsData?.values,
                            // label: 'Bar dataSet',
                            config: {
                              color: processColor(colors.graphVertical),
                              // barShadowColor: processColor("pink"),
                              valueTextColor: processColor(
                                colors.transparentColor
                              ),
                              // highlightAlpha: 90,
                              highlightColor: processColor(colors.graphVertical)
                            }
                          }
                        ],
                        config: { barWidth: 0.5 }
                      }}
                      xAxis={{
                        textColor: processColor(colors.staticGrayLabelColor),
                        valueFormatter: chartsData?.labels,
                        position: "BOTTOM",
                        drawGridLines: false,
                        granularityEnabled: true,
                        textSize: 11,
                        granularity: 1,
                        labelRotationAngle: 90
                      }}
                      animation={{ durationX: 2000 }}
                      legend={{ enabled: false }}
                      yAxis={{
                        position: "LEFT",
                        right: { enabled: false },
                        left: {
                          drawAxisLine: false,
                          textSize: 11,
                          gridColor: processColor(colors.componentFrameColor),
                          textColor: processColor(colors.staticGrayLabelColor),
                          labelCount: 4,
                          axisMinimum:
                            chartsData.minimumValue < 0
                              ? chartsData.minimumValue
                              : null
                        }
                      }}
                      // gridBackgroundColor={processColor('#ffffff')}
                      visibleRange={{ x: { min: 4, max: 7 } }}
                      drawBarShadow={false}
                      drawValueAboveBar={false}
                      // onSelect={(event) => renderLabel(event.nativeEvent)}
                    />
                  )
                ) : (
                  <BarChart
                    style={{ width: "98%", height: 300 }}
                    chartDescription={{ text: "" }}
                    data={{
                      dataSets: [
                        {
                          values: chartsData?.values,
                          // label: 'Bar dataSet',
                          config: {
                            color: processColor(colors.graphVertical),
                            // barShadowColor: processColor("pink"),
                            valueTextColor: processColor(
                              colors.transparentColor
                            ),
                            // highlightAlpha: 90,
                            highlightColor: processColor(colors.graphVertical)
                          }
                        }
                      ],
                      config: { barWidth: 0.5 }
                    }}
                    xAxis={{
                      textColor: processColor(colors.staticGrayLabelColor),
                      valueFormatter: chartsData?.labels,
                      position: "BOTTOM",
                      drawGridLines: false,
                      granularityEnabled: true,
                      textSize: 11,
                      granularity: 1,
                      labelRotationAngle: 90
                    }}
                    animation={{ durationX: 2000 }}
                    legend={{ enabled: false }}
                    yAxis={{
                      position: "LEFT",
                      right: { enabled: false },
                      left: {
                        drawAxisLine: false,
                        textSize: 11,
                        gridColor: processColor(colors.componentFrameColor),
                        textColor: processColor(colors.staticGrayLabelColor),
                        labelCount: 4,
                        axisMinimum:
                          chartsData.minimumValue < 0
                            ? chartsData.minimumValue
                            : null
                      }
                    }}
                    // gridBackgroundColor={processColor('#ffffff')}
                    visibleRange={{ x: { min: 4, max: 7 } }}
                    drawBarShadow={false}
                    drawValueAboveBar={false}
                    // onSelect={(event) => renderLabel(event.nativeEvent)}
                  />
                )}
              </View>
            </ViewShot>
          </View>

          <View style={{ flex: 1, height: 40 }}>
            <Text
              style={{
                color: colors.staticGrayColor,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 10
              }}
            >
              {valuecharts === "PIE_CHART" ? null : data.xAxis.hint}
            </Text>
          </View>

          {/* </View> */}
          {/* <Text style={{position: 'absolute', marginTop: '80%', marginLeft: '50%'}}>xAxis</Text> */}
          {/* </View> */}
        </View>
        <Modal
          visible={showReportChartFilterModule}
          animationType="slide"
          transparent={true}
        >
          <ReportChartFilter
            title="Filter"
            cancelButtonText="Clear"
            submitButtonText="Apply"
            onPressCancel={() => setShowReportChartFilterModule(false)}
            themeData={props}
            dataID={data.id}
            getFilterdParam={getFilterParam}
            getClearParam={clearAllFilter}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          elevation={30}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={hideUserChartMenu}>
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width / 1.8,
                marginLeft: Dimensions.get("window").width / 3,
                marginTop: ylocation
              }}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => hidemodal("PIE_CHART", chartsData?.pieChart)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      style={{ marginRight: 5, color: "#ff6361" }}
                      name="piechart"
                      size={25}
                    />
                    <Text style={styles.modalText}>Pie Chart</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => hidemodal("BAR_CHART", "")}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      style={{ marginRight: 5, color: "#bc5090" }}
                      name="barschart"
                      size={25}
                    />
                    <Text style={styles.modalText}>Bar Chart</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => hidemodal("LINE_CHART", "")}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      style={{ marginRight: 5, color: "#ffa600" }}
                      name="linechart"
                      size={25}
                    />
                    <Text style={styles.modalText}>Line Chart</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </View>
  );
};
export default compose(container)(CommonGraph);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dropcontainer: {
    padding: 8,
    width: 200
  },
  dropdown: {
    height: 55,
    borderColor: colors.staticTextColor,
    borderWidth: 1.1,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: "100%",
    marginLeft: 10,
    marginTop: 10
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  // centeredView: {
  //   flex: 1,
  //   marginTop:100 * ylocation
  //   // justifyContent: "center",
  //   // alignItems: "center",
  // },
  modalView: {
    margin: 20,
    backgroundColor: colors.staticWhiteColor,
    borderRadius: 20,
    borderColor: colors.borderWhite,
    borderWidth: 1,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
    color: colors.staticTextColor
  }
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  //   width: 50
  // },
});
