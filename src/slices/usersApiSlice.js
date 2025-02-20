import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `auth/admin-login`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (accessToken) => ({
        url: 'auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseHandler: (response) => response.text(),
      }),
    }),
}),
});

export const {
    useAdminLoginMutation,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
  } = userApiSlice;