import React from 'react';
import { authRoles } from '../../auth/authRoles';

const themeManagmentRoutes = [
    {
        path: '/theme-management',
        component: React.lazy(() => import('./ThemeManagement')),
        auth: authRoles.sa,
    }

]

export default themeManagmentRoutes
