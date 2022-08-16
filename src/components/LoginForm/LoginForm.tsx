import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../routes';
import { setToken } from '../../store/reducers/TokenSlice';
import { Button, Form, Input, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { authAPI } from '../../services/authService';

import styles from './LoginForm.module.scss';

type LoginFormProps = {
    className?: string;
};

const LoginForm: FC<LoginFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const params = {
        email: searchParams.get('email'),
        token: searchParams.get('token'),
    };
    const { accessToken } = useAppSelector((state) => state.token);
    const [login, { data: loginData, isLoading: loginIsLoading }] = authAPI.useLoginMutation();
    const [setPassword, { data: setPasswordData, isLoading: setPasswordIsLoading }] = authAPI.useSetPasswordMutation();

    const [email, setEmail] = useState('');
    const { data, isLoading } = authAPI.useCheckEmailQuery({ email }, { skip: !email });

    const onEmailFinish = (values: any) => setEmail(values.email);
    const onPasswordFinish = (values: any) => login({ email, password: values.password });
    const onSetPasswordFinish = (values: any) =>
        setPassword({ password: values.password, email: params.email!, token: params.token! });

    useEffect(() => {
        if (accessToken) navigate(PROFILE_ROUTE);
    }, [accessToken, navigate]);

    useEffect(() => {
        if (loginData) dispatch(setToken(loginData.accessToken));
        if (setPasswordData) dispatch(setToken(setPasswordData.accessToken));
    }, [loginData, setPasswordData, dispatch]);

    if (params.email && params.token) {
        return (
            <>
                <Typography>Установите пароль для {params.email}</Typography>
                <br />
                <Form
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onSetPasswordFinish}
                    autoComplete='off'>
                    <Form.Item
                        label='Пароль'
                        name='password'
                        rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={setPasswordIsLoading} type='primary' htmlType='submit'>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }

    if (!email || isLoading) {
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
