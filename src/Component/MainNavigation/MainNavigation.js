import React from 'react';
import './MainNavigation.css'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

function MainNavigation() {
    return (
      <Router>
        <nav className="nav-bar">
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Login" activeClassName="active">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </Router>
    );
  }
export default MainNavigation;