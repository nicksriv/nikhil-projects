import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSettings from 'app/hooks/useSettings'
import { Grid, Button, Menu, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import { makeStyles } from '@mui/styles'

import { format } from 'date-fns'
import queryString from 'query-string'
// import { useNavigate } from 'react-router-dom'

import {
    setWorkflowId,
    setInitialState,
    setModuleFilterDetails,
    setChipsData,
} from 'app/redux/ModuleManagement/moduleManagementSlice' //work on this
import FormsList from './FormsList'
import DrawerFilterPopup from './DrawerFilterPopup'

const StyledProgress = styled(CircularProgress)(() => ({
    '@media screen and (min-width: 800px)': {
        position: 'absolute',
        top: '35vh',
        left: `calc(((100% - 260px) / 3) + 260px)`,
    },
    '@media screen and (max-width: 800px)': {
        position: 'absolute',
        top: 'calc(50% - 64px)',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const ModuleDataTable = ({ mid, smid, wid, mBy }) => {
    const useStyles = makeStyles(({ palette, ...theme }) => ({
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        buttonStyle: {
            backgroundColor: primaryColor,
            width: '95%',
            display: 'flex',
            margin: '1rem auto',
            padding: '0.9rem',
            color: '#fff',
            '&:hover': {
                backgroundColor: primaryColor,
            },
        },
        menu: {
            "& .MuiPaper-root": {
              width:'432px',
            top:'238px !important',
            right:'80px !important',
          },
        },
    }))
    // const navigate = useNavigate()
    const {
        allForms,
        moduleList,
        columnsAndFilters,
        formattedColumns,
        formattedRows,
        activeModuleName,
        workflowId,
        workflowData,
        moduleFilterDetails,
        loading,
        mappedBy,
    } = useSelector((state) => state.modules)
    const classes = useStyles()

    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const { settings, updateSettings } = useSettings()
    const [validation, setValidation] = useState('')
    const [shortText, setShortText] = useState('')
    const [error, setError] = useState(false)
    const [pageMode, setPageMode] = React.useState('')
    const [moduleId, setModuleId] = React.useState('')
    const [submoduleId, setSubmoduleId] = React.useState('')
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
    const [selectedModuleName, setSelectedModuleName] = useState('')
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [filterData, setFilterData] = useState([])
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [activeIndex, setActiveIndex] = useState(null)
    const primaryColor = settings.layout1Settings.main.primaryColor
    // const fontFamily = settings.themes.typography.fontFamily
    const fontFamily = 'SF Pro Display'

    useEffect(() => {
        //..Identify Page Mode and Respective Id (Sub module/Module)
        const parsedQS = queryString.parse(window.location.search)
        const { pathname } = window.location
        setPageMode(
            pathname.replace('/module-management/', '') &&
                pathname.replace('/module-management/', '').trim()
        )
        //..set initial state
        dispatch({
            type: setInitialState.type,
        })

        fetchMoreData()
    }, [mid, smid, wid])

    useEffect(() => {
        const sm = moduleList && moduleList?.find((x) => x.id == mid)
        if (sm) {
            const ssm = sm.subModules.find((x) => x.id == smid)
            if (ssm) {
                setSelectedModuleName(ssm.name)
            }
        }
    }, [mid, smid, wid, moduleList])

    const fetchData = () => {
        setPageSize(pageSize + 5)
        fetchMoreData()
    }
    const fetchMoreData = () => {
        //..Id Sub Module Selected
        if (mid && smid) {
            //..Get data related to table based on Sub module id
            dispatch({
                type: 'getAllFormsBySubModuleIdAction',
                payload: {
                    moduleId: mid,
                    submoduleId: smid,
                    filters: [],
                    page: pageNumber,
                    size: pageSize,
                    //sortBy: "",
                    //sortOrder: "",
                    isFromApplyFilter: false,
                    mappedBy: mBy,
                },
            })
            //..Get columns and filters data by sub module id
            dispatch({
                type: 'getColumnsAndFiltersBySubModuleIdAction',
                payload: {
                    moduleId: mid,
                    submoduleId: smid,
                    mappedBy: mBy,
                },
            })
            //setModuleId(mid);
            //setSubmoduleId(smid);
        } else if (mid) {
            //..Get data related to table based on module id
            // dispatch({
            //     type: 'getAllFormsByModuleIdAction',
            //     payload: {
            //         moduleId: mid,
            //         filters: [],
            //         page: pageNumber,
            //         size: pageSize,
            //         //sortBy: "",
            //         //sortOrder: "",
            //         isFromApplyFilter: false,
            //         mappedBy: mBy,
            //     },
            // })
            //..Get columns and filters data by module id
            dispatch({
                type: 'getColumnsAndFiltersByModuleIdAction',
                payload: { moduleId: mid },
            })
            //setModuleId(mid);
        }

        dispatch({
            type: setWorkflowId.type,
            payload: { workflowId: wid },
        })
        //..SET GRID COLUMNS AND ROWS
        // dispatch({
        //     type: setFormattedColumnsAndRows.type
        // });
    }

    useEffect(() => {
        if (workflowId) {
            dispatch({
                type: 'getWorkflowByIdAction',
                payload: { workflowId },
            })
        }
    }, [workflowId])

    useEffect(() => {
        let filterData = []
        let from = ''
        let to = ''
        let employeeId = ''
        let name = ''
        let empRole = ''
        let result = {}
        for (let prop of Object.keys(moduleFilterDetails)) {
            let objFilter = {
                componentId: '',
                componentValue: '',
            }
            if (moduleFilterDetails[prop]) {
                objFilter.componentId = prop
                let cValue = moduleFilterDetails[prop]
                if (columnsAndFilters && columnsAndFilters.filters) {
                    result = columnsAndFilters.filters.find(
                        (x) => x.componentId === prop
                    )
                    if (result) {
                        if (
                            Object.prototype.toString.call(cValue) ===
                            '[object Date]'
                        ) {
                            if (!isNaN(cValue)) {
                                if (
                                    result.type === 'Date_Picker' &&
                                    result.hint === 'from'
                                ) {
                                    cValue = format(cValue, 'dd-MM-yyyy')
                                    from = cValue
                                } else if (
                                    result.type === 'Date_Picker' &&
                                    result.hint === 'to'
                                ) {
                                    cValue = format(cValue, 'dd-MM-yyyy')
                                    to = cValue
                                }
                            }
                        } else if (
                            (result.type === 'Dropdown' &&
                                result.hint === 'static_employeeId') ||
                            result.hint === 'Emp Id'
                        ) {
                            employeeId = cValue
                        } else if (
                            (result.type === 'Dropdown' &&
                                result.hint === 'static_userName') ||
                            result.hint === 'Emp Name'
                        ) {
                            name = cValue
                        } else if (
                            (result.type === 'Dropdown' &&
                                result.hint === 'static_role') ||
                            result.hint === 'Emp Role'
                        ) {
                            empRole = cValue
                        }
                    }
                }
                objFilter.componentValue = cValue
                if (
                    result.type !== 'Date_Picker' &&
                    result.hint !== 'static_employeeId' &&
                    result.hint !== 'static_userName' &&
                    result.hint !== 'static_role' &&
                    result.hint !== 'Emp Id' &&
                    result.hint !== 'Emp Name' &&
                    result.hint !== 'Emp Role'
                ) {
                    filterData.push(objFilter)
                }
            }
        }
        //..Id Sub Module Selected
        if (mid && smid) {
            //..Get data related to table based on Sub module id
            dispatch({
                type: 'getAllFormsBySubModuleIdAction',
                payload: {
                    moduleId: mid,
                    submoduleId: smid,
                    filters: filterData,
                    from: from,
                    to: to,
                    employeeId: employeeId,
                    name: name,
                    empRole: empRole,
                    page: pageNumber,
                    size: pageSize,
                    //sortBy: "",
                    //sortOrder: "",
                    isFromApplyFilter: true,
                    mappedBy: mBy,
                },
            })
        } else if (mid) {
            //..Get data related to table based on module id
            // dispatch({
            //     type: 'getAllFormsByModuleIdAction',
            //     payload: {
            //         moduleId: mid,
            //         filters: filterData,
            //         from: from,
            //         to: to,
            //         employeeId: employeeId,
            //         name: name,
            //         empRole: empRole,
            //         page: pageNumber,
            //         size: pageSize,
            //         //sortBy: "",
            //         //sortOrder: ""
            //         isFromApplyFilter: true,
            //         mappedBy: mBy,
            //     },
            // })
        }
    }, [moduleFilterDetails])

    const handleNext = () => {
        // navigate(`/workflow-screen/${workflowData.workFlows[0].screenId}`)
    }
    const handleFilterClick = (e) => {
        setIsFilterPopupOpen(true)
    }
    // EXEL DOWNLOAD
    const handleDownloadExel = () => {
        let isFilterEmpty = Object.values(moduleFilterDetails).every(
            (value) => {
                if (value === null || value === undefined || value === '') {
                    return true
                }
                return false
            }
        )
        let arry = filterData?.filter((x) => {
            return (
                x.componentId != 'employeeId' &&
                x.componentId != 'role' &&
                x.componentId != 'userName'
            )
        })
        dispatch({
            type: 'setExelDownload',
            payload: {
                moduleId: mid,
                submoduleId: smid,
                filters: isFilterEmpty ? [] : arry,
                employeeId: moduleFilterDetails?.employeeId,
                name: moduleFilterDetails?.userName,
                empRole: moduleFilterDetails?.role,
                from: fromDate,
                to: toDate,
                page: pageNumber,
                size: pageSize,
                isFromApplyFilter: false,
                mappedBy: mBy,
                subModuleName: selectedModuleName,
            },
        })
    }
    const handleApplyFilter = (
        data,
        from,
        to,
        employeeId,
        name,
        empRole,
        filterDetails
    ) => {
        let array = data.filter((x) => {
            return (
                x.componentId != '07AB7E2C-25DE-43F2-8C3D-80BF17024132' &&
                x.componentId != '08AB7E2C-25DE-43F2-8C3D-80BF17024140'
            )
        })
        setFilterData(array)
        setFromDate(from)
        setToDate(to)
        //..Id Sub Module Selected
        if (mid && smid) {
            //..Get data related to table based on Sub module id
            dispatch({
                type: 'getAllFormsBySubModuleIdAction',
                payload: {
                    moduleId: mid,
                    submoduleId: smid,
                    filters: data,
                    from: from,
                    to: to,
                    employeeId: employeeId,
                    name: name,
                    empRole: empRole,
                    page: pageNumber,
                    size: pageSize,
                    //sortBy: "",
                    //sortOrder: "",
                    isFromApplyFilter: true,
                    mappedBy: mBy,
                },
            })
        } else if (mid) {
            //..Get data related to table based on module id
            // dispatch({
            //     type: 'getAllFormsByModuleIdAction',
            //     payload: {
            //         moduleId: mid,
            //         filters: data,
            //         from: from,
            //         to: to,
            //         employeeId: employeeId,
            //         name: name,
            //         empRole: empRole,
            //         page: pageNumber,
            //         size: pageSize,
            //         //sortBy: "",
            //         //sortOrder: ""
            //         isFromApplyFilter: true,
            //     },
            // })
        }
        setIsFilterPopupOpen(false)
        dispatch({ type: setModuleFilterDetails.type, payload: filterDetails })
        dispatch({ type: setChipsData.type, payload: filterDetails })
    }
    const editForm = (data1, data2, data3) => {
        // navigate(`/workflow-screen/${workflowData.workFlows[0].screenId}/form/${data3.formId}`);
        // navigate(
        //     `/modules/${mid}/submodules/${smid}/workflow-screen/${workflowData.workFlows[0].screenId}/form/${data3.formId}`
        // )
    }
    const handleIconClick = (isApproved, formId, index) => {
        dispatch({
            type: 'updateRejectApprovePermissionAction',
            data: {
                workflowId,
                moduleId: workflowData.moduleId,
                submoduleId: workflowData.submoduleId,
                formId,
                mappedBy: mBy,
                approved: isApproved,
                filters: [],
                page: pageNumber,
                size: pageSize,
                //sortBy: "",
                //sortOrder: "",
                isFromApplyFilter: false,
            },
        })
        setActiveIndex(index)
    }
    return (
        <Grid sx={{ minHeight: 'calc(100vh - 120px)', fontFamily: fontFamily }}>
            {!loading ? (
                <>
                    <FormsList
                        activeModuleName={activeModuleName}
                        allFormsData={allForms}
                        columnsAndFilters={columnsAndFilters}
                        formattedColumns={formattedColumns}
                        formattedRows={formattedRows}
                        handleFilterClick={handleFilterClick}
                        handleDownloadExel={handleDownloadExel}
                        isFilterPopupOpen={isFilterPopupOpen}
                        selectedModuleName={selectedModuleName}
                        handleView={editForm}
                        handleIconClick={handleIconClick}
                        fetchData={fetchData}
                        primaryColor={primaryColor}
                        activeIndex={activeIndex}
                    />            
                    <Menu
                        anchorEl={anchorRef.current}
                        open={isFilterPopupOpen}
                        onClose={() => setIsFilterPopupOpen(false)}
                        getContentAnchorEl={null}
                        width={360}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        classes={{
                            root: classes.menu,
                            paper: classes.paper,
                        }}
                        MenuListProps={{ disablePadding: true }}
                    >
                        <DrawerFilterPopup
                            handleClose={() => setIsFilterPopupOpen(false)}
                            columnsAndFilters={columnsAndFilters}
                            handleApplyFilter={handleApplyFilter}
                            primaryColor={primaryColor}
                        />
                    </Menu>
                </>
            ) : (
                <StyledProgress size={35} className="buttonProgress" />
            )}
        </Grid>
    )
}

export default ModuleDataTable
