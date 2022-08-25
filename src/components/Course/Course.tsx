import { ArrowLeftOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Space, Spin, Typography } from 'antd';
import { statisticApi } from '../../services/statisticService';
import { courseApi } from '../../services/courseService';
import React, { FC, useEffect, useState } from 'react';
import CourseUnit from './CourseUnit/CourseUnit';
import { useParams } from 'react-router-dom';
import Markdown from '../Markdown/Markdown';

import styles from './Course.module.scss';

const Course: FC = () => {
    const { id } = useParams();
    const { data: course } = courseApi.useGetCourseQuery(Number(id));
    const [addToCourse, { isLoading: addIsLoading }] = courseApi.useAddToCourseMutation();

    const [currentSubItemIndex, setCurrentSubItemIndex] = useState<number | null>(null);
    const [currentUnitIndex, setcurrentUnitIndex] = useState<number | null>(null);

    const [setProgress] = statisticApi.useSetProgressMutation();

    const [visible, setVisible] = useState(false);
    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);

    const toFirstUnit = () => {
        if (course && course.isUserInCourse) setCurrentSubItemIndex(0);
    };

    const backToSubItem = () => setcurrentUnitIndex(null);
    const backToDescription = () => setCurrentSubItemIndex(null);

    useEffect(toFirstUnit, []);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentSubItemIndex, currentUnitIndex]);

    const onUnitClick = (index: number) => () => {
        setcurrentUnitIndex(index);
        setVisible(false);
    };
    const onSubItemClick = (index: number) => () => {
        setCurrentSubItemIndex(index);
        setVisible(false);
    };

    const onAddClick = () =>
        addToCourse(id!)
            .unwrap()
            .then(
                () => setCurrentSubItemIndex(0),
                (err) => message.error(err.data?.message ?? 'Произошла ошибка')
            );

    const onNext = (saveProgress = true) => {
        if (course && currentSubItemIndex !== null && currentUnitIndex !== null) {
            const currentUnit = course.subItems[currentSubItemIndex].units[currentUnitIndex];
            if (saveProgress && !currentUnit.isComplete) {
                message.loading({ content: 'Сохранение', key: currentUnit.id });
                setProgress({ courseId: course.courseId, unitId: currentUnit.id })
                    .unwrap()
                    .then(
                        () => message.success({ content: 'Сохранено', key: currentUnit.id }),
                        (err) =>
                            message.error({ content: err.data?.message ?? 'Произошла ошибка', key: currentUnit.id })
                    );
            }
            if (currentUnitIndex === course.subItems[currentSubItemIndex].units.length - 1) {
                if (currentSubItemIndex !== course.subItems.length - 1) {
                    setCurrentSubItemIndex(currentSubItemIndex + 1);
                    setcurrentUnitIndex(null);
                } else {
                    // TODO
                }
            } else {
                setcurrentUnitIndex(currentUnitIndex + 1);
            }
        }
    };

    const currentSubItem = course && currentSubItemIndex !== null ? course.subItems[currentSubItemIndex] : undefined;
    const currentUnit =
        currentSubItem && currentUnitIndex !== null ? currentSubItem.units[currentUnitIndex] : undefined;

    const canStartSubItem = !!(currentSubItem?.units.length !== 0);
    const canNextSubItem = !(course && currentSubItemIndex === course.subItems.length - 1);
    const canNextUnit = !(!canNextSubItem && currentSubItem && currentUnitIndex === currentSubItem.units.length - 1);

    const onStartSubItem = () => {
        if (canStartSubItem) setcurrentUnitIndex(0);
        else if (currentSubItemIndex !== null) setCurrentSubItemIndex(currentSubItemIndex + 1);
    };

    if (!course) return <Spin />;

    return (
        <>
            {!currentSubItem && !currentUnit && (
                <Space direction='vertical' className={styles.space}>
                    <Typography.Title>{course.title}</Typography.Title>
                    <Markdown children={course.description} />
                    {!course.isUserInCourse ? (
                        <Button type='primary' loading={addIsLoading} onClick={onAddClick} className={styles.btn}>
                            Начать курс
                        </Button>
                    ) : (
                        <Button type='primary' onClick={toFirstUnit} className={styles.btn}>
                            Продолжить
                        </Button>
                    )}
                </Space>
            )}
            {currentSubItem && !currentUnit && (
                <Space direction='vertical' className={styles.space}>
                    <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToDescription}>
                        к описанию курса
                    </Button>
                    <Typography.Title>{currentSubItem.title}</Typography.Title>
                    <Markdown children={currentSubItem.description!} />
                    {(canNextSubItem || canStartSubItem) && (
                        <Button type='primary' loading={addIsLoading} onClick={onStartSubItem} className={styles.btn}>
                            {canStartSubItem ? 'Начать' : 'Далее'}
                        </Button>
                    )}
                </Space>
            )}
            {!!currentSubItem && !!currentUnit && (
                <Space direction='vertical' className={styles.space}>
                    <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToSubItem}>
                        к разделу
                    </Button>
                    <Typography.Title>{currentUnit.title}</Typography.Title>
                    <CourseUnit unit={currentUnit} onNext={onNext} canNext={canNextUnit} />
                </Space>
            )}
            {currentSubItem && (
                <Button
                    className={styles.drawerBtn}
                    shape='circle'
                    icon={<MenuFoldOutlined />}
                    size='large'
                    onClick={showDrawer}
                />
            )}
            <Drawer title='Структура курса' placement='right' onClose={onClose} visible={visible}>
                {currentSubItem && currentUnit && (
                    <ul className={styles.list}>
                        {currentSubItem.units.map((unit, index) => (
                            <li
                                className={`${styles.item} ${currentUnit.id === unit.id ? styles.active : ''} ${
                                    unit.isComplete ? styles.completed : ''
                                }`}
                                key={unit.id}
                                onClick={onUnitClick(index)}>
                                {unit.title}
                            </li>
                        ))}
                    </ul>
                )}
                {currentSubItem && !currentUnit && (
                    <ul className={styles.list}>
                        {course.subItems.map((subItem, index) => (
                            <li
                                className={`${styles.item} ${currentSubItem.id === subItem.id ? styles.active : ''}`}
                                key={subItem.id}
                                onClick={onSubItemClick(index)}>
                                {subItem.title}
                            </li>
                        ))}
                    </ul>
                )}
            </Drawer>
        </>
    );
};

export default Course;
