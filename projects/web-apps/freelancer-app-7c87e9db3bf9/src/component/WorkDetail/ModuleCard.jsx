import React from "react";
import View from "../common/View";
import Text from "../common/Text";
import { StyleSheet } from "react-native";
import { R } from "../../res";
import Icon from "react-native-vector-icons/MaterialIcons";

const ModuleCard = ({moduleData, handlePress} ) => {
  return (
    <>
      <View style={styles.moduleCard} pressable onPress={() => handlePress()}>
        <View style={styles.moduleContent}>
          <Icon
            name={moduleData.iconMobile}
            size={35}
            style={styles.moduleIconStyle}
          />
          <Text style={styles.moduleName}>{moduleData.name}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  moduleCard: {
    borderRadius: R.units.scale(8),
    padding: R.units.scale(12),
    margin: R.units.scale(10),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.chipBorder,
    backgroundColor: R.colors.white,
    alignItems: "center",
    width: "40%",
  },
  moduleContent: {
    alignItems: "center",
    paddingVertical: R.units.scale(10),
  },
  moduleName: {
    fontSize: R.units.scale(10),
    fontFamily: R.fonts.poppin.light,
    textAlign: "center",
    color:"black"
  },
  moduleIconStyle: {
    color: R.colors.chipBorder,
  },
});

export default ModuleCard;
