import { commonApi } from './commonService';
import { Course } from '../types/Course';
import { CourseStructure } from '../types/CourseStructure';
import { SubItem } from '../types/SubItem';
import { TheoryUnit } from '../types/TheoryUnit';
import { TestUnit } from '../types/TestUnit';
import { AdminTestItem } from '../types/AdminTestItem';
import { TestItem } from '../types/TestItem';

export const courseApi = commonApi
    .enhanceEndpoints({ addTagTypes: ['AdminCourses', 'Courses', 'UserCourses', 'Structure', 'TestItems', 'SubItem'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAdminCourses: builder.query<Course[], void>({
                query: () => 'api/courses/for-super-admin',
                providesTags: ['AdminCourses'],
            }),
            getCourses: builder.query<Course[], void>({
                query: () => 'api/courses',
                providesTags: ['Courses'],
            }),
            getUserCourses: builder.query<Course[], void>({
                query: () => 'api/courses/for-user',
                providesTags: ['UserCourses'],
            }),
            getAdminCourse: builder.query<CourseStructure, number>({
                query: (id) => `/api/courses/${id}/for-super-admin`,
                providesTags: ['Structure'],
            }),
            getCourse: builder.query<CourseStructure, number>({
                query: (id) => `/api/courses/${id}/for-user`,
                providesTags: ['Structure'],
            }),
            addCourse: builder.mutation<void, Course>({
                query: (data) => ({
                    url: '/api/courses/create',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['Courses', 'AdminCourses'],
            }),
            addToCourse: builder.mutation<void, string>({
                query: (id) => ({
                    url: `/api/courses/${id}/add-to-course`,
                    method: 'POST',
                }),
                invalidatesTags: ['UserCourses', 'Structure'],
            }),
            changeCourse: builder.mutation<void, Course>({
                query: (data) => ({
                    url: `/api/courses/${data.id}/update`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['Courses', 'AdminCourses', 'Structure'],
            }),
            changeStatusCourse: builder.mutation<void, number>({
                query: (id) => ({
                    url: `/api/courses/${id}/change-status`,
                    method: 'PATCH',
                }),
                invalidatesTags: ['Courses', 'AdminCourses'],
            }),

            getSubItem: builder.query<SubItem, number>({
                query: (id) => `/api/course-sub-items/${id}/for-super-admin`,
                providesTags: ['SubItem'],
            }),
            addSubItem: builder.mutation<void, SubItem>({
                query: (data) => ({
                    url: '/api/course-sub-items/create',
                    method: 'POST',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure'],
            }),
            changeSubItem: builder.mutation<void, SubItem>({
                query: (data) => ({
                    url: `/api/course-sub-items/${data.id}/update`,
                    method: 'PUT',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure', 'SubItem'],
            }),

            getAdminTheoryUnit: builder.query<TheoryUnit, number>({
                query: (id) => `/api/theory-units/${id}/for-super-admin`,
            }),
            getTheoryUnit: builder.query<TheoryUnit, number>({
                query: (id) => `/api/theory-units/${id}/for-user`,
            }),
            addTheoryUnit: builder.mutation<void, TheoryUnit>({
                query: (data) => ({
                    url: '/api/theory-units/create',
                    method: 'POST',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure'],
            }),
            changeTheoryUnit: builder.mutation<void, TheoryUnit>({
                query: (data) => ({
                    url: `/api/theory-units/${data.id}/update`,
                    method: 'PUT',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure'],
            }),

            getTestUnit: builder.query<TestUnit, number>({
                query: (id) => `/api/test-units/${id}/for-super-admin`,
            }),
            addTestUnit: builder.mutation<void, TestUnit>({
                query: (data) => ({
                    url: '/api/test-units/create',
                    method: 'POST',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure'],
            }),
            changeTestUnit: builder.mutation<void, TestUnit>({
                query: (data) => ({
                    url: `/api/test-units/${data.id}/update`,
                    method: 'PUT',
                    body: { number: 1, ...data },
                }),
                invalidatesTags: ['Structure'],
            }),

            getAdminTestItems: builder.query<AdminTestItem[], number>({
                query: (id) => `/api/test-unit/${id}/test-items/for-super-admin`,
                providesTags: ['TestItems'],
            }),
            getTestItems: builder.query<number[], number>({
                query: (id) => `/api/test-units/${id}/test-items`,
            }),
            getTestItem: builder.query<TestItem, number>({
                query: (id) => `/api/test-items/${id}`,
            }),
            changeTestItem: builder.mutation<void, { id: number; questionText: string }>({
                query: (data) => ({
                    url: '/api/test-items/update',
                    method: 'PUT',
                    body: data,
                }),
                invalidatesTags: ['TestItems'],
            }),
            deleteTestItem: builder.mutation<void, number>({
                query: (id) => ({
                    url: `/api/test-items/${id}/delete`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['TestItems'],
            }),
            addTestItem: builder.mutation<
                void,
                {
                    testUnitId: number;
                    questionText: string;
                    itemType: 'OneAnswer' | 'MultipleAnswers' | 'OpenAnswer';
                    answerDTOs: { answerText: string; isRight: boolean }[];
                }
            >({
                query: (data) => ({
                    url: '/api/test-items/create',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['TestItems'],
            }),
            addRatioTestItem: builder.mutation<
                void,
                {
                    testUnitId: number;
                    questionText: string;
                    ratioQuestions: { questionText: string; rightAnswerText: string }[];
                }
            >({
                query: (data) => ({
                    url: '/api/test-items/create-ratio',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['TestItems'],
            }),
        }),
    });
