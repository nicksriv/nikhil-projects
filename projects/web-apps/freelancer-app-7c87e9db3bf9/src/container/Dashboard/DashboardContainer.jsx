import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import _get from 'lodash.get';
import jwt_decode from 'jwt-decode';
import {LineChart} from 'react-native-gifted-charts';

import View from '@app/component/common/View';
import Text from "@app/component/common/Text";
import Separator from '@app/component/common/Separator';

import SectionHeader from '@app/component/SectionHeader';
import DashboardJobCard from '@app/component/Dashboard/DashboardJobCard';
import ActivityIndicator from '@app/component/common/ActivityIndicator';
import DashboardHeader from '@app/component/Dashboard/DashboardHeader';
import DashboardStats from '@app/component/Dashboard/DashboardStats';

import {R} from '@app/res';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import {asyncStorage} from '@app/store/asyncStorage';
import InformativeImage from '@app/component/common/InformativeImage';
import {profileParsers} from '@app/store/profile/profileParsers';

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlT2ZVc2VyIjoiVXNlciIsImZpcnN0TmFtZSI6IkNoYXJhbiIsImxhc3ROYW1lIjoiUiIsImNsaWVudFN5c3RlbUlkIjoiNjJlOGYyOTNhZDljMDUyZGQyZDExZDAyIiwiY2xpZW50SWQiOiJDTDAwMDMiLCJpZCI6IjYyZThmNjdlYWQ5YzA1MmRkMmQxMWQxMyIsInVzZXJSb2xlIjoiIiwidXNlcklkIjoiRzAwMyIsImlhdCI6MTY3MzQ0NTM0NX0.NbfOWYkeGwN_cwpqe6-QjUzrUl53u5hb9XWzyHlv4xcHG3vWlUOePRUWv-S-6Wwa-LVDXhjzxTsRUgGxBWsQfA';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      userData: {},
      userType: '',
      year: d.getFullYear(),
    };
  }

  async componentDidMount() {
    await this.decrypt();
    await this.getUserType();
    await this.mappingData();

    this.props.setAuthenticationAction();
    // this.getProfileData();
    this.props.getDashboardStatsActions();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.userType !== this.state.userType) {
      if (this.state.userType === 'freelancer') {
        this.props.getProfileAction();
        this.props.getMyWorkListAction();
        this.props.getMyJobListAction();
      } else {
        this.props.getVendorUserProfileAction();
        this.props.getMyWorkStatsAction(this.state.year);

      }
    }
  }
  getUserType = async () => {
    try {
      const userType = await asyncStorage.getUserType();
      this.setState({userType:userType});
    } catch (error) {
      console.log(error,'catch at dashboard container')
    }
  };
  decrypt = async () => {
    const authToken = await asyncStorage.getToken();
    var decoded = jwt_decode(authToken);
    await this.props.setAuthAction({decoded});
  };

  mappingData = async () => {
    const authToken = await asyncStorage.getToken();

    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const res = await fetch(
      'https://screenbuilder.uat.brandpulse.v5global.com/screenbuilder/api/v1/dynamic-mapping/SITE',
      {
        method: 'GET',
        headers: header,
      },
    );

    const result = await res.json();
    await this.props.setMappingData(result);
  };

  getProfileData = async () => {
    const userData = await asyncStorage.getProfileData();
    const parsedData = profileParsers.getProfileDataFromAsync(
      JSON.parse(userData),
    );
    this.setState({userData: parsedData});
  };
  handleProfileHeaderPress = () => {
    navigationHelper.navigate({
      name: ScreenConstants.PROFILE,
    });
  };

  handleRefresh = () => {
    setTimeout(() => {
      if (this.state.userType === 'vendor-user') {
        this.props.getDashboardStatsActions();
        this.props.getMyWorkStatsAction(this.state.year);
      } else {
        this.props.getDashboardStatsActions();
        this.props.getProfileAction();
        this.props.getMyWorkListAction();
        this.props.getMyJobListAction();
      }
    }, 500);
  };

  handleCardPress = ({id, cardType, jobId}) => {
    let screenName = '';
    let screen = '';
    if (cardType === 'WORK') {
      screenName = ScreenConstants.WORK_DETAIL;
      screen = 'myWork';
    }
    if (cardType === 'JOB') {
      screenName = ScreenConstants.MY_JOB_DESCRIPTION;
      screen = 'myJob';
    }

    navigationHelper.navigate({
      name: screenName,
      params: {
        id: id,
        screen,
        jobId,
      },
    });
  };

  handleViewAllPress = ({type}) => {
    let screenName = '';

    if (type === 'WORK') {
      screenName = 'My work';
    }

    if (type === 'JOB') {
      screenName = 'Applied jobs';
    }

    navigationHelper.navigate({
      name: screenName,
    });
  };

  filterJobsList = jobtype => {
    const {myWorkList} = this.props;
    // return myWorkList.filter(w => [jobtype].includes(w.jobStatus)).map(j => ({
    return myWorkList.map(j => ({
      id: j.id,
      jobRefNo: j.jobRefNo,
      jobId: j.jobId,
      title: j.jobTitle,
      status: j.jobStatus,
      createdAt: j.createdAt,
      updatedAt: j.updatedAt,
      createdAtLabel: 'Started on',
    }));
  };

  filterAppliedJobsList = () => {
    const {appliedJobList} = this.props;
    return _get(appliedJobList, 'appliedJobs', []).map(j => ({
      id: j.id,
      jobRefNo: j.jobRefNo,
      jobId: j.jobId,
      title: j.jobTitle,
      status: j.jobApplicationStatus,
      createdAt: j.createdAt,
      updatedAt: j.updatedAt,
      createdAtLabel: 'Applied on',
    }));
  };

  getAnualJobData() {
    const {myWorkStats} = this.props;

    let data = [
      {value: 0, label: 'Jan'},
      {value: 0, label: 'Feb'},
      {value: 0, label: 'Mar'},
      {value: 0, label: 'Apr'},
      {value: 0, label: 'May'},
      {value: 0, label: 'Jun'},
      {value: 0, label: 'Jul'},
      {value: 0, label: 'Aug'},
      {value: 0, label: 'Sep'},
      {value: 0, label: 'Oct'},
      {value: 0, label: 'Nov'},
      {value: 0, label: 'Dec'},
    ];

    if (myWorkStats) {
      myWorkStats.forEach(e => {
        if (e.month) {
          let m = e.month.split('-')[1] - 1;
          data[m].value = e.value;
        }
      });
    }

    return data;
  }

  render() {
    const {
      dashboardStats = {},
      isLoading,
      isInitialCalled,
      isWorkListLoading,
      isWorkListInitialCalled,
      isAppliedJobListLoading,
      isAppliedJobListInitialCalled,

      profileData,
    } = this.props;
    const {userType} = this.state;

    const inprogressJobsList = this.filterJobsList('INPROGRESS');
    const appliedJobsList = this.filterAppliedJobsList();

    if (
      userType === 'freelancer' &&
      (!isInitialCalled ||
        !isWorkListInitialCalled ||
        !isAppliedJobListInitialCalled ||
        isLoading ||
        isWorkListLoading ||
        isAppliedJobListLoading)
    ) {
      return (
        <View height="100%" justifyContent="center" alignItems="center">
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }

    if (userType !== 'freelancer' && (!isInitialCalled || isLoading)) {
      return (
        <View height="100%" justifyContent="center" alignItems="center">
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }
    return (
      <View
        scrollable
        container
        refreshControl={<RefreshControl onRefresh={this.handleRefresh} />}>
        <Separator size={12} />
        <DashboardHeader
          userType={userType}
          profileData={profileData}
          onProfileHeaderPress={
            userType === 'vendor-user' ? null : this.handleProfileHeaderPress
          }
        />

        <Separator size={12} />
        <DashboardStats
          onPress={this.handleOnPress}
          dashboardStats={dashboardStats}
          userType={userType}
        />

        <Separator size={24} />
        {userType === 'vendor-user' ? (
          <View
            scrollable
            style={{
              backgroundColor: R.colors.white,
              borderRadius: R.units.scale(3),
              elevation: 2,
              paddingVertical: R.units.scale(12),
              paddingHorizontal: R.units.scale(8),
              marginTop: R.units.scale(-20)
            }}
            >
            <Text variant="body2" font="semibold">
              Annual Job
            </Text>
            <Separator size={5} />
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: R.units.scale(10),
                flex: 1,
                justifyContent: 'center',
                alignItem: 'center',
              }}>
              <LineChart
                color={R.colors.primary.main}
                width={320}
                pressEnabled
                showDataPointOnPress
                showTextOnPress
                showVerticalLine
                thickness={4}
                data={this.getAnualJobData()}
              />
            </View>
          </View>
        ) : (
          <>
            <SectionHeader
              title="Applied Job(s)"
              onPress={() => this.handleViewAllPress({type: 'JOB'})}
            />
            {appliedJobsList.length ? (
              <>
                <Separator />
                <FlatList
                  horizontal
                  data={appliedJobsList.slice(0, 3)}
                  renderItem={data => (
                    <DashboardJobCard
                      cardStyle={{maxWidth: R.units.windowWidth(0.8)}}
                      onPress={() =>
                        this.handleCardPress({
                          id: data.item.id,
                          cardType: 'JOB',
                          jobId: data.item.jobId,
                        })
                      }
                      {...data.item}
                    />
                  )}
                  keyExtractor={(item, index) => `applied_job_card_${index}`}
                  ItemSeparatorComponent={<Separator vertical />}
                />
              </>
            ) : (
              <InformativeImage text="No applied jobs" />
            )}

            <Separator size={24} />

            <SectionHeader
              title="Recent Work(s)"
              onPress={() => this.handleViewAllPress({type: 'WORK'})}
            />
            {inprogressJobsList.length ? (
              <>
                <Separator />
                <FlatList
                  horizontal
                  data={inprogressJobsList.slice(0, 3)}
                  renderItem={data => (
                    <DashboardJobCard
                      cardStyle={{maxWidth: R.units.windowWidth(0.8)}}
                      onPress={() =>
                        this.handleCardPress({
                          id: data.item.id,
                          cardType: 'WORK',
                        })
                      }
                      {...data.item}
                    />
                  )}
                  keyExtractor={(item, index) => `inprogress_job_card_${index}`}
                  ItemSeparatorComponent={<Separator vertical />}
                  ListEmptyComponent={
                    <InformativeImage text="No in-progress jobs" />
                  }
                />
              </>
            ) : (
              <InformativeImage text="No in-progress jobs" />
            )}

            <Separator size={24} />
          </>
        )}
      </View>
    );
  }
}

export default DashboardContainer;
