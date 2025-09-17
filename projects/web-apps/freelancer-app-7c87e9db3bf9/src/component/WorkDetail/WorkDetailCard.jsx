import React from "react";
import View from "../common/View";
import Text from "../common/Text";
import { StyleSheet } from "react-native";
import { R } from "../../res";

const WorkDetailCard = ({ moduleArray, onPress }) => {
  return (
    <View scrollable>
      <View>
        <Text style={styles.header}>Modules</Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: R.units.scale(16),
    fontWeight: "600",
    lineHeight: R.units.scale(24),
    marginVertical: R.units.scale(8),
    paddingHorizontal: R.units.scale(8),
  },
});

export default WorkDetailCard;
