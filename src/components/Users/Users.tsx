import { Button, List, Select, Space, Spin, Typography } from 'antd';
import { companyApi } from '../../services/companyService';
import AddUserButton from '../AddUserButton/AddUserButton';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

import styles from './Users.module.scss';

const Users: FC = () => {
    const { data: companies, isLoading } = companyApi.useGetCompaniesQuery();
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const { data: users, isLoading: usersIsLoading } = companyApi.useGetUsersQuery(selectedCompany!, {
        skip: !selectedCompany,
    });

    const onChange = (id: any) => setSelectedCompany(id);

    if (isLoading) return <Spin />;

    if (!companies || companies.length === 0) {
        return (
            <Typography className={styles.title}>
                Для добавления пользователей добавьте компанию во вкладке "Компания"
            </Typography>
        );
    }

    return (
        <>
            <Typography className={styles.space}>Вы можете добавлять и удалять пользователей.</Typography>
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
            {selectedCompany && (
                <>
                    {usersIsLoading && <Spin />}
                    {users && (
                        <>
                            <AddUserButton companyId={selectedCompany} />
                            <List
                                size='small'
                                bordered
                                dataSource={users}
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
            )}
        </>
    );
};

export default Users;
