import React, { useEffect, useState, useRef } from 'react';
import EmptyView from 'app/components/EmptyView/EmptyView';
import FilterChips from './components/FilterChips';
//import ClientHeader from './components/ClientHeader';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { V5GlobalHeaderActionList } from '../../components';
import history from 'helper/history.js';
import { Menu } from '@material-ui/core';
import UsersList from './components/UsersList';
import UsersFilterPopup from './components/UsersFilterPopup';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';
import { setPageNumber, setPageSize } from 'app/redux/UserManagement/userManagementSlice';

function UserManagment() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: "#f5f5f5",
            paddingTop: "1rem"
        }
    }));
    const classes = useStyles();
    const anchorRef = useRef(null);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const dispatch = useDispatch();
    const { clientIdForUsers, usersList, userTableHeaders, userFilterDetails, loading, pageSize, pageNumber } = useSelector((state) => state.users);
    const { sortOptions } = useSelector((state) => state.users);
    const [filterExists, setFilterExists] = useState(false);

    useEffect(() => {
        dispatch({ type: "getAllUsersAction", payload: { clientId: clientIdForUsers, pageNumber: pageNumber, size: pageSize,sortOrder:sortOptions.direction,sortBy:sortOptions.sort, filter: userFilterDetails } });
    }, [pageSize]);

    const paginate = (pageNumber) => {
        dispatch({ type: setPageNumber.type, payload: pageNumber });
        dispatch({ type: "getAllUsersAction", payload: { clientId: clientIdForUsers, pageNumber, size: pageSize,sortOrder:sortOptions.direction,sortBy:sortOptions.sortBy, filter: userFilterDetails } });
    }

    const handlePageSizeChange = (size) => {
        dispatch({ type: setPageSize.type, payload: size });
        dispatch({ type: "getAllUsersAction", payload: { clientId: clientIdForUsers, pageNumber: pageNumber, size: pageSize,sortOrder:sortOptions.direction,sortBy:sortOptions.sortBy, filter: userFilterDetails } });
    }

    const downloadExel = () => {
        dispatch({
            type: "getAllUsersDownload",
            payload: {
                filter: userFilterDetails,
                clientIdForUsers: clientIdForUsers 
            }
        })
    }
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(userFilterDetails).some(function (k) {
            return userFilterDetails[k] && (userFilterDetails[k].length > 0 || userFilterDetails.from !== null || userFilterDetails.to !== null);
        });
        dispatch({ type: "getAllUsersAction", payload: { clientId: clientIdForUsers, pageNumber: pageNumber, size: pageSize, filter: userFilterDetails } });
        setFilterExists(exists);
    }, [userFilterDetails, pageSize]);

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true);
    }
    const indexOfLastData = (pageNumber + 1) * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;

    const addUser = () => {
        history.push('/user/add');
    }

    const bulkUploadUsers = () => {
        history.push('/user/bulk-upload');
    }

    const uploadMapToSiteExcel    = () => {
        history.push('/user/map-site');
    }

    

    useEffect(() => {
        return () => {
            dispatch({ type: setPageSize.type, payload: 10 });
            dispatch({ type: setPageNumber.type, payload: 0 });
            dispatch({ type: "restUploadUsersAction" });
        }
    }, [])

    if (filterExists && usersList && usersList?.data && usersList.data?.length === 0) {
    
        return <>
            <V5GlobalHeaderActionList
                title={'User Management'}
                //length={usersList?.data?.length}
                iconsList={[
                    {
                        iconType: 'SaveAltIcon',
                        tooltipTitle: 'Download Excel',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: downloadExel
                        },
                    {
                        iconType: 'PersonAddIcon',
                        tooltipTitle: 'Add Client',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addUser
                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef
                    }
                ]}
            />
            <FilterChips chipInfo={userFilterDetails} />
            <EmptyView Imgsrc="/assets/images/No Data Illustration-3.svg"
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
                <UsersFilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
        </>
    }

    if ((loading === "failed" && usersList.data?.length === undefined) || (loading === "complete" && usersList.data?.length === 0)) {
        return <EmptyView
            Imgsrc="/assets/images/No Data Illustration-3.svg"
            Title="No Users have been Onboarded yet."
            subTitleStart="Click To"
            subTitleLink="Add User"
            navigateTo='/user/add'
        />
    } else if (usersList && usersList?.data && usersList.data?.length > 0) {
        return <>
            <>
                        <V5GlobalHeaderActionList
                            title={'User Management'}
                            //length={usersList?.data?.length}
                            iconsList={[
                                {
                                    iconType: 'UploadExcelIcon',
                                    tooltipTitle: 'Site map to user',
                                    areaLabel: 'upload picture',
                                    iconComponent: 'span',
                                    iconClickHandler: uploadMapToSiteExcel
                                },
                                 {
                                    iconType: 'SaveAltIcon',
                                    tooltipTitle: 'Download Excel',
                                    areaLabel: 'upload picture',
                                    iconComponent: 'span',
                                    iconClickHandler: downloadExel
                                },
                                {
                                    iconType: 'GroupAddIcon',
                                    tooltipTitle: 'Bulk Upload Users',
                                    areaLabel: 'bulk upload user',
                                    iconComponent: 'span',
                                    iconClickHandler: bulkUploadUsers
                                },
                                {
                                    iconType: 'PersonAddIcon',
                                    tooltipTitle: 'Add User',
                                    areaLabel: 'add user',
                                    iconComponent: 'span',
                                    iconClickHandler: addUser
                                },
                                {
                                    iconType: 'Filter',
                                    tooltipTitle: 'Filter',
                                    areaLabel: 'upload picture',
                                    iconComponent: 'span',
                                    iconClickHandler: handleFilterClick,
                                    filterPopupOpen: isFilterPopupOpen,
                                    ref: anchorRef
                                }
                            ]}
                        />

                    <FilterChips chipInfo={userFilterDetails}/>
                    <UsersList
                        indexOfFirstData={indexOfFirstData}
                        indexOfLastData={indexOfLastData}
                        paginate={paginate}
                        heading={userTableHeaders}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        tableData={usersList.data}
                        setPageSize={handlePageSizeChange}
                        totalItems={usersList.size}
                        filterDetails={userFilterDetails}
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
                <UsersFilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
            </>

        </>
    } else if ((loading === "start" && usersList.data?.length === 0) || usersList.data?.length === undefined) {
        return <Loading />
    }

}

export default UserManagment;
