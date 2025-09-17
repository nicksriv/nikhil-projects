import React, { useEffect, useRef, useState } from 'react'
import {
    Grid,

} from '@material-ui/core'
import { Card, Typography } from '@material-ui/core'

const statsLabelConfig = [
    { key: 'totalMoneyEarned', label: "Total Money Earned" },
    { key: 'totalCompletedJobs', label: "Completed Jobs" },
    { key: 'totalInprogressJobs', label: "In Progress Jobs" },
    { key: 'totalJobs', label: "Total Jobs" },
    { key: 'totalCancelJobs', label: "Cancelled Jobs" },
    { key: 'amountPaid', label: "Amount Paid" },
    { key: 'pendingAmount', label: "Pending Amount" },
    { key: 'totalDisputes', label: "Disputes Raised" },
]
function FreelancerStatsCard(props) {
    const { freelancerStatsJobs } = props
    return (
        <>
            <Grid container spacing={2} style={{ textAlign: "center" }}>
                {
                    Object.keys(freelancerStatsJobs).map(function (key, value) {
                        return <Grid item xs={12} sm={6} md={3}>
                            <Card elevation={6} className="p-5 m-4">
                                {
                                    statsLabelConfig.map((statslabel, i) => {
                                        if (statslabel.key === key) {
                                            return <Typography
                                                variant="p"
                                                style={{
                                                    fontWeight: 'bold',
                                                    display: 'block',
                                                    marginBottom: '0.7rem'
                                                }}
                                            >
                                                {statslabel.label}
                                            </Typography>
                                        }
                                    })
                                }
                                <Typography variant="p">
                                    {freelancerStatsJobs[key]}
                                </Typography>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}

export default FreelancerStatsCard