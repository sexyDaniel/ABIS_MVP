import { Button, Checkbox, Input, List, message, Radio, Space, Spin, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { courseApi } from '../../../services/courseService';
import { statisticApi } from '../../../services/statisticService';
import { UnitStructure } from '../../../types/CourseStructure';
import CorrelateInput from '../../CorrelateInput/CorrelateInput';
import Markdown from '../../Markdown/Markdown';

import styles from './CourseUnit.module.scss';

type CourseUnitProps = {
    className?: string;
    unit: UnitStructure;
    onNext?: () => void;
};

const CourseUnit: FC<CourseUnitProps> = ({ unit, onNext }) => {
    const [checkOneAnswer, { isLoading: oneAnswerIsLoading }] = statisticApi.useCheckOneAnswerMutation();
    const [checkMultipleAnswer, { isLoading: multipleAnswerIsLoading }] = statisticApi.useCheckMultipleAnswerMutation();
    const [checkOpenAnswer, { isLoading: openAnswerIsLoading }] = statisticApi.useCheckOpenAnswerMutation();
    const [checkCorrelateAnswer, { isLoading: correlateAnswerIsLoading }] =
        statisticApi.useCheckCorrelateAnswerMutation();

    const { data: testItems, isLoading: testItemsIsLoading } = courseApi.useGetTestItemsQuery(unit.id, {
        skip: unit.type !== 'Test',
    });
    const { data: theoryUnit, isLoading: theoryUnitIsLoading } = courseApi.useGetTheoryUnitQuery(unit.id, {
        skip: unit.type !== 'Theory',
    });
    const [currentTestItemIndex, setCurrentTestItemIndex] = useState<number | null>(null);
    const { data: testItem, isLoading: testItemIsLoading } = courseApi.useGetTestItemQuery(
        testItems ? testItems[currentTestItemIndex!] : 0,
        {
            skip: currentTestItemIndex === null,
        }
    );

    const [answer, setAnswer] = useState<any>(null);
    const [finished, setFinished] = useState(false);
    const { data: statistic, isLoading: statisticIsLoading } = statisticApi.useGetStatisticQuery(unit.id, {
        skip: !finished,
    });

    const nextTestItem = () => {
        if (testItems && currentTestItemIndex !== null) {
            let check;
            if (testItem?.itemType === 'OneAnswer') {
                check = checkOneAnswer({ testItemId: testItem.id, testUnitId: unit.id, answerId: answer }).unwrap();
            } else if (testItem?.itemType === 'MultipleAnswers') {
                check = checkMultipleAnswer({ testItemId: testItem.id, testUnitId: unit.id, answers: answer }).unwrap();
            } else if (testItem?.itemType === 'OpenAnswer') {
                check = checkOpenAnswer({ testItemId: testItem.id, testUnitId: unit.id, answerText: answer }).unwrap();
            } else if (testItem?.itemType === 'Correlate') {
                check = checkCorrelateAnswer({
                    testItemId: testItem.id,
                    testUnitId: unit.id,
                    answers: answer,
                }).unwrap();
            }
            check?.then(
                () => {
                    if (currentTestItemIndex === testItems.length - 1) {
                        setFinished(true);
                    } else {
                        setCurrentTestItemIndex((prev) => prev! + 1);
                    }
                },
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
        }
    };

    const resetTest = () => {
        setCurrentTestItemIndex(0);
        setFinished(false);
    };

    useEffect(() => {
        if (testItems) setCurrentTestItemIndex(0);
    }, [testItems]);

    if (unit.type === 'Theory' && theoryUnit)
        return (
            <Space direction='vertical' size={20}>
                <Markdown children={theoryUnit.body} />
                <Button onClick={onNext}>Далее</Button>
            </Space>
        );

    if (testItemsIsLoading || testItemIsLoading || statisticIsLoading || theoryUnitIsLoading) return <Spin />;

    if (statistic && finished) {
        return (
            <Space size={20} direction='vertical'>
                <Typography>
                    Вы ответили правильно на {statistic.correctAnswerCount} из {statistic.questionCount} вопросов
                </Typography>
                {statistic.correctAnswerCount / statistic.questionCount > 0.8 ? (
                    <Button type='primary' onClick={onNext}>
                        Далее
                    </Button>
                ) : (
                    <Button type='primary' onClick={resetTest}>
                        Попробовать снова
                    </Button>
                )}
            </Space>
        );
    }

    return (
        <div>
            {testItem && (
                <Space direction='vertical' size={20} className={styles.fullWidth}>
                    <Typography>{testItem.questionText}</Typography>
                    {testItem.itemType === 'OneAnswer' && (
                        <Radio.Group onChange={(value) => setAnswer(value.target.value)}>
                            <Space direction='vertical'>
                                {testItem.answerDTOs?.map(({ id, text }) => (
                                    <Radio key={id} value={id}>
                                        {text}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                    {testItem.itemType === 'MultipleAnswers' && (
                        <Checkbox.Group onChange={(values) => setAnswer(values)}>
                            <Space direction='vertical'>
                                {testItem.answerDTOs?.map(({ id, text }) => (
                                    <Checkbox key={id} value={id}>
                                        {text}
                                    </Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    )}
                    {testItem.itemType === 'OpenAnswer' && <Input onChange={(e) => setAnswer(e.target.value)} />}
                    {testItem.itemType === 'Correlate' && (
                        <CorrelateInput
                            questions={testItem.ratioQuestions!}
                            answers={testItem.ratioAnswers!}
                            onChange={(values) =>
                                setAnswer(
                                    values.map((value) => ({
                                        ratioQuestionId: value.question.id,
                                        ratioAnswerId: value.answer.id,
                                    }))
                                )
                            }
                        />
                    )}
                    <Button
                        onClick={nextTestItem}
                        loading={
                            oneAnswerIsLoading ||
                            multipleAnswerIsLoading ||
                            openAnswerIsLoading ||
                            correlateAnswerIsLoading
                        }>
                        Далее
                    </Button>
                </Space>
            )}
        </div>
    );
};

export default CourseUnit;
