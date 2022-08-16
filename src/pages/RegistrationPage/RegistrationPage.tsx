import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import React, { FC } from 'react';
import { Card } from 'antd';

import styles from './RegistrationPage.module.scss';

const RegistrationPage: FC = () => {
    return (
        <div className={styles.formWrapper}>
            <Card title='Регистрация' bordered={false} className={styles.form}>
                <RegistrationForm />
            </Card>
        </div>
    );
};

export default RegistrationPage;
