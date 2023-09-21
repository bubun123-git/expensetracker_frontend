import React from 'react';
import './MainNavigation.css'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Store/Auth-Context';


function MainNavigation() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Router>
      <nav className="nav-bar">
        <ul>
          {isLoggedIn && (
            <li>
              <NavLink to="/Home" activeClassName="active">
                Home
              </NavLink>
            </li>
          )}

          <li>
            <NavLink exact to="/" activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </Router>
  );
}
export default MainNavigation;