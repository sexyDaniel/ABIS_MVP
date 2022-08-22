import React, { FC, useState } from 'react';
import { answerAPI } from '../../services/answerService';
import { Button, Form, Input, message, Modal } from 'antd';

type AddAnswerButtonProps = {
    className?: string;
    testItemId: number;
    isRatio?: boolean;
};

const AddAnswerButton: FC<AddAnswerButtonProps> = ({ className, testItemId, isRatio = false }) => {
    const [visible, setVisible] = useState(false);
    const [addAnswer, { isLoading: addIsLoading }] = answerAPI.useAddAnswerMutation();
    const [addRatioAnswer, { isLoading: addRatioIsLoading }] = answerAPI.useAddRatioAnswerMutation();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        if (isRatio) {
            addRatioAnswer({ testItemId, answerText: values.answerText, questionText: values.questionText })
                .unwrap()
                .then(
                    () => setVisible(false),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        } else {
            addAnswer({ testItemId, answerText: values.text, isRight: false })
                .unwrap()
                .then(
                    () => setVisible(false),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        }
    };

    return (
        <>
            <Button className={className} onClick={showModal}>
                Добавить ответ
            </Button>
            <Modal
                visible={visible}
                title='Изменение ответа'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button
                        form='addAnswer'
                        loading={addIsLoading || addRatioIsLoading}
                        key='submit'
                        htmlType='submit'
                        type='primary'>
                        Добавить
                    </Button>,
                ]}>
                <Form
                    id='addAnswer'
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete='off'>
                    {isRatio ? (
                        <>
                            <Form.Item
                                name='questionText'
                                rules={[{ required: true, message: 'Пожалуйста введите вопрос' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='answerText'
                                rules={[{ required: true, message: 'Пожалуйста введите ответ' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    ) : (
                        <Form.Item
                            label='Текст ответа'
                            name='text'
                            rules={[{ required: true, message: 'Пожалуйста введите ответ' }]}>
                            <Input />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddAnswerButton;
