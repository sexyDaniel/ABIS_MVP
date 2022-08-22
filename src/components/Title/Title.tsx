import { Typography } from 'antd';
import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

import styles from './Title.module.scss';

type TitleProps = {
    className?: string;
};

const Title: FC<PropsWithChildren<TitleProps>> = ({ className, children }) => {
    const classes = classNames(className, styles.title);

    return <Typography className={classes}>{children}</Typography>;
};

export default Title;
