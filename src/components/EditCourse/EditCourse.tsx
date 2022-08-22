import { Button, Form, Input, List, message, Radio, Space, Spin, Typography } from 'antd';
import EditSubItemButton from './EditSubItemButton/EditSubItemButton';
import AddSubItemButton from './AddSubItemButton/AddSubItemButton';
import { ADMIN_COURSE_ROUTE, EDIT_UNIT_ROUTE } from '../../routes';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { courceApi } from '../../services/courseService';
import React, { FC, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './EditCourse.module.scss';

type EditCourseProps = {
    className?: string;
};

const EditCourse: FC<EditCourseProps> = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [markdownShow, setMarkdownShow] = useState(false);
    const textarea = useRef<TextAreaRef>(null);

    const [addCourse, { isLoading }] = courceApi.useAddCourseMutation();
    const [updateCourse, { isLoading: updIsLoading }] = courceApi.useChangeCourseMutation();
    const [addTheoryUnit, { isLoading: addTheoryIsLoading }] = courceApi.useAddTheoryUnitMutation();
    const [addTestUnit, { isLoading: addTestIsLoading }] = courceApi.useAddTestUnitMutation();
    const { data: course, isLoading: CourseIsLoading } = courceApi.useGetCourseQuery(Number(id), {
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

    const onAddBlockFinish = (subitemId: number) => (values: any) => {
        if (values.type === 'Theory') {
            addTheoryUnit({
                courseSubItemId: subitemId,
                title: values.title,
                body: '',
            })
                .unwrap()
                .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        } else {
            addTestUnit({
                courseSubItemId: subitemId,
                title: values.title,
            })
                .unwrap()
                .catch((err) => message.error(err.data?.message ?? 'Произошла ошибка'));
        }
    };

    if (CourseIsLoading) return <Spin />;

    return (
        <>
            <Typography className={styles.space}>Вы можете изменять структуру курса</Typography>
            <Form className={styles.space} name='course' layout='vertical' onFinish={onCourseFinish} autoComplete='off'>
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
                    <TextArea />
                </Form.Item>
                <Button className={styles.space} onClick={() => setMarkdownShow((prev) => !prev)}>
                    Посмотреть страницу
                </Button>
                <Form.Item
                    label='Описание (Markdown)'
                    name='description'
                    style={markdownShow ? { display: 'none' } : undefined}
                    initialValue={course?.description}
                    rules={[{ required: true, message: 'Пожалуйста введите описание' }]}>
                    <TextArea ref={textarea} />
                </Form.Item>
                {markdownShow && (
                    <ReactMarkdown
                        className={`markdown-body ${styles.space}`}
                        children={textarea.current?.resizableTextArea?.textArea.value!}
                    />
                )}
                <Form.Item>
                    <Button loading={isLoading || updIsLoading} type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
            {course && (
                <List
                    size='small'
                    bordered
                    className={styles.space}
                    dataSource={course.subItems}
                    renderItem={(subItem) => (
                        <List.Item className={styles.item}>
                            <div className={styles.info}>
                                <Typography>{subItem.title}</Typography>
                                <div>
                                    <EditSubItemButton id={subItem.id} />
                                    <Button disabled>
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            </div>

                            <List
                                size='small'
                                bordered
                                className={styles.space}
                                dataSource={subItem.units}
                                renderItem={(unit) => (
                                    <List.Item className={styles.company}>
                                        <Space size={20}>
                                            <Typography>{unit.type === 'Theory' ? 'Теория' : 'Практика'}</Typography>
                                            <Typography>{unit.title}</Typography>
                                        </Space>
                                        <div>
                                            <Button
                                                onClick={() => navigate(`${EDIT_UNIT_ROUTE}/${unit.type}/${unit.id}`)}>
                                                <EditOutlined />
                                            </Button>
                                            <Button disabled>
                                                <DeleteOutlined />
                                            </Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <Form
                                name='addBlock'
                                initialValues={{ remember: true }}
                                layout='inline'
                                onFinish={onAddBlockFinish(subItem.id)}
                                autoComplete='off'>
                                <Form.Item
                                    label='Тип'
                                    name='type'
                                    initialValue='Theory'
                                    rules={[{ required: true, message: 'Пожалуйста выберите тип' }]}>
                                    <Radio.Group>
                                        <Radio value='Theory'>Теория</Radio>
                                        <Radio value='Test'>Практка</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label='Название блока'
                                    name='title'
                                    className={styles.titleBlock}
                                    rules={[{ required: true, message: 'Пожалуйста выберите тип' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        loading={addTheoryIsLoading || addTestIsLoading}
                                        type='primary'
                                        htmlType='submit'>
                                        Добавить блок
                                    </Button>
                                </Form.Item>
                            </Form>
                        </List.Item>
                    )}
                />
            )}
            {course && <AddSubItemButton course={course} />}
        </>
    );
};

export default EditCourse;
