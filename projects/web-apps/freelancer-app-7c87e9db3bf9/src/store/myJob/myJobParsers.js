import _get from "lodash.get";
import { searchJobParser } from "../searchJob/searchJobParsers";

const myJobParsers = {};
myJobParsers.myJobListParser = (res = []) => {
  const myJob = {};
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const parsedData = res.map((item, index) => ({
    id: _get(item, "id", index),
    jobRefNo: _get(item, "jobRefNo", index),
    jobId: _get(item, "jobId", ""),
    jobTitle: _get(item, "jobTitle", ""),
    userNote: _get(item, "userNote", ""),
    jobApplicationStatus: _get(item, "jobApplicationStatus", ""),
    jobApplicationAt: _get(item, "jobApplicationAt", ""),
    updatedAt: _get(item, "updatedAt", ""),
    jobAplicationStatusReason: _get(item, "jobAplicationStatusReason", ""),
    createdAt: _get(item, "createdAt", ""),
  }));

  const appliedJobs = parsedData.filter((item) => {
    return item.jobApplicationStatus === "NEW";
  });

  const rejectedJobs = parsedData.filter((item) => {
    return ["REJECTED",  "CANCELLED"].includes(item.jobApplicationStatus);
  });

  const acceptedJobs = parsedData.filter((item) => {
    return item.jobApplicationStatus === "APPROVED";
  });

  myJob.appliedJobs = appliedJobs;
  myJob.rejectedJobs = rejectedJobs;
  myJob.acceptedJobs = acceptedJobs;
  return myJob;
};

myJobParsers.myJobDescriptionParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }
  // // TODO: need to add additional keys for ongoing job
  // return searchJobParser.jobDetails(res);

  const skillsData = (data) => {
    return data.map((item) => {
      const skillArray = {
        id: _get(item, "id", ""),
        name: _get(item, "name", ""),
        experience: _get(item, "experience", ""),
      };
      return skillArray;
    });
  };

  const handleJobTiming = (data) => {
    [
      {
        title: "Expericence Level",
        titleType: _get(data, "experienceLevel", ""),
      },
      { title: "Project Type", titleType: _get(data, "projectType", "") },
      { title: "Job Type", titleType: _get(data, "jobType", "") },
      {
        title: "Hour Require",
        titleType: `${
          _get(data, "hourRequired", "") / _get(data, "hourRequiredPer", "")
        }`,
      },
      {
        title: "Work Duration",
        titleType: `${
          _get(data, "durationOfWork", "") /
          _get(data, "durationOfWorkType", "")
        }`,
      },
    ];

    return jobSummary;
  };

  const handleClient = (data) => {
    return {
      clientId: _get(data, "clientId", ""),
      clientName: _get(data, "clientName", ""),
      clientLogo: _get(data, "clientLogo", ""),
    };
  };

  const handleAddress = (data) => {
    return {
      location: _get(data, "location", ""),
      area: _get(data, "area", ""),
      city: _get(data, "city", ""),
      state: _get(data, "state", ""),
      country: _get(data, "country", []),
      pinCode: _get(data, "pinCode", ""),
    };
  };
  const handleJobApplicant = (data) => {
    return {
      id: _get(data, "id", ""),
      jobId: _get(data, "jobId", ""),
      jobTitle: _get(data, "jobTitle", ""),
      userNote: _get(data, "userNote", ""),
      jobApplicationStatus: _get(data, "jobApplicationStatus", ""),
      jobApplicationAt: _get(data, "jobApplicationAt", ""),
      jobAplicationStatusReason: _get(data, "jobAplicationStatusReason", ""),
    };
  };
  const handleJobSummary = (data) => {
    const jobSummary = [];
    const jobDays = _get(data.jobTiming, "jobDays", []);

    if (jobDays.length) {
      const data = jobDays.join();
      jobSummary.push({ title: "Job Days", titleType: data });
    }

    jobSummary.push({
      title: "Expericence Level",
      titleType: _get(data, "experienceLevel", "-"),
    });
    jobSummary.push({
      title: "Project Type",
      titleType: _get(data, "projectType", "-"),
    });
    jobSummary.push({
      title: "Job Type",
      titleType: _get(data, "jobType", "-"),
    });
    jobSummary.push({
      title: "Hour Require",
      titleType:
        _get(data.jobTiming, "hourRequired", "-") +
        "/" +
        _get(data.jobTiming, "hourRequiredPer", "-"),
    });
    jobSummary.push({
      title: "Work Duration",
      titleType:
        _get(data.jobTiming, "durationOfWork", "-") +
        "/" +
        _get(res, "durationOfWorkType", "-"),
    });
    jobSummary.push({
      title: "Billing",
      titleType:
        _get(data.billing, "number", "-") +
        "/" +
        _get(data.billing, "type", "-"),
    });

    return jobSummary;
  };

  const jobDetail = res.jobDetail;

  return {
    jobApplicant: handleJobApplicant(_get(res, "jobApplicant", {})),
    id: _get(jobDetail, "id", ""),
    client: handleClient(_get(jobDetail, "client", "")),
    jobRefNo: _get(jobDetail, "jobRefNo", ""),
    jobTitle: _get(jobDetail, "jobTitle", ""),
    jobShortDescription: _get(jobDetail, "jobShortDescription", ""),
    jobDescription: _get(jobDetail, "jobDescription", ""),
    highlights: _get(jobDetail, "highlights", []),
    deliverables: _get(jobDetail, "deliverables", []),
    experienceLevel: _get(jobDetail, "experienceLevel", ""),
    jobType: _get(jobDetail, "jobType", ""),
    projectType: _get(jobDetail, "projectType", ""),
    skill: skillsData(_get(jobDetail, "skill", [])),
    address: handleAddress(_get(jobDetail, "address", {})),
    jobSummary: handleJobSummary(jobDetail),
  };
};

myJobParsers.myJobDetails = (res) => {
  if (res.content) {
    res = res.content;
  }

  if (!res) {
    return {};
  }
  const parseJobApplicant = (jobApplicant) => ({
    createdAt: _get(jobApplicant, "createdAt", null),
    id: _get(jobApplicant, "id", null),
    jobAplicationStatusReason: _get(
      jobApplicant,
      "jobAplicationStatusReason",
      null
    ),
    jobApplicationAt: _get(jobApplicant, "jobApplicationAt", null),
    jobApplicationStatus: _get(jobApplicant, "jobApplicationStatus", null),
    jobCandidateId: _get(jobApplicant, "jobCandidateId", null),
    jobId: _get(jobApplicant, "jobId", null),
    jobTitle: _get(jobApplicant, "jobTitle", null),
    userNote: _get(jobApplicant, "userNote", null),
  });

  const parseAddress = (address) => ({
    city: _get(address, "city", null),
    country: _get(address, "country", null),
    location: _get(address, "location", null),
    pinCode: _get(address, "pinCode", null),
    state: _get(address, "state", null),
  });

  const parseBilling = (billing) => ({
    number: _get(billing, "number", null),
    type: _get(billing, "type", null),
    currency: _get(billing, "currency", "USD"),
  });

  const parseClient = (client) => ({
    clientId: _get(client, "clientId", null),
    clientName: _get(client, "clientName", null),
  });

  const parseJobTiming = (jobTiming) => ({
    durationOfWork: _get(jobTiming, "durationOfWork", null),
    durationOfWorkType: _get(jobTiming, "durationOfWorkType", null),
    hourRequired: _get(jobTiming, "hourRequired", null),
    hourRequiredPer: _get(jobTiming, "hourRequiredPer", null),
    jobDays: _get(jobTiming, "jobDays", []),
    shiftEndTime: _get(jobTiming, "shiftEndTime", null),
    shiftStartTime: _get(jobTiming, "shiftStartTime", null),
  });

  const parseSkills = (skills) =>
    skills.map((sk) => ({
      id: _get(sk, "id", null),
      experience: _get(sk, "experience", null),
      name: _get(sk, "name", null),
    }));

  const data = {
    id: _get(res, "jobDetail.id", null),
    jobId: _get(res, "jobApplicant.jobId", null),
    createdAt: _get(res, "jobDetail.createdAt", null),
    deliverables: _get(res, "jobDetail.deliverables", []),
    experienceLevel: _get(res, "jobDetail.experienceLevel", null),
    highlights: _get(res, "jobDetail.highlights", []),
    jobApplicantStatus: _get(res, "jobDetail.jobApplicantStatus", null),
    jobRefNo: _get(res, "jobDetail.jobRefNo", null),
    jobShortDescription: _get(res, "jobDetail.jobShortDescription", null),
    jobDescription: _get(res, "jobDetail.jobDescription", null),
    jobTitle: _get(res, "jobDetail.jobTitle", null),
    jobType: _get(res, "jobDetail.jobType", null),
    projectType: _get(res, "jobDetail.projectType", null),
    jobApplicant: parseJobApplicant(_get(res, "jobApplicant", {})),
    address: parseAddress(_get(res, "jobDetail.address", {})),
    billing: parseBilling(_get(res, "jobDetail.billing", {})),
    client: parseClient(_get(res, "jobDetail.client", {})),
    jobTiming: parseJobTiming(_get(res, "jobDetail.jobTiming", {})),
    skills: parseSkills(_get(res, "jobDetail.skills", [])),
  };
  return data;
};

export { myJobParsers };
