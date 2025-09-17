import React from 'react';
import { authRoles } from '../../auth/authRoles';

const ScreenBuilderManagementRoutes = [
    {
        path: '/screen-builder',
        component: React.lazy(() => import('./ScreenBuilderManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/module/add',
        component: React.lazy(() => import('./ScreenBuilder')),
        auth: authRoles.sa,
    },
    {
        path: '/module/edit',
        component: React.lazy(() => import('./ScreenBuilder')),
        auth: authRoles.sa,
    }
]

export default ScreenBuilderManagementRoutes;