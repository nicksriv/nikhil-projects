import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { V5GlobalHeaderActionList } from 'app/components'
import SiteList from './components/SiteList';
import { useSelector } from 'react-redux';
import history from 'helper/history.js';
import FilterChips from './components/FilterChips';
import { Menu } from '@material-ui/core';
import SitesFilterPopup from './components/SitesFilterPopup';
import { useDispatch } from 'react-redux';
import EmptyView from 'app/components/EmptyView/EmptyView';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';

function SiteManagement() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: "#f5f5f5",
            paddingTop: "1rem"
        }
    }));
    const classes = useStyles();
    const anchorRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const { siteTableHeaders, loading, siteFilterDetails, siteList, pageNumber } = useSelector((state) => state.sites);
    const {  clientIdForUsers } = useSelector((state) => state.users);
    const [filterExists, setFilterExists] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "getAllSiteDetailsAction",
            payload: {
                pageNumber,
                size: pageSize,
                filter: siteFilterDetails,
                clientId: clientIdForUsers
            },
        });
    }, [[pageSize]]);
    useEffect(() => {
        dispatch({ type: "setSiteInitialStateAction" });
        dispatch({ type: 'getStatesCitiesMasterAction' });
    }, [dispatch]);
    
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(siteFilterDetails).some(function (k) {
            return siteFilterDetails[k] && (siteFilterDetails[k].length > 0 || siteFilterDetails.from !== null || siteFilterDetails.to !== null);
        });
        setFilterExists(exists)
        dispatch({ type: "getAllSiteDetailsAction", payload: { clientId: clientIdForUsers, pageNumber: pageNumber, size: pageSize, filter: siteFilterDetails } });
    }, [siteFilterDetails, pageSize]);

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        dispatch({
            type: "getAllSiteDetailsAction",
            payload: {
                pageNumber: currentPage,
                size: size,
                filter: siteFilterDetails,
                clientId: clientIdForUsers
            },
        })

    }
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true);
    }
    const addSite = () => {
        history.push('/site/add');
    }
    const addBulkSites = () => {
        history.push('/site/bulk-upload');
    }
    const downloadExcel = () => {
        dispatch({
            type: "setExcelSheetAction",
            payload: {
                clientId: clientIdForUsers
            }
        })
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch({
            type: "getAllSiteDetailsAction",
            payload: {
                pageNumber,
                size: pageSize,
                filter: siteFilterDetails,
                clientId: clientIdForUsers
            },
        })
    }
    const indexOfLastData = (currentPage + 1) * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;

    if (filterExists && siteList && siteList?.data && siteList.data?.length === 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Site Management'}
                iconsList={[
                    {
                        iconType: 'addBulkSite',
                        tooltipTitle: 'Add Bulk Sites',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addBulkSites
                    },
                    {
                        iconType: 'add_site',
                        tooltipTitle: 'Add Site',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addSite
                    },
                    {
                        iconType: 'download_excel',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadExcel
                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef
                    },
                ]}
            />
            <FilterChips chipInfo={siteFilterDetails} />
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
                <SitesFilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
        </>
    }

    if ((loading === "failed" && siteList.data?.length === undefined) || (loading === "complete" && siteList.data)?.length === 0) {
        return <EmptyView
            Imgsrc="/assets/images/No Data Illustration-3.svg"
            Title="No Site Have Been Added Yet."
            subTitleStart="Click To"
            subTitleLink="Add Site"
            navigateTo="/site/add"
        />
    } else if (siteList && siteList?.data && siteList.data?.length > 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Site Management'}
                iconsList={[
                    {
                        iconType: 'addBulkSite',
                        tooltipTitle: 'Add Bulk Sites',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addBulkSites
                    },
                    {
                        iconType: 'add_site',
                        tooltipTitle: 'Add Site',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addSite
                    },
                    {
                        iconType: 'download_excel',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadExcel
                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef
                    },
                ]}
            />
            <FilterChips chipInfo={siteFilterDetails} />
            <SiteList
                heading={siteTableHeaders}
                tableData={siteList.data}
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                pageSize={pageSize}
                pageNumber={pageNumber}
                page={currentPage}
                paginate={paginate}
                setPageSize={handlePageSizeChange}
                totalItems={siteList.size}
                filterDetails={siteFilterDetails}
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
                <SitesFilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
        </>
    } else if ((loading === "start" && siteList.data)?.length === 0 || (siteList.data?.length === undefined)) {
        return <Loading />
    }
}

export default SiteManagement
