import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

const FaltListItem = ({ props, item, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: selected ? primaryColor(props) : "#FFFFFFBD",
          borderColor: selected ? primaryColor(props) : colors.staticIconGrayColor,
          borderWidth: 1,
        },
      ]}
    >
      <Text style={{ textAlign: "center", fontFamily: fontsRegular(props) }} numberOfLines={3}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
});

export default FaltListItem;
