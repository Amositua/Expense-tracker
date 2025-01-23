import { apiSlice } from './apiSlice'
import {jwtDecode} from 'jwt-decode'

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logExpense: builder.mutation({
      query: (data) => ({
        url: `/expense/log-expense`,
        method: 'POST',
        body: data,
      }),
    }),
    fetchExpenses: builder.query({
      query: ({ pageNum, pageSize, month, year }) => {
        const endpoint =
          month === 'All' && year === 'All'
            ? `/expense/getAllExpenseWithPagination`
            : `/expense/searchByMonthAndYear`;
        return {
          url: endpoint,
          params: {
            pageNum: month === 'All' && year === 'All' ? pageNum : undefined,
            pageSize: month === 'All' && year === 'All' ? pageSize : undefined,
            month: month !== 'All' ? month : undefined,
            year: year !== 'All' ? year : undefined,
          },
        };
      },
    }),
    getUserExpenses: builder.query({
      query: () => {
        const token = localStorage.getItem('userInfo')
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.userId
        if (!userId) {
          throw new Error('User ID is not available in the token')
        }
        return {
          url: `/expense/get-expense-for-employee/${userId}`, 
          method: 'GET',
        }
      },
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expense/delete-expense/${expenseId}`,
        method: 'DELETE',
      }),
    }),
    getAllExpense: builder.query({
      query: () => ({
        url: `/expense/get-all-expense`,
        method: 'GET'
      })
    })
  }),
})

export const { useGetUserExpensesQuery, useLogExpenseMutation, useDeleteExpenseMutation, useGetAllExpenseQuery } =
  expenseApiSlice
