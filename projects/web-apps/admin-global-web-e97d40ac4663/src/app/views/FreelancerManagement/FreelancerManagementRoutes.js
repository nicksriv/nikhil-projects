import React from 'react'
import { authRoles } from '../../auth/authRoles'

const freelancerManagementRoutes = [
    {
        path: '/freelancer-management',
        component: React.lazy(() => import('./FreelancerManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/freelancer/freelancerDetails/:id',
        component: React.lazy(() => import('./FreelancerDetails')),
        auth: authRoles.sa,
    },
]

export default freelancerManagementRoutes
