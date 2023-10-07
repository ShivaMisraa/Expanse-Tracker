import React from "react";
import { Button } from "react-bootstrap"; 
import { useSelector, useDispatch } from 'react-redux';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  
  const sendVerificationEmail = () => {
  
    console.log(token)

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Verification email sent successfully.");
        } else {
          alert("Error sending verification email.");
        }
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={sendVerificationEmail} disabled={!isLoggedIn}>
        Verify Email
      </Button>
    </div>
  );
};

export default VerifyEmail;
