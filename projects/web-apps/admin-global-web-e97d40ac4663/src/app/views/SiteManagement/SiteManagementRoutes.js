import React from 'react';
import { authRoles } from '../../auth/authRoles';

const siteManagmentRoutes = [
    {
        path: '/site-management',
        component: React.lazy(() => import('./SiteManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/site/add',
        component: React.lazy(() => import('./SiteOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/site/edit',
        component: React.lazy(() => import('./SiteOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/site/view',
        component: React.lazy(() => import('./SiteOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/site/bulk-upload',
        component: React.lazy(() => import('./BulkUpload')),
        auth: authRoles.sa,
    },

]

export default siteManagmentRoutes