import { Button, Form, Input, message, Spin } from 'antd';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import React, { FC, useRef, useState } from 'react';
import { courseApi } from '../../services/courseService';
import Markdown from '../Markdown/Markdown';

import styles from './EditUnit.module.scss';

type EditTheoryUnitProps = {
    className?: string;
    id?: string;
};

const EditTheoryUnit: FC<EditTheoryUnitProps> = ({ id }) => {
    const textarea = useRef<TextAreaRef>(null);
    const { data: theoryUnit, isLoading: theoryUnitIsLoading } = courseApi.useGetAdminTheoryUnitQuery(Number(id));
    const [changeTheoryUnit, { isLoading: updIsLoading }] = courseApi.useChangeTheoryUnitMutation();
    const [markdownShow, setMarkdownShow] = useState(false);

    const onFinish = (values: any) =>
        changeTheoryUnit({ id, ...values })
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    if (theoryUnitIsLoading) {
        return <Spin />;
    }

    if (!theoryUnit) {
        return <></>;
    }

    return (
        <Form name='basic' initialValues={{ remember: true }} layout='vertical' onFinish={onFinish} autoComplete='off'>
            <Form.Item
                label='Название'
                name='title'
                initialValue={theoryUnit.title}
                rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                <Input />
            </Form.Item>
            <Button className={styles.space} onClick={() => setMarkdownShow((prev) => !prev)}>
                Посмотреть страницу
            </Button>
            <Form.Item
                label='Текст блока (Markdown)'
                name='body'
                style={markdownShow ? { display: 'none' } : undefined}
                initialValue={theoryUnit.body}
                rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                <TextArea ref={textarea} />
            </Form.Item>

            {markdownShow && <Markdown children={textarea.current?.resizableTextArea?.textArea.value!} />}

            <Form.Item>
                <Button loading={updIsLoading} type='primary' htmlType='submit'>
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditTheoryUnit;
