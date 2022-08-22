import { Button, List, Select, Space, Spin, Typography } from 'antd';
import AddUserButton from '../AddUserButton/AddUserButton';
import { companyApi } from '../../services/companyService';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { Role } from '../../types/Role';

import styles from './Admins.module.scss';

const Admins: FC = () => {
    const { data: companies, isLoading } = companyApi.useGetCompaniesQuery();
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const { data: admins, isLoading: adminsIsLoading } = companyApi.useGetAdminsQuery(selectedCompany!, {
        skip: !selectedCompany,
    });

    const onChange = (id: any) => setSelectedCompany(id);

    if (isLoading) return <Spin />;

    if (!companies || companies.length === 0) {
        return <Typography>Для добавления пользователей добавьте компанию во вкладке "Компания"</Typography>;
    }

    return (
        <>
            <Typography className={styles.space}>Вы можете добавлять и удалять администраторов.</Typography>
            <Space className={styles.space} size={20}>
                <Typography>Компания:</Typography>
                <Select className={styles.select} placeholder='Выберите компанию' allowClear onChange={onChange}>
                    {companies.map(({ id, name }) => (
                        <Select.Option key={id} value={id}>
                            {name}
                        </Select.Option>
                    ))}
                </Select>
            </Space>
            {adminsIsLoading && <Spin />}
            {selectedCompany && !adminsIsLoading && (
                <>
                    <AddUserButton companyId={selectedCompany} role={Role.Admin} />
                    <List
                        size='small'
                        bordered
                        dataSource={admins}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography>
                                    {item.lastName ?? 'Фамилия'} {item.firstName ?? 'Имя'} ({item.email})
                                </Typography>
                                <div>
                                    <Button disabled>
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            </List.Item>
                        )}
                    />
                </>
            )}
        </>
    );
};

export default Admins;
