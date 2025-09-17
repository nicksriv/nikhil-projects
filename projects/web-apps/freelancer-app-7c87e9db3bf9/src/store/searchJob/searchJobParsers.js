import _get from "lodash.get";

const searchJobParser = {};

searchJobParser.getSearchJobListData = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const skillsData = (data) => {
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

  const handleJobTiming = (data) => {
    return {
      hourRequired: _get(data, "hourRequired", ""),
      hourRequiredPer: _get(data, "hourRequiredPer", ""),
      durationOfWork: _get(data, "durationOfWork", ""),
      durationOfWorkType: _get(data, "durationOfWorkType", ""),
      jobDays: _get(data, "jobDays", []),
      shiftStartTime: _get(data, "shiftStartTime", ""),
      shiftEndTime: _get(data, "shiftEndTime", ""),
    };
  };

  return res.map((e, idx) => ({
    id: _get(e, "id", idx),
    jobRefNo: _get(e, "jobRefNo", ""),
    jobTitle: _get(e, "jobTitle", ""),
    jobType: _get(e, "jobType", ""),
    projectType: _get(e, "projectType", ""),
    jobShortDescription: _get(e, "jobShortDescription", ""),
    skills: skillsData(_get(e, "skills", [])),
    jobTiming: handleJobTiming(_get(e, "jobTiming", {})),
    billing: _get(e, "billing", {}),
  }));
};

searchJobParser.getSearchJobDescription = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }

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
        _get(data.jobTiming, "durationOfWorkType", "-"),
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

  return {
    id: _get(res, "id", null),
    client: handleClient(_get(res, "client", null)),
    jobRefNo: _get(res, "jobRefNo", null),
    jobTitle: _get(res, "jobTitle", null),
    jobShortDescription: _get(res, "jobShortDescription", ""),
    jobDescription: _get(res, "jobDescription", ""),
    highlights: _get(res, "highlights", []),
    deliverables: _get(res, "deliverables", []),
    experienceLevel: _get(res, "experienceLevel", null),
    jobApplicantStatus: _get(res, "jobApplicantStatus", ""),
    jobType: _get(res, "jobType", null),
    projectType: _get(res, "projectType", null),
    skill: skillsData(_get(res, "skill", [])),
    address: handleAddress(_get(res, "address", {})),
    jobSummary: handleJobSummary(res),
  };
};

searchJobParser.getSimilarJobListData = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const skillsData = (data) => {
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

  const handleJobTiming = (data) => {
    return {
      hourRequired: _get(data, "hourRequired", ""),
      hourRequiredPer: _get(data, "hourRequiredPer", ""),
      durationOfWork: _get(data, "durationOfWork", ""),
      durationOfWorkType: _get(data, "durationOfWorkType", ""),
      jobDays: _get(data, "jobDays", []),
      shiftStartTime: _get(data, "shiftStartTime", ""),
      shiftEndTime: _get(data, "shiftEndTime", ""),
    };
  };

  return res.map((e, idx) => ({
    id: _get(e, "id", idx),
    jobRefNo: _get(e, "jobRefNo", ""),
    jobTitle: _get(e, "jobTitle", ""),
    jobType: _get(e, "jobType", ""),
    projectType: _get(e, "projectType", ""),
    jobShortDescription: _get(e, "jobShortDescription", ""),
    skills: skillsData(_get(e, "skills", [])),
    jobTiming: handleJobTiming(_get(e, "jobTiming", {})),
    billing: _get(e, "billing", ""),
  }));
};
searchJobParser.getOtherOpeningJobListData = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const skillsData = (data) => {
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

  const handleJobTiming = (data) => {
    return {
      hourRequired: _get(data, "hourRequired", ""),
      hourRequiredPer: _get(data, "hourRequiredPer", ""),
      durationOfWork: _get(data, "durationOfWork", ""),
      durationOfWorkType: _get(data, "durationOfWorkType", ""),
      jobDays: _get(data, "jobDays", []),
      shiftStartTime: _get(data, "shiftStartTime", ""),
      shiftEndTime: _get(data, "shiftEndTime", ""),
    };
  };

  return res.map((e, idx) => ({
    id: _get(e, "id", idx),
    jobRefNo: _get(e, "jobRefNo", ""),
    jobTitle: _get(e, "jobTitle", ""),
    jobType: _get(e, "jobType", ""),
    projectType: _get(e, "projectType", ""),
    jobShortDescription: _get(e, "jobShortDescription", ""),
    skills: skillsData(_get(e, "skills", [])),
    jobTiming: handleJobTiming(_get(e, "jobTiming", {})),
    billing: _get(e, "billing", ""),
  }));
};

searchJobParser.skillsListParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  return res.map((e, idx) => ({
    id: _get(e, "id", ""),
    name: _get(e, "name", ""),
    experience: _get(e, "experience", ""),
  }));
};
searchJobParser.skillsListCategoriesParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  return res.map((e, idx) => ({
    id: _get(e, "id", ""),
    parentSkillcategoryId: _get(e, "parentSkillcategoryId", ""),
    name: _get(e, "name", ""),
    active: _get(e, "active", ""),
  }));
};

// job details parser
searchJobParser.jobDetails = (res) => {
  if (res.content) {
    res = res.content;
  }

  if (!res) {
    return {};
  }

  const parseAddress = (address) => ({
    city: _get(address, "city", null),
    country: _get(address, "country", null),
    location: _get(address, "location", null),
    pinCode: _get(address, "pinCode", null),
    state: _get(address, "state", null),
  })

  const parseBilling = (billing) => ({
    number: _get(billing, "number", null),
    type: _get(billing, "type", null),
    currency: _get(billing, "currency", "USD"),
  })

  const parseClient = (client) => ({
    clientId: _get(client, "clientId", null),
    clientName: _get(client, "clientName", null),
  })

  const parseJobTiming = (jobTiming) => ({
    durationOfWork: _get(jobTiming, "durationOfWork", null),
    durationOfWorkType: _get(jobTiming, "durationOfWorkType", null),
    hourRequired: _get(jobTiming, "hourRequired", null),
    hourRequiredPer: _get(jobTiming, "hourRequiredPer", null),
    jobDays: _get(jobTiming, "jobDays", []),
    shiftEndTime: _get(jobTiming, "shiftEndTime", null),
    shiftStartTime: _get(jobTiming, "shiftStartTime", null),
  })

  const parseSkills = (skills) => skills.map(sk => ({
    id: _get(sk, "id", null),
    experience: _get(sk, "experience", null),
    name: _get(sk, "name", null),
  }))
  
  return {
    id: _get(res, "id", null),
    createdAt: _get(res, "createdAt", null),
    deliverables: _get(res, "deliverables", []),
    experienceLevel: _get(res, "experienceLevel", null),
    experienceLevel: _get(res, "experienceLevel", null),
    highlights: _get(res, "highlights", []),
    jobApplicantStatus: _get(res, "jobApplicantStatus", null),
    jobRefNo: _get(res, "jobRefNo", null),
    jobShortDescription: _get(res, "jobShortDescription", null),
    jobDescription: _get(res, "jobDescription", null),
    jobTitle: _get(res, "jobTitle", null),
    jobType: _get(res, "jobType", null),
    projectType: _get(res, "projectType", null),
    address: parseAddress(_get(res, "address", {})),
    billing: parseBilling(_get(res, "billing", {})),
    client: parseClient(_get(res, "client", {})),
    jobTiming: parseJobTiming(_get(res, "jobTiming", {})),
    skills: parseSkills(_get(res, "skills", [])), 
  }
}

// job list parser
searchJobParser.jobList = (res) => {
  if (res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  return res.map(r => searchJobParser.jobDetails(r));
}

export { searchJobParser };
