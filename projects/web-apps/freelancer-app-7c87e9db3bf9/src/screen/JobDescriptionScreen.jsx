import React from "react";
import JobDescriptionContainer from "../container/JobDescription";

const JobDescriptionScreen = ({ route }) => {
  return (
    <JobDescriptionContainer
      jobID={route.params?.id}
      screenName={route.params?.screen}
    />
  );
};

export default JobDescriptionScreen;
