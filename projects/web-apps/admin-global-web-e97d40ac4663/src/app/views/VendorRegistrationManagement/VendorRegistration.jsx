import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import EmptyView from 'app/components/EmptyView/EmptyView'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import VendorRegistrationList from './components/VendorRegistrationList';
import VendorFilterChips from './components/VendorFilterChips'
import VendorFilterPopup from './components/VendorFilterPopUp'



const VendorRegistration = () => {
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
        vendorRegistrationTableHeader = [],
        vendorRegistrationList = [],
        vendorRegistrationFilterDetails,
        sortOptions,
        loading,
        pageNumber,
        totalElements, assignVendorRegistrationList
    } = useSelector((state) => state.vendorRegistration)
    useEffect(() => {
        dispatch({
            type: 'getVendorRegistrationListAction',
            payload: {
                pageNumber: currentPage,
            },
        })
    }, [dispatch])
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(vendorRegistrationFilterDetails).some(function (k) {
            return (
                vendorRegistrationFilterDetails[k] &&
                (vendorRegistrationFilterDetails[k].length > 0 ||
                    vendorRegistrationFilterDetails.from !== null ||
                    vendorRegistrationFilterDetails.to !== null)
            )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        setCurrentPage(pNumber)
        dispatch({
            type: 'getVendorRegistrationListAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: vendorRegistrationFilterDetails,
            },
        })
    }, [vendorRegistrationFilterDetails, pageSize])

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getVendorRegistrationListAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: vendorRegistrationFilterDetails,
            },
        })
    }




    if (filterExists && vendorRegistrationList && vendorRegistrationList.length === 0) {
        return (
            <>
                {/* filter exist and vendor list == 0 */}
                <V5GlobalHeaderActionList
                    title={'Vendor Registration'}
                    iconsList={[

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
                <VendorFilterChips chipInfo={vendorRegistrationFilterDetails} />
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
                    <VendorFilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                        initialValue={vendorRegistrationFilterDetails}
                    />
                </Menu>
            </>
        )
    }

    if (loading) {
        return <Loading />
    }


    if (!vendorRegistrationList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Vendor Requests available"
                subTitleStart="Click To"
                subTitleLink="Add Vendor"
                navigateTo="/vendor/vendorAdd"
            />
        )
    }
    return (
        <>
            <V5GlobalHeaderActionList
                title={'Vendor Registration'}
                iconsList={[

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
            <VendorFilterChips chipInfo={vendorRegistrationFilterDetails} />
            <VendorRegistrationList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={vendorRegistrationTableHeader}
                pageSize={pageSize}
                pageNumber={pageNumber}
                currentPage={currentPage}
                tableData={vendorRegistrationList}
                setPageSize={handlePageSizeChange}
                totalItems={totalElements}
                totalElements={totalElements}
                filterDetails={vendorRegistrationFilterDetails}
                handleViewClick={() => console.log('view')}
                handleEditClick={() => console.log('edit')}
                handleInfo={() => console.log('info')}
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
                <VendorFilterPopup
                    close={() => setIsFilterPopupOpen(false)}
                    initialValue={vendorRegistrationFilterDetails}
                />
            </Menu>
        </>
    )
}

export default VendorRegistration