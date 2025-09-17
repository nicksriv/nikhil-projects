import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Icon, Typography } from '@material-ui/core'

const ModuleCard = ({ moduleData, handleOnModulePress }) => {
    const { name, icon, moduleColor } = moduleData
    const useStyles = makeStyles(() => ({
        moduleCard: {
            borderRadius: 9,
            padding: 12,
            margin: 10,
            border: `1px solid #DBD8D8`,
            boxShadow: `0px 0.5px 1px 0.5px $DBD8D8`,
            backgroundColor: 'white',
            alignItems: 'center',
            width: 150,
            cursor: 'pointer',
        },
        moduleContent: {
            textAlign: 'center',
            alignItems: 'center',
            paddingVertical: 10,
        },
    }))
    const classes = useStyles()

    return (
        <div className={classes.moduleCard} onClick={handleOnModulePress}>
            <div className={classes.moduleContent}>
                {icon ? <Icon>{icon}</Icon> : <Icon>{'all_out'}</Icon>}

                <Typography>{name}</Typography>
            </div>
        </div>
    )
}

export default ModuleCard
