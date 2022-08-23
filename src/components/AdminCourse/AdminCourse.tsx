import { Button, List, message, Space, Spin, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { courseApi } from '../../services/courseService';
import { EDIT_COURSE_ROUTE } from '../../routes';
import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

import styles from './AdminCourse.module.scss';

const AdminCourse: FC = () => {
    const navigate = useNavigate();
    const { data: courses, isLoading: coursesIsLoading } = courseApi.useGetAdminCoursesQuery();
    const [changeStatus, { isLoading: changeStatusIsLoading }] = courseApi.useChangeStatusCourseMutation();

    const onChangeStatus = (id: number) => () =>
        changeStatus(id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <>
            <div className={styles.header}>
                <Typography>Вы можете управлять курсами: добавлять, изменять и удалять их.</Typography>
                <Button onClick={() => navigate(EDIT_COURSE_ROUTE + '/create')}>Добавить курс</Button>
            </div>

            {coursesIsLoading && <Spin />}
            {courses && (
                <List
                    size='small'
                    bordered
                    dataSource={courses}
                    renderItem={(item) => (
                        <List.Item className={styles.company}>
                            <Space size={20}>
                                <div className={styles.img}>
                                    <img
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(item.image)}`}
                                        alt={item.title}
                                    />
                                </div>

                                <Typography>{item.title}</Typography>
                            </Space>
                            <div>
                                <Button onClick={onChangeStatus(item.id!)} loading={changeStatusIsLoading}>
                                    {item.courseStatus === 'Publish' ? 'Скрыть' : 'Опубликовать'}
                                </Button>
                                <Button onClick={() => navigate(EDIT_COURSE_ROUTE + '/' + item.id)}>
                                    <EditOutlined />
                                </Button>
                                <Button disabled>
                                    <DeleteOutlined />
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default AdminCourse;
