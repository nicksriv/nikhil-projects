import React from 'react';
import { authRoles } from '../../auth/authRoles';

const filterViewRoutes = [
    {
        path: '/apply-filter',
        component: React.lazy(() => import('./FilterView')),
        auth: authRoles.sa,
    }
]

export default filterViewRoutes;
