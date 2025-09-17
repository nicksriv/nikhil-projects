import React from "react";
import { View, StyleSheet } from "react-native";
import { R } from "../../res";

const Card = (props) => {
  const { children, style } = props;
  return <View style={[styles.root, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    padding: R.units.scale(20),
    borderColor: R.colors.white,
    borderRadius: R.units.scale(3),
    backgroundColor: R.colors.white,
  },
});

export default Card;
