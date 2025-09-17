import React from 'react'
import Source from './EditReports/Source'
import queryString from 'query-string'

import {
    getAllColumnsService,
    getClientRolesByIdService,
    getSavedTableHeadersService,
    postReportConfigService,
    saveSelectedColumn,
} from 'app/redux/ReportManagement/reportManagerService'
import { reportConfigParser, saveTableHeaders } from './Constants'
import EditTableHeaders from './EditReports/EditTableHeaders'
import history from 'helper/history'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'

const EditReportComponent = (props) => {
    const { reportData, parentModuleName, moduleData = {} } = props
    const [roles, setRoles] = React.useState([])
    const [selectedRoles, setSelectedRoles] = React.useState([])
    const [selectedSubmodules, setSelectedSubmodules] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [filterData, setFilterData] = React.useState([])
    const [statusData, setStatusData] = React.useState('')
    const [allColumns, setAllColumns] = React.useState([])
    const [savedTableHeaders, setSavedTableHeaders] = React.useState([])
    const [sourceSubmitError, setSourceSubmitEror] = React.useState('')
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await getAllRoles()
                setLoading(false)
            } catch (error) {
                // Handle errors if needed
                setLoading(false)
                console.error('Error fetching data:', error)
            }
        }

        fetchData() // Call the asynchronous function
        preSelectedRole()
        preSelectedSubmodules()
        preSelectedStatusAndFilters()
        getAllColumns()
        getSavedTableHeaders()
    }, [])

    const queryParams = queryString.parse(window.location.search)
    const id = queryParams?.id

    const preSelectedStatusAndFilters = () => {
        setStatusData(reportData?.status)
        setFilterData(reportData?.filter)
    }

    const preSelectedRole = () => {
        setLoading(true)
        if (reportData?.roles?.length) {
            const res = reportData?.roles.map((item) => {
                return item.role
            })

            setSelectedRoles(res)
            setLoading(false)
        }
    }

    const preSelectedSubmodules = () => {
        setLoading(true)
        if (reportData?.submoduleIds?.length) {
            const res = reportData?.submoduleIds.map((item) => {
                return item.name
            })

            setSelectedSubmodules(res)
            setLoading(false)
        }
    }

    const getAllRoles = async () => {
        setLoading(true)
        try {
            const clientId = localStorage.getItem('selectedClientLogo')
            const result = await getClientRolesByIdService(clientId)

            if (result?.roles.length) {
                setRoles(result?.roles)
            }
        } catch (error) {
            console.log('error fetching all roles', error)
        }
         finally{
            setLoading(false)
        }
    }

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event
        let ids = []
        roles.forEach((sm) => {
            if (value.indexOf(sm.name) !== -1) {
                ids.push(sm.id)
            }
        })
        setSelectedRoles(value)
    }

    const handleDeleteRole = () => {}

    const handleSubModuleIdChange = (event) => {
        const {
            target: { value },
        } = event
        setSelectedSubmodules(value)
    }

    const handleFilterAndStatusChange = (name, value) => {
        if (name === 'status') {
            setStatusData(value)
            return
        }

        const filterArray = [...filterData]

        if (filterArray.includes(value)) {
            filterArray.splice(filterArray.indexOf(value), 1)
        } else {
            filterArray.push(value)
        }
        setFilterData(filterArray)
    }

    const postReportConfig = async () => {
        if (!selectedSubmodules?.length) {
            setSourceSubmitEror('Please select submodule')
            return
        }
        let isCompleted = 0;
        try {
            setLoading(true)
            const queryParams = queryString.parse(window.location.search)
            const id = queryParams?.id
            const payload = reportConfigParser(
                reportData,
                roles,
                selectedRoles,
                selectedSubmodules,
                filterData,
                statusData,
                moduleData
            )
            await postReportConfigService(id, payload)
            isCompleted = 1;
        } catch (error) {
            isCompleted = -1;
            console.log('error', error)
        } finally {
            if (isCompleted === 1) {
                history.push(`/report/view?id=${id}`)
            }
            if (isCompleted === -1) {
                setSourceSubmitEror('')
            }
            setLoading(false)
        }
    }

    const getAllColumns = async () => {
        try {
            setLoading(true)
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
        }finally{
            setLoading(false)
        }
    }

    const getSavedTableHeaders = async () => {
        const queryParams = queryString.parse(window.location.search)
        const id = queryParams?.id
        setLoading(true)
        try {
            const res = await getSavedTableHeadersService(id)

            if (res?.customResponses.length) {
                const result = res?.customResponses.map((item) => item.name)
                setSavedTableHeaders(result)
            }
        } catch (error) {
            console.log('Error fetching saved table headers', error)
        }finally{
            setLoading(false)
        }
    }
    const handleTableHeadersChange = (event) => {
        const {
            target: { value },
        } = event

        setSavedTableHeaders(value)
    }

    const deleteSavedColumn = () => {}

    const submitTableHeaders = async () => {
        try {
            setLoading(true)
            const payload = saveTableHeaders(savedTableHeaders, allColumns)
            await saveSelectedColumn(id, payload)
            history.push(`/report/view?id=${id}`)
        } catch (error) {
            console.log('error in submitting table headers', error)
        }finally{
            setLoading(false)
        }
    }
    if (loading) {
        return <Loading style={{marginTop:"30px"}} />
    }
    return (
        <div>
            <h1>EDITT</h1>

            {reportData?.id ? (
                <Source
                    reportData={reportData}
                    parentModuleName={parentModuleName}
                    roles={roles}
                    handleRoleChange={handleRoleChange}
                    handleDeleteRole={handleDeleteRole}
                    moduleData={moduleData}
                    selectedRoles={selectedRoles}
                    selectedSubmodules={selectedSubmodules}
                    handleSubModuleIdChange={handleSubModuleIdChange}
                    postReportConfig={postReportConfig}
                    handleFilterAndStatusChange={handleFilterAndStatusChange}
                    filterData={filterData}
                    statusData={statusData}
                    sourceSubmitError={sourceSubmitError}
                />
            ) : null}

            {reportData?.submoduleIds?.length ? (
                <EditTableHeaders
                    allColumns={allColumns}
                    selectedSavedColumns={savedTableHeaders}
                    handleTableHeadersChange={handleTableHeadersChange}
                    deleteSavedColumn={deleteSavedColumn}
                    submitTableHeaders={submitTableHeaders}
                />
            ) : null}
        </div>
    )
}

export default EditReportComponent
