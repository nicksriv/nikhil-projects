import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'home',
    },
    {
        name: 'Client Management',
        path: '/client-management',
        icon: 'person',
        auth: authRoles.v5_admin,
    },
    {
        name: 'Vendor Management',
        path: '/vendor-management',
        icon: 'assignment_ind',
        auth: authRoles.v5_admin,
    },
    // {
    //     name: 'Vendor Registration',
    //     path: '/vendor-registration',
    //     icon: 'people',
    //     auth: authRoles.v5_admin
    // },
    {
        name: 'User Management',
        path: '/user-management',
        icon: 'manage_accounts_icon',
        auth: authRoles.common,
    },
    {
        name: 'Job Management',
        path: '/job-management',
        icon: 'manage_search',
        auth: authRoles.common,
    },
    {
        name: 'Freelancer Management',
        path: '/freelancer-management',
        icon: 'people',
        auth: authRoles.v5_admin,
    },
    {
        name: 'Dispute Management',
        path: '/dispute-management',
        icon: 'dangerous_icon',
        auth: authRoles.v5_and_client_admin,
    },
    {
        name: 'QA Management',
        path: '/qualityassurance-management',
        icon: 'gpp_good_icon',
        auth: authRoles.v5_admin,
    },
    {
        name: 'Screen Builder',
        path: '/screen-builder',
        icon: 'handyman',
        auth: authRoles.common,
    },
    {
        name: 'Role Management',
        path: '/role-management',
        icon: 'campaign',
        auth: authRoles.common,
    },
    {
        name: 'Site Management',
        path: '/site-management',
        icon: 'add_business',
        auth: authRoles.common,
    },
    // {
    //     name: 'Attendance',
    //     icon: 'event_note',
    //     auth: authRoles.common,
    //     children: [
    //         {
    //             name: 'My Attendance',
    //             path: '#',
    //             icon: 'event_note',
    //             type: 'children',
    //             auth: authRoles.common
    //         },
    //         {
    //             name: 'Team Attendence',
    //             path: '#',
    //             icon: 'event_note',
    //             type: 'children',
    //             auth: authRoles.common
    //         }
    //     ]
    // },
    {
        name: 'Theme Management',
        icon: 'event_note',
        path: '/theme-management',
        auth: authRoles.common,
    },

    // , {
    //     name: 'User Profile',
    //     path: '/user-profile',
    //     icon: 'campaign'
    // },
    {
        name: 'Module Report',
        path: '/configure-report',
        icon: 'find_in_page',
        auth: authRoles.common,
    },
    {
        name: 'Payment',
        path: '/payment-management',
        icon: 'people',
        auth: authRoles.common,
    },

    // {
    //     name: 'Vender Management',
    //     path: '/vender-management',
    //     icon: 'scatter_plot'
    // },
    // {
    //     name: 'Mystery Audit',
    //     path: '/mystery-audit',
    //     icon: 'content_paste_search'
    // },
    // {
    //     name: 'Freelance Merchendising',
    //     path: '/freelance-merchandising',
    //     icon: 'campaign'
    // }, {
    //     name: 'Market Activation',
    //     path: '/market-activation',
    //     icon: 'home_work'
    // }, {
    //     name: 'Settings',
    //     path: '/settings',
    //     icon: 'settings'
    // }
]
