import React from "react";
import View from "../common/View";
import Text from "../common/Text";
import { StyleSheet } from "react-native";
import { R } from "../../res";
import Time from "react-native-vector-icons/Octicons";
import Dollar from "react-native-vector-icons/FontAwesome";

const MyEarningHeader = ({ earningHeader = {} }) => {
  const {
    totalHoursWorked,
    totalMoneyEarned,
  } = earningHeader;
  return (
    <View style={styles.cardStyle}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        marginVertical={R.units.scale(10)}
      >
        <View style={styles.totalView}>
          <Text style={styles.totalHeader}>Total earnings</Text>
          <Text style={styles.totalValue}><Dollar name="dollar" size={18} />{" "}{totalMoneyEarned}</Text> 
        </View>

        <View style={styles.totalView}>
          <Text style={styles.totalHeader}>Total hours worked</Text>
          <Text style={styles.totalValue}><Time name="clock" size={18} />{" "}{totalHoursWorked}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalView: {
    alignItems: "center",
  },
  totalHeader: {
    fontWeight: "500",
    marginVertical: R.units.scale(2),
  },
  totalValue: {
    fontSize: R.units.scale(16),
    fontWeight: "500",
  },
  cardStyle: {
    borderRadius: R.units.scale(4),
    backgroundColor: R.colors.white,
    padding: R.units.scale(12),
    elevation: 4,
  },
  cardSubView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeader: {
    fontSize: R.units.scale(16),
    fontWeight: "400",
    lineHeight: R.units.scale(19),
    marginVertical: R.units.scale(5),
  },
});

export default MyEarningHeader;
