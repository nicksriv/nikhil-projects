import React from "react";

import { StyleSheet } from "react-native";
import View from "../common/View";
import Text from "../common/Text";

import { R } from "../../res";
import Separator from "../common/Separator";
import ActicityIndicator from "../../component/common/ActivityIndicator";

const Button = ({
  isLoading,
  text,
  leftComponent,
  rightComponent,
  onPress,
  onLongPress,
  disabled = false,
  //
  variant = "contained",
  size = "sm",
  shape = "none",
  //
  color = "",
  borderColor = "",
  backgroundColor = "",
  //
  style = {},
  ...props
}) => {
  const fontSize = { xs: 10, sm: 12, md: 14, lg: 16 };
  const paddingVertical = { xs: 5, sm: 6, md: 8, lg: 10 };
  const paddingHorizontal = { xs: 10, sm: 12, md: 16, lg: 20 };
  const borderRadius = {
    xs: 3,
    sm: 3,
    md: 4,
    lg: 4,
    square: 0,
    round: 100,
  };
  const fontColor =
    variant === "contained"
      ? R.colors.primary.contrastText
      : R.colors.primary.main;

  return (
    <View
      pressable={true}
      rippleColor={R.colors._helper.hexToRGB(color || fontColor, "0.1")}
      disabled={disabled}
      style={[
        styles.root,
        styles[`root_variant_${variant}`],
        styles[`root_disabled_${variant}_${disabled}`],
        {
          paddingVertical: R.units.scale(paddingVertical[size]),
          paddingHorizontal: R.units.scale(paddingHorizontal[size]),
          borderRadius: R.units.scale(
            borderRadius[shape] !== undefined
              ? borderRadius[shape]
              : borderRadius[size]
          ),
        },
        backgroundColor ? { backgroundColor } : {  },
        borderColor ? { borderColor } : {},
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      {...props}
    >
      {leftComponent ? (
        <View style={[styles.leftComponentRoot]}>
          {leftComponent({ disabled })}
          <Separator vertical />
        </View>
      ) : null}
      {isLoading ? (
        <>
          <ActicityIndicator isLoading={isLoading} />
        </>
      ) : (
        <>
          <Text
            size={fontSize[size]}
            color={disabled ? "disabled" : color || fontColor}
          >
            {text}
          </Text>
        </>
      )}
      {rightComponent ? (
        <View style={[styles.rightComponentRoot]}>
          <Separator vertical />
          {rightComponent({ disabled })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    paddingHorizontal: R.units.scale(49),
    borderRadius: R.units.scale(4),
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  root_variant_contained: {
    backgroundColor: R.colors.primary.main,
  },
  root_variant_outlined: {
    borderColor: R.colors.primary.main,
  },
  root_disabled_contained_true: {
    backgroundColor: R.colors.background.disabled,
  },
  root_disabled_outlined_true: {
    borderColor: R.colors.background.disabled,
  },

  leftComponentRoot: {
    flexGrow: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightComponentRoot: {
    flexGrow: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(Button);
