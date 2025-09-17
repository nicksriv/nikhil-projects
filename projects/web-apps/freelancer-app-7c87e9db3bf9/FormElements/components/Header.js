import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

function Header(props) {
  const { data, themeData } = props;
  return (
    <View style={styles.header}>
      <View
        style={{
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: data?.customOptions?.sectionHeaderBGColor,
          height: 50,
        }}
      >
        <Text style={{ color: "#ffffff", fontFamily: fontsRegular(themeData) }}>{data.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
export default Header;
