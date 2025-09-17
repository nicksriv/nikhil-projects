import React, { useState } from 'react'
import { Grid, Menu } from '@material-ui/core'
import { V5GlobalHeaderActionList } from 'app/components'
import { parseReportTableData, parseTableHeaders } from '../Constants'

import dummyData from './dummyData'
import CustomColumnsList from 'app/views/UserManagement/components/CustomColumnsList'
import {
    getAllColumnsService,
    getReportTableDataService,
} from 'app/redux/ReportManagement/reportManagerService'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'
import queryString from 'query-string'
import { config } from 'helper/config.js';
import { makeStyles } from '@mui/styles'
import ViewReportFilter from '../components/ViewReportFilter'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'


const queryParams = queryString.parse(window.location.search)
const id = queryParams?.id

const Reports = ({ subModules, subModuleIds, reportData, reportId}) => {

    const [tableData, setTableData] = React.useState([])
    const [tableHeaders, setTableHeaders] = React.useState([])
    const [tableContent, setTableContent] = React.useState({})

    const [allColumns, setAllColumns] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [reportError, setReportError] = React.useState('')

    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)

    const [pageNumber, setPageNumber] = useState(0)
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
    }))

    const[inputSearch, setInputSearch] = React.useState('')

    const classes = useStyles()
    const dispatch = useDispatch()

    const indexOfLastData = (currentPage + 1) * pageSize
    const indexOfFirstData = indexOfLastData - pageSize

    const getAllColumns = async () => {
        try {
            setLoading(true)
            const payload = {
                moduleId: reportData?.parentModuleId,
                submoduleIds: reportData?.submoduleIds,
            }
            const res = await getAllColumnsService(id, payload)
            if (res?.customResponses.length) {
                setAllColumns(res?.customResponses)
                await getReportTableData(res?.customResponses)
            }
        } catch (error) {
            console.log('error', error)
        } finally{
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllColumns()
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData() // Call the asynchronous function
    }, [])


    const downloadReportDataDetails = () => {
        dispatch({
            type: 'downloadReportDataDetails',
            payload: {reportId, searchParam: ""},
        })
    }
      
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getReportTableData = async (allColumnsData) => {
        setLoading(true)
        try {
            const searchParam =  inputSearch || ""
            const res = await getReportTableDataService({reportId, currentPage,searchParam})
            setTableContent(res)
            if(res && res.content && res.content.length){
                const headers = Object.keys(res.content[0]);
                allColumnsData = allColumnsData.filter(c => headers.includes(c.id));
            }
            const result = parseReportTableData(allColumnsData, res)
            const tableHeaders = parseTableHeaders(allColumnsData)

            setTableData(result)
            setTableHeaders(tableHeaders)
        } catch (error) {
            console.log('error', error)
            setReportError('No data found')
        }finally{
            setLoading(false)
        }
    }

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
        console.log("isFilterPopupOpen",isFilterPopupOpen);
    }

    const handleSearchChange = (event) => {
        setInputSearch(event.target.value);
    };

    const handleClearClick = () =>{
        console.log("cleared");
        inputSearch("")
    }

    const applyFilter = () =>{
       setInputSearch(inputSearch)
       getAllColumns()
       console.log("RESSSS",inputSearch);
    }

    if (loading) {
        return <Loading style={{marginTop:"30px"}} />
    }

    if (!reportError) {
        if (!tableData?.length) {
            return (
                <Grid>
                    <BackgroundCard
                        contentStyle={{
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        containerStyle={{ height: '100px' }}
                        containerClass=""
                        headerContainerStyle={{
                            marginBottom: '-75px',
                            marginLeft: '15px',
                        }}
                        title={'Reports Data'}
                    >
                        <h3 style={{ marginLeft: '31px', marginTop: '74px' }}>
                            No Data Available
                        </h3>
                    </BackgroundCard>
                </Grid>
            )
        }

        return (
            <Grid>
                <BackgroundCard
                    contentStyle={{ padding: 0 }}
                    headerContainerStyle={{
                        marginBottom: '-75px',
                        marginLeft: '15px',
                    }}
                    title={'Reports Data'}
                >
                    <V5GlobalHeaderActionList
                        title={''}
                        onlyIcons={true}
                        style={{ marginBottom: '-73px' }}
                        iconsList={[
                            {
                                iconType: 'SaveAltIcon',
                                tooltipTitle: 'Download Excel',
                                areaLabel: 'upload picture',
                                iconComponent: 'span',
                                iconClickHandler: () => downloadReportDataDetails(),
                            },
                            {
                                iconType: 'Filter',
                                tooltipTitle: 'Filter',
                                areaLabel: 'upload picture',
                                iconComponent: 'span',
                                iconClickHandler: handleFilterClick,
                                filterPopupOpen: isFilterPopupOpen,
                            },
                        ]}
                    />
                    <Menu
                        width={360}
                        open={isFilterPopupOpen}
                        onClose={() => setIsFilterPopupOpen(false)}
                        // anchorEl={anchorRef.current}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        classes={{
                            root: classes.root,
                            paper: classes.paper,
                        }}
                        MenuListProps={{ disablePadding: true }}
                    >
                        <ViewReportFilter
                            close={() => setIsFilterPopupOpen(false)}
                            handleSearchChange={handleSearchChange}
                            applyFilter={applyFilter}
                            handleClearClick={handleClearClick}
                        />
                    </Menu>
                    <CustomColumnsList
                        indexOfFirstData={indexOfFirstData}
                        indexOfLastData={indexOfLastData}
                        paginate={paginate}
                        page={currentPage}
                        heading={tableHeaders}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        currentPage={currentPage}
                        setPageSize={handlePageSizeChange}
                        tableData={tableData}
                        totalItems={tableContent?.totalElements}
                        totalElements={tableContent?.totalElements}
                        filterDetails={dummyData.filterDetails}
                        hasEditIcon={false}
                        hasDeleteIcon={false}
                        hasViewIcon={false}
                        hasInfoIcon={false}
                    />
                </BackgroundCard>
            </Grid>
        )
    }

    return (
        <Grid>
            <BackgroundCard
                contentStyle={{
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                }}
                containerStyle={{ height: '100px' }}
                containerClass=""
                headerContainerStyle={{
                    marginBottom: '-75px',
                    marginLeft: '15px',
                }}
                title={'Reports Data'}
            >
                <h3 style={{ marginLeft: '31px', marginTop: '74px' }}>
                    {reportError}
                </h3>
            </BackgroundCard>
        </Grid>
    )
}

export default Reports
