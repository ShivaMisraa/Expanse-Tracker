import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VeifyEmail";
import LogOut from "./LogOut";
import ExpenceForm from "../Expences/ExpenceForm";
import ExpencesList from "../Expences/ExpencesList";
import { useState, useEffect } from "react";

const LoginPage = () => {
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

  const editExpense = (editedExpense) => {
    const editUrl = `https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses/${editedExpense.id}.json`;
  
    fetch(editUrl, {
      method: "PUT", // Use PUT method to update the expense
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedExpense),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit expense details");
        }
        return response.json();
      })
      .then(() => {
        console.log("Expense details edited successfully");
      })
      .catch((error) => {
        console.log("Error editing expense details", error);
      });
  };

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
  };

  return (
    <div className="main-login-div">
      <div className="login-page-container">
        <div className="left-div">
          <h5>Welcome to Expense Tracker !!!</h5>
        </div>
        <div className="right-div">
          <div className="profile-para">
            <p>Your Profile is incomplete. Please complete it.</p>
            <Link to="/profile" className="complete-button">
              Complete Now
            </Link>
          </div>
        </div>
      </div>
      <div className="verify-email-logout">
        <VerifyEmail />
        <LogOut />
      </div>
      <ExpenceForm addExpense={addExpense} onEdit={editExpense}/>
      <ExpencesList expenses={expenses} onDelete={deleteExpense} />
      
    </div>
  );
};

export default LoginPage;
