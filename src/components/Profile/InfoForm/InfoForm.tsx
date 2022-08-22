import { Button, Form, Input, message, Typography } from 'antd';
import { authAPI } from '../../../services/authService';
import { useAppSelector } from '../../../hooks/redux';
import React, { FC } from 'react';

const InfoForm: FC = () => {
    const { user } = useAppSelector((state) => state.user);
    const [update, { isLoading }] = authAPI.useUpdateMutation();

    const onFinish = (values: any) =>
        update(values)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    if (!user) return <></>;

    return (
        <div>
            <Typography>Изменить данные</Typography>
            <br />
            <Form
                name='Info'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'>
                <Form.Item
                    label='Имя'
                    name='firstName'
                    initialValue={user?.firstName}
                    rules={[{ required: true, message: 'Пожалуйста введите ваше имя' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Фамилия'
                    name='lastName'
                    initialValue={user?.lastName}
                    rules={[{ required: true, message: 'Пожалуйста введите вашу фамилию' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    initialValue={user?.email}
                    rules={[{ required: true, message: 'Пожалуйста введите ваш email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} type='primary' htmlType='submit'>
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default InfoForm;
