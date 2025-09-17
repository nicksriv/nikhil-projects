import { Menu } from '@material-ui/core';
import EmptyView from 'app/components/EmptyView/EmptyView';
import { V5GlobalHeaderActionList } from 'app/components';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FilterPopup from './components/FilterPopup';
import ReportList from './ReportList';
import V5GlobalSliderForm from 'app/components/V5GlobalSliderForm/V5GlobalSliderForm';
import { useHistory } from 'react-router-dom';
import { setInitialState, setReportAddSuccess, setStateByName } from 'app/redux/ReportManagement/reportManagementSlice';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading';
import FilterChips from './components/FilterChips';

function ReportManagement() {

    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
    }))
    const classes = useStyles();
    const history = useHistory();
    const { reportTableHeaders, reportFilterDetails, clientId, totalRecords, addedReport, moduleList, createdReportId, reportListData, pageNumber, reportAddSuccess, loading } = useSelector((state) => state.report);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [filterExists, setFilterExists] = useState(false);
    const dispatch = useDispatch();

    const indexOfLastData = (currentPage + 1) * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const addedReportInitialState = {
        icon: '',
        name: '',
        parentModuleId: '',
        clientId: localStorage.getItem('selectedClientLogo')
            ? localStorage.getItem('selectedClientLogo')
            : '',
    }
    useEffect(() => {
        dispatch({
            type: "getClientsModulesAction",
            clientId: localStorage.getItem('selectedClientLogo')
                ? localStorage.getItem('selectedClientLogo')
                : '',
        })
        dispatch({
            type: "getAllReportsDataAction",
            clientId: localStorage.getItem('selectedClientLogo')
                ? localStorage.getItem('selectedClientLogo')
                : '',
            pageNumber,
            size: pageSize,
            filter: reportFilterDetails,
        })
        //..GET CLIENT ROLES BY CLIENT ID 
        dispatch({
            type: setInitialState.type,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "getAllReportsDataAction",
            clientId: localStorage.getItem('selectedClientLogo')
                ? localStorage.getItem('selectedClientLogo')
                : '',
            pageNumber,
            size: pageSize,
            filter: reportFilterDetails,
        });
    }, [pageSize, totalRecords, reportFilterDetails]);

    // useEffect(() => {
    //     if (createdReportId) {
    //         history.push(`/report/add?id=${createdReportId}`);
    //     }
    // }, [createdReportId]);

    useEffect(() => {
        if (reportAddSuccess) {
            history.push(`/report/edit?id=${createdReportId}`);
            dispatch({
                type: setReportAddSuccess.type, payload: false
            });
        }
    }, [reportAddSuccess]);

    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(reportFilterDetails).some(function (k) {
            return reportFilterDetails[k] && reportFilterDetails[k].length > 0;
        });
        dispatch({
            type: "getAllReportsDataAction", clientId: localStorage.getItem('selectedClientLogo')
                ? localStorage.getItem('selectedClientLogo')
                : '', pageNumber: pageNumber, size: pageSize, filter: reportFilterDetails
        });
        setFilterExists(exists);
    }, [reportFilterDetails, pageSize]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch({
            type: "getAllReportsDataAction",
            clientId: localStorage.getItem('selectedClientLogo')
                ? localStorage.getItem('selectedClientLogo')
                : '',
            pageNumber,
            size: pageSize,
            filter: reportFilterDetails
        })

    }
    const handlePageSizeChange = (size) => {
        setPageSize(size);
    }
    const handleFilterClick = () => {
        setIsFilterPopupOpen(true);
    }

    const addReport = () => {
        setOpen(!open);
    }
    const openPopUp = () => {
        setOpen(true)
    }
    const closeDrawer = () => {
        setOpen(false);
        dispatch({
            type: setStateByName.type, payload: {
                name: 'addedReport', value: addedReportInitialState
            }
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "setAddedReportAction",
            payload: {
                name,
                value
            }
        });
    }


    const handleSubmit = () => {
        dispatch({
            type: "saveReportAction",
            addedReport
        });
    }

    const fieldsList = [
        {
            fieldType: "text",
            fieldName: "name",
            fieldLabel: "Report Name",
            required: true,
            select: false,
        },
        {
            fieldType: "select",
            fieldName: "parentModuleId",
            fieldLabel: "Parent Module Name",
            class: "mt-10 mb-20",
            select: true,
            required: true,
            selectOptions: moduleList
        }
    ]
    if (filterExists && reportListData && reportListData?.length === 0) {
        return <>
            <V5GlobalHeaderActionList title={'Configure Report'}
                iconsList={[
                    {
                        iconType: 'note_add',
                        tooltipTitle: 'Add Module Report',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addReport,
                    },
                    // {
                    //     iconType: 'SaveAltIcon',
                    //     tooltipTitle: 'Download Excel',
                    //     areaLabel: 'upload picture',
                    //     iconComponent: 'span',
                    //     // iconClickHandler: downloadClientDetails,
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
                ]} />
            <FilterChips chipInfo={reportFilterDetails} moduleList={moduleList} />
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
                <FilterPopup close={() => setIsFilterPopupOpen(false)} />
            </Menu>
            <V5GlobalSliderForm
                open={open}
                solidBtnText="CREATE"
                outlinedBtnText="CANCEL"
                fieldsList={fieldsList}
                hasBrowsIcons={true}
                handleClose={closeDrawer}
                headerText="Report Name"
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

        </>
    }
    if ((loading === "failed" && reportListData?.length === undefined) || (loading === "complete" && reportListData)?.length === 0) {
        return <>
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Reports have been Configured yet."
                subTitleStart="Click To"
                subTitleLink="Add Report"
                clickHandler={openPopUp}
            />
            <V5GlobalSliderForm
                open={open}
                solidBtnText="CREATE"
                outlinedBtnText="CANCEL"
                fieldsList={fieldsList}
                hasBrowsIcons={true}
                handleClose={closeDrawer}
                headerText="Report Name"
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </>

    }
    else if (reportListData && reportListData?.length > 0) {
        return <>
            <V5GlobalHeaderActionList title={'Configure Report'}
                iconsList={[
                    {
                        iconType: 'note_add',
                        tooltipTitle: 'Add Module Report',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: addReport,
                    },
                    // {
                    //     iconType: 'SaveAltIcon',
                    //     tooltipTitle: 'Download Excel',
                    //     areaLabel: 'upload picture',
                    //     iconComponent: 'span',
                    //     // iconClickHandler: downloadClientDetails,
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
                ]} />
                <FilterChips chipInfo={reportFilterDetails} moduleList={moduleList} />
            <ReportList
                heading={reportTableHeaders}
                filterDetails={reportFilterDetails}
                tableData={reportListData}
                paginate={paginate}
                page={currentPage}
                pageSize={pageSize}
                pageNumber={pageNumber}
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                totalItems={totalRecords}
                setPageSize={handlePageSizeChange}
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
            <V5GlobalSliderForm
                open={open}
                solidBtnText="CREATE"
                outlinedBtnText="CANCEL"
                fieldsList={fieldsList}
                hasBrowsIcons={true}
                handleClose={closeDrawer}
                headerText="Report Name"
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

        </>
    }
    else if ((loading === "start" && reportListData?.length === 0) || reportListData?.length === undefined) {
        return <Loading />
    }

}

export default ReportManagement