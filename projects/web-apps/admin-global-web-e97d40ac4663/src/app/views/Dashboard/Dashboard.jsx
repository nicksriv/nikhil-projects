import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StatCards from './components/StatCards'
import StatCards2 from './components/StatCards2'
import { Grid, Paper, Divider, MenuItem, Tooltip, TextField, Card } from '@material-ui/core'
import StatCard from './components/StatCard'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import { convertDate } from 'app/views/utilities/DateFormat';
import { capitalizeFirstLetter } from 'helper/utils'

// import { useTheme } from '@material-ui/styles';
// import { ConfirmationDialog } from 'app/components';

function Dashboard() {
    const dispatch = useDispatch()
    const [dashboardStatsData, setDashboardStatsData] = useState([]);
    const { dashboardStats = {}, dashboardJobStats = {}, loading } = useSelector((state) => state.dashboard)
    const { login } = dashboardStats;
    const user = localStorage.getItem('typeOfUser') === "Admin"
    const userType = localStorage.getItem('typeOfUser')
    const qaName = localStorage.getItem('qaName')
    const parsedQaName = JSON.parse(qaName)
    const {
        userProfileDetails: { fullName, firstName, lastName },
    } = useSelector((state) => state.profile)
    // const {
    //     dashboardStats={},lastLoginInfo

    // } = useSelector((state) => state.dashboard)
    // useEffect(() => {
    //     dispatch({
    //         type: 'getDashboardDataAction',
    //     })
    //     dispatch({
    //         type: 'getStatisticsAction',
    //         payload: '',
    //     })
    // }, [])


    useEffect(() => {
        dispatch({
            type: "getDashboardStatsAction"
        });
        dispatch({
            type: "getDashboardJobStatsAction"
        });

    }, [])

    useEffect(() => {
        if (localStorage.getItem('typeOfUser') === "Admin") {
            setDashboardStatsData([
                {
                    label: "Clients",
                    value: dashboardStats?.clientsCount
                },

                {
                    label: "QA",
                    value: dashboardJobStats?.totalQualityAssurances
                },
                {
                    label: "Vendors",
                    value: dashboardJobStats?.totalVendors
                },
                {
                    label: "Freelancers",
                    value: dashboardJobStats?.totalFreelancers
                },
                {
                    label: "Total Jobs",
                    value: dashboardJobStats?.totalJobs
                },
                {
                    label: "New Jobs",
                    value: dashboardJobStats?.totalNewJobs
                },
                {
                    label: "Completed Jobs",
                    value: dashboardJobStats?.totalCompletedJobs
                },
                {
                    label: "Ongoing Jobs",
                    value: dashboardJobStats?.totalOngoingJobs
                },
                {
                    label: "Total Amount",
                    value: dashboardJobStats?.totalEarned
                },

                {
                    label: "Amount Paid",
                    value: dashboardJobStats?.totalAmountPaid
                },
                {
                    label: "Amount to Pay",
                    value: dashboardJobStats?.totalPendingAmount
                },
                {
                    label: "Disputes",
                    value: dashboardJobStats?.totalDisputes
                },
            ]);
        }

        if (localStorage.getItem('typeOfUser') === "Client") {
            setDashboardStatsData([
                {
                    label: "Total Jobs",
                    value: dashboardJobStats?.totalJobs
                },
                {
                    label: "New Jobs",
                    value: dashboardJobStats?.totalNewJobs
                },
                {
                    label: "Completed Jobs",
                    value: dashboardJobStats?.totalCompletedJobs
                },
                {
                    label: "Ongoing Jobs",
                    value: dashboardJobStats?.totalOngoingJobs
                },
                {
                    label: "Total Amount",
                    value: dashboardJobStats?.totalEarned
                },

                {
                    label: "Amount Paid",
                    value: dashboardJobStats?.totalAmountPaid
                },
                {
                    label: "Amount to Pay",
                    value: dashboardJobStats?.totalPendingAmount
                },
                {
                    label: "Disputes",
                    value: dashboardJobStats?.totalDisputes
                },
            ]);
        }
        if (localStorage.getItem('typeOfUser') === "QUALITY_ASSURANCE") {
            setDashboardStatsData([
                {
                    label: "Clients",
                    value: dashboardJobStats?.totalClients
                },
                {
                    label: "Job Assigned",
                    value: dashboardJobStats?.totalJobsAssigned
                },
                {
                    label: "Job Approved",
                    value: dashboardJobStats?.totalJobsApproved
                },
                {
                    label: "Job InProgress",
                    value: dashboardJobStats?.totalJobsInprogress
                }
            ]);
        }

    }, [dashboardStats, dashboardJobStats])


        if ( !Object.keys(dashboardJobStats).length) {
        return <Loading />
        }
    // if (!Object.keys(dashboardStats).length || !Object.keys(dashboardJobStats).length) {
    //     return <Loading />
    // }
    
    
    return (

        <div style={{ width: "97%" }} >
            <Fragment>
                {/* <div className="analytics m-sm-30 mt-3">
                    <StatCards /> 
                     <StatCards2 />
                </div> */}
                <Grid container className='mx-4'>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <p style={{ fontSize: '1.4rem' }}>Welcome back,<span style={{ fontWeight: '550' }}>{userType === 'QUALITY_ASSURANCE' ? capitalizeFirstLetter(parsedQaName?.firstName + parsedQaName?.lastName) : capitalizeFirstLetter(fullName ? fullName : `${firstName} ${lastName}`)}</span></p>
                        <p style={{}}>Last Login : {new Date(dashboardStats?.login?.time).toDateString()} , {new Date(dashboardStats?.login?.time).toLocaleTimeString()}
                        </p>

                    </Grid>
                </Grid>
                {
                    (userType!== "QUALITY_ASSURANCE") ? 
                
                <Grid container className='mx-1' spacing={4}>
                    {dashboardStatsData.map((statData, i) => {
                        return <StatCard label={statData.label} value={statData.value ? statData.value : 0} />
                    })

                    }

                </Grid> : null}
                {
                    (userType === "QUALITY_ASSURANCE") ?
                           
                            <Grid container className='mx-1' spacing={4}>
                                {dashboardStatsData.map((statData, i) => {

                                    return <StatCard label={statData.label} value={statData.value ? statData.value : 0} />
                                })

                                }

                            </Grid>
                        : null
                }
            </Fragment>
        </div>
    )
}

export default Dashboard
