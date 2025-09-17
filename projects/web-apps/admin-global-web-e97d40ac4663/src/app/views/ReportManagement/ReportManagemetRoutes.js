import React from 'react'
import { authRoles } from '../../auth/authRoles'

const reportManagmentRoutes = [
    {
        path: '/configure-report',
        component: React.lazy(() => import('./ReportManagement')),
        auth: authRoles.sa,
    },
    // {
    //     path: '/report/add',
    //     component: React.lazy(() => import('./AddModuleReport')),
    //     auth: authRoles.sa,
    // },
    {
        path: '/report/edit',
        component: React.lazy(() => import('./EditReportContainer')),
        auth: authRoles.sa,
    },
    {
        path: '/report/view',
        component: React.lazy(() => import('./ViewReportContainer')),
        auth: authRoles.sa,
    }
]

export default reportManagmentRoutes
