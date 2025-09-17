import React from 'react'
import { Box, Card, Grid } from '@material-ui/core'
import MTab from 'app/components/Tab/Tabs'
import queryString from 'query-string'
import Configurations from './ViewReports/Configurations'
import { reportTableHeaderFeilds, sourceFeilds } from './Constants'
import TableHeaders from './ViewReports/TableHeaders'
import CustomColumn from './ViewReports/CustomColumn'
import Reports from './TabComponents/Reports'
import Charts from './TabComponents/Charts'
import { useHistory } from 'react-router-dom';

const queryParams = queryString.parse(window.location.search)
const id = queryParams?.id

const moduleReportTabs = [
    {
        name: 'Configuration',
    },
    {
        name: 'Reports',
    },
    {
        name: 'Charts',
    },
]

const ViewReportComponent = (props) => {
    const [subModules, setSubModules] = React.useState('')
    const [roles, setRoles] = React.useState('')
    const [tableHeaders, setTableHeaders] = React.useState('')
    const history = useHistory();

    const {
        reportData,
        parentModuleName,
        savedTableHeaders,
        moduleColumns,
    } = props

    React.useEffect(() => {
        const subM = reportData?.submoduleIds?.length
            ? reportData?.submoduleIds?.map((item) => item?.name)
            : []
        const subModules = subM.join(',')

        const rolesM = reportData?.roles?.length
            ? reportData?.roles?.map((item) => item?.role)
            : []
        const roles = rolesM.join(',')

        const tableH = savedTableHeaders?.length
            ? savedTableHeaders?.map((item) => item?.name)
            : []
        const tableHeaders = tableH.join(',')

        setSubModules(subModules)
        setRoles(roles)
        setTableHeaders(tableHeaders)
    }, [reportData, savedTableHeaders])

    const [activeReportTab, setActiveReportTab] = React.useState(0)

    const getActiveReportTab = (index) => {
        setActiveReportTab(index)
    }

    const handleEditIconClick = () => {
        history.push(`/report/edit?id=${id}`);
    }

    const sourceData = {
        reportName: reportData.name,
        parentModuleName: parentModuleName,
        roles: roles,
        status: reportData?.status,
        subModuleNames: subModules,
        filters: reportData?.filter?.length ? reportData?.filter.join('') : '',
    }

    const reportTableHeaderData = {
        selectedTableHeaders: tableHeaders,
    }

    //MAIN RETURN
    return (
        <Grid id="sectionId" className="m-sm-30">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginTop: '40px',
                }}
            >
                <Card elevation={6} className="p-0 m-4 mb-12 mt-16">
                    <MTab
                        defaultValue={activeReportTab}
                        tab={moduleReportTabs}
                        getCurrentTab={getActiveReportTab}
                    />
                </Card>

                {activeReportTab === 0 && (
                    <>
                        {/* Title Below Section */}

                        <Configurations
                            handleEditIconClick={handleEditIconClick}
                            sourceFeilds={sourceFeilds}
                            sourceData={sourceData}
                        />
                        <TableHeaders
                            reportTableHeaderFeilds={reportTableHeaderFeilds}
                            reportTableHeaderData={reportTableHeaderData}
                        />
                        <CustomColumn
                            reportData={reportData}
                            moduleColumns={moduleColumns}
                        />
                    </>
                )}

                {activeReportTab === 1 && (
                    <Reports
                        reportId={id}
                        reportData={reportData}
                    />
                )}

                {activeReportTab === 2 && <Charts />}
            </Box>
        </Grid>
    )
}

export default React.memo(ViewReportComponent)
