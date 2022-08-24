import { Button, Card, Form, Input, List, message, Radio, Space, Spin, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { SubItemStructure, UnitStructure } from '../../types/CourseStructure';
import EditSubItemButton from './EditSubItemButton/EditSubItemButton';
import AddSubItemButton from './AddSubItemButton/AddSubItemButton';
import { ADMIN_COURSE_ROUTE, EDIT_UNIT_ROUTE } from '../../routes';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { courseApi } from '../../services/courseService';
import React, { FC, useRef, useState } from 'react';
import Markdown from '../Markdown/Markdown';

import styles from './EditCourse.module.scss';

type EditCourseProps = {
    className?: string;
};

const EditCourse: FC<EditCourseProps> = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const textarea = useRef<TextAreaRef>(null);
    const [markdownShow, setMarkdownShow] = useState(false);

    const [addCourse, { isLoading: addIsLoading }] = courseApi.useAddCourseMutation();
    const [updateCourse, { isLoading: updIsLoading }] = courseApi.useChangeCourseMutation();
    const { data: course, isLoading: CourseIsLoading } = courseApi.useGetAdminCourseQuery(Number(id), {
        skip: id === 'create',
    });

    const onCourseFinish = (values: any) => {
        if (id === 'create') {
            addCourse(values)
                .unwrap()
                .then(
                    () => navigate(ADMIN_COURSE_ROUTE),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        } else if (course)
            updateCourse({ id: course.courseId, description: values.description, ...values })
                .unwrap()
                .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
    };

    const backToCourses = () => navigate(ADMIN_COURSE_ROUTE);
    const toggleMarkdown = () => setMarkdownShow((prev) => !prev);

    if (CourseIsLoading) return <Spin />;

    return (
        <Space direction='vertical' className={styles.space}>
            <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToCourses}>
                к списку курсов
            </Button>
            <Card>
                <Typography.Title level={5}>Редактировние курса</Typography.Title>
                <Form name='course' layout='vertical' onFinish={onCourseFinish} autoComplete='off'>
                    <Form.Item
                        label='Название'
                        name='title'
                        initialValue={course?.title}
                        rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='SVG Картинка'
                        name='image'
                        initialValue={course?.image}
                        rules={[{ required: true, message: 'Пожалуйста введите svg код картинки' }]}>
                        <TextArea autoSize={{ maxRows: 10 }} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={toggleMarkdown}>Посмотреть страницу</Button>
                    </Form.Item>
                    <Form.Item
                        label='Описание (Markdown)'
                        name='description'
                        style={markdownShow ? { display: 'none' } : undefined}
                        initialValue={course?.description}
                        rules={[{ required: true, message: 'Пожалуйста введите описание' }]}>
                        <TextArea ref={textarea} autoSize />
                    </Form.Item>
                    {markdownShow && (
                        <Form.Item>
                            <Markdown children={textarea.current?.resizableTextArea?.textArea.value!} />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button loading={addIsLoading || updIsLoading} type='primary' htmlType='submit'>
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {course && (
                <List
                    bordered
                    header={<Typography.Title level={5}>Структура курса</Typography.Title>}
                    dataSource={course.subItems}
                    renderItem={(subItem) => (
                        <List.Item>
                            <SubItem subItem={subItem} />
                        </List.Item>
                    )}
                />
            )}
            {course && <AddSubItemButton course={course} />}
        </Space>
    );
};

const SubItem: FC<{ subItem: SubItemStructure }> = ({ subItem }) => {
    const [addTheoryUnit, { isLoading: addTheoryIsLoading }] = courseApi.useAddTheoryUnitMutation();
    const [addTestUnit, { isLoading: addTestIsLoading }] = courseApi.useAddTestUnitMutation();
    const [deleteSubItem, { isLoading: deleteIsLoading }] = courseApi.useDeleteSubItemMutation();

    const onAddBlockFinish = (values: any) => {
        if (values.type === 'Theory') {
            addTheoryUnit({
                courseSubItemId: subItem.id,
                title: values.title,
                body: '',
            })
                .unwrap()
                .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        } else {
            addTestUnit({
                courseSubItemId: subItem.id,
                title: values.title,
            })
                .unwrap()
                .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        }
    };

    const onDeleteClick = () =>
        deleteSubItem(subItem.id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <Space direction='vertical' className={styles.subItem}>
            <Space className={styles.subItemTitle}>
                <Typography>{subItem.title}</Typography>
                <div>
                    <EditSubItemButton id={subItem.id} />
                    <Button onClick={onDeleteClick} loading={deleteIsLoading}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </Space>

            <List
                bordered
                dataSource={subItem.units}
                renderItem={(unit) => (
                    <List.Item>
                        <UnitItem unit={unit} />
                    </List.Item>
                )}
            />
            <Form
                name='addBlock'
                initialValues={{ remember: true }}
                layout='inline'
                onFinish={onAddBlockFinish}
                autoComplete='off'>
                <Form.Item
                    label='Тип'
                    name='type'
                    initialValue='Theory'
                    rules={[{ required: true, message: 'Пожалуйста выберите тип' }]}>
                    <Radio.Group>
                        <Radio value='Theory'>Теория</Radio>
                        <Radio value='Test'>Практика</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='Название блока'
                    name='title'
                    className={styles.titleInput}
                    rules={[{ required: true, message: 'Пожалуйста введите название' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button loading={addTheoryIsLoading || addTestIsLoading} type='primary' htmlType='submit'>
                        Добавить блок
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
};

const UnitItem: FC<{ unit: UnitStructure }> = ({ unit }) => {
    const navigate = useNavigate();
    const [deleteUnit, { isLoading: deleteIsLoading }] = courseApi.useDeleteUnitMutation();

    const onEditClick = () => navigate(`${EDIT_UNIT_ROUTE}/${unit.type}/${unit.id}`);
    const onDeleteClick = () =>
        deleteUnit(unit.id)
            .unwrap()
            .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));

    return (
        <>
            <Space size={20}>
                <Typography>{unit.type === 'Theory' ? 'Теория' : 'Практика'}</Typography>
                <Typography>{unit.title}</Typography>
            </Space>
            <div>
                <Button onClick={onEditClick}>
                    <EditOutlined />
                </Button>
                <Button onClick={onDeleteClick} loading={deleteIsLoading}>
                    <DeleteOutlined />
                </Button>
            </div>
        </>
    );
};

export default EditCourse;
