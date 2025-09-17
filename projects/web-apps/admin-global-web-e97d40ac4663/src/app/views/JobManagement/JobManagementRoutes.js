import React from 'react'
import { authRoles } from '../../auth/authRoles'

const jobManagementRoutes = [
    {
        path: '/job/:jobId/candidateDetails/:id/module/:mid/subModules',
        component: React.lazy(() => import('./WorkFlowModules')),
        auth: authRoles.sa,
    },
    {
        path: '/job-management',
        component: React.lazy(() => import('./JobManagement')),
        auth: authRoles.sa,
    },
    {
        path: '/job/jobDetails/:id',
        component: React.lazy(() => import('./JobDetails')),
        auth: authRoles.sa,
    },
    {
        path: '/job/add',
        component: React.lazy(() => import('./AddJob')),
        auth: authRoles.sa,
    },
    {
        path: '/job/editJob/:id',
        component: React.lazy(() => import('./EditJob')),
        auth: authRoles.sa,
    },
    {
        path: '/job/applicant-list/:id',
        component: React.lazy(() => import('./JobApplicant/JobApplicantList')),
        auth: authRoles.sa,
    },
    {
        path: '/job/:jobId/applicantDetails/:id',
        component: React.lazy(() =>
            import('./JobApplicant/JobApplicantDetails')
        ),
        auth: authRoles.sa,
    },
    {
        path: '/job/candidate-list/:id',
        component: React.lazy(() => import('./JobCandidate/JobCandidateList')),
        auth: authRoles.sa,
    },
    {
        path: '/job/:jobId/candidateDetails/:id',
        component: React.lazy(() =>
            import('./JobCandidate/JobCandidateDetails')
        ),
        auth: authRoles.sa,
    },
]

export default jobManagementRoutes
