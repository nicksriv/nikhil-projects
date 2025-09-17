import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import Menu from '@material-ui/core/Menu'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import useSettings from 'app/hooks/useSettings'
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 125,
        // marginLeft: 4,
        overflow: 'inherit',
        boxShadow:
            '0 0 2px 0 rgb(145 158 171 / 24%), 0 7px 2px -11px rgb(145 158 171 / 24%)',
        border: `solid 1px ${theme.palette.grey[500_8]}`,
    },
    wrapper: {
        marginTop: '-8px !important',
        marginBottom: '-8px !important',
    },
    root: {
        backgroundColor: 'yellow !important',
    },
}))

// ----------------------------------------------------------------------

ActionsPopup.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.number,
    className: PropTypes.string,
}

function ActionsPopup({
    children,
    width,
    className,
    anchorEl,
    onClose,
    ...other
}) {
    const classes = useStyles()
    const { settings } = useSettings()

    return (
        <Fragment>
            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Menu
                    getContentAnchorEl={null}
                    anchorEl={anchorEl}
                    hideBackdrop={true}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    classes={{
                        root: classes.root,
                        paper: classes.paper,
                    }}
                    onClose={onClose}
                    {...other}
                >
                    <div className={classes.wrapper}>{children}</div>
                </Menu>
            </ThemeProvider>
        </Fragment>
    )
}

export default ActionsPopup
