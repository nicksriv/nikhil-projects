import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    // Checkbox,
    ClickAwayListener,
    FormControl,
    InputBase,
    MenuItem,
    Select,
    Tooltip,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Paginate from 'app/components/V5GlobalDataTable/Paginate';
//import DataTable from 'app/components/V5GlobalDataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    ConfirmationDialog,
    //    InfoDialogue 
} from 'app/components';
import history from 'helper/history.js';
//import { setShowClientDetailsPopup } from 'app/redux/ClientManagement/clientManagementSlice';
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu';
//import DetailsDailogue from 'app/components/DetailsDialogue/DetailsDailogue';
import ScreenBuilderTable from './ScreenBuilderTable';
//import { CalendarViewDayRounded } from '@material-ui/icons';
import FormHeadingPopup from './FormHeadingPopup';
import {
    setStateByName, setWorkEditDetails
} from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 0,
        // border: '1px solid gray',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        marginLeft: '1.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '2.5rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            // '-apple-system',
            // 'BlinkMacSystemFont',
            // '"Segoe UI"',
            // //'Roboto',
            // '"Helvetica Neue"',
            // 'Arial',
            "SF Pro Display",
            'sans-serif',
            // '"Apple Color Emoji"',
            // '"Segoe UI Emoji"',
            // '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
        marginTop: '1rem',
        borderRadius: '4px 4px 0px 0px',
        boxShadow: '0px 0px 1px gray',
    },
    iconsColor: {
        color: '#9f9f9e',
        display: 'flex',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#e4ebf7',
        whiteSpace: 'nowrap',
    },
    paginationCount: {
        marginLeft: 'auto',
        marginRight: '1%',
        marginTop: '1rem',
    },
    font: {
        fontSize: '14px',
        letterSpacing: '0.4px',
        color: '#000000DE',
        opacity: 0.7,
    },
    paginationContainer: {
        height: "40px",
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        position: 'sticky',
        bottom: 0,
        zIndex: 600,
        backgroundColor: '#f5f5f5',
        padding: '0 1rem',
    },
    tablePopupContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '0.3rem',
    },
    tablePopupHeading: {
        color: '#000000DE',
        padding: '0.5rem',
        margin: '0',
    },
    tablePopupIcon: {
        margin: '0.5rem 0.7rem 0 0.7rem',
        color: '#00000061',
    },
    deleteInfoText: {
        fontSize: "15px",
        whiteSpace: "pre-line",
        textAlign: "left",
        color: 'grey'
    },
    popOverMenu: {
        boxShadow: "-1px 10px 20px lightgrey",
        width: "200px",
        overflowY: "scroll",
        maxHeight: "23rem",
        marginTop: "-0.5rem",
        zIndex: "10000",
        display: "flex",
        flexDirection: "column",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
    },
}));

export default function ModuleList({
    indexOfFirstData,
    indexOfLastData,
    paginate,
    page,
    heading,
    currentPage,
    pageSize,
    tableData,
    setPageSize,
    totalItems,
    filterDetails,
    handleSubModuleCopy
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { moduleList, moduleFilterDetails, masterScreensWorkflowData,
        clientId, //statuses       
    } = useSelector((state) => state.screenBuilder);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    //const [selectedClientObjectId, setSelectedClientObjectId] = useState(null);
    //const [credentialNotFound, setCredentialNotFound] = useState(false);
    const [columnToSort, setColumnToSort] = useState('');
    const [sortDirection, setSortDirection] = useState('DESC');
    const anchorRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredTableHeading, setFilteredTableHeading] = useState([]);
    // const [checked, setChecked] = useState(true);
    const [checkedValues, setCheckedValues] = useState(['actionHeader']);
    //const [showPassword, setShowPassword] = useState(false);
    //const [formattedCredentialDetails, setFormattedCredentialDetails] =
    useState({});
    //const [showDraftInfoPopup, setShowDraftInfoPopup] = useState(false);
    //const [showInactiveInfoPopup, setShowInactiveInfoPopup] = useState(false);
    const [isModuleDeleting, setIsModuleDeleting] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [selectedSubmoduleId, setSelectedSubmoduleId] = useState(null);
    const [isAllCoumnsSelected, setIsAllCoumnsSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editSource, setEditSource] = useState("");   

    // Event Handlers
    const invertDirection = {
        ASC: 'DESC',
        DESC: 'ASC'
    }
    const text = `Are you sure want to delete?\n\nDeletion of a module will delete all sub modules under the module as well.`;
    const textSubmodule = `Are you sure want to delete?`;
    const [deleteMessage, setDeleteMessage] = useState(text);


    const handleEdit = (moduleInfo, source, submoduleInfo) => {
        setEditSource(source);
        if (source !== "module") {
            dispatch({
                type: setStateByName.type,
                payload: {
                    name: 'showMasterScreen',
                    value: true
                },
            });
        }
        let id = '';
        //if (moduleInfo.workFlowId) {
        if (source === "module") {
            // let smIndex = moduleList
            //     && moduleList.data
            //     && moduleList.data.findIndex(x => x.id == moduleInfo.id
            //         && x.subModules && x.subModules.length > 0);
            // if (smIndex != -1) {                    
            //     setOpen(!open);
            //     setSelectedModuleId(moduleInfo.id);
            // } else {

            //..AS DISCUSSED WORKFLOW SHOULD NOT BE DEFINE FOR PARENT MODULE HENCE COMMENTED BELOW CODE.
            //..ONLY USER CAN EDIT PARENT MODULE NAME
            setOpen(!open);
            setSelectedModuleId(moduleInfo.id);
            setInputValue(moduleInfo.name);
            // if (moduleInfo.workFlowId) {
            //     id = moduleInfo.workFlowId;
            //     dispatch({
            //         type: 'getWorkflowInfoByIdAction',
            //         payload: {
            //             workflowId: moduleInfo.workFlowId,
            //             masterScreensWorkflowData: masterScreensWorkflowData
            //         },
            //     });
            // } else {
            //     dispatch({
            //         type: setStateByName.type,
            //         payload: {
            //             name: 'workflowStatus',
            //             value: "ACTIVE"
            //         },
            //     });
            // }
            //}
        } else {
            if (submoduleInfo.workFlowId) {
                id = submoduleInfo.workFlowId;
                dispatch({
                    type: 'getWorkflowInfoByIdAction',
                    payload: {
                        workflowId: submoduleInfo.workFlowId,
                        masterScreensWorkflowData: masterScreensWorkflowData
                    },
                });
            } else {
                dispatch({
                    type: setStateByName.type,
                    payload: {
                        name: 'workflowStatus',
                        value: "ACTIVE"
                    },
                });
            }
        }
        if (source !== "module") {
            dispatch({
                type: setWorkEditDetails.type,
                payload: {
                    showMasterScreen: true,
                    moduleInfo: moduleInfo,
                    submoduleInfo: submoduleInfo,
                    source: source
                },
            });
            dispatch({ type: setStateByName.type, payload: { name: "selectedWorkflowId", value: id} })
            history.push(`/module/edit?id=${id}`);
        }
        // } else {
        //     dispatch({
        //         type: setWorkEditDetails.type,
        //         payload: {
        //             showMasterScreen: true,
        //             moduleInfo: moduleInfo,
        //             submoduleInfo: submoduleInfo
        //         },
        //     });
        //     history.push('/module/add');
        // }
    }
    const handlePopUpClose = (isClosed) => {
        if (isClosed) {
            setOpen(false);
        }
    }

    const handleTitleText = (e) => {
        const { value } = e.target;
        setInputValue(value);
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (editSource === "module") {
            dispatch({
                type: 'putModuleInfoAction',
                payload: {
                    moduleId: selectedModuleId,
                    data: { name: inputValue },
                    pageNumber: page,
                    size: pageSize,
                    filter: moduleFilterDetails,
                    clientId: clientId
                },
            });
        } else {

        }
        // dispatch({
        //     type: setFeatureTemplate.type,
        //     payload: {
        //         value: inputValue,
        //         data: featureTempData
        //     },
        // });
        // childRef.current.clearFormBuilderZone();
        setInputValue("");
        setOpen(false);
        // //..POST API CALL
        // dispatch({
        //     type: 'postFeatureTemplateAction',
        //     payload: {
        //         formData: featureTempData,
        //         name: inputValue,
        //         clientId: clientId,
        //         size: 10,
        //         page: 0
        //     },
        // });
    }
    const handleSort = (columnName) => {
        let converToUpperCase = columnName.toUpperCase().split(" ").join("_");
        setColumnToSort(converToUpperCase);
        setSortDirection(columnToSort === converToUpperCase ? invertDirection[sortDirection] : "ASC");
        dispatch({
            type: "setSortDirectionAction",
            direction: sortDirection,
            sortBy: columnToSort
        })
        dispatch({
            type: "getAllModulesSubmodulesAction",
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                sortBy: converToUpperCase,
                sortOrder: sortDirection,
                filter: moduleFilterDetails,
                clientId: clientId
            }
        });
    }
    const handleModuleDelete = (data) => {
        setDeleteMessage(text);
        setSelectedModuleId(data.id);
        setIsModuleDeleting(true);
        setShowDeletePopup(true);
    }
    const handleSubModuleDelete = (moduleInfo, submoduleInfo) => {
        setDeleteMessage(textSubmodule);
        setSelectedModuleId(moduleInfo.id);
        setSelectedSubmoduleId(submoduleInfo.id);
        setIsModuleDeleting(false);
        setShowDeletePopup(true);
    }
    
    function confirmDelete() {
        try {
            if (isModuleDeleting) {
                dispatch({
                    type: 'deleteModuleInfoAction',
                    payload: {
                        moduleId: selectedModuleId,
                        pageNumber: page,
                        size: pageSize,
                        filter: moduleFilterDetails,
                        clientId: clientId
                    }
                });
            } else {
                dispatch({
                    type: 'deleteSubModuleInfoAction',
                    payload: {
                        subModuleId: selectedSubmoduleId,
                        moduleId: selectedModuleId,
                        pageNumber: page,
                        size: pageSize,
                        filter: moduleFilterDetails,
                        clientId: clientId
                    }
                });
            }
            // dispatch({
            //     type: 'getAllModulesSubmodulesAction',
            //     payload: {
            //         pageNumber: page,
            //         size: pageSize,
            //         filter: moduleFilterDetails,
            //         clientId: clientId
            //     },
            // });
            setShowDeletePopup(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleView = () => { }

    function selectColumn(key) {
        if (checkedValues && checkedValues.length) {
            if (key !== "all") {
                setCheckedValues(
                    checkedValues.includes(key)
                        ? checkedValues.filter((c) => {
                            if (key === "subModules") {
                                return c !== key && c !== "drop"
                            } else {
                                return c !== key
                            }

                        })
                        : key === "subModules" ? [...checkedValues, key, "drop", "name"] : [...checkedValues, key]
                );
                const cv = checkedValues.includes(key)
                    ? checkedValues.filter((c) => c !== key)
                    : [...checkedValues, key];

                let all = true;
                heading.forEach((el) => {
                    if (!cv.includes(el.key)) {
                        all = false;
                    }

                });
                setIsAllCoumnsSelected(all);
            } else {
                let cv = [];

                heading.forEach((el) => {
                    cv.push(el.key);
                });
                setCheckedValues(cv);
                setIsAllCoumnsSelected(true);
            }
        }

    }
    useEffect(() => {
        if (heading && heading.length) {
            const filterHeading = heading.filter((el) =>
                checkedValues.includes(el.key)
            );
            setFilteredTableHeading(filterHeading);
        }
    }, [checkedValues]);

    return (
        <div style={{ padding: "5px" }}>
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div className={`${classes.popOverMenu}`}>
                        <div key={"all_0"} className={classes.tablePopupContainer}  >
                            <Button onClick={() => selectColumn("all")}
                                style={{ justifyContent: "left" }} className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5 ${isAllCoumnsSelected ? "color-primary border-primary" : "color-gray border-gray"}`}
                            >
                                {"Select All"}
                            </Button>
                        </div>
                        {heading.map((el, index) => {
                            return el.key !== "drop" && <div key={index} className={classes.tablePopupContainer}>
                                {el.icon ? null :
                                    <Tooltip title={el.name.length >= 14? el.name : ""}>
                                    <Button onClick={() => selectColumn(el.key)}
                                        style={{ justifyContent: "left" }} className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5 ${checkedValues.includes(el.key) ? "color-primary border-primary" : "color-gray border-gray"}`}

                                    >
                                        {el.key && el.key === "subModules" ? el.name.slice(0, 14) + "..." : el.name}
                                    </Button>
                                    </Tooltip>
                                }
                            </div>
                        })}
                    </div>
                </ClickAwayListener>
            </PopoverMenu>
            <ScreenBuilderTable
                hasCopyIcon={true}
                hasDeleteIcon={true}
                hasEditIcon={true}
                hasInfoIcon={false}
                hasViewIcon={true}
                tableHeading={
                    filteredTableHeading.length > 1
                        ? filteredTableHeading
                        : heading
                }
                tableData={tableData}
                handleEdit={handleEdit}
                handleSort={handleSort}
                columnToSort={columnToSort}
                sortDirection={sortDirection}
                handleModuleDelete={handleModuleDelete}
                handleSubModuleCopy={handleSubModuleCopy}
                handleSubModuleDelete={handleSubModuleDelete}
                handleView={handleView}
                reference={anchorRef}
                setIsOpen={setIsOpen}
                filterDetails={filterDetails}
            />

            <div className={classes.paginationContainer}>
                <div className="flex items-end justify-centers">
                    <Paginate page={page} paginate={paginate} pageSize={pageSize} listSize={moduleList.size} />
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            input={<BootstrapInput />}
                            value={pageSize}
                            onChange={(e) => setPageSize(e.target.value)}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <p
                        className={`mb-2 font-normal ml-3 ${classes.font}`}
                        shrink
                        id="demo-simple-select-placeholder-label-label"
                    >
                        items per page
                    </p>
                </div>

                <div className={classes.paginationCount}>
                    <p className={`font-normal mt-2 ${classes.font}`}>
                        {indexOfFirstData + 1} -
                        {' '}{indexOfLastData > totalItems
                            ? totalItems
                            : indexOfLastData}{' '}
                        of {totalItems} items
                    </p>
                </div>
            </div>
            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setShowDeletePopup(false)}
                text={<div className={classes.deleteInfoText}>{deleteMessage}</div>}
                onYesClick={confirmDelete}
            />
            <FormHeadingPopup
                open={open}
                charecterLimit={24}
                isRequired={true}
                popupHeading="Rename"
                inputLabel="Module Name"
                inputValue={inputValue}
                inputName={""}
                handlePopUpClose={handlePopUpClose}
                handleTitleText={handleTitleText}
                handleSave={handleSave} />
        </div>
    )
}
