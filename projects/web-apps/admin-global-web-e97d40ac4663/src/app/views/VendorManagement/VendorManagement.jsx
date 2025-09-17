import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import history from 'helper/history.js'

import { V5GlobalHeaderActionList } from 'app/components'
import EmptyView from 'app/components/EmptyView/EmptyView'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import FilterChips from './components/FilterChips'
import FilterPopup from './components/FilterPopup'
import VendorList from './components/VendorList'
import { setShowVendorDetailsPopup } from 'app/redux/VendorManagement/VendorManagementSlice'
import VendorCredentialSideDrawer from './VendorCredentialSideDrawer'

const VendorManagement = () => {
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
        vendorTableHeader = [],
        vendorList = [],
        vendorFilterDetails,
        sortOptions,
        loading,
        pageNumber,
        totalElements,
        showVendorDetailsPopup,
    } = useSelector((state) => state.vendorManagement)
    useEffect(() => {
        localStorage.removeItem("vendorApprove");
        dispatch({
            type: 'getVendorListAction',
            payload: {
                pageNumber: currentPage,
            },
        })
    }, [dispatch])

    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(vendorFilterDetails).some(function (k) {
            return (
                vendorFilterDetails[k] &&
                (vendorFilterDetails[k].length > 0 ||
                    vendorFilterDetails.from !== null ||
                    vendorFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getVendorListAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: vendorFilterDetails,
            },
        })
    }, [vendorFilterDetails, pageSize])
    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getVendorListAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: vendorFilterDetails,
            },
        })
    }
    const downloadVendorList = () => {
        dispatch({
            type: 'getVendorListDownloadAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: vendorFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy,
            },
        })
    }
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }
    const handleViewClick = (selectedJobId, key) => {
        const { id } = selectedJobId
        const pathname = `/vendor/vendorDetails/${id}`
        history.push({
            pathname: pathname,
        })
    }
    const handleEditClick = (selectedId) => {
        if (selectedId && selectedId.id) {
            const id = selectedId.id
            const pathname = `/vendor/vendorEdit/${id}`
            history.push({
                pathname: pathname,
            })
        }
    }
    const handleInfoClick = (selectedId) => {
        const { id } = selectedId
        dispatch({ type: 'getVendorCredentialAction', payload: { id } })
        dispatch({ type: setShowVendorDetailsPopup.type, payload: true })
    }
    const handleAddClick = () => {
        const pathName = `/vendor/vendorAdd`
        history.push({
            pathname: pathName,
        })
    }
    if (filterExists && vendorList && vendorList.length === 0) {
        return (
            <>
                {/* filter exist and vendor list == 0 */}
                <V5GlobalHeaderActionList
                    title={'Vendor Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadVendorList,
                        },
                        {
                            iconType: 'PersonAddIcon',
                            tooltipTitle: 'Add Vendor',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: handleAddClick,
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
                <FilterChips chipInfo={vendorFilterDetails} />
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
                    <FilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                        initialValue={vendorFilterDetails}
                    />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    if (!vendorList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Vendor available"
                subTitleStart="Click To"
                subTitleLink="Add Vendor"
                navigateTo="/vendor/vendorAdd"
            />
        )
    }
        return (
            <>
                <V5GlobalHeaderActionList
                    title={'Vendor Management'}
                    iconsList={[
                        {
                            iconType: 'SaveAltIcon',
                            tooltipTitle: 'Download Excel',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: downloadVendorList,
                        },
                        {
                            iconType: 'PersonAddIcon',
                            tooltipTitle: 'Add Vendor',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: handleAddClick,
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
                <FilterChips chipInfo={vendorFilterDetails} />
                <VendorList
                    indexOfFirstData={indexOfFirstData}
                    indexOfLastData={indexOfLastData}
                    paginate={paginate}
                    page={currentPage}
                    heading={vendorTableHeader}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    currentPage={currentPage}
                    tableData={vendorList}
                    setPageSize={handlePageSizeChange}
                    totalItems={totalElements}
                    totalElements={totalElements}
                    filterDetails={vendorFilterDetails}
                    handleViewClick={handleViewClick}
                    handleEditClick={handleEditClick}
                    handleInfo={handleInfoClick}
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
                    <FilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                        initialValue={vendorFilterDetails}
                    />
                </Menu>
                <VendorCredentialSideDrawer
                    showVendorDetailsPopup={showVendorDetailsPopup}
                />
            </>
        )
}

export default VendorManagement
