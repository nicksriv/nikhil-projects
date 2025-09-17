import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";

import Image from "@app/component/common/Image";
import Separator from "@app/component/common/Separator";
import View from "@app/component/common/View";

const AuthLayout = (props) => {
  return (
    <View style={styles.container} scrollable>
      <Separator size={40} />
      <View style={styles.logoView}>
        <Image
          source={R.images.tab.logo()}
          backgroundColor={"transparent"}
          width={200}
        />
      </View>
      <Separator size={0} />

      {/* <View scrollable> */}
      {props.children}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.background.paper,
    flex: 1,
  },
  logoView: {
    alignItems: "center",
  },
});

export default AuthLayout;
