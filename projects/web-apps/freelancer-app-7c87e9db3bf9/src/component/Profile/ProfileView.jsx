import React, {useState} from 'react';
import ProfileHeader from '@app/component/Profile/ProfileHeader';
import ProfileDescription from '@app/component/Profile/ProfileDescription';
import ProfileKyc from '@app/component/Profile/ProfileKyc';
import ProfileBankAccountDetails from '@app/component/Profile/ProfileBankAccountDetails';
import ProfileSkills from '@app/component/Profile/ProfileSkills';
import ProfileResume from '@app/component/Profile/ProfileResume';
import ProfileWorkExperience from '@app/component/Profile/ProfileWorkExperience';

const ProfileView = props => {
  const {
    resumeName,
    basicDetails,
    kycDetail,
    bankDetail,
    skillCategory,
    workDetail,
    resumeUrl,
  } = props;

  return (
    <>
      <ProfileHeader data={props} />
      <ProfileDescription basicDetails={basicDetails} />
      <ProfileKyc kycDetail={kycDetail} />
      <ProfileBankAccountDetails bankDetail={bankDetail} />
      <ProfileSkills skillCategory={skillCategory} />
      <ProfileWorkExperience workDetail={workDetail} />
      <ProfileResume
        resumeName={resumeName}
        handleResumeUpload={props.handleResumeUpload}
        resumeUrl={resumeUrl}
      />
    </>
  );
};

export default ProfileView;
