import {
  LOADER_OFF,
  LOADER_ON,
  LOGIN,
  GET_HEADER_LIST,
  GET_FILTER_HEADER_LIST,
  GET_ROW_LIST,
  GET_WORKFLOW_LIST,
  GET_ROW_DETAILS,
  VISIBLE_REPORT_LIST,
  VISIBLE_REPORT_ROW_LIST,
  VISIBLE_REPORT_LIST_FILTER,
  VISIBLE_LISTOFREPORT,
  GET_MY_ITEM,
  GET_MY_SUB_ITEM,
  MAPPING_DATA,
} from '../../constants';

import {Alert} from 'react-native';

import apiConfig from '../../api/api_config';
import envConfig from '../../api/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
// import RNFetchBlob from "rn-fetch-blob";
import {Platform} from 'react-native';
import moment from 'moment';
import { asyncStorage } from '@app/store/asyncStorage';

const baseUrl = envConfig.BaseUrl;
const api = apiConfig.urls.list;
const fullUrl = baseUrl + api;
let authToken = ''

// const header= {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   Authorization : global.authToken
// }

var newfilterdownload = [];
var subname;
var componentfilterteamtableemployeeId;
var componentfilterteamtableuserName;
var componentfilterteamtablerole;
var datesfilterteamtablefromdate;
var datesfilterteamtabletodate;
var count = 0;
export function setViewReportlist(reportList) {
  return {
    type: VISIBLE_REPORT_LIST,
    payload: reportList,
  };
}

export function setViewReportRowList(reportRowList) {
  return {
    type: VISIBLE_REPORT_ROW_LIST,
    payload: reportRowList,
  };
}

export function setViewReportlistFilter(reportFiltersParams) {
  return {
    type: VISIBLE_REPORT_LIST_FILTER,
    payload: reportFiltersParams,
  };
}

export function setVisibleListofReport(listofreport) {
  return {
    type: VISIBLE_LISTOFREPORT,
    payload: listofreport,
  };
}

export function setMyItem(reportList) {
  return {
    type: GET_MY_ITEM,
    payload: reportList,
  };
}

export function setMySubItem(reportList) {
  return {
    type: GET_MY_SUB_ITEM,
    payload: reportList,
  };
}

export function setWorkflowList(workflowList) {
  return {
    type: GET_WORKFLOW_LIST,
    payload: workflowList,
  };
}

export function setAuth(rowList) {
  return {
    type: LOGIN,
    payload: rowList,
  };
}

export function getWorkflowList(id, id2) {
  
  return async dispatch => {
    const authToken = await asyncStorage.getToken();
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken,
    };
    dispatch(loaderOn());
    return fetch(
      `${fullUrl}` + `${id}` + `/submodules/` + `${id2}` + `/workflows/latest`,
      {
        headers: header,
      },
    )
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        console.log('WORKFLOW ===> ', responseJson);
        dispatch(setWorkflowList(responseJson));
        dispatch(loaderOff());
        // }
      })
      .catch(error => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          dispatch(setAuth(null));
          dispatch(loaderOff());
        }
        dispatch(loaderOff());
      });
  };
}
export function setHeaderList(headerList) {
  return {
    type: GET_HEADER_LIST,
    payload: headerList,
  };
}

export function setFilterHeaderList(filterheaderList) {
  return {
    type: GET_FILTER_HEADER_LIST,
    payload: filterheaderList,
  };
}

export function getHeaderList(id, id2, selectMenuItem) {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return async dispatch => {
    const authToken = await asyncStorage.getToken();
header["Authorization"] = authToken
    dispatch(loaderOn());
    const url = selectMenuItem?.mappedBy
      ? `${fullUrl}` +
        `${id}` +
        `/submodules/` +
        `${id2}` +
        `/columnsandfilters` +
        `?mappedBy=${selectMenuItem?.mappedBy}`
      : `${fullUrl}` +
        `${id}` +
        `/submodules/` +
        `${id2}` +
        `/columnsandfilters`;

    return fetch(url, {
      headers: header,
    })
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        dispatch(setHeaderList(responseJson));
        dispatch(loaderOff());
      })
      .catch(error => {
        console.log('error', error);
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          dispatch(setAuth(null));
          dispatch(loaderOff());
        }
        dispatch(loaderOff());
      });
  };
}

export function setRowList(rowList) {
  return {
    type: GET_ROW_LIST,
    payload: rowList,
  };
}
export function getRowList(
  id,
  id2,
  selectMenuItem,
  jobId,
  rowDetailsComponent,
  rowDetailsDate,
  static_rowDetailsComponent,
  static_rowDetailsDate,
  sizeOfList,
) {
  //team module download values set start
  if (
    static_rowDetailsComponent === undefined &&
    static_rowDetailsDate === undefined
  ) {
    componentfilterteamtableemployeeId = '';
    componentfilterteamtableuserName = '';
    componentfilterteamtablerole = '';

    datesfilterteamtablefromdate = '';
    datesfilterteamtabletodate = '';
  } else {
    componentfilterteamtableemployeeId = static_rowDetailsComponent.employeeId;
    componentfilterteamtableuserName = static_rowDetailsComponent.userName;
    componentfilterteamtablerole = static_rowDetailsComponent.role;
    datesfilterteamtablefromdate = static_rowDetailsDate.from;
    datesfilterteamtabletodate = static_rowDetailsDate.to;
  }
  //team module download values set end

  subname = selectMenuItem.name;

  //**************************** Spit the Data of Team Module Filtder

  var teamModouleEmpID;
  var teamModouleEmpName;
  var teamModouleEmpRoleID;

  var teamModouleFromDate;
  var teamModouletoDate;

  if (static_rowDetailsDate != undefined) {
    for (var [key1, value1] of Object.entries(static_rowDetailsDate)) {
      if (key1 == 'from') {
        teamModouleFromDate = value1;
      } else {
        teamModouletoDate = value1;
      }
    }
  }

  if (static_rowDetailsComponent != undefined) {
    for (var [key1, value1] of Object.entries(static_rowDetailsComponent)) {
      if (key1 == 'employeeId') {
        teamModouleEmpID = value1;
      } else if (key1 == 'userName') {
        teamModouleEmpName = value1;
      }
      if (key1 == 'role') {
        teamModouleEmpRoleID = value1;
      }
    }
  }

  //********************* Differenciate the Date

  var fromDateGet;
  var toDateGet;

  var [key1, value1] = [];

  if (rowDetailsDate != undefined) {
    for (var [key1, value1] of Object.entries(rowDetailsDate)) {
      if (key1 == 'from') {
        fromDateGet = value1;
      } else {
        toDateGet = value1;
      }
    }
  }

  //********************* Differenciate the Component

  var arrayObj = [];
  var [key, value] = [];
  newfilterdownload = [];

  if (rowDetailsComponent != undefined) {
    for (var [key, value] of Object.entries(rowDetailsComponent)) {
      var obj = {
        componentId: key,
        componentValue: value,
      };
      arrayObj.push(obj);
      newfilterdownload.push(obj);
    }
  }

  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return async dispatch => {
    dispatch(loaderOn());
    const authToken = await asyncStorage.getToken();
    header["Authorization"] = authToken

    const url = selectMenuItem?.mappedBy
      ? `${fullUrl}` +
        `${id}` +
        `/submodule/` +
        `${id2}` +
        `/all` +
        `?mappedBy=${selectMenuItem?.mappedBy}`
      : `${fullUrl}` + `${id}` + `/submodule/` + `${id2}` + `/all`;
    return fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        employeeId: teamModouleEmpID,
        name: teamModouleEmpName,
        roleId: teamModouleEmpRoleID,
        elements: 0,
        page: 0,
        size:  20,
        filters: arrayObj,
        from: fromDateGet ? fromDateGet : teamModouleFromDate,
        to: toDateGet ? toDateGet : teamModouletoDate,
        jobId
      }),
    })
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        const abc = Promise.all([statusCode, responseJson]);
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        dispatch(setRowList(responseJson));
        dispatch(loaderOff());
      })
      .catch(error => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          dispatch(setAuth(null));
          dispatch(loaderOff());
        }
        dispatch(loaderOff());
      });
  };
}

export function getRowDownload(
  id,
  id2,
  selectMenuItem,
  rowDetailsComponent,
  rowDetailsDate,
  static_rowDetailsComponent,
  static_rowDetailsDate,
  sizeOfList,
) {
  console.log(
    'rowDetailsComponent pageList rowDetailsComponentpagelist =',
    rowDetailsComponent,
  );
  console.log(
    'rowDetailsComponent pageList rowDetailsDatepageeee =',
    rowDetailsDate,
  );
  console.log(
    'rowDetailsComponent static_rowDetailsComponentmahe =',
    static_rowDetailsComponent,
  );
  console.log(
    'rowDetailsComponent static_rowDetailsDatemahe =',
    static_rowDetailsDate,
  );
  console.log('sizeOfList for more data =', sizeOfList);
  console.log('welcomeeeeee download optionss click');

  //**************************** Spit the Data of Team Module Filtder

  var teamModouleEmpID;
  var teamModouleEmpName;
  var teamModouleEmpRoleID;

  var teamModouleFromDate;
  var teamModouletoDate;

  if (static_rowDetailsDate != undefined) {
    for (var [key1, value1] of Object.entries(static_rowDetailsDate)) {
      if (key1 == 'From Date') {
        teamModouleFromDate = value1;
      } else {
        teamModouletoDate = value1;
      }
    }
  }

  if (static_rowDetailsComponent != undefined) {
    for (var [key1, value1] of Object.entries(static_rowDetailsComponent)) {
      if (key1 == 'Emp ID') {
        teamModouleEmpID = value1;
      } else if (key1 == 'Emp Name') {
        teamModouleEmpName = value1;
      }
      if (key1 == 'Emp Role') {
        teamModouleEmpRoleID = value1;
      }
    }
  }

  var fromDateGet;
  var toDateGet;

  var [key1, value1] = [];

  if (rowDetailsDate != undefined) {
    for (var [key1, value1] of Object.entries(rowDetailsDate)) {
      if (key1 == 'from') {
        fromDateGet = value1;
      } else {
        toDateGet = value1;
      }
    }
  }

  //********************* Differenciate the Component

  var arrayObj = [];
  var [key, value] = [];

  if (rowDetailsComponent != undefined) {
    for (var [key, value] of Object.entries(rowDetailsComponent)) {
      console.log('keyyyyyydownload is ' + key);
      console.log('valueeeedownload is ' + value);

      var obj = {
        componentId: key,
        componentValue: value,
      };
      arrayObj.push(obj);
    }
  }

  console.log(
    'newfilterdownload',
    JSON.stringify({
      employeeId: teamModouleEmpID,
      name: teamModouleEmpName,
      roleId: teamModouleEmpRoleID,
      elements: 0,
      page: 0,
      size: sizeOfList != undefined || null ? sizeOfList : 10,
      filters: newfilterdownload,
      from: fromDateGet ? fromDateGet : datesfilterteamtablefromdate,
      to: toDateGet ? toDateGet : datesfilterteamtabletodate,
    }),
  );

  console.log(
    'urrlrlll',
    'POST',
    `${fullUrl}` + `${id}` + `/submodule/` + `${id2}` + `/download`,
  );

  // return async (dispatch) => {

  var date = new Date();

  let datee = new Date(Math.floor(date.getTime() + date.getSeconds() / 2));

  // var date = new Date(timestamp);
  var currentDate = moment().format('DD-MM-YYYY');

  console.log('dateeeeeee', date);
  const {
    dirs: {DownloadDir, DocumentDir},
  } = RNFetchBlob.fs;
  const {config} = RNFetchBlob;
  const isIOS = Platform.OS == 'ios';
  const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
  const fPath =
    aPath +
    '/' +
    subname +
    ' ' +
    moment().format('DD_MM_YYYY_hh_mm_a') +
    '.xls';

  count = count + 1;

  // const fPath = aPath + '/'+ subname + count + '.xls';

  // var RNFS = require('react-native-fs');

  // let exists = await RNFS.exists(fPath);

  // if(exists){
  //   console.log("exists", exists); // true or false

  // }else{
  //   console.log("exists", exists); // true or false
  // }

  // const fPath = aPath + '/'+ 'test' + '.xls';


  //dispatch(loaderOn());

  return (
    RNFetchBlob.config({
      fileCache: true,
      path: fPath,
    })
      .fetch(
        'POST',
        selectMenuItem?.mappedBy
          ? `${fullUrl}` +
              `${id}` +
              `/submodule/` +
              `${id2}` +
              `/download` +
              `?mappedBy=${selectMenuItem?.mappedBy}`
          : `${fullUrl}` + `${id}` + `/submodule/` + `${id2}` + `/download`,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        JSON.stringify({
          employeeId: componentfilterteamtableemployeeId,
          name: componentfilterteamtableuserName,
          roleId: componentfilterteamtablerole,
          elements: 0,
          page: 0,
          size: sizeOfList != undefined || null ? sizeOfList : 10,
          filters: newfilterdownload,
          from: fromDateGet ? fromDateGet : teamModouleFromDate,
          to: toDateGet ? toDateGet : teamModouletoDate,
        }),
      )

      .then(res => {
        let status = res.info().status;
        if (status == 200) {
          // the conversion is done in native code

          if (Platform.OS === 'ios') {
            setTimeout(() => {
              // RNFetchBlob.ios.previewDocument('file://' + res.path());
              RNFetchBlob.ios.openDocument(res.data);
              Toast.show('File downloaded..!', Toast.SHORT);
            }, 300);
          } else {
            let base64Str = res.base64();
            Toast.show('File downloaded..!', Toast.SHORT);
            RNFetchBlob.android.actionViewIntent(res.path());
            console.log('statusstatusstatus base64>>>', status);
            console.log('responseeeeeee base64>>>', base64Str);
            //  res.flush();
          }
        } else {
          // handle other status codes
        }
      })

      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        console.log('errorMessage', errorMessage);
        console.log('statusCode', statusCode);

        // error handling
      })
  );
  // };
}

export function setRowDetails(rowDetails) {
  return {
    type: GET_ROW_DETAILS,
    payload: rowDetails,
  };
}

export const setMappingData = result => {
  return {
    type: MAPPING_DATA,
    payload: result,
  };
};
export function getRowDetails(
  moduleId,
  subModuleId,
  rowDetailsId,
  selectMenuItem,
) {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return async dispatch => {
    const authToken = await asyncStorage.getToken();
    header["Authorization"] = authToken
    dispatch(loaderOn());
    return fetch(
      selectMenuItem?.mappedBy
        ? baseUrl +
            '/api/v1/modules/' +
            `${moduleId}` +
            '/submodules/' +
            `${subModuleId}` +
            '/forms/' +
            `${rowDetailsId}` +
            `?mappedBy=${selectMenuItem?.mappedBy}`
        : baseUrl +
            '/api/v1/modules/' +
            `${moduleId}` +
            '/submodules/' +
            `${subModuleId}` +
            '/forms/' +
            `${rowDetailsId}`,
      {
        headers: header,
      },
    )
      .then(response => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        console.log('REDUX ROWDETAILS ==> ', responseJson);
        dispatch(setRowDetails(responseJson));
        dispatch(loaderOff);
      })
      .catch(error => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          dispatch(setAuth(null));
          dispatch(loaderOff());
        }
        dispatch(loaderOff());
      });
  };
}

export function loaderOn() {
  return {
    type: LOADER_ON,
  };
}
export function loaderOff() {
  return {
    type: LOADER_OFF,
  };
}
