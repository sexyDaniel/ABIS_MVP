import EditCompanyButton from '../EditCompanyButton/EditCompanyButton';
import AddCompanyButton from '../AddCompanyButton/AddCompanyButton';
import { companyApi } from '../../services/companyService';
import { Button, List, message, Spin, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import styles from './Company.module.scss';

type CompanyProps = {
    className?: string;
};

const Company: FC<CompanyProps> = () => {
    const { data, isLoading } = companyApi.useGetCompaniesQuery();
    const [deleteCompany, { isLoading: deleteIsLoading }] = companyApi.useDeleteCompanyMutation();

    const onDelete = (id: number) => () =>
        deleteCompany(id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Typography className={styles.title}>
                    Вы можете управлять компаниями: добавлять, изменять и удалять их.
                </Typography>
                <AddCompanyButton />
            </div>

            {!data && isLoading && <Spin />}
            {!isLoading &&
                data &&
                (data?.length === 0 ? (
                    <Typography>У вас пока нет компаний</Typography>
                ) : (
                    <List
                        size='small'
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item className={styles.company}>
                                <Typography>
                                    {item.name} ({item.domainName})
                                </Typography>
                                <div className={styles.actions}>
                                    <EditCompanyButton company={item} />
                                    <Button loading={deleteIsLoading} onClick={onDelete(item.id!)}>
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            </List.Item>
                        )}
                    />
                ))}
        </div>
    );
};

export default Company;
