import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import EditExpenseForm from "./EditExpenseForm";
import "./ExpenseList.css"

const ExpensesList = ({ onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    
    fetch(
      "https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedExpenses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(fetchedExpenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses", error);
      });
  }, []);

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

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
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
