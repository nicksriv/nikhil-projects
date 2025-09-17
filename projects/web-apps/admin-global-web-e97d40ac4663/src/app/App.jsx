import '../fake-db';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import history from 'helper/history.js';
import routes from './RootRoutes';
import { Store } from './redux/store';
import {
    GlobalCss,
    V5GlobalSuspense,
    V5GlobalTheme,
    V5GlobalLayout,
} from 'app/components';
import sessionRoutes from './views/sessions/SessionRoutes';
import AuthGuard from './auth/AuthGuard';
import { AuthProvider } from 'app/contexts/JWTAuthContext';
import { SettingsProvider } from 'app/contexts/SettingsContext';
import { SnackbarProvider } from 'notistack';
import { SuccessSnackbar, ErrorSnackbar } from './components/V5GlobalSnackbar/V5GlobalSnackbar';

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SuccessSnackbar />
                <ErrorSnackbar />
                <SnackbarProvider>
                    <SettingsProvider>
                        <V5GlobalTheme>
                            <GlobalCss />
                            <BrowserRouter basename={process.env.PUBLIC_URL}>
                                <Router history={history}>
                                    <AuthProvider>
                                        <V5GlobalSuspense>
                                            <Switch>
                                                {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                                {sessionRoutes.map((item, i) => (
                                                    <Route
                                                        key={i}
                                                        path={item.path}
                                                        component={item.component}
                                                        name="Nihal"
                                                    />
                                                ))}
                                                {/* AUTH PROTECTED DASHBOARD PAGES */}
                                                <AuthGuard>
                                                    <V5GlobalLayout />{' '}
                                                    {/* RETURNS <Layout1/> component */}
                                                </AuthGuard>
                                            </Switch>
                                        </V5GlobalSuspense>
                                    </AuthProvider>
                                </Router>
                            </BrowserRouter>
                        </V5GlobalTheme>
                    </SettingsProvider>
                </SnackbarProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
