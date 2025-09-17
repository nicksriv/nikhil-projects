import React from 'react'

import { authRoles } from 'app/auth/authRoles'

const vendorManagementRoutes = [
    {
        path: '/vendor-management',
        component: React.lazy(() => import('./VendorManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/vendor/vendorDetails/:id',
        component: React.lazy(() => import('./VendorDetails')),
        auth: authRoles.sa,
    },
    {
        path: '/vendor/vendorEdit/:id',
        component: React.lazy(() => import('./EditVendor')),
        auth: authRoles.sa,
    },
    {
        path: '/vendor/vendorAdd',
        component: React.lazy(() => import('./AddVendor')),
        auth: authRoles.sa,
    },
]

export default vendorManagementRoutes
