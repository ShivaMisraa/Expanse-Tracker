import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer'; 
import ExpenseReducer from './ExpenseReducer';
import themeReducer from './themeReducer';


const store = configureStore({
  reducer: {
    auth: authReducer, 
    expenses: ExpenseReducer, 
    theme: themeReducer,
  },
});

export default store;
