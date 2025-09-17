import myJobConstants from "./myJobConstants";
import { axios } from "../../helper/axios";

const myJobApis = {};

myJobApis.myJobList = async () => {
  const res = await axios.get(myJobConstants.MY_JOB_API);
  return res;

  return {
    content: [
      {
        id: "6399a7c718d5c117fd3b2132",
        jobId: "6397544c5579d4447fde17de",
        jobTitle: "Develop a Cpp game ",
        userNote: "",
        jobApplicationStatus: "NEW",
        jobApplicationAt: "2022-12-14T10:39:03.185Z",
        jobAplicationStatusReason: null,
        createdAt: "2022-12-14T10:39:03.185Z",
      },
      {
        id: "6399a63918d5c117fd3b212b",
        jobId: "639754ec5579d4447fde17df",
        jobTitle: "Build me an API that can generate ludo king room code ",
        userNote: "",
        jobApplicationStatus: "NEW",
        jobApplicationAt: "2022-12-14T10:32:25.137Z",
        jobAplicationStatusReason: null,
        createdAt: "2022-12-14T10:32:25.138Z",
      },
    ],
    pageable: {
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 20,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 2,
    size: 20,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    first: true,
    numberOfElements: 2,
    empty: false,
  };
};

myJobApis.getMyJobDescription = async (id) => {
  const res = await axios.get(myJobConstants.MY_JOB_DESCRIPTION_API + "/" + id);
  return res;
  // return {
  //   jobApplicant: {
  //     id: "6399a7c718d5c117fd3b2132",
  //     jobId: "6397544c5579d4447fde17de",
  //     jobTitle: "Develop a Cpp game ",
  //     userNote: "",
  //     jobApplicationStatus: "NEW",
  //     jobApplicationAt: "2022-12-14T10:39:03.185Z",
  //     jobAplicationStatusReason: null,
  //     createdAt: "2022-12-14T10:39:03.185Z",
  //   },
  //   jobDetail: {
  //     id: "6397544c5579d4447fde17de",
  //     jobRefNo: "JT127781",
  //     client: {
  //       clientId: "XY0005",
  //       clientName: "xyz",
  //     },
  //     jobTitle: "Develop a Cpp game ",
  //     jobShortDescription:
  //       "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //     jobApplicantStatus: "NEW",
  //     skill: [
  //       {
  //         id: "6397494e5579d4447fde17ce",
  //         name: "Creative ",
  //         experience: null,
  //       },
  //       {
  //         id: "639749895579d4447fde17cf",
  //         name: "Decision making skills",
  //         experience: null,
  //       },
  //     ],
  //     highlights: ["Improve Skill", "Improve Communication Skill"],
  //     deliverables: ["web", "API"],
  //     experienceLevel: "BEGINNER",
  //     jobType: "ONSITE",
  //     projectType: "ONGOING",
  //     address: {
  //       location: "MUMBAI",
  //       city: "MUMBAI",
  //       state: "MAHRASHTRA",
  //       country: "India",
  //       pinCode: "411008",
  //     },
  //     jobTiming: {
  //       hourRequired: 54,
  //       hourRequiredPer: "DAY",
  //       durationOfWork: 4,
  //       durationOfWorkType: "DAY",
  //       jobDays: ["Mon", "tue"],
  //       shiftStartTime: "09:00:00",
  //       shiftEndTime: null,
  //     },
  //     billing: null,
  //   },
  // };
};

myJobApis.unApplyJob = async (payload) => {
  let API_URL = myJobConstants.UN_APPLY_JOB_API.replace("jobID", payload.id);
  API_URL = API_URL.replace("UserNote", payload.userNote);
  const res = await axios.post(API_URL, null, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

export { myJobApis };
