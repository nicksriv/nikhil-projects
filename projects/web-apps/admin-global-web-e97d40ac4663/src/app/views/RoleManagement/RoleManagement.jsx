import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { V5GlobalHeaderActionList } from 'app/components'
import RoleList from './components/RoleList';
import { useDispatch, useSelector } from 'react-redux';
import history from 'helper/history.js';
import { Menu } from '@material-ui/core';
import FilterPopup from './components/FilterPopup';
import FilterChips from './components/FilterChips';
import EmptyView from 'app/components/EmptyView/EmptyView';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';

function RoleManagement() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: "#f5f5f5",
            paddingTop: "1rem"
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { roleTableHeaders, rolesList, pageNumber, roleDetails, roleFilterDetails, loading } = useSelector((state) => state.roles);
    const { clientIdForUserLogo } = useSelector((state) => state.users);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [filterExists, setFilterExists] = useState(false);

    useEffect(() => {
        dispatch({
            type: "getClientRoleAction",
            payload: {
                clientId: clientIdForUserLogo,
                filter: roleFilterDetails
            }
        })
    }, [roleDetails]);

    useEffect(() => {
        dispatch({ type: "setRoleInitialStateAction" })
        dispatch({ type: "getUserModulesAction", payload: { clientId: clientIdForUserLogo } })
    }, [dispatch]);

    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(roleFilterDetails).some(function (k) {
            return roleFilterDetails[k] && roleFilterDetails[k].length > 0;
        });
        dispatch({ type: "getClientRoleAction", payload: { clientId: clientIdForUserLogo, pageNumber: pageNumber, size: pageSize, filter: roleFilterDetails } });
        setFilterExists(exists);
    }, [roleFilterDetails, pageSize]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch({
            type: 'getClientRoleAction',
            payload: {
                clientId: clientIdForUserLogo,
                filter: roleFilterDetails,
                pageNumber,
                size: pageSize,
            },
        })
    }
    const handlePageSizeChange = (size) => {
        setPageSize(size)
        dispatch({
            type: 'getClientRoleAction',
            payload: {
                clientId: clientIdForUserLogo,
                filter: roleFilterDetails,
                pageNumber: currentPage,
                size: pageSize,
            },
        })
    }
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }
    const addRole = () => {
        history.push('/role/add');
    }
    const indexOfLastData = (currentPage + 1) * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;

    if (filterExists && rolesList && rolesList?.roles && rolesList.roles?.length === 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Role Management'}
                iconsList={[
                    {
                        iconType: 'add_box',
                        tooltipTitle: 'Add Role',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addRole

                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        ref: anchorRef,
                    },
                ]}
            />
            <FilterChips chipInfo={roleFilterDetails} />
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

    if ((loading === "failed" && rolesList.roles?.length === undefined) || (loading === "complete" && rolesList.roles)?.length === 0) {
        return <EmptyView
            Imgsrc="/assets/images/No Data Illustration-3.svg"
            Title="No Roles Have Been Added Yet."
            subTitleStart="Click To"
            subTitleLink="Add Role"
            navigateTo="/role/add"
        />
    } else if (rolesList && rolesList.roles && rolesList.roles?.length > 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Role Management'}
                iconsList={[
                    {
                        iconType: 'add_box',
                        tooltipTitle: 'Add Role',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addRole

                    },
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        ref: anchorRef,
                    },
                ]}
            />
            <FilterChips chipInfo={roleFilterDetails} />
            <RoleList
                heading={roleTableHeaders}
                tableData={rolesList.roles}
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                pageSize={pageSize}
                pageNumber={pageNumber}
                page={currentPage}
                paginate={paginate}
                setPageSize={handlePageSizeChange}
                totalItems={rolesList.total}
                filterDetails={roleFilterDetails}
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
    } else if ((loading === "start" && rolesList.roles)?.length === 0 || rolesList.roles?.length === undefined) {
        return <Loading />
    }
}

export default RoleManagement
