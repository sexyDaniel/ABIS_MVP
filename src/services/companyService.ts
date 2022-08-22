import { commonApi } from './commonService';
import { Company } from '../types/Company';
import { User } from '../types/User';

export const companyApi = commonApi.enhanceEndpoints({ addTagTypes: ['Company', 'Users'] }).injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query<Company[], void>({
            query: () => 'api/companies',
            providesTags: ['Company'],
        }),
        getUsers: builder.query<User[], number>({
            query: (id) => `/api/companies/${id}/users`,
            providesTags: ['Users'],
        }),
        getAdmins: builder.query<User[], number>({
            query: (id) => `/api/companies/${id}/admins`,
            providesTags: ['Users'],
        }),
        addCompany: builder.mutation<void, Company>({
            query: (data) => ({
                url: '/api/companies/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Company'],
        }),
        changeCompany: builder.mutation<void, Company>({
            query: (data) => ({
                url: `/api/companies/${data.id}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Company'],
        }),
        deleteCompany: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/companies/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Company'],
        }),
    }),
});
