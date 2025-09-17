/**
 *
 * Link
 *
 */

import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";

import Text from "./Text";

import { navigationHelper } from "@app/helper/navigation";

function Link(props) {
  const { children, redirectTo, ...restProps } = props;

  return (
    <Text
      style={styles.redirectLink}
      onPress={() => {
        navigationHelper.navigate({
          name: redirectTo,
        });
      }}
      variant={"subtitle2"}
    //   {...restProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  redirectLink: {
    color: R.colors.primary.link,
    textDecorationLine: "underline",
  },
});

export default Link;
