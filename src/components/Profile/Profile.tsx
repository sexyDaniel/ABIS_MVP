import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearToken } from '../../store/reducers/TokenSlice';
import { authAPI } from '../../services/authService';
import { Button, message, Popconfirm } from 'antd';
import InfoForm from './InfoForm/InfoForm';
import React, { FC, useState } from 'react';

import styles from './Profile.module.scss';

const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const [deleteUser, { isLoading: deleteIsLoading }] = authAPI.useDeleteMutation();
    const [visible, setVisible] = useState(false);

    const onDelete = () => {
        if (user)
            deleteUser(user.id!)
                .unwrap()
                .then(
                    () => {
                        dispatch(clearToken());
                        setVisible(false);
                    },
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
    };

    const showPopconfirm = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    return (
        <>
            <div className={styles.formWrapper}>
                <InfoForm />
                <ChangePasswordForm />
            </div>
            <Popconfirm
                title='Вы точно хотите удалить профиль?'
                visible={visible}
                okText='Да'
                cancelText='Нет'
                placement='topRight'
                onConfirm={onDelete}
                okButtonProps={{ loading: deleteIsLoading }}
                onCancel={handleCancel}>
                <Button loading={deleteIsLoading} className={styles.btn} danger onClick={showPopconfirm}>
                    Удалить профиль
                </Button>
            </Popconfirm>
        </>
    );
};

export default Profile;
