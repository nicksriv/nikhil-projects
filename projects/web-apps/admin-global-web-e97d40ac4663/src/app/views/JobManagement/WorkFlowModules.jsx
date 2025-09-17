import React, { useEffect } from 'react'
import history from 'helper/history.js'
import { Grid, Tooltip, Card } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MTab from 'app/components/Tab/Tabs'
import { useLocation, useParams } from 'react-router-dom'

import EmptyView from 'app/components/EmptyView/EmptyView'
import ModuleDataTable from './components/JobModules/ModuleDataTable'
import { V5GlobalHeaderActionList } from 'app/components'

const WorkFlowModules = () => {
    const { mid } = useParams()
    const location = useLocation()
    const { name, subModules } = location.state
    const [activeSubModules, setActiveSubModules] = React.useState('')
    const handleBack = (e) => {
        history.goBack()
    }
    const getActiveSubModulesById = (id) => {
        setActiveSubModules(subModules[id])
    }

    useEffect(() => {
        const { name, subModules } = location.state
        setActiveSubModules(subModules[0])
    }, [])
    return (
        <>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
            >
                <V5GlobalHeaderActionList
                backIcon
                title={name && name}
            /> 
            </Grid>
            <Card elevation={6} className="p-0 m-4">
                {subModules && subModules.length ? (
                    <MTab
                        defaultValue={activeSubModules}
                        tab={subModules}
                        getCurrentTab={getActiveSubModulesById}
                    />
                ) : (
                    <EmptyView
                        Imgsrc="/assets/images/No Data Illustration-3.svg"
                        Title="No Submodules Available."
                    />
                )}
            </Card>

            {/* sub module table */}

            <div className="p-0 m-4">
                <ModuleDataTable
                    mid={mid}
                    smid={activeSubModules?.id}
                    wid={activeSubModules?.workFlowId}
                    mBy={activeSubModules?.mappedBy}
                />
            </div>
        </>
    )
}

export default WorkFlowModules
