import { Button, Card, Form, Input, List, message, Space, Spin, Typography } from 'antd';
import { courseApi } from '../../services/courseService';
import EditTestItem from './EditTestItem/EditTestItem';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AddTestItem from './AddTestItem/AddTestItem';
import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

type EditTestUnitProps = {
    className?: string;
    id?: string;
};

const EditTestUnit: FC<EditTestUnitProps> = ({ id }) => {
    const navigate = useNavigate();
    const { data: testUnit, isLoading: testUnitIsLoading } = courseApi.useGetTestUnitQuery(Number(id));
    const [changeTestUnit, { isLoading: updIsLoading }] = courseApi.useChangeTestUnitMutation();
    const { data: testItems, isLoading: testItemsIsLoading } = courseApi.useGetAdminTestItemsQuery(Number(id));

    const onFinish = (values: any) =>
        changeTestUnit({ id, ...values })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    const backToCourse = () => navigate(-1);

    if (testUnitIsLoading) {
        return <Spin />;
    }

    if (!testUnit) {
        return <></>;
    }

    return (
        <Space direction='vertical' style={{ display: 'flex' }}>
            <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToCourse}>
                к структуре курса
            </Button>
            <Card>
                <Typography.Title level={5}>Редактирование блока</Typography.Title>
                <Form
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onFinish}
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
            </Card>
            <List
                bordered
                header={<Typography.Title level={5}>Список вопросов</Typography.Title>}
                dataSource={testItems}
                loading={testItemsIsLoading}
                renderItem={(testItem) => (
                    <List.Item>
                        <EditTestItem testItem={testItem} />
                    </List.Item>
                )}
            />
            <Card>
                <Typography.Title level={5}>Добавление вопроса</Typography.Title>
                <AddTestItem testUnitId={Number(id)} />
            </Card>
        </Space>
    );
};

export default EditTestUnit;
