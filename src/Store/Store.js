import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer'; 
import ExpenseReducer from './ExpenseReducer';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    expenses: ExpenseReducer, 
  },
});

export default store;
