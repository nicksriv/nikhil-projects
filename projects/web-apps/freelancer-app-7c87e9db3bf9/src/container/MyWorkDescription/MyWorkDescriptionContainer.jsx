import React from 'react';
import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';
import View from '../../component/common/View';
import {R} from '../../res';
import MyWorkDetail from '../../component/WorkDetail/MyWorkDetail';
import ActivityIndicator from '../../component/common/ActivityIndicator';
import {myWorkApis} from '../../store/mywork/myWorkApis';
import Button from '../../component/form/Button';
import JobApplyNote from '../../component/JobDescription/JobApplyNote';
import _get from 'lodash.get';
import { asyncStorage } from '@app/store/asyncStorage';
class MyWorkDescriptionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      jobUserRemark: '',
      id: '',
      isStarted: false,
      isSubmitted: false,
      isActionLoading: false,
      modulesData: [''],
      userType: '',
    };
  }

  componentDidMount() {
    const {id} = this.props.route.params;
    if (id) {
      this.setState({id: id});
      this.props.setActiveJobId(id);
      this.props.getMyWorkDescriptionAction(id);
    }
    this.getUserType()
  }

  componentDidUpdate() {
    const {myWorkDescription, moduleData} = this.props;

    if (myWorkDescription?.jobDetails?.client?.id && !moduleData.length) {
      this.props.getModuleData(myWorkDescription.jobDetails.client.id);
    }
  }

  getUserType = async () => {
    try {
      const userType = await asyncStorage.getUserType();
      this.setState({userType: userType});
    } catch (error) {
      console.log(error, 'catch at dashboard container');
    }
  };
  handleUserNote = value => {
    this.setState({jobUserRemark: value});
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  handleStartWork = async id => {
    try {
      const {jobUserRemark} = this.state;
      const payload = {
        id,
        jobUserRemark,
      };
      this.setState({isActionLoading: true});
      const res = await myWorkApis.startWork(payload);
      if (res) {
        this.props.getMyWorkListAction();
      }
      this.setState({modalVisible: false});
      this.setState({isStarted: true});
    } catch (error) {
      this.setState({isActionLoading: false});

      console.log(error, 'start errorrr');
    }
  };

  handleSubmitWork = async id => {
    try {
      const {jobUserRemark} = this.state;
      const payload = {
        id,
        jobUserRemark,
      };
      this.setState({isActionLoading: true});
      const res = await myWorkApis.submitWork(payload);
      if (res) {
        this.props.getMyWorkListAction();
      }
      this.setState({modalVisible: false});
      this.setState({isSubmitted: true});
    } catch (error) {
      console.log(error, ' submit errorrr');
    }
  };

  handleButtonText = () => {
    const {myWorkDescription} = this.props;
    const {jobStatus} = myWorkDescription;
    const {isStarted, isSubmitted} = this.state;

    let buttonText = '';

    if (jobStatus === 'NEW') {
      buttonText = 'Start work';
    }
    if (jobStatus === 'INPROGRESS') {
      buttonText = 'Submit work';
    }
    if (isStarted) {
      buttonText = 'Work started';
    }
    if (isSubmitted) {
      buttonText = 'Work submitted';
    }

    return buttonText;
  };

  handleOnPress = value => {
    navigationHelper.navigate({
      name: ScreenConstants.SUB_MODULE_LIST,
      params: {
        value: value.value.subModules,
        myModule: value.value,
        // jobId:this.state.id
      },
    });
  };

  render() {
    const {myWorkDescription, isLoading, moduleData = []} = this.props;
    const assignedModuleList = moduleData.filter(d => {
      if (myWorkDescription?.jobDetails?.modules !== null) {
        return _get(myWorkDescription.jobDetails, 'modules', []).includes(d.id);
      }
    });

    const {jobDetails = {}, jobStatus} = myWorkDescription;
    const {
      modalVisible,
      jobUserRemark,
      id,
      isStarted,
      isSubmitted,
      isActionLoading,
      userType,
    } = this.state;
    if (isLoading) {
      return (
        <View
          justifyContent="center"
          alignItems="center"
          style={{height: '100%'}}>
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }
    return (
      <>
        <View scrollable style={{flex: 1}}>
          <View>
            <MyWorkDetail
              jobDetails={jobDetails}
              myWorkDescription={myWorkDescription}
              handleStartWork={this.handleStartWork}
              modulesData={assignedModuleList}
              handlePress={this.handleOnPress}
              userType={userType}
            />
          </View>
          <JobApplyNote
            isLoading={isActionLoading}
            modalVisible={modalVisible}
            onChange={this.handleUserNote}
            userNote={jobUserRemark}
            onClose={() => this.setModalVisible(false)}
            jobID={id}
            handleJobAction={
              jobStatus === 'NEW' ? this.handleStartWork : this.handleSubmitWork
            }
            text={
              jobStatus === 'NEW'
                ? 'Are you sure you want start this work ?'
                : 'Are you sure you want submit this work?'
            }
            buttonText={jobStatus === 'NEW' ? 'Start work' : 'Submit work'}
          />
        </View>

        <>
          {jobStatus === 'INREVIEW' ||
          modalVisible ||
          jobStatus === 'CLOSED' ||
          jobStatus === 'CANCEL' ? null : (
            <View flex={0} paddingVertical={8}>
              <Button
                shape="round"
                // text={jobStatus === "NEW" ? "Start Work" : "Submit Work"}
                text={this.handleButtonText()}
                size="md"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                onPress={() => this.setModalVisible(true)}
                disabled={isSubmitted || isStarted ? true : false}
              />
            </View>
          )}
        </>
      </>
    );
  }
}


export default MyWorkDescriptionContainer;
