import React from "react";
import { ActivityIndicator as RActivityIndicator } from "react-native";
import { R } from "../../res";

const ActivityIndicator = ({
  isLoading = false,
  size = "small",
  color = R.colors.white,
}) => {
  if (!isLoading) return null;
  return <RActivityIndicator size={size} color={color} />;
};

export default React.memo(ActivityIndicator);
