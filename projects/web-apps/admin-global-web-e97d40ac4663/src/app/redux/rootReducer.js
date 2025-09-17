import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
//import settingsReducer from './slices/settings';
import SnackbarReducer from './slices/snackbar'
import clientInfoReducer from './ClientManagement/clientManagementSlice'
import userInfoReducer from './UserManagement/userManagementSlice'
import moduleInfoReducer from './ScreenBuilderManagement/screenBuilderManagementSlice'
import roleInfoReducer from './RoleManagement/roleManagementSlice'
import authInfoReducer from './AuthManagement/authManagementSlice'
import siteInfoReducer from './SiteManagement/siteManagementSlice'
import themInfoReducer from './ThemeManagement/ThemeManagementSlice'
import reportInfoReducer from './ReportManagement/reportManagementSlice'
import userProfileSlice from './UserProfile/userProfileSlice'
import dashboardReducer from './Dashboard/dashboardSlice'
import jobManagementReducer from './JobManagement/JobManagementSlice'
import vendorManagementReducer from './VendorManagement/VendorManagementSlice'
import vendorRegistrationReducer from './VendorRegistration/VendorRegistrationSlice'
import freelancerManagementReducer from './FreelancerManagement/FreelancerManagementSlice'
import disputeManagementReducer from './DisputeManagement/DisputeManagementSlice'
import qualityAssuranceManagementReducer from './QualityAssuranceManagement/QualityAssuranceManagementSlice'
// ----------------------------------------------------------------------
import moduleManagementReducer from './ModuleManagement/moduleManagementSlice'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['settings'],
}

const rootReducer = combineReducers({
    clients: clientInfoReducer,
    users: userInfoReducer,
    roles: roleInfoReducer,
    sites: siteInfoReducer,
    SnackbarReducer: SnackbarReducer,
    screenBuilder: moduleInfoReducer,
    auth: authInfoReducer,
    theme: themInfoReducer,
    profile: userProfileSlice,
    report: reportInfoReducer,
    dashboard: dashboardReducer,
    jobManagement: jobManagementReducer,
    vendorManagement: vendorManagementReducer,
    modules:moduleManagementReducer,
    freelancerManagement:freelancerManagementReducer,
    disputeManagement:disputeManagementReducer,
    qualityAssuranceManagement: qualityAssuranceManagementReducer,
    vendorRegistration:vendorRegistrationReducer,
})

export { rootPersistConfig, rootReducer }
