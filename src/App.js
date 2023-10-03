import './App.css';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import React, { useState } from 'react';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';
import ForgetPassWord from './Pages/ForgetPW';
// import ExpencesList from './Expences/ExpencesList';
// import ExpenceForm from './Expences/ExpenceForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/loginPage" component={LoginPage} />
        <Route path="/forgetpw" component={ForgetPassWord} />
        <Route path="/login">
          {isLoggedIn ? (
            <Redirect to="/loginPage" />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
        </Route>
        <Route path="/">
          {isLoggedIn ? (
            <Redirect to="/loginPage" />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
