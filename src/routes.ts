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
export const MY_COURSES_ROUTE = '/my-courses';
export const COURSE_ROUTE = '/course';

type Route = {
    path: string;
    Component: React.FC;
    title?: string;
};

type Routes = {
    routes: Route[];
    defaultPath: string;
};

export const userRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: React.lazy(() => import('./components/Profile/Profile')),
            title: 'Профиль',
        },
        {
            path: COURSES_ROUTE,
            Component: React.lazy(() => import('./components/Courses/Courses')),
            title: 'Курсы',
        },
        {
            path: `${COURSE_ROUTE}/:id`,
            Component: React.lazy(() => import('./components/Course/Course')),
        },
        {
            path: `${MY_COURSES_ROUTE}`,
            Component: React.lazy(() => import('./components/MyCourses/MyCourses')),
            title: 'Мои курсы',
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const adminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: React.lazy(() => import('./components/Profile/Profile')),
            title: 'Профиль',
        },
        {
            path: DASHBOARD_ROUTE,
            Component: React.lazy(() => import('./components/Dashboard/Dashboard')),
            title: 'Контрольная панель',
        },
        {
            path: COMPANY_ROUTE,
            Component: React.lazy(() => import('./components/Company/Company')),
            title: 'Компании',
        },
        {
            path: USERS_ROUTE,
            Component: React.lazy(() => import('./components/Users/Users')),
            title: 'Пользователи',
        },
        {
            path: ADMINS_ROUTE,
            Component: React.lazy(() => import('./components/Admins/Admins')),
            title: 'Администраторы',
        },
    ],
    defaultPath: PROFILE_ROUTE,
};
export const superAdminRoutes: Routes = {
    routes: [
        {
            path: PROFILE_ROUTE,
            Component: React.lazy(() => import('./components/Profile/Profile')),
            title: 'Профиль',
        },
        {
            path: ADMIN_COURSE_ROUTE,
            Component: React.lazy(() => import('./components/AdminCourse/AdminCourse')),
            title: 'Курсы',
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
            Component: React.lazy(() => import('./components/RegistrationForm/RegistrationForm')),
            title: 'Регистрация',
        },
        {
            path: LOGIN_ROUTE,
            Component: React.lazy(() => import('./components/LoginForm/LoginForm')),
            title: 'Вход',
        },
        {
            path: RESET_ROUTE,
            Component: React.lazy(() => import('./components/ResetForm/ResetForm')),
            title: 'Установка пароля',
        },
    ],
    defaultPath: LOGIN_ROUTE,
};
