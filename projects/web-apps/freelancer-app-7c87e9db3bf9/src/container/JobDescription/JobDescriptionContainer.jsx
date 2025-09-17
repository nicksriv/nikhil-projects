import React from "react";

import Tab from "@app/component/common/Tab";
import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Button from "@app/component/form/Button";
import ActivityIndicator from "@app/component/common/ActivityIndicator";
import Separator from "@app/component/common/Separator";
import Divider from "@app/component/common/Divider";
import Chip from "@app/component/common/Chip";

import JobDescriptionHeader from "@app/component/JobDescription/JobDescriptionHeader";
import JobDescriptionDetails from "@app/component/JobDescription/JobDescriptionDetails";
import JobDescriptionRequirements from "@app/component/JobDescription/JobDescriptionRequirements";
import JobApplyNote from "@app/component/JobDescription/JobApplyNote";
import SimilarJobCard from "@app/component/JobDescription/SimilarJobCard";
import OtherOpeningJobCard from "@app/component/JobDescription/OtherOpeningJobCard";

import { R } from "@app/res";
import { searchJobApis } from "@app/store/searchJob/searchJobApis";
import { navigationHelper } from "@app/helper/navigation";
import { ScreenConstants } from "@app/navigator/ScreenConstants";

const screenTabs = [
  { label: "Job Details", value: "JOB_DETAILS" },
  { label: "Requirements", value: "REQUIREMENTS" },
];
const screens = {
  JOB_DETAILS: "JOB_DETAILS",
  REQUIREMENTS: "REQUIREMENTS",
};

class JobDescriptionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: screens.JOB_DETAILS,
      modalVisible: false,
      userNote: "",
      jobID: "",
      isApplied: false,
      isLoading: false,
      getProps:false
    };
  }
  componentDidMount() {
    if (this.props.jobID) {
      this.setState({ jobID: this.props.jobID });
      this.props.getSearchJobDescriptionAction(this.props.jobID);
      this.props.getsimilarJobListAction(this.props.jobID);
      this.props.getOtherOpeningJobListAction(this.props.jobID);
    }
  }

  componentDidUpdate(){
      if(this.state.getProps){
        this.props.getSearchJobDescriptionAction(this.props.jobID);
        this.setState({getProps:false})
      }
  }

  handleTabChange = ({ value }) => {
    this.setState({ activeScreen: value });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  handleUserNote = (value) => {
    this.setState({ userNote: value });
  };

  handleOnPress = (id) => {
    navigationHelper.replace({
      name: ScreenConstants.JOB_DESCRIPTION,
      params: {
        id: id,
        screen: "searchJobs",
      },
    });
  };

  handleApplyJob = async (id) => {
    try {
      const { userNote } = this.state;
      const payload = {
        id,
        userNote,
      };
      this.setState({ isLoading: true });
      const res = await searchJobApis.applyJob(payload);
      if (res) {
        this.setState({ isApplied: true,getProps:true });
        this.props.getSearchJobListAction();
        this.props.getMyJobListAction();
      }
      this.setState({ modalVisible: false });
    } catch (error) {
      this.setState({ isLoading: false });
      this.setState({ modalVisible: false });
    }
  };

  render() {
    const {
      activeScreen,
      modalVisible,
      userNote,
      jobID,
      isLoading,
    } = this.state;
    const {
      searchJobDescription = {},
      similarJobList = [],
      otherOpeningJobList = [],
      isDescriptionLoading,
    } = this.props;
    const { client = {} } = searchJobDescription;
    
    if (isDescriptionLoading) {
      return (
        <View
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }

    return (
      <View flex={1}>
        <View
          style={{ flex: 1, backgroundColor: R.colors.white }}
          scrollable
          container
          stickyHeaderIndices={[2]}
        >
          <JobDescriptionHeader client={client} />

          <Divider />

          <Tab
            value={activeScreen}
            tabs={screenTabs}
            onChange={this.handleTabChange}
          />

          <Separator size={12} />

          <View flexDirection="row" alignItems="center">
            <Text color="secondary" font="semibold">
              #{searchJobDescription.jobRefNo}
            </Text>
            <View flex={1} />
            {searchJobDescription.jobType && (
              <Chip
                variant="outlined"
                customViewStyle={{
                  borderColor: R.colors.success.main,
                  paddingVertical: R.units.scale(1),
                  paddingHorizontal: R.units.scale(2),
                }}
                customLabelStyle={{
                  fontSize: R.units.scale(10),
                  color: R.colors.success.main,
                }}
                label={searchJobDescription.jobType}
              />
            )}
            {searchJobDescription.projectType && (
              <Chip
                variant="outlined"
                customViewStyle={{
                  borderColor: R.colors.primary.main,
                  paddingVertical: R.units.scale(1),
                  paddingHorizontal: R.units.scale(2),
                }}
                customLabelStyle={{
                  fontSize: R.units.scale(10),
                  color: R.colors.primary.main,
                }}
                label={searchJobDescription.projectType.replace("_", " ")}
              />
            )}
          </View>

          <Separator size={12} />

          {activeScreen === screens.REQUIREMENTS ? (
            <JobDescriptionRequirements jobDetails={searchJobDescription} />
          ) : (
            <JobDescriptionDetails jobDetails={searchJobDescription} />
          )}

          <Separator size={16} />
          <Divider />
          <Separator size={16} />

          {similarJobList.length ? (
            <>
              <SimilarJobCard
                data={similarJobList}
                onPress={this.handleOnPress}
              />
              <Separator size={16} />
            </>
          ) : null}

          {otherOpeningJobList.length ? (
            <>
              <OtherOpeningJobCard
                data={otherOpeningJobList}
                onPress={this.handleOnPress}
              />
              <Separator size={16} />
            </>
          ) : null}
        </View>

        <View flex={0} paddingVertical={8}>
          <Button
            disabled={searchJobDescription.jobApplicantStatus ? true : false}
            shape="round"
            text={searchJobDescription.jobApplicantStatus ? "Applied" : "Apply"}
            size="md"
            style={{ flexDirection: "row", justifyContent: "center" }}
            onPress={() => this.setModalVisible(true)}
          />
        </View>

        <JobApplyNote
          isLoading={isLoading}
          modalVisible={modalVisible}
          onChange={this.handleUserNote}
          userNote={userNote}
          onClose={() => this.setModalVisible(false)}
          jobID={jobID}
          handleJobAction={this.handleApplyJob}
          text={"Are you sure you want to apply on this job.?"}
          buttonText={"Apply"}
        />
      </View>
    );
  }
}

export default JobDescriptionContainer;
