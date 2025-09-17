import React, { useState } from 'react'
import { Grid, Paper, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getShuffledData, modulesColorsArr } from 'helper/utils'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    Card: {
        background:
            'linear-gradient(to right, #E6F6F3 90%, transparent 50%) left',
        borderRadius: '8px',
        opacity: 1,
        position: 'relative',
    },
    countText: {
        fontSize: '24px',
        lineHeight: '24px',
        letterSpacing: '0.18px',
        marginTop: '20px',
        color: '#00000099',
        fontWeight: 900,
    },
    heading: {
        width: '100%',
        lineHeight: '19px',
        color: '#00000099',
        letterSpacing: '0.53px',
        fontFamily: 'SF Pro Display',
        marginLeft: '24px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '19px',
        marginBottom: '13px',
        fontWeight: 'bold',
        paddingTop: '15px',
    },
    moduleCard: {
        textAlign: 'center',
        boxShadow: '0px 12px 36px #00000029',
        borderRadius: '16px',
        padding: '20px',
        position: 'relative',
    },
    cardItemsCenter: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textMuted: {
        color: '#00000099',
        letterSpacing: '0.32px',
    },
    subModuleText: {
        color: '#0000001F',
        fontSize: '12px',
        letterSpacing: '0.4px',
    },
    flexItem: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    showAllCard: {
        boxShadow: '0px 12px 36px #00000029',
        borderRadius: '16px',
        background: '#DCDCDC',
        color: '#0000001F',
        fontSize: '20px',
        textAlign: 'left',
        letterSpacing: '0.66px',
        padding: '12px',
        fontWeight: 'bold',
    },
    active: {
        background: '#2C3E93',
        color: '#FFFFFF',
    },
    defaultShowAllWrapper: {
        opacity: 0,
    },
    showAllWrapper: {
        transition: 'all 0.5s, opacity 2s',
        opacity: 1,
    },
    iconStyle: {
        position: 'absolute',
        top: '-13px',
        color: '#FFFFFF',
        borderRadius: '100px',
        width: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevronRightStyle: {
        background: 'white',
        color: '#2C3E93',
        borderRadius: '100px',
    },
    chevronLeftStyle: {
        background: '#FFFFFF',
        color: '#2C3E93',
        borderRadius: '100px',
        cursor: 'pointer',
    },
    alignStart: {
        alignItems: 'flex-start',
    },

}))

const StatCards2 = () => {
    const classes = useStyles()
    const [showAll, setShowAll] = useState(false)
    const { modules } = useSelector((state) => state.dashboard)
    const moreThanFour = modules?.length > 4 ? true : false
    const typeOfUser = localStorage.getItem('typeOfUser')

    const handleClick = () => {
        if (!moreThanFour) return false
        setShowAll(!showAll)
    }

    const ToggleShowHide = (
        <Grid item sm={2}>
            {moreThanFour && <Paper
                className={moreThanFour ?
                    `${classes.showAllCard + " " +
                    classes.cardItemsCenter + " " +
                    classes.alignStart + " " +
                    classes.active} cursor-pointer h-full border-radius-8` :
                    `${classes.showAllCard + " " +
                    classes.cardItemsCenter + " " +
                    classes.alignStart
                }`}
            >
                <div className='pt-3 text-20 pl-3'>Show</div>
                <div className='pt-1 text-20 pl-3'>{showAll ? 'Less' : 'All'}</div>
                <div className="pt-3 text-20 pl-3">
                    <Icon
                        onClick={handleClick}
                        className={
                            showAll
                                ? classes.chevronLeftStyle
                                : classes.chevronRightStyle
                        }
                    >
                        {showAll ? 'chevron_left' : 'chevron_right'}
                    </Icon>
                </div>
            </Paper>}
        </Grid>
    )

    const ModuleCard = ({ module }) => {
        const { name, iconId, subModulesCount, color } = module
        return (
            <Grid item sm={2}>
                <Paper
                    className={`${classes.moduleCard} ${classes.cardItemsCenter}`}
                >
                    <Icon
                        className={classes.iconStyle}
                        style={{ backgroundColor: color || '#FE4B7E' }}
                    >
                        {iconId}
                    </Icon>
                    <div className="mt-3">
                        <strong>{name || ''}</strong>
                    </div>
                    <div className="mt-5">
                        <strong className={classes.countText}>
                            {subModulesCount || 0}
                        </strong>
                        <div className={classes.subModuleText}>Sub-Modules</div>
                    </div>
                </Paper>
            </Grid>
        )
    }

    return (
        <>
            <div className={classes.Card}>
                <div className={`${classes.heading }`}>My Modules</div>
                <div className="ml-6">
                    <Grid container spacing={2}>
                        <Grid
                            item
                            sm={2}
                            className={`${classes.textMuted} mt-5`}
                        >
                            Your available modules are shown here.
                        </Grid>
                        <Grid item sm={10}>
                            <div className="ml-15">
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="flex-end"
                                >
                                    <Grid item sm={2}></Grid>
                                    {typeOfUser === 'Admin' && (
                                        <ModuleCard
                                            module={{
                                                name: 'Client Management',
                                                iconId: 'person',
                                                color: '#2C3E93',
                                            }}
                                        />
                                    )}
                                    {modules?.slice(0, 4).map((module) => (
                                        <ModuleCard
                                            module={{
                                                ...module,
                                                color: getShuffledData(
                                                    modulesColorsArr
                                                ),
                                            }}
                                        />
                                    ))}
                                    {!showAll && ToggleShowHide}
                                    {showAll && (
                                        <>
                                            {modules?.slice(4).map((module) => (
                                                <ModuleCard module={module} />
                                            ))}
                                            {ToggleShowHide}
                                        </>
                                    )}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default StatCards2;
