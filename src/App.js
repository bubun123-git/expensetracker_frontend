import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './Component/Pages/AuthPage';
import WelcomePage from './Component/Pages/Profile';
import MainNavigation from './Component/MainNavigation/MainNavigation';
import completeProfile from './Component/Pages/CompleteProfile';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import StartingPAge from './Component/StartingPage/StartingPage';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
 
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  const appClass = isDarkTheme ? 'app-dark' : 'app-normal';

  return (
    <Router >
      <div className={`App ${appClass}`}>
        <MainNavigation /> <br />
        <button type="button" class="btn btn-primary btn-sm" onClick={toggleTheme}>
          Toggle Theme
        </button> <br /> <br />
        <Switch>
          <Route path="/Home" component={WelcomePage} />
          <Route exact path="/" component={AuthPage} />
          <Route path="/completeProfile" component={completeProfile} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/startingpage" component={StartingPAge} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
