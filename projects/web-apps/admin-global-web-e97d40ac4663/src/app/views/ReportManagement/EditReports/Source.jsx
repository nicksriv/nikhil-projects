import React from 'react'
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
} from '@material-ui/core'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'

import Multiselect from 'app/components/Multiselect/MultiSelectDate'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'

const Source = (props) => {
    const {
        reportData,
        parentModuleName,
        roles,
        handleRoleChange,
        handleDeleteRole,
        selectedRoles,
        selectedSubmodules = [],
        moduleData,
        handleSubModuleIdChange,
        postReportConfig,
        handleFilterAndStatusChange,
        statusData,
        filterData,
        sourceSubmitError,
    } = props

    const useStyles = makeStyles(() => ({
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
        statusLabel: {
            color: 'rgba(0, 0, 0, 0.6) !important',
        },
        filterLabel: {
            color: '#9B9A9A !important',
            marginLeft: 0,
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
    }))

    const classes = useStyles()

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
                    titleStyle={{ fontSize: '18px' }}
                    containerStyle={{ width: '100%' }}
                >
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
                                {reportData.name ? reportData.name : ''}
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
                                {parentModuleName}
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
                                roles={roles ? roles : []}
                                label="Select Roles"
                                roleName={selectedRoles}
                                handleRoleChange={handleRoleChange}
                                handleDelete={handleDeleteRole}
                                style={{ background: 'red' }}
                            />
                        </Grid>

                        <Grid item lg={6} style={{ marginBottom: '30px' }}>
                            <Multiselect
                                roles={
                                    moduleData?.subModules
                                        ? moduleData?.subModules
                                        : []
                                }
                                label="Select Sub Module Name"
                                roleName={
                                    selectedSubmodules.length
                                        ? selectedSubmodules
                                        : []
                                }
                                handleRoleChange={handleSubModuleIdChange}
                                handleDelete={handleDeleteRole}
                                isError={sourceSubmitError ? true : false}
                                errorMsg={sourceSubmitError}
                                
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
                                control={
                                    <>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={(e) =>
                                                handleFilterAndStatusChange(
                                                    'status',
                                                    'INACTIVE'
                                                )
                                            }
                                            name="status"
                                            className={
                                                statusData === 'INACTIVE'
                                                    ? `${classes.inctvBtn} active`
                                                    : `${classes.button} active`
                                            }
                                        >
                                            INACTIVE
                                            <Checkbox
                                                value="INACTIVE"
                                                className="active"
                                                name="status"
                                                icon={<CircleUnchecked />}
                                                checked={
                                                    statusData === 'INACTIVE'
                                                        ? true
                                                        : false
                                                }
                                                checkedIcon={
                                                    <CircleCheckedFilled
                                                        style={{
                                                            color: '#B10021',
                                                        }}
                                                    />
                                                }
                                            />
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={(e) =>
                                                handleFilterAndStatusChange(
                                                    'status',
                                                    'ACTIVE'
                                                )
                                            }
                                            name="status"
                                            className={
                                                statusData === 'ACTIVE'
                                                    ? `${classes.actvBtn} active`
                                                    : `${classes.button} active`
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
                                                    statusData === 'ACTIVE'
                                                        ? true
                                                        : false
                                                }
                                                checkedIcon={
                                                    <CircleCheckedFilled />
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
                                control={
                                    <>
                                        <Button
                                            onClick={(e) =>
                                                handleFilterAndStatusChange(
                                                    'filter',
                                                    'DATE_RANGE'
                                                )
                                            }
                                            className={
                                                filterData &&
                                                filterData.indexOf(
                                                    'DATE_RANGE'
                                                ) !== -1
                                                    ? `${classes.activeBtn} active`
                                                    : `${classes.filterBtn} active`
                                            }
                                        >
                                            Date Range
                                        </Button>
                                        <Button
                                            onClick={(e) =>
                                                handleFilterAndStatusChange(
                                                    'filter',
                                                    'SITE_ID'
                                                )
                                            }
                                            className={
                                                filterData &&
                                                filterData.indexOf(
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
                            variant="contained"
                            color="primary"
                            onClick={postReportConfig}
                        >
                            Submit
                        </Button>
                    </Grid>
                </BackgroundCard>
            </Grid>
        </>
    )
}

export default Source
