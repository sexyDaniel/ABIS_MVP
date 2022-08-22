import React, { FC } from 'react';
import Title from '../Title/Title';

import styles from './PageWrapper.module.scss';

type PageWrapperProps = {
    title?: string;
    children: React.ReactNode;
};

const PageWrapper: FC<PageWrapperProps> = ({ title, children }) => {
    return (
        <>
            {title && <Title>{title}</Title>}
            <div className={styles.wrapper}>{children}</div>
        </>
    );
};

export default PageWrapper;
