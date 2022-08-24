import { Button, Form, Input, message, Space, Spin, Typography } from 'antd';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import { courseApi } from '../../services/courseService';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from '../Markdown/Markdown';

type EditTheoryUnitProps = {
    className?: string;
    id?: string;
};

const EditTheoryUnit: FC<EditTheoryUnitProps> = ({ id }) => {
    const navigate = useNavigate();
    const textarea = useRef<TextAreaRef>(null);
    const { data: theoryUnit, isLoading: theoryUnitIsLoading } = courseApi.useGetAdminTheoryUnitQuery(Number(id));
    const [changeTheoryUnit, { isLoading: updIsLoading }] = courseApi.useChangeTheoryUnitMutation();
    const [markdownShow, setMarkdownShow] = useState(false);

    const onFinish = (values: any) =>
        changeTheoryUnit({ id, ...values })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    const backToCourse = () => navigate(-1);
    const toggleMarkdown = () => setMarkdownShow((prev) => !prev);

    if (theoryUnitIsLoading) {
        return <Spin />;
    }

    if (!theoryUnit) {
        return <></>;
    }

    return (
        <Space direction='vertical' style={{ display: 'flex' }}>
            <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToCourse}>
                к структуре курса
            </Button>
            <Typography.Title level={4}>Редактирование блока</Typography.Title>
            <Form
                name='basic'
                initialValues={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'>
                <Form.Item
                    label='Название'
                    name='title'
                    initialValue={theoryUnit.title}
                    rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button onClick={toggleMarkdown}>Посмотреть страницу</Button>
                </Form.Item>

                <Form.Item
                    label='Текст блока (Markdown)'
                    name='body'
                    style={markdownShow ? { display: 'none' } : undefined}
                    initialValue={theoryUnit.body}
                    rules={[{ required: true, message: 'Пожалуйста введите текст' }]}>
                    <TextArea ref={textarea} autoSize />
                </Form.Item>

                {markdownShow && (
                    <Form.Item>
                        <Markdown children={textarea.current?.resizableTextArea?.textArea.value!} />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button loading={updIsLoading} type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default EditTheoryUnit;
