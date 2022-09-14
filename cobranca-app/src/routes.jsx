import React from 'react';
import { BrowserRouter, Route, Routes as Switch, Outlet, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { getItem } from './utils/storage';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from './themes/Light';
import { DrawerProvider } from './contexts/DrawerContext';
import DashboardHome from './pages/MyDashboard/DashboardHome';
import DashboardClient from './pages/MyDashboard/DashboardClient';
import DashboardClientDetails from './pages/MyDashboard/DashboardClientDetails';
import DashboardCharge from './pages/MyDashboard/DashboardCharge';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function Routes() {
    return (
        <ThemeProvider theme={LightTheme}>
            <DrawerProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path='/'>
                            <Route path='/' element={<SignIn />} />
                            <Route path='/signin' element={<SignIn />} />
                        </Route>
                        <Route path='/signup' element={<SignUp />} />
                        <Route element={<ProtectedRoutes redirectTo={'/signin'} />}>
                            <Route path='/home' element={<DashboardHome />} />
                            <Route path='/clientes' element={<DashboardClient />} />
                            <Route path='/clientes/detalhes' element={<DashboardClientDetails />} />
                            <Route path='/cobrancas' element={<DashboardCharge />} />
                        </Route>
                        <Route path='*' element={<SignIn />} />
                    </Switch>
                </BrowserRouter>
            </DrawerProvider>
        </ThemeProvider>
    )
}