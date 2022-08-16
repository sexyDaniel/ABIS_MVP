import React, { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';

import styles from './Layout.module.scss';

type LayoutProps = {
    className?: string;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
    return (
        <div className={styles.page}>
            <Header />
            {children}
        </div>
    );
};

export default Layout;
