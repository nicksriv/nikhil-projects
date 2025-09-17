import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
//import useSettings from 'app/hooks/useSettings';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    brand: {
        padding: '26px 18px 20px 14px',
        color: "black",
        display: "flex",
        alignItems: "center"
    },
    hideOnCompact: {
        display: 'none',
    },
    logoMain: {
        objectFit: "contain",
        width: "110px",
        marginLeft: "2.5rem"
    },
}))

const Brand = ({ children }) => {
    const classes = useStyles()
    // const { settings } = useSettings()
    // const leftSidebar = settings.layout1Settings.leftSidebar
    // const { mode } = leftSidebar

    return (
        <div
            className={clsx('flex',  classes.brand)}
        >
            <div className="flex items-center">
                {/* <V5GlobalLogo /> */}
                <span
                    className={clsx({
                        'text-18 ml-2 font-medium sidenavHoverShow': true,
                        // [classes.hideOnCompact]: mode === 'compact',
                    })}
                >
                    {/* V5Global */}
                </span>
            </div>
            <div
                className={clsx({
                    sidenavHoverShow: true,
                    // [classes.hideOnCompact]: mode === 'compact',
                })}
            >
                {children || null}
                
            </div>
            <div className="w-220">
                <img className={classes.logoMain} src="/assets/images/V5Globallogo.png" alt={"Logo"} />
            </div>
        </div>
    )
}

export default Brand
