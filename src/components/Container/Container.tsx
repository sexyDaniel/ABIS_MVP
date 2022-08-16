import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

import styles from './Container.module.scss';

type ContainerProps = {
    className?: string;
};

const Container: FC<PropsWithChildren<ContainerProps>> = ({ className, children }) => {
    const classes = classNames(className, styles.container);

    return <div className={classes}>{children}</div>;
};

export default Container;
