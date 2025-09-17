import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Icon } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

function TabPanel(props) {
    const { children, value, index,containerStyle, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

export default function MTab(props) {
    const { tab, getCurrentTab,containerStyle} = props
    const { settings } = useSettings()

    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const primaryColor = settings.layout1Settings.main.primaryColor

    const handleChange = (event, index) => {
        getCurrentTab(index)
        setValue(index)
    }

    return (
        <div className={classes.root} style={containerStyle}>
            <AppBar position="static" color="transparent">
                <Tabs
                    // scrollable
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    // indicatorColor="secondary"
                    TabIndicatorProps={{
                        style: {
                          backgroundColor:primaryColor
                        }
                      }}
                >
                    {tab.length
                        ? tab.map((t, i) => {
                              return (
                                  <Tab
                                      label={t.name}
                                      icon={
                                          t.icon ? (
                                              <Icon>{t.icon}</Icon>
                                          ) : (
                                              <Icon>{'all_out'}</Icon>
                                          )
                                      }
                                  />
                              )
                          })
                        : null}
                </Tabs>
            </AppBar>
            {/* {value === 1 ? 'value is one ' : 'value is not one'} */}
        </div>
    )
}
