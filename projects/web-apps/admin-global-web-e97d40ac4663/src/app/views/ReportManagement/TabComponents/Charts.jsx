import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Drawer, Grid, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import clsx from 'clsx'

import CustomiseOptions from '../components/chart-editor/CustomiseOptions'
import MainLayout from '../components/chart-editor/MainLayout'
import chartsDummyData from './chartsDummyData'
import ChartsList from 'app/views/UserManagement/components/ChartsList'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'
import { V5GlobalHeaderActionList } from 'app/components'

import { getAllColumnsService } from 'app/redux/ReportManagement/reportManagerService'
import {
    setCustomChartValues,
    setSelectedChartId,
} from 'app/redux/ReportManagement/reportManagementSlice'

const drawerWidth = 310

const SidebarDrawer = ({
    open,
    handleDrawerClose,
    headerText,
    classes,
    reportData,
    handleChange,
    allColumns,
    reportId,
    handleEdit,
    currentChartID,
    editChartView,
    handleSubmit
}) => {
    return (
        <Drawer
            className={`${classes.drawer} w-full`}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true,
            }}
            width={600}
        >
            <Grid className={clsx('flex-column ', classes.miniCart)}>
                <div className="cart__topbar flex justify-between items-center p-1 mb-10 pl-4">
                    <h5
                        className={`my-0 font-medium`}
                        style={{ color: '#fff' }}
                    >
                        {headerText}
                    </h5>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon className={classes.close} />
                    </IconButton>
                </div>
            </Grid>
            <Box sx={{ m: 3 }}>
                <CustomiseOptions
                    currentChartID={currentChartID}
                    allColumns={allColumns}
                    handleChange={handleChange}
                    reportData={reportData}
                    reportId={reportId}
                    handleEdit={handleEdit}
                    editChartView={editChartView}
                    handleDrawerClose={handleDrawerClose}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Drawer>
    )
}

const ChartsPreviewSidebar = ({
    open,
    handleDrawerClose,
    headerText,
    classes,
    reportId,
}) => {
    return (
        <Drawer
            className={`${classes.drawer} w-full`}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true,
            }}
            width={600}
        >
            <Grid className={clsx('flex-column ', classes.miniCart)}>
                <div className="cart__topbar flex justify-between items-center p-1 mb-10 pl-4">
                    <h5
                        className={`my-0 font-medium`}
                        style={{ color: '#fff' }}
                    >
                        {headerText}
                    </h5>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon className={classes.close} />
                    </IconButton>
                </div>
            </Grid>
            <Box sx={{ m: 3 }}>
                <MainLayout
                    IsOpen={open}
                    reportId={reportId}
                    pageMode="edit"
                    handleClose={handleDrawerClose}
                />
            </Box>
        </Drawer>
    )
}

const Charts = ({ reportData}) => {
    const [sideDrawer, setSidebarDrawer] = React.useState(false)
    const [chartData, setChartData] = React.useState([])
    const [allColumns, setAllColumns] = React.useState([])
    const [editChartView, setEditChartView] = React.useState(false)
    const [currentChartID, setCurrentChartID] = React.useState('')
    const [chartPreview, setChartPreview] = React.useState(false)

    const queryParams = queryString.parse(window.location.search)
    const id = queryParams?.id

    const { charts,customChartData } = useSelector((state) => state.report)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllColumns()
            } catch (error) {
                console.log("error",error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        dispatch({
            type: 'getAllChartsDataAction',
            reportConfigurationId: id,
        })
    }, [])

    useEffect(() => {
        getChartData()
    }, [charts])


    const handleSubmit = () => {
        let data = {...customChartData}
        data.reportConfigurationId = id
        if(editChartView) {
            dispatch({
                type: 'updateChartDataAction',
                payload: { data, chartId: currentChartID },
            })
        } else {
            dispatch({
                type: 'saveCustomChartAction',
                payload: { data },
            })
        } 

        dispatch({
            type: 'getAllChartsDataAction',
            reportConfigurationId: id,
        })
        setSidebarDrawer(false)

    }


    const handleSidebar = (value) => {
        setSidebarDrawer(value)
        const data = {
            filters: [],
            name: '',
            reportConfigurationId: '',
            showOnDesktop: false,
            switchRowsAndcolumns: false,
            type: '',
            xAxis: '',
            yAxis: '',
        }

        if (value === false) {
            dispatch({
                type: setCustomChartValues,
                payload: data,
            })
            setCurrentChartID('')
        }
    }

    const getAllColumns = async () => {
        try {
            const payload = {
                moduleId: reportData?.parentModuleId,
                submoduleIds: reportData?.submoduleIds,
            }
            const res = await getAllColumnsService(id, payload)
            if (res?.customResponses.length) {
                setAllColumns(res?.customResponses)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const useStyles = makeStyles(() => ({
        drawer: {
            width: drawerWidth,
        },
        miniCart: {
            width: '100%',
            '& .cart__topbar': {
                height: 'var(--topbar-height)',
                backgroundColor: '#2C3E93',
                color: '#000000DE',
            },
            '& .mini-cart__item': {
                transition: 'background 300ms ease',
                '&:hover': {
                    background: 'rgba(0,0,0,0.01)',
                },
            },
        },
        font: {
            fontSize: '1.1rem',
        },
        close: {
            color: '#00000099',
        },
        button0: {
            border: '1px solid #2C3E93',
            width: '152px',
            height: '35px',
            marginTop: '55px',
            marginLeft: '25px',
            marginBottom: '80px',
        },
        button1: {
            backgroundColor: '#2C3E93',
            width: '152px',
            height: '35px',
            marginTop: '55px',
            marginLeft: '25px',
            marginBottom: '80px',
        },
    }))

    const getChartData = () => {
        const result = charts.map((item) => {
            return {
                chartName: item.name,
                chartType:item?.type.split("_").join(" "),
                xAxis: item.xAxis.hint || '',
                yAxis: item.yAxis.hint || '',
            }
        })
        setChartData(result)
    }

    const classes = useStyles()

    const handleDelete = (value) => {
        console.log('value', value)
    }

    const handleEdit = (value) => {
        setEditChartView(true)
        const filteredData = charts.find(
            (item) => item.name === value.chartName
        )

        const data = {
            filters: filteredData?.filters,
            name: filteredData.name,
            reportConfigurationId: id,
            showOnDesktop: filteredData.showOnDesktop,
            switchRowsAndcolumns: filteredData.switchRowsAndColumns,
            type: filteredData?.type,
            xAxis: filteredData.xAxis?.componentId,
            yAxis: filteredData.yAxis?.componentId,
        }

        setCurrentChartID(filteredData?.id)
        dispatch({
            type: setCustomChartValues,
            payload: data,
        })

        setSidebarDrawer(true)
    }

    const openChartsPreview = (data) => {
        const filteredData = charts.find((item) => item.name === data.chartName)

        dispatch({
            type: setSelectedChartId,
            payload: filteredData?.id,
        })

        setChartPreview(true)
    }

    const closeChartsPreview = () => {
        setChartPreview(false)
    }

    return (
        <div>
                <BackgroundCard
                    contentStyle={{ padding: 0 }}
                    headerContainerStyle={{
                        marginBottom: '-77px',
                        marginLeft: '15px',
                    }}
                    title={'Charts List'}
                >
                    <V5GlobalHeaderActionList
                        title={'Charts List'}
                        onlyIcons={true}
                        style={{
                            marginBottom: '-76px',
                            position: 'absolute',
                            right: 10,
                        }}
                        iconsList={[
                            {
                                iconType: 'note_add',
                                tooltipTitle: 'Create custom columns',
                                areaLabel: 'Create new chart',
                                iconComponent: 'span',
                                iconClickHandler: () => setSidebarDrawer(true),
                            },
                        ]}
                    />

                    {!chartData?.length ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px 0',
                            }}
                        >
                            <h3>No data Available</h3>
                        </div>
                    ) : (
                        <ChartsList
                            indexOfFirstData={chartsDummyData.indexOfFirstData}
                            indexOfLastData={chartsDummyData.indexOfLastData}
                            paginate={chartsDummyData.paginate}
                            heading={chartsDummyData.userTableHeaders}
                            pageSize={chartsDummyData.pageSize}
                            pageNumber={chartsDummyData.pageNumber}
                            tableData={chartData}
                            setPageSize={() => {}}
                            totalItems={chartsDummyData.pageSize}
                            filterDetails={chartsDummyData.filterDetails}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleInfo={openChartsPreview}
                        />
                    )}
                </BackgroundCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    p: 1,
                    m: 1,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 1,
                }}
            ></Box>

            <SidebarDrawer
                open={sideDrawer}
                handleDrawerClose={() => {
                    handleSidebar(false)
                    editChartView(false)
                }}
                headerText="Create Chart"
                outlinedBtnText="Cancel"
                solidBtnText="Create"
                buttonDisabled={false}
                actionButtons={false}
                reportData={reportData}
                classes={classes}
                allColumns={allColumns}
                reportId={id}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                editChartView={editChartView}
                currentChartID={currentChartID}
            />

            <ChartsPreviewSidebar
                reportId={id}
                headerText="Chart Preview"
                classes={classes}
                open={chartPreview}
                handleDrawerClose={closeChartsPreview}
            />
        </div>
    )
}

export default Charts
