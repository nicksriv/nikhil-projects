import React from 'react'
import {
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    MenuItem,
    TextField,
} from '@material-ui/core'
import {
    makeStyles,
} from '@material-ui/core/styles'
import queryString from 'query-string'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import CustomColumnsList from 'app/views/UserManagement/components/CustomColumnsList'
import { V5GlobalHeaderActionList } from 'app/components'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'
import {
    deleteCustomColumn,
    getAllCustomColumnsService,
    postCustomColumn,
    updateCustomColumn,
} from 'app/redux/ReportManagement/reportManagerService'
import dummyData from '../TabComponents/dummyData'
import { customColumnDataParser } from '../Constants'
import { SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'

import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
const drawerWidth = 380

const SidebarDrawer = ({
    open,
    handleDrawerClose,
    headerText,
    outlinedBtnText,
    solidBtnText,
    handleSubmit = () => {},
    buttonDisabled,
    classes,
    customColumnData,
    columnFormChange,
    moduleColumns,
    Aggregations,
}) => {
    return (
        <Drawer
            className={`${classes.drawer} w-full`}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true,
            }}
            width={600}
        >
            <Grid className={clsx('flex-column ', classes.miniCart)}>
                <div className="cart__topbar flex justify-between items-center p-1 mb-10 pl-4">
                    <h5
                        className={`my-0 font-medium`}
                        style={{ color: '#fff' }}
                    >
                        {headerText}
                    </h5>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon className={classes.close} />
                    </IconButton>
                </div>
            </Grid>
            <Box sx={{ m: 3 }}>
                <Grid>
                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            label="Column Name"
                            name="name"
                            variant="outlined"
                            required
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                            fullWidth
                            value={customColumnData['columnName']}
                            onChange={(e) => {
                                columnFormChange(e, 'columnName')
                            }}
                            errorStyle={{
                                position: 'absolute',
                                bottom: '-0.9rem',
                            }}
                        />
                    </Grid>

                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            variant="outlined"
                            select
                            label="Reference Column"
                            fullWidth
                            required
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                            type="text"
                            name="firstReference"
                            value={customColumnData['firstReference']}
                            onChange={(e) => {
                                columnFormChange(e, 'firstReference')
                            }}
                        >
                            {moduleColumns?.map((col) => {
                                return (
                                    <MenuItem value={col.columnName}>
                                        {col.columnName}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                        {/* NOTE:- COMMENTED FOR FUTURE REFERENCE */}
                        {/* <Grid className="mr-5">
                                {pageMode !== 'view' && (
                                    <AddIcon
                                        className="cursor-pointer mr-5"
                                        onClick={addNewCard}
                                    />
                                )}
                                {index !== 0 && (
                                    <RemoveIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            removeCard(el, index)
                                        }
                                    />
                                )}
                            </Grid> */}
                    </Grid>

                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            variant="outlined"
                            select
                            label="Select Column"
                            fullWidth
                            required
                            helperText="Must be Number"
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                            type="text"
                            name="column"
                            value={customColumnData['firstColumn']}
                            onChange={(e) => {
                                columnFormChange(e, 'firstColumn')
                            }}
                        >
                            {moduleColumns?.map((col) => {
                                return (
                                    <MenuItem value={col.columnName}>
                                        {col.columnName}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>
                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            variant="outlined"
                            select
                            label="Aggregate"
                            fullWidth
                            required
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.aggInput,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.formTextInput,
                                },
                            }}
                            name="operation"
                            type="text"
                            value={customColumnData['operation']}
                            onChange={(e) => columnFormChange(e, 'operation')}
                        >
                            {Aggregations?.map((operation, index) => (
                                <MenuItem key={index * 2} value={operation}>
                                    {operation}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            variant="outlined"
                            select
                            label="Select Column"
                            required
                            helperText="Must be Number"
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                            name="column"
                            type="text"
                            fullWidth
                            value={customColumnData['secondColumn']}
                            onChange={(e) =>
                                columnFormChange(e, 'secondColumn')
                            }
                        >
                            {moduleColumns?.map((col) => (
                                <MenuItem value={col.columnName}>
                                    {col.columnName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid style={{ marginTop: '15px' }} item lg={12}>
                        <TextField
                            variant="outlined"
                            select
                            label="Reference Column"
                            fullWidth
                            required
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                            type="text"
                            name="secondReference"
                            value={customColumnData['secondReference']}
                            onChange={(e) => {
                                columnFormChange(e, 'secondReference')
                            }}
                        >
                            {moduleColumns?.map((col) => {
                                return (
                                    <MenuItem value={col.columnName}>
                                        {col.columnName}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                        {/* NOTE:- COMMENTED FOR FUTURE REFERENCE */}
                        {/* <Grid className="mr-5">
                                {pageMode !== 'view' && (
                                    <AddIcon
                                        className="cursor-pointer mr-5"
                                        onClick={addNewCard}
                                    />
                                )}
                                {index !== 0 && (
                                    <RemoveIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            removeCard(el, index)
                                        }
                                    />
                                )}
                            </Grid> */}
                    </Grid>
                </Grid>
            </Box>

            <div>
                <Grid spacing={5} direction="row">
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button0}
                        onClick={handleDrawerClose}
                    >
                        {outlinedBtnText}
                    </Button>

                    <Button
                        disabled={buttonDisabled}
                        variant="contained"
                        color="primary"
                        className={classes.button1}
                        onClick={handleSubmit}
                    >
                        {solidBtnText}
                    </Button>
                </Grid>
            </div>
        </Drawer>
    )
}

const CustomColumn = ({ moduleColumns }) => {
    const useStyles = makeStyles(() => ({
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
        formTextInput: {
            fontSize: '15px !important',
        },
        drawer: {
            width: drawerWidth,
        },
        miniCart: {
            width: '376px',
            '& .cart__topbar': {
                height: 'var(--topbar-height)',
                backgroundColor: '#2C3E93',
                color: '#000000DE',
            },
            '& .mini-cart__item': {
                transition: 'background 300ms ease',
                '&:hover': {
                    background: 'rgba(0,0,0,0.01)',
                },
            },
        },
        close: {
            color: '#00000099',
        },
        button0: {
            border: '1px solid #2C3E93',
            width: '152px',
            height: '35px',
            marginTop: '55px',
            marginLeft: '25px',
            marginBottom: '80px',
        },
        button1: {
            backgroundColor: '#2C3E93',
            width: '152px',
            height: '35px',
            marginTop: '55px',
            marginLeft: '25px',
            marginBottom: '80px',
        },
    }))

    const dispatch = useDispatch()

    const Aggregations = [
        'ADDITION',
        'SUBSTRACTION',
        'MULTIPLICATION',
        'DIVISION',
    ]
    const customColumnHeaders = [
        {
            key: 'columnName',
            name: 'Column name',
            hasSorting: true,
        },
        {
            key: 'firstColumn',
            name: 'First Column',
            hasSorting: true,
        },
        {
            key: 'operation',
            name: 'Operation',
            hasSorting: true,
        },
        {
            key: 'secondColumn',
            name: 'Second Column',
            hasSorting: true,
        },
        {
            key: 'firstReference',
            name: 'First Reference',
            hasSorting: true,
        },
        {
            key: 'secondReference',
            name: 'Second Reference',
            hasSorting: true,
        },

        {
            key: 'actions',
            name: 'Actions',
            hasSorting: true,
        },
    ]

    const parsedQS = queryString.parse(window.location.search)

    React.useEffect(() => {
        const fetchData = async () => {
            await getAllCustomColumns()
        }

        fetchData() // Call the asynchronous function
    }, [moduleColumns])

    const classes = useStyles()

    const [sideDrawer, setSideDrawer] = React.useState(false)
    const [customColumnData, setCustomColumData] = React.useState({
        //For Reference
        // columnName: '',
        // referenceColumn: '',
        // firstColumn: '',
        // operation: '',
        // secondColumn: '',
    })
    const [activeCustomColumn, setActiveCustomColumn] = React.useState({})
    const [editCustomColumn, setEditCustomColumn] = React.useState(false)
    const [allCustomColumns, setAllCustomColumns] = React.useState([])
    const [loading, setLoading] = React.useState(false)


    const getAllCustomColumns = async () => {
        setLoading(true)
        try {
            const result = await getAllCustomColumnsService(parsedQS.id)
            if (result?.length > 0) {
                const parsedData = parseColumnData(
                    result[0]?.customColumns,
                    moduleColumns
                )
                if (parsedData.length) {
                    setAllCustomColumns(parsedData)
                }
            }
        } catch (error) {
            console.error('Error fetching custom columns:', error)
        }finally{
        setLoading(false)
        }
    }

    const parseColumnData = (customColumns, moduleColumns) => {
        const result = []

        customColumns.forEach((item, idx) => {
            const dataObj = {}
            dataObj['columnName'] = item?.name
            dataObj['operation'] = item?.operation
            dataObj['columnId'] = item?.id

            const firstColumn = moduleColumns.find(
                (itm, index) => itm.columnId === item.first.column
            )
            const secondColumn = moduleColumns.find(
                (itm, index) => itm.columnId === item.second.column
            )

            const firstReference = moduleColumns.find(
                (itm, index) => itm.columnId === item.first.reference
            )
            const secondReference = moduleColumns.find(
                (itm, index) => itm.columnId === item.second.reference
            )

            dataObj['actions'] = ''

            dataObj['firstColumn'] = firstColumn?.columnName
            dataObj['secondColumn'] = secondColumn?.columnName
            dataObj['firstReference'] = firstReference?.columnName
            dataObj['secondReference'] = secondReference?.columnName

            result.push(dataObj)
        })
        return result
    }

    const columnFormChange = (e, columnName, index) => {
        e.preventDefault()
        const { value } = e.target

        const newDataObj = { ...customColumnData }
        newDataObj[columnName] = value

        setCustomColumData(newDataObj)
    }

    const handleEdit = (data) => {
        setEditCustomColumn(true)
        setActiveCustomColumn(data)
        setCustomColumData(data)
        setSideDrawer(true)
    }
    const handleDelete = async (data) => {
        setLoading(true)
        try {
            const result = await deleteCustomColumn(
                parsedQS?.id,
                data?.columnId
            )
            dispatch(SNACKBAR_SUCCESS(result.message))
            setSideDrawer(false)
            setCustomColumData({})
            setEditCustomColumn(false)

            getAllCustomColumns()
        } catch (error) {
            console.log('error submitting custom columns', error)
        }
        finally{
        setLoading(false)
        }
    }

    const handleSubmit = async () => {
        const payload = customColumnDataParser(
            customColumnData,
            moduleColumns,
            activeCustomColumn,
            editCustomColumn
        )
        setLoading(true)

        try {
            if (editCustomColumn) {
                const result = await updateCustomColumn(parsedQS.id, payload)
                dispatch(SNACKBAR_SUCCESS(result.message))
                setSideDrawer(false)
                setEditCustomColumn(false)
                setCustomColumData({})
                getAllCustomColumns()

                return
            }
            const result = await postCustomColumn(parsedQS.id, payload)
            dispatch(SNACKBAR_SUCCESS(result.message))
            setSideDrawer(false)
            setCustomColumData({})
            setEditCustomColumn(false)
            getAllCustomColumns()
        } catch (error) {
            console.log('error submitting custom columns', error)
        }
        finally{
        setLoading(false)
        }
    }

    if (loading) {
        return <Loading style={{marginTop:"18rem"}} />
    }
    return (
        <>
            <Grid className="mt-10" lg={12}>
                <SidebarDrawer
                    open={sideDrawer}
                    solidBtnText={editCustomColumn ? 'Update' : 'Create'}
                    outlinedBtnText="CANCEL"
                    handleDrawerClose={() => {
                        setSideDrawer(false)
                        setCustomColumData({})
                        editCustomColumn(false)
                    }}
                    headerText="Create custom column"
                    handleSubmit={handleSubmit}
                    classes={classes}
                    customColumnData={customColumnData}
                    columnFormChange={columnFormChange}
                    moduleColumns={moduleColumns}
                    Aggregations={Aggregations}
                />

                <BackgroundCard
                    contentStyle={{ padding: 0 }}
                    headerContainerStyle={{
                        marginBottom: '-77px',
                        marginLeft: '15px',
                    }}
                    title={'Custom Columns List'}
                    containerStyle={{ width: '100%', margin: '0 !important' }}
                    containerClass="m-0"
                >
                    <V5GlobalHeaderActionList
                        title={''}
                        onlyIcons={true}
                        style={{ marginBottom: '-76px' }}
                        iconsList={[
                            {
                                iconType: 'note_add',
                                tooltipTitle: 'Create custom columns',
                                areaLabel: 'upload picture',
                                iconComponent: 'span',
                                iconClickHandler: () => setSideDrawer(true),
                            },
                        ]}
                    />
                    {!allCustomColumns?.length ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px 0',
                            }}
                        >
                            <h3>No Custom Columns Created</h3>
                        </div>
                    ) : (
                        <CustomColumnsList
                            indexOfFirstData={0}
                            indexOfLastData={0}
                            paginate={dummyData.paginate}
                            heading={customColumnHeaders}
                            pageSize={0}
                            pageNumber={0}
                            tableData={allCustomColumns}
                            setPageSize={() => {}}
                            totalItems={0}
                            filterDetails={dummyData.filterDetails}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            pagination={false}
                            hasDeleteIcon={true}
                            hasEditIcon={true}
                        />
                    )}
                </BackgroundCard>
            </Grid>
        </>
    )
}

export default CustomColumn
