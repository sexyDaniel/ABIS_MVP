import { DASHBOARD_ROUTE, USERS_ROUTE } from '../../routes';
import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';
import { Space } from 'antd';

import styles from './AdminNavBar.module.scss';
import Container from '../Container/Container';

type AdminNavBarProps = {
    className?: string;
};

const AdminNavBar: FC<AdminNavBarProps> = () => {
    return (
        <nav className={styles.nav}>
            <Container>
                <ul className={styles.list}>
                    <li>
                        <NavLink className={styles.item} to={DASHBOARD_ROUTE}>
                            Контрольная панель
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.item} to={USERS_ROUTE}>
                            Пользователи
                        </NavLink>
                    </li>
                </ul>
            </Container>
        </nav>
    );
};

export default AdminNavBar;
