import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/authReducer"; 

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logout()); 
    history.push("/login");
  };

  return (
    <div>
      <Button variant="primary" onClick={LogoutHandler}>
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
