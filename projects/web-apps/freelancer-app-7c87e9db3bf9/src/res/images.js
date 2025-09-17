const images = {};

// tabicons
images.tab = {
  home: () => require("./images/tab-icons/home.png"),
  homeActive: () => require("./images/tab-icons/home_active.png"),
  properties: () => require("./images/tab-icons/properties.png"),
  propertiesActive: () => require("./images/tab-icons/properties_active.png"),
  profile: () => require("./images/tab-icons/profile.png"),
  profileActive: () => require("./images/tab-icons/profile_active.png"),
  logo: () => require("./images/logo/logo.png"),
  userProfie: () => require("./images/logo/profile.png"),
  filledStar: () => require("./images/logo/filledstar.png"),
  unfilledStar: () => require("./images/logo/unfilledstar.png"),
};

// actionsicons
images.action = {
  whatsapp: () => require("./images/action-icons/whatsapp.png"),
  share: () => require("./images/action-icons/share.png"),
  chevronLeft: () => require("./images/action-icons/chevron_left.png"),
};

// CardIcons

images.dashboardIcons = {
  time: () => require("./images/dashboard/time.png"),
  rupee: () => require("./images/dashboard/dollar.png"),
  project: () => require("./images/dashboard/project.png"),
  job: () => require("./images/dashboard/job.png"),
};

images.sideDrawIcons = {
  dashboard: () => require("./images/sidedraw/Dashboard.png"),
  job: () => require("./images/sidedraw/Job.png"),
  faq: () => require("./images/sidedraw/Faq.png"),
  dispute: () => require("./images/sidedraw/Dispute.png"),
  question: () => require("./images/sidedraw/Question.png"),
  report: () => require("./images/sidedraw/Report.png"),
  time: () => require("./images/sidedraw/Time.png"),
  rupee: () => require("./images/sidedraw/Rupee.png"),
};

images.jobCard = {
  experience: () => require("./images/jobcardicons/experience.png"),
  time: () => require("./images/jobcardicons/time.png"),
  calendar: () => require("./images/jobcardicons/calendar.png"),
  money: () => require("./images/jobcardicons/money.png"),
  clientLogo: () => require("./images/jobcardicons/clientLogo.png"),
  bullet: () => require("./images/jobcardicons/bullet.png"),
  message: () => require("./images/jobcardicons/message.png"),
};

images.informative = {
  noData: () => require("./images/informative/NoData.png"),
  noImage:() => require("./images/informative/NoImage.png"),
  
};

images.reports = {
  earning: () => require("./images/report/earning.png"),
  job: () => require("./images/report/job.png"),
};

export { images };
