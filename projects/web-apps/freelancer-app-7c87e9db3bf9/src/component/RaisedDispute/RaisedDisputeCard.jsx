import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Card from "@app/component/common/Card";
import Chip from "@app/component/common/Chip";
import Separator from "@app/component/common/Separator";

import { dateTimeHelper } from "@app/helper/dateTime";

const RaisedDisputeCard = ({ disputeRefNo,disputeTitle,createdAt,disputeStatus, onPress }) => {

  const disputeStatusText = {
    NEW: {
      label: 'New',
      color: R.colors.success.light,
    },
    CLOSED: {
      label: 'Closed',
      color: R.colors.success.main,
    },
    INREVIEW: {
      label: 'Under Review',
      color: R.colors.warning.light,
    },
  };
  
  return (
    <View touchable onPress={onPress}>
      <Card style={styles.cardStyle}>
        <Text>#{disputeRefNo}</Text>
        <Text variant="body1" font="medium">
          {disputeTitle}
        </Text>

        <Separator />
        <View
          flexDirection="row"
          // flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text style={styles.date}>
            {dateTimeHelper.displayDate(createdAt)}
          </Text>

          <Chip
            variant="outlined"
            customViewStyle={{
              borderColor:disputeStatusText[disputeStatus].color,
              backgroundColor: disputeStatusText[disputeStatus].color,
              paddingVertical: R.units.scale(1),
              paddingHorizontal: R.units.scale(2),
            }}
            customLabelStyle={{
              fontSize: R.units.scale(10),
              textTransform: "capitalize",
              color: R.colors.success.contrastText,
            }}
            label={disputeStatusText[disputeStatus].label}
          

          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: "flex-start",
    elevation: 5,
    padding: R.units.scale(10),
    marginHorizontal: R.units.scale(2),
    borderRadius: R.units.scale(2),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.border,
    backgroundColor: R.colors.white,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  date: {
    fontSize: R.units.scale(14),
    lineHeight: R.units.scale(14),
    fontWeight: "400",
    color: R.colors.text.secondary,
    paddingVertical: R.units.scale(3),
    alignSelf: "flex-end",
  },
});

export default RaisedDisputeCard;
