import './App.css';
import Login from './Auth/Login';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Route, Redirect , Switch} from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/loginPage" component={LoginPage} />
        <Route path="/login" render={() => <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Redirect from="/" to={isLoggedIn ? "/loginPage" : "/login"} />
      </Switch>
    </Router>
  );
}

export default App;
