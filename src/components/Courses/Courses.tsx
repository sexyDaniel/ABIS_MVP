import { courceApi } from '../../services/courseService';
import { COURSE_ROUTE } from '../../routes';
import { Card, List, Spin } from 'antd';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';

import styles from './Courses.module.scss';

const Courses: FC = () => {
    const { data, isLoading } = courceApi.useGetCoursesQuery();
    return (
        <>
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
        </>
    );
};

export default Courses;
