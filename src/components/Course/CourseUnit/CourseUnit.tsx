import { Button, Checkbox, Input, message, Radio, Result, Space, Spin, Typography } from 'antd';
import { statisticApi } from '../../../services/statisticService';
import CorrelateInput from '../../CorrelateInput/CorrelateInput';
import { UnitStructure } from '../../../types/CourseStructure';
import { courseApi } from '../../../services/courseService';
import React, { FC, useEffect, useState } from 'react';
import Markdown from '../../Markdown/Markdown';

import styles from './CourseUnit.module.scss';

type CourseUnitProps = {
    unit: UnitStructure;
    onNext?: () => void;
    canNext?: boolean;
};

const CourseUnit: FC<CourseUnitProps> = ({ unit, onNext, canNext }) => {
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
                {canNext && <Button onClick={onNext}>Далее</Button>}
            </Space>
        );

    if (testItemsIsLoading || testItemIsLoading || statisticIsLoading || theoryUnitIsLoading) return <Spin />;

    if (statistic && finished) {
        if (statistic.correctAnswerCount / statistic.questionCount > 0.8) {
            return (
                <Result
                    status='success'
                    title='Поздравляем с успешным прохождением теста!'
                    subTitle={`Вы ответили правильно на ${statistic.correctAnswerCount} из ${statistic.questionCount} вопросов`}
                    extra={
                        canNext
                            ? [
                                  <Button type='primary' onClick={onNext}>
                                      Далее
                                  </Button>,
                              ]
                            : undefined
                    }
                />
            );
        }
        return (
            <Result
                status='error'
                title='Тест не пройден'
                subTitle={`Вы ответили правильно на ${statistic.correctAnswerCount} из ${statistic.questionCount} вопросов`}
                extra={[
                    <Button type='primary' onClick={resetTest}>
                        Попробовать снова
                    </Button>,
                ]}
            />
        );
    }

    return (
        <div>
            {testItem && (
                <Space direction='vertical' size={20} className={styles.fullWidth}>
                    <Markdown children={testItem.questionText} />
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
