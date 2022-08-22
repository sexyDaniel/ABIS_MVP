import Title from '../../components/Title/Title';
import Users from '../../components/Users/Users';
import React, { FC } from 'react';

const UsersPage: FC = () => {
    return (
        <>
            <Title>Пользователи</Title>
            <Users />
        </>
    );
};

export default UsersPage;
