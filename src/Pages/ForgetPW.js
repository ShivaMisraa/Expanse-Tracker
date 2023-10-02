import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ForgetPw.css"

const ForgetPassWord = () => {
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState(""); 

  const sendPasswordResetLink = () => {
    
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50`;
    const data = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          setMessage(`Error: ${responseData.error.message}`);
        } else {
          setMessage("Password reset link sent successfully!");
          console.log("link has been sent to email id ", setEmail)
        }
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-form">
        <p>Enter the email with which you have registered</p>
        <Form.Group className="mb-3">
          <Form.Label>Enter Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={sendPasswordResetLink}>
          Send Link
        </Button>
        <div className="mt-2">{message}</div>
        <Link to="/login" className="complete-button">
              Already a user? Login.
            </Link>
      </div>
    </div>
  );
};

export default ForgetPassWord;