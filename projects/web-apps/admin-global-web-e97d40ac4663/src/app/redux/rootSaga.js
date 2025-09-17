import { all } from 'redux-saga/effects';
import clientManagementSaga from './ClientManagement/clientManagementSaga';
import userManagementSaga from './UserManagement/userManagementSaga';
import screenBuilderManagementSaga from './ScreenBuilderManagement/screenBuilderManagementSaga';
import roleManagementSaga from './RoleManagement/roleManagementSaga';
import siteManagementSaga from './SiteManagement/siteManagementSaga';
import authManagementSaga from './AuthManagement/authManagementSaga';
import themeManagementSaga from './ThemeManagement/ThemeManagementSaga';
import userProfileSaga from './UserProfile/userProfileSaga';
import reportManagementSaga from './ReportManagement/reportManagementSaga';
import dashboardSaga from './Dashboard/dashboardSaga';
import jobManagementSaga from './JobManagement/JobManagementSaga';
import vendorManagementSaga from './VendorManagement/VendorManagementSaga';
import moduleManagementSaga from './ModuleManagement/moduleManagementSaga';
import freelancerManagementSaga from './FreelancerManagement/FreelancerManagementSaga'
import disputeManagementSaga from './DisputeManagement/DisputeManagementSaga';
import qualityAssuranceManagementSaga from './QualityAssuranceManagement/QualityAssuranceManagementSaga'
import vendorRegistrationSaga from './VendorRegistration/VendorRegistrationSaga';
function* rootSaga() {
  yield all([
    clientManagementSaga(),
    userManagementSaga(),
    screenBuilderManagementSaga(),
    roleManagementSaga(),
    siteManagementSaga(),
    authManagementSaga(),
    themeManagementSaga(),
    userProfileSaga(),
    reportManagementSaga(),
    dashboardSaga(),
    jobManagementSaga(),
    vendorManagementSaga(),
    moduleManagementSaga(),
    freelancerManagementSaga(),
    disputeManagementSaga(),
    qualityAssuranceManagementSaga(),
    vendorRegistrationSaga()
  ]);
}

export default rootSaga;