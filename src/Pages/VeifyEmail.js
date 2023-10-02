import React from "react";
import { Button } from "react-bootstrap"; // Assuming you're using Bootstrap for your button

const VerifyEmail = () => {
  const sendVerificationEmail = () => {
   
    const idToken = localStorage.getItem('token'); 

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
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
      <Button variant="primary" onClick={sendVerificationEmail}>
        Verify Email
      </Button>
    </div>
  );
};

export default VerifyEmail;
