import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { FC } from 'react';

type SubItemFormProps = {
    id: string;
    onFinish: (values: any) => void;
    defaultTitle?: string;
    defaultDescription?: string;
};

const SubItemForm: FC<SubItemFormProps> = ({ id, onFinish, defaultDescription, defaultTitle }) => {
    return (
        <Form
            id={id}
            name='basic'
            initialValues={{ remember: true }}
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'>
            <Form.Item
                label='Название раздела'
                name='title'
                initialValue={defaultTitle}
                rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Описание раздела (Markdown)'
                name='description'
                initialValue={defaultDescription}
                rules={[{ required: true, message: 'Пожалуйста введите описание' }]}>
                <TextArea autoSize />
            </Form.Item>
        </Form>
    );
};

export default SubItemForm;
