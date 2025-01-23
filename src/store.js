import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
// import expenseReducer from './slices/expenseApiSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // expenses: expenseReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
