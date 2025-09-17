import React from 'react';
import { authRoles } from '../../auth/authRoles';

const roleManagmentRoutes = [
    {
        path: '/role-management',
        component: React.lazy(() => import('./RoleManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/role/add',
        component: React.lazy(() => import('./Role')),
        auth: authRoles.sa,
    },
    {
        path: '/role/edit',
        component: React.lazy(() => import('./Role')),
        auth: authRoles.sa,
    },
    {
        path: '/role/view',
        component: React.lazy(() => import('./Role')),
        auth: authRoles.sa,
    },

]

export default roleManagmentRoutes
