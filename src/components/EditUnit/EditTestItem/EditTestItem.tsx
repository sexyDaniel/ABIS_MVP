import { Button, Checkbox, List, message, Radio, Space, Typography } from 'antd';
import EditAnswerButton from '../EditAnswerButton';
import { answerAPI } from '../../../services/answerService';
import AddAnswerButton from '../AddAnswerButton';
import { courceApi } from '../../../services/courseService';
import EditTestItemButton from '../EditTestItemButton';
import React, { FC } from 'react';
import { TestItem } from '../../../types/TestItem';
import { DeleteOutlined } from '@ant-design/icons';

import styles from '../EditUnit.module.scss';

type EditTestItemProps = {
    className?: string;
    testItem: TestItem;
};

const EditTestItem: FC<EditTestItemProps> = ({ testItem }) => {
    const [deleteAnswer] = answerAPI.useDeleteAnswerMutation();
    const [changeAnswer] = answerAPI.useChangeAnswerMutation();
    const [deleteItem] = courceApi.useDeleteTestItemMutation();

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
        message.loading('Загрузка');
        deleteItem(testItem.id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
    };

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

            {testItem.answers && (
                <List
                    size='small'
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
                    size='small'
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
