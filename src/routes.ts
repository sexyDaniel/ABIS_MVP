import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import UsersPage from './pages/UsersPage/UsersPage';
import React from 'react';

export const REGISTRATION_ROUTE = '/registration';
export const DASHBOARD_ROUTE = '/dashboard';
export const PROFILE_ROUTE = '/profile';
export const USERS_ROUTE = '/users';
export const LOGIN_ROUTE = '/login';

type Route = {
    path: string;
    Component: React.FC;
};

type Routes = {
    routes: Route[];
    defaultPath: string;
};

export const userRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: ProfilePage,
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const adminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: ProfilePage,
        },
        {
            path: DASHBOARD_ROUTE,
            Component: DashboardPage,
        },
        {
            path: USERS_ROUTE,
            Component: UsersPage,
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const superAdminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: ProfilePage,
        },
    ],
    defaultPath: PROFILE_ROUTE,
};

export const publicRoutes: Routes = {
    routes: [
        {
            path: REGISTRATION_ROUTE,
            Component: RegistrationPage,
        },
        {
            path: LOGIN_ROUTE,
            Component: LoginPage,
        },
    ],
    defaultPath: LOGIN_ROUTE,
};
