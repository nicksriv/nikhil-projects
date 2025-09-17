import React from "react";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";

import { R } from "@app/res";
import { dateTimeHelper } from "@app/util/dateTimeHelper";
import constants from "@app/helper/constants";


const DashboardJobCard = (props) => {

  let cardStyle = {};

    cardStyle = {
      borderWidth: R.units.scale(1),
      borderColor: R.colors.border,
      backgroundColor: R.colors.white,
    };

  if (props.cardStyle) {
    cardStyle = { ...cardStyle, ...props.cardStyle };
  }
  return (
    <View
      touchable
      onPress={props.onPress}
      style={{
        backgroundColor: R.colors.white,
        borderRadius: R.units.scale(3),
        paddingHorizontal: R.units.scale(12),
        paddingVertical: R.units.scale(8),
        alignItems: "flex-start",
        minHeight: R.units.scale(100),
        ...cardStyle,
      }}
    >
      <Text color="secondary" font="semibold">#{props.jobRefNo}</Text>
      <Text>{props.title}</Text>
      <View flex={1} />
      <View
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <View>
          <Text variant="caption">{props.createdAtLabel}</Text>
          <Text variant="caption">
            {dateTimeHelper.displayDate(props.createdAt)}
          </Text>
        </View>

        <Text
          style={{
            backgroundColor: constants[props.status]?.backgroundColor,
            color: constants[props.status]?.color,
            paddingVertical: R.units.scale(2),
            paddingHorizontal: R.units.scale(10),
            borderRadius: R.units.scale(20),
            borderWidth: 1,
            borderColor: constants[props.status]?.color,
            fontSize: R.units.scale(10),
            textTransform: "capitalize",
            textAlign: "center",
            lineHeight: R.units.scale(16),
          }}
        >
          {constants[props.status]?.label}
        </Text>
      </View>
    </View>
  );
};

export default DashboardJobCard;
