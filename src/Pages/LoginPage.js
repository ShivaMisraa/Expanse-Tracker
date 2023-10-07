import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VeifyEmail";
import LogOut from "./LogOut";
import ExpenceForm from "../Expences/ExpenceForm";
import ExpencesList from "../Expences/ExpencesList";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toggleTheme } from "../Store/themeReducer";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const [expenses, setExpenses] = useState([]);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [premiumClicked, setPremiumClicked] = useState(false);

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

  const togglePremium = () => {
    setPremiumClicked(!premiumClicked);
  };

  const editExpense = (editedExpense) => {
    const editUrl = `https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses/${editedExpense.id}.json`;

    fetch(editUrl, {
      method: "PUT",
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

  const totalExpenseAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const downloadCSV = () => {
    const csvData = expenses.map((expense) => {
      // Format the data as a CSV row
      return `${expense.amount},${expense.description},${expense.category}`;
    });

    // Join all CSV rows with line breaks
    const csvContent = csvData.join("\n");

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "expenses.csv";

    // Trigger the download
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div
      className={`main-login-div ${theme} ${
        premiumClicked ? "dark-theme" : ""
      }`}
    >
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
        {totalExpenseAmount > 10000 && (
          <div className="theme-toggle">
            <Button
              className="activate-premium-button"
              onClick={() => {
                toggleTheme({ type: "TOGGLE_THEME" });
                togglePremium(); 
              }}
            >
              Activate Premium
            </Button>
            <Button
          className="download-csv-button"
          onClick={downloadCSV} 
        >
          Download Data
        </Button>
          </div>
        )}

        <VerifyEmail />
        <LogOut />
      </div>
      <ExpenceForm addExpense={addExpense} onEdit={editExpense} />
      <ExpencesList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
};

export default LoginPage;
