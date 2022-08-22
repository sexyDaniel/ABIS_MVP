import { setToken } from '../../store/reducers/TokenSlice';
import { Button, Form, Input, message, Typography } from 'antd';
import { authAPI } from '../../services/authService';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import React, { FC, useEffect } from 'react';

type ResetFormProps = {
    className?: string;
};

const ResetForm: FC<ResetFormProps> = () => {
    const dispatch = useAppDispatch();
    const [setPassword, { data: setPasswordData, isLoading: setPasswordIsLoading }] = authAPI.useSetPasswordMutation();
    const [searchParams] = useSearchParams();
    const params = {
        email: searchParams.get('email'),
        token: searchParams.get('token'),
    };

    const onSetPasswordFinish = (values: any) =>
        setPassword({ password: values.password, email: params.email!, token: params.token! })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    useEffect(() => {
        if (setPasswordData) dispatch(setToken(setPasswordData.accessToken));
    }, [setPasswordData, dispatch]);

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
};

export default ResetForm;
