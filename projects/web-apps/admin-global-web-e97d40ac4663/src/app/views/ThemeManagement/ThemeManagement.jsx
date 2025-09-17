import { Grid } from '@material-ui/core';
import { V5GlobalHeaderActionList } from 'app/components';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ColorSelector from './components/ColorSelector';
import ScreenView from './components/ScreenView';

function ThemeManagement() {

    const dispatch = useDispatch();
    const { clientIdForUserLogo } = useSelector((state) => state.users);

    useEffect(() => {

        dispatch({
            type: "getThemeConfigurationAction",
            clientId: clientIdForUserLogo
        })

    }, [])
    return <div>
        <V5GlobalHeaderActionList title={'Theme Configuration'} />
        <Grid container spacing={2} className="mt-5 p-5">
            <Grid item lg={5} md={12}>
                <ColorSelector />
            </Grid>
            <Grid item lg={7} md={12}>
                <ScreenView />
            </Grid>
        </Grid>
    </div>;
}

export default ThemeManagement;
