import { Role } from '../types/Role';
import { commonApi } from './commonService';

export const usersApi = commonApi.enhanceEndpoints({ addTagTypes: ['Users'] }).injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation<
            void,
            {
                email: string;
                passwordSavedLink: string;
                companyId: number;
                role: Role;
            }
        >({
            query: (data) => ({
                url: '/api/users/create-user',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        addUsers: builder.mutation<
            void,
            {
                emails: string[];
                passwordSavedLink: string;
                companyId: number;
            }
        >({
            query: (data) => ({
                url: '/api/users/create-users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});
