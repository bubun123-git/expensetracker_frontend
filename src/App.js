import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './Component/Pages/AuthPage';
import WelcomePage from './Component/Pages/Welcome';
import MainNavigation from './Component/MainNavigation/MainNavigation';

function Nav() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Home" component={WelcomePage} />
          <Route exact path="/" component={AuthPage} />
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <>
      <MainNavigation /> <br />
      <Nav />
    </>
  );
}

export default App;
