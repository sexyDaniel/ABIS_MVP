import { courseApi } from '../../../services/courseService';
import React, { FC, useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, message, Modal, Spin } from 'antd';
import SubItemForm from '../SubItemForm/SubItemForm';

type EditSubItemButtonProps = {
    className?: string;
    id: number;
};

const EditSubItemButton: FC<EditSubItemButtonProps> = ({ className, id }) => {
    const [visible, setVisible] = useState(false);
    const { data, isLoading } = courseApi.useGetSubItemQuery(id, { skip: !visible });
    const [changeSubItem, { isLoading: changeIsLoading }] = courseApi.useChangeSubItemMutation();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) =>
        changeSubItem({ id, ...values })
            .unwrap()
            .then(
                () => setVisible(false),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );

    return (
        <>
            <Button className={className} onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal
                visible={visible}
                title='Изменение раздела'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button
                        form='changeSubItem'
                        loading={changeIsLoading}
                        key='submit'
                        htmlType='submit'
                        type='primary'>
                        Сохранить
                    </Button>,
                ]}>
                {isLoading && <Spin />}
                {data && (
                    <SubItemForm
                        id='changeSubItem'
                        onFinish={onFinish}
                        defaultTitle={data.title}
                        defaultDescription={data.description}
                    />
                )}
            </Modal>
        </>
    );
};

export default EditSubItemButton;
