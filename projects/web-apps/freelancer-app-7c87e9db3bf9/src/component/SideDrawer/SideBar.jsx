import { R } from "@app/res/index";
import React from "react";
import { StyleSheet } from "react-native";
import Text from "../common/Text";
import View from "../common/View";

const SideBar = ({ percentage = 0 }) => {
  return (
    <>
      <View paddingHorizontal={R.units.scale(8)}>
        {percentage !== 100 ? (
          <Text align="center" variant="caption">
            Complete your profile - {percentage}%
          </Text>
        ) : null}

        <View style={styles.container}>
          <View style={[styles.inner, { width: percentage + "%" }]} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: R.units.scale(2),
    borderWidth: R.units.scale(1),
    borderColor: "#c1c1c1",
    borderRadius: R.units.scale(30),
    justifyContent: "center",
  },
  inner: {
    width: "100%",
    height: R.units.scale(8),
    borderRadius: R.units.scale(15),
    opacity: 0.8,
    backgroundColor: R.colors.primary.main,
  },
  label: {
    fontSize: R.units.scale(6),
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },
});
export default SideBar;
