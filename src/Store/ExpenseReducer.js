import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      console.log('Updated expenses array:', state.expenses);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      console.log('Set expenses to:', state.expenses);
    },
  },
});

export const { addExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
