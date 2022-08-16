import LoginForm from '../../components/LoginForm/LoginForm';
import React, { FC } from 'react';
import { Card } from 'antd';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
    return (
        <div className={styles.formWrapper}>
            <Card title='Войти' bordered={false} className={styles.form}>
                <LoginForm />
            </Card>
        </div>
    );
};

export default LoginPage;
