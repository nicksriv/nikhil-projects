import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { V5GlobalHeaderActionList } from 'app/components'
import JobsList from './components/JobsList'
import history from 'helper/history.js'
import FilterPopup from './components/FilterPopup'
import FilterChips from './components/FilterChips'
import EmptyView from 'app/components/EmptyView/EmptyView'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'

function JobManagement() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
    }))
    const classes = useStyles()
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
    const [filterExists, setFilterExists] = useState(false)
    const indexOfLastData = (currentPage + 1) * pageSize
    const indexOfFirstData = indexOfLastData - pageSize
    const typeOfUser = localStorage.getItem('typeOfUser') ? localStorage.getItem('typeOfUser') :'' 

    const {
        jobTableHeader,
        qaJobTableHeader,
        jobList = [],
        totalElements,
        jobFilterDetails,
        loading,
        sortOptions,
        pageNumber,
        clientId,
    } = useSelector((state) => state.jobManagement)
    useEffect(() => {
        dispatch({
            type: 'getJobsListAction',
            payload: {
                clientId: clientId,
                pageNumber: currentPage,
            },
        })
    }, [clientId])
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(jobFilterDetails).some(function (k) {
            return (
                jobFilterDetails[k] &&
                (jobFilterDetails[k].length > 0 ||
                    jobFilterDetails.from !== null ||
                    jobFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getJobsListAction',
            payload: {
                clientId,
                pageNumber: pNumber,
                size: pageSize,
                filter: jobFilterDetails,
            },
        })
    }, [jobFilterDetails, pageSize, clientId])

    useEffect(() => {
        if (typeOfUser === 'QUALITY_ASSURANCE') {
            dispatch({
                type: 'getJobsListAction',
                payload: {
                    clientId,
                    pageNumber: currentPage,
                    size: pageSize,
                    filter: jobFilterDetails,
                    sortOrder: sortOptions.direction,
                    sortBy: sortOptions.sortBy,
                },
            })
            return
        }

        if (clientId) {
            dispatch({
                type: 'getJobsListAction',
                payload: {
                    clientId,
                    pageNumber: currentPage,
                    size: pageSize,
                    filter: jobFilterDetails,
                    sortOrder: sortOptions.direction,
                    sortBy: sortOptions.sortBy,
                },
            })
        }
    }, [pageSize, currentPage, clientId])

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const addJob = () => {
        history.push(`/job/add`)
    }
    const downloadJobList = () => {
        dispatch({
            type: 'getJobListDownloadAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: jobFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }

    const handleApplicantRedirection = (id, key) => {}
    const handleCandidateRedirection = (id) => {}
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }

    if (filterExists && jobList && jobList.length === 0) {
        return (
            <>
                {
                (localStorage.getItem('userRole') === "QUALITY_ASSURANCE") ?
                <V5GlobalHeaderActionList
                    title={'Job Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadJobList,
                        },
                        {
                            iconType: 'Filter',
                            tooltipTitle: 'Filter',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: handleFilterClick,
                            filterPopupOpen: isFilterPopupOpen,
                            ref: anchorRef,
                        },
                    ]}
                /> :
                <V5GlobalHeaderActionList
                    title={'Job Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadJobList,
                        },
                        {
                            iconType: 'PersonAddIcon',
                            tooltipTitle: 'Add Job',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: addJob,
                        },
                        {
                            iconType: 'Filter',
                            tooltipTitle: 'Filter',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: handleFilterClick,
                            filterPopupOpen: isFilterPopupOpen,
                            ref: anchorRef,
                        },
                    ]}
                />

                }
                <FilterChips chipInfo={jobFilterDetails} />
                <EmptyView
                    Imgsrc="/assets/images/No Data Illustration-3.svg"
                    Title="No results found."
                    subTitleStart="Please revise your"
                    subTitleLink="Filter"
                    subTitleEnd="criteria"
                    clickHandler={handleFilterClick}
                />
                <Menu
                    width={360}
                    open={isFilterPopupOpen}
                    onClose={() => setIsFilterPopupOpen(false)}
                    anchorEl={anchorRef.current}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    classes={{
                        root: classes.root,
                        paper: classes.paper,
                    }}
                    MenuListProps={{ disablePadding: true }}
                >
                    <FilterPopup close={() => setIsFilterPopupOpen(false)} />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }

    if (!jobList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Job available"
                subTitleStart={typeOfUser === 'QUALITY_ASSURANCE' ? false : "Click To"}
                subTitleLink={typeOfUser === 'QUALITY_ASSURANCE' ? false : "Add Job"}
                navigateTo={typeOfUser === 'QUALITY_ASSURANCE' ? false : "/job/add"}
            />
        )
    }

    return (  
        <>
        {
            (localStorage.getItem('userRole') === "QUALITY_ASSURANCE") ?
            <V5GlobalHeaderActionList
                title={'Job Management'}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadJobList,
                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef,
                    },
                ]}
            /> :
            <V5GlobalHeaderActionList
                title={'Job Management'}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadJobList,
                    },
                    {
                        iconType: 'PersonAddIcon',
                        tooltipTitle: 'Add Job',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addJob,
                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef,
                    },
                ]}
            />

            }
            

            <FilterChips chipInfo={jobFilterDetails} />
            <JobsList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={typeOfUser === "QUALITY_ASSURANCE" ? qaJobTableHeader:jobTableHeader}
                pageSize={pageSize}
                pageNumber={pageNumber}
                currentPage={currentPage}
                tableData={jobList}
                setPageSize={handlePageSizeChange}
                totalItems={totalElements}
                totalElements={totalElements}
                filterDetails={jobFilterDetails}
                handleApplicantRedirection={handleApplicantRedirection}
                handleCandidateRedirection={handleCandidateRedirection}
            />
            <Menu
                width={360}
                open={isFilterPopupOpen}
                onClose={() => setIsFilterPopupOpen(false)}
                anchorEl={anchorRef.current}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                classes={{
                    root: classes.root,
                    paper: classes.paper,
                }}
                MenuListProps={{ disablePadding: true }}
            >
                <FilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
        </>
    )
}

export default JobManagement
