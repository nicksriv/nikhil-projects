// import { BASE_API_URL } from 'react-native-dotenv';

const apiConfig = {
  // Development

  token: "61e6a03f7c19db373d15bea2",

  urls: {
    auth: {
      sideMenu: "api/v1/clients/621600d805e2800ee4f4bc46/modules",
      clientLogo: "api/v1/clients/619736d5bd7ff36606ba8e93/logo",
      screensData: "screenbuilder/api/v1/screens",

      screensByScreenId: "api/v1/submodules/619736d5bd7ff36606ba8e93/screens",
      sendFormData: "api/v1/modules/619736d5bd7ff36606ba8e93/forms",
    },
    list: "api/v1/modules/",
    // /columnsandfilters",
  },
};

export default apiConfig;
