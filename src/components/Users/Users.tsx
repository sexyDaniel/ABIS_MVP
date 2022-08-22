import { companyApi } from '../../services/companyService';
import AddUserButton from '../AddUserButton/AddUserButton';
import { Select, Space, Spin, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC, useState } from 'react';

import styles from './Users.module.scss';

type UsersProps = {
    className?: string;
};

interface DataType {
    key: React.Key;
    fio: string;
    email: string;
    perfomance: string;
    status: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Полное обращение',
        dataIndex: 'fio',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Успеваемость',
        dataIndex: 'perfomance',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
    },
];

const Users: FC<UsersProps> = () => {
    const { data: companies, isLoading } = companyApi.useGetCompaniesQuery();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const { data: users, isLoading: usersIsLoading } = companyApi.useGetUsersQuery(selectedCompany!, {
        skip: !selectedCompany,
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
        <div className={styles.wrapper}>
            <Typography className={styles.space}>Вы можете добавлять и удалять пользователей.</Typography>
            {companies && (
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
            )}
            {selectedCompany && (
                <>
                    <div className={styles.actions}>
                        <Select className={styles.select} disabled placeholder='Выберите действие' allowClear>
                            <Select.Option value='1'>Удалить</Select.Option>
                            <Select.Option value='2'>Остановить обучение</Select.Option>
                            <Select.Option value='3'>Назначить обучение</Select.Option>
                            <Select.Option value='4'>Отправить приглашение на обучение</Select.Option>
                        </Select>
                        <AddUserButton companyId={selectedCompany} />
                    </div>
                    {usersIsLoading && <Spin />}
                    {users && (
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={users.map(({ id, lastName, firstName, email }) => ({
                                key: id!,
                                fio: `${lastName ?? 'Фамилия'} ${firstName ?? 'Имя'}`,
                                email: email,
                                perfomance: '-',
                                status: '-',
                            }))}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Users;
