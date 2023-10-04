import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import EditExpenseForm from "./EditExpenseForm";
import "./ExpenseList.css"

const ExpensesList = ({ expenses, onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const deleteHandler = (expenseId) => {
    console.log(expenseId);
    const deleteUrl = `https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses/${expenseId}.json`;

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete expense details");
        }
        return response.json();
      })
      .then(() => {
        console.log("Expense details deleted successfully");
        onDelete(expenseId);
      })
      .catch((error) => {
        console.log("Error deleting expense details", error);
      });
  };

  const editHandler = (expense) => {
    setSelectedExpense(expense);
  };

  const cancelEdit = () => {
    setSelectedExpense(null);
  };

  return (
    <div className="expense-list-container">
      <h2 className="main-heading">Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {selectedExpense === expense ? (
              <EditExpenseForm expense={expense} onEdit={cancelEdit} />
            ) : (
              <>
                Amount: {expense.amount}, Description: {expense.description},
                Category: {expense.category}
                <ButtonGroup className="btn-grp">
                  <Button variant="secondary" onClick={() => editHandler(expense)}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => deleteHandler(expense.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
