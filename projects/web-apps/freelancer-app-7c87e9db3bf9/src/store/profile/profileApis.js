import {axios} from '../../helper/axios';
import {profileConstants} from './profileConstants';

const profileApis = {};

profileApis.getProfileApi = async () => {
  const res = await axios.get(profileConstants.PROFILE_API);
  return res;
};

profileApis.updateBasicDetails = async payload => {
  const res = await axios.put(
    profileConstants.UPDATE_BASIC_DETAILS_API,
    payload,
  );
  return res;
};

profileApis.deleteWorkExperience = async id => {
  const res = await axios.delete(
    profileConstants.UPDATE_WORK_DETAILS_API + '/' + id,
  );
  return res;
};
profileApis.updateKycDetails = async payload => {
  const res = await axios.put(profileConstants.UPDATE_KYC_API, payload);
  return res;
};

profileApis.updateBankDetails = async payload => {
  const res = await axios.put(profileConstants.UPDATE_BANK_API, payload);
  return res;
};

profileApis.updateProfileImage = async payload => {
  const res = await axios.put(profileConstants.UPDATE_IMAGE_API, payload, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res;
};
profileApis.updateResume = async payload => {
  const res = await axios.put(profileConstants.UPDATE_RESUME_API, payload, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res;
};

profileApis.updateWorkDetail = async payload => {
  const res = await axios.put(
    profileConstants.UPDATE_WORK_DETAILS_API + '/' + payload?.id,
    payload,
  );
  return res;
};

profileApis.addWorkDetail = async payload => {
  const res = await axios.post(
    profileConstants.UPDATE_WORK_DETAILS_API,
    payload,
  );
  return res;
};

profileApis.updateProfileSkill = async payload => {
  const res = await axios.put(profileConstants.UPDATE_SKILLS_API, payload);
  return res;
};

profileApis.getVendorUserProfileApi = async () => {
  const res = await axios.get(profileConstants.VENDOR_USER_PROFILE_API);
  return res;
};
export {profileApis};
