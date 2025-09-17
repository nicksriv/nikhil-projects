import React from "react";
import { View as RNView, Pressable, ScrollView } from "react-native";
import { R } from "../../res";

const View = ({
  touchable = false,
  pressable = false,
  scrollable = false,
  container = false,
  rippleColor = R.colors.background.disabled,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  ...props
}) => {
  if (scrollable) {
    const { contentContainerStyle = {}, ...restProps } = props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        contentContainerStyle={container ? { paddingHorizontal: R.units.scale(12), ...contentContainerStyle } : contentContainerStyle}
        {...restProps}
      />
    );
  }
  if (pressable) {
    const { style = {}, android_ripple = {}, ...restProps } = props;
    return (
      <Pressable
        style={container ? { paddingHorizontal: R.units.scale(12), ...style } : style}
        android_ripple={{
          color: R.colors._helper.hexToRGB(rippleColor, 0.0),
          ...android_ripple,
        }}
        {...restProps}
      />
    );
  }
  if (touchable) {
    const { style = {}, android_ripple = {}, ...restProps } = props;
    return (
      <Pressable
        style={container ? { paddingHorizontal: R.units.scale(12), ...style } : style}
        android_ripple={{
          color: R.colors._helper.hexToRGB(rippleColor, 0.0),
          ...android_ripple,
        }}
        {...restProps}
      />
    );
  }
  const { style = {}, ...restProps } = props;
  return <RNView style={container ? { paddingHorizontal: R.units.scale(12), ...style } : style} {...restProps} />;
};

export default React.memo(View);
