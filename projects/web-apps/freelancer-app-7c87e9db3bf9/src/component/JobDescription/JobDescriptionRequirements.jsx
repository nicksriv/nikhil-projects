import React from "react";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Separator from "@app/component/common/Separator";
import VectorIcon from "@app/component/common/VectorIcon";

import { R } from "@app/res";

const jobSummaryFields = [{
  label: "Experience Level",
  render: (jobDetails) => jobDetails.experienceLevel
}, {
  label: "Work Duration",
  render: (jobDetails) => `${jobDetails.jobTiming.durationOfWork} ${jobDetails.jobTiming.durationOfWorkType}`
}, {
  label: "Work Hours",
  render: (jobDetails) => `${jobDetails.jobTiming.hourRequired}hrs/${jobDetails.jobTiming.hourRequiredPer}`
}, {
  label: "Work Days",
  render: (jobDetails) => jobDetails.jobTiming.jobDays.join(", ")
}, {
  label: "Shift Start Time",
  render: (jobDetails) => jobDetails.jobTiming.shiftStartTime,
}, {
  label: "Shift End Time",
  render: (jobDetails) => jobDetails.jobTiming.shiftEndTime,
}, {
  label: "Billing",
  render: (jobDetails) => `$${jobDetails.billing.number}/${jobDetails.billing.type}`,
}]

const JobDescriptionRequirements = (props) => {
  return (
    <>
      <View flexDirection="row" flexWrap="wrap">
        {jobSummaryFields.map((jf, idx) => <SummaryCard key={`summary_${idx}`} label={jf.label} value={jf.render(props.jobDetails)} />)}
      </View>

      <View>
        <Text font="semibold">Deliverables:</Text>
        <Separator size={4} />
        <View>
          {props.jobDetails.deliverables.map((d, index) => {
            return (
              <View key={`deliverables_${index}`} flexDirection="row" alignItems="center">
                <VectorIcon name="checkmark-circle-outline" color={R.colors.primary.main} size={16} />
                <Separator vertical size={4} />
                <Text>{d}</Text>
                <Separator vertical />
              </View>
            )
          })}
        </View>
      </View>
    </>
  );
};

const SummaryCard = (props) => (
  <View minWidth={R.units.windowWidth(0.5) - R.units.scale(24)} paddingBottom={R.units.scale(10)} paddingRight={R.units.scale(4)}>
    <Text font="medium">{props.label}</Text>
    <Text>{props.value}</Text>
  </View>
)

export default JobDescriptionRequirements;
