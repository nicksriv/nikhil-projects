import _get from "lodash.get";
import { Alert } from "react-native";
import { dateTimeHelper } from "../../helper/dateTime";

const profileParsers = {};

const handleAddress = (data) => {
  return {
    location: _get(data, "location", ""),
    city: _get(data, "city", ""),
    state: _get(data, "state", ""),
    country: _get(data, "country", ""),
    pinCode: _get(data, "pinCode", ""),
  };
};
const handleBankDetail = (data) => {
  return {
    bankName: _get(data, "bankName", ""),
    accountHolderName: _get(data, "accountHolderName", ""),
    accountNumber: _get(data, "accountNumber", ""),
    ifscCode: _get(data, "ifscCode", ""),
    branch: _get(data, "branch", ""),
  };
};
const skillsCategoryData = (data) => {
  if (data.length) {
    return data.map((item) => {
      let skillCategoryArray = {
        id: _get(item, "id", ""),
        name: _get(item, "name", ""),
        experience: _get(item, "experience", ""),
        skills: skills(_get(item, "skills", [])),
      };
      return skillCategoryArray;
    });
  }
  return [];
};

const skills = (data) => {
  if (data.length) {
    return data.map((item) => {
      let skillArray = {
        id: _get(item, "id", ""),
        name: _get(item, "name", ""),
        experience: _get(item, "experience", ""),
      };
      return skillArray;
    });
  }
  return [];
};

profileParsers.getProfileParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }

  const handleWorkDetails = (data) => {
    if (data.length) {
      return data.map((item) => {
        let workDetailArray = {
          company: _get(item, "company", ""),
          designation: _get(item, "designation", ""),
          workId: _get(item, "id", ""),
          workDescription: _get(item, "workDescription", ""),
          startDate: dateTimeHelper.format(_get(item, "startDate", "")),
          endDate: dateTimeHelper.format(_get(item, "endDate", "")),
        };
        return workDetailArray;
      });
    }
    return [];
  };

  const profileData = {
    id: _get(res, "id", ""),
    freelancerRefNo: _get(res, "freelancerRefNo", ""),
    skillCategory: skillsCategoryData(_get(res, "skillCategory", [])),
    basicDetails: {
      firstName: _get(res, "firstName", ""),
      middleName: _get(res, "middleName", ""),
      lastName: _get(res, "lastName", ""),
      mobile: _get(res, "mobile", ""),
      email: _get(res, "email", ""),
      address: handleAddress(_get(res, "address", {})),
    },
    kycDetail: {
      panNumber: _get(res, "panNumber", ""),
      adhaarNumber: _get(res, "adhaarNumber", ""),
    },
    workDetail: handleWorkDetails(_get(res, "workDetail", [])),
    bankDetail: handleBankDetail(_get(res, "bankDetail", {})),
    gpsLocation: _get(res, "gpsLocation", ""),
    profileCompletionPercentage: _get(res, "profileCompletionPercentage", 0),
    education: _get(res, "education", ""),
    experienceInYear: _get(res, "experienceInYear", ""),
    resumeUrl: _get(res, "resumeUrl", ""),

    freelancerRating: _get(res, "freelancerRating", ""),
    appVersion: _get(res, "appVersion", ""),
    profileImage: _get(res, "profileImage", ""),
  };
  return profileData;
};

profileParsers.getProfileDataFromAsync = res => {
  return {
    firstName: _get(res, 'firstName', ''),
    lastName: _get(res, 'lastName', ''),
    profileImage: _get(res, 'profileImage', ''),
    profileCompletionPercentage: _get(res, 'profileCompletionPercentage', 0),
  };
};


profileParsers.getVendorUserParser = res => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }

  const profileData = {
    id: _get(res, 'id', ''),
    freelancerRefNo: _get(res, 'vendorUserRefNo', ''),
    profileImage: _get(res, 'profileImage', ''),
    basicDetails: {
      firstName: _get(res, 'firstName', ''),
      lastName: _get(res, 'lastName', ''),
      address: handleAddress(_get(res, 'address', {})),
      email: handleAddress(_get(res, 'email', {})),
      
    },
    experienceInYear: _get(res, 'experienceInYear', ''),
    resumeUrl: _get(res, 'portfolioUrl', ''),
    appVersion: _get(res, 'appVersion', ''),
    companyIncorporatedAt: _get(res, 'companyIncorporatedAt', ''),
    profileCompletionPercentage: _get(res, 'profileCompletionPercentage', 0),
    freelancerRating: _get(res, 'vendorUserRating', ''),
  };
  return profileData;
};


export { profileParsers };
