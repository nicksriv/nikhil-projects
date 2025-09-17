import React from 'react'
import { authRoles } from '../../auth/authRoles'

const userManagmentRoutes = [
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
]

export default userManagmentRoutes
