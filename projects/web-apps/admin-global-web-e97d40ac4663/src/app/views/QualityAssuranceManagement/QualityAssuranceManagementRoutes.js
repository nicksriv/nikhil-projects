import React from 'react'
import { authRoles } from '../../auth/authRoles'

const qualityAssuranceManagementRoutes = [
    {
        path: '/qualityassurance-management',
        component: React.lazy(() => import('./QualityAssuranceManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/qualityassurance/qualityassuranceDetails/:id',
        component: React.lazy(() => import('./QualityAssuranceDetails')),
        auth: authRoles.sa,
    },
    {
        path: '/qualityassurance/add',
        component: React.lazy(() => import('./AddQualityAssurance')),
        auth: authRoles.sa,
    },
    {
        path: '/qualityassurance/edit/:id',
        component: React.lazy(() => import('./EditQualityAssurance')),
        auth: authRoles.sa,
    }
]

export default qualityAssuranceManagementRoutes
