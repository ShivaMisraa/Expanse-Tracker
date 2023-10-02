import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import VerifyEmail from "./VeifyEmail"; 
import LogOut from "./LogOut";

const LoginPage = () => {
  console.log("loginpage is rendered");
  return (
    <>
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
    </>
  );
};

export default LoginPage;
