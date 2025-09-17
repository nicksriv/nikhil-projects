import React from "react";
import View from "../common/View";

import Text from "../common/Text";
import {  StyleSheet } from "react-native";
import { R } from "../../res";
import Star from "react-native-vector-icons/AntDesign";

const MyWorkCard = (props) => {
  const {
    id,
    jobTitle,
    projectType,
    jobStatus,
  } = props.item;
  const { onPress, customCardStyle } = props;

  const statusMapping = [
    {
      label: "Applied at",
      key: "jobApplicationAt",
      index:0,
    },
    {
      label: "Rejected at",
      key: "rejectedAt",
      index:1,
    },
    {
      label: "Accepted at",
      key: "acceptedAt",
      index:2,
    },
    {
      label: "Assigned At",
      key: "createdAt",
      index:3,
    },
    {
      label: "Completed At",
      key: "completedAt",
      index:4,
    },
    {
      label: "Cancelled At",
      key: "cancelledAt",
      index:5,
    },
  ];

  return (
    <>
      <View style={[styles.cardStyle, customCardStyle]}>
        <View touchable onPress={() => onPress(id)}>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text style={styles.textActive}>{jobStatus}</Text>

            <View flexDirection="row" alignItems="center">
              <Star name="star" size={20} color="#ffc107" />
              <Text style={styles.ratingValue}>0</Text>
            </View>
          </View>

          <View style={styles.jobTitleView}>
            <Text style={styles.jobTitle}>{jobTitle}</Text>
            {projectType ? (
              <Text style={styles.jobType}>({projectType})</Text>
            ) : null}
          </View>
        </View>

        {statusMapping.map((status, index) => {
          if (props.item[status.key]) {
            return (
              <View
                flexDirection="row"
                alignItems="center"
                key={`status_mapping_${status.index}`}
              >
                <Text style={styles.dateHeader}>{status.label}</Text>
                <Text style={styles.dateValue}>
                  {new Date(props.item[status.key]).toLocaleDateString()}
                </Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(8),
    padding: R.units.scale(12),
    margin: R.units.scale(10),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.white,
    backgroundColor: R.colors.white,
  },
  jobTitleView: {
    marginVertical: R.units.scale(7),
  },
  jobTitle: {
    fontSize: R.units.scale(14),
    fontWeight: "500",
    color: R.colors.black,
    lineHeight: R.units.scale(18),
  },
  jobType: {
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(16),
    fontWeight: "500",
    color: R.colors.text.disabled,
  },
  descriptionText: {
    fontSize: R.units.scale(12),
    color: R.colors.text.secondary,
    lineHeight: R.units.scale(13),
    textAlign: "left",
    marginBottom: R.units.scale(18),
  },
  dateHeader: {
    fontWeight: "500",
  },
  dateValue: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(14),
    paddingHorizontal: R.units.scale(4),
  },
  textActive: {
    backgroundColor: R.colors.background.chip,
    paddingVertical: R.units.scale(2),
    paddingHorizontal: R.units.scale(8),
    borderRadius: R.units.scale(16),
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: R.units.scale(10),
  },
});

export default MyWorkCard;
