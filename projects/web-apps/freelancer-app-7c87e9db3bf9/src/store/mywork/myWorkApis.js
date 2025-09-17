import myWorkConstants from "./myWorkConstants";
import { axios,dynamicModuleAxios } from "../../helper/axios";

const myWorkApis = {};

myWorkApis.myWorkList = async () => {
  const res = await axios.get(myWorkConstants.MY_WORK_API);
  return res;
};

myWorkApis.getMyWorkDescription = async (id) => {
  const res = await axios.get(myWorkConstants.MY_WORK_DESCRIPTION_API + id);
  return res;
  return {
    id: "63a40f2d6ab0ba557270a050",
    jobId: "6393316a0b98b81152d83c25",
    jobTitle: "Class-Package Diagram (OOAD)",
    jobStatus: "NEW",
    jobStatusRemark: "",
    jobUserRemark: null,
    jobApproverRemark: "",
    jobApproverRemarkAt: "2022-12-22T08:02:53.676Z",
    jobRating: 0.0,
    jobRatingDescription: "",
    totalHoursWorked: 0.0,
    totalEarned: 0.0,
    amountPaid: 0.0,
    amountStatus: "PENDING",
    payerRemark: "",
    jobDetails: {
      id: "6393316a0b98b81152d83c25",
      jobRefNo: "JT186604",
      client: {
        clientId: "XY0005",
        clientName: "xyz",
      },
      jobTitle: "Class-Package Diagram (OOAD)",
      jobShortDescription:
        "Create a Class-Package Diagram using the Use Case Diagram provided",
      jobApplicantStatus: null,
      skill: null,
      highlights: ["Class-Package Diagram"],
      deliverables: ["web", "api"],
      experienceLevel: "BEGINNER",
      jobType: "REMOTE",
      projectType: "ONE_TIME",
      address: {
        location: "PUNE",
        city: "PUNE CITY",
        state: "MAHRASHTRA",
        country: "India",
        pinCode: "411002",
      },
      jobTiming: {
        hourRequired: 48,
        hourRequiredPer: "DAY",
        durationOfWork: 4,
        durationOfWorkType: "DAY",
        jobDays: ["Sat", "Sun"],
        shiftStartTime: "09:00:00",
        shiftEndTime: null,
      },
      billing: {
        number: 0,
        type: "FIXED",
      },
    },
  };
};

myWorkApis.startWork = async (payload) => {
  let API_URL = myWorkConstants.START_WORK_API.replace("jobID", payload.id);
  const res = await axios.post(API_URL, payload);
  return res;
};

myWorkApis.submitWork = async (payload) => {
  let API_URL = myWorkConstants.SUBMIT_WORK_API.replace("jobID", payload.id);
  const res = await axios.post(API_URL, payload);
  return res;
};

myWorkApis.myWorkEarningStats = async (year) => {
  const res = await axios.get(myWorkConstants.MY_WORK_EARNING_STATS_API, { params: { year } });
  return res;
};

myWorkApis.myWorkStats = async (year) => {
  const res = await axios.get(myWorkConstants.MY_WORK_STATS_API, { params: { year } });
  return res;
};

myWorkApis.moduleData = async (clientId) => {
  const res = await dynamicModuleAxios.get(myWorkConstants.MY_MODULE_DATA_API.replace("clientId", clientId));
  return res;
};
export { myWorkApis };
