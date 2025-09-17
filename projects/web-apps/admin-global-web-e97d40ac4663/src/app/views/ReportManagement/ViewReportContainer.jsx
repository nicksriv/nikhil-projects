/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import history from 'helper/history.js'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import { setLoader } from 'app/redux/JobManagement/JobManagementSlice'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import { useDispatch, useSelector } from 'react-redux'

import {
    getClientModulesService,
    getConfiguredReportByIdService,
    getReportColumnsService,
    getSavedTableHeadersService,
} from 'app/redux/ReportManagement/reportManagerService'
import ViewReportComponent from './ViewReportComponent'

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
    const dispatch = useDispatch()
    const classes = useStyles()
    const [parentModuleName, setParentModuleName] = React.useState('')
    const [reportData, setReportData] = React.useState({})
    const [savedTableHeaders, setSavedTableHeaders] = React.useState([])
    const [moduleData, setModuleData] = React.useState([])
    const [moduleColumns, setModuleColumns] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const location = useLocation();
  
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
            try {
                await getAllParentModules(reportData.parentModuleId)
                if (reportData.submoduleIds.length) {
                    getModuleColumns()
                }
            } catch (error) {
                console.error('Error fetching data:', error)
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
            dispatch(setLoader(0))
        } catch (error) {
            console.log('error', error)
            dispatch(setLoader(0))
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
            dispatch(setLoader(0))
        } catch (error) {
            console.log('getAllParentModules error', error)
            dispatch(setLoader(0))
        }finally{
            setLoading(false)
        }
    }


    const getSavedTableHeaders = async () => {
        const queryParams = queryString.parse(window.location.search)
        const id = queryParams?.id
        try {
            setLoading(true)
            const res = await getSavedTableHeadersService(id)
            if (res?.customResponses.length) {
                setSavedTableHeaders(res?.customResponses)
            }
        } catch (error) {
            console.log('Error fetching saved table headers', error)
        }finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push('/configure-report')
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
                            <h1 className="ml-10px h1">
                                View Module
                                Report
                            </h1>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <>
            {renderHeaderSection()}
            {loading ? (
                <Loading />
            ) : (
                <ViewReportComponent
                    reportData={reportData}
                    parentModuleName={parentModuleName}
                    savedTableHeaders={savedTableHeaders}
                    moduleColumns={moduleColumns}
                />
            )}
        </>
    )
}

export default React.memo(ViewReportContainer)
