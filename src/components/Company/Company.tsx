import { Button, List, message, Popconfirm, Spin, Typography } from 'antd';
import EditCompanyButton from './EditCompanyButton/EditCompanyButton';
import AddCompanyButton from './AddCompanyButton/AddCompanyButton';
import { Company as CompanyType } from '../../types/Company';
import { companyApi } from '../../services/companyService';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

import styles from './Company.module.scss';

const Company: FC = () => {
    const { data: companies, isLoading: companiesIsLoading } = companyApi.useGetCompaniesQuery();

    return (
        <>
            <div className={styles.header}>
                <Typography>Вы можете управлять компаниями: добавлять, изменять и удалять их.</Typography>
                <AddCompanyButton />
            </div>

            {companiesIsLoading && <Spin />}
            {companies && (
                <List
                    bordered
                    dataSource={companies}
                    renderItem={(item) => (
                        <List.Item>
                            <CompanyItem company={item} />
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

const CompanyItem: FC<{ company: CompanyType }> = ({ company }) => {
    const [deleteCompany, { isLoading: deleteIsLoading }] = companyApi.useDeleteCompanyMutation();
    const [visible, setVisible] = useState(false);
    const showPopconfirm = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const onDelete = () =>
        deleteCompany(company.id!)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <>
            <Typography>
                {company.name} ({company.domainName})
            </Typography>
            <div>
                <EditCompanyButton company={company} />
                <Popconfirm
                    title='Вы точно хотите удалить профиль?'
                    visible={visible}
                    okText='Да'
                    cancelText='Нет'
                    placement='topRight'
                    onConfirm={onDelete}
                    okButtonProps={{ loading: deleteIsLoading }}
                    onCancel={handleCancel}>
                    <Button onClick={showPopconfirm}>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </div>
        </>
    );
};

export default Company;
