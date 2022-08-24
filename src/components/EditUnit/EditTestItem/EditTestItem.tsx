import { Button, Checkbox, List, message, Radio, Space, Typography } from 'antd';
import EditAnswerButton from '../EditAnswerButton';
import { answerAPI } from '../../../services/answerService';
import AddAnswerButton from '../AddAnswerButton';
import { courseApi } from '../../../services/courseService';
import EditTestItemButton from '../EditTestItemButton';
import React, { FC } from 'react';
import { AdminTestItem } from '../../../types/AdminTestItem';
import { DeleteOutlined } from '@ant-design/icons';

import styles from '../EditUnit.module.scss';

type EditTestItemProps = {
    className?: string;
    testItem: AdminTestItem;
};

const EditTestItem: FC<EditTestItemProps> = ({ testItem }) => {
    const [deleteAnswer] = answerAPI.useDeleteAnswerMutation();
    const [changeAnswer] = answerAPI.useChangeAnswerMutation();
    const [deleteItem] = courseApi.useDeleteTestItemMutation();

    const onDelete = (id: number) => () => {
        message.loading({ content: 'Загрузка', key: id });
        deleteAnswer({ answerId: id, testItemId: testItem.id })
            .unwrap()
            .then(
                () => message.success({ content: 'Удалено', key: id }),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    const onChange = (answer: { id: number; text: string; isRight: boolean }) => () => {
        message.loading({ content: 'Загрузка', key: answer.id });
        if (testItem.itemType === 'OneAnswer') {
            testItem.answers?.forEach((item) => {
                if (item.isRight) {
                    changeAnswer({
                        answerId: item.id,
                        testItemId: testItem.id,
                        answerText: item.text,
                        isRight: false,
                    });
                }
            });
        }
        changeAnswer({
            answerId: answer.id,
            testItemId: testItem.id,
            answerText: answer.text,
            isRight: !answer.isRight,
        })
            .unwrap()
            .then(
                () => message.success({ content: 'Сохранено', key: answer.id }),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    const onDeleteItem = () => {
        message.loading({ content: 'Загрузка', key: testItem.id });
        deleteItem(testItem.id)
            .unwrap()
            .then(
                () => message.success({ content: 'Удалено', key: testItem.id }),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );
    };

    let TestItemType = '';
    switch (testItem.itemType) {
        case 'Correlate':
            TestItemType = 'Сопоставление';
            break;
        case 'MultipleAnswers':
            TestItemType = 'С несколькими вариантами ответа';
            break;
        case 'OneAnswer':
            TestItemType = 'С одним вариантом ответа';
            break;
        case 'OpenAnswer':
            TestItemType = 'С открытым ответом';
            break;
    }

    return (
        <Space direction='vertical' className={styles.fullWidth}>
            <div className={styles.answerHeader}>
                <Typography>{testItem.questionText}</Typography>
                <div>
                    <EditTestItemButton testItem={testItem} />
                    <Button onClick={onDeleteItem}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>
            <Typography.Text type='secondary'>Тип: {TestItemType}</Typography.Text>

            {testItem.answers && (
                <List
                    bordered
                    dataSource={testItem.answers}
                    renderItem={(answer) => (
                        <List.Item>
                            <Space size={20}>
                                {testItem.itemType === 'OneAnswer' && (
                                    <Radio checked={answer.isRight} onClick={onChange(answer)} />
                                )}
                                {testItem.itemType === 'MultipleAnswers' && (
                                    <Checkbox checked={answer.isRight} onClick={onChange(answer)} />
                                )}
                                <Typography>{answer.text}</Typography>
                            </Space>
                            <div>
                                <EditAnswerButton answer={answer} testItemId={testItem.id} />
                                <Button onClick={onDelete(answer.id)}>
                                    <DeleteOutlined />
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            )}
            {testItem.getRatioQuestions && (
                <List
                    bordered
                    dataSource={testItem.getRatioQuestions}
                    renderItem={(answer) => (
                        <List.Item>
                            <Space>
                                <Typography>{answer.questionText}</Typography>-
                                <Typography>{answer.answerText}</Typography>
                            </Space>
                            <div>
                                <EditAnswerButton ratioQuestions={answer} testItemId={testItem.id} />
                                <Button>
                                    <DeleteOutlined />
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            )}
            <AddAnswerButton testItemId={testItem.id} isRatio={testItem.itemType === 'Correlate'} />
        </Space>
    );
};

export default EditTestItem;
