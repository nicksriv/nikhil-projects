import React from 'react';
import { authRoles } from '../../auth/authRoles';

const userProfileRoutes = [
    {
        path: '/user-profile',
        component: React.lazy(() => import('./UserProfile')),
        auth: authRoles.sa,
    }

]

export default userProfileRoutes;
