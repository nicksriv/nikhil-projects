import { axios } from "../../helper/axios";
import { searchJobConstants } from "./searchJobConstants";

const searchJobApis = {};

// searchJobApis.getSearchJob = async ({ filterData = {}, page = 0 }) => {
//   console.log(filterData, "at piiiiiiiiiiiiii");
//   const searchParams = { page };
//   if (filterData) {
//     // Object.keys(filterData).forEach((fd) => {
//     //   searchParams[fd] = filterData[fd].join(",");
//     // });

//     Object.keys(filterData).forEach((fd) => {
//       if (typeof searchParams[fd] === "string") {
//         searchParams[fd] = filterData[fd];
//       } else {
//         searchParams[fd] = filterData[fd].join(",");
//       }
//     });
//   }

//   const res = await axios.get(searchJobConstants.SEARCH_JOB_API, {
//     params: searchParams,
//   });
//   return res;
// };

searchJobApis.getSearchJob = async ({ filterData = {}, page = 0 }) => {
  const searchParams = { page };
  if (filterData) {
    Object.keys(filterData).forEach((fd) => {
      if (typeof searchParams[fd] === "string") {
        searchParams[fd] = filterData[fd];
      } else {
        searchParams[fd] = filterData[fd].join(",");
      }
    });
  }

  const res = await axios.get(searchJobConstants.SEARCH_JOB_API, {
    params: searchParams,
  });
  return res;
};

searchJobApis.getSearchJobDescription = async (id) => {

  const url = searchJobConstants.SEARCH_JOB_DESCRIPTION_API + "/" + id

  console.log("THE MAIN URL IS",url)

  const res = await axios.get(url);
  return res;
};

searchJobApis.applyJob = async (payload) => {
  let API_URL = searchJobConstants.APPLY_JOB_API.replace("jobID", payload.id);
  API_URL = API_URL.replace("UserNote", payload.userNote);
  const res = await axios.post(API_URL, null, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

searchJobApis.getSimilarJob = async (id) => {
  const res = await axios.get(
    searchJobConstants.SIMILAR_JOB_API + "/" + id + "/" + "similar-jobs"
  );
  return res;
  // return {
  //   content: [
  //     {
  //       id: "63974e785579d4447fde17d6",
  //       jobRefNo: "JT160140",
  //       jobTitle: "Telegram/Bybit Copy Trading Bot ",
  //       jobShortDescription: "Integrations with the Bybit Platform",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "REMOTE",
  //       projectType: "ONE_TIME",
  //       jobTiming: {
  //         hourRequired: 48,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Sat", "Sun"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: null,
  //     },
  //     {
  //       id: "6397536e5579d4447fde17dc",
  //       jobRefNo: "JT144401",
  //       jobTitle: "Application using TTS and Java",
  //       jobShortDescription: "Application using TTS and Java ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "Wed"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: null,
  //     },
  //     {
  //       id: "639754ec5579d4447fde17df",
  //       jobRefNo: "JT177518",
  //       jobTitle: "Build me an API that can generate ludo king room code ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 24,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 8,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: null,
  //     },
  //     {
  //       id: "639860e718d5c117fd3b20c4",
  //       jobRefNo: "JT100391",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986d5818d5c117fd3b20c5",
  //       jobRefNo: "JT148164",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986dc018d5c117fd3b20c8",
  //       jobRefNo: "JT171840",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986e5f18d5c117fd3b20c9",
  //       jobRefNo: "JT163022",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986eb418d5c117fd3b20ca",
  //       jobRefNo: "JT144437",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986ef018d5c117fd3b20cb",
  //       jobRefNo: "JT153556",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //     {
  //       id: "63986f3318d5c117fd3b20cc",
  //       jobRefNo: "JT177728",
  //       jobTitle: "Develop a Cpp game ",
  //       jobShortDescription:
  //         "This project will be utilizing GPT-3, so someone who shares an excitement for this technology is preferred. ",
  //       skills: [
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //         {
  //           id: null,
  //           name: null,
  //           experience: null,
  //         },
  //       ],
  //       jobType: "ONSITE",
  //       projectType: "ONGOING",
  //       jobTiming: {
  //         hourRequired: 54,
  //         hourRequiredPer: "DAY",
  //         durationOfWork: 4,
  //         durationOfWorkType: "DAY",
  //         jobDays: ["Mon", "tue"],
  //         shiftStartTime: "09:00:00",
  //         shiftEndTime: null,
  //       },
  //       billing: {
  //         number: 12,
  //         type: "FIXED",
  //       },
  //     },
  //   ],
  //   pageable: {
  //     sort: {
  //       empty: true,
  //       sorted: false,
  //       unsorted: true,
  //     },
  //     offset: 0,
  //     pageNumber: 0,
  //     pageSize: 20,
  //     paged: true,
  //     unpaged: false,
  //   },
  //   last: true,
  //   totalPages: 1,
  //   totalElements: 9,
  //   size: 20,
  //   number: 0,
  //   sort: {
  //     empty: true,
  //     sorted: false,
  //     unsorted: true,
  //   },
  //   first: true,
  //   numberOfElements: 9,
  //   empty: false,
  // };
};

searchJobApis.getOtherOpeningJob = async (id) => {
  const res = await axios.get(
    searchJobConstants.OTHER_OPENING_JOB_API +
      "/" +
      id +
      "/" +
      "other-opennings"
  );
  return res;
};

searchJobApis.getSkills = async ({ name = "", categoryIds = "" }) => {
  let API_URL = searchJobConstants.SKILLS_API;
  if (categoryIds.length) {
    API_URL = API_URL + `?${name}=${categoryIds.join()}`;
  }
  const res = await axios.get(API_URL);
  return res;
};
searchJobApis.getSkillsCategories = async () => {
  const res = await axios.get(searchJobConstants.SKILL_CATEGORIES_API);
  return res;
};

export { searchJobApis };
