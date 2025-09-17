import React, { useState, useEffect } from 'react'
import { Grid, Paper, Divider, MenuItem, Tooltip, TextField,Card } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import SecurityIcon from '@material-ui/icons/Security'
import InfoIcon from '@material-ui/icons/Info'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import UserAvatar from './UserAvatar'


const StatCard = ({label,value}) => {
    return (
        <>
        <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card style={{textAlign:'center',width:"100%",padding:'1rem 0rem'}}>
            <p style={{fontSize:"1rem",fontWeight:"550"}}>{value}</p>
            <p style={{fontSize:"1rem"}}>{label}</p>
            </Card>
        </Grid>
        </>
    )

}

export default StatCard;