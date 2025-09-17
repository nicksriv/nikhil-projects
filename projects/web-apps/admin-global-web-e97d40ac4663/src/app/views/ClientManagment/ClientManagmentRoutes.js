import React from 'react';
import { authRoles } from '../../auth/authRoles';

const clientManagmentRoutes = [
    {
        path: '/client-management',
        component: React.lazy(() => import('./ClientManagment')),
        auth: authRoles.sa,
    },
    {
        path: '/client/add',
        component: React.lazy(() => import('./ClientOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/client/edit',
        component: React.lazy(() => import('./ClientOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/client/view',
        component: React.lazy(() => import('./ClientOnboard')),
        auth: authRoles.sa,
    },
    {
        path: '/client/clientDetails/:id',
        component: React.lazy(() => import('./ClientDetails')),
        auth: authRoles.sa,
    },
]

export default clientManagmentRoutes
