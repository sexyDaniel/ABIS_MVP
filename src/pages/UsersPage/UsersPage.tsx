import { Typography } from 'antd';
import React, { FC } from 'react';
import Container from '../../components/Container/Container';
import Users from '../../components/Users/Users';

import styles from './UsersPage.module.scss';

const UsersPage: FC = () => {
    return (
        <Container>
            <Typography className={styles.title}>Пользователи</Typography>
            <Users />
        </Container>
    );
};

export default UsersPage;
