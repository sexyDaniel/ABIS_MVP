import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearToken } from '../../store/reducers/TokenSlice';
import { authAPI } from '../../services/authService';
import InfoForm from './InfoForm/InfoForm';
import { Button, message } from 'antd';
import React, { FC } from 'react';

import styles from './Profile.module.scss';

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
        <>
            <div className={styles.formWrapper}>
                <InfoForm />
                <ChangePasswordForm />
            </div>
            <Button loading={isLoading} className={styles.btn} danger onClick={onDelete}>
                Удалить профиль
            </Button>
        </>
    );
};

export default Profile;
