import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { R } from "../../res";
import Text from "./Text";
import View from "./View";

const Chip = ({
  label,
  variant = "contained",
  customViewStyle = {},
  customLabelStyle = {},
  iconName = false,
  onPress = { onPress },
  onChipPress,
}) => {
  return (
    <>
      <View
        style={[
          variant === "outlined"
            ? styles.outlinedChipView
            : styles.containedChipView,
          customViewStyle,
        ]}
        pressable
        onPress={onChipPress}
      >
        <Text
          style={[
            variant === "outlined"
              ? styles.outlinedStyle
              : styles.containedStyle,
            customLabelStyle,
          ]}
        >
          {label}
        </Text>
        {iconName ? (
          <Icon
            name={iconName}
            size={16}
            onPress={onPress}
            style={{ marginLeft: R.units.scale(3) }}
            color="#000"
          />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containedChipView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: R.colors.background.chip,
    borderRadius: R.units.scale(25),
    marginRight: R.units.scale(9),
    paddingHorizontal: R.units.scale(8),
    paddingVertical: R.units.scale(3),
  },
  outlinedChipView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: R.units.scale(25),
    marginRight: R.units.scale(4),
    paddingHorizontal: R.units.scale(8),
    paddingVertical: R.units.scale(2),
    borderColor: R.colors.chipBorder,
    borderWidth: 1,
  },
  containedStyle: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(13),
  },
  outlinedStyle: {
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(14),
    color: R.colors.chipBorder,
    paddingHorizontal: R.units.scale(11),
    paddingVertical: R.units.scale(2),
  },
});

export default Chip;
