import { Box, Grid, SwipeableDrawer, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import Tabs from './Tabs'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
    drawerStyle: {
        '& .MuiDrawer-paperAnchorRight': {
            background: '#F5F5F5 0% 0% no-repeat padding-box',
            boxShadow: '-2px 4px 12px #00000029',
            width: '85% !important',
            opacity: 1,
            padding: '0px',
        },
    },
    chartViewWrapper: {
        padding: '15px'
    },
    chartViewHeader: {
        fontSize: '16px',
        letterSpacing: '0.14px',
        lineHeight: '24px',
        color: '#000000DE',
        fontWeight: 500,
        fontFamily: 'SF Pro Display',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    closeBtn: {
        cursor: 'pointer',
    },
    chartViewBody: {
        marginTop: '10px',
    },
}))

function MainLayout({ IsOpen, handleClose, pageMode,reportId }) {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const { chartViewType,  configuredReportId } = useSelector((state) => state.report)

    // useEffect(() => {
    //         dispatch({
    //             type: 'getAllChartsDataAction',
    //             reportConfigurationId: configuredReportId,
    //         })
    // }, []);

    // useEffect(()=> {
    //     if (chartViewType === 0) {
    //         dispatch({
    //             type: 'getAllChartsDataAction',
    //             reportConfigurationId: configuredReportId,
    //         })
    //     }
    // }, []);

    const chartViewBody = () => {
        return (
            <Box
                className={classes.chartViewBody}
                sx={{ width: 'auto' }}
                role="presentation"
            >
                <Tabs pageMode={pageMode} configuredReportId={reportId}/>
            </Box>
        )
    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={IsOpen}
            onClose={() => handleClose()}
            onOpen={() => setOpen(true)}
            className={classes.drawerStyle}
        >
            <Grid className={classes.chartViewWrapper}>
                <Grid className={classes.chartViewHeader}>
                    <Typography style={{fontSize:"20px"}}>Charts Preview</Typography>
                    <Grid
                        className={classes.closeBtn}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon />
                    </Grid>
                </Grid>
                {chartViewBody()}
            </Grid>
        </SwipeableDrawer>
    )
}

export default MainLayout
