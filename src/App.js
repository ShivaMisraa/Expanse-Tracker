import './App.css';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';
import ForgetPassWord from './Pages/ForgetPW';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Switch>
        <Route path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/loginPage">
          {isLoggedIn ? <LoginPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/forgetpw" component={ForgetPassWord} />
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/loginPage" /> : <Login />}
        </Route>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/loginPage" /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
