import React from "react";
import { R } from "@app/res";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";

const NotificationCard = (props) => {
  return (
    <View
      style={{
        marginHorizontal: R.units.scale(8),
        borderRadius: R.units.scale(3),
        backgroundColor: R.colors.white,
        paddingVertical: R.units.scale(8),
        paddingHorizontal: R.units.scale(10)
      }}
    >
      <Text variant="body1" font="medium">{props.notificationData.notificationTitle}</Text>
      <Text>{props.notificationData.notificationDescription}</Text>
    </View>
  );
};

export default NotificationCard;
