import { Button, Form, Input, Typography } from 'antd';
import React, { FC } from 'react';

type ChangePasswordFormProps = {
    className?: string;
};

const ChangePasswordForm: FC<ChangePasswordFormProps> = () => {
    const onFinish = (values: any) => {};

    return (
        <div>
            <Typography>Изменить пароль</Typography>
            <br />
            <Form
                disabled
                name='ChangePassword'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'>
                <Form.Item
                    label='Пароль'
                    name='oldPassword'
                    rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label='Новый пароль'
                    name='newPassword'
                    rules={[{ required: true, message: 'Пожалуйста введите новый пароль' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label='Повторите новый пароль'
                    name='confirm'
                    rules={[{ required: true, message: 'Пожалуйста повторите новый пароль' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;
