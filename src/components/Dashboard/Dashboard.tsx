import { Col, List, Progress, Row, Select, Space, Spin, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { companyApi } from '../../services/companyService';
import { statisticApi } from '../../services/statisticService';

const Dashboard: FC = () => {
    const { data: companies, isLoading: companiesIsLoading } = companyApi.useGetCompaniesQuery();
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const { data: statistic, isLoading: statisticIsLoading } = statisticApi.useGetAdminStatisticQuery(
        selectedCompany!,
        { skip: !selectedCompany }
    );

    const onChange = (id: any) => setSelectedCompany(id);

    if (companiesIsLoading) return <Spin />;

    if (!companies || companies.length === 0) {
        return <Typography>Для отображение прогресса добавьте компанию во вкладке "Компания"</Typography>;
    }

    return (
        <Space direction='vertical' size={20} style={{ display: 'flex' }}>
            <Typography>Здесь отображается прогресс пользователей компании по курсам.</Typography>
            <Space size={20}>
                <Typography>Компания:</Typography>
                <Select placeholder='Выберите компанию' allowClear onChange={onChange}>
                    {companies.map(({ id, name }) => (
                        <Select.Option key={id} value={id}>
                            {name}
                        </Select.Option>
                    ))}
                </Select>
            </Space>
            {selectedCompany && (
                <>
                    {statisticIsLoading && <Spin />}
                    {statistic && (
                        <List
                            size='small'
                            bordered
                            dataSource={statistic}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space direction='vertical' style={{ display: 'flex', width: '100%' }}>
                                        <Typography.Text strong>{item.courseName}</Typography.Text>
                                        {item.users.map((user) => (
                                            <Row key={user.id}>
                                                <Col span={10}>
                                                    <Typography>
                                                        {user.lastName} {user.firstName} ({user.email})
                                                    </Typography>
                                                </Col>
                                                <Col span={14}>
                                                    <Progress
                                                        key={user.id}
                                                        percent={Math.round(
                                                            (user.complitedUnitCount / item.unitCount) * 100
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        ))}
                                    </Space>
                                </List.Item>
                            )}
                        />
                    )}
                </>
            )}
        </Space>
    );
};

export default Dashboard;
