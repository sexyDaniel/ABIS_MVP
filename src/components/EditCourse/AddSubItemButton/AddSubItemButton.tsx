import React, { FC, useEffect, useState } from 'react';
import { courceApi } from '../../../services/courseService';
import SubItemForm from '../SubItemForm/SubItemForm';
import { Button, message, Modal } from 'antd';
import { CourseStructure } from '../../../types/CourseStructure';

type AddSubItemButtonProps = {
    course: CourseStructure;
    className?: string;
};

const AddSubItemButton: FC<AddSubItemButtonProps> = ({ className, course }) => {
    const [addSubItem, { isLoading }] = courceApi.useAddSubItemMutation();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        addSubItem({ courseId: course.courseId, ...values })
            .unwrap()
            .then(
                () => setVisible(false),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    return (
        <>
            <Button className={className} onClick={showModal}>
                Добавить Раздел
            </Button>
            <Modal
                visible={visible}
                title='Добавление раздела'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button form='addSubItem' loading={isLoading} key='submit' htmlType='submit' type='primary'>
                        Добавить
                    </Button>,
                ]}>
                <SubItemForm id='addSubItem' onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default AddSubItemButton;
