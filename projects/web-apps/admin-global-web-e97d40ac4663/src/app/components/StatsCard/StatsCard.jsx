import React from 'react'
import { Grid } from '@material-ui/core'
import { Card, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

function StatsCard({ data, cardDetails }) {
    return (
        <>
            <Grid container spacing={2} style={{ textAlign: 'left' }}>
                {data.map((d) => {
                    return (
                        <Grid item xs={12} sm={6} md={3}>
                            <Card elevation={6} className="p-4 px-6 m-4">
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                fontSize: '1.9rem',
                                                marginRight: 4,
                                                color: '#BDBDBD',
                                            }}
                                        >
                                            {d.icon}
                                        </Icon>
                                        <Typography
                                            variant="p"
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '2rem',
                                            }}
                                        >
                                            {d.render(cardDetails)}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="p"
                                        style={{
                                            display: 'block',
                                        }}
                                    >
                                        {d.label}
                                    </Typography>
                                </>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default StatsCard
