import React from 'react';

export const REGISTRATION_ROUTE = '/registration';
export const LOGIN_ROUTE = '/login';
export const RESET_ROUTE = '/reset';

export const PROFILE_ROUTE = '/profile';

export const DASHBOARD_ROUTE = '/dashboard';
export const COMPANY_ROUTE = '/company';
export const ADMINS_ROUTE = '/admins';
export const USERS_ROUTE = '/users';

export const ADMIN_COURSE_ROUTE = '/admin/courses';
export const EDIT_COURSE_ROUTE = '/admin/course';
export const EDIT_UNIT_ROUTE = '/admin/unit';

export const COURSES_ROUTE = '/courses';
export const COURSE_ROUTE = '/course';

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
            Component: React.lazy(() => import('./pages/ProfilePage/ProfilePage')),
        },
        {
            path: COURSES_ROUTE,
            Component: React.lazy(() => import('./components/Courses/Courses')),
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const adminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: React.lazy(() => import('./pages/ProfilePage/ProfilePage')),
        },
        {
            path: DASHBOARD_ROUTE,
            Component: React.lazy(() => import('./pages/DashboardPage/DashboardPage')),
        },
        {
            path: COMPANY_ROUTE,
            Component: React.lazy(() => import('./pages/CompanyPage/CompanyPage')),
        },
        {
            path: USERS_ROUTE,
            Component: React.lazy(() => import('./pages/UsersPage/UsersPage')),
        },
        {
            path: ADMINS_ROUTE,
            Component: React.lazy(() => import('./components/Admins/Admins')),
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const superAdminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: React.lazy(() => import('./pages/ProfilePage/ProfilePage')),
        },
        {
            path: ADMIN_COURSE_ROUTE,
            Component: React.lazy(() => import('./pages/AdminCoursePage/AdminCoursePage')),
        },
        {
            path: `${EDIT_COURSE_ROUTE}/:id`,
            Component: React.lazy(() => import('./components/EditCourse/EditCourse')),
        },
        {
            path: `${EDIT_UNIT_ROUTE}/:type/:id`,
            Component: React.lazy(() => import('./components/EditUnit/EditUnit')),
        },
    ],
    defaultPath: PROFILE_ROUTE,
};

export const publicRoutes: Routes = {
    routes: [
        {
            path: REGISTRATION_ROUTE,
            Component: React.lazy(() => import('./pages/RegistrationPage/RegistrationPage')),
        },
        {
            path: LOGIN_ROUTE,
            Component: React.lazy(() => import('./pages/LoginPage/LoginPage')),
        },
        {
            path: RESET_ROUTE,
            Component: React.lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage')),
        },
    ],
    defaultPath: LOGIN_ROUTE,
};
