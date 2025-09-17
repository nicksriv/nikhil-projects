import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Grid,
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomChartValues } from 'app/redux/ReportManagement/reportManagementSlice';

const useStyles = makeStyles(() => ({
    inputControl1: {
        '& label': {
            fontSize: '12px',
            color: '#00000061',
        },
        '& span': {
            fontSize: '12px',
            color: '#00000061',
        },
        '& svg': {
            fill: '#2C3E93',
        },
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
        color: '#fff !important',
        border: '1px solid #2C3E93 !important',
        width: '100px !important',
        background: '#2C3E93 0% 0% no-repeat padding-box !important',
        borderRadius: '4px !important',
        marginLeft: '15px !important',
        padding: '8px !important',
    },
    siteId: {
        fontSize: '12px !important',
        letterSpacing: '0.4px !important',
        lineHeight: '14px !important',
        color: '#2C3E93 !important',
        border: '1px solid #2C3E93 !important',
        width: '150px !important',
        borderRadius: '4px !important',
        padding: '8px !important',
        background: '#2C3E9314 0% 0% no-repeat padding-box',
        marginRight: '15px !important',
    },
    btn: {
        fontSize: '12px !important',
        letterSpacing: '0.4px !important',
        lineHeight: '14px !important',
        color: '#2C3E93 !important',
        border: '1px solid #A3A3A2 !important',
        width: '150px !important',
        borderRadius: '4px !important',
        padding: '8px !important',
        background: 'white',
        marginRight: '15px !important',
    },
    highlightedSection: {
        fontSize: '12px !important',
        letterSpacing: '0.4px !important',
        lineHeight: '14px !important',
        color: '#2C3E93 !important',
        border: '1px solid #2C3E93 !important',
        width: '100% !important',
        borderRadius: '4px !important',
        padding: '8px !important',
        background: '#2C3E9314 0% 0% no-repeat padding-box',
        marginRight: '15px !important',
        marginBottom: '20px !important',
    },
    normalSection: {
        fontSize: '12px !important',
        letterSpacing: '0.4px !important',
        lineHeight: '14px !important',
        color: '#2C3E93 !important',
        border: '1px solid #00000099 !important',
        width: '100% !important',
        borderRadius: '4px !important',
        padding: '8px !important',
        background: '#FFFFFFBD 0% 0% no-repeat padding-box',
        marginRight: '15px !important',
        marginBottom: '20px !important',
    },
    textform: {
        width: '100%  !important',
    },
}))

export function CustomiseOptions(props) {
    const {allColumns,editChartView,handleDrawerClose,handleSubmit} = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const {chartTypes, customChartData } = useSelector((state) => state.report)
    const [checked, setChecked] = useState(false)

    const handleFilterChange = (filter) => {
        let data = cloneDeep(customChartData);
        if (data.filters.includes(filter)) {
            data.filters = data.filters.filter(v=>v !==filter);
        } else {
            data.filters.push(filter);
        }

        dispatch({
            type: setCustomChartValues,
            payload: data
        })
    }

    const handleStateChange = (name, value) => {
        let data = {...customChartData};
        data[name] = value;
        if (name === "switchRowsAndcolumns") {
            let xAxisData = data["xAxis"];
            data["xAxis"] = data["yAxis"];
            data["yAxis"] = xAxisData;
        }
        dispatch({
            type: setCustomChartValues,
            payload: data
        })
    }

    // useEffect(() => {
    //     // NOTE:-COMMENTED FOR FUTURE REFERENCE
    //     // dispatch({
    //     //     type: 'getColumnsByIdAction',
    //     //     configuredReportId,
    //     // })

    //     handleStateChange("reportConfigurationId", configuredReportId);
    // }, [props.configuredReportId])

    useEffect(() => {
        console.log(customChartData);
        if (customChartData.filters.length) {
            setChecked(true);
        }
    }, [customChartData])

    return (
        <Grid className="mt-5">
            <Grid className="mt-3">
                <FormControl fullWidth>
                    <TextField
                        id="filled-required"
                        label="Chart Title"
                        variant="outlined"
                        name="name"
                        className={classes.textField}
                        value={customChartData.name}
                        onChange={(e) => handleStateChange("name", e.target.value)}
                        />
                </FormControl>
            </Grid>
            <Grid className="mt-5">
                <FormControl fullWidth>
                    <InputLabel
                        id="filled-required"
                        label="Chart Type"
                        variant="outlined"
                        className={classes.select}
                    >
                        Chart Type
                    </InputLabel>
                    <Select
                        id="dropdown"
                        name="type"
                        label="Chart Type"
                        variant="outlined"
                        onChange={(e) => handleStateChange("type", e.target.value)}
                        value={customChartData.type}
                    >
                        {chartTypes.map((chart) => {
                            return (
                                <MenuItem key={chart.key} value={chart.key}>
                                    {chart.value}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid className="mt-5">
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        id="filled-required"
                        label="X Axis"
                        variant="outlined"
                        className={classes.select}
                    >
                        X Axis
                    </InputLabel>
                    <Select
                        id="dropdown"
                        name="xAxis"
                        label="X Axis"
                        variant="outlined"
                        onChange={(e) => handleStateChange("xAxis", e.target.value)}
                        value={customChartData.xAxis.componentId? customChartData.xAxis.componentId: customChartData.xAxis}
                    >
                        {allColumns.map((col) => {
                            return (
                                <MenuItem key={col.id} value={col.id}>
                                    {col.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid className="mt-5">
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        id="filled-required"
                        label="Y Axis"
                        variant="outlined"
                        className={classes.select}
                    >
                        Y Axis
                    </InputLabel>
                    <Select
                        id="dropdown"
                        name="yAxis"
                        label=" Y Axis"
                        variant="outlined"
                        onChange={(e) => handleStateChange("yAxis", e.target.value)}
                        value={customChartData.yAxis.componentId? customChartData.yAxis.componentId: customChartData.yAxis}
                    >
                        {allColumns.map((col) => {
                            return (
                                <MenuItem value={col.id}>
                                    {col.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid className="mt-5">
                <FormGroup>
                    <FormControlLabel
                        className={classes.inputControl1}
                        control={<Checkbox checked={checked} onClick={() => setChecked(!checked)} inputProps={{ 'aria-label': 'controlled' }}/>}
                        label="Filter"
                        name="filters"
                    />
                </FormGroup>
            </Grid>
            {checked && (
                <>
                    <Button
                        onClick={(e) =>
                            handleFilterChange('SITE_ID')
                        }
                        className={
                            customChartData.filters.includes('SITE_ID')
                                ? classes.siteId
                                : classes.btn
                        }
                    >
                        Site ID
                    </Button>
                    <Button
                        onClick={(e) =>
                            handleFilterChange('DATE_RANGE')
                        }
                        className={
                            customChartData.filters.includes('DATE_RANGE')
                                ? classes.siteId
                                : classes.btn
                        }
                    >
                        Date Range
                    </Button>
                </>
            )}
            <Grid className='mt-5'>
                <Button
                    className={customChartData.switchRowsAndcolumns? classes.highlightedSection: classes.normalSection}
                    onClick={(e) => handleStateChange('switchRowsAndcolumns', !customChartData.switchRowsAndcolumns)}
                >
                    SWITCH ROWS / COLUMNS
                </Button>
                <Button
                    className={customChartData.showOnDesktop? classes.highlightedSection: classes.normalSection}
                    onClick={(e) =>handleStateChange('showOnDesktop', !customChartData.showOnDesktop)}
                >
                    SHOW ON DASHBOARD
                </Button>
            </Grid>
            <Grid style={{display:"flex",justifyContent:"flex-end"}}>
                <Button onClick={handleDrawerClose} className={classes.cancel}>CANCEL</Button>
                <Button className={classes.save} onClick={handleSubmit}>
                    {editChartView ? "Update" : "Create"}
                </Button>
            </Grid>
        </Grid>
    )
}

export default CustomiseOptions;
