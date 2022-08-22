import { Form, Input } from 'antd';
import React, { FC } from 'react';

type CompanyFormProps = {
    id: string;
    onFinish: (values: any) => void;
    defaultName?: string;
    defaultDomainName?: string;
};

const CompanyForm: FC<CompanyFormProps> = ({ id, onFinish, defaultName, defaultDomainName }) => {
    return (
        <Form
            id={id}
            name='basic'
            initialValues={{ remember: true }}
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'>
            <Form.Item
                label='Название компании'
                name='name'
                initialValue={defaultName}
                rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Сайт компании'
                name='domainName'
                initialValue={defaultDomainName}
                rules={[{ required: true, message: 'Пожалуйста введите сайт' }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default CompanyForm;
