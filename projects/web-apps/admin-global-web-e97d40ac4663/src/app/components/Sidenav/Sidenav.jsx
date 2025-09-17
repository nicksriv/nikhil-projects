import React, { Fragment, useEffect } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { navigations } from 'app/navigations';
import { V5GlobalVerticalNav } from 'app/components';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useSettings from 'app/hooks/useSettings';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    scrollable: {
        // paddingLeft: 20,
        // paddingRight: 20,
    },
    sidenavMobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.54)',
        zIndex: -1,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}))

const Sidenav = ({ children }) => {
    const classes = useStyles()
    const { settings, updateSettings } = useSettings();
    const dispatch = useDispatch();
    const { userNavigations } = useSelector((state) => state.auth);
    console.log(userNavigations)
    const { clientIdForUserLogo } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch({
            type: "setNavigationByUserAction",
            payload: { navigations, isClientSelected: clientIdForUserLogo ? true: false }
        })
    }, [clientIdForUserLogo]);

    useEffect(() => {
        dispatch({
            type: "setNavigationByUserAction",
            payload: { navigations, isClientSelected: clientIdForUserLogo ? true: false }
        })
    }, []);

    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }
    return (
        <Fragment>
            <Scrollbar
                options={{ suppressScrollX: true }}
                className={clsx('relative', classes.scrollable)}
            >
                {children}
                <V5GlobalVerticalNav items={userNavigations} />
            </Scrollbar>

            <div
                onClick={() => updateSidebarMode({ mode: 'close' })}
                className={classes.sidenavMobileOverlay}
            />
        </Fragment>
    )
}

export default Sidenav
