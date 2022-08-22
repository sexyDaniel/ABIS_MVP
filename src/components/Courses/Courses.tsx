import { Card, List, Spin } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_ROUTE } from '../../routes';
import { courceApi } from '../../services/courseService';
import Title from '../Title/Title';

import styles from './Courses.module.scss';

type CourcesProps = {
    className?: string;
};

const Courses: FC<CourcesProps> = () => {
    const { data, isLoading } = courceApi.useGetCoursesQuery();
    return (
        <>
            <Title>Курсы</Title>
            <div className={styles.wrapper}>
                {isLoading && <Spin />}
                {data && (
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Link className={styles.link} to={`${COURSE_ROUTE}/${item.id}`}>
                                    <Card title={item.title}>
                                        <img
                                            src={`data:image/svg+xml;utf8,${encodeURIComponent(item.image)}`}
                                            alt={item.title}
                                        />
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </>
    );
};

export default Courses;
