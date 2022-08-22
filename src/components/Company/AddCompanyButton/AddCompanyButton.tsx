import { Button, message, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { companyApi } from '../../../services/companyService';
import CompanyForm from '../CompanyForm/CompanyForm';

type AddCompanyButtonProps = {
    className?: string;
};

const AddCompanyButton: FC<AddCompanyButtonProps> = ({ className }) => {
    const [addCompany, { isLoading }] = companyApi.useAddCompanyMutation();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        addCompany(values)
            .unwrap()
            .then(
                () => setVisible(false),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    return (
        <>
            <Button className={className} onClick={showModal}>
                Добавить компанию
            </Button>
            <Modal
                visible={visible}
                title='Добавление компании'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button form='addCompany' loading={isLoading} key='submit' htmlType='submit' type='primary'>
                        Добавить
                    </Button>,
                ]}>
                <CompanyForm id='addCompany' onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default AddCompanyButton;
