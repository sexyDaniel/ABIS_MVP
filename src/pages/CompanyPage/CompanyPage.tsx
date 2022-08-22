import Company from '../../components/Company/Company';
import Title from '../../components/Title/Title';
import React, { FC } from 'react';

type CompanyPageProps = {
    className?: string;
};

const CompanyPage: FC<CompanyPageProps> = () => {
    return (
        <>
            <Title>Компания</Title>
            <Company />
        </>
    );
};

export default CompanyPage;
