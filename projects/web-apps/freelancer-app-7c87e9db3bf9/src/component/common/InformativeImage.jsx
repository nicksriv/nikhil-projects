import React from "react";
import { StyleSheet } from "react-native";
import { R } from "../../res";
import Image from "./Image";
import Text from "./Text";
import View from "./View";

const InformativeImage = ({ source, text }) => {
  return (
    <>
      <View
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        flex={1}
      >
        <View alignItems="center">
          <Image height={80} width={80} source={source ? source : R.images.informative.noData()} />
          {text ? (
            <Text color={R.colors.text.secondary}>{text}</Text>
          ) : (
            <Text>No Data Available</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default InformativeImage;
