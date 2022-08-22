import { companyApi } from '../../../services/companyService';
import React, { FC, useEffect, useState } from 'react';
import CompanyForm from '../CompanyForm/CompanyForm';
import { EditOutlined } from '@ant-design/icons';
import { Company } from '../../../types/Company';
import { Button, message, Modal } from 'antd';

type EditCompanyButtonProps = {
    className?: string;
    company: Company;
};

const EditCompanyButton: FC<EditCompanyButtonProps> = ({ className, company }) => {
    const [changeCompany, { isLoading }] = companyApi.useChangeCompanyMutation();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) =>
        changeCompany({ id: company.id, name: values.name, domainName: values.domainName })
            .unwrap()
            .then(
                () => setVisible(false),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );

    return (
        <>
            <Button className={className} onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal
                visible={visible}
                title='Добавление компании'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button form='changeCompany' loading={isLoading} key='submit' htmlType='submit' type='primary'>
                        Сохранить
                    </Button>,
                ]}>
                <CompanyForm
                    id='changeCompany'
                    onFinish={onFinish}
                    defaultName={company.name}
                    defaultDomainName={company.domainName}
                />
            </Modal>
        </>
    );
};

export default EditCompanyButton;
