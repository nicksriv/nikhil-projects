import React from "react";
import Tab from "../../component/common/Tab";
import JobDescriptionHeader from "../../component/JobDescription/JobDescriptionHeader";
import JobDescriptionDetails from "../../component/JobDescription/JobDescriptionDetails";
import JobDescriptionRequirements from "../../component/JobDescription/JobDescriptionRequirements";
import View from "../../component/common/View";
import Button from "../../component/form/Button";
import { R } from "../../res";
import JobApplyNote from "../../component/JobDescription/JobApplyNote";
import Text from "../../component/common/Text";
import SimilarJobCard from "../../component/JobDescription/SimilarJobCard";
import OtherOpeningJobCard from "../../component/JobDescription/OtherOpeningJobCard";
import { navigationHelper } from "../../helper/navigation";
import { ScreenConstants } from "../../navigator/ScreenConstants";
import { myJobApis } from "../../store/myJob/myJobApi";
import ActivityIndicator from "../../component/common/ActivityIndicator";
import Divider from "@app/component/common/Divider";
import Separator from "@app/component/common/Separator";
import Chip from "@app/component/common/Chip";

const screenTabs = [
  { label: "Job Details", value: "JOB_DETAILS" },
  { label: "Requirements", value: "REQUIREMENTS" },
];
const screens = {
  JOB_DETAILS: "JOB_DETAILS",
  REQUIREMENTS: "REQUIREMENTS",
};

class MyJobDescriptionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: screens.JOB_DETAILS,
      modalVisible: false,
      userNote: "",
      jobID: "",
      isUnApplied: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const {
      jobID,
      jobId,
      getsimilarJobListAction,
      getOtherOpeningJobListAction,
      getMyJobDescriptionAction,
    } = this.props;

    if (jobID) {
      this.setState({ jobID: jobID });
      getMyJobDescriptionAction(jobID);
    }
    getOtherOpeningJobListAction(jobId);
    getsimilarJobListAction(jobId);
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

  handleUnApplyJob = async (id) => {
    try {
      const { userNote } = this.state;
      const payload = {
        id,
        userNote,
      };
      this.setState({ isLoading: true });
      const res = await myJobApis.unApplyJob(payload);
      if (res) {
        this.setState({ isUnApplied: true });
        this.props.myJobListAction();
      }
      this.setState({ modalVisible: false });
    } catch (error) {
      this.setState({ isLoading: false });
      this.setState({ modalVisible: false });
    }
    this.setState({ modalVisible: false });
  };
  render() {
    const {
      activeScreen,
      modalVisible,
      userNote,
      isUnApplied,
      isLoading,
    } = this.state;
    const {
      similarJobList = [],
      otherOpeningJobList = [],
      myJobDescription,
      isDescriptionLoading,
    } = this.props;
    const { jobApplicant = {}, client = {} } = myJobDescription;
    console.log(myJobDescription);
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
              #{myJobDescription.jobRefNo}
            </Text>
            <View flex={1} />
            {myJobDescription.jobType && (
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
                label={myJobDescription.jobType}
              />
            )}
            {myJobDescription.projectType && (
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
                label={myJobDescription.projectType.replace("_", " ")}
              />
            )}
          </View>
          <Separator size={12} />

          {activeScreen === screens.REQUIREMENTS ? (
            <JobDescriptionRequirements jobDetails={myJobDescription} />
          ) : (
            <JobDescriptionDetails jobDetails={myJobDescription} />
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

        {modalVisible ? null : (
          <View flex={0} paddingVertical={8}>
            {jobApplicant.jobApplicationStatus === "NEW" ? (
              <>
                <Button
                  disabled={isUnApplied ? true : false}
                  shape="round"
                  text={isUnApplied ? "Unapplied" : "Unapply"}
                  size="md"
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  onPress={() => this.setModalVisible(true)}
                />
              </>
            ) : null}
          </View>
        )}
        <JobApplyNote
          isLoading={isLoading}
          modalVisible={modalVisible}
          onChange={this.handleUserNote}
          userNote={userNote}
          onClose={() => this.setModalVisible(false)}
          jobID={jobApplicant.jobId}
          handleJobAction={this.handleUnApplyJob}
          text={"Are you sure you want to Unapply on this job.?"}
          buttonText={"Unapply"}
        />
      </View>
    );
  }
}

export default MyJobDescriptionContainer;
