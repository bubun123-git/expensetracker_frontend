import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './Component/Pages/AuthPage';
import Homepage from './Component/Pages/Home';
import MainNavigation from './Component/MainNavigation/MainNavigation';

function Nav() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/Login" component={AuthPage} />
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <>
      <MainNavigation/> <br/>
      <Nav />
    </>
  );
}

export default App;
