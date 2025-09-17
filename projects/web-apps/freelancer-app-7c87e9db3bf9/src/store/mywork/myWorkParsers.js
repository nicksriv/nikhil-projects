import _get from 'lodash.get';

const myWorkParsers = {};

myWorkParsers.myWorkListParser = (res = []) => {
  const myJob = {};
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }
  
  const parsedData = res.map((item, index) => ({
    id: _get(item, 'id', ''),
    jobRefNo: _get(item, 'jobRefNo', ''),
    jobId: _get(item, 'jobId', ''),
    jobTitle: _get(item, 'jobTitle', ''),
    jobStatus: _get(item, 'jobStatus', ''),
    amountStatus: _get(item, 'amountStatus', ''),
    amountPaid: _get(item, 'amountPaid', ''),
    jobRating: _get(item, 'jobRating', ''),
    jobStatusRemark: _get(item, 'jobStatusRemark', ''),
    totalEarned: _get(item, 'totalEarned', ''),
    totalHoursWorked: _get(item, 'totalHoursWorked', ''),
    createdAt: _get(item, 'createdAt', ''),
  }));

  return parsedData;
  // const appliedJobs = parsedData.filter((item) => {
  //   return item.jobApplicationStatus === "NEW";
  // });

  // const rejectedJobs = parsedData.filter((item) => {
  //   return item.jobApplicationStatus === "REJECTED";
  // });

  // const acceptedJobs = parsedData.filter((item) => {
  //   return item.jobApplicationStatus === "APPROVED";
  // });

  // myJob.appliedJobs = appliedJobs;
  // myJob.rejectedJobs = rejectedJobs;
  // myJob.acceptedJobs = acceptedJobs;
  // return myJob;
};

myWorkParsers.myWorkDescriptionParser = res => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }
  const handleClient = data => {
    return {
      id: _get(data, 'id', ''),
      clientId: _get(data, 'clientId', ''),
      clientName: _get(data, 'clientName', ''),
      clientLogo: _get(data, 'clientLogo', ''),
    };
  };

  const handleBilling = data => {
    return {
      number: _get(data, 'number', ''),
      type: _get(data, 'type', ''),
    };
  };

  const handleJobDetails = data => {
    return {
      jobRefNo: _get(data, 'jobRefNo', ''),
      client: handleClient(_get(data, 'client', {})),
      jobShortDescription: _get(data, 'jobShortDescription', ''),
      deliverables: _get(data, 'deliverables', []),
      billing: handleBilling(_get(data, 'billing', {})),
      modules: _get(res, 'jobDetails.modules', ''),
    };
  };
  return {
    id: _get(res, 'id', ''),
    jobId: _get(res, 'jobId', ''),
    jobTitle: _get(res, 'jobTitle', ''),
    jobStatus: _get(res, 'jobStatus', ''),
    jobStatusRemark: _get(res, 'jobStatusRemark', '')|| 'NA',
    jobApproverRemark: _get(res, 'jobApproverRemark', ''),
    jobApproverRemarkAt: _get(res, 'jobApproverRemarkAt', ''),
    jobRating: _get(res, 'jobRating', ''),
    jobRatingDescription: _get(res, 'jobRatingDescription', ''),
    totalHoursWorked: _get(res, 'totalHoursWorked', ''),
    totalEarned: _get(res, 'totalEarned', ''),
    amountPaid: _get(res, 'amountPaid', ''),
    amountStatus: _get(res, 'amountStatus', ''),
    payerRemark: _get(res, 'payerRemark', '')|| "NA",
    notes: _get(res, 'notes', '')|| "NA",
    jobUserRemark: _get(res, 'jobUserRemark', '')|| "NA",
    jobDetails: handleJobDetails(_get(res, 'jobDetails', {})),
  };
};

myWorkParsers.myWorkEarningStatsParser = (res = []) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const parsedData = res.map((item, index) => ({
    value: _get(item, 'amount', ''),
    month: _get(item, 'month', ''),
  }));

  return parsedData;
};


myWorkParsers.myWorkStatsParser = (res = []) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const parsedData = res.map((item, index) => ({
    value: _get(item, 'count', ''),
    month: _get(item, 'month', ''),
  }));

  return parsedData;
};

export {myWorkParsers};
