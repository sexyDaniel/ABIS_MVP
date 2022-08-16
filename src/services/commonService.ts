import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers) => {
            if (localStorage.getItem('accessToken')) {
                headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
