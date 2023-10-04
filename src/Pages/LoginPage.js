import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VeifyEmail"; 
import LogOut from "./LogOut";
import ExpenceForm from "../Expences/ExpenceForm";
import ExpencesList from '../Expences/ExpencesList'
import { useState, useEffect } from "react";


const LoginPage = () => {

  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = 'https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses.json';

      try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch expenses data');
        }

        const data = await response.json();

        if (data) {
          const expensesArray = Object.values(data);
          console.log('Fetched expenses data:', expensesArray);
          setExpenses(expensesArray);
        }
      } catch (error) {
        console.error('Error fetching expenses data:', error);
      }
    };

    fetchData();
  }, []); 

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  console.log("loginpage is rendered");
  return (
    <div className= 'main-login-div'>
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
        <LogOut/>
      </div>
        <ExpenceForm addExpense={addExpense} /> 
        <ExpencesList expenses={expenses} />
    </div>
  );
};

export default LoginPage;
