import { commonApi } from './commonService';

export const answerAPI = commonApi.enhanceEndpoints({ addTagTypes: ['TestItems'] }).injectEndpoints({
    endpoints: (builder) => ({
        addAnswer: builder.mutation<void, { testItemId: number; answerText: string; isRight: boolean }>({
            query: (data) => ({
                url: '/api/answers/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TestItems'],
        }),
        changeAnswer: builder.mutation<
            void,
            { answerId: number; testItemId: number; answerText: string; isRight: boolean }
        >({
            query: (data) => ({
                url: `/api/answers/${data.answerId}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['TestItems'],
        }),
        deleteAnswer: builder.mutation<void, { answerId: number; testItemId: number }>({
            query: (data) => ({
                url: `/api/test-items/${data.testItemId}/answers/${data.answerId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TestItems'],
        }),

        addRatioAnswer: builder.mutation<void, { testItemId: number; answerText: string; questionText: string }>({
            query: (data) => ({
                url: '/api/ratio-questions/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TestItems'],
        }),
        changeRatioAnswer: builder.mutation<
            void,
            { ratioQuestionId: number; testItemId: number; questionText: string; answerText: string }
        >({
            query: (data) => ({
                url: `/api/ratio-questions/${data.ratioQuestionId}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['TestItems'],
        }),
        deleteRatioAnswer: builder.mutation<void, { ratioQuestionId: number; testItemId: number }>({
            query: (data) => ({
                url: `/api/test-items/${data.testItemId}/ratio-questions/${data.ratioQuestionId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TestItems'],
        }),
    }),
});
