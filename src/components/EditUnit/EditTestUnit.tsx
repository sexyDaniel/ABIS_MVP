import { Button, Form, Input, List, message, Spin } from 'antd';
import React, { FC } from 'react';
import { courceApi } from '../../services/courseService';
import AddTestItem from './AddTestItem/AddTestItem';
import EditTestItem from './EditTestItem/EditTestItem';

import styles from './EditUnit.module.scss';

type EditTestUnitProps = {
    className?: string;
    id?: string;
};

const EditTestUnit: FC<EditTestUnitProps> = ({ id }) => {
    const { data: testUnit, isLoading: testUnitIsLoading } = courceApi.useGetTestUnitQuery(Number(id));
    const [changeTestUnit, { isLoading: updIsLoading }] = courceApi.useChangeTestUnitMutation();
    const { data: testItems, isLoading: testItemsIsLoading } = courceApi.useGetTestItemsQuery(Number(id));

    const onFinish = (values: any) =>
        changeTestUnit({ id, ...values })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    if (testUnitIsLoading) {
        return <Spin />;
    }

    if (!testUnit) {
        return <></>;
    }

    return (
        <>
            <Form
                name='basic'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
                className={styles.space}
                autoComplete='off'>
                <Form.Item
                    label='Название'
                    name='title'
                    initialValue={testUnit.title}
                    rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button loading={updIsLoading} type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
            <List
                size='small'
                bordered
                className={styles.space}
                dataSource={testItems}
                renderItem={(testItem) => (
                    <List.Item className={styles.company}>
                        <EditTestItem testItem={testItem} />
                    </List.Item>
                )}
            />
            <AddTestItem testUnitId={Number(id)} />
        </>
    );
};

export default EditTestUnit;
