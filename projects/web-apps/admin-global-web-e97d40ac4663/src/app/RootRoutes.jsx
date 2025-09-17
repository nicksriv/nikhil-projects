import React from 'react';
import { Redirect } from 'react-router-dom';

import utilitiesRoutes from './views/utilities/UtilitiesRoutes';

import materialRoutes from './views/material-kit/MaterialRoutes';
import filterViewRoutes from './views/FilterView/FilterViewRoutes';
import clientManagmentRoutes from './views/ClientManagment/ClientManagmentRoutes';
import userManagementRoutes from './views/UserManagement/UserManagementRoutes';
import ScreenBuilderManagementRoutes from './views/ScreenBuilderManagement/ScreenBuilderManagementRoutes';
import dashboardRoutes from './views/Dashboard/DashboardRoutes';
import roleManagmentRoutes from './views/RoleManagement/RoleManagementRoutes';
import siteManagmentRoutes from './views/SiteManagement/SiteManagementRoutes';
import themeManagmentRoutes from './views/ThemeManagement/ThemeManagementRoutes';
import userProfileManagmentRoutes from './views/UserProfile/UserProfileRoutes';
import reportManagmentRoutes from './views/ReportManagement/ReportManagemetRoutes';
import jobManagementRoutes from './views/JobManagement/JobManagementRoutes';
import vendorManagementRoutes from './views/VendorManagement/VendorManagementRoutes';
import freelancerManagementRoutes from './views/FreelancerManagement/FreelancerManagementRoutes';
import disputeManagementRoutes from './views/DisputeManagement/DisputeManagementRoutes';
import qualityAssuranceManagementRoutes from './views/QualityAssuranceManagement/QualityAssuranceManagementRoutes';
import vendorRegistrationRoutes from './views/VendorRegistrationManagement/VendorRegistrationRoutes';
import PaymentManagementRoutes from './views/PaymentManagement/PaymentMangementRoutes';
const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard" />,
    },
    {
        path: '/ClientManagment',
        exact: true,
        component: () => <Redirect to="/ClientManagment" />,
    },
    {
        path: '/VendorManagement',
        exact: true,
        component: () => <Redirect to="/VendorManagement" />,
    },
    {
        path: '/UserManagment',
        exact: true,
        component: () => <Redirect to="/UserManagment" />,
    },
    {
        path: '/JobManagement',
        exact: true,
        component: () => <Redirect to="/JobManagement" />,
    },
    {
        path: '/ScreenBuilderManagement',
        exact: true,
        component: () => <Redirect to="/ScreenBuilderManagement" />,
    }, {
        path: '/RoleManagement',
        exact: true,
        component: () => <Redirect to="/RoleManagement" />
    }, {
        path: '/SiteManagement',
        exact: true,
        component: () => <Redirect to="/SiteManagement" />
    },
    {
        path: '/ThemeManagement',
        exact: true,
        component: () => <Redirect to="/ThemeManagement" />
    },
    {
        path: '/UserProfile',
        exact: true,
        component: () => <Redirect to="/UserProfile" />
    },
    {
        path: '/ReportManagement',
        exact: true,
        component: () => <Redirect to="/ReportManagement" />
    },
    {
        path: '/FreelancerManagement',
        exact: true,
        component: () => <Redirect to="/FreelancerManagement" />
    },
    {
        path: '/DisputeManagement',
        exact: true,
        component: () => <Redirect to="/DisputeManagement" />
    },
    {
        path: '/QualityAssuranceManagement',
        exact: true,
        component: () => <Redirect to="/QualityAssuranceManagement" />
    },
    {
        path:'/VendorRegistrationManagement',
        exact: true,
        component: () => <Redirect to="/VendorRegistrationManagement" />,
    },

]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...filterViewRoutes,
   ...PaymentManagementRoutes,
    ...clientManagmentRoutes, 
    ...vendorManagementRoutes,
    ...vendorRegistrationRoutes,
    ...userManagementRoutes,
    ...jobManagementRoutes,
    ...freelancerManagementRoutes,
    ...disputeManagementRoutes,
    ...qualityAssuranceManagementRoutes,
    ...ScreenBuilderManagementRoutes,
    ...roleManagmentRoutes,
    ...siteManagmentRoutes,
    ...themeManagmentRoutes,
    ...userProfileManagmentRoutes,
    ...reportManagmentRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
