import React, { useCallback, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import ModuleList from './components/ModuleList'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import FilterChips from './components/FilterChips'
import { Menu, Grid } from '@material-ui/core'
import FilterPopup from './components/FilterPopup'
import {  setStateByName, setInitialState, setSubmoduleSuccessStatus } from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice'
import { useHistory } from 'react-router-dom';
import EmptyView from 'app/components/EmptyView/EmptyView'
import AddModule from './AddModule';
import CloneWorkflow from './CloneWorkflow';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice';

function ScreenBuilderManagement() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
    }))
    const history = useHistory()
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(0);
    const anchorRef = useRef(null);
    const [pageSize, setPageSize] = useState(10);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const dispatch = useDispatch();
    const { moduleTableHeaders, moduleList, moduleFilterDetails, createdModule, loading,
        clientModulesList, 
        clientId, sortOptions, cloneWorkflowDetails, submoduleSuccessStatus } = useSelector(
            (state) => state.screenBuilder
        );
    const [filterExists, setFilterExists] = useState(false);
    const [openAddModulePopup, setOpenAddModulePopup] = useState();
    const [openCloneWorkflowPopup, setOpenCloneWorkflowPopup] = useState(false);
    const indexOfLastData = (currentPage + 1) * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const { clientIdForUsers, clientIdForUserLogo } = useSelector(
        (state) => state.users
    );
    const [subModule, setSubModule] = useState("");
    const createdModuleInitialState = {
        icon: '',
        isChildModule: false,
        moduleName: '',
        parentModuleName: '',
        moduleId: '',
        clientId: clientIdForUserLogo,
    };
    const cloneWorkflowDetailsInitialState = {
        parentModuleId: "",
        submoduleId: "",
        moduleName: "",
        clientId: clientIdForUserLogo,
        moduleIcon: ""
    };
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true);
    }
    useEffect(() => {
        dispatch({
            type: 'getAllModulesSubmodulesAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientIdForUserLogo,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        })
    }, [pageSize]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch({
            type: 'getAllModulesSubmodulesAction',
            payload: {
                pageNumber,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientId,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        });
    }

    const handlePageSizeChange = (size) => {
        setPageSize(size)
        dispatch({
            type: 'getAllModulesSubmodulesAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientId,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        })
    }

    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(moduleFilterDetails).some(function (k) {
            return moduleFilterDetails[k] && moduleFilterDetails[k].length > 0
        })
        if (exists) {
            setCurrentPage(0)
        }
        setFilterExists(exists)
        let pNumber = exists ? 0 : currentPage
        dispatch({
            type: 'getAllModulesSubmodulesAction',
            payload: {
                pageNumber: pNumber,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientIdForUserLogo
            },
        })
    }, [moduleFilterDetails]);

    const addModule = () => {
        // history.push(`/module/add`);
        setOpenAddModulePopup(true);
        dispatch({ type: setStateByName.type, payload: { name: "selectedWorkflowId", value: ''} })
    }

    const openPopUp = () => {
        // let data = {
        //     moduleName: '',
        //     parentModuleName: '',
        //     rolesMapped: '',
        //     status: '',
        // }
        // dispatch({ type: setModuleFilterDetails.type, payload: data })
        handleFilterClick();
    }

    const closeAddModulePopup = () => {
        setOpenAddModulePopup(false);
        dispatch({
            type: setStateByName.type, payload: {
                name: 'createdModule', value: createdModuleInitialState
            }
        });
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'setCreateModuleFormValuesAction',
            payload: {
                name,
                value
            }
        })
    }

    const handleSubmit = () => {
        // dispatch({
        //     type: 'getModuleAction',
        //     payload: {
        //         createdModule
        //     }
        // });
        dispatch({
            type: 'postSubModuleInfoAction',
            payload: {
                data: createdModule,
                pageNumber: currentPage,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientIdForUserLogo,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        });
        if (!createdModule.isChildModule) {
            closeAddModulePopup();
        } else {
            setOpenAddModulePopup(false);
            //history.push({pathname: '/module/add'});
        }
    }

    useEffect(()=> {
        if (submoduleSuccessStatus) {
            history.push({pathname: '/module/add'});
            dispatch({
                type: setSubmoduleSuccessStatus.type, payload: false
            });
        }
    }, [submoduleSuccessStatus]);

    const handleSubModuleCopy = (moduleInfo, submoduleInfo) => {
        setSubModule(submoduleInfo)
        setOpenCloneWorkflowPopup(true);
        dispatch({
            type: setStateByName.type, payload: {
                name: 'cloneWorkflowDetails', value: cloneWorkflowDetailsInitialState
            }
        });
        dispatch({
            type: 'setCloneWorkflowFormValuesAction',
            payload: {
                name: "submoduleId",
                value: submoduleInfo.id
            }
        });
    }
    const closeCloneWorkflowPopup = () => {
        setOpenCloneWorkflowPopup(false);
    }
    const handleCloneWorkflowChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'setCloneWorkflowFormValuesAction',
            payload: {
                name,
                value
            }
        });
    }
    const handleCloneWorkflowSubmit = () => {
        dispatch({
            type: 'postCloneWorkflowDetailsAction',
            payload: {
                data: cloneWorkflowDetails,
                pageNumber: currentPage,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientIdForUserLogo,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            }
        });
        setOpenCloneWorkflowPopup(false);
    }

    //..API CALLS ON PAGE LOAD
    useEffect(() => {
        dispatch({
            type: setStateByName.type, payload: {
                name: 'clientId', value: clientIdForUserLogo
            }
        });
        dispatch({
            type: setStateByName.type, payload: {
                name: 'clientCode', value: clientIdForUsers
            }
        });
        dispatch({
            type: 'getClientModulesAction',
            payload: {
                clientId: clientIdForUsers,
                id: clientIdForUserLogo
            }
        });
        dispatch({
            type: 'getAllModulesSubmodulesAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                filter: moduleFilterDetails,
                clientId: clientIdForUserLogo,
                sortOrder: sortOptions.direction,
                sortBy: sortOptions.sortBy
            },
        });
        dispatch({ type: setInitialState.type });
        dispatch({
            type: setStateByName.type, payload: {
                name: 'createdModule', value: createdModuleInitialState
            }
        });
    }, [dispatch]);

    if (filterExists && moduleList && moduleList?.data && moduleList.data?.length === 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Screen Builder'}
                iconsList={[
                    {
                        iconType: 'PersonAddIcon',
                        tooltipTitle: 'Add Client',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                    },
                    //{
                    //iconType: 'SaveAltIcon',
                    //tooltipTitle: 'Download Excel',
                    //areaLabel: 'upload picture',
                    //iconComponent: 'span',
                    //iconClickHandler: addClient
                    //},
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
            <FilterChips chipInfo={moduleFilterDetails} />

            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No results found."
                subTitleStart="Please revise your"
                subTitleLink="Filter"
                subTitleEnd="criteria"
                clickHandler={openPopUp}
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
            <Grid item sm={3}>
                <AddModule
                    handleClose={closeAddModulePopup}
                    open={openAddModulePopup}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </Grid>
            <Grid item sm={3}>
                <CloneWorkflow
                    handleClose={closeCloneWorkflowPopup}
                    open={openCloneWorkflowPopup}
                    handleInputChange={handleCloneWorkflowChange}
                    handleSubmit={handleCloneWorkflowSubmit}
                    subModule={subModule}
                />
            </Grid>

        </>
    }

    if ((loading === "failed" && moduleList.data?.length === 0) || (loading === "complete" && moduleList.data)?.length === 0) {
        return <>
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Modules have been Added yet."
                subTitleStart="Click To"
                subTitleLink="Add module"
                clickHandler={addModule}
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
            <Grid item sm={3}>
                <AddModule
                    handleClose={closeAddModulePopup}
                    open={openAddModulePopup}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </Grid>
            <Grid item sm={3}>
                <CloneWorkflow
                    handleClose={closeCloneWorkflowPopup}
                    open={openCloneWorkflowPopup}
                    handleInputChange={handleCloneWorkflowChange}
                    handleSubmit={handleCloneWorkflowSubmit}
                    subModule={subModule}
                />
            </Grid>

        </>
    } else if (moduleList && moduleList?.data && moduleList.data?.length > 0) {
        return <>
            <V5GlobalHeaderActionList
                title={'Screen Builder'}
                iconsList={[
                    {
                        iconType: 'AddModule',
                        tooltipTitle: 'Add Module',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addModule
                    },
                    // {
                    //     iconType: 'SaveAltIcon',
                    //     tooltipTitle: 'Download Excel',
                    //     areaLabel: 'upload picture',
                    //     iconComponent: 'span',
                    //     iconClickHandler: addClient
                    // },
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

            <FilterChips chipInfo={moduleFilterDetails} />
            <ModuleList
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                paginate={paginate}
                page={currentPage}
                heading={moduleTableHeaders}
                pageSize={pageSize}
                currentPage={currentPage}
                tableData={moduleList.data}
                setPageSize={handlePageSizeChange}
                totalItems={moduleList.size}
                filterDetails={moduleFilterDetails}
                handleSubModuleCopy={handleSubModuleCopy}
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
            <Grid item sm={3}>
                <AddModule
                    handleClose={closeAddModulePopup}
                    open={openAddModulePopup}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </Grid>
            <Grid item sm={3}>
                <CloneWorkflow
                    handleClose={closeCloneWorkflowPopup}
                    open={openCloneWorkflowPopup}
                    handleInputChange={handleCloneWorkflowChange}
                    handleSubmit={handleCloneWorkflowSubmit}
                    subModule={subModule}
                />
            </Grid>

        </>

    } else if ((loading === "start" && moduleList.data)?.length === 0 || moduleList.data?.length === undefined) {
        return <Loading />
    }
}

export default ScreenBuilderManagement;