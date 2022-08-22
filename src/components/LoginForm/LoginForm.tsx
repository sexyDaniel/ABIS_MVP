import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../routes';
import { Button, Form, Input, message, Typography } from 'antd';
import { setToken } from '../../store/reducers/TokenSlice';
import React, { FC, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/authService';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.user);
    const [login, { data: loginData, isLoading: loginIsLoading }] = authAPI.useLoginMutation();

    const [email, setEmail] = useState('');
    const { data, isLoading, error } = authAPI.useCheckEmailQuery({ email }, { skip: !email });

    const onEmailFinish = (values: any) => setEmail(values.email);
    const onPasswordFinish = (values: any) =>
        login({ email, password: values.password })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    useEffect(() => {
        if (user) navigate(PROFILE_ROUTE);
    }, [user, navigate]);

    useEffect(() => {
        if (error) message.error((error as any).data?.message ?? 'Произошла ошибка');
    }, [error]);

    useEffect(() => {
        if (loginData) dispatch(setToken(loginData.accessToken));
    }, [loginData, dispatch]);

    const backToEmail = () => setEmail('');

    if (!email || isLoading || error) {
        return (
            <>
                <Form
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onEmailFinish}
                    autoComplete='off'>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: 'Пожалуйста введите ваш email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={isLoading} type='primary' htmlType='submit'>
                            Далее
                        </Button>
                    </Form.Item>
                </Form>
                <p>
                    Еще нет учетной записи? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
                </p>
            </>
        );
    }

    if (data && !data.isPasswordExists) {
        return (
            <Typography>
                Ваша почта была зарегистрирована администратором сервиса. Для установки пароля перейдите по ссылке в
                письме
            </Typography>
        );
    }

    return (
        <>
            <Form
                name='basic'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onPasswordFinish}
                autoComplete='off'>
                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button onClick={backToEmail}>
                        <ArrowLeftOutlined />
                    </Button>

                    <Button loading={loginIsLoading} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <button type='button' className={styles.reset}>
                        Забыли пароль?
                    </button>
                </Form.Item>
            </Form>
            <p>
                Еще нет учетной записи? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
            </p>
        </>
    );
};

export default LoginForm;
