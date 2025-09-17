import {config} from '../config';
import envConfig from '@app/FormElements/api/env';
const urlHelper = {};

urlHelper.propertyImage = path => {
  if (!path) return '';
  return `${config.baseURL}/${path}`;
};

urlHelper.getHeaderLIst = (moduleId, subModuleId, mappedBy) => {
  let url = '';
  if (mappedBy) {
    url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodules/${subModuleId}/columnsandfilters?mappedBy=${mappedBy}`;
    return url;
  }
  url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodules/${subModuleId}/columnsandfilters`;
  return url;
};

urlHelper.getScreenNames = (moduleId, subModuleId) => {
  let url = '';
    url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodules/${subModuleId}//workflows/latest`;
    return url;
};


urlHelper.getNewRowList = (moduleId, subModuleId) => {
    let url = ''
    url =  `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodules/${subModuleId}/columnsandfilters?mappedBy=`
    return url
}

urlHelper.getRowList=(moduleId, subModuleId, mappedBy)=>{
    let url = '';

    if (mappedBy) {
      url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodule/${subModuleId}/all?mappedBy=${mappedBy}`;
      return url;
    }
    url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodule/${subModuleId}/all`;
    return url;
}

urlHelper.submitApi1=(props)=>{
  let url = '';

  console.log("PACASADE",props)

  const {moduleId,subModuleId,rowDetailsId,workFlowId,mappedBy} = props;

  console.log("moduleId,subModuleId,rowDetailsId,workFlowId,mappedBy",moduleId,subModuleId,rowDetailsId,workFlowId,mappedBy);

  if (mappedBy) {
    url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodule/${subModuleId}/form/${rowDetailsId}?mappedBy=${mappedBy}&workflowId=${workFlowId}`;
    return url;
  }
  url = `${envConfig.BaseUrl}api/v1/modules/${moduleId}/submodule/${subModuleId}/all`;


  const url1 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '/form/' +
      `${props.rowDetails.id}` +
      `?mappedBy=${selectMenuItem?.mappedBy}` +
      '&workflowId=' +
      `${subModuleData.workFlowId}`;

    const url2 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '/form/' +
      `${props.rowDetails.id}` +
      '?workflowId=' +
      `${subModuleData.workFlowId}`;


  return url;
}

export {urlHelper};
