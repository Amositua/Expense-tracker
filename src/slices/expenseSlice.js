import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
      totalExpenses: 0,
      expenses: [],
    },
    reducers: {
      setExpenses: (state, action) => {
        state.expenses = action.payload;
      },
      setTotalExpenses: (state, action) => {
        state.totalExpenses = action.payload;
      },
      resetExpenses: (state) => {
        state.totalExpenses = 0;
        state.expenses = [];
      },
    },
  });
  
  export const { setExpenses, setTotalExpenses, resetExpenses } = expenseSlice.actions;
  export default expenseSlice.reducer;
  