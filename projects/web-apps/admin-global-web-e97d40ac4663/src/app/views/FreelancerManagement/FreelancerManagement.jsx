import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import FreelancersList from './components/FreelancersList'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import EmptyView from 'app/components/EmptyView/EmptyView'
import FreelancerFilterPopup from "./components/FreelancerFilterPopUp"
import FreelancerFilterChips from './components/FreelancerFilterChips'
function FreelancerManagement() {
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


    const { freelancerTableHeader, freelancerList = [], totalElements, freelancerFilterDetails, loading, sortOptions, pageNumber } = useSelector((state) => state.freelancerManagement)
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(freelancerFilterDetails).some(function (k) {
            return (
                freelancerFilterDetails[k] &&
                (freelancerFilterDetails[k].length > 0 ||
                    freelancerFilterDetails.from !== null ||
                    freelancerFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getFreelancersListAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: freelancerFilterDetails,
            },
        })
    }, [freelancerFilterDetails, pageSize])

    useEffect(() => {
        dispatch({
            type: 'getFreelancersListAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: freelancerFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }, [pageSize, currentPage, freelancerList.size])

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getFreelancersListAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: freelancerFilterDetails,
            },
        })
    }

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }


    const downloadFreelancerList = () => {
        dispatch({
            type: 'getFreelancerListDownloadAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: freelancerFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }

    if (filterExists && freelancerList && freelancerList.length === 0) {
        return (
            <>
                <V5GlobalHeaderActionList
                    title={'Freelancer Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadFreelancerList,
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
                <FreelancerFilterChips chipInfo={freelancerFilterDetails} />
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
                    <FreelancerFilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                    />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    if (!freelancerList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Freelancers available"
                subTitleStart="Click To"
            />
        )
    }
    return (
        <>
            <V5GlobalHeaderActionList
                title={'Freelancer Management'}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadFreelancerList,
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
            <FreelancerFilterChips chipInfo={freelancerFilterDetails} />
            <FreelancersList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={freelancerTableHeader}
                pageSize={pageSize}
                pageNumber={pageNumber}
                currentPage={currentPage}
                tableData={freelancerList}
                setPageSize={handlePageSizeChange}
                totalItems={totalElements}
                totalElements={totalElements}
                filterDetails={freelancerFilterDetails}
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
                <FreelancerFilterPopup
                    close={() => setIsFilterPopupOpen(false)}
                />
            </Menu>
        </>
    )
}
export default FreelancerManagement
