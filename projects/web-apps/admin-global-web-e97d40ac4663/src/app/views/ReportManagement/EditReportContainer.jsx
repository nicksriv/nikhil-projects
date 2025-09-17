/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import history from 'helper/history.js'
import queryString from 'query-string'

import {
    getClientModulesService,
    getConfiguredReportByIdService,
    getReportColumnsService,
    getSavedTableHeadersService,
} from 'app/redux/ReportManagement/reportManagerService'
import EditReportComponent from './EditReportComponent'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'


function ViewReportContainer(props) {
    const useStyles = makeStyles(() => ({
        stickyHeader: {
            position: 'fixed',
            top: '5rem',
            backgroundColor: '#f5f5f5',
            zIndex: '100',
            width: '78%',
        },
    }))

    const classes = useStyles()
    const [parentModuleName, setParentModuleName] = React.useState('')
    const [reportData, setReportData] = React.useState({})
    const [savedTableHeaders, setSavedTableHeaders] = React.useState([])
    const [moduleData, setModuleData] = React.useState([])
    const [moduleColumns, setModuleColumns] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const queryParams = queryString.parse(window.location.search)
    const id = queryParams?.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCurrentReportData()
                await getSavedTableHeaders()
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData() // Call the asynchronous function
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await getAllParentModules(reportData.parentModuleId)
                if (reportData.submoduleIds.length) {
                    getModuleColumns()
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
            }
        }

        if (reportData.parentModuleId) {
            fetchData()
        }
    }, [reportData.parentModuleId])

    const getModuleColumns = async () => {
        const subModules = reportData?.submoduleIds?.length
            ? reportData?.submoduleIds?.map((item) => item?.id)
            : []

        const payload = {
            moduleId: reportData.parentModuleId,
            submoduleIds: subModules,
        }
        try {
            setLoading(true)
            const res = await getReportColumnsService(payload)
            setModuleColumns(res?.columns)
        } catch (error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }
    }

    const getCurrentReportData = async () => {
        try {
            setLoading(true)
            const parsedQS = queryString.parse(window.location.search)
            const result = await getConfiguredReportByIdService(parsedQS?.id)

            if (result) {
                setReportData(result)
            }
        } catch (error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }
    }
    const getAllParentModules = async (id) => {
        const clientId = localStorage.getItem('selectedClientLogo')
        const data = { clientId }

        try {
            setLoading(true)
            const result = await getClientModulesService(data)

            if (result && result.modules.length) {
                result.modules.forEach((item, idx) => {
                    if (item?.id === id) {
                        setModuleData(item)
                        setParentModuleName(item.name)
                    }
                })
            }
        } catch (error) {
            console.log('getAllParentModules error', error)
        }finally{
            setLoading(false)
        }
    }
    const getSavedTableHeaders = async () => {
        try {
            setLoading(true)
            const res = await getSavedTableHeadersService(id)
            if (res?.customResponses.length) {
                setSavedTableHeaders(res?.customResponses)
            }
        } catch (error) {
            console.log('Error fetching saved table headers', error)
        }finally{
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/report/view?id=${id}`)
    }

    const renderHeaderSection = () => {
        return (
            <>
                {/* Sticky header */}
                <Grid className={classes.stickyHeader}>
                    {/* Screen Title Header */}
                    <Grid className="flex justify-between items-center pt-2">
                        <Grid className="flex">
                            <ArrowBackIcon
                                onClick={handleBack}
                                className="cursor-pointer mt-2 text-light-gray"
                            />
                            <h1 className="ml-10px h1">Edit Module Report</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }

    if (loading) {
        return <Loading style={{marginTop:"30px"}} />
    }

    return (
        <>
            {renderHeaderSection()}

            <EditReportComponent
                reportData={reportData}
                parentModuleName={parentModuleName}
                savedTableHeaders={savedTableHeaders}
                moduleColumns={moduleColumns}
                moduleData={moduleData}
            />
        </>
    )
}

export default React.memo(ViewReportContainer)
