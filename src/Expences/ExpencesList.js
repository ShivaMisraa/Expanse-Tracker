import React from 'react';
import './ExpenseList.css';

const ExpencesList = ({ expenses }) => {
  
  return (
    <div className="expense-list-container">
      <h2 className='main-heading'>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            Amount: {expense.amount}, Description: {expense.description}, Category: {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpencesList;
