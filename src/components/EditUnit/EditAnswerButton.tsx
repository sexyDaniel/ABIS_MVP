import { Button, Form, Input, message, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import styles from './EditAnswerButton.module.scss';

import { answerAPI } from '../../services/answerService';

type EditAnswerButtonProps = {
    className?: string;
    answer?: { id: number; text: string; isRight: boolean };
    ratioQuestions?: {
        questionId: number;
        questionText: string;
        answerId: number;
        answerText: string;
    };
    testItemId: number;
};

const EditAnswerButton: FC<EditAnswerButtonProps> = ({ className, answer, testItemId, ratioQuestions }) => {
    const [visible, setVisible] = useState(false);
    const [changeAnswer, { isLoading: changeIsLoading }] = answerAPI.useChangeAnswerMutation();
    const [changeRatio, { isLoading: changeRatioIsLoading }] = answerAPI.useChangeRatioAnswerMutation();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        if (answer) {
            changeAnswer({ answerId: answer.id, testItemId, answerText: values.text, isRight: answer.isRight })
                .unwrap()
                .then(
                    () => setVisible(false),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        } else if (ratioQuestions) {
            changeRatio({
                ratioQuestionId: ratioQuestions.questionId,
                testItemId,
                answerText: values.answerText,
                questionText: values.questionText,
            })
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
                <EditOutlined />
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
                        form='changeAnswer'
                        loading={changeIsLoading || changeRatioIsLoading}
                        key='submit'
                        htmlType='submit'
                        type='primary'>
                        Сохранить
                    </Button>,
                ]}>
                <Form
                    id='changeAnswer'
                    name='basic'
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete='off'>
                    {answer && (
                        <Form.Item
                            label='Текст ответа'
                            name='text'
                            initialValue={answer.text}
                            rules={[{ required: true, message: 'Пожалуйста введите ответ' }]}>
                            <Input />
                        </Form.Item>
                    )}
                    {ratioQuestions && (
                        <>
                            <Form.Item
                                name='questionText'
                                initialValue={ratioQuestions.questionText}
                                rules={[{ required: true, message: 'Пожалуйста введите вопрос' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='answerText'
                                initialValue={ratioQuestions.answerText}
                                rules={[{ required: true, message: 'Пожалуйста введите ответ' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default EditAnswerButton;
