import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const DetailsCard = (props) => {
    const {
        data,
        basicDetails,
        cardDetails,
        deliverables = [],
        highlights = [],
        handleJobDescriptionDialog,
    } = props
    if (basicDetails) {
        return (
            <>
                <div>
                    {data.map((b, i) => {
                        return (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Typography
                                        className="my-1"
                                        variant="p"
                                        style={{
                                            fontWeight: 'bold',
                                            minWidth: '180px',
                                        }}
                                    >
                                        {b.label}
                                    </Typography>
                                    <Typography variant="p" className="ml-2">
                                        {b.render(cardDetails)}
                                    </Typography>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Typography
                        variant="p"
                        style={{
                            fontWeight: 'bold',
                            minWidth: '180px',
                        }}
                    >
                        Job Description:
                    </Typography>
                    <Button
                        style={{
                            textDecoration: 'underline',
                            color: 'blue',
                            fontSize: 12,
                            justifyContent: 'flex-start',
                        }}
                        variant="text"
                        size="small"
                        onClick={() => handleJobDescriptionDialog()}
                    >
                        View
                    </Button>
                </div>
                <div>
                    <Typography
                        variant="p"
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        HighLights
                    </Typography>

                    <ul className="mx- '-14px'">
                        {highlights && highlights.length
                            ? highlights.map((d, i) => {
                                  return <li>{d}</li>
                              })
                            : null}
                    </ul>
                </div>
                <div>
                    <Typography
                        variant="p"
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        Deliverables
                    </Typography>

                    <ul>
                        {deliverables && deliverables.length
                            ? deliverables.map((d, i) => {
                                  return <li>{d}</li>
                              })
                            : null}
                    </ul>
                </div>
            </>
        )
    } else
        return (
            <Grid container spacing={1}>
                {data.map((b, i) => {
                    return (
                        <>
                            <Grid item xs={12} sm={6} lg={6}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexFlow: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="p"
                                        className="my-1"
                                        style={{
                                            fontWeight: 'bold',
                                            minWidth: '180px',
                                        }}
                                    >
                                        {b.label}
                                    </Typography>
                                    <Typography variant="p" className="ml-1">
                                        {/* {b.value} */}
                                        {b.render(cardDetails)}
                                    </Typography>
                                </div>
                            </Grid>
                
                        </>
                    )
                })}
            </Grid>
        )
}

export default DetailsCard
