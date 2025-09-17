import React from "react";
import { StyleSheet } from "react-native";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import JobCard from "@app/component/JobCard/JobCard";
import Separator from "@app/component/common/Separator";
import SectionHeader from "@app/component/SectionHeader";

import { R } from "@app/res";

const OtherOpeningJobCard = ({ data, onPress }) => {
  return (
    <>
      <SectionHeader title="Other Openings" />
      <Separator />
      <View scrollable horizontal>
        {data.length ? (
          data.map((item, otherKey) => {
            return (
              <React.Fragment key={`other_opening_card_${otherKey}`}>
                <JobCard
                  item={item}
                  customCardStyle={styles.customCardStyle}
                  variant="outlined"
                  onPress={() => onPress(item.id)}
                />
                <Separator vertical />
              </React.Fragment>
            );
          })
        ) : (
          <View>
            <Text>No Other Jobs Available</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: R.units.scale(16),
    fontWeight: "600",
    lineHeight: R.units.scale(24),
    marginVertical: R.units.scale(7),
  },
  customCardStyle: {
    maxWidth: R.units.windowWidth(0.9),
  },
});

export default OtherOpeningJobCard;
