import React from "react";
import View from "../../component/common/View";
import JobCard from "../../component/JobCard/JobCard";
import Tab from "../../component/common/Tab";
import { FlatList, RefreshControl } from "react-native";
import { ScreenConstants } from "../../navigator/ScreenConstants";
import { navigationHelper } from "../../helper/navigation";
import { R } from "../../res";
import ActivityIndicator from "../../component/common/ActivityIndicator";
import DashboardJobCard from "@app/component/Dashboard/DashboardJobCard";
import Separator from "@app/component/common/Separator";
import InformativeImage from "@app/component/common/InformativeImage";

const tabs = [
  { label: "Applied", value: "APPLIED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Approved", value: "ACCEPTED" },
];

const AppliedJobCard = (props) => {
  const handleOnPress = (id) => {
    navigationHelper.navigate({
      name: ScreenConstants.MY_JOB_DESCRIPTION,
      params: {
        id: id,
        screen: "myJobDescription",
      },
    });
  };
  return <JobCard onPress={handleOnPress} {...props} />;
};

class MyJobContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      activeTab: "APPLIED",
      refreshing: false,
    };
  }
  componentDidMount() {
    this.props.myJobListAction();
  }
  handleTabChange = ({ value }) => {
    this.setState({ activeTab: value });
  };

  handleOnPress = (id) => {
    const { myJobList = [] } = this.props;
    let activeTabData = "";
    if (this.state.activeTab === "APPLIED") {
      activeTabData = "appliedJobs";
    }
    if (this.state.activeTab === "REJECTED") {
      activeTabData = "rejectedJobs";
    }
    if (this.state.activeTab === "ACCEPTED") {
      activeTabData = "acceptedJobs";
    }
    const jobIdObject = myJobList[activeTabData].filter((fd) => fd.id === id);
    navigationHelper.navigate({
      name: ScreenConstants.MY_JOB_DESCRIPTION,
      params: {
        id: id,
        jobId: jobIdObject[0].jobId,
        screen: "myJob",
      },
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.myJobListAction();
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 500);
  };

  render() {
    const { myJobList = {}, isLoading = 0 } = this.props;
    let activeTabData = [];
    if (this.state.activeTab === "APPLIED") {
      activeTabData = myJobList.appliedJobs;
    }
    if (this.state.activeTab === "REJECTED") {
      activeTabData = myJobList.rejectedJobs;
    }
    if (this.state.activeTab === "ACCEPTED") {
      activeTabData = myJobList.acceptedJobs;
    }
    const activeTabLabel = tabs.find((t) => t.value === this.state.activeTab)[
      "label"
    ];
    if (isLoading) {
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
      <View container style={{ flex: 1, backgroundColor: R.colors.white }}>
        <Tab
          value={this.state.activeTab}
          tabs={tabs}
          onChange={this.handleTabChange}
        />

        <FlatList
          data={activeTabData}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderItem={(data) => (
            <DashboardJobCard
              variant="outlined"
              jobRefNo={data.item.jobRefNo}
              title={data.item.jobTitle}
              status={data.item.jobApplicationStatus}
              createdAt={data.item.createdAt}
              createdAtLabel={"Applied on"}
              onPress={() => this.handleOnPress(data.item.id)}
            />
          )}
          ItemSeparatorComponent={<Separator size={12} />}
          ListHeaderComponent={<Separator size={12} />}
          ListFooterComponent={<Separator size={12} />}
          ListEmptyComponent={
            <InformativeImage text={`No ${activeTabLabel} job found`} />
          }
        />
      </View>
    );
  }
}

export default MyJobContainer;
