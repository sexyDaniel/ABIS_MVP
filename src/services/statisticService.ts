import { AdminStatistic } from '../types/AdminStatistic';
import { commonApi } from './commonService';

export const statisticApi = commonApi.enhanceEndpoints({ addTagTypes: ['Statistic', 'Structure'] }).injectEndpoints({
    endpoints: (builder) => ({
        checkOneAnswer: builder.mutation<void, { testUnitId: number; testItemId: number; answerId: number }>({
            query: (data) => ({
                url: '/api/statistics/check-one-answer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Statistic'],
        }),
        checkOpenAnswer: builder.mutation<void, { testUnitId: number; testItemId: number; answerText: string }>({
            query: (data) => ({
                url: '/api/statistics/check-open-answer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Statistic'],
        }),
        checkMultipleAnswer: builder.mutation<void, { testUnitId: number; testItemId: number; answers: number[] }>({
            query: (data) => ({
                url: '/api/statistics/check-multiple-answer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Statistic'],
        }),
        checkCorrelateAnswer: builder.mutation<
            void,
            {
                testUnitId: number;
                testItemId: number;
                answers: { ratioQuestionId: number; ratioAnswerId: number };
            }
        >({
            query: (data) => ({
                url: '/api/statistics/check-correlate-answer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Statistic'],
        }),
        getStatistic: builder.query<{ questionCount: number; correctAnswerCount: number }, number>({
            query: (id) => `/api/users/user/test-units/${id}/statistics`,
            providesTags: ['Statistic'],
        }),
        getAdminStatistic: builder.query<AdminStatistic, number>({
            query: (id) => `/api/company/${id}/statistics`,
        }),

        setProgress: builder.mutation<void, { courseId: number; unitId: number }>({
            query: (data) => ({
                url: `/api/units/${data.unitId}/progress/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Structure'],
        }),
    }),
});
