import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Icon, Badge, IconButton, Drawer, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useSettings from 'app/hooks/useSettings';
// import useAuth from 'app/hooks/useAuth';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    miniCart: {
        width: 'var(--sidenav-width)',
        '& .cart__topbar': {
            height: 'var(--topbar-height)',
        },
        '& .mini-cart__item': {
            transition: 'background 300ms ease',
            '&:hover': {
                background: 'rgba(0,0,0,0.01)',
            },
        },
    },
    customBadge: {
        backgroundColor: "#F30508",
        width: "0.6rem",
        height: "0.6rem",
        borderRadius: "100px"
    }
}))

// let cartListLoaded = false

function AppSettings({ container }) {
    // const [totalCost, setTotalCost] = useState(0)
    const [panelOpen, setPanelOpen] = useState(false)

    const classes = useStyles()
    // const dispatch = useDispatch()
    const history = useHistory()
    // const { user } = useAuth()
    // const { cartList } = useSelector((state) => state.ecommerce)
    const { settings } = useSettings()

    // if (!cartListLoaded) {
    //     dispatch(getCartList(user.id))
    //     cartListLoaded = true
    // }

    const handleDrawerToggle = () => {
        setPanelOpen(!panelOpen)
    }

    // const handleCheckoutClick = () => {
    //     if (totalCost > 0) {
    //         history.push('/ecommerce/checkout')
    //         setPanelOpen(false)
    //     }
    // }

    // useEffect(() => {
    // let total = 0

    // cartList.forEach((product) => {
    //     total += product.price * product.amount
    // })

    // setTotalCost(total)
    // }, [cartList])

    return (
        <Fragment>
            <IconButton onClick={handleDrawerToggle}>
                <Badge color="secondary" variant="dot" classes={{ badge: classes.customBadge }}
                >
                    <Icon><SettingsOutlinedIcon /></Icon>
                </Badge>
            </IconButton>

            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'right'}
                    open={panelOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <div
                        className={clsx('flex-column h-full', classes.miniCart)}
                    >
                        <div className="cart__topbar elevation-z6 flex items-center p-1 mb-2 pl-4">
                            <Icon color="primary"><SettingsOutlinedIcon /></Icon>
                            <h5 className="ml-2 my-0 font-medium">Settings</h5>
                        </div>

                        <div className="flex-grow overflow-auto">
                        </div>

                        <Button
                            className="w-full border-radius-0"
                            variant="contained"
                            color="primary"
                            // onClick={handleCheckoutClick}
                        >
                            Cancel
                        </Button>
                    </div>
                </Drawer>
            </ThemeProvider>
        </Fragment>
    )
}

export default AppSettings
