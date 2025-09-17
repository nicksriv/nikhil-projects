import React from 'react'
import Multiselect from 'app/components/Multiselect/Multiselect'
import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
} from '@material-ui/core'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'
import DetailsCard from 'app/components/DetailsCard/DetailsCard'
import { getAllColumnsService } from 'app/redux/ReportManagement/reportManagerService'

const Configuration = ({
    configuredReportData,
    moduleList,
    reportRoles,
    roles,
    handleRoleChange,
    handleDeleteRole,
    pageMode,
    handleInputChange,
    subModuleName,
    handleSubModuleIdChange,
    subModules,
    handleConfigSubmit,
    parentModuleName,
    reportId,
    handleEditIconClick,
}) => {
    const useStyles = makeStyles(() => ({
        root: {
            '& .MuiFormControlLabel-label': {
                // color: "red"
            },
        },
        svgIcons: {
            filter: 'invert(0.2)',
            '&:hover': {
                filter: 'invert(0)',
                '&>*': {
                    opacity: 1,
                },
                '& > *': {
                    opacity: 1,
                },
            },
        },
        stickyHeader: {
            position: 'fixed',
            top: '5rem',
            backgroundColor: '#f5f5f5',
            zIndex: '100',
            width: '78%',
        },
        actvBtn: {
            backgroundColor: '#E5F2F0',
            color: '#2C3E93',
            border: '1px solid #2C3E93',
            paddingRight: '0rem',
            paddingLeft: '0.8rem',
            whiteSpace: 'nowrap',
            justifyContent: 'space-between',
            fontWeight: '400',
            height: '1.7rem',
            width: '7rem',
            margin: '0 0.2rem',
        },
        inctvBtn: {
            backgroundColor: '#EBD9DC',
            border: '1px solid #B10021',
            color: '#B10021',
            height: '1.7rem',
            width: '7rem',
            paddingRight: '0rem',
            paddingLeft: '0.8rem',
            whiteSpace: 'nowrap',
            justifyContent: 'space-between',
            fontWeight: '400',
            margin: '0 0.2rem',
        },
        button: {
            height: '1.7rem',
            paddingRight: '0rem',
            paddingLeft: '0.8rem',
            whiteSpace: 'nowrap',
            justifyContent: 'space-between',
            fontWeight: '400',
            width: '7rem',
            margin: '0 0.2rem',
        },
        checkbox: {
            '&$checked': {
                color: '#2C3E93',
            },
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        paper: {
            width: '97%',
            margin: '0 auto',
            boxShadow: 'none',
        },
        customColumnContainer: {
            border: '1px solid #E1E0E1',
            padding: '.8rem',
            borderRadius: '0.2rem',
            marginTop: '0.5rem',
            backgroundColor: '#fff',
        },
        statusLabel: {
            color: 'rgba(0, 0, 0, 0.6) !important',
        },
        filterLabel: {
            color: '#9B9A9A !important',
            marginLeft: 0,
        },
        detailsContainer: {
            marginTop: '9rem',
        },
        subHeader: {
            width: '100%',
        },
        filterBtn: {
            border: '1px solid rgba(0,0,0,0.4)',
            margin: '0 0.6rem',
            width: '7rem',
            height: '1.8rem',
        },
        activeBtn: {
            border: '1px solid #2C3E93',
            color: '#2C3E93',
            background: '#E4F4EF',
            margin: '0 0.6rem',
            width: '7rem',
            height: '1.8rem',
        },
        tablePopupContainer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginTop: '0.3rem',
        },
        popOverMenu: {
            boxShadow: '-1px 10px 20px lightgrey',
            width: '200px',
            overflowY: 'scroll',
            maxHeight: '23rem',
            marginTop: '-0.5rem',
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
        },
        formTextInput: {
            fontSize: '15px !important',
        },
    }))
    const [selectedSavedColumns, setSelectedSavedColumns] = React.useState([])
    const [allColumns, setAllColumns] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            await getAllColumns()
        }

        fetchData()
    }, [reportId])

    const handleTableHeadersChange = (event) => {
        const {
            target: { value },
        } = event
        let ids = []

        selectedSavedColumns.forEach((sm) => {
            if (value.indexOf(sm.name) !== -1) {
                ids.push(sm.id)
            }
        })

        setSelectedSavedColumns(value)
    }

    const classes = useStyles()

    const sourceFeilds = [
        {
            label: 'Report Name:',
            render: (data) => {
                console.log('DATAAA', data)
                return `${data.reportName}` || 'NA'
            },
        },
        {
            label: 'Parent Module Name:',
            render: (data) => {
                console.log('Type off', typeof data, data)
                return data?.parentModuleName
            },
        },
        {
            label: 'Roles:',
            render: (data) => `${data.roles}` || 'NA',
        },
        {
            label: 'Status:',
            render: (data) => data.status || 'NA',
        },
        {
            label: 'Sub Module Name:',
            render: (data) => data.subModuleNames || 'NA',
        },
        {
            label: 'Filters:',
            render: (data) => data.filters || 'NA',
        },
    ]

    const sourceData = {
        reportName: configuredReportData.name,
        parentModuleName: parentModuleName,
        roles: roles.length ? roles.join() : '',
        status: configuredReportData?.status,
        subModuleNames: subModules.length ? subModules.join() : '',
        filters: configuredReportData?.filter.length
            ? configuredReportData?.filter.join('')
            : '',
        selectedTableHeaders: selectedSavedColumns.join(','),
    }

    const reportTableHeaderFeilds = [
        {
            label: 'Report table headers:',
            render: (data) => data.selectedTableHeaders || 'NA',
        },
    ]

    const reportTableHeaderData = {
        selectedTableHeaders: selectedSavedColumns.join(','),
    }

    const deleteSavedColumn = () => {}

    const getAllColumns = async () => {
        try {
            const payload = {
                moduleId: configuredReportData?.parentModuleId,
                submoduleIds: configuredReportData?.submoduleIds,
            }
            const res = await getAllColumnsService(reportId, payload)
            if (res?.customResponses.length) {
                setAllColumns(res?.customResponses)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    if (pageMode === 'view') {
        return (
            <>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    className="flex items-center pt-2"
                >
                    <BackgroundCard
                        title={'Source'}
                        editIcon={true}
                        handleEditIconClick={handleEditIconClick}
                        titleStyle={{ fontSize: '18px' }}
                        containerStyle={{ width: '100%' }}
                    >
                        <DetailsCard
                            data={sourceFeilds}
                            cardDetails={sourceData}
                        />
                    </BackgroundCard>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    className="flex items-center pt-2"
                    width
                >
                    <BackgroundCard
                        title={'Report Table Headers'}
                        titleStyle={{ fontSize: '18px' }}
                        containerStyle={{ width: '100%' }}
                    >
                        <DetailsCard
                            data={reportTableHeaderFeilds}
                            cardDetails={reportTableHeaderData}
                        />
                    </BackgroundCard>
                </Grid>
            </>
        )
    }

    return (
        <>
            <Card
                elevation={6}
                className="m-4 mt-15"
                style={{ padding: '16px', marginTop: '60px', fontSize: '18px' }}
            >
                <div style={{ padding: '16px', paddingLeft: 0, paddingTop: 0 }}>
                    <div
                        style={{
                            fontWeight: 'bold',
                            borderBottom: '1px solid rgb(219, 216, 216)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            Source
                        </Typography>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginRight: '48px',
                        }}
                    >
                        <Typography
                            className="my-1"
                            variant="p"
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            Report Name:-
                        </Typography>
                        <Typography variant="p" className="ml-2">
                            {configuredReportData.name
                                ? configuredReportData.name
                                : ''}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Typography
                            className="my-1"
                            variant="p"
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            Parent Module Name:
                        </Typography>
                        <Typography variant="p" className="ml-2">
                            {moduleList.length &&
                            configuredReportData.parentModuleId
                                ? moduleList.filter(
                                      (v) =>
                                          v.id ===
                                          configuredReportData.parentModuleId
                                  ) &&
                                  moduleList.filter(
                                      (v) =>
                                          v.id ===
                                          configuredReportData.parentModuleId
                                  )[0]?.name
                                : ''}
                        </Typography>
                    </div>
                </div>

                <Grid
                    container
                    spacing={2}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '25px',
                    }}
                >
                    <Grid item lg={6} style={{ marginBottom: '30px' }}>
                        <Multiselect
                            roles={reportRoles ? reportRoles : []}
                            label="Select Roles"
                            roleName={roles}
                            handleRoleChange={handleRoleChange}
                            handleDelete={handleDeleteRole}
                            disabled={pageMode === 'view' ? true : false}
                            style={{ background: 'red' }}
                        />
                    </Grid>

                    <Grid item lg={6} style={{ marginBottom: '30px' }}>
                        <Multiselect
                            roles={subModuleName ? subModuleName : []}
                            label="Select Sub Module Name"
                            roleName={subModules}
                            handleRoleChange={handleSubModuleIdChange}
                            handleDelete={handleDeleteRole}
                            disabled={pageMode === 'view' ? true : false}
                        />
                    </Grid>
                </Grid>

                <Grid container display="flex" flexDirection="row">
                    <Grid item lg={3} style={{ paddingLeft: '0px' }}>
                        <FormControlLabel
                            value="status"
                            name="status"
                            label="Status:"
                            labelPlacement="start"
                            size="small"
                            style={{ marginLeft: '1px' }}
                            className={`${classes.statusLabel} in-active`}
                            disabled={pageMode === 'view' ? true : false}
                            control={
                                <>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) =>
                                            handleInputChange(e, 'INACTIVE')
                                        }
                                        name="status"
                                        className={
                                            configuredReportData.status ===
                                            'INACTIVE'
                                                ? `${classes.inctvBtn} active`
                                                : `${classes.button} active`
                                        }
                                        disabled={
                                            pageMode === 'view' ? true : false
                                        }
                                    >
                                        INACTIVE
                                        <Checkbox
                                            value="INACTIVE"
                                            className="active"
                                            name="status"
                                            icon={<CircleUnchecked />}
                                            checked={
                                                configuredReportData.status ===
                                                'INACTIVE'
                                                    ? true
                                                    : false
                                            }
                                            checkedIcon={
                                                <CircleCheckedFilled
                                                    style={{ color: '#B10021' }}
                                                />
                                            }
                                            disabled={
                                                pageMode === 'view'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) =>
                                            handleInputChange(e, 'ACTIVE')
                                        }
                                        name="status"
                                        className={
                                            configuredReportData.status ===
                                            'ACTIVE'
                                                ? `${classes.actvBtn} active`
                                                : `${classes.button} active`
                                        }
                                        disabled={
                                            pageMode === 'view' ? true : false
                                        }
                                    >
                                        ACTIVE
                                        <Checkbox
                                            className="active"
                                            color="primary"
                                            name="status"
                                            value="ACTIVE"
                                            icon={<CircleUnchecked />}
                                            checked={
                                                configuredReportData.status ===
                                                'ACTIVE'
                                                    ? true
                                                    : false
                                            }
                                            checkedIcon={
                                                <CircleCheckedFilled />
                                            }
                                            disabled={
                                                pageMode === 'view'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </Button>
                                </>
                            }
                        />
                    </Grid>

                    <Grid item lg={3}>
                        <FormControlLabel
                            value="filter"
                            name="filter"
                            label="Filter:"
                            labelPlacement="start"
                            size="small"
                            className={`${classes.filterLabel} in-active`}
                            disabled={pageMode === 'view' ? true : false}
                            control={
                                <>
                                    <Button
                                        disabled={
                                            pageMode === 'view' ? true : false
                                        }
                                        onClick={(e) =>
                                            handleInputChange(e, 'DATE_RANGE')
                                        }
                                        className={
                                            configuredReportData.filter &&
                                            configuredReportData.filter.indexOf(
                                                'DATE_RANGE'
                                            ) !== -1
                                                ? `${classes.activeBtn} active`
                                                : `${classes.filterBtn} active`
                                        }
                                    >
                                        Date Range
                                    </Button>
                                    <Button
                                        disabled={
                                            pageMode === 'view' ? true : false
                                        }
                                        onClick={(e) =>
                                            handleInputChange(e, 'SITE_ID')
                                        }
                                        className={
                                            configuredReportData.filter &&
                                            configuredReportData.filter.indexOf(
                                                'SITE_ID'
                                            ) !== -1
                                                ? `${classes.activeBtn} active`
                                                : `${classes.filterBtn} active`
                                        }
                                    >
                                        Site ID
                                    </Button>
                                </>
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container display="flex" justifyContent="flex-end">
                    <Button
                        style={{
                            width: '281px',
                            marginLeft: '9px',
                            marginTop: '25px',
                        }}
                        s
                        variant="contained"
                        color="primary"
                        onClick={handleConfigSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Card>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
                width
            >
                <BackgroundCard
                    title={'Report Table Headers'}
                    titleStyle={{ fontSize: '18px' }}
                    containerStyle={{ width: '100%' }}
                >
                    <Grid item lg={6}>
                        <Multiselect
                            roles={allColumns}
                            label="Select table headers"
                            roleName={selectedSavedColumns}
                            handleRoleChange={handleTableHeadersChange}
                            handleDelete={deleteSavedColumn}
                            disabled={pageMode === 'view' ? true : false}
                        />
                    </Grid>

                    <Grid container display="flex" justifyContent="flex-end">
                        <Button
                            style={{
                                width: '281px',
                                marginLeft: '9px',
                                marginTop: '25px',
                            }}
                            s
                            variant="contained"
                            color="primary"
                            onClick={handleConfigSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </BackgroundCard>
            </Grid>
        </>
    )
}

export default React.memo(Configuration)
