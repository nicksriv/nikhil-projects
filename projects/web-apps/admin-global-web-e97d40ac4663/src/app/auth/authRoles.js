export const authRoles = {
    v5_admin: ['Admin'], 
    client_admin: ['Client'],
    common: ['Admin', 'Client', 'User','QUALITY_ASSURANCE'],
    v5_and_client_admin: ['Admin','Client'],
    
    // Only SA & Admin has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];

// Check navigaitons.js

// {
//   name: "Dashboard",
//   path: "/dashboard/analytics",
//   icon: "dashboard",
//   auth: authRoles.admin <=================
// }
