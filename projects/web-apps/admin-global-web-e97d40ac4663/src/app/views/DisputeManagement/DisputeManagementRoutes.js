import React from 'react'
import { authRoles } from '../../auth/authRoles'

const disputeManagementRoutes = [
    {
        path: '/dispute-management',
        component: React.lazy(() => import('./DisputeManagement')),
        auth: authRoles.v5_and_client_admin,
    },
    {
        path: '/dispute/disputeDetails/:id',
        component: React.lazy(() => import('./DisputeDetails')),
        auth: authRoles.v5_and_client_admin,
    },
]

export default disputeManagementRoutes
