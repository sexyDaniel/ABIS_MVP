import { courseApi } from '../../services/courseService';
import { Affix, Button, Menu, Spin, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { SubItemStructure, UnitStructure } from '../../types/CourseStructure';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CourseUnit from './CourseUnit/CourseUnit';
import { useParams } from 'react-router-dom';
import Markdown from '../Markdown/Markdown';

import styles from './Course.module.scss';

const Course: FC = () => {
    const { id } = useParams();
    const { data: course } = courseApi.useGetCourseQuery(Number(id));
    const [addToCourse, { isLoading: addIsLoading }] = courseApi.useAddToCourseMutation();
    const [currentSubItem, setCurrentSubItem] = useState<SubItemStructure | null>(null);
    const [currentUnit, setcurrentUnit] = useState<UnitStructure | null>(null);

    const onAddClick = () => addToCourse(id!);
    const toFirstUnit = () => {
        if (course && course.isUserInCourse) {
            setCurrentSubItem(course.subItems[0] ?? null);
            setcurrentUnit(course.subItems[0]?.units[0] ?? null);
        }
    };

    useEffect(toFirstUnit, [course]);

    const onStartSubItem = () => setcurrentUnit(currentSubItem?.units[0] ?? null);
    const onUnitClick = (unit: UnitStructure) => () => setcurrentUnit(unit);
    const onSubItemClick = (subItem: SubItemStructure) => () => setCurrentSubItem(subItem);
    const backToSubItem = () => setcurrentUnit(null);
    const backToDescription = () => setCurrentSubItem(null);
    const onNext = () => {
        if (course && currentSubItem && currentUnit) {
            const unitIndex = currentSubItem.units.indexOf(currentUnit);
            if (unitIndex === currentSubItem.units.length - 1) {
                const subItemIndex = course.subItems.indexOf(currentSubItem);
                if (subItemIndex !== course.subItems.length - 1) {
                    setCurrentSubItem(course.subItems[subItemIndex + 1]);
                    setcurrentUnit(null);
                }
            } else {
                setcurrentUnit(currentSubItem.units[unitIndex + 1]);
            }
        }
    };

    if (!course) return <Spin />;

    return (
        <div className={styles.wrapper}>
            {!currentSubItem && !currentUnit && (
                <>
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
                </>
            )}
            <div className={styles.content}>
                {currentSubItem && !currentUnit && (
                    <>
                        <button className={styles.backBtn} onClick={backToDescription}>
                            <ArrowLeftOutlined />к описанию курса
                        </button>
                        <Typography.Title>{currentSubItem.title}</Typography.Title>
                        <Markdown children={currentSubItem.description!} />
                        <Button type='primary' loading={addIsLoading} onClick={onStartSubItem} className={styles.btn}>
                            Начать
                        </Button>
                    </>
                )}
                {!!currentSubItem && !!currentUnit && (
                    <>
                        <button className={styles.backBtn} onClick={backToSubItem}>
                            <ArrowLeftOutlined />к разделу
                        </button>
                        <Typography.Title>{currentUnit.title}</Typography.Title>
                        <CourseUnit unit={currentUnit} onNext={onNext} />
                    </>
                )}
            </div>
            {currentSubItem && currentUnit && (
                <Affix className={styles.affix} offsetTop={10}>
                    <ul className={styles.list}>
                        {currentSubItem.units.map((unit) => (
                            <li
                                className={`${styles.item} ${currentUnit.id === unit.id ? styles.active : ''}`}
                                key={unit.id}
                                onClick={onUnitClick(unit)}>
                                {unit.title}
                            </li>
                        ))}
                    </ul>
                </Affix>
            )}
            {currentSubItem && !currentUnit && (
                <Affix className={styles.affix} offsetTop={10}>
                    <ul className={styles.list}>
                        {course.subItems.map((subItem) => (
                            <li
                                className={`${styles.item} ${currentSubItem.id === subItem.id ? styles.active : ''}`}
                                key={subItem.id}
                                onClick={onSubItemClick(subItem)}>
                                {subItem.title}
                            </li>
                        ))}
                    </ul>
                </Affix>
            )}
        </div>
    );
};

export default Course;
