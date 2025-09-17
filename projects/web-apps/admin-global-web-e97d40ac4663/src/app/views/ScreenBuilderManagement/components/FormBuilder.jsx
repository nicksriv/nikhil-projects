import React, { useState, useRef, useEffect } from 'react';
import {
    Grid, TextField, Button, //GridListTile,
    MenuItem, Checkbox, Tooltip, Collapse,
    FormControlLabel
} from '@material-ui/core';
//import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from 'helper/history.js';
import queryString from 'query-string';
import 'v5gl-form-builder/dist/app.css';
import {
    V5FormBuilder, V5FormBuilderDemoBar, V5FormBuilderToolbar,
    V5FormBuilderRefHandlers,
    V5FormBuilderFeatureTemplate,
    V5FormBuilderMasterScreens
} from 'v5gl-form-builder';
import { DndProvider } from 'react-dnd';
import Info from '@material-ui/icons/Info';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilderHeader from './FormBuilderHeader';
import { useDispatch, useSelector } from 'react-redux';
import './css/screen-builder.css';
import Multiselect from 'app/components/Multiselect/Multiselect';
import FormHeadingPopup from './FormHeadingPopup';
import ScreenSkeleton from './ScreenSkeleton';
import { ConfirmationDialog } from '../../../components';
import {
    setStateByName, setFeatureTemplate,
    setWorkflowDragnDropState,
    setApprovalMechanism,
    setTabSelectionState
} from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice';
import { config } from 'helper/config';
import { setUploadVideoFileService, setUploadDocumentService } from 'app/redux/ClientManagement/clientManagementService';
const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const APIVERSION = "api/v1";

const useStyles = makeStyles((theme) => ({
    dropZoneContainer: {
        backgroundColor: "#f5f5f5",
        padding: "2rem"
    },
    toolsHeaderWrap: {
        maxWidth: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
            //display: 'none'
            width: "0em"
        }
    },
    privilegeContainer: {
        position: 'relative',
        border: '1px solid lightgray',
        marginTop: '2rem',
        padding: '0 1rem'
    },
    privilegeContainerDisabled: {
        opacity: 0.5,
    },
    checkbox: {
        position: 'absolute',
        left: '5px',
        top: '3px',
    },
    label: {
        fontSize: '0.75rem',
        //opacity: 0.5
        color: "#00000099"
    },
    label1: {
        fontSize: '0.75rem',
        //opacity: 1
        color: "#000000DE"
    },
    customWidth: {
        maxWidth: 200,
        //fontSize: "0.80rem",
        fontSize: theme.typography.pxToRem(13),
        fontWeight: "normal"
    },
    infoIcon: {
        color: "#00000099"
    },
    infoIconHover: {
        "&:hover": {
            color: theme.palette.primary.main
        }
    }
}));
const tabEnum = {
    COMPONENT: 'COMPONENT',
    FEATURE_TEMPLATE: 'FEATURE TEMPLATE',
    PRIVILEGE: 'PRIVILEGE'
}
function FormBuilder(props) {
    // const { } = props;
    const dispatch = useDispatch();
    const childRef = useRef();
    const toolbarProps = {
        items: [
            'Short_Text',
            'Long_Text',
            'Button',
            'Number',
            'Mapping_Dropdown',
            'Dropdown',
            'Single_Choice',
            'Button_Radios',
            'Location_Coordinates',
            'Photo',
            'Video',
            'Check_List',
            'Email',
            'Phone',
            'Date_Picker',
            'Time',
            // 'Configurable_List',
            'Barcode_Scanner',
            'Section_Header',
            'Signature',
            'Tiles',
            'Attachment',
            // 'Header',
            // 'Tab_Break',
            // 'Input_Table',
            // 'Photo_PREPOST',
            // 'Page_Break',
            // 'Two_Column_Row',
            // 'Three_Column_Row',
            // 'Four_Column_Row'
        ]
    };
    const classes = useStyles();
    const {
        fileId,
        createdModule,
        featureTemplate,
        moduleId,
        subModuleId,
        screenData,
        clientId,
        masterScreensWorkflowData,
        workflowRequest,
        workflowRoles,
        showMasterScreen,
        roleName,
        isWorkflowDataLoading,
        screenId,
        clientSubModulesList,
        workflowRequestBackup,
        masterScreensWorkflowDataBackup,
        workflowInformation,
        workflowStatus,
        mappedByValue,
        screenName,
        selectedWorkflowId } = useSelector(
            (state) => state.screenBuilder
        );
    const { clientLogoForHeader } = useSelector((state) => state.clients)
    const { clientIdForUserLogo } = useSelector((state) => state.users);
    const [open, setOpen] = useState(false);
    //const [formHeading, setFormHeading] = useState("Feature Template Title");
    const [featureTempData, setFeatureTempData] = useState("Feature Template Title");
    const [selectedTab, setTab] = useState(tabEnum.COMPONENT);
    const [checked, setChecked] = useState(false);
    const [setupChecked, setSetupChecked] = useState(false);
    const [dataTableChecked, setDataTableChecked] = useState(false);
    const [internalScreensChecked, setInternalScreensChecked] = useState(false);
    const [showAlertMsg, setShowAlertMsg] = useState(false);
    //const [showMasterScreen, setShowMasterScreen] = useState(false);
    const [pageMode, setPageMode] = useState('add');
    const [workflowPageMode, setWorkflowPageMode] = useState('');
    const [workflowId, setWorkflowId] = useState('');
    const [screenIndex, setScreenIndex] = useState(0);
    const [screenTitle, setScreenTitle] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isAccessPriviledge, setIsAccessPriviledge] = useState(true);
    const [isConsolidateTeamsData, setIsConsolidateTeamsData] = useState(false);
    const [mappedBy, setMappedBy] = useState(null);
    const [selectedModule, setSelectedModule] = useState("");
    const [showPrivilegePopup, setShowPrivilegePopup] = useState(false);
    const [showPrivilegePreviewPlaceholder, setShowPrivilegePreviewPlaceholder] = useState(false);
    const [ setCheckedFeatureTemplateComponent] = useState([]);
    //const [workflowStatus, setWorkflowStatus] = useState("ACTIVE");
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [attachmentId, setAttachmentId] = useState(localStorage.getItem('AttachmentId'));

    const consolidateTooltip1 = `
    1. This rule will consolidate the team's data for the users working under that role.
    `;
    const consolidateTooltip2 = `    
    2. All screens will be in read-only mode.`;
    const consolidateTooltip3 = `
    This rule will consolidate the team's data for the users working under that role.`;
    // const roles = [
    //     'Oliver Hansen',
    //     'Van Henry',
    //     'April Tucker',
    //     'Ralph Hubbard',
    //     'Omar Alexander',
    //     'Carlos Abbott',
    //     'Miriam Wagner',
    //     'Bradley Wilkerson',
    //     'Virginia Andrews',
    //     'Kelly Snyder',
    // ];
    //const [roleName, setRoleName] = useState([]);
    const handleWorkflowStatus = (status) => {
        //setWorkflowStatus(status);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'workflowStatus',
                value: status
            },
        });
    }
    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        //alert(roleName);
        //alert(typeof value === 'string' ? value.split(',') : value);
        // setRoleName(
        //     // On autofill we get a the stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'roleName',
                value: typeof value === 'string' ? value.split(',') : value
            },
        });
        // dispatch({
        //     type: 'postWorkflowInfoAction',
        //     payload: {
        //         moduleId: moduleId,
        //         subModuleId: subModuleId,
        //         clientId: clientId,
        //         workflowData: workflowRequest,
        //         workflowPageMode: workflowPageMode,
        //         workflowId: workflowId,
        //         isConsolidateTeamsData: isConsolidateTeamsData,
        //         dataTableChecked: dataTableChecked,
        //         internalScreensChecked: internalScreensChecked,
        //         mappedBy: mappedBy,
        //         selectedRoles: roleName,
        //         clientRoles: workflowRoles,
        //         masterScreensWorkflowData: masterScreensWorkflowData,
        //         workflowStatus: workflowStatus
        //     },
        // });
    };
    const handleDeleteRole = (value) => {

    }

    async function uploadFile(file, type) {
        let id = "";
        if (type === 'file') {
            let data = new FormData();
            data.append('file', file);
            // dispatch({
            //     type: "postFileAction",
            //     file: data
            // })
            try {
                const res = await setUploadDocumentService(data);
                id = res.id;
            } catch (error) {}
        } else {
            let data = new FormData();
            data.append('file', file);
            // dispatch({
            //     type: "postVideoFileAction",
            //     file: data
            // })
            try {
                const res = await setUploadVideoFileService(data);
                id = res.id;
            } catch (error) {}
        }
        return id;
    }

    const uploadFileOnSave = (Files) => {
        let data = new FormData();
        data.append('file', Files);
        dispatch({
            type: "postFileAction",
            file: data
        })
    }
    const uploadVideoFileOnSave = (Files) => {
        if (Files.size < 1e+7){
            let data = new FormData();
            data.append('file', Files);
            dispatch({
                type: "postVideoFileAction",
                file: data
            })
        }
    }
    // const uploadLogoIdValue = () => {
    //     return uploadLogoId
    // }
    const handleBack = (e) => {
        history.push('/screen-builder');
    }
    const handleInputCheck = (e, source) => {
        if (source === "consolidate") {
            setChecked(!checked);
            if (!e.target.checked) {
                setSetupChecked(false);
                setIsConsolidateTeamsData(false);
                setDataTableChecked(false);
                dispatch({
                    type: setApprovalMechanism.type,
                    payload: {
                        source: "datatable",
                        checked: false
                    },
                });
                //..If Data table checked
                if (dataTableChecked) {
                    setDataTableChecked(false);
                    //..SET APPROVAL MECHANISM
                    dispatch({
                        type: setApprovalMechanism.type,
                        payload: {
                            source: "datatable",
                            checked: false
                        },
                    });
                }
                //..If Internal Screens Checked
                if (internalScreensChecked) {
                    setInternalScreensChecked(false);
                    //..SET APPROVAL MECHANISM
                    dispatch({
                        type: setApprovalMechanism.type,
                        payload: {
                            source: "internal",
                            checked: false
                        },
                    });
                }
                //..If module selected
                if (selectedModule) {
                    setSelectedModule("");
                    //if (workflowRequestBackup && workflowRequestBackup.length > 0) {
                    //..SET DATA IN ORIGINAL STATE
                    dispatch({
                        type: setStateByName.type,
                        payload: {
                            name: 'workflowRequest',
                            value: workflowRequestBackup
                        },
                    });
                    //}
                    if (masterScreensWorkflowDataBackup && masterScreensWorkflowDataBackup.length > 0) {
                        dispatch({
                            type: setStateByName.type,
                            payload: {
                                name: 'masterScreensWorkflowData',
                                value: masterScreensWorkflowDataBackup
                            },
                        });
                    }
                }

            } else {
                if (createdModule && createdModule.moduleId) {
                    //..GET SUBMODULES OF SELECTED MODULE FOR ACCESS PRIVILEDGE
                    dispatch({
                        type: 'getSubModulesListAction',
                        payload: {
                            moduleId: createdModule.moduleId
                        },
                    });
                }
            }

        } else if (source === "datatable") {
            setDataTableChecked(!dataTableChecked);
        } else if (source === "internal") {
            setIsConsolidateTeamsData(true);
            setInternalScreensChecked(!internalScreensChecked);
        }
        //..SET APPROVAL MECHANISM
        dispatch({
            type: setApprovalMechanism.type,
            payload: {
                source: source,
                checked: e.target.checked
            },
        });
    }
    const handleSetupCheck = (e) => {
        const { checked } = e.target;
        setSetupChecked(!setupChecked);
        if (!checked) {
            setDataTableChecked(false);
            setInternalScreensChecked(false);
            setIsConsolidateTeamsData(false);
            //..SET APPROVAL MECHANISM
            dispatch({
                type: setApprovalMechanism.type,
                payload: {
                    source: "datatable",
                    checked: false
                },
            });
            //..SET APPROVAL MECHANISM
            dispatch({
                type: setApprovalMechanism.type,
                payload: {
                    source: "internal",
                    checked: false
                },
            });
        }
    }
    const saveFormData = (e, data) => {
        setIsSaveClicked(true);
        e.preventDefault();
        setShowPrivilegePreviewPlaceholder(false);
        if (pageMode === "editmasterscreen") {
            dispatch({
                type: 'putFormDataAction',
                payload: {
                    createdModule: createdModule,
                    subModuleId: subModuleId,
                    moduleId: moduleId,
                    screenData: data,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowRequest: workflowRequest,
                    selectedRoles: roleName,
                    pageMode: pageMode,
                    screenIndex: screenIndex,
                    screenName: screenName,
                    screenId: screenId,
                    //for publish workflow
                    clientId: clientId,
                    workflowId: workflowId,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedBy,
                    clientRoles: workflowRoles,
                    workflowStatus: "DRAFT"
                },
            });
        } else {
            dispatch({
                type: 'postFormDataAction',
                payload: {
                    createdModule: createdModule,
                    subModuleId: subModuleId,
                    moduleId: moduleId,
                    screenData: data,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowRequest: workflowRequest,
                    selectedRoles: roleName,
                    pageMode: pageMode,
                    screenIndex: screenIndex,
                    screenName: screenName,
                    //for publish workflow
                    clientId: clientId,
                    workflowId: workflowId,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedBy,
                    clientRoles: workflowRoles,
                    workflowData: workflowRequest,
                    workflowStatus: "DRAFT"
                },
            });
        }
        //setShowMasterScreen(true);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'showMasterScreen',
                value: true
            },
        });
    }

    useEffect(()=>{
        //draft status
        if (!workflowId && isSaveClicked) {
            dispatch({
                type: 'postWorkflowInfoAction',
                payload: {
                    moduleId: moduleId,
                    subModuleId: subModuleId,
                    clientId: clientId,
                    workflowData: workflowRequest,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedBy,
                    selectedRoles: roleName,
                    clientRoles: workflowRoles,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowStatus: "DRAFT"
                },
            });
        }
        else if (workflowId && workflowStatus === "DRAFT" && isSaveClicked) {
            dispatch({
                type: 'postWorkflowInfoAction',
                payload: {
                    moduleId: moduleId,
                    subModuleId: subModuleId,
                    clientId: clientId,
                    workflowData: workflowRequest,
                    workflowPageMode: "edit",
                    workflowId: workflowId,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedByValue ? mappedByValue : mappedBy,
                    selectedRoles: roleName,
                    clientRoles: workflowRoles,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowStatus: "DRAFT",
                    screenName: screenName
                },
            });
        }
        let wd = masterScreensWorkflowData.slice(0);
        if (internalScreensChecked) {
            wd.map((d, i) => {
                if (!d.isListingPage && d.screenData && d.screenData.length > 0 && d.screenId) {

                    dispatch({
                        type: 'putFormDataAction',
                        payload: {
                            createdModule: createdModule,
                            subModuleId: subModuleId,
                            moduleId: moduleId,
                            screenData: d.screenData,
                            masterScreensWorkflowData: masterScreensWorkflowData,
                            workflowRequest: workflowRequest,
                            selectedRoles: roleName,
                            pageMode: pageMode,
                            screenIndex: i,
                            screenName: d.screenTitle,
                            screenId: d.screenId,
                            isFromPublish: true
                        },
                    });
                }
            });
        }
        // setIsSaveClicked(false);
        setIsSaveClicked(false);
        setWorkflowPageMode("edit");
    }, [workflowRequest])
    
    const publishFormData = (e, data) => {
        e.preventDefault();
        if (workflowPageMode === "edit") {
            dispatch({
                type: 'postWorkflowInfoAction',
                payload: {
                    moduleId: moduleId,
                    subModuleId: subModuleId,
                    clientId: clientId,
                    workflowData: workflowRequest,
                    workflowPageMode: workflowPageMode,
                    workflowId: workflowId,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedByValue ? mappedByValue : mappedBy,
                    selectedRoles: roleName,
                    clientRoles: workflowRoles,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowStatus: workflowStatus ==="DRAFT"? "ACTIVE": workflowStatus,
                    screenName: screenName
                },
            });
        } else {
            dispatch({
                type: 'postWorkflowInfoAction',
                payload: {
                    moduleId: moduleId,
                    subModuleId: subModuleId,
                    clientId: clientId,
                    workflowData: workflowRequest,
                    isConsolidateTeamsData: isConsolidateTeamsData,
                    dataTableChecked: dataTableChecked,
                    internalScreensChecked: internalScreensChecked,
                    mappedBy: mappedBy,
                    selectedRoles: roleName,
                    clientRoles: workflowRoles,
                    masterScreensWorkflowData: masterScreensWorkflowData,
                    workflowStatus: workflowStatus ==="DRAFT"? "ACTIVE": workflowStatus,
                },
            });
        }
        let wd = masterScreensWorkflowData.slice(0);
        if (internalScreensChecked) {
            wd.map((d, i) => {
                if (!d.isListingPage && d.screenData && d.screenData.length > 0 && d.screenId) {
                
                    dispatch({
                        type: 'putFormDataAction',
                        payload: {
                            createdModule: createdModule,
                            subModuleId: subModuleId,
                            moduleId: moduleId,
                            screenData: d.screenData,
                            masterScreensWorkflowData: masterScreensWorkflowData,
                            workflowRequest: workflowRequest,
                            selectedRoles: roleName,
                            pageMode: pageMode,
                            screenIndex: i,
                            screenName: d.screenTitle,
                            screenId: d.screenId,
                            isFromPublish: true
                        },
                    });
                }
            });
        }
        history.push('/screen-builder');
    }
    const setFormData = (data) => {
        dispatch({
            type: 'setFormDataAction',
            payload: {
                data: data
            },
        });
    }
    const saveFeatureTemplate = (e, data) => {
        e.preventDefault();
        if (data) {
            setFeatureTempData(data);
            setOpen(!open);
        }
        // if (checkedFeatureTemplateComponent && checkedFeatureTemplateComponent.length > 0) {
        //     const sd = data && data.filter(d => {
        //         let elIndex = checkedFeatureTemplateComponent.findIndex(x => x.id == d.id);
        //         if (elIndex != -1) {
        //             return d;
        //         }
        //     });
        //     setFeatureTempData(sd);
        //     setOpen(!open);
        // } else {
        //     setShowAlertMsg(true);
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
        dispatch({
            type: setFeatureTemplate.type,
            payload: {
                value: inputValue,
                data: featureTempData
            },
        });
        setInputValue("");
        setOpen(false);
        //..POST API CALL
        dispatch({
            type: 'postFeatureTemplateAction',
            payload: {
                formData: featureTempData,
                name: inputValue,
                clientId: clientId,
                size: 10,
                page: 0
            },
        });
        // .. GET API CALL
        dispatch({
            type: 'getAllFeatureTemplatesAction',
            payload: {
                size: 10,
                page: 0
            },
        });
    }
    const handleTab = (e, selectedTab) => {
        if (selectedTab === tabEnum.PRIVILEGE && (screenData.length > 0 || screenName)) {
            document.getElementById('content').scrollBy(60, 0);
            setShowPrivilegePopup(true);
            setShowPrivilegePreviewPlaceholder(false);
        } else if (selectedTab === tabEnum.PRIVILEGE && screenData.length === 0 && !screenName) {
            document.getElementById('content').scrollBy(60, 0);
            setTab(selectedTab);
            if (workflowPageMode === "add") {
                setShowPrivilegePreviewPlaceholder(true);
                dispatch({
                    type: setTabSelectionState.type,
                    payload: {
                        workflowPageMode: workflowPageMode,
                        selectedTab: tabEnum.PRIVILEGE
                    },
                });
            }
            if (workflowPageMode === "edit") {
                dispatch({
                    type: setStateByName.type,
                    payload: {
                        name: 'showMasterScreen',
                        value: true
                    },
                });
            }
        } else {
            document.getElementById('content').scrollBy(-60, 0);
            setTab(selectedTab);
            dispatch({
                type: setTabSelectionState.type,
                payload: {
                    workflowPageMode: workflowPageMode,
                    selectedTab: selectedTab
                },
            });
            dispatch({
                type: setStateByName.type,
                payload: {
                    name: 'screenName',
                    value: screenName
                },
            });
            if (workflowPageMode === "add") {
                setChecked(false);
                setSetupChecked(false);
                setDataTableChecked(false);
                setInternalScreensChecked(false);
                setIsConsolidateTeamsData(false);
                setMappedBy(null);
                setSelectedModule("");
            }
        }
        // if (workflowPageMode === "add" && selectedTab === tabEnum.PRIVILEGE) {

        // } else if (workflowPageMode === "add" &&
        //     (selectedTab === tabEnum.COMPONENT || selectedTab === tabEnum.FEATURE_TEMPLATE)) {

        // }
    }
    const handleFormElementCheck = (e, data) => {
        setCheckedFeatureTemplateComponent(data);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'formElementCheck',
                value: data
            },
        });
    }
    const handleMasterScreenAdd = (indexNumber) => {
        setPageMode('add');
        setScreenIndex(indexNumber);
        setTab(tabEnum.COMPONENT);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'showMasterScreen',
                value: false
            },
        });
        //setShowMasterScreen(false);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenData',
                value: []
            },
        });
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenName',
                value: ""
            },
        });
    }
    const handleMasterScreenEdit = (indexNumber, screenTitle) => {
        setPageMode('editmasterscreen');
        setScreenIndex(indexNumber);
        setScreenTitle(screenTitle);
        //setShowMasterScreen(false);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'showMasterScreen',
                value: false
            },
        });
        const md = masterScreensWorkflowData.slice(0);
        const sid = md[indexNumber].screenId;
        const sd = md[indexNumber].screenData;
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenData',
                value: sd
            },
        });
        dispatch({
            type: 'getScreenInfoByScreenIdAction',
            payload: {
                screenId: sid
            },
        });
    }
    const handleWorkflowDataDnD = (data) => {
        dispatch({
            type: setWorkflowDragnDropState.type,
            payload: {
                data: data
            },
        });
    }
    const handleConsolidateModule = (e) => {
        setIsConsolidateTeamsData(true);
        setMappedBy(e.target.value);
        setSelectedModule(e.target.value);
        if (internalScreensChecked) {
            setInternalScreensChecked(false);
        }
        //..GET Workflow Details by Module Id and Sub module Id
        dispatch({
            type: 'getWorkflowInfoBySubmoduleIdAction',
            payload: {
                moduleId: moduleId,
                subModuleId: e.target.value,
                workflowRequest: workflowRequest,
                masterScreensWorkflowData: masterScreensWorkflowData,
            },
        });
        setShowPrivilegePreviewPlaceholder(false);
    }
    const confirmPrivilege = () => {
        childRef.current.clearFormBuilderZone();
        setTab(tabEnum.PRIVILEGE);
        setShowPrivilegePopup(false);
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenData',
                value: []
            },
        });
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'screenName',
                value: ""
            },
        });
        dispatch({
            type: setStateByName.type,
            payload: {
                name: 'showMasterScreen',
                value: true
            },
        });
        dispatch({
            type: setTabSelectionState.type,
            payload: {
                workflowPageMode: workflowPageMode,
                selectedTab: tabEnum.PRIVILEGE
            },
        });
        if (workflowPageMode === "add") {
            setShowPrivilegePreviewPlaceholder(true);
            setChecked(false);
            setSetupChecked(false);
            setDataTableChecked(false);
            setInternalScreensChecked(false);
            setIsConsolidateTeamsData(false);
            setMappedBy(null);
            setSelectedModule("");
        }
    };
    useEffect(() => {
        // if (window.performance) {
        //     if (performance.navigation.type == 1) {
        //       alert( "This page is reloaded" );
        //     } else {
        //       alert( "This page is not reloaded");
        //     }
        //   }
        //..GET ALL FEATURE TEMPLATES
        dispatch({
            type: 'getAllFeatureTemplatesAction',
            payload: {
                size: 10,
                page: 0
            },
        });
        //..GET CLIENT ROLES BY CLIENT ID 
        dispatch({
            type: 'getClientRolesByIdAction',
            payload: {
                clientId: clientId
            },
        });
        if (createdModule && createdModule.moduleId) {
            //..GET SUBMODULES OF SELECTED MODULE FOR ACCESS PRIVILEDGE
            dispatch({
                type: 'getSubModulesListAction',
                payload: {
                    moduleId: createdModule.moduleId
                },
            });
        }
        //..EDIT CLIENT
        const parsedQS = queryString.parse(window.location.search);
        const { pathname } = window.location;
        setWorkflowPageMode(pathname.replace("/module/", "") && pathname.replace("/module/", "").trim());
        if (parsedQS && parsedQS.id) {
            setWorkflowId(parsedQS.id);
        }
    }, [dispatch]);

    useEffect(()=>{
        if (selectedWorkflowId)
        setWorkflowId(selectedWorkflowId);
    }, [selectedWorkflowId])

    useEffect(() => {
        if (isWorkflowDataLoading && masterScreensWorkflowData.length > 0) {
            //..EDIT MODULE/SUBMODULE :: FETCH ALL SCREENS DATA BY SCREEN ID 
            // dispatch({
            //     type: 'getWorkflowFormDataAction',
            //     payload: {
            //         masterScreensWorkflowData: masterScreensWorkflowData
            //     },
            // });
            let wd = masterScreensWorkflowData.slice(0);

            wd.map((d, i) => {
                if (!d.isListingPage && d.screenData && d.screenData.length <= 0) {
                    dispatch({
                        type: 'getWorkflowFormDataAction',
                        payload: {
                            screenId: d.screenId,
                            index: i
                        },
                    });
                }
            });
            if (!dataTableChecked) {
                dispatch({
                    type: setApprovalMechanism.type,
                    payload: {
                        source: "datatable",
                        checked: false
                    },
                });
            }
        }
    }, [masterScreensWorkflowData]);

    useEffect(() => {
        //..SET ACCESS PRIVILEDGE ENABLE/DISABLE STATE            
        if (clientSubModulesList
            && clientSubModulesList.length > 1
            && createdModule.isChildModule) {
            setIsAccessPriviledge(false);
        }
    }, [clientSubModulesList]);

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    useEffect(() => {
        if (workflowInformation && workflowInformation.mappedBy) {
            setChecked(true);
            setIsConsolidateTeamsData(true);
            setSelectedModule(workflowInformation.mappedBy);
        }
        if (workflowInformation.hasApprovalOnTable) {
            setSetupChecked(true);
            setDataTableChecked(!dataTableChecked);
        }
        if (workflowInformation.hasApprovalOnScreens) {
            setSetupChecked(true);
            setInternalScreensChecked(true);
        }
    }, [workflowInformation]);

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };
    const handleFeatureTemplateDelete = (templateId) => {
        dispatch({
            type: 'deleteFeatureTemplatesByIdAction',
            payload: {
                size: 10,
                page: 0,
                templateId: templateId
            },
        });
    }
    const handleDownloadTemplate = () => {
        dispatch({
            type: "getMasterDataDropDownAction",
            clientId: clientIdForUserLogo
        })
    }
    return (
        <div>
            <form>
                <div className="flex flex-wrap mt-2">
                    <Grid className="block flex-column" lg={8} md={12} sm={12} xs={12}>
                        <Grid className="flex-column w-full pl-8 pr-8" lg={12} md={12} sm={12} xs={12} style={{ backgroundColor: "#F5F4F4" }}>
                            <Grid className="flex mb-4 mt-2">
                                <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                                <h1 className="ml-10px h1">Workflow</h1>
                            </Grid>
                            <Grid container direction="row" spacing="1" className='mb-2' lg={12} md={12} sm={12} xs={12}>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <TextField
                                        id="moduleName"
                                        name="moduleName"
                                        label="Module Name"
                                        type="text"
                                        variant="outlined"
                                        className="w-full pr-2"
                                        value={createdModule.moduleName}
                                        disabled
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} >
                                    <TextField
                                        id="parentsModuleName"
                                        name="parentsModuleName"
                                        label="Parent's Module Name"
                                        type="text"
                                        value={createdModule.parentModuleName}
                                        variant="outlined"
                                        className="w-full pr-2"
                                        disabled
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} >
                                    <Multiselect
                                        roles={workflowRoles}
                                        roleName={roleName}
                                        handleRoleChange={handleRoleChange}
                                        handleDelete={handleDeleteRole}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className="pr-8 pl-8 pt-1" style={{ backgroundColor: "#F5F4F4" }}>
                            {
                                !showMasterScreen &&
                                (
                                    <DndProvider backend={HTML5Backend}>
                                        <V5FormBuilder
                                            data={JSON.parse(JSON.stringify(screenData))}
                                            handleFormElementCheck={handleFormElementCheck}
                                            formBuilderHeaderComponent={FormBuilderHeader}
                                            pageMode={pageMode}
                                            screenTitle={screenTitle}
                                            url={'http://localhost:1337/api/v1/screen/formdata'}
                                            uploadFile={uploadFile}
                                            fileId={fileId}
                                        />
                                    </DndProvider>
                                )
                            }
                            {
                                showMasterScreen &&
                                (
                                    <V5FormBuilderMasterScreens
                                        showPrivilegePreviewPlaceholder={showPrivilegePreviewPlaceholder}
                                        status={workflowStatus}
                                        handleStatusChange={handleWorkflowStatus}
                                        internalScreensChecked={internalScreensChecked}
                                        masterScreensWorkflowData={JSON.parse(JSON.stringify(masterScreensWorkflowData))}
                                        handleWorkflowDataDnD={handleWorkflowDataDnD}
                                        handleAdd={handleMasterScreenAdd}
                                        ScreenSkeletonComponent={ScreenSkeleton}
                                        clientLogo={`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/logo`}
                                        handleEdit={handleMasterScreenEdit} />
                                )
                            }
                            <V5FormBuilderDemoBar
                                screenName={screenName}
                                showMasterScreen={showMasterScreen}
                                saveFeatureTemplate={saveFeatureTemplate}
                                discardHandler={handleBack}
                                saveFormData={saveFormData}
                                clientLogo={`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/logo`}
                                clientLogoForHeader={clientLogoForHeader}
                                publishFormData={publishFormData}
                                masterScreensWorkflowData={masterScreensWorkflowData}
                            />
                            <V5FormBuilderRefHandlers ref={childRef} />
                        </Grid>
                    </Grid>
                    <Grid lg={4} md={12} sm={12} xs={12} className={`mt-5 ${selectedTab !== tabEnum.FEATURE_TEMPLATE && 'bg-white'} pt-5 pl-5 pr-5`}>
                        <Grid xs={12}>
                            <Grid id="content" className={`ml-2 ${classes.toolsHeaderWrap}`}>
                                <Button
                                    style={{ borderRadius: '22px', position: 'relative' }}
                                    className={`mr-2 ${selectedTab === tabEnum.COMPONENT && 'bg-primary text-black'}`}
                                    onClick={(e) => handleTab(e, tabEnum.COMPONENT)}
                                    variant={`${selectedTab === tabEnum.COMPONENT ? 'contained' : 'outlined'}`}>
                                    COMPONENT
                                </Button>
                                <Button
                                    style={{ borderRadius: '22px', position: 'relative' }}
                                    className={`mr-2 ${selectedTab === tabEnum.FEATURE_TEMPLATE && 'bg-primary text-black'}`}
                                    onClick={(e) => handleTab(e, tabEnum.FEATURE_TEMPLATE)}
                                    variant={`${selectedTab === tabEnum.FEATURE_TEMPLATE ? 'contained' : 'outlined'}`}>
                                    FEATURE TEMPLATE
                                </Button>
                                <Button
                                    disabled={isAccessPriviledge}
                                    style={{ borderRadius: '22px', position: 'relative' }}
                                    className={`mr-2 ${selectedTab === tabEnum.PRIVILEGE && 'bg-primary text-black'}`}
                                    onClick={(e) => handleTab(e, tabEnum.PRIVILEGE)}
                                    variant={`${selectedTab === tabEnum.PRIVILEGE ? 'contained' : 'outlined'}`}>
                                    PRIVILEGE
                                </Button>
                            </Grid>
                        </Grid>
                        {
                            selectedTab === tabEnum.COMPONENT &&
                            (
                                <DndProvider backend={HTML5Backend}>
                                    <V5FormBuilderToolbar
                                        toolbarProps={toolbarProps}
                                        setFormData={setFormData}
                                        handleDownloadTemplate={handleDownloadTemplate}
                                        fileId={fileId}
                                    />
                                </DndProvider>
                            )
                        }
                        {
                            selectedTab === tabEnum.FEATURE_TEMPLATE &&
                            (
                                <V5FormBuilderFeatureTemplate
                                    masterScreensWorkflowData={JSON.parse(JSON.stringify(masterScreensWorkflowData))}
                                    featureTemplates={JSON.parse(JSON.stringify(featureTemplate))}
                                    handleFeatureTemplateDelete={handleFeatureTemplateDelete}
                                />
                            )
                        }
                        {
                            selectedTab === tabEnum.PRIVILEGE && (
                                <Grid>
                                    <Grid className={`${classes.privilegeContainer} cursor-pointer ${!checked ? '' : 'border-primary'}`} >
                                        <div className="flex items-center">
                                            <p className="ml-8 text-16">Consolidate Team's Data</p>
                                            <Checkbox color="primary" className={`${classes.checkbox} mt-1`} onChange={(e) => handleInputCheck(e, "consolidate")} checked={checked ? true : false} />
                                            <Tooltip
                                                classes={{ tooltip: classes.customWidth }}
                                                title={
                                                    <>
                                                        {
                                                            !checked && !isConsolidateTeamsData ?
                                                                (
                                                                    <>
                                                                        <div>{consolidateTooltip1}</div>
                                                                        <div>{consolidateTooltip2}</div>
                                                                    </>
                                                                )
                                                                :
                                                                <div>{consolidateTooltip3}</div>
                                                        }
                                                    </>
                                                }
                                                placement="top">
                                                <Info className={`ml-3 text-20 ${classes.infoIcon} ${classes.infoIconHover}`} />
                                            </Tooltip>
                                        </div>
                                        <Collapse in={checked}>
                                            <TextField
                                                label="Select Module Name"
                                                labelId="demo-customized-select-label"
                                                id="demo-customized-select"
                                                variant="outlined"
                                                className="w-full mt-2 mb-2"
                                                onChange={(e) => handleConsolidateModule(e)}
                                                value={selectedModule}
                                                select
                                            >
                                                {
                                                    clientSubModulesList.map((m) => (
                                                        <MenuItem key={m.id} name={m.id} value={m.id}>
                                                            {m.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                            {/* <Button variant="outlined" color="primary" className="mt-8 mb-2 float-right border-light-gray">BROWSE MASTER SCREENS</Button> */}
                                        </Collapse>
                                    </Grid>
                                    <Grid className={`${classes.privilegeContainer} ${!checked ? classes.privilegeContainerDisabled : ''} 
                                    ${setupChecked ? 'border-primary' : ''} mt-2`}>
                                        <div className="flex items-center">
                                            <p className="ml-8 text-16">Setup Approval Mechanism</p>
                                            <Checkbox color="primary" className={`${classes.checkbox} mt-1`}
                                                onChange={(e) => handleSetupCheck(e)}
                                                checked={setupChecked ? true : false}
                                                //disabled={checked ? false : true} 
                                                disabled={selectedModule ? false : true}
                                            />
                                            <Tooltip
                                                classes={{ tooltip: classes.customWidth }}
                                                title={
                                                    <>
                                                        <div>{consolidateTooltip3}</div>
                                                    </>
                                                }
                                                placement="top">
                                                <Info className={`ml-3 text-20 ${classes.infoIcon} ${classes.infoIconHover}`} />
                                            </Tooltip>
                                        </div>
                                        <Collapse in={setupChecked}>
                                            <div className='ml-9'>
                                                <FormControlLabel
                                                    //className={`text-12`}
                                                    classes={{
                                                        label: dataTableChecked ? classes.label1 : classes.label,
                                                    }}
                                                    //className={dataTableChecked ? classes.label1 : classes.label}
                                                    label="Approval mechanism on data table."
                                                    control={
                                                        <Checkbox
                                                            checked={dataTableChecked}
                                                            onChange={(e) => handleInputCheck(e, "datatable")}
                                                            size='small'
                                                            //onChange={this.editElementCustomOptionsProp.bind(this, 'dataTable', 'checked')}
                                                            name="is_dataTable"
                                                            color="primary" />
                                                    }
                                                />
                                                <FormControlLabel
                                                    //className={`text-12`}
                                                    //className={internalScreensChecked ? classes.label1 : classes.label}
                                                    classes={{
                                                        label: internalScreensChecked ? classes.label1 : classes.label,
                                                    }}
                                                    label="Approval mechanism in internal screens."
                                                    //style={{ marginTop: "-15px" }}
                                                    control={
                                                        <Checkbox
                                                            checked={internalScreensChecked}
                                                            onChange={(e) => handleInputCheck(e, "internal")}
                                                            size='small'
                                                            //onChange={this.editElementCustomOptionsProp.bind(this, 'filtered', 'checked')}
                                                            name="is_filtered"
                                                            color="primary" />
                                                    }
                                                />
                                            </div>
                                        </Collapse>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>
                    <FormHeadingPopup
                        open={open}
                        charecterLimit={24}
                        isRequired={true}
                        popupHeading="Save Feature Template"
                        inputLabel="Feature Template Name"
                        inputValue={inputValue}
                        inputName={""}
                        handlePopUpClose={handlePopUpClose}
                        handleTitleText={handleTitleText}
                        handleSave={handleSave} />
                    <ConfirmationDialog
                        open={showAlertMsg}
                        onConfirmDialogClose={() => setShowAlertMsg(false)}
                        text="Please select form component to save feature template."
                        hasOnlyCloseAction={true}
                    />
                    <ConfirmationDialog
                        open={showPrivilegePopup}
                        onConfirmDialogClose={() => setShowPrivilegePopup(false)}
                        text={`All the changes will be lost. \n Are you sure to continue ?`}
                        onYesClick={confirmPrivilege}
                    />
                </div>
            </form>
        </div>
    );
}

FormBuilder.propTypes = {

}

FormBuilder.defaultProps = {

};

export default FormBuilder;