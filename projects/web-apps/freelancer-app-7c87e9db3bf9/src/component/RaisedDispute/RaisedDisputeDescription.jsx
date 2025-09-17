import React from "react";
import { StyleSheet } from "react-native";
import { R } from "../../res";
import Text from "../common/Text";
import View from "../common/View";
import Separator from "../../component/common/Separator";
import _get from "lodash.get";
import { dateTimeHelper } from "@app/helper/dateTime";
const RaisedDisputeDescription = (props) => {

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
  const { data, disputeListCategory } = props;
  const {
    disputeCategoryId,
    disputeTitle,
    disputeDescription,
    disputeRefNo,
    disputeStatus,
    closedAt,
    closedRemark,
    createdAt,
  } = data;

  const disputeCategoryData = disputeListCategory.find((item) => {
    return `${item.id}`.toLowerCase() === `${disputeCategoryId}`.toLowerCase();
  });

  const disputeCategoryName = _get(
    disputeCategoryData,
    "disputeCategoryName",
    ""
  );

  return (
    <View paddingHorizontal={15}>
      <Separator size={30} />
      <View width="100%" flexDirection="row" justifyContent="space-between">
        <Text font="semibold" color="secondary">
          #{disputeRefNo}
        </Text>
        <Text
          style={{
            backgroundColor: disputeStatusText[disputeStatus].color,
            color: R.colors.success.contrastText,
            paddingVertical: R.units.scale(2),
            paddingHorizontal: R.units.scale(10),
            borderRadius: R.units.scale(20),
            fontSize: R.units.scale(10),
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {disputeStatusText[disputeStatus].label}
        </Text>
      </View>
      <Text style={styles.header} font="bold">
        Dispute Category :
      </Text>
      <Text font="medium">{disputeCategoryName}</Text>
      <Text style={styles.header} font="bold">
        Dispute Title:
      </Text>
      <Text font="medium">{disputeTitle}</Text>
      <Text style={styles.header} font="bold">
        Description:
      </Text>
      <Text font="medium">{disputeDescription}</Text>
      <Text style={styles.header} font="bold">
        Raised At:
      </Text>
      <Text font="medium">{dateTimeHelper.displayDate(createdAt)} </Text>
      {closedAt ? (
        <>
          <Text style={styles.header} font="bold">
            Closed At:
          </Text>
          <Text font="medium">{dateTimeHelper.displayDate(closedAt)} </Text>
        </>
      ) : null}

      {closedRemark ? (
        <>
          <Text style={styles.header} font="bold">
            Closed Remark:
          </Text>
          <Text font="medium">{closedRemark}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: R.units.scale(4),
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    color: R.colors.text.secondary,
    marginHorizontal: R.units.scale(5),
  },
});
export default RaisedDisputeDescription;
