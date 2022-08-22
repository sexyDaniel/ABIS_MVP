import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button, Form, Input, message, Select, Typography } from 'antd';
import { setToken } from '../../store/reducers/TokenSlice';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../../routes';
import { authAPI } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import styles from './RegistrationForm.module.scss';

type RegistrationFormProps = {
    className?: string;
};

const RegistrationForm: FC<RegistrationFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const [registrate, { data, isLoading }] = authAPI.useRegistrationMutation();

    const onFinish = (values: any) =>
        registrate(values)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    useEffect(() => {
        if (user) navigate(PROFILE_ROUTE);
    }, [user, navigate]);

    useEffect(() => {
        if (data) dispatch(setToken(data.accessToken));
    }, [data, dispatch]);

    return (
        <>
            <Form
                name='basic'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'>
                <Form.Item
                    name='role'
                    label='Роль'
                    rules={[{ required: true, message: 'Пожалуйста введите вашу роль' }]}>
                    <Select placeholder='Выберите роль' allowClear>
                        <Select.Option value='1'>Пользователь</Select.Option>
                        <Select.Option value='2'>Администратор</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Имя'
                    name='firstName'
                    rules={[{ required: true, message: 'Пожалуйста введите ваше имя' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Фамилия'
                    name='lastName'
                    rules={[{ required: true, message: 'Пожалуйста введите вашу фамилию' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Пожалуйста введите ваш email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Typography>
                Уже есть учетная запись? <Link to={LOGIN_ROUTE}>Войти</Link>
            </Typography>
        </>
    );
};

export default RegistrationForm;
