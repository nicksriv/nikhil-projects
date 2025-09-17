import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Grid, Tabs, Tab, Typography } from '@material-ui/core';
import CustomiseOptions from './CustomiseOptions';
import ChartsView from './ChartsView';
import { setChartsView, setIsEditView, setInitialChartsState } from 'app/redux/ReportManagement/reportManagementSlice';
import { useSelector, useDispatch } from 'react-redux';

function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            className={classes.hideExtracolor}
        >
            {value === index && (
                <Box sx={{mt: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({

    customTabLabel: {
        color: '#fff', // Set your desired label color
      },

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '& .MuiPaper-elevation4': {
            boxShadow: 'none',
        },
        '& .MuiBox-root': {
            backgroundColor: '#f5f5f5',
        },
        '&. MuiBox-root-1275': {
            padding: '10px',
        },
        '& .MuiTabs-flexContainer .MuiButtonBase-root': {
            cursor: 'pointer',
            borderRadius: '35px',
            backgroundColor: '#ffffff',
            border: '  #0000001f',
            fontFamily: 'SF Pro Display',
            minHeight: '35px',
        },
        '& .Mui-selected': {
            backgroundColor: '#2C3E93 !important',
            color: '#000000de !important',
            fontSize: '14px !important',
            letterSpacing: '0.25px !important',
            fontWeight: '500',
            borderRadius: '35px !important',
            border: ' #2C3E93 !important',
            fontFamily: 'SF Pro Display',
        },
        '& .PrivateTabIndicator-colorPrimary-4': {
            display: 'none',
        },
        '&.MuiBox-root-4658': {
            padding: '5px',
        },
    },
    hideExtracolor: {
        backgroundColor: '#f5f5f5',
        overflow: 'auto'
    }
}))

export default function ScrollableTabsButtonAuto({ pageMode, configuredReportId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { charts, chartViewType } = useSelector((state) => state.report);

    const handleChange = () => {
        dispatch({
            type: setChartsView.type,
            payload: chartViewType === 0? 1: 0
        })

        if (chartViewType === 0) {
            dispatch({
                type: setIsEditView.type,
                payload: { chartId: '', isEditView: false }
            });
            dispatch({
                type: setInitialChartsState.type
            });
        }
    }

    const filteredCharts = charts.filter((chart) => chart.charts?.length > 0)

    const renderEmptyState = () => (
        <div align="center" className="m-10">
            <img
                src="/assets/images/No Data Illustration-disabled.svg"
                alt="empty-data"
                width="150"
            />
            <h4 className="mt-3">No Charts Available.</h4>
            <div className="mt-3" width="150">
                No charts have been created
            </div>
            <div>Please select columns and create your chart.</div>
        </div>
    )

    return (
        <Grid className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={chartViewType}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                >
                    {/* NOTE:- COMMENTED FOR FUTURE REFERENCE */}
                    {/* <Tab label="CHARTS" {...a11yProps(0)}  className={classes.customTabLabel}  style={{color:"#fff"}} /> */}
                    {/* <Tab disabled={pageMode === "view" ? true : false} label="CUSTOMISE" {...a11yProps(1)}  className={classes.customTabLabel} style={{color:"#000"}}/> */}
                </Tabs>
            </AppBar>
            <TabPanel value={chartViewType} index={0}>
                {filteredCharts.length > 0 ? <ChartsView reportId={configuredReportId}/> : renderEmptyState()}
            </TabPanel>
            <TabPanel value={chartViewType} index={1}>
                <CustomiseOptions />
            </TabPanel>
        </Grid>
    )
}
