import { Button, Checkbox, Form, Input, message, Radio, RadioChangeEvent, Space, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { FC, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TestItemType } from '../../../types/AdminTestItem';
import { courseApi } from '../../../services/courseService';

import styles from '../EditUnit.module.scss';
import Markdown from '../../Markdown/Markdown';

type AddTestItemProps = {
    className?: string;
    testUnitId: number;
};

const AddTestItem: FC<AddTestItemProps> = ({ testUnitId }) => {
    const [type, setType] = useState<TestItemType>('OneAnswer');
    const onTypeChange = (e: RadioChangeEvent) => setType(e.target.value);

    const [markdownShow, setMarkdownShow] = useState(false);
    const toggleMarkdown = () => setMarkdownShow((prev) => !prev);

    const [questionText, setQuestionText] = useState('');
    const onTextChange = (e: any) => setQuestionText(e.target.value);

    const [answers, setAnswers] = useState<
        { id: number; isRight: boolean; answerText: string; rightAnswerText: string }[]
    >([]);

    const [addTestItem, { isLoading: addIsLoading }] = courseApi.useAddTestItemMutation();
    const [addRatioTestItem, { isLoading: addRatioIsLoading }] = courseApi.useAddRatioTestItemMutation();

    const clear = () => {
        setAnswers([]);
        setQuestionText('');
    };

    const onAddClick = () => {
        if (!questionText) message.error('Введите текст вопроса');
        else if (type === 'OneAnswer' && answers.length === 0) message.error('Введите хотя бы один ответ');
        else if (type === 'OneAnswer' && !answers.some((item) => item.isRight))
            message.error('Выберите хотя бы один ответ');
        else if (type !== 'Correlate') {
            addTestItem({
                testUnitId,
                questionText,
                itemType: type,
                answerDTOs: answers.map(({ answerText, isRight }) => ({
                    isRight: type === 'OpenAnswer' ? true : isRight,
                    answerText,
                })),
            })
                .unwrap()
                .then(clear, (err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        } else {
            addRatioTestItem({
                testUnitId,
                questionText,
                ratioQuestions: answers.map(({ answerText, rightAnswerText }) => ({
                    questionText: answerText,
                    rightAnswerText,
                })),
            })
                .unwrap()
                .then(clear, (err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        }
    };

    return (
        <div>
            <Space direction='vertical' size={20} className={styles.input}>
                <Typography>Текст вопроса:</Typography>
                <Button onClick={toggleMarkdown}>Посмотреть текст вопроса</Button>
                {!markdownShow && <TextArea autoSize value={questionText} onChange={onTextChange} />}
                {markdownShow && <Markdown children={questionText} />}
            </Space>
            <Space size={20} className={styles.space}>
                <Typography>Тип:</Typography>
                <Radio.Group value={type} onChange={onTypeChange}>
                    <Radio value='OneAnswer'>С одним вариантом ответа</Radio>
                    <Radio value='MultipleAnswers'>С несколькими вариантами ответа</Radio>
                    <Radio value='Correlate'>Сопоставление</Radio>
                    <Radio value='OpenAnswer'>С открытым ответом</Radio>
                </Radio.Group>
            </Space>
            <div className={styles.space}>
                {answers.map((answer, index) => (
                    <div key={answer.id} className={styles.answer}>
                        {type === 'OneAnswer' && (
                            <>
                                <Radio
                                    checked={answer.isRight}
                                    onClick={() =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, isRight: true } : { ...item, isRight: false }
                                            )
                                        )
                                    }
                                />
                                <Input
                                    value={answer.answerText}
                                    onChange={(e) =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, answerText: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                            </>
                        )}
                        {type === 'MultipleAnswers' && (
                            <>
                                <Checkbox
                                    checked={answer.isRight}
                                    onClick={() =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, isRight: !item.isRight } : item
                                            )
                                        )
                                    }
                                />
                                <Input
                                    value={answer.answerText}
                                    onChange={(e) =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, answerText: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                            </>
                        )}
                        {type === 'Correlate' && (
                            <>
                                <Input
                                    value={answer.answerText}
                                    onChange={(e) =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, answerText: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                                <Input
                                    value={answer.rightAnswerText}
                                    onChange={(e) =>
                                        setAnswers((prev) =>
                                            prev.map((item, i) =>
                                                i === index ? { ...item, rightAnswerText: e.target.value } : item
                                            )
                                        )
                                    }
                                />
                            </>
                        )}
                        {type === 'OpenAnswer' && (
                            <Input
                                value={answer.answerText}
                                onChange={(e) =>
                                    setAnswers((prev) =>
                                        prev.map((item, i) =>
                                            i === index ? { ...item, answerText: e.target.value } : item
                                        )
                                    )
                                }
                            />
                        )}
                        <Button onClick={() => setAnswers((prev) => prev.filter((_, i) => i !== index))}>
                            <CloseOutlined />
                        </Button>
                    </div>
                ))}
            </div>
            <Space>
                <Button type='primary' onClick={onAddClick} loading={addIsLoading || addRatioIsLoading}>
                    Добавить
                </Button>
                <Button
                    onClick={() =>
                        setAnswers((prev) => [
                            ...prev,
                            {
                                id: Math.random(),
                                isRight: false,
                                answerText: `Ответ ${answers.length + 1}`,
                                rightAnswerText: '',
                            },
                        ])
                    }>
                    Добавить ответ
                </Button>
            </Space>
        </div>
    );
};

export default AddTestItem;
