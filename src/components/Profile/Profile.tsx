import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { authAPI } from '../../services/authService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import InfoForm from './InfoForm/InfoForm';
import React, { FC, useEffect } from 'react';
import { Button, message } from 'antd';

import styles from './Profile.module.scss';
import { clearToken } from '../../store/reducers/TokenSlice';

type ProfileProps = {
    className?: string;
};

const Profile: FC<ProfileProps> = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const [deleteUser, { isLoading }] = authAPI.useDeleteMutation();

    const onDelete = () => {
        if (user)
            deleteUser(user.id!)
                .unwrap()
                .then(
                    () => dispatch(clearToken()),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <InfoForm />
                <ChangePasswordForm />
            </div>
            <Button loading={isLoading} className={styles.btn} danger onClick={onDelete}>
                Удалить профиль
            </Button>
        </div>
    );
};

export default Profile;
