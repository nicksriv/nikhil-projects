import React from "react";
import { StyleSheet } from "react-native";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import Image from "@app/component/common/Image";
import Chip from "@app/component/common/Chip";
import Separator from "@app/component/common/Separator";

import { R } from "@app/res";

const 
JobCard = (props) => {
  const {
    jobRefNo,
    jobType,
    jobTitle,
    projectType,
    jobShortDescription,
    billing = {},
    skills,
    jobTiming={},
  } = props.item;
  const { showSkills, customCardStyle, variant = "contained" } = props;

  const cardStyle = variant === "contained" ? styles.cardStyle : styles.cardStyleOutlined;

  return (
    <View touchable onPress={props.onPress} style={[cardStyle, customCardStyle]}>
      <View flexDirection="row" alignItems="center">
        <Text color="secondary" font="semibold">#{jobRefNo}</Text>
        <View flex={1} />
        {jobType && <Chip variant="outlined" customViewStyle={{ borderColor: R.colors.success.main, paddingVertical: R.units.scale(1), paddingHorizontal: R.units.scale(2) }} customLabelStyle={{ fontSize: R.units.scale(10), color: R.colors.success.main, }} label={jobType} />}
        {projectType && <Chip variant="outlined" customViewStyle={{ borderColor: R.colors.primary.main, paddingVertical: R.units.scale(1), paddingHorizontal: R.units.scale(2) }} customLabelStyle={{ fontSize: R.units.scale(10), color: R.colors.primary.main }} label={projectType.replace("_", " ")} />}
      </View>

      <Separator />

      <Text variant="body1" font="medium">{jobTitle}</Text>
      <Text numberOfLines={3}>{jobShortDescription}</Text>

      <Separator />

      <View flexDirection="row" flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <JobInfo icon={R.images.jobCard.calendar()} label={`${jobTiming.durationOfWork} ${jobTiming.durationOfWorkType}`} />
        <JobInfo icon={R.images.jobCard.time()} label={`${jobTiming.hourRequired} hrs/${jobTiming.hourRequiredPer}`} />
        {billing && <JobInfo icon={R.images.jobCard.money()} label={`$${billing.number}/${billing.type}`} />}
      </View>

      {showSkills ? (
        <>
          <Separator />

          <Text>Required skills:</Text>

          <Separator size={6} />
      
          <View scrollable horizontal>
            {skills.map((s, i) => (
              <SkillLabel key={`skill_label_${props.index}`} item={s} />
            ))}
          </View>

          <Separator />
        </>
      ) : null}

    </View>
  )
};

const SkillLabel = ({ item }) => {
  return <Chip variant="contained" label={item.name} customLabelStyle={{ textTransform: "capitalize",paddingVertical:R.units.scale(2) }} />;
};

const JobInfo = (props) => {
  return (
    <View width={R.units.windowWidth(0.33) - R.units.scale(24)} marginVertical={R.units.scale(2)} flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
      <Image source={props.icon} width={14} height={14} />
      <Separator vertical size={6} />
      <Text variant="caption" transform="capitalize">
        {props.label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(3),
    padding: R.units.scale(12),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.white,
    backgroundColor: R.colors.white,
    elevation: 2,
  },
  cardStyleOutlined: {
    borderRadius: R.units.scale(3),
    padding: R.units.scale(12),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.border,
    backgroundColor: R.colors.white,
  },
});

export default JobCard;
