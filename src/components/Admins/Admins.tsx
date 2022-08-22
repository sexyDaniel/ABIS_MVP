import { Button, List, Select, Space, Spin, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { companyApi } from '../../services/companyService';
import Title from '../Title/Title';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './Admins.module.scss';
import AddUserButton from '../AddUserButton/AddUserButton';
import { Role } from '../../types/Role';

type AdminsProps = {
    className?: string;
};

const Admins: FC<AdminsProps> = () => {
    const { data: companies, isLoading } = companyApi.useGetCompaniesQuery();
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const { data: admins, isLoading: adminsIsLoading } = companyApi.useGetAdminsQuery(selectedCompany!, {
        skip: !selectedCompany,
    });

    const onChange = (id: any) => setSelectedCompany(id);

    if (isLoading) {
        return (
            <div className={styles.wrapper}>
                <Spin />
            </div>
        );
    }

    if (companies?.length === 0) {
        return (
            <div className={styles.wrapper}>
                <Typography className={styles.title}>
                    Для добавления пользователей добавьте компанию во вкладке "Компания"
                </Typography>
            </div>
        );
    }
    return (
        <>
            <Title>Администраторы</Title>
            <div className={styles.wrapper}>
                <Typography className={styles.space}>Вы можете добавлять и удалять администраторов.</Typography>
                {companies && (
                    <Space className={styles.space} size={20}>
                        <Typography>Компания:</Typography>
                        <Select
                            className={styles.select}
                            placeholder='Выберите компанию'
                            allowClear
                            onChange={onChange}>
                            {companies.map(({ id, name }) => (
                                <Select.Option key={id} value={id}>
                                    {name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Space>
                )}
                {adminsIsLoading && <Spin />}
                {selectedCompany && !adminsIsLoading && (
                    <>
                        <AddUserButton companyId={selectedCompany} role={Role.Admin} />
                        <List
                            size='small'
                            bordered
                            dataSource={admins}
                            renderItem={(item) => (
                                <List.Item className={styles.company}>
                                    <Typography>
                                        {item.lastName ?? 'Фамилия'} {item.firstName ?? 'Имя'} ({item.email})
                                    </Typography>
                                    <div className={styles.actions}>
                                        <Button disabled>
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Admins;
