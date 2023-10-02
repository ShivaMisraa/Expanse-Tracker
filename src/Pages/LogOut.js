import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const LogOut = () => {

    const history= useHistory();

    const LogoutHandler=()=>{
        localStorage.removeItem('token')
        history.push("/login");

    }


  return (
    <div>
        <Button variant="primary" onClick={LogoutHandler}>
        Log Out
      </Button>
    </div>
  )
}

export default LogOut;
