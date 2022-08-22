import EditCompanyButton from './EditCompanyButton/EditCompanyButton';
import AddCompanyButton from './AddCompanyButton/AddCompanyButton';
import { Button, List, message, Spin, Typography } from 'antd';
import { companyApi } from '../../services/companyService';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import styles from './Company.module.scss';

const Company: FC = () => {
    const { data: companies, isLoading: companiesIsLoading } = companyApi.useGetCompaniesQuery();
    const [deleteCompany, { isLoading: deleteIsLoading }] = companyApi.useDeleteCompanyMutation();

    const onDelete = (id: number) => () =>
        deleteCompany(id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <>
            <div className={styles.header}>
                <Typography>Вы можете управлять компаниями: добавлять, изменять и удалять их.</Typography>
                <AddCompanyButton />
            </div>

            {companiesIsLoading && <Spin />}
            {companies && (
                <List
                    size='small'
                    bordered
                    dataSource={companies}
                    renderItem={(item) => (
                        <List.Item className={styles.company}>
                            <Typography>
                                {item.name} ({item.domainName})
                            </Typography>
                            <div>
                                <EditCompanyButton company={item} />
                                <Button loading={deleteIsLoading} onClick={onDelete(item.id!)}>
                                    <DeleteOutlined />
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default Company;
