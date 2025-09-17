import React from 'react';
import { authRoles } from '../../auth/authRoles';

const userManagementRoutes = [
    {
        path: '/user-management',
        component: React.lazy(() => import('./UserManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/user/add',
        component: React.lazy(() => import('./UserOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/user/edit',
        component: React.lazy(() => import('./UserOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/user/view',
        component: React.lazy(() => import('./UserOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/user/bulk-upload',
        component: React.lazy(() => import('./BulkUpload')),
        auth: authRoles.sa,
    },
    {
        path: '/user/map-site',
        component: React.lazy(() => import('./SiteUpload')),
        auth: authRoles.sa,
    },
    {
        path: '/user/userDetails/:id',
        component: React.lazy(() => import('./UserDetails')),
        auth: authRoles.sa,
    },
]

export default userManagementRoutes
