import { User } from '../types/User';
import { commonApi } from './commonService';

export const authAPI = commonApi.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => 'api/users/auth-data',
            providesTags: ['User'],
        }),
        checkEmail: builder.query<{ isPasswordExists: boolean }, { email: string }>({
            query: (params) => ({ url: 'api/users/check-email', params }),
        }),
        login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
            query: (data) => ({
                url: '/api/users/login',
                method: 'POST',
                body: data,
            }),
        }),
        registration: builder.mutation<{ accessToken: string }, User>({
            query: (data) => ({
                url: '/api/users/registration',
                method: 'POST',
                body: data,
            }),
        }),
        setPassword: builder.mutation<{ accessToken: string }, { password: string; email: string; token: string }>({
            query: (data) => ({
                url: '/api/users/change-password',
                method: 'PATCH',
                body: data,
            }),
        }),
        update: builder.mutation<void, { email: string; firstName: string; lastName: string }>({
            query: (data) => ({
                url: '/api/users/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        delete: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/users/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});
