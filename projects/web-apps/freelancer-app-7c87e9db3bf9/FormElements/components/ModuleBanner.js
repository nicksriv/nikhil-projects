import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";

const ModuleBanner = (props) => {
  const { data, dashBoard } = props;

  const dashBoardChart = dashBoard;
  // console.log("dashBoarddashBoarddashBoard = ", dashBoardChart);
  // const newModules = data;
  // console.log("newModulesnewModulesnewModulesnewModules = ", newModules);

  // const showFull = newModules;
  // const showLess = newModules?.length > 4 ? newModules?.slice(0, 4) : showFull;

  // const [expanded, setExpanded] = useState(true);
  const [useArray, setArray] = useState();
  const [useDashBoardArray, setDashBoardArray] = useState();

  useEffect(() => {
    var res = data.map((item, index) => {
      if (item.moduleColor == null) {
        item.moduleColor = generateRandomColor();
      }
    });
    var newRes = (dashBoardChart.moduleColor = generateRandomColor());
    setDashBoardArray(dashBoardChart);
    setArray(data);
  }, []);

  const generateRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView style={{}}>
      <View style={styles.mainContainer}>
        {/* <View
          style={{ width: Platform.OS === "ios" ? RA(145) : RA(125) }}
        ></View> */}

        {useArray?.map((item) => (
          <TouchableOpacity
            onPress={() =>
              props.props.navigation.navigate("ModuleDetailsScreen", {
                fromModule: item,
                isChart: false,
              })
            }
          >
            <View style={styles.container}>
              <View
                style={{
                  height: Dimensions.get("window").width / 3.5,
                  width: Dimensions.get("window").width / 3.5,
                  backgroundColor: colors.staticWhiteColor,
                  borderColor: item.moduleColor,
                  borderWidth: 1,
                  borderRadius: 15,
                  shadowColor: colors.staticGrayLabelColor,
                  shadowOpacity: 0.2,
                }}
              >
                <View style={styles.viewContainer}>
                  <View
                    style={{
                      width: RA(32),
                      height: RA(32),
                      marginTop: RA(15),
                      justifyContent: "center",
                      alignSelf: "center",
                      borderRadius: 40 / 2,
                      backgroundColor: item?.color
                        ? item?.color
                        : item.moduleColor,
                      shadowOpacity: 0.1,
                    }}
                  >
                    <Icon
                      name={item?.iconMobile ? item?.iconMobile : "adjust"}
                      size={RA(15)}
                      style={{
                        alignSelf: "center",
                        color: colors.staticWhiteColor,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.titleText,
                      { fontFamily: fontsRegular(props) },
                    ]}
                    numberOfLines={2}
                  >
                    {item?.name ? item?.name : ""}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {dashBoardChart.charts.length != 0 ? (
          <TouchableOpacity
            onPress={() =>
              props.props.navigation.navigate("ModuleDetailsScreen", {
                fromModule: dashBoardChart,
                isChart: true,
              })
            }
          >
            <View style={styles.container}>
              <View
                style={{
                  height: Dimensions.get("window").width / 3.5,
                  width: Dimensions.get("window").width / 3.5,
                  backgroundColor: colors.staticWhiteColor,
                  borderColor: dashBoardChart.moduleColor,
                  borderWidth: 1,
                  borderRadius: 15,
                  shadowColor: colors.staticGrayLabelColor,
                  shadowOpacity: 0.2,
                }}
              >
                <View style={styles.viewContainer}>
                  <View
                    style={{
                      width: RA(32),
                      height: RA(32),
                      marginTop: RA(15),
                      justifyContent: "center",
                      alignSelf: "center",
                      borderRadius: 40 / 2,
                      backgroundColor: dashBoardChart.moduleColor,
                      shadowOpacity: 0.1,
                    }}
                  >
                    <Icon
                      name={"insert-chart-outlined"}
                      size={RA(15)}
                      style={{
                        alignSelf: "center",
                        color: colors.staticWhiteColor,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.titleText,
                      { fontFamily: fontsRegular(props) },
                    ]}
                    numberOfLines={2}
                  >
                    Charts
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ModuleBanner;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: Platform.OS === "ios" ? "55%" : "65%",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: "2%",
  },
  container: {
    paddingLeft: RA(5),
    flexDirection: "row",
    width: Dimensions.get("window").width / 3.05,
    height: Dimensions.get("window").width / 3.05,
  },

  // subContainer: {
  //   height: 220,
  //   width: 120,
  //   backgroundColor: "transparent",
  // },
  whiteContainer: {
    height: RA(100),
    width: RA(100),
    backgroundColor: colors.staticWhiteColor,
    borderColor: colors.borderWhite,
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: colors.staticGrayLabelColor,
    shadowOpacity: 0.7,
  },
  viewContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 11,
    color: colors.staticTextColor,
    paddingTop: RA(10),
    width: "80%",
    height: "40%",
    alignSelf: "center",
    textAlign: "center",
  },
  numberText: {
    fontSize: 20,
    color: colors.staticTextColor,
    width: "50%",
    height: "20%",
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
  },
  subText: {
    fontSize: 10,
    color: colors.staticTextColor,
    width: "100%",
    height: "40%",
    alignSelf: "center",
    textAlign: "center",
  },
  showView: {
    height: 130,
    width: 120,
    backgroundColor: colors.staticShowColor,
    borderRadius: 15,
    shadowOpacity: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  disableShowView: {
    height: 130,
    width: 120,
    backgroundColor: colors.staticDisableShowColor,
    opacity: 0.5,
    borderRadius: 15,
    // shadowOpacity: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  showText: {
    fontSize: 19,
    padding: 15,
    color: colors.staticWhiteColor,
    fontWeight: "600",
    width: "80%",
    height: "60%",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  disableShowText: {
    fontSize: 19,
    padding: 15,
    opacity: 0.5,
    color: colors.staticWhiteColor,
    fontWeight: "600",
    width: "80%",
    height: "60%",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  iconStyle: {
    padding: 15,
    alignSelf: "flex-start",
    color: colors.staticWhiteColor,
  },
  disableIconStyle: {
    padding: 15,
    alignSelf: "flex-start",
    opacity: 0.5,
    color: colors.staticWhiteColor,
  },
});
