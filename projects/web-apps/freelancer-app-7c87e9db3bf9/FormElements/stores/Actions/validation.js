import {
    GET_PROFILE_PIC,
    GET_ALL_CHART_VALUE,
    GET_ALL_CHART_REPORT_VALUE,
    GET_LOCAL_LOGO,
    GET_LOCAL_BACKGROUND,
    GET_CHART_VALUE
  } from "../../constants";

  export function setProfilePicture(profilePicture) {
    return {
      type: GET_PROFILE_PIC,
      payload: profilePicture,
    };
  }

  export function setAllChartDataRedux(allChartDataRedux) {
    return {
      type: GET_ALL_CHART_VALUE,
      payload: allChartDataRedux,
    };
  }

  export function setAllChartDataReportRedux(allChartDataReportRedux) {
    return {
      type: GET_ALL_CHART_REPORT_VALUE,
      payload: allChartDataReportRedux,
    };
  }

  export function setLocalLogo(localLogo) {
    return {
      type: GET_LOCAL_LOGO,
      payload: localLogo,
    };
  }

  export function setLocalBackground(localBackground) {
    return {
      type: GET_LOCAL_BACKGROUND,
      payload: localBackground,
    };
  }

  export function setChartValueRedux(chartApiData) {
    return {
      type: GET_CHART_VALUE,
      payload: chartApiData,
    };
  }