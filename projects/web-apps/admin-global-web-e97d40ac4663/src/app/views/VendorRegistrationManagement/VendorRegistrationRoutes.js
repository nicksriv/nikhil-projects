
import React from 'react'

import { authRoles } from 'app/auth/authRoles'

const vendorRegistrationRoutes = [
    {
        path: '/vendor-registration',
        component: React.lazy(() => import('./VendorRegistration')),
        auth: authRoles.sa,
    }

]

export default vendorRegistrationRoutes