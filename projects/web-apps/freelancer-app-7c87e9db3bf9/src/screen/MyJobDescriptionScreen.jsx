import React from "react";
import MyJobDescriptionContainer from "../container/MyJobDescription";

const MyJobDescriptionScreen = ({ route }) => {
  return (
    <>
      <MyJobDescriptionContainer
        jobID={route.params?.id}
        jobId={route.params?.jobId}
        screenName={route.params?.screen}
      />
    </>
  );
};

export default MyJobDescriptionScreen;
