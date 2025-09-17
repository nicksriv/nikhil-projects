import React from 'react';
import View from '../../component/common/View';
import ActivityIndicator from '../../component/common/ActivityIndicator';
import {R} from '../../res';
import {profileApis} from '../../store/profile/profileApis';
import {Platform} from 'react-native';
import config from '../../config';

import ProfileHeader from '@app/component/Profile/ProfileHeader';
import ProfileDescription from '@app/component/Profile/ProfileDescription';
import ProfileKyc from '@app/component/Profile/ProfileKyc';
import ProfileBankAccountDetails from '@app/component/Profile/ProfileBankAccountDetails';
import ProfileSkills from '@app/component/Profile/ProfileSkills';
import ProfileResume from '@app/component/Profile/ProfileResume';
import EditProfileExperience from '@app/component/EditProfile/EditProfileExperience';

class ProfileContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      personalInformation: {},
      kycDetail: {},
      bankDetail: {},
      skillCategory: [],
      experienceInYear: 0.0,
      resumeName: '',
      isDeleteModalModalOpen: false,
    };
  }
  componentDidMount() {
    this.props.getProfileAction();
    this.props.getSkillsListAction();
  }

  handleImageUpload = async result => {
    if (!uri || !type || !name) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append(
        'resume',
        result,
        Platform.OS === 'android'
          ? result.uri
          : result.uri.replace('file://', ''),
      );
      const res = await profileApis.updateProfileImage(formData);
      if (res) {
        this.props.setToastAction({message: res.message});
        this.props.getProfileAction();
      }
    } catch (error) {
      console.error(error, 'image upload catch');
    }
  };

  handleResumeUpload = async result => {
    try {
      const formData = new FormData();
      formData.append(
        'resume',
        result,
        Platform.OS === 'android'
          ? result.uri
          : result.uri.replace('file://', ''),
      );
      const res = await profileApis.updateResume(formData);
      if (res) {
        this.setState({resumeName: result.name});
        this.props.setToastAction({message: res.message});
        this.props.getProfileAction();
      }
    } catch (error) {
      console.error(error, 'resume upload catch');
    }
  };

  toggleDeleteWorkExperienceModal = value => {
    const {isDeleteModalModalOpen} = this.state;
    this.setState({isDeleteModalModalOpen: value});
  };
  deleteWorkExperience = async id => {
    try {
      const res = await profileApis.deleteWorkExperience(id);
      if (res) {
        this.props.getProfileAction();
        this.props.setToastAction({message: res.message});
        this.setState({isDeleteModalModalOpen: false});
        navigationHelper.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {resumeName} = this.state;
    const {profileData, isLoading} = this.props;

    let {
      bankDetail = {},
      basicDetails = {},
      kycDetail = {},
      freelancerRating = '',
      profileImage = '',
      resumeUrl = '',
      workDetail = [],
      skillCategory = [],
    } = profileData;

    if (profileImage) {
      profileImage = config.imageBaseURL + profileImage;
    }

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
      <View scrollable>
        <>
          <ProfileHeader
            profileImage={profileImage}
            freelancerRating={freelancerRating}
            getProfileImage={this.handleImageUpload}
          />
          <ProfileDescription basicDetails={basicDetails} />
          <ProfileKyc kycDetail={kycDetail} />
          <ProfileBankAccountDetails bankDetail={bankDetail} />
          <ProfileSkills skillCategory={skillCategory} />
          <EditProfileExperience
            componentData={workDetail}
            deleteWorkExperience={this.deleteWorkExperience}
            toggleDeleteModal={this.toggleDeleteWorkExperienceModal}
            isModalVisible={this.state.isDeleteModalModalOpen}
          />
          <ProfileResume
            resumeName={resumeName}
            handleResumeUpload={this.handleResumeUpload}
            resumeUrl={resumeUrl}
          />
        </>
      </View>
    );
  }
}

export default ProfileContainer;
