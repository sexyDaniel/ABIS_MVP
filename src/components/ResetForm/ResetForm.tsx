import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken } from '../../store/reducers/TokenSlice';
import { authAPI } from '../../services/authService';
import { useAppDispatch } from '../../hooks/redux';
import React, { FC, useEffect } from 'react';
import { PROFILE_ROUTE } from '../../routes';

const ResetForm: FC = () => {
    const navigate = useNavigate();
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
        if (setPasswordData) {
            dispatch(setToken(setPasswordData.accessToken));
            navigate(PROFILE_ROUTE);
        }
    }, [setPasswordData, dispatch, navigate]);

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
