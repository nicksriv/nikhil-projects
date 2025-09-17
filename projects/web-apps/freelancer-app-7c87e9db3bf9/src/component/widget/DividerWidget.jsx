import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Button from "../form/Button";
import Separator from "../common/Separator";
import Divider from "../common/Divider";
const DividerWidget = ({ globalStyles }) => {
  return (
    <>
      <View style={[globalStyles.card]}>
        <Text size="10" font="medium">
          Prop: default
        </Text>
        <Text size="10">
          Description: Horizontal Divider
        </Text>
        <Separator />
        <Divider color={R.colors.primary.lightest}></Divider>
      </View>
      <Separator />
      <View style={[globalStyles.card]}>
        <Text size="10" font="medium">
          Prop: vertical
        </Text>
        <View style={{ width: "30%", flexDirection: 'row', alignItems: "center", justifyContent:"space-between" }}>
          <View
            style={[
              globalStyles.card,
              {
                backgroundColor:
                  R.colors.primary.lightest,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text size="10">box</Text>
          </View>
          <Divider vertical={true} color={R.colors.primary.lightest}></Divider>
          <View
            style={[
              globalStyles.card,
              {
                backgroundColor:
                  R.colors.primary.lightest,
                alignItems: "center",
                justifyContent: "center",
                width: 50
              },
            ]}
          >
            <Text size="10">box</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default DividerWidget;