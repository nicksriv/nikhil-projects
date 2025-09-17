import { authRoles } from 'app/auth/authRoles';
import React from 'react';
// import { authRoles } from '../../auth/authRoles';

const PaymentManagementRoutes = [
    {
        path: '/payment-management',
        component: React.lazy(() => import('./PaymentManagement')),
        auth: authRoles.sa,
    },
   
]

export default PaymentManagementRoutes
