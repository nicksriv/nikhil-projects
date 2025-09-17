import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import * as Plotly from 'plotly.js';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    Box,
    Card,
    CardContent,
    // CardActions,
    // CardHeader,
    // Container,
    // Dialog,
    // DialogContent,
    // DialogContentText,
    // DialogTitle,
    // IconButton,
    Grid,
    Icon,
    Popover,
    Typography,
    Button,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { format } from 'date-fns'

import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import Multiselect from 'app/components/Multiselect/Multiselect';
import { capitalizeFirstLetter } from 'helper/utils';
import { setChartsView, setIsEditView, setChartFilter, setChartsData } from 'app/redux/ReportManagement/reportManagementSlice';
import { cloneDeep } from 'lodash';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles(() => ({
    root: {
        width: '360px',
        '& .MuiBox-root ': {
            backgroundColor: '#fffff',
        },
    },
    chartReverse: {
        background: '#ffffff !important ',
        transform: 'rotate(90deg)',
        borderRadius: '4px',
    },
    mainCard: {
        cursor: 'pointer',
        // width: '340px',
        minHeight: '280px',
        maxHeight: '320px',
        backgroundColor: '#ffffff !important',
        marginTop: '15px',
    },
    typography: {
        fontSize: '12px',
        fontWeight: '300',
        textAnchor: 'middle',
        marginRight: '25px',
    },
    filterHeader: {
        fontSize: '16px',
        backgroundColor: '#2C3E93',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Icon: {
        color: '#747474',
    },
    cancel: {
        fontSize: '14px !important',
        letterSpacing: '1.25px !important',
        lineHeight: '16px !important',
        color: '#2C3E93 !important',
        border: '1px solid #2C3E93 !important',
        width: '100px !important',
        borderRadius: '4px !important',
        padding: '8px !important',
    },
    save: {
        fontSize: '14px !important',
        letterSpacing: '1.25px !important',
        lineHeight: '16px !important',
        color: '#000000BC !important',
        border: '1px solid #2C3E93 !important',
        width: '100px !important',
        background: '#2C3E93 0% 0% no-repeat padding-box !important',
        borderRadius: '4px !important',
        marginLeft: '15px !important',
        padding: '8px !important',
    },
    iconActiveState: {
        opacity: 1,
        fontSize: "22px !important"
    },
    iconDeActiveState: {
        opacity: 0,
        fontSize: "22px !important"
    }
}))

function ChartsView({reportId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [chartId, setChartId] = useState([]);
    const [ dragHoverIndex, setDragHoverIndex ] = useState([]);
    const { sitesForCharts, charts, chartFilter, reportColumns,selectedChartId } = useSelector((state) => state.report)
    const [chartMargin, setChartMargin] = useState({});
    const config = {
        showLink: false,
        displayModeBar: false,
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setChartId(id);
    }

    const downloadChart = (id) => {
        // let ele = document
        //     .getElementById('chart' + id)
        //     .getElementsByClassName('modebar-container')
        // for (var i = 0; i < ele.length; i++) {
        //     ele[i].getElementsByClassName('modebar-btn')[0].click();
        // }

        let data = formatChartData(charts.filter(v=>v.id === id)[0]);
        let layout={
                autosize: false,
                width: 355,
                height: 295,
                margin: {
                    l: 50,
                    r: 50,
                    b: 130,
                    t: 10,
                },
                showlegend: false,
                xaxis: { fixedrange: true },
                yaxis: { fixedrange: true },
        }
        Plotly.newPlot(
            `chart`,
            data,
            layout)
          // static image in jpg format
            .then(
                function(gd)
                {
                    Plotly.toImage(gd,{format:'png',height:400,width:400})
                    .then(
                        function(url)
                        {
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'image file name here';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    )
                });
        }

    const formatChartData = (chartData) => {
        let chartType;
        let chart;
        if (chartData.type === "PIE_CHART") {
            chart = {
                labels: [],
                values: [],
                width: [],
                borderRadius: 0.5,
                type: 'pie'
            }

        } else if (chartData.type === "LINE_CHART") {
            chart = {
                x: [],
                y: [],
                width: [],
                borderRadius: 0.5,
                type: 'scatter'
            }

        } else {
            chart = {
                x: [],
                y: [],
                width: [],
                borderRadius: 0.5,
                type: 'bar'
            }
        }
        if (chartData.type !== "PIE_CHART") {
            chartData.charts.forEach(v => {
                chart.x.push(v[chartData.xAxis.componentId]);
                chart.y.push(v[chartData.yAxis.componentId]);
                // chart.y.push(isNaN(v[chartData.yAxis.componentId]) && v[chartData.yAxis.componentId].length > 3? v[chartData.yAxis.componentId].substring(0,2)+'+': v[chartData.yAxis.componentId]);
                chart.width.push(0.7);
                // chart.type = chartData.type
                v[chartData.xAxis.componentId].length && isNaN(v[chartData.xAxis.componentId][0]) ? chart['orientation'] = 'w' : chart['orientation'] = 'h';
            });
        } else {
            chartData.charts.forEach(v => {
                if (isNaN(v[chartData.xAxis.componentId])) {
                    chart.labels.push(v[chartData.xAxis.componentId]);
                } else {
                    chart.values.push(v[chartData.yAxis.componentId]);
                }
                if (isNaN(v[chartData.yAxis.componentId])) {
                    chart.labels.push(v[chartData.yAxis.componentId]);
                } else {
                    chart.values.push(v[chartData.yAxis.componentId]);
                }
                chart.width.push(0.7);
            });
        }
        return [chart];
    }

    const formatChartMargin = (chartData) => {
        let chartMargin;
        if (chartData.type !== "PIE_CHART") {
            chartMargin = {
                l: 50,
                r: 50,
                b: 130,
                t: 10,
            }
        } else {
            chartMargin = {
                l: 5,
                r: 450,
                b: 130,
                t: 10,
            }

        }
        return chartMargin;
    }

    const handleClickFilter = (event, id) => {
        setAnchorE2(event.currentTarget)
        setChartId(id);

        let cF = {...chartFilter};
        if (Object.keys(cF).indexOf(id) === -1) {
            cF[id] = {
                from: null,
                to: null,
                sites: [],
                siteIds: []
            }
        }
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseFilter = () => {
        setAnchorE2(null);
    }

    const handleClearFilter = () => {
        let cF = cloneDeep(chartFilter);
        cF[chartId].from = null;
        cF[chartId].to = null;
        cF[chartId].sites = [];
        cF[chartId].siteIds = [];
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleSiteChange = (event) => {
        const { target: { value }} = event;
        let ids = [];
        sitesForCharts.forEach((site)=>{
            if (value.indexOf(site.name) !== -1) {
                ids.push(site.siteId)
            }
        })

        let cF = cloneDeep(chartFilter);
        if (Object.keys(cF).indexOf(chartId) !== -1) {
            cF[chartId].sites = value;
            cF[chartId].siteIds = ids;
        }
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }
    const handleDeleteSite = () => {}

    const open = Boolean(anchorEl, anchorE2);
    const id = open ? 'simple-popover' : undefined;

    const opens = Boolean(anchorE2);
    const ids = open ? 'simple-popover' : undefined;

    const editChart = (id) => {
        dispatch({
            type: "getChartDataByIdAction",
            payload: { chartId }
        })
        dispatch({
            type: setIsEditView.type,
            payload: { chartId , isEditView: true }
        })
        dispatch({
            type: setChartsView.type,
            payload: 1
        })
    }

    const getChartDataWithFilter = () => {
        handleCloseFilter();
        dispatch({
            type: "getChartDataByIdAction",
            payload: { 
                chartId, 
                from: chartFilter[chartId].from? format(chartFilter[chartId].from, 'dd-MM-yyyy'): '', 
                to: chartFilter[chartId].to? format(chartFilter[chartId].to, 'dd-MM-yyyy'): '',
                siteIds: chartFilter[chartId].siteIds? chartFilter[chartId].siteIds: chartFilter[chartId].siteIds.join(",")
            }
        })
    }

    const handleFromDateChange = (e) => {
        let cF = cloneDeep(chartFilter);
        cF[chartId]["from"] = e;
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleToDateChange = (e) => {
        let cF = cloneDeep(chartFilter);
        cF[chartId]["to"] = e;
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const renderEmptyState = () => (
        <div align="center" className="m-10">
            <h5 className="mt-3 font-medium">No Data Available!</h5>
        </div>
    )

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        
        let data = [...charts];
        const items = reorder(
            data,
            result.source.index,
            result.destination.index
        );

        let updatedChartsOrder = [];
        items.forEach((chart, i)=>{
            updatedChartsOrder.push({
                "chartId": chart.id,
                "priority": i})
        });
    
        dispatch({
            type: 'updateChartOrderAction',
            payload: { 
                data: updatedChartsOrder,
                reportId: reportId
            },
        })
        dispatch({
            type: setChartsData.type,
            payload: items
        })
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const renderChart = (chart, index) => {
        if(chart?.id !== selectedChartId){
            return null
        }
        return (
            <Draggable key={chart.id} draggableId={chart.id} index={index}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card 
                        className={classes.mainCard} 
                        id={'chart' + chart.id} 
                        onMouseEnter={e => {setDragHoverIndex(index)}}
                        onMouseLeave={e => {setDragHoverIndex("")}}>
                        <CardContent>
                            <Grid container spacing={3} display="flex" justifyContent='space-between'>
                                <Grid item xs={9} className="flex">
                                    <DragIndicatorIcon className={dragHoverIndex === index? classes.iconActiveState: classes.iconDeActiveState } /> 
                                    <span className="ml-2 font-bold">
                                        {capitalizeFirstLetter(chart.name)}
                                    </span>
                                </Grid>

                                {/* NOTE:-COMMENTED FOR FUTURE REFERENCE */}
                                {/* <Grid item xs={1} className="mr-2">
                                    { chart.filters.length ?
                                    <Icon
                                        aria-describedby={ids}
                                        className={classes.Icon}
                                        onClick={(e)=>handleClickFilter(e, chart.id)}
                                    >
                                        <span class="material-icons">filter_alt</span>
                                    </Icon> : null }
                                    <Popover
                                        id={ids}
                                        open={opens}
                                        anchorEl={anchorE2}
                                        onClose={handleCloseFilter}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Grid style={{ maxWidth: '285px'}}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid
                                                    className={classes.filterHeader}
                                                    container
                                                    spacing={2}
                                                >
                                                    <Grid item xs={9}>
                                                        Filter
                                                    </Grid>
                                                    <Grid item xs={2} onClick={handleCloseFilter} className="cursor-pointer">
                                                        <CloseIcon />
                                                    </Grid>
                                                </Grid>

                                                <Grid className="p-5">
                                                    { charts && charts[charts.findIndex(x=>x.id ===chartId)]?.filters.indexOf("SITE_ID") !==-1 ?
                                                    <Grid container className="mt-3">
                                                        <Multiselect
                                                            roles={sitesForCharts ? sitesForCharts : []}
                                                            label="Site ID"
                                                            roleName={chartFilter && chartFilter[chartId] && chartFilter[chartId].sites? chartFilter[chartId].sites: []}
                                                            handleRoleChange={handleSiteChange}
                                                            handleDelete={handleDeleteSite}
                                                        />
                                                    </Grid>: null}
                                                    { charts && charts[charts.findIndex(x=>x.id ===chartId)]?.filters.indexOf("DATE_RANGE") !==-1 ?
                                                    <>
                                                        <Grid container className="mt-10">
                                                            <KeyboardDatePicker
                                                                autoOk
                                                                variant="inline"
                                                                inputVariant="outlined"
                                                                id="mui-pickers-date1"
                                                                label="From date"
                                                                format="dd MMM yyyy"
                                                                name="from"
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'From',
                                                                }}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <Icon>date_range</Icon>
                                                                    ),
                                                                    classes: {
                                                                        adornedEnd:
                                                                            classes.adornedEnd,
                                                                    },
                                                                }}
                                                                keyboardIcon={
                                                                    <Icon>date_range</Icon>
                                                                }
                                                                className={classes.inputField}
                                                                onChange={handleFromDateChange}
                                                                value={chartFilter[chartId]? chartFilter[chartId].from: null}
                                                            />
                                                        </Grid>
                                                        <Grid className="mt-10">
                                                            <KeyboardDatePicker
                                                                autoOk
                                                                variant="inline"
                                                                inputVariant="outlined"
                                                                id="mui-pickers-date2"
                                                                format="dd MMM yyyy"
                                                                label="To date"
                                                                name="to"
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'To',
                                                                }}
                                                                keyboardIcon={
                                                                    <Icon>date_range</Icon>
                                                                }
                                                                className={classes.inputField}
                                                                onChange={handleToDateChange}
                                                                value={chartFilter[chartId]? chartFilter[chartId].to: null}
                                                            />
                                                        </Grid>
                                                    </>: null}
                                                    <Grid className="mt-10 flex justify-between">
                                                        <Button className={classes.cancel} onClick={handleClearFilter}>CLEAR</Button>
                                                        <Button className={classes.save} onClick={getChartDataWithFilter}>
                                                            APPLY
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Popover>
                                </Grid> */}
                                <Grid className="mr-2 mt-3">
                                    <MoreVertIcon
                                        aria-describedby={id}
                                        variant="contained"
                                        className={classes.Icon}
                                        onClick={(e)=>handleClick(e, chart.id)}
                                    ></MoreVertIcon>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography className={classes.typography}>
                                            <Box onClick={() => editChart(chart.id)}>
                                                <p className="pl-3 cursor-pointer">Edit</p>
                                            </Box>
                                            <Box onClick={() => downloadChart(chartId)}>
                                                <p className="pl-3 cursor-pointer">
                                                    Export PNG
                                                </p>
                                            </Box>
                                        </Typography>
                                    </Popover>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <div className='chart-content-container' style={{width:"100%"}}>
                        <CardContent style={{ maxWidth: '100%', overflow: 'auto'}}>
                            {chart.charts.length ?
                            <Grid style={{display:"flex",justifyContent:"center"}}>
                                <Plot
                                    data={formatChartData(chart)}
                                    layout={{
                                        autosize: true,
                                        width:"100%",
                                        height: 295,
                                        margin: formatChartMargin(chart),
                                        showlegend: false,
                                        xaxis: { 
                                            fixedrange: true,
                                            title: {
                                                text: chart.xAxis.hint
                                            }
                                        },
                                        yaxis: { 
                                            fixedrange: true,
                                            automargin: true,
                                            title: {
                                                text: chart.yAxis.hint,
                                                standoff: 5
                                            }
                                        },
                                    }}
                                    config={config}
                                />
                            </Grid>:
                            renderEmptyState()
                            }
                        </CardContent>
                        </div>
                    </Card>
                </div>
                )}
            </Draggable>
        )

    }

    return <div id="chart">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='chart-header'
                        >
                        <>
                        {charts.length > 0 ? charts.map(renderChart) : <></>}
                        {provided.placeholder}
                        </>
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>
}

export default ChartsView;
