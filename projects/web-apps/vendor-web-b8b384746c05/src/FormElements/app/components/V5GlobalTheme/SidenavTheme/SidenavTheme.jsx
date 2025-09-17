import React from 'react'
import useSettings from 'src/FormElements/app/hooks/useSettings'
import { ThemeProvider, useTheme } from '@mui/material'

const SidenavTheme = ({ children }) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const sidenavTheme =
        settings.themes[settings.layout1Settings.leftSidebar.theme] || theme

    return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>
}

export default SidenavTheme
