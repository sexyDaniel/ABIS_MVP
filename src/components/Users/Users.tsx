import AddUserButton from '../AddUserButton/AddUserButton';
import { Button, Select, Table, Typography } from 'antd';
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

const data: DataType[] = [
    {
        key: 1,
        fio: 'Иван Иванов',
        email: 'имя@ddawd',
        perfomance: '-',
        status: '-',
    },
    {
        key: 2,
        fio: 'Влад Сидоров',
        email: 'имя@ddawd',
        perfomance: '-',
        status: 'в процессе обучения',
    },
];

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
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className={styles.wrapper}>
            <Typography className={styles.title}>
                Вы можете управлять пользователями: добавлять и удалять их, назначать, приостанавливать и возобновлять
                обучение.
            </Typography>
            <div className={styles.actions}>
                <Select className={styles.select} disabled={!hasSelected} placeholder='Выберите действие' allowClear>
                    <Select.Option value='1'>Удалить</Select.Option>
                    <Select.Option value='2'>Остановить обучение</Select.Option>
                    <Select.Option value='3'>Назначить обучение</Select.Option>
                    <Select.Option value='4'>Отправить приглашение на обучение</Select.Option>
                </Select>
                <AddUserButton />
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default Users;
