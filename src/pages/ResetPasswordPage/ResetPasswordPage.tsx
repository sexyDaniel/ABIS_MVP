import ResetForm from '../../components/ResetForm/ResetForm';
import React, { FC } from 'react';
import { Card } from 'antd';

import styles from './ResetPasswordPage.module.scss';

type ResetPasswordPageProps = {
    className?: string;
};

const ResetPasswordPage: FC<ResetPasswordPageProps> = () => {
    return (
        <div className={styles.formWrapper}>
            <Card title='Войти' bordered={false} className={styles.form}>
                <ResetForm />
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
