import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './Component/Pages/AuthPage';
import WelcomePage from './Component/Pages/Profile';
import MainNavigation from './Component/MainNavigation/MainNavigation';
import completeProfile from './Component/Pages/CompleteProfile';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Router>
      <>
        <MainNavigation /> <br />
        <Switch>
          <Route path="/Home" component={WelcomePage} />
          <Route exact path="/" component={AuthPage} />
          <Route path="/completeProfile" component={completeProfile} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
