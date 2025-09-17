import React, { useEffect, useState, useRef } from 'react'
import EmptyView from 'app/components/EmptyView/EmptyView'
import ClientList from './components/ClientList'
import FilterChips from './components/FilterChips'
//import ClientHeader from './components/ClientHeader';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import { V5GlobalHeaderActionList, 
//V5GlobalLoading
 } from '../../components';
import history from 'helper/history.js';
//import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu'
import { //ClickAwayListener,
Menu } from '@material-ui/core';
import FilterPopup from './components/FilterPopup';
import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';
//import EmailPopUp from 'app/components/EmailPopUp/EmailPopUp'

function ClientManagment() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
    }))
    const classes = useStyles()
    const [currentPage, setCurrentPage] = useState(0)
    const anchorRef = useRef(null)
    const [pageSize, setPageSize] = useState(10)
   // const [showFilter, setShowFilter] = useState(false)
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
    const dispatch = useDispatch()
    const { clientsList, clientTableHeaders, clientFilterDetails, loading, //clientId, 
        sortOptions } =
        useSelector((state) => state.clients)
    const [
        filterExists, setFilterExists] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'getAllClientsAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: clientFilterDetails,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        })
    }, [pageSize, currentPage, clientsList.size]);

    useEffect(() => {
        dispatch({ type: 'getClientsListAction' });
    }, [dispatch]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        // dispatch({
        //     type: 'getAllClientsAction',
        //     payload: {
        //         pageNumber,
        //         size: pageSize,
        //         filter: clientFilterDetails,
        //         sortOrder: sortOptions.direction,
        //         sortBy: sortOptions.sortBy

        //     },
        // })
    }

    const handlePageSizeChange = (size) => {
        setPageSize(size)
        // dispatch({
        //     type: 'getAllClientsAction',
        //     payload: {
        //         pageNumber: currentPage,
        //         size: pageSize,
        //         filter: clientFilterDetails,
        //         sortOrder: sortOptions.direction,
        //         sortBy: sortOptions.sortBy

        //     },
        // })
    }
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(clientFilterDetails).some(function (k) {
            return clientFilterDetails[k] && (clientFilterDetails[k].length > 0 || clientFilterDetails.from !== null || clientFilterDetails.to !== null )
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage;
        setCurrentPage(pNumber);
        dispatch({
            type: 'getAllClientsAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: clientFilterDetails,
            },
        })
    }, [clientFilterDetails, pageSize]);

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }
    const indexOfLastData = (currentPage + 1) * pageSize
    const indexOfFirstData = indexOfLastData - pageSize

    const addClient = () => {
        history.push(`/client/add`)
    }
    const downloadClientDetails = () => {
        dispatch({
            type: 'getAllClientsDetails',
            payload: clientFilterDetails,
        })
    }
     const openPopUp = () => {
        let data = {
            storeName: '',
            clientId: '',
            clientName: '',
            state: '',
            area: '',
            status: '',
            from: null,
            to: null,
        }
        dispatch({ type: setClientFilterDetails.type, payload: data })
        handleFilterClick()
    }
    if (filterExists && clientsList && clientsList?.data && clientsList.data?.length === 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Client Management'}
                //list={clientsList?.data?.length}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadClientDetails,
                    },
                    {
                        iconType: 'PersonAddIcon',
                        tooltipTitle: 'Add Client',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addClient,
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
            <FilterChips chipInfo={clientFilterDetails} />

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
    }

    if ((loading === "failed" && clientsList.data?.length === undefined) || (loading === "complete" && clientsList.data)?.length === 0) {
        return <EmptyView
            Imgsrc="/assets/images/No Data Illustration-3.svg"
            Title="No Clients have been Onboarded yet."
            subTitleStart="Click To"
            subTitleLink="Add Client"
            navigateTo="/client/add"
        />
    } else if (clientsList && clientsList?.data && clientsList.data?.length > 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Client Management'}
                //list={clientsList?.data?.length}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadClientDetails,
                    },
                    {
                        iconType: 'PersonAddIcon',
                        tooltipTitle: 'Add Client',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addClient,
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

            <FilterChips chipInfo={clientFilterDetails} />
            <ClientList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={clientTableHeaders}
                pageSize={pageSize}
                currentPage={currentPage}
                tableData={clientsList.data}
                setPageSize={handlePageSizeChange}
                totalItems={clientsList.size}
                filterDetails={clientFilterDetails}
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

    } else if ((loading === "start" && clientsList.data)?.length === 0 || clientsList.data?.length === undefined) {
        return <Loading />
    }

}

export default ClientManagment
