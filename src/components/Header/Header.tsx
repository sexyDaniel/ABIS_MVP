import { DownOutlined, SafetyOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearToken } from '../../store/reducers/TokenSlice';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React, { FC } from 'react';
import { Dropdown } from 'antd';

import styles from './Header.module.scss';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({ className }) => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const logout = () => dispatch(clearToken());

    const classes = classNames(className, styles.header);

    return (
        <header className={classes}>
            <Container className={styles.container}>
                <div className={styles.logo}>
                    <SafetyOutlined />
                    АК Барс ИБ
                </div>
                {user && (
                    <Dropdown
                        overlay={
                            <div className={styles.menu}>
                                <ul>
                                    <li>
                                        <Link to='/' className={styles.link}>
                                            <ProfileOutlined />В профиль
                                        </Link>
                                    </li>
                                    <li>
                                        <button className={styles.btn} onClick={logout}>
                                            <LogoutOutlined />
                                            Выход
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                        trigger={['click']}>
                        <div className={styles.dropdown}>
                            {user.lastName} {user.firstName}
                            <DownOutlined />
                        </div>
                    </Dropdown>
                )}
            </Container>
        </header>
    );
};

export default Header;
