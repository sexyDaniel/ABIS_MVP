import { courceApi } from '../../services/courseService';
import { Button, List, message, Space, Spin, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EDIT_COURSE_ROUTE } from '../../routes';
import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

import styles from './AdminCourse.module.scss';

type AdminCourseProps = {
    className?: string;
};

const AdminCourse: FC<AdminCourseProps> = () => {
    const navigate = useNavigate();
    const { data, isLoading } = courceApi.useGetAdminCoursesQuery();
    const [changeStatus, { isLoading: changeStatusIsLoading }] = courceApi.useChangeStatusCourseMutation();

    const onChangeStatus = (id: number) => () =>
        changeStatus(id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography className={styles.title}>
                    Вы можете управлять курсами: добавлять, изменять и удалять их.
                </Typography>
                <Button onClick={() => navigate(EDIT_COURSE_ROUTE + '/create')}>Добавить курс</Button>
            </div>

            {!data && isLoading && <Spin />}
            {!isLoading &&
                data &&
                (data?.length === 0 ? (
                    <Typography>Добавьте первый курс</Typography>
                ) : (
                    <List
                        size='small'
                        bordered
                        dataSource={data}
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
                                <div className={styles.actions}>
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
                ))}
        </div>
    );
};

export default AdminCourse;
