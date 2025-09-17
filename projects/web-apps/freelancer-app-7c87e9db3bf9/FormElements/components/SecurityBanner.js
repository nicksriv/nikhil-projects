import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { colors } from "../themes/color";
import { SliderBox } from "react-native-image-slider-box";

const SecurityBanner = (props) => {
  const { data } = props;

  const [loadImages, setImages] = useState([
    require("../assets/images/Banner1.jpg"),
    require("../assets/images/Banner2.jpg"),
    require("../assets/images/Banner3.jpg"),
    require("../assets/images/Banner4.jpg"),
    require("../assets/images/Banner5.jpg"),
  ]);

  return (
    <View style={styles.container}>
      <SliderBox
        // ImageComponent={FastImage}
        images={loadImages}
        // sliderBoxHeight={200}
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
        marginRight={"4%"}
        dotColor="#FFFFFF"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        overflow={"hidden"}
        autoplay
        circleLoop
        backgroundColor={colors.transparentColor}
        resizeMethod={"resize"}
        resizeMode={"cover"}
        borderRadius={10}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -5,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)",
        }}
        ImageComponentStyle={{
          borderRadius: 10,
          width: "94%",
          height: "100%",
        }}
        imageLoadingColor="#2196F3"
      />
      {/* <Image
          source={require("../assets/images/newBanner.png")}
          style={{ width: "101%", height: "80%", borderRadius: 10 }}
        /> */}
    </View>
  );
};

export default SecurityBanner;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    height: 230,
    width: "100%",
    padding: 10,
    shadowColor: colors.staticGrayLabelColor,
    shadowOpacity: 0.7,
    backgroundColor: colors.transparentColor,
    overflow: "hidden",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleText: {
    fontSize: 13,
    color: colors.staticTextColor,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  lineView: {
    borderBottomColor: "black",
    borderBottomWidth: 0.3,
  },
  staticText: {
    fontWeight: "300",
    fontSize: 15,
    color: colors.staticTextColor,
  },
  dynamicText: {
    fontWeight: "600",
    fontSize: 15,
    color: colors.staticTextColor,
  },
  firstRowText: {
    paddingLeft: 20,
    padding: 10,
    flexDirection: "row",
  },
  secondRowText: {
    paddingLeft: 20,
    paddingBottom: 35,
    flexDirection: "row",
  },
});
