import React, { FC } from 'react';
import AdminCourse from '../../components/AdminCourse/AdminCourse';
import Title from '../../components/Title/Title';

import styles from './AdminCoursePage.module.scss';

type AdminCoursePageProps = {
    className?: string;
};

const AdminCoursePage: FC<AdminCoursePageProps> = () => {
    return (
        <>
            <Title>Курсы</Title>
            <AdminCourse />
        </>
    );
};

export default AdminCoursePage;
