import { Button, Form, Input, message, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import styles from './EditTestItem.module.scss';
import { courceApi } from '../../services/courseService';
import { TestItem } from '../../types/TestItem';

type EditTestItemProps = {
    className?: string;
    testItem: TestItem;
};

const EditTestItemButton: FC<EditTestItemProps> = ({ className, testItem }) => {
    const [visible, setVisible] = useState(false);
    const [updateItem, { isLoading }] = courceApi.useChangeTestItemMutation();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        updateItem({ id: testItem.id, questionText: values.questionText })
            .unwrap()
            .then(
                () => setVisible(false),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    return (
        <>
            <Button className={className} onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal
                visible={visible}
                title='Изменение ответа'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button form='changeAnswer' loading={isLoading} key='submit' htmlType='submit' type='primary'>
                        Сохранить
                    </Button>,
                ]}>
                <Form
                    id='changeAnswer'
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete='off'>
                    <Form.Item
                        label='Текст вопроса'
                        name='questionText'
                        initialValue={testItem.questionText}
                        rules={[{ required: true, message: 'Пожалуйста введите вопрос' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditTestItemButton;
