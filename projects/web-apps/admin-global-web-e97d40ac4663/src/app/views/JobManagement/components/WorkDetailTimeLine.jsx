import React from 'react'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import { Tooltip, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

export default function WorkDetailTimeLine({ data }) {
    const useStyles = makeStyles(() => ({
        missingOppositeContent: {
            '&:before': {
                display: 'none',
            },
        },
    }))
    const classes = useStyles()

    return (
        <>
            <Timeline position="left">
                {data && data.length
                    ? data.map((d, index) => {
                          return (
                              <TimelineItem
                                  classes={{
                                      missingOppositeContent:
                                          classes.missingOppositeContent,
                                  }}
                              >
                                  <TimelineSeparator>
                                      <TimelineDot />
                                      <TimelineConnector />
                                  </TimelineSeparator>
                                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                                      <Typography
                                          variant="subtitle2"
                                          style={{ fontWeight: 'bold' }}
                                      >
                                          {d.designation}
                                      </Typography>
                                      <Typography variant="body1">
                                          {d.company}
                                      </Typography>
                                      <Typography
                                          variant="caption"
                                          color="text.secondary"
                                      >
                                          {d.startDate} -
                                      </Typography>
                                      <Typography
                                          variant="caption"
                                          color="text.secondary"
                                      >
                                          {' '}
                                          {d.endDate}
                                      </Typography>

                                      <Tooltip title={d.workDescription}>
                                          <Typography
                                              variant="subtitle2"
                                              color="text.secondary"
                                          >
                                              {d.workDescription}
                                          </Typography>
                                      </Tooltip>
                                  </TimelineContent>
                              </TimelineItem>
                          )
                      })
                    : null}
            </Timeline>
        </>
    )
}
