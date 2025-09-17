import React from "react";
import { StyleSheet } from "react-native";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import JobCard from "@app/component/JobCard/JobCard";
import Separator from "@app/component/common/Separator";
import SectionHeader from "@app/component/SectionHeader";

import { R } from "@app/res";

const SimilarJobCard = ({ data, onPress }) => {
  return (
    <>
      <SectionHeader title="Similar Jobs" />
      <Separator />
      <View scrollable horizontal>
        {data.length ? (
          data.map((item, similarKey) => {
            return (
              <React.Fragment key={`similar_job_card_${similarKey}`}>
              <JobCard
                item={item}
                onPress={() => onPress(item.id)}
                customCardStyle={styles.customCardStyle}
                variant="outlined"
              />
              <Separator vertical />
              </React.Fragment>
            );
          })
        ) : (
          <View>
            <Text>No Similar Jobs Available</Text>
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
    width: R.units.windowWidth(0.9),
    borderWidth: 1
  },
});

export default SimilarJobCard;
