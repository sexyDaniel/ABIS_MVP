import { Card } from 'antd';
import React, { FC } from 'react';

import styles from './FormPageWrapper.module.scss';

type FormPageWrapperProps = {
    title?: string;
    children: React.ReactNode;
};

const FormPageWrapper: FC<FormPageWrapperProps> = ({ title, children }) => {
    return (
        <div className={styles.formWrapper}>
            <Card title={title} bordered={false} className={styles.form}>
                {children}
            </Card>
        </div>
    );
};

export default FormPageWrapper;
