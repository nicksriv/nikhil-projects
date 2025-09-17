import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors } from "../themes/color";

const RepToBanner = (props) => {
  const { data } = props;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.viewContainer}>
          {/* <Icon
                        name="drag-indicator"
                        size={20}
                        style={{ alignSelf: "center" }}
                    /> */}
          <Text style={[styles.titleText, { fontFamily: fontsRegular(props) }]}>
            Reporting To
          </Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.imageView}>
          <Image
            source={require("../assets/images/Johnwick.jpg")}
            style={styles.profileImage}
          />
        </View>

        <View style={{ paddingLeft: 10 }}>
          <Text
            style={{
              color: colors.staticTextColor,
              fontSize: 14,
              fontFamily: fontsRegular(props),
            }}
          >
            {data?.reporting?.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: colors.staticTextColor,
                fontSize: 10,
                fontWeight: "200",
                fontFamily: fontsRegular(props),
              }}
            >
              Emp ID:{" "}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "600",
                color: colors.staticTextColor,
                fontFamily: fontsRegular(props),
              }}
            >
              {data?.reporting?.employeId}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepToBanner;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.staticWhiteColor,
    borderRadius: 2,
    shadowOpacity: 0.1,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 25,
  },
  titleText: {
    fontSize: 13,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.staticTextColor,
    paddingLeft: 20,
  },
  rowContainer: {
    flexDirection: "row",
    paddingBottom: 35,
  },
  imageView: {
    paddingLeft: 25,
    justifyContent: "center",
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 7,
  },
});
