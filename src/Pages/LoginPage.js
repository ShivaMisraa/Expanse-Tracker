import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VeifyEmail"; 

const LoginPage = () => {
  console.log("loginpage is rendered");
  return (
    <>
      <div className="login-page-container">
        <div className="left-div">
          <h5>Welcome to Expense Tracker !!!</h5>
        </div>
        <div className="right-div">
          <p className="profile-para">
            Your Profile is incomplete. Please Complete it.
            <Link to="/profile">
              <p>Complete Now!!</p>
            </Link>
          </p>
        </div>
      </div>
      <div>
        <VerifyEmail />
      </div>
    </>
  );
};

export default LoginPage;
