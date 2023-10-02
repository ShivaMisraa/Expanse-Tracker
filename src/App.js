// App.js
import './App.css';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/loginPage" component={LoginPage} />
        <Route path="/login">
          {isLoggedIn ? <Profile /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </Route>
        <Route path="/" exact>
          <Login onLogin={() => setIsLoggedIn(true)} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
