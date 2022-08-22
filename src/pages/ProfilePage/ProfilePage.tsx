import Container from '../../components/Container/Container';
import Profile from '../../components/Profile/Profile';
import Title from '../../components/Title/Title';
import React, { FC } from 'react';

import styles from './ProfilePage.module.scss';

const ProfilePage: FC = () => {
    return (
        <Container>
            <Title>Профиль</Title>
            <Profile />
        </Container>
    );
};

export default ProfilePage;
