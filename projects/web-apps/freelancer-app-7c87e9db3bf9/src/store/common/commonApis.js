import { axios } from "../../helper/axios";
import { commonConstants } from "./commonConstants";

const commonApis = {};

commonApis.getBlogs = () => {
  return axios.get(commonConstants.BLOGS_API);
};

commonApis.getNotificationsApi = () => axios.get(commonConstants.NOTIFICATION_API);

commonApis.getFaqApi = async () => {
  const res = await axios.get(commonConstants.FAQ_API);
  return res;
  return {
    content: [
      {
        id: 0,
        faqcategoryName: "General Questions",
        faqs: [
          {
            id: 0,
            faqTitle: "How can i download your app?",
            faqDescription:
              "Open Google Play. On your phone, use the Play Store app, Find an app you want, To check that the app is reliable, find out what other people say about it, When you pick an app, tap Install (for no-charge apps) or the app )",
          },
          {
            id: 1,
            faqTitle: "How do I change or reset my password",
            faqDescription:
              "When you pick an app, tap Install (for no-charge apps) or the app )",
          },
        ],
      },
      {
        id: 1,
        faqcategoryName: "Job  Questions",
        faqs: [
          {
            id: 0,
            faqTitle: "How do I contact sales?",
            faqDescription:
              "Open Google Play. On your phone, use the Play Store app, Find an app you want, To check that the app is reliable, find out what other people say about it, When you pick an app, tap Install (for no-charge apps) or the app )",
          },
        ],
      },
      {
        id: 2,
        faqcategoryName: "Earning Questions",
        faqs: [
          {
            id: 0,
            faqTitle: "How do I contact sales?",
            faqDescription:
              "Open Google Play. On your phone, use the Play Store app, Find an app you want, To check that the app is reliable, find out what other people say about it, When you pick an app, tap Install (for no-charge apps) or the app )",
          },
        ],
      },
    ],
  };
};

export { commonApis };
