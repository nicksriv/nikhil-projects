import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

var initialState = {
    pageNumber: 0,
    reportTableHeaders: [
        { key: "icon", name: "Icon", hasSorting: false, isIcon: true },
        { key: "name", name: "Report Name", hasSorting: true },
        { key: "parentModuleName", name: "Parent Module Name", hasSorting: false },
        { key: "status", name: "Status", hasSorting: true },
        { key: "actionHeader", icon: "more_vert", alignIcon: 'float-right pr-5' }
    ],
    reportFilterDetails: {
        name: '',
        moduleId: '',
        status: '',
        // parentModuleName: ''
        // from: null,
        // to: null
    },
    statuses: ["ACTIVE", "INACTIVE", "DRAFT"],
    reportList: [
        {
            icon: "note_add",
            reportName: "Report 1",
            moduleName: "Attendance",
            status: "ACTIVE"
        }
    ],
    clientId: localStorage.getItem("selectedClientLogo") ? localStorage.getItem("selectedClientLogo") : "",
    addedReport: {
        icon: '',
        name: '',
        parentModuleId: ''
    },
    loading: "start",
    moduleList: [],
    createdReportId: '',
    configuredReportId: '',
    reportDetails: {
        customColumns: [],
        filter: "",
        name: "",
        parentModuleId: "",
        roleIds: [],
        status: "",
        submoduleIds: []
    },
    parentModuleName: '',
    moduleColumns: [],
    Aggregations: ["ADDITION", "SUBSTRACTION", "MULTIPLICATION", "DIVISION"],
    configuredReportData: {
        name: "",
        parentModuleId: "",
        report: [],
        roleIds: [],
        visibleColumns: [],
        submoduleIds: [],
        filter: [],
        status: "ACTIVE",
        customColumns: [{   
            name: "",
            id: uuidv4(),
            first: {
                reference: "",
                column: "",
                subModule: ""
            },
            operation: "",
            second: {
                reference: "",
                column: "",
                subModule: ""
            },
        }]
    },
    reportRoles: [],
    reportListData: [],
    reportColumns: [],
    chartTypes: [
        {
            key: "BAR_CHART",
            value: "Bar Chart"
        },
        {
            key: "PIE_CHART",
            value: "Pie Chart"
        }, {
            key: "LINE_CHART",
            value: "Line Chart"
        }
        
    ],
    customChartData: {
        filters: [],
        name: "",
        reportConfigurationId: "",
        showOnDesktop: false,
        switchRowsAndcolumns: false,
        type: "",
        xAxis: "",
        yAxis: ""
    },
    totalRecords: 0,
    createdChartId: "",
    sitesForCharts: [],
    configuredReportDetails: [],
    configuredReportTableKeys: [],
    charts: [],
    chartViewType: 0,
    selectedChartId:"",
    isChartEditView: false,
    reportAddSuccess: false,
    chartFilter: {},
    sortOptions: {
        direction: "DESC",
        sortBy: "",
    },
    // loading: "start",
}

const reportInfoSlice = createSlice({
    name: 'reportInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.addedReport = initialState.addedReport;
            state.configuredReportData = initialState.configuredReportData;
        },
        setReportFilterDetails(state, action) {
            state.reportFilterDetails = action.payload;
        },
        setInitialChartsState(state, action) {
            state.customChartData = initialState.customChartData;
        },
        setAddedReport(state, action) {
            const { payload: { name, value } } = action.payload;
            if (name === "parentModuleId") {
                state.parentModuleName = state.moduleList.find((module) => module.id === value);
            }
            state.addedReport[name] = value;
        },
        setModuleList(state, action) {
            const { modules } = action.payload;
            state.moduleList = modules;
        },
        setReportId(state, action) {
            state.createdReportId = action.payload;
        },
        setReportDetails(state, action) {
            state.reportDetails = action.payload;
            state.configuredReportData.name = action.payload.name;
            state.configuredReportData.parentModuleId = action.payload.parentModuleId;
        },
        setColumnValues(state, action) {
            state.moduleColumns = action.payload;
        },
        setStateByName(state, action) {
            state.reportRoles = action.payload;
            const { name, value, fieldName } = action.payload;
            if (name && value) {
                if (fieldName) {
                    state[fieldName][name] = value;
                } else {
                    state[name] = value;
                }
            }
        },
        setConfiguredReportById(state, action) {
            let data = {...action.payload};
            let ids = [];
            data.submoduleIds.forEach((subModule)=> {
                ids.push(subModule.id);;
            });

            let roleIds = [];
            data.roles.forEach((role)=> {
                roleIds.push(role.id);;
            });
            data.roleIds = roleIds;
            data.submoduleIds = ids;
            data.customColumns = data.customColumns.length? data.customColumns: initialState.configuredReportData.customColumns;
            state.configuredReportData = data;
        },
        setConfiguredReportData(state, action) {
            const { roleIds, parentModuleId, filter, submoduleIds,   status, type } = action.payload;

            let columnData = {
                name: "",
                id: uuidv4(),
                first: {
                    reference: "",
                    column: "",
                    subModule: ""
                },
                operation: "",
                second: {
                    reference: "",
                    column: "",
                    subModule: ""
                },
            }
            if (filter) {
                state.configuredReportData['filter'] = filter;
            }
            if (roleIds) {
                state.configuredReportData['roleIds'] = roleIds;
            }
            if (submoduleIds) {
                state.configuredReportData['submoduleIds'] = submoduleIds;
            }
            if (parentModuleId) {
                state.configuredReportData['parentModuleId'] = parentModuleId;
            }
            if (status) {
                state.configuredReportData['status'] = status;
            }

            if (type === "customColumns") {
                let cColumnsData = {...state.configuredReportData['customColumns'][[action.payload.index]]};
                if (action.payload.name || action.payload.name === "") {
                    cColumnsData.name = action.payload.name;
                } else if (action.payload.firstReference) {
                    cColumnsData.first.reference = action.payload.firstReference;
                } else if (action.payload.firstColumn) {
                    cColumnsData.first.column = action.payload.firstColumn;
                } else if (action.payload.firstSubModuleId) {
                    cColumnsData.first.subModule = action.payload.firstSubModuleId;
                } else if (action.payload.operation) {
                    cColumnsData.operation = action.payload.operation;
                } else if (action.payload.secondReference) {
                    cColumnsData.second.reference = action.payload.secondReference;
                } else if (action.payload.secondColumn) {
                    cColumnsData.second.column = action.payload.secondColumn;
                } else if (action.payload.secondSubModuleId) {
                    cColumnsData.second.subModule = action.payload.secondSubModuleId;
                }
                state.configuredReportData['customColumns'][action.payload.index] = cColumnsData;
            }

            if (type === "addCardAction") {
                state.configuredReportData['customColumns'].push(columnData);
            }
            if (type === "removeCardAction") {
                state.configuredReportData['customColumns'].splice(action.payload.index, 1);
            }
            // if (name || firstRefCol || firstColumn || operation || secondRefCol || secondColumn || firstSubModuleId || secondSubModuleId) {
            //     columnData.name = name;
            //     columnData.first.reference = firstRefCol;
            //     columnData.first.column = firstColumn;
            //     columnData.first.subModule = firstSubModuleId;
            //     columnData.operation = operation;
            //     columnData.second.reference = secondRefCol;
            //     columnData.second.column = secondColumn;
            //     columnData.second.subModule = secondSubModuleId;
            // }
            // if (columnData.name &&
            //     columnData.first.reference &&
            //     columnData.first.column &&
            //     columnData.first.subModule &&
            //     columnData.operation &&
            //     columnData.second.reference &&
            //     columnData.second.column &&
            //     columnData.second.subModule) {
            //     state.configuredReportData['customColumns'].push(columnData);
            // }
            // state.configuredReportData['customColumns'].push(columnData);
        },
        setReportList(state, action) {
            const { configurations, total } = action.payload;
            state.reportListData = configurations;
            state.totalRecords = total;
        },
        setConfiguredReportId(state, action) {
            const { id } = action.payload;
            state.configuredReportId = id;
        },
        setReportColumns(state, action) {
            state.reportColumns = action.payload
        },
        setCustomChartValues(state, action) {
            state.customChartData = action.payload;
        },
        setCreatedChartId(state, action) {
            const { id } = action.payload;
            state.createdChartId = id;
        },
        setSitesForCharts(state, action) {
            let data = action.payload.map((s)=>{
                return {...s, name: s.siteId,}
            })
            state.sitesForCharts = data;
        },
        setChartsData(state, action) {
            state.charts = action.payload;
        },
        setChartsView(state, action) {
            state.chartViewType = action.payload;
        },
        setIsEditView(state, action) {
            state.isChartEditView = action.payload.isEditView;
            state.chartId = action.payload.chartId;
        },
        setReportAddSuccess(state, action) {
            state.reportAddSuccess = action.payload
        },
        setChartFilter(state, action) {
            state.chartFilter = action.payload
        },
        setUpdatedChart(state, action) {
            let newCharts = cloneDeep(state.charts);

            newCharts = newCharts.map((v)=>{
                if (action.payload.id === v.id) {
                    return {...action.payload.data};
                } else {
                    return {...v};
                }
            })
            state.charts = newCharts;
        },
        setReportSortOptions(state, action) {
            state.sortOptions = action.payload
        },
        setSelectedChartId(state, action) {
            state.selectedChartId = action.payload
        },
        setLoader(state, action) {
            state.loading = action.payload;
        },
    },
});

export default reportInfoSlice.reducer;

// Actions
export const {
    setInitialState,
    setInitialChartsState,
    setAddedReport,
    setModuleList,
    setReportId,
    setReportDetails,
    setColumnValues,
    setStateByName,
    setConfiguredReportData,
    setReportList,
    setConfiguredReportId,
    setReportColumns,
    setCustomChartValues,
    setCreatedChartId,
    setConfiguredReportById,
    setSitesForCharts,
    setChartsData,
    setChartsView,
    setIsEditView,
    setReportAddSuccess,
    setChartFilter,
    setUpdatedChart,
    setReportSortOptions,
    setLoader,
    setReportFilterDetails,
    setSelectedChartId
} = reportInfoSlice.actions;
