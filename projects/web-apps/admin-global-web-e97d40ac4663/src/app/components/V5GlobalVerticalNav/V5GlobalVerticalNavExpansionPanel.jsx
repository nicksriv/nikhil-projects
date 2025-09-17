import React, { useState, useRef, useCallback } from 'react';
import { Icon } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    expandIcon: {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(90deg)',
    },
    collapseIcon: {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(0deg)',
    },
    'expansion-panel': {
        overflow: 'hidden',
        transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    },
    highlight: {
        background: palette.primary.main,
    },
    navItem: {
        // color: palette.type === "dark" ? palette.text.secondary : "inherit",
        color: 'grey',
        opacity: 0.48,
        '&:hover': {
            backgroundColor: palette.action.hover,
        },
    },
    activeColor: {
        opacity: 1,
        background: '#F1E3D5',
        color: 'black',
    },
    compactNavItem: {
        width: 44,
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
    bulletIcon: {
        //  background: palette.text.secondary,
    },
    h50: {
        height: '50px',
    },
    submenu: {
        paddingLeft: '25px',
    },
}))

const V5GlobalVerticalNavExpansionPanel = ({ item, children, mode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const classes = useStyles();
    const elementRef = useRef(null);
    const componentHeight = useRef(0);
    const { pathname } = useLocation();
    const { name, icon, iconText, badge } = item

    const handleClick = () => {
        componentHeight.current = 0
        calcaulateHeight(elementRef.current);
        setCollapsed(!collapsed);
    }

    const calcaulateHeight = useCallback((node) => {
        if (node.name !== 'child') {
            for (let child of node.children) {
                calcaulateHeight(child);
            }
        }

        if (node.name === 'child') componentHeight.current += node.scrollHeight
        else componentHeight.current += 44 //here 44 is node height
        return
    }, []);

    useEffect(() => {
        if (!elementRef) return

        calcaulateHeight(elementRef.current);

        // OPEN DROPDOWN IF CHILD IS ACTIVE
        for (let child of elementRef.current.children) {
            if (child.getAttribute('href') === pathname) {
                setCollapsed(false);
            }
        }
    }, [pathname, calcaulateHeight]);

    return (
        <div>
            <TouchRipple
                className={clsx({
                    'flex justify-between mb-2 w-full pr-4 has-submenu compactNavItem whitespace-pre overflow-hidden': true,
                    [classes.navItem]: true,
                    [classes.label]: true,
                    [classes.compactNavItem]: mode === 'compact',
                    open: !collapsed,

                    [classes.h50]: true,
                    [classes.activeColor]: collapsed,
                })}
                onClick={handleClick}
            >
                <div className="flex items-center">
                    {icon && (
                        <Icon className="align-middle text-18 w-36 px-6">
                            {icon}
                        </Icon>
                    )}
                    {iconText && (
                        <div
                            className={clsx(
                                'w-4 h-4 rounded bg-white ml-5 mr-2',
                                classes.bulletIcon
                            )}
                        ></div>
                    )}
                    <span
                        className={clsx(
                            'align-middle sidenavHoverShow',
                            classes.itemText
                        )}
                    >
                        {name}
                    </span>
                </div>
                {badge && (
                    <div
                        className={clsx(
                            `rounded bg-${item.badge.color} px-1 py-1px`,
                            'sidenavHoverShow',
                            classes.itemIcon
                        )}
                    >
                        {badge.value}
                    </div>
                )}
                <div
                    className={clsx({
                        'item-arrow sidenavHoverShow': true,
                        [classes.itemIcon]: true,
                        [classes.collapseIcon]: !collapsed,
                        [classes.expandIcon]: collapsed,
                    })}
                >
                    <Icon fontSize="small" className="align-middle">
                        chevron_right
                    </Icon>
                </div>
            </TouchRipple>

            <div
                ref={elementRef}
                className={clsx(
                    classes['expansion-panel'],
                    classes['submenu'],
                    'submenu'
                )}
                style={
                    !collapsed
                        ? { maxHeight: '0px' }
                        : { maxHeight: componentHeight.current + 'px' }
                }
            >
                {children}
            </div>
        </div>
    )
}

export default V5GlobalVerticalNavExpansionPanel
