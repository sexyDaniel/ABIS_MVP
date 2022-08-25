import { Button, List, message, Popconfirm, Space, Spin, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { courseApi } from '../../services/courseService';
import { EDIT_COURSE_ROUTE } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/Course';
import React, { FC, useState } from 'react';

import styles from './AdminCourse.module.scss';

const AdminCourses: FC = () => {
    const navigate = useNavigate();
    const { data: courses, isLoading: coursesIsLoading } = courseApi.useGetAdminCoursesQuery();

    return (
        <>
            <div className={styles.header}>
                <Typography>Вы можете управлять курсами: добавлять, изменять и удалять их.</Typography>
                <Button onClick={() => navigate(EDIT_COURSE_ROUTE + '/create')}>Добавить курс</Button>
            </div>

            {coursesIsLoading && <Spin />}
            {courses && (
                <List
                    bordered
                    dataSource={courses}
                    renderItem={(item) => (
                        <List.Item>
                            <AdminCourse course={item} />
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

const AdminCourse: FC<{ course: Course }> = ({ course }) => {
    const navigate = useNavigate();
    const [changeStatus, { isLoading: changeStatusIsLoading }] = courseApi.useChangeStatusCourseMutation();
    const [deleteCourse, { isLoading: deleteIsLoading }] = courseApi.useDeleteCourseMutation();

    const [visible, setVisible] = useState(false);
    const showPopconfirm = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const onChangeStatusClick = () =>
        changeStatus(course.id!)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    const onEditClick = () => navigate(`${EDIT_COURSE_ROUTE}/${course.id}`);

    const onDeleteClick = () =>
        deleteCourse(course.id!)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <>
            <Space size={20}>
                <div className={styles.img}>
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(course.image)}`} alt={course.title} />
                </div>
                <Typography>{course.title}</Typography>
            </Space>
            <div>
                <Button onClick={onChangeStatusClick} loading={changeStatusIsLoading}>
                    {course.courseStatus === 'Publish' ? 'Скрыть' : 'Опубликовать'}
                </Button>
                <Button onClick={onEditClick}>
                    <EditOutlined />
                </Button>
                <Popconfirm
                    title='Вы точно хотите удалить профиль?'
                    visible={visible}
                    okText='Да'
                    cancelText='Нет'
                    placement='topRight'
                    onConfirm={onDeleteClick}
                    okButtonProps={{ loading: deleteIsLoading }}
                    onCancel={handleCancel}>
                    <Button onClick={showPopconfirm}>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </div>
        </>
    );
};

export default AdminCourses;
