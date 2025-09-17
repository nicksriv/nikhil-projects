import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import QualityAssuranceList from './components/QualityAssuranceList'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import EmptyView from 'app/components/EmptyView/EmptyView'
import history from 'helper/history.js'
import QualityAssuranceFilterPopUp from './components/QualityAssuranceFilterPopUp'
import QualityAssuranceFilterChips from './components/QualityAssuranceFilterChips'
import QualityAssuranceCredentialSideDrawer from './QualityAssuranceSideDrawer'
function QualityAssuranceManagement() {
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

    const {showQualityAssuranceDetailsPopup, qualityAssuranceCredential={},qualityAssuranceList = [], qualityAssuranceTableHeader = [], qualityAssuranceFilterDetails, qualityAssuranceDetails,totalElements, loading, sortOptions, pageNumber } = useSelector((state) => state.qualityAssuranceManagement)
    console.log("showQualityAssuranceDetailsPopup",qualityAssuranceCredential);
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(qualityAssuranceFilterDetails).some(function (k) {
            return (
                qualityAssuranceFilterDetails[k] &&
                (qualityAssuranceFilterDetails[k].length > 0 ||
                    qualityAssuranceFilterDetails.from !== null ||
                    qualityAssuranceFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getQualityAssuranceListAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: qualityAssuranceFilterDetails,
            },
        })
    }, [qualityAssuranceFilterDetails, pageSize])

    useEffect(() => {
        dispatch({
            type: 'getQualityAssuranceListAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: qualityAssuranceFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }, [pageSize, currentPage, qualityAssuranceList.size])

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getQualityAssuranceListAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: qualityAssuranceFilterDetails,
            },
        })
    }

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }

    const addQualityAssurance = () => {
        history.push(`/qualityassurance/add`)
    }
    const downloadQualityAssuranceList = () => {
        dispatch({
            type: 'getQualityAssuranceListDownloadAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: qualityAssuranceFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }

    if (filterExists && qualityAssuranceList && qualityAssuranceList.length === 0) {
        return (
            <>
                <V5GlobalHeaderActionList
                    title={'QA Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadQualityAssuranceList,
                        },
                        {
                            iconType: 'PersonAddIcon',
                            tooltipTitle: 'Add QA',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: addQualityAssurance,
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
                <QualityAssuranceFilterChips chipInfo={qualityAssuranceFilterDetails} />
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
                    <QualityAssuranceFilterPopUp close={() => setIsFilterPopupOpen(false)} />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    if (!qualityAssuranceList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Quality Assurance available"
                subTitleStart="Click To"
            />
        )
    }
        return (
            <>
                <V5GlobalHeaderActionList
                    title={'QA Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadQualityAssuranceList,
                        },
                        {
                            iconType: 'PersonAddIcon',
                            tooltipTitle: 'Add QA',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: addQualityAssurance,
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
                <QualityAssuranceFilterChips chipInfo={qualityAssuranceFilterDetails} />
                <QualityAssuranceList
                    indexOfFirstData={indexOfFirstData}
                    indexOfLastData={indexOfLastData}
                    paginate={paginate}
                    page={currentPage}
                    heading={qualityAssuranceTableHeader}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    currentPage={currentPage}
                    tableData={qualityAssuranceList}
                    setPageSize={handlePageSizeChange}
                    totalItems={totalElements}
                    totalElements={totalElements}
                    filterDetails={qualityAssuranceFilterDetails}
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
                    <QualityAssuranceFilterPopUp close={() => setIsFilterPopupOpen(false)} />
                </Menu>
                <QualityAssuranceCredentialSideDrawer
                    showQualityAssuranceDetailsPopup={showQualityAssuranceDetailsPopup}
                />
            </>
        )
    } 
   

export default QualityAssuranceManagement;