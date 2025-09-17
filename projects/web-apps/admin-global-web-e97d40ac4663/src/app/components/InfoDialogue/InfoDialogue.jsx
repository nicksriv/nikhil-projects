import React from 'react';
import {
    Drawer, IconButton, Grid, Button
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useSettings from 'app/hooks/useSettings';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    miniCart: {
        width: '350px',
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
    desc: {
        color: '#00000099'
    },
    descHeading: {
        color: '#00000099',
        fontWeight: 'normal !important'
    }
}))

const InfoDialogue = (props) => {
    const {
        container,
        open,
        closeAction,
        description,
        descriptionHeading,
        btnText,
        imgSrc,
        handleInfoBtnClick,
    } = props;
    const classes = useStyles();
    const { settings } = useSettings();
    const handleDrawerToggle = () => {
        closeAction();
    }

    return (
        <ThemeProvider theme={settings.themes[settings.activeTheme]}>
            <Drawer
                width='100px'
                container={container}
                variant="temporary"
                anchor='right'
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Grid className={clsx('flex-column h-full', classes.miniCart)}>
                    <div className="cart__topbar flex justify-between items-center p-1 mb-sm-30 pl-4">
                        <h5 className="my-0 font-medium">Info</h5>
                        <IconButton onClick={closeAction}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Grid className="p-4 flex-column items-center">
                        <img className="ml-5 w-auto"
                            src={`${imgSrc}`}
                            alt={"illustrations"} />
                    </Grid>
                    <Grid className={`p-4 flex-column items-center`}>
                        <h2 className={classes.descHeading}>
                            {descriptionHeading}
                        </h2>
                    </Grid>
                    <Grid className="p-4 flex-column items-center text-center">
                        <p className={`${classes.desc} text-15 opacity-54`}>
                            {description}
                        </p>
                    </Grid>
                    <Grid className="flex-column items-center">
                        <Button className="w-200 border-primary color-primary mt-5 "
                            variant="outlined" onClick={handleInfoBtnClick}>
                            {btnText}
                        </Button>
                    </Grid>
                </Grid>
            </Drawer>
        </ThemeProvider>
    )
}


InfoDialogue.propTypes = {

}

InfoDialogue.defaultProps = {

};

export default InfoDialogue;