import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import TouchRipple from '@material-ui/core/ButtonBase'
import V5GlobalVerticalNavExpansionPanel from './V5GlobalVerticalNavExpansionPanel'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    navItem: {
        transition: 'all 150ms ease-in',
        borderLeft: '5px solid transparent',
        color: 'black',
        textTransform: 'capitalize',
        opacity: 0.48,
        margin: '0.6rem 0',
        // '&:hover': {
        //     backgroundColor: palette.action.hover,
        // },
    },
    navItemActive: {
        // backgroundColor: palette.action.selected,
        // backgroundColor: 'rgba(0, 0, 0)',
        background: '#F1E3D5',
        padding: '1rem 0',
        color: 'black',
        opacity: 1,
        borderRadius: '0px 4px 4px 0px',
    },
    compactNavItem: {
        overflow: 'hidden',
        justifyContent: 'center !important',
        '& $itemText': {
            display: 'none',
        },
        '& $itemIcon': {
            display: 'none',
        },
    },
    itemIcon: {},
    itemText: {
        fontSize: '0.875rem',
        paddingLeft: '0.8rem',
    },
    label: {
        color: palette.text.secondary,
    },
    bulletIcon: {
        // background: palette.text.secondary,
    },
    h50: {
        height: '50px',
    },
}))

const V5GlobalVerticalNav = ({ items }) => {
    console.log(items)
    const { settings } = useSettings()
    const { mode } = settings.layout1Settings.leftSidebar
    const classes = useStyles()
    
    const renderLevels = (data) => {
        return data.map((item, index) => {
            
            if (item.type === 'label')
                return (
                    <p
                        key={index}
                        className={clsx({
                            'px-5 py-1 mt-6 uppercase text-12 sidenavHoverShow': true,
                            [classes.label]: true,
                            hidden: mode === 'compact',
                        })}
                    >
                        {item.label}
                    </p>
                )
            if (item.children) {
                
                return (
                    <V5GlobalVerticalNavExpansionPanel
                        mode={mode}
                        item={item}
                        key={index}
                    >
                        {renderLevels(item.children)}
                    </V5GlobalVerticalNavExpansionPanel>
                )
            } else if (item.type === 'extLink') {
                
                return (
                    <a
                        key={index}
                        href={item.path}
                        className={clsx({
                            'flex justify-between compactNavItem whitespace-pre overflow-hidden': true,
                            [classes.navItem]: true,
                            [classes.compactNavItem]: mode === 'compact',
                            [classes.h50]: true,
                        })}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <TouchRipple
                            key={item.name}
                            name="child"
                            className="w-full"
                        >
                            {(() => {
                                if (item.icon) {
                                    return (
                                        <Icon className="material-icons-two-tone text-18 align-middle px-4">
                                            {item.icon}
                                        </Icon>
                                    )
                                } else {
                                    return (
                                        <span className="item-icon icon-text">
                                            {item.iconText}
                                        </span>
                                    )
                                }
                            })()}
                            <span
                                className={clsx(
                                    'align-middle sidenavHoverShow',
                                    classes.itemText
                                )}
                            >
                                {item.name}
                            </span>
                            <div className="mx-auto"></div>
                            {item.badge && (
                                <div
                                    className={`rounded bg-${item.badge.color} px-1 py-1px`}
                                >
                                    {item.badge.value}
                                </div>
                            )}
                        </TouchRipple>
                    </a>
                )
            } else {
                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        isActive={(match, location) => {
                            let navPath = item.path.substring(
                                1,
                                item.path.indexOf('-')
                            )
                            let locationPath = location.pathname.split('/')
                            if (
                                navPath === locationPath[1] ||
                                item.path === location.pathname
                            ) {
                                return true
                            }
                        }}
                        activeClassName={classes.navItemActive}
                        className={clsx({
                            'flex justify-between compactNavItem whitespace-pre overflow-hidden': true,
                            [classes.navItem]: true,
                            [classes.h50]: true,
                            [classes.compactNavItem]: mode === 'compact',
                        })}
                    >
                        <TouchRipple
                            key={item.name}
                            name="child"
                            className="w-full"
                            disableRipple={true}
                        >
                            {item && item.icon ? (
                                item.icon === 'person' ? (
                                    <Icon className="text-18 align-middle w-36 px-5 material-icons-two-tone">
                                        <img
                                            src={`/assets/images/icons/Icon_Client Management.svg`} alt='logo'
                                        />
                                    </Icon>
                                ) : (
                                    <Icon className="text-18 align-middle w-36 px-5 material-icons-two-tone">
                                        {item.icon}
                                    </Icon>
                                )
                            ) : (
                                <Fragment>
                                    <div
                                        className={clsx({
                                            'nav-bullet p-2px rounded ml-6 mr-2': true,
                                            [classes.bulletIcon]: true,
                                            hidden: mode === 'compact',
                                        })}
                                    ></div>
                                    <div
                                        className={clsx({
                                            'nav-bullet-text ml-5 text-11': true,
                                            hidden: mode !== 'compact',
                                        })}
                                    >
                                        {item.iconText}
                                    </div>
                                </Fragment>
                            )}
                            <span
                                className={clsx(
                                    'align-middle sidenavHoverShow',
                                    classes.itemText
                                )}
                            >
                                {item.name}
                            </span>
                            <div className="mx-auto"></div>
                            {item.badge && (
                                <div
                                    className={clsx(
                                        `rounded bg-${item.badge.color} px-1 py-1px`,
                                        'sidenavHoverShow',
                                        classes.itemIcon
                                    )}
                                >
                                    {item.badge.value}
                                </div>
                            )}
                        </TouchRipple>
                    </NavLink>
                )
            }
        })
    }

    return <div className="navigation">{renderLevels(items)}</div>
}

export default React.memo(V5GlobalVerticalNav)
