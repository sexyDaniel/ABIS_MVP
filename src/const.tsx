import { DashboardOutlined, TeamOutlined, SolutionOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React from 'react';
import {
    ADMINS_ROUTE,
    ADMIN_COURSE_ROUTE,
    COMPANY_ROUTE,
    COURSES_ROUTE,
    DASHBOARD_ROUTE,
    MY_COURSES_ROUTE,
    USERS_ROUTE,
} from './routes';

export type NavItem = {
    path: string;
    label: string;
    Icon: React.FC<any>;
};

export const AdminLinks: NavItem[] = [
    {
        path: DASHBOARD_ROUTE,
        label: 'Контрольная панель',
        Icon: DashboardOutlined,
    },
    {
        path: COMPANY_ROUTE,
        label: 'Компания',
        Icon: SolutionOutlined,
    },
    {
        path: USERS_ROUTE,
        label: 'Пользователи',
        Icon: TeamOutlined,
    },
    {
        path: ADMINS_ROUTE,
        label: 'Администраторы',
        Icon: TeamOutlined,
    },
];

export const SuperAdminLinks: NavItem[] = [
    {
        path: ADMIN_COURSE_ROUTE,
        label: 'Курсы',
        Icon: PlusSquareOutlined,
    },
];

export const UserLinks: NavItem[] = [
    {
        path: COURSES_ROUTE,
        label: 'Курсы',
        Icon: PlusSquareOutlined,
    },
    {
        path: MY_COURSES_ROUTE,
        label: 'Мои курсы',
        Icon: PlusSquareOutlined,
    },
];
