import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import DisputesList from './components/DisputesList'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import EmptyView from 'app/components/EmptyView/EmptyView'
import DisputeFilterPopup from './components/DisputeFilterPopUp'
import DisputeFilterChips from './components/DisputeFilterChips'
function DisputeManagement() {
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
    const {
        disputeTableHeader,
        disputeList = [],
        totalElements,
        disputeFilterDetails,
        loading,
        pageNumber,
        sortOptions,
    } = useSelector((state) => state.disputeManagement)
    useEffect(() => {
        dispatch({ type: 'getClientsListAction' })
    }, [])
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(disputeFilterDetails).some(function (k) {
            return (
                disputeFilterDetails[k] &&
                (disputeFilterDetails[k].length > 0 ||
                    disputeFilterDetails.from !== null ||
                    disputeFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getDisputesListAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: disputeFilterDetails,
            },
        })
    }, [disputeFilterDetails, pageSize])

    useEffect(() => {
        dispatch({
            type: 'getDisputesListAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: disputeFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }, [pageSize, currentPage, disputeList.size])

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getDisputesListAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: disputeFilterDetails,
            },
        })
    }

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }

    const downloadDisputeList = () => {
        dispatch({
            type: 'getDisputeListDownloadAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: disputeFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }

    if (filterExists && disputeList && disputeList.length === 0) {
        return (
            <>
                <V5GlobalHeaderActionList
                    title={'Dispute Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadDisputeList,
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
                <DisputeFilterChips chipInfo={disputeFilterDetails} />
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
                    <DisputeFilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                    />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    if (!disputeList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Disputes available"
            />
        )
    }
    return (
        <>
            <V5GlobalHeaderActionList
                title={'Dispute Management'}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadDisputeList,
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
            <DisputeFilterChips chipInfo={disputeFilterDetails} />
            <DisputesList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={disputeTableHeader}
                pageSize={pageSize}
                pageNumber={pageNumber}
                currentPage={currentPage}
                tableData={disputeList}
                setPageSize={handlePageSizeChange}
                totalItems={totalElements}
                totalElements={totalElements}
                filterDetails={disputeFilterDetails}
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
                <DisputeFilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
        </>
    )
}
export default DisputeManagement
